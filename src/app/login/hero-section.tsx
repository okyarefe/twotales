import StoryPreview from "@/app/login/story-preview";
import GoogleSignInButton from "@/components/google-signin-button";

export default function HeroSection() {
  return (
    <section className="pb-20 px-6 overflow-x-hidden text-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-black px-3 py-1 rounded-full border border-purple-300">
                AI-Powered Language Learning
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl">
              <span className="block">
                <span>Turn </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">
                  your creative ideas
                </span>
                <span> into </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">
                  structured language lessons
                </span>
                <span> in seconds.</span>
              </span>
            </h1>

            <p className="text-lg text-black max-w-2xl leading-relaxed">
              No more boring textbooks. Generate bilingual lessons,
              auto-quizzes, and targeted grammar practice tailored to your goals
              and interests
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                <GoogleSignInButton
                  variant="learn"
                  showTextOnXs
                  className="w-full md:w-auto h-14 md:h-16 px-6 sm:px-9 md:px-12 lg:px-16 text-lg md:text-xl font-semibold rounded-2xl shadow-2xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white transition-transform transform hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(99,102,241,0.38)] duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400/30 text-center"
                >
                  Start Learning Free
                </GoogleSignInButton>

                <span className="mt-3 sm:mt-0 inline-flex items-center gap-2 text-sm text-black bg-white/10 px-3 py-1 rounded-full border border-black/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>No credit card required</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div className="flex items-start gap-3 text-black">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-purple-400">
                  ✓
                </span>
                <div>
                  <div className="font-semibold text-black">
                    Stories about anything
                  </div>
                  <div className="text-sm text-black">Generated in seconds</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-black">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-purple-400">
                  ✓
                </span>
                <div>
                  <div className="font-semibold text-black">
                    Side-by-side bilingual
                  </div>
                  <div className="text-sm text-black">Easy navigation</div>
                </div>
              </div>
            </div>
          </div>

          <StoryPreview />
        </div>
      </div>
    </section>
  );
}
