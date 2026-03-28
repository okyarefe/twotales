import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PricingCardsSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`relative group transition-transform duration-300 ${
            i === 2 ? "md:scale-105" : ""
          }`}
        >
          <Card
            className={`p-0 h-full overflow-hidden border transition-all duration-300 ${
              i === 2
                ? "border-accent-gold bg-white shadow-lg"
                : "border-slate-200 bg-white"
            }`}
          >
            {/* Hero Banner Skeleton */}
            <div className="relative h-32 bg-linear-to-r from-accent-gold/10 to-accent-gold-light/10 border-b border-accent-gold/20 flex items-center justify-center overflow-hidden">
              <Skeleton className="w-full h-full" />
              {/* Credits Badge Skeleton */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Title & Description Skeleton */}
              <div className="mb-3">
                <Skeleton className="h-6 w-32 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>

              {/* Price Skeleton */}
              <div className="mb-3 pb-3 border-b border-slate-200">
                <div className="flex items-baseline gap-1">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>

              {/* Features Skeleton */}
              <div className="space-y-1.5 mb-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>

              {/* Button Skeleton */}
              <div className="mt-auto">
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
}
