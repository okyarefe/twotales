import { Metadata } from "next";
import {
  Sparkles,
  BookOpen,
  Brain,
  Trophy,
  CreditCard,
  Zap,
  Users,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | TwoTales AI",
  description:
    "Learn how TwoTales AI creates personalized stories and interactive quizzes",
};

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Sparkles className="w-8 h-8 text-purple-600" />,
      title: "1. Create Your Story",
      description:
        "Choose your story parameters: length, theme, and characters. Our AI will generate a unique, personalized story just for you.",
      details: [
        "Select story length (short, medium, or long)",
        "Pick themes and genres",
        "Add custom characters and settings",
      ],
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "2. Read & Enjoy",
      description:
        "Dive into your AI-generated story with beautiful formatting and engaging narratives tailored to your preferences.",
      details: [
        "Clean, readable format",
        "Save stories to your library",
        "Share with friends and family",
      ],
    },
    {
      icon: <Brain className="w-8 h-8 text-green-600" />,
      title: "3. Take the Quiz",
      description:
        "Test your comprehension with an auto-generated quiz based on your story. Perfect for learning and engagement!",
      details: [
        "Multiple-choice questions",
        "Instant feedback and explanations",
        "Track your performance over time",
      ],
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-600" />,
      title: "4. Track Progress",
      description:
        "View your reading history, quiz scores, and achievements in your personalized dashboard.",
      details: [
        "Story library management",
        "Performance analytics",
        "Unlock achievements and badges",
      ],
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Generate stories in seconds powered by advanced AI technology",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Family Friendly",
      description:
        "Safe, appropriate content for all ages with content filtering",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Flexible Credits",
      description: "Pay only for what you use with our credit-based system",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">Coming Soon</h1>
    </div>
  );
}
