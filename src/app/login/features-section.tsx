import { PenTool, Target, MessageSquare, BookOpen } from "lucide-react";

const features = [
  {
    icon: PenTool,
    color: "text-[oklch(0.52_0.20_290)]",
    bg: "bg-[oklch(0.95_0.04_290)]",
    ring: "group-hover:ring-[oklch(0.85_0.08_290)]",
    title: "AI Story Creation",
    description:
      "Create stories about any topic, target specific grammar points, and get your personalized bilingual story in seconds.",
  },
  {
    icon: BookOpen,
    color: "text-[oklch(0.55_0.16_165)]",
    bg: "bg-[oklch(0.95_0.04_165)]",
    ring: "group-hover:ring-[oklch(0.85_0.08_165)]",
    title: "Side-by-Side Reading",
    description:
      "Read native and target languages together. Navigate effortlessly between both versions for seamless comprehension.",
  },
  {
    icon: Target,
    color: "text-[oklch(0.65_0.18_45)]",
    bg: "bg-[oklch(0.95_0.04_65)]",
    ring: "group-hover:ring-[oklch(0.88_0.10_65)]",
    title: "Auto-Generated Quizzes",
    description:
      "Test your comprehension with quizzes generated for each story. Track your progress over time.",
  },
  {
    icon: MessageSquare,
    color: "text-[oklch(0.55_0.15_330)]",
    bg: "bg-[oklch(0.95_0.04_330)]",
    ring: "group-hover:ring-[oklch(0.88_0.08_330)]",
    title: "AI Writing Feedback",
    description:
      "Translate any story into your target language and get instant AI-powered feedback to improve your skills.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative px-6 py-24">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[oklch(0.96_0.01_85)] to-transparent" />

      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-display text-foreground mb-4">
            Everything you need to{" "}
            <span className="font-serif italic text-[oklch(0.52_0.20_290)]">
              learn faster
            </span>
          </h2>
          <p className="text-subtitle">
            Learn languages naturally through storytelling and intelligent
            practice.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-[oklch(0.92_0.02_85)] bg-white/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.bg} ring-1 ring-transparent ${f.ring} transition-all duration-300`}
              >
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
