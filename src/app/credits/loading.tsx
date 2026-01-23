import React from "react";
import { PricingCardsSkeleton } from "./components/pricing-cards-skeleton";

export default function Loading() {
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
          <PricingCardsSkeleton />
        </section>
      </div>
    </div>
  );
}

