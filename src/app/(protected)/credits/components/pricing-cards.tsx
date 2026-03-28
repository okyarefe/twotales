import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { CreditsButton } from "@/components/common/credits-button";

interface Plan {
  id?: number | string;
  variantid?: number;
  variantId?: number;
  productname?: string;
  name?: string;
  price?: string | number;
  story_credits?: number;
  description?: string;
}

interface PricingCardsProps {
  plansPromise: Promise<Plan[]>;
}

export async function PricingCards({ plansPromise }: PricingCardsProps) {
  const allPlans = await plansPromise;

  if (allPlans.length === 0) {
    return (
      <div className="col-span-full text-center text-slate-500">
        No plans available yet
      </div>
    );
  }

  // Deduplicate plans
  const seen = new Set<number | string>();
  const uniquePlans = allPlans.filter((plan: Plan) => {
    const key = plan.variantid ?? plan.variantId ?? plan.id;
    if (key === undefined || key === null) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort cards by ascending `id`; items without `id` go last
  const sortedPlans = [...uniquePlans].sort((a: Plan, b: Plan) => {
    const ai = a.id;
    const bi = b.id;
    if (ai == null && bi == null) return 0;
    if (ai == null) return 1;
    if (bi == null) return -1;
    return Number(ai) - Number(bi);
  });

  return (
    <>
      {sortedPlans.map((plan, idx) => {
        const title = plan.productname || plan.name || "Plan";
        const cents = Number(plan.price);
        const priceLabel = Number.isFinite(cents)
          ? `€${(cents / 100).toFixed(2)}`
          : "—";
        const storyCredits = plan.story_credits || 0;
        const isPopular = sortedPlans.length === 3 && idx === 1;

        // Choose image from /public by plan name (fallback to basic)
        const t = title.toLowerCase();
        const planImage = t.includes("explorer")
          ? "/explorer.png"
          : t.includes("wanderer")
            ? "/wanderer.png"
            : t.includes("basic") || t.includes("starter")
              ? "/basicplan.png"
              : idx === 1
                ? "/wanderer.png"
                : idx >= 2
                  ? "/explorer.png"
                  : "/basicplan.png";

        return (
          <div
            key={plan.variantid ?? plan.name}
            className={`relative group transition-transform duration-300 ${
              isPopular ? "md:scale-105" : ""
            }`}
          >
            <Card
              className={`p-0 h-full overflow-hidden border transition-all duration-300 ${
                isPopular
                  ? "border-accent-gold bg-white shadow-lg"
                  : "border-slate-200 bg-white hover:border-accent-gold/50 hover:shadow-md"
              }`}
            >
              {/* Hero Banner with Image */}
              <div className="relative h-32 bg-linear-to-r from-accent-gold/10 to-accent-gold-light/10 border-b border-accent-gold/20 flex items-center justify-center overflow-hidden">
                <Image
                  src={planImage}
                  alt={title}
                  fill
                  className="object-cover"
                />
                {/* Credits Badge */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <p className="text-white text-sm font-bold">
                    {storyCredits} stories
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title & Description */}
                <div className="mb-3">
                  <h4 className="text-lg font-bold text-slate-900 mb-0.5">
                    {title}
                  </h4>
                  <p className="text-slate-500 text-xs">
                    One-time payment
                  </p>
                </div>

                {/* Price */}
                <div className="mb-3 pb-3 border-b border-slate-200">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-fuchsia-500">
                      {priceLabel}
                    </span>
                    <span className="text-slate-500 text-xs">
                      one-time
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-2.5 h-2.5 text-accent-gold"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700 text-sm">
                      {storyCredits} story credits
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-2.5 h-2.5 text-accent-gold"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700 text-sm">
                      All languages included
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-2.5 h-2.5 text-accent-gold"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700 text-sm">
                      No expiration
                    </span>
                  </div>
                </div>

                {/* Button */}
                <div className="mt-auto">
                  <CreditsButton plan={plan} />
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
}
