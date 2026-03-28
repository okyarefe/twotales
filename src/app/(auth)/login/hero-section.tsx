import StoryPreview from "@/app/(auth)/login/story-preview";
import GoogleSignInButton from "@/components/google-signin-button";
import { Sparkles, BookOpen, Languages } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Animated blob background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[oklch(0.85_0.12_290)] opacity-40 blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[oklch(0.85_0.10_165)] opacity-35 blur-[90px] animate-blob animation-delay-2000" />
        <div className="absolute top-[35%] right-[15%] w-[30%] h-[30%] rounded-full bg-[oklch(0.88_0.12_65)] opacity-30 blur-[80px] animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto max-w-6xl px-6 py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — copy */}
          <div className="space-y-8 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.08_290)] bg-white/70 backdrop-blur-sm px-4 py-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[oklch(0.55_0.20_290)]" />
              <span className="text-xs font-semibold tracking-wide uppercase text-[oklch(0.45_0.15_290)]">
                AI-Powered Language Learning
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-hero text-foreground">
              Learn languages through{" "}
              <span className="font-serif italic text-[oklch(0.50_0.20_290)]">
                stories you create
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="text-subtitle max-w-md">
              Generate bilingual stories on any topic, test yourself with
              auto-generated quizzes, and get AI feedback on your writing — all
              in seconds.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <GoogleSignInButton
                variant="learn"
                showTextOnXs
                className="h-13 px-8 text-base font-semibold rounded-2xl shadow-lg shadow-[oklch(0.52_0.20_290)]/20 bg-[oklch(0.52_0.20_290)] text-white transition-all duration-200 hover:shadow-xl hover:shadow-[oklch(0.52_0.20_290)]/30 hover:-translate-y-0.5"
              >
                Start Learning Free
              </GoogleSignInButton>

              <span className="text-sm text-muted-foreground">
                No credit card required
              </span>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Pill
                icon={<BookOpen className="w-3.5 h-3.5" />}
                text="Bilingual stories"
              />
              <Pill
                icon={<Languages className="w-3.5 h-3.5" />}
                text="10+ languages"
              />
              <Pill
                icon={<Sparkles className="w-3.5 h-3.5" />}
                text="AI quizzes"
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
