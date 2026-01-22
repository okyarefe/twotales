/* src/app/actions.ts */
"use server";
import { createClient } from "@/lib/supabase/server";

import {
  listPrices,
  listProducts,
  Variant,
  createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";

import { configureLemonSqueezy } from "@/lib/lemonsqueezy/lemonsqueezy";

interface PriceData {
  attributes: {
    currency?: string;
    status?: string;
    usage_aggregation: unknown;
    renewal_interval_unit: string | null;
    renewal_interval_quantity: number | null;
    trial_interval_unit: string | null;
    trial_interval_quantity: number | null;
    unit_price_decimal: number | null;
    unit_price: number | null;
  };
}


/**
 * Sync plans from Lemon Squeezy to database (slow, use sparingly)
 * This should only be called:
 * - On initial setup
 * - Via admin panel/webhook when products change
 * - NOT on regular page loads (use getPlans() instead)
 */
export async function syncPlans() {
  try {
    configureLemonSqueezy();
  } catch (error) {
    console.error("❌ Lemon Squeezy configuration failed:", error);
    throw error;
  }

  const supabase = await createClient();

  // Fetch all variants currently in Supabase 'plan' table
  const { data: productVariants, error: selectError } = await supabase
    .from("plan")
    .select("*");

  if (selectError) {
    console.error("❌ Error fetching existing plans:", selectError);
    throw selectError;
  }

  // Make a copy or initialize array to track synced variants
  const syncedVariants = productVariants ? [...productVariants] : [];

  // Helper function to upsert a variant to Supabase and track it
  async function _addVariant(variant: {
    name: string;
    description?: string;
    price?: string;
    interval?: string | null;
    intervalcount?: number | null;
    isusagebased?: boolean;
    productid?: number;
    productname?: string;
    variantid?: number;
    trialinterval?: string | null;
    trialintervalcount?: number | null;
    sort?: number;
  }) {
    const { error } = await supabase
      .from("plan")
      .upsert(variant, { onConflict: "variantid" });

    if (error) {
      console.error(`❌ Failed to sync variant "${variant.name}":`, error);
      throw error;
    }

    syncedVariants.push(variant);
  }

  // Fetch products and variants from Lemon Squeezy
  const products = await listProducts({
    filter: { storeId: process.env.LEMONSQUEEZY_STORE_ID },
    include: ["variants"],
  });

  // console.log("PRODUCTS . DATA :", products.data?.data);

  if (!products.data || !products.data.data) {
    console.error(
      "❌ products.data is null/undefined. Full response:",
      JSON.stringify(products, null, 2)
    );
    return syncedVariants;
  }

  // The actual products are in products.data.data
  const allProducts = products.data.data;
  // The variants are in products.data.included
  const allVariants = products.data.included as Variant["data"][] | undefined;

  if (!allProducts || allProducts.length === 0) {
    console.warn("⚠️ No products found in Lemon Squeezy response");
    return syncedVariants;
  }

  // Collect all variants that need price fetching
  const variantsToProcess: Array<{
    variantId: string;
    product: typeof allProducts[0];
    variant?: Variant["data"];
    isProductWithoutVariants: boolean;
  }> = [];

  for (const product of allProducts) {
    const productVariantsList =
      allVariants?.filter(
        (v) => v.attributes.product_id === parseInt(product.id, 10)
      ) || [];

    if (productVariantsList.length === 0) {
      // Product without variants
      variantsToProcess.push({
        variantId: product.id,
        product,
        isProductWithoutVariants: true,
      });
    } else {
      // Product with variants
      for (const v of productVariantsList) {
        const variant = v.attributes;
        if (
          variant.status === "draft" ||
          (productVariantsList.length !== 1 && variant.status === "pending")
        ) {
          continue;
        }
        variantsToProcess.push({
          variantId: v.id,
          product,
          variant: v,
          isProductWithoutVariants: false,
        });
      }
    }
  }

  // Fetch all prices in parallel

  const pricePromises = variantsToProcess.map((item) =>
    listPrices({ filter: { variantId: item.variantId } })
      .then((priceObject) => ({ ...item, priceObject }))
      .catch((err) => {
        console.error(`❌ Error fetching price for variant ${item.variantId}:`, err);
        return { ...item, priceObject: null };
      })
  );

  const variantsWithPrices = await Promise.all(pricePromises);

  // Process all variants with their fetched prices
  for (const item of variantsWithPrices) {
    if (!item.priceObject) continue;

    const productAttributes = item.product.attributes;
    const prices = (item.priceObject.data?.data as PriceData[]) ?? [];
    const currentPriceObj =
      prices.find(
        (p) =>
          p.attributes?.currency === "EUR" &&
          p.attributes?.status === "active"
      ) ||
      prices.find((p) => p.attributes?.status === "active") ||
      prices[0];

    if (!currentPriceObj) {
      const name = item.isProductWithoutVariants
        ? productAttributes.name
        : item.variant?.attributes.name;
      console.warn(`⚠️ No price found for variant "${name}"`);
      continue;
    }

    const isUsageBased =
      currentPriceObj.attributes.usage_aggregation !== null;
    const interval = currentPriceObj.attributes.renewal_interval_unit;
    const intervalCount =
      currentPriceObj.attributes.renewal_interval_quantity;
    const trialInterval = currentPriceObj.attributes.trial_interval_unit;
    const trialIntervalCount =
      currentPriceObj.attributes.trial_interval_quantity;
    const price = isUsageBased
      ? currentPriceObj.attributes.unit_price_decimal
      : currentPriceObj.attributes.unit_price;
    const priceString = price !== null ? price.toString() : "";

    if (item.isProductWithoutVariants) {
      // Product without variants
      try {
        await _addVariant({
          name: productAttributes.name,
          description: productAttributes.description ?? "",
          price: priceString,
          interval,
          intervalcount: intervalCount,
          isusagebased: isUsageBased,
          productid: parseInt(item.product.id, 10),
          productname: productAttributes.name,
          variantid: parseInt(item.product.id, 10),
          trialinterval: trialInterval,
          trialintervalcount: trialIntervalCount,
          sort: 0,
        });
      } catch (err) {
        console.error(
          `❌ Error syncing product without variants: ${productAttributes.name}`,
          err
        );
      }
    } else if (item.variant) {
      // Product with variants
      const variant = item.variant.attributes;
      const productDescription =
        productAttributes.description ?? variant.description ?? "";

      await _addVariant({
        name: variant.name,
        description: productDescription,
        price: priceString,
        interval,
        intervalcount: intervalCount,
        isusagebased: isUsageBased,
        productid: variant.product_id,
        productname: productAttributes.name,
        variantid: parseInt(item.variant.id, 10),
        trialinterval: trialInterval,
        trialintervalcount: trialIntervalCount,
        sort: variant.sort,
      });
    }
  }

  // console.log(
  //   `✅ Successfully synced ${syncedVariants.length} variants to database`
  // );
  return syncedVariants;
}

/**
 * Get plans from database cache (fast, recommended for most use cases)
 * This reads from the local database without hitting Lemon Squeezy API
 */
export async function getPlans() {
  const supabase = await createClient();
  
  const { data: plans, error } = await supabase
    .from("plan")
    .select("*")
    .order("sort", { ascending: true });

  if (error) {
    console.error("❌ Error fetching plans from database:", error);
    throw error;
  }

  return plans || [];
}

export async function getCheckoutURL(variantId: number, embed = false) {
  try {
    configureLemonSqueezy();
  } catch (error) {
    console.error("❌ Lemon Squeezy configuration failed:", error);
    throw error;
  }

  const supabaseClient = await createClient();

  // Get the current user from Supabase auth
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  // Create checkout with Lemon Squeezy
  const checkout = await createCheckout(
    process.env.LEMONSQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email: user.email ?? undefined,
        custom: {
          user_id: user.id,
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/`,
        receiptButtonText: "Go to Dashboard",
        receiptThankYouNote: "Thank you for your purchase!",
      },
    }
  );

  return checkout.data?.data.attributes.url;
}
