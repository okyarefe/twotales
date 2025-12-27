import StoryPreview from "@/app/login/story-preview";
import GoogleSignInButton from "@/components/google-signin-button";

export default function HeroSection() {
  return (
    <section className="pb-16 px-6">
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              <span className="block mb-2">
                Learn languages through stories about topics you actually care
                about.
              </span>
            </h1>

            {/* Subtitle with muted color */}
            <p className="text-subtitle max-w-2xl">
              No more boring textbooks about strangers at train stations. Our AI
              builds your perfect story instantly whether it&apos;s a sci-fi
              thriller or a recipe for pasta.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-gray-700">
                <svg
                  className="w-6 h-6 text-purple-500 shrink-0 mt-0.5"
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
                <span className="text-base">
                  Stories about{" "}
                  <span className="font-semibold text-purple-600">
                    anything
                  </span>{" "}
                  — generated in seconds
                </span>
              </div>
              <div className="flex items-start gap-2 text-gray-700">
                <svg
                  className="w-6 h-6 text-purple-500 shrink-0 mt-0.5"
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
                <span className="text-base">
                  <span className="font-semibold text-purple-600">
                    Side-by-side bilingual
                  </span>{" "}
                  stories for easy navigation
                </span>
              </div>
              <div className="flex items-start gap-2 text-gray-700">
                <svg
                  className="w-6 h-6 text-purple-500 shrink-0 mt-0.5"
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
                <span className="text-base">
                  Target{" "}
                  <span className="font-semibold text-purple-600">
                    specific grammar
                  </span>{" "}
                  you want to master
                </span>
              </div>
              <div className="flex items-start gap-2 text-gray-700">
                <svg
                  className="w-6 h-6 text-purple-500 shrink-0 mt-0.5"
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
                <span className="text-base">
                  Interactive quizzes + smart feedback that accelerates learning
                </span>
              </div>
            </div>
            <div className="pt-4">
              <div className="relative max-w-xl">
                <div
                  className="absolute -inset-x-8 -inset-y-4 bg-linear-to-r from-purple-200 via-pink-200 to-amber-200 opacity-60 blur-3xl"
                  aria-hidden
                />
                <div className="relative flex items-center gap-3 md:gap-6 rounded-3xl border border-purple-100 bg-white/95 shadow-[0_24px_60px_-28px_rgba(109,40,217,0.55)] px-4 md:px-5 py-3 md:py-4">
                  <GoogleSignInButton
                    variant="learn"
                    showTextOnXs
                    className="h-12 px-6 md:px-7 text-sm md:text-base font-semibold rounded-2xl shadow-md shadow-purple-200 bg-black text-white hover:bg-gray-900"
                  >
                    Start learning for free
                  </GoogleSignInButton>
                  <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-900">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-50 text-purple-600 shadow-inner shadow-purple-100">
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
                    <span>No credit card required</span>
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
