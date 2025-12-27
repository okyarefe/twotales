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

  for (const product of allProducts) {
    const productAttributes = product.attributes;

    // Get variants for this product from the included array
    const productVariantsList =
      allVariants?.filter(
        (v) => v.attributes.product_id === parseInt(product.id, 10)
      ) || [];

    // Fallback: product without variants
    if (productVariantsList.length === 0) {
      try {
        const productPriceObject = await listPrices({
          filter: { variantId: product.id },
        });

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

        const prices = (productPriceObject.data?.data as PriceData[]) ?? [];
        const currentPriceObj =
          prices.find(
            (p) =>
              p.attributes?.currency === "EUR" &&
              p.attributes?.status === "active"
          ) ||
          prices.find((p) => p.attributes?.status === "active") ||
          prices[0];

        if (currentPriceObj) {
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

          await _addVariant({
            name: productAttributes.name,
            description: productAttributes.description ?? "",
            price: priceString,
            interval,
            intervalcount: intervalCount,
            isusagebased: isUsageBased,
            productid: parseInt(product.id, 10),
            productname: productAttributes.name,
            variantid: parseInt(product.id, 10), // use product id as stand-in
            trialinterval: trialInterval,
            trialintervalcount: trialIntervalCount,
            sort: 0,
          });
        } else {
          console.warn(
            `⚠️ No price found for product without variants: ${productAttributes.name}`
          );
        }
      } catch (err) {
        console.error(
          `❌ Error syncing product without variants: ${productAttributes.name}`,
          err
        );
      }
      // proceed to next product
      continue;
    }

    for (const v of productVariantsList) {
      const variant = v.attributes;

      if (
        variant.status === "draft" ||
        (productVariantsList.length !== 1 && variant.status === "pending")
      ) {
        continue;
      }

      // Use product info from the parent loop
      const productName = productAttributes.name;
      const productDescription =
        productAttributes.description ?? variant.description ?? "";

      // Fetch price info for variant
      const variantPriceObject = await listPrices({
        filter: { variantId: v.id },
      });
      // console.log("Variant Price Object:", variantPriceObject);

      const prices = (variantPriceObject.data?.data as PriceData[]) ?? [];
      // Prefer EUR active price; then any active; then first available
      const currentPriceObj =
        prices.find(
          (p) =>
            p.attributes?.currency === "EUR" &&
            p.attributes?.status === "active"
        ) ||
        prices.find((p) => p.attributes?.status === "active") ||
        prices[0];
      if (!currentPriceObj) {
        console.warn(`⚠️ No price found for variant "${variant.name}"`);
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

      // console.log(
      //   `✅ Adding variant to database: ${variant.name} (ID: ${v.id})`
      // );

      await _addVariant({
        name: variant.name,
        description: productDescription,
        price: priceString,
        interval,
        intervalcount: intervalCount, // lowercase no underscore
        isusagebased: isUsageBased,
        productid: variant.product_id,
        productname: productName,
        variantid: parseInt(v.id, 10),
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
