import FeatureCard from "@/app/login/feature-card";
import { PenTool, Target, MessageSquare, BookOpen } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="w-full px-6 pb-16 bg-gray-50">
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Why Choose TwoTalesAI?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn languages naturally through storytelling and intelligent quiz
            generation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <FeatureCard
            icon={<PenTool className="h-6 w-6 text-purple-500" />}
            bgColor="bg-purple-50"
            title="AI Story Creation"
            description="Create stories about any topic you choose, target specific grammar points, and get your personalized bilingual story in seconds."
          />
          <FeatureCard
            icon={<BookOpen className="h-6 w-6 text-fuchsia-600" />}
            bgColor="bg-fuchsia-100"
            title="Side-by-Side Stories"
            description="Read native and target languages together. Navigate effortlessly between both versions for seamless comprehension."
          />
          <FeatureCard
            icon={<Target className="h-6 w-6 text-pink-600" />}
            bgColor="bg-pink-100"
            title="Quizzes"
            description="Test your comprehension with quizes generated for each story."
          />
          <FeatureCard
            icon={<MessageSquare className="h-6 w-6 text-blue-600" />}
            bgColor="bg-blue-100"
            title="AI Feedback on Your Writing"
            description="Translate any story into your target language and get instant AI-powered feedback to improve your skills."
          />
        </div>
      </div>
    </section>
  );
}
