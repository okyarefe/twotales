"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StorySideBySide } from "@/components/stories/stories-sided";
import { QuizShowPage, QuizQuestion } from "@/components/stories/quiz-show";
import styles from "./story-quiz-tabs.module.css";

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
    <div className={`${styles.root} bg-gradient-to-br from-purple-50 via-purple-200 to-purple-300 flex-1 flex flex-col h-full rounded-none sm:rounded-xl shadow-lg p-1 sm:p-2 md:p-6 overflow-hidden`}>
      <Tabs defaultValue="story" className="w-full flex-1 flex flex-col overflow-hidden">
        <div className={`${styles.tabsHeader} flex justify-center mb-2 sm:mb-6 flex-none`}>
          <TabsList className={`${styles.list} inline-flex bg-white/80 border border-purple-200 p-1 h-auto`}>
            <TabsTrigger
              value="story"
              className={`${styles.trigger} px-6 py-2 text-base font-semibold rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-600 data-[state=active]:shadow-sm text-gray-600`}
            >
              Story
            </TabsTrigger>
            <TabsTrigger
              value="quiz"
              className={`${styles.trigger} px-6 py-2 text-base font-semibold rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-600 data-[state=active]:shadow-sm text-gray-600`}
            >
              Quiz
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="story" className="mt-0 flex-1 flex flex-col overflow-hidden">
          <div className="bg-white bg-opacity-80 rounded-lg p-2 sm:p-4 md:p-6 flex-1 overflow-y-auto">
            <StorySideBySide
              storyA={story.english_version}
              storyB={story.translated_version}
            />
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="mt-0 flex-1 flex flex-col overflow-hidden">
          <div className="bg-white bg-opacity-80 rounded-lg p-2 sm:p-4 md:p-6 flex-1 overflow-y-auto">
            <QuizShowPage questions={quizQuestions || []} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
