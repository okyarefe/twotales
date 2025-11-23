import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Credits & Pricing - TwoTales",
  description: "Purchase credits or upgrade your plan to unlock more features.",
};

export default function GetCreditsPage() {
  return (
  <div className="bg-linear-to-br from-slate-50 to-blue-50 font-sans">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight mb-2">
            Credits & Pricing
          </h2>
          <p className="text-sm text-slate-600 font-sans mt-1 max-w-2xl mx-auto">
            Purchase credits or choose a subscription plan to unlock extra
            stories, personalized quizzes, and team features. The content below
            is placeholder copy — replace with your real pricing and billing
            details before going live.
          </p>
        </header>

  <section className="grid gap-6 grid-cols-1 md:grid-cols-3 items-stretch">
          {/* Basic */}
          <Card className="p-0 h-full">
            <CardHeader className="pt-6">
              <div>
                <CardTitle>Basic</CardTitle>
                <CardDescription>For curious beginners</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold">$0</div>
                <div className="text-sm text-muted-foreground">Forever</div>
              </div>
            </CardHeader>

            <CardContent className="px-6 flex-1">
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>1 story per day</li>
                <li>Basic vocabulary practice</li>
                <li>Community support</li>
              </ul>
            </CardContent>

            <CardFooter className="mt-auto px-6 pb-6">
              <Button variant="outline" className="w-full">
                Get started — free forever
              </Button>
            </CardFooter>
          </Card>

          {/* Pro */}
          <Card className="p-0 border-2 border-purple-300 bg-white h-full">
            <CardHeader className="pt-6">
              <div>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For regular learners</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold">$9</div>
                <div className="text-sm text-muted-foreground">/month (placeholder)</div>
              </div>
            </CardHeader>

            <CardContent className="px-6 flex-1">
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Unlimited stories</li>
                <li>Personalized quizzes</li>
                <li>Offline reading mode</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Placeholder: include billing details, trial info, or promo here.
              </p>
            </CardContent>

            <CardFooter className="mt-auto px-6 pb-6">
              <Button className="w-full" variant="createStory">
                Start Pro trial
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise */}
          <Card className="p-0 h-full">
            <CardHeader className="pt-6">
              <div>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For schools and teams</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold">Contact</div>
                <div className="text-sm text-muted-foreground">Custom pricing</div>
              </div>
            </CardHeader>

            <CardContent className="px-6 flex-1">
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Dedicated account manager</li>
                <li>Classroom & reporting tools</li>
                <li>Single sign‑on (SSO)</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Placeholder: note about contracts, onboarding, and discounts.
              </p>
            </CardContent>

            <CardFooter className="mt-auto px-6 pb-6">
              <Button className="w-full" variant="secondary">
                Contact sales
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
}
