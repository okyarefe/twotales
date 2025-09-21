import StoryPreview from "@/app/login/story-preview";
import GoogleSignInButton from "@/components/google-signin-button";

export default function HeroSection() {
  return (
    <section className="pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 tracking-tight">
              Learn Languages the{" "}
              <span className="text-purple-400 italic underline decoration-wavy underline-offset-4">
                FUN
              </span>{" "}
              way by creating AI-Powered Stories about what you love, with{" "}
              <span className="text-purple-400 italic font-semibold">AI</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Create AI-powered stories about the things you love — from
              football to fashion — and read them in your native and target
              languages. Reinforce your learning with fun, interactive quizzes
              tailored to your stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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
