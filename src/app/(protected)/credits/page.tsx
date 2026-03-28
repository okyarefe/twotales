import React, { Suspense } from "react";
import { getPlans } from "@/actions/lemon";
import { PricingCards } from "./components/pricing-cards";
import { PricingCardsSkeleton } from "./components/pricing-cards-skeleton";

export const metadata = {
  title: "Credits & Pricing - TwoTales",
  description: "Purchase credits or upgrade your plan to unlock more features.",
};

// ISR: Revalidate once per day (86400 seconds)
export const revalidate = 86400;

export default function GetCreditsPage() {
  // Use cached plans from database for instant loading
  const plansPromise = getPlans();

  return (
    <div
      className="bg-linear-to-br from-slate-50 to-blue-50 py-6"
      style={{ scrollbarGutter: "stable" }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            🚫 No recurring charges
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto mb-2">
            One-time purchase
          </p>
        </header>

        <section className="grid gap-8 grid-cols-1 md:grid-cols-3 items-stretch">
          <Suspense fallback={<PricingCardsSkeleton />}>
            <PricingCards plansPromise={plansPromise} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
