import FeatureCard from "@/app/login/feature-card";
import { PenTool, Target, BookOpen } from "lucide-react";

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

        <div className="grid md:grid-cols-3 gap-6 w-full">
          <FeatureCard
            icon={<PenTool className="h-6 w-6 text-purple-600" />}
            bgColor="bg-purple-100"
            title="AI Story Creation"
            description="Generate personalized stories in your target language based on your interests and level."
          />
          <FeatureCard
            icon={<Target className="h-6 w-6 text-pink-600" />}
            bgColor="bg-pink-100"
            title="Smart Quizzes"
            description="Test your comprehension with AI-generated quizzes that adapt to focus on areas you need practice."
          />
          <FeatureCard
            icon={<BookOpen className="h-6 w-6 text-purple-600" />}
            bgColor="bg-purple-100"
            title="Story Library"
            description="Access a growing library of stories and share your creations with learners worldwide."
          />
        </div>
      </div>
    </section>
  );
}
