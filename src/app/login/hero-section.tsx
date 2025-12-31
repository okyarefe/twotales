import StoryPreview from "@/app/login/story-preview";
import GoogleSignInButton from "@/components/google-signin-button";

export default function HeroSection() {
  return (
    <section className="pb-16 px-6 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {/* Small tag like Tydal's "NEXT GENERATION..." */}
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-wider uppercase text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
                AI-Powered Language Learning
              </span>
            </div>

            {/* Main headline with Tydal-style hierarchy */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              <span className="block mb-2 leading-tight">
                Turn{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 font-extrabold">
                  your creative ideas
                </span>{" "}
                into{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 font-extrabold">
                  structured language lessons
                </span>{" "}
                in seconds.
              </span>
            </h1>

            {/* Subtitle with muted color (refined spacing for readability) */}
            <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
              No more boring textbooks about strangers at train stations. Our AI
              builds your perfect story instantly whether it&apos;s a sci-fi
              thriller or a recipe for pasta.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-700">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-base">
                  Stories about{" "}
                  <span className="font-semibold text-purple-600">
                    anything
                  </span>{" "}
                  — generated in seconds
                </span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-base">
                  <span className="font-semibold text-purple-600">
                    Side-by-side bilingual
                  </span>{" "}
                  stories for easy navigation
                </span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-base">
                  Target{" "}
                  <span className="font-semibold text-purple-600">
                    specific grammar
                  </span>{" "}
                  you want to master
                </span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-base">
                  Interactive quizzes + smart feedback that accelerates learning
                </span>
              </div>
            </div>
            <div className="pt-4">
              <div className="relative max-w-xl overflow-hidden">
                <div
                  className="absolute -inset-x-8 -inset-y-4 bg-linear-to-r from-purple-200 via-pink-200 to-amber-200 opacity-60 blur-3xl"
                  aria-hidden
                />
                <div className="relative flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-6 rounded-3xl border border-purple-100 bg-white/95 shadow-[0_24px_60px_-28px_rgba(109,40,217,0.55)] px-4 md:px-5 py-3 md:py-4">
                  <GoogleSignInButton
                    variant="learn"
                    showTextOnXs
                    className="h-12 w-full md:w-auto px-6 md:px-7 text-sm md:text-base font-semibold rounded-2xl shadow-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-95"
                  >
                    Start learning for free
                  </GoogleSignInButton>

                  <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-900 min-w-0 w-full md:w-auto">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white border border-purple-100 text-purple-600 shadow-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="whitespace-normal break-words">
                      No credit card required
                    </span>
                  </div>
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
