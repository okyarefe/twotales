import { Metadata } from "next";
import VideoFacade from "./video-facade";

export const metadata: Metadata = {
  title: "How It Works | TwoTales AI",
  description:
    "Learn how TwoTales AI creates personalized stories and interactive quizzes",
};

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Turn your creative ideas into structured language lessons in three
          simple steps.
        </p>
      </div>

      {/* Steps Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
        {/* Connector Line (Hidden on mobile, visible on desktop) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 -z-10" />

        {/* Step 1: Create */}
        <div className="flex flex-col h-full bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-14 h-14 mx-auto mb-6 bg-purple-50 rounded-full flex items-center justify-center text-2xl border-2 border-purple-100 shadow-sm z-10">
            ✨
          </div>
          <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
            Create Your Story
          </h3>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">Concept</p>
                <p className="text-xs text-gray-500">
                  Describe your story idea
                </p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">Grammar</p>
                <p className="text-xs text-gray-500">
                  Select your target topic
                </p>
              </div>
            </div>
            {/* Item 3 */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
                />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">Level</p>
                <p className="text-xs text-gray-500">Choose A1 to C2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Quiz */}
        <div className="flex flex-col h-full bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-14 h-14 mx-auto mb-6 bg-purple-50 rounded-full flex items-center justify-center text-2xl border-2 border-purple-100 shadow-sm z-10">
            🎯
          </div>
          <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
            Take the Quiz
          </h3>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">Challenge</p>
                <p className="text-xs text-gray-500">
                  Answer story-based questions
                </p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">Practice</p>
                <p className="text-xs text-gray-500">Use grammar in context</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Rewrite */}
        <div className="flex flex-col h-full bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-14 h-14 mx-auto mb-6 bg-purple-50 rounded-full flex items-center justify-center text-2xl border-2 border-purple-100 shadow-sm z-10">
            📚
          </div>
          <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
            Get Feedback
          </h3>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">Rewrite</p>
                <p className="text-xs text-gray-500">Refine your story text</p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">
                  AI Feedback
                </p>
                <p className="text-xs text-gray-500">
                  Identify areas to improve
                </p>
              </div>
            </div>
            {/* Item 3 */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">Improve</p>
                <p className="text-xs text-gray-500">Master your weak points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Placeholder */}
      <div className="mb-16">
        <VideoFacade />
      </div>

      {/* Features Highlight */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-purple-400 mb-6">
          Why TwoTales AI?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">✨</span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">AI-Powered</h4>
              <p className="text-sm text-gray-600">
                Advanced AI creates unique stories tailored to you
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🎯</span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">Interactive</h4>
              <p className="text-sm text-gray-600">
                Quizzes make learning engaging and fun
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">📚</span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">Dream Journal</h4>
              <p className="text-sm text-gray-600">
                Save and revisit your favorite stories anytime
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">⚡</span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">Fast & Easy</h4>
              <p className="text-sm text-gray-600">
                Get your story in seconds with just a few clicks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
