import StoryPreview from "@/app/login/story-preview";
import GoogleSignInButton from "@/components/google-signin-button";

export default function HeroSection() {
  return (
    <section className="pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold leading-relaxed text-gray-900 tracking-tight">
              <span className="block mb-2">
                Learn languages through stories about topics you actually care
                about.
              </span>
              <span className="block font-normal text-gray-700 text-xl sm:text-2xl md:text-3xl lg:text-3xl mb-2">
                No more boring textbooks about strangers at train stations.
              </span>
              <span className="text-purple-400 italic underline decoration-wavy underline-offset-4">
                Our AI builds your perfect story
              </span>{" "}
              instantly.
            </h1>
            <p className="text-base sm:text-lg lg:text-base text-gray-600 leading-relaxed">
              Whether it&apos;s a sci-fi thriller or a recipe for pasta, turn
              any prompt into a{" "}
              <span className="font-semibold text-gray-900 underline decoration-wavy decoration-purple-400 underline-offset-4">
                bilingual learning experience
              </span>{" "}
              with AI-powered feedback.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Generate instant bilingual stories about{" "}
              <span className="font-semibold text-gray-900">
                any topic you choose
              </span>
              . Focus on{" "}
              <span className="font-semibold text-gray-900 underline decoration-wavy decoration-purple-400 underline-offset-4">
                any grammar point
              </span>{" "}
              you need to practice. Get personalized quizzes and AI-powered
              feedback that actually improve your skills.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-gray-700">
                <svg
                  className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5"
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
                  Stories about <span className="font-semibold">anything</span>{" "}
                  — generated in seconds
                </span>
              </div>
              <div className="flex items-start gap-2 text-gray-700">
                <svg
                  className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5"
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
                  Target <span className="font-semibold">specific grammar</span>{" "}
                  you want to master
                </span>
              </div>
              <div className="flex items-start gap-2 text-gray-700">
                <svg
                  className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5"
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
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <GoogleSignInButton variant="learn">
                Start Learning for FREE
              </GoogleSignInButton>
            </div>
          </div>

          <StoryPreview />
        </div>
      </div>
    </section>
  );
}
