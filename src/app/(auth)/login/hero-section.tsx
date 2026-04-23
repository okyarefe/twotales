import StoryPreview from "@/app/(auth)/login/story-preview";
import GoogleSignInButton from "@/components/google-signin-button";
import { Sparkles, BookOpen, Target } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden pt-6 pb-16 lg:pt-8 lg:pb-20">
      {/* Animated blob background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[oklch(0.85_0.12_290)] opacity-40 blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[oklch(0.85_0.10_165)] opacity-35 blur-[90px] animate-blob animation-delay-2000" />
        <div className="absolute top-[35%] right-[15%] w-[30%] h-[30%] rounded-full bg-[oklch(0.88_0.12_65)] opacity-30 blur-[80px] animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="space-y-6 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.08_290)] bg-white/70 backdrop-blur-sm px-4 py-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[oklch(0.55_0.20_290)]" />
              <span className="text-xs font-semibold tracking-wide uppercase text-[oklch(0.45_0.15_290)]">
                Made for readers
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-hero text-foreground">
              Reading is how you actually learn a language.{" "}
              <span className="font-serif italic text-[oklch(0.50_0.20_290)]">
                The problem is finding something worth reading.
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="text-subtitle max-w-md">
              Graded readers bore you. News articles crush you. We write stories
              at your level, on topics you pick, targeting the grammar you&apos;re
              working on — so every session feels like reading, not studying.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <GoogleSignInButton
                variant="learn"
                showTextOnXs
                className="group h-14 px-8 text-lg font-semibold rounded-xl shadow-lg shadow-[oklch(0.52_0.20_290)]/40 bg-gradient-to-b from-[oklch(0.58_0.22_290)] to-[oklch(0.50_0.20_290)] text-white transition-all duration-200 hover:shadow-xl hover:shadow-[oklch(0.52_0.20_290)]/50 hover:-translate-y-0.5 hover:from-[oklch(0.60_0.22_290)] hover:to-[oklch(0.52_0.20_290)]"
              >
                <span className="inline-flex items-center gap-2">
                  Start for free
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </GoogleSignInButton>

              <span className="text-sm text-muted-foreground">
                No credit card required
              </span>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Pill
                icon={<BookOpen className="w-3.5 h-3.5" />}
                text="For intermediate+ readers"
              />
              <Pill
                icon={<Sparkles className="w-3.5 h-3.5" />}
                text="Any topic, any level"
              />
              <Pill
                icon={<Target className="w-3.5 h-3.5" />}
                text="Target specific grammar"
              />
            </div>
          </div>

          {/* Right — preview */}
          <div className="flex justify-center lg:justify-end">
            <StoryPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-[oklch(0.90_0.02_85)] px-3.5 py-1.5 text-xs font-medium text-foreground/70 shadow-sm backdrop-blur-sm">
      {icon}
      {text}
    </span>
  );
}
