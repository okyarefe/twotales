"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { StorySideBySide } from "@/components/stories/stories-sided";
import { QuizShowPage, QuizQuestion } from "@/components/stories/quiz-show";

interface TabsProps {
  story: {
    english_version: string;
    translated_version: string;
  };
  quizQuestions: QuizQuestion[];
}

export const StoryQuizTabs: React.FC<TabsProps> = ({
  story,
  quizQuestions,
}) => {
  const [tab, setTab] = React.useState<"story" | "quiz">("story");
  const storyRef = React.useRef<HTMLDivElement>(null);
  const quizRef = React.useRef<HTMLDivElement>(null);
  const [minHeight] = React.useState<number>(0);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-purple-200 to-purple-300 min-h-[400px] rounded-xl shadow-lg p-3 sm:p-4 md:p-6">
      <div className="flex gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 justify-center">
        <Button
          onClick={() => setTab("story")}
          className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-300 ${
            tab === "story"
              ? "bg-purple-50 border-2 border-purple-700 text-purple-700"
              : "bg-purple-50 text-purple-700 border border-purple-200"
          }`}
        >
          Story
        </Button>
        <Button
          onClick={() => setTab("quiz")}
          className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-300 ${
            tab === "quiz"
              ? "bg-purple-50 border-2 border-purple-700 text-purple-700"
              : "bg-purple-50 text-purple-700 border border-purple-200"
          }`}
        >
          Quiz
        </Button>
      </div>
      <div
        className="relative transition-all duration-200 bg-white bg-opacity-80 rounded-lg p-3 sm:p-4 md:p-6"
        style={{ minHeight: minHeight || 300 }}
      >
        {/* Always render both contents for measurement, but only show one visually */}
        <div
          ref={storyRef}
          className="w-full"
          style={{
            visibility: tab === "story" ? "visible" : "hidden",
            position: tab === "story" ? "relative" : "absolute",
            left: tab === "story" ? undefined : "-9999px",
          }}
        >
          <StorySideBySide
            storyA={story.english_version}
            storyB={story.translated_version}
          />
        </div>
        <div
          ref={quizRef}
          className="w-full"
          style={{
            visibility: tab === "quiz" ? "visible" : "hidden",
            position: tab === "quiz" ? "relative" : "absolute",
            left: tab === "quiz" ? undefined : "-9999px",
          }}
        >
          <QuizShowPage questions={quizQuestions || []} />
        </div>
      </div>
    </div>
  );
};
