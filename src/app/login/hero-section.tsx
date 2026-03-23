import StoryPreview from "@/app/login/story-preview";
import GoogleSignInButton from "@/components/google-signin-button";
import { Sparkles, BookOpen, Languages } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background — soft radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-violet-200/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 blur-[100px]" />
        <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-fuchsia-100/40 blur-[80px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-6 py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — copy */}
          <div className="space-y-8 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 backdrop-blur-sm px-4 py-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-xs font-semibold tracking-wide uppercase text-violet-600">
                AI-Powered Language Learning
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-hero leading-[1.08] tracking-tight text-slate-900">
              Learn languages through{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                stories you create
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="text-lg leading-relaxed text-slate-500 max-w-md">
              Generate bilingual stories on any topic, test yourself with
              auto-generated quizzes, and get AI feedback on your writing — all
              in seconds.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <GoogleSignInButton
                variant="learn"
                showTextOnXs
                className="h-13 px-8 text-base font-semibold rounded-xl shadow-lg shadow-violet-500/20 bg-gradient-to-r from-violet-600 to-purple-500 text-white transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
              >
                Start Learning Free
              </GoogleSignInButton>

              <span className="text-sm text-slate-400">
                No credit card required
              </span>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Pill icon={<BookOpen className="w-3.5 h-3.5" />} text="Bilingual stories" />
              <Pill icon={<Languages className="w-3.5 h-3.5" />} text="10+ languages" />
              <Pill icon={<Sparkles className="w-3.5 h-3.5" />} text="AI quizzes" />
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
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm">
      {icon}
      {text}
    </span>
  );
}
