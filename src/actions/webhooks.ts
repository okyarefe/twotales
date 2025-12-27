"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { configureLemonSqueezy } from "@/lib/lemonsqueezy/lemonsqueezy";
import { webhookHasData } from "@/lib/typeguards";

import { addStoryCreditsToUser } from "@/lib/supabase/queries";

interface WebhookEvent {
  id: number;
  event_name: string;
  body: unknown;
  processed: boolean;
  processing_error?: string;
}

/**
 * Store webhook event in the database.
 * This acts as a fail-safe in case the event isn't processed properly.
 */
export async function storeWebhookEvent(
  eventName: string,
  data: unknown
): Promise<number> {
  const supabase = createAdminClient();

  try {
    const { data: webhookEvent, error } = await supabase
      .from("webhook_events")
      .insert([
        {
          event_name: eventName,
          body: data,
          processed: false,
        },
      ])
      .select("id")
      .single();

    if (error || !webhookEvent) {
      throw new Error(`Failed to store webhook event: ${error?.message}`);
    }

    console.log("Webhook event stored with ID:", webhookEvent.id);
    return webhookEvent.id;
  } catch (error) {
    console.error("Error storing webhook event:", error);
    throw error;
  }
}

/**
 * Process webhook event from Lemon Squeezy.
 * This function handles different event types and updates the database accordingly.
 */
export async function processWebhookEvent(
  webhookEventId: number
): Promise<void> {
  const supabase = createAdminClient();

  try {
    configureLemonSqueezy();

    // Fetch the webhook event from the database
    const { data: webhookEvents, error: fetchError } = await supabase
      .from("webhook_events")
      .select("*")
      .eq("id", webhookEventId)
      .single();

    if (fetchError || !webhookEvents) {
      throw new Error(
        `Webhook event #${webhookEventId} not found in the database.`
      );
    }

    const webhookEvent = webhookEvents as WebhookEvent;
    let processingError = "";
    const eventBody = webhookEvent.body;
    console.log("The event BODY IS :", eventBody);

    if (!webhookHasData(eventBody)) {
      processingError = "Event body is missing the 'data' property.";
    } else if (webhookHasData(eventBody)) {
      const attributes = eventBody.data.attributes as Record<string, unknown>;

      if (
        webhookEvent.event_name === "order_created" &&
        attributes.status === "paid"
      ) {
        const firstOrderItem = attributes.first_order_item as Record<
          string,
          unknown
        >;
        const variantId = firstOrderItem?.variant_id as string;

        if (!variantId) {
          processingError = "No variant_id found in order";
        } else {
          // Fetch the plan with matching variantId to get credits
          const { data: planData, error: planError } = await supabase
            .from("plan")
            .select("story_credits")
            .eq("variantid", parseInt(variantId, 10))
            .single();

          if (planError || !planData) {
            processingError = `Plan with variantId ${variantId} not found.`;
          } else {
            // Get user_id from custom_data
            const customData =
              ((eventBody.meta as Record<string, unknown>)
                ?.custom_data as Record<string, unknown>) || {};
            const userId = customData.user_id as string;

            if (!userId) {
              processingError = "No user_id found in custom_data";
            } else {
              try {
                // Add story credits to user
                await addStoryCreditsToUser(
                  userId,
                  planData.story_credits || 0
                );
                console.log(
                  `Added ${planData.story_credits} credits to user ${userId} from order`
                );
              } catch (error) {
                processingError = `Failed to add credits: ${
                  error instanceof Error ? error.message : "Unknown error"
                }`;
                console.error(error);
              }
            }
          }
        }
      }
    }

    // Update the webhook event in the database
    const { error: updateError } = await supabase
      .from("webhook_events")
      .update({
        processed: true,
        processing_error: processingError || null,
      })
      .eq("id", webhookEventId);

    if (updateError) {
      console.error("Error updating webhook event status:", updateError);
    }
  } catch (error) {
    console.error("Error processing webhook event:", error);
    // Still try to update the webhook event with the error
    try {
      await supabase
        .from("webhook_events")
        .update({
          processed: false,
          processing_error:
            error instanceof Error ? error.message : "Unknown error",
        })
        .eq("id", webhookEventId);
    } catch (updateErr) {
      console.error("Failed to update webhook event with error:", updateErr);
    }
    throw error;
  }
}
