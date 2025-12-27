"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  return (
    <div className="bg-gradient-to-br from-purple-50 via-purple-200 to-purple-300 min-h-[400px] rounded-xl shadow-lg p-3 sm:p-4 md:p-6">
      <Tabs defaultValue="story" className="w-full">
        <div className="flex justify-center mb-4 sm:mb-6">
          <TabsList className="inline-flex bg-white/80 border border-purple-200 p-1 h-auto">
            <TabsTrigger
              value="story"
              className="px-6 py-2 text-base font-semibold rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-600 data-[state=active]:shadow-sm text-gray-600"
            >
              Story
            </TabsTrigger>
            <TabsTrigger
              value="quiz"
              className="px-6 py-2 text-base font-semibold rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-600 data-[state=active]:shadow-sm text-gray-600"
            >
              Quiz
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="story" className="mt-0">
          <div className="bg-white bg-opacity-80 rounded-lg p-3 sm:p-4 md:p-6 max-h-[70vh] overflow-y-auto">
            <StorySideBySide
              storyA={story.english_version}
              storyB={story.translated_version}
            />
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="mt-0">
          <div className="bg-white bg-opacity-80 rounded-lg p-3 sm:p-4 md:p-6 max-h-[70vh] overflow-y-auto">
            <QuizShowPage questions={quizQuestions || []} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
