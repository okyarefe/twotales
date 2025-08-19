import StoryPreview from "@/app/login/story-preview";
import GoogleSignInButton from "@/components/google-signin-button";

export default function HeroSection() {
  return (
    <section className="pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Learn Languages Through Personalized Stories
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Create personalized stories in your target language and test your
              understanding with AI-powered quizzes. Learn naturally through
              engaging narratives.
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
