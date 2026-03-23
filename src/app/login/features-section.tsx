import { PenTool, Target, MessageSquare, BookOpen } from "lucide-react";

const features = [
  {
    icon: PenTool,
    color: "text-violet-500",
    bg: "bg-violet-50",
    ring: "group-hover:ring-violet-200",
    title: "AI Story Creation",
    description:
      "Create stories about any topic, target specific grammar points, and get your personalized bilingual story in seconds.",
  },
  {
    icon: BookOpen,
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-50",
    ring: "group-hover:ring-fuchsia-200",
    title: "Side-by-Side Reading",
    description:
      "Read native and target languages together. Navigate effortlessly between both versions for seamless comprehension.",
  },
  {
    icon: Target,
    color: "text-rose-500",
    bg: "bg-rose-50",
    ring: "group-hover:ring-rose-200",
    title: "Auto-Generated Quizzes",
    description:
      "Test your comprehension with quizzes generated for each story. Track your progress over time.",
  },
  {
    icon: MessageSquare,
    color: "text-sky-500",
    bg: "bg-sky-50",
    ring: "group-hover:ring-sky-200",
    title: "AI Writing Feedback",
    description:
      "Translate any story into your target language and get instant AI-powered feedback to improve your skills.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative px-6 py-24">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-slate-50/80 to-transparent" />

      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-display tracking-tight text-slate-900 mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
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
              className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.bg} ring-1 ring-transparent ${f.ring} transition-all duration-300`}
              >
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>

              <h3 className="text-sm font-semibold text-slate-800 mb-2">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
