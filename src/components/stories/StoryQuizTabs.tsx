"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { StorySideBySide } from "@/components/stories/StorySideBySide";
import { QuizShowPage, QuizQuestion } from "@/components/stories/QuizShowPage";

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
    <div className="bg-gradient-to-br from-purple-50 via-purple-200 to-purple-300 min-h-[400px] rounded-xl shadow-lg p-6">
      <div className="flex gap-4 mb-8 justify-center">
        <Button
          onClick={() => setTab("story")}
          className={`px-6 py-2 rounded-lg transition-all duration-200 text-base font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-300 hover:text-white ${
            tab === "story"
              ? "bg-black text-white border border-black"
              : "bg-purple-50 text-purple-700 border border-purple-200"
          }`}
        >
          Story
        </Button>
        <Button
          onClick={() => setTab("quiz")}
          className={`px-6 py-2 rounded-lg transition-all duration-200 text-base font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-300 hover:text-white ${
            tab === "quiz"
              ? "bg-black text-white border border-black"
              : "bg-purple-50 text-purple-700 border border-purple-200"
          }`}
        >
          Quiz
        </Button>
      </div>
      <div
        className="relative transition-all duration-200 bg-white bg-opacity-80 rounded-lg p-6"
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
