"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getCheckoutURL } from "@/actions/lemon";

interface Plan {
  name?: string;
  variantid?: number;
  variantId?: number;
}

export function CreditsButton(props: {
  plan: Plan;
  currentPlan?: Plan;
  embed?: boolean;
}) {
  const { plan, currentPlan, embed = true } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isCurrent = plan.variantid === currentPlan?.variantid;

  const label = isCurrent ? "Your plan" : "Choose Plan";

  // Make sure Lemon.js is loaded, you need to enqueue the Lemon Squeezy SDK in your app first.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof (window as any).createLemonSqueezy === "function"
    ) {
      (window as any).createLemonSqueezy();
    }
  }, []);

  return (
    <Button
      onClick={async () => {
        // Create a checkout and open the Lemon.js modal
        let checkoutUrl: string | undefined = "";

        try {
          setLoading(true);
          checkoutUrl = await getCheckoutURL(plan.variantid!, embed);
        } catch (error) {
          setLoading(false);
          toast.error("Error creating a checkout.", {
            description:
              error instanceof Error ? error.message : "Unknown error.",
          });
          return; // Exit early on error
        } finally {
          embed && setLoading(false);
        }

        if (embed) {
          if (checkoutUrl) {
            if (typeof (window as any).LemonSqueezy !== "undefined") {
              (window as any).LemonSqueezy.Url.Open(checkoutUrl);
            } else {
              console.error("❌ LemonSqueezy SDK not loaded!");
              toast.error("Payment system not loaded", {
                description: "Please refresh the page and try again.",
              });
            }
          } else {
            console.error("❌ No checkout URL returned");
            toast.error("Failed to create checkout", {
              description: "No checkout URL was generated.",
            });
          }
        } else {
          router.push(checkoutUrl ?? "/");
        }
      }}
      disabled={loading || isCurrent}
      variant="createStory"
      className="w-full"
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {label}
    </Button>
  );
}
