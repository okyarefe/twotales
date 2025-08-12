"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StoryCard } from "./story-card";
import { Story } from "@/types";

interface MyStoriesViewProps {
  savedStories: Story[];
  setIsCreateModalOpen: (open: boolean) => void;
  handleStorySelect: (story: Story) => void;
  handleQuizSelect: (story: Story) => void;
}

export function MyStoriesView({
  savedStories,
  setIsCreateModalOpen,
}: MyStoriesViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
            My Stories
          </h2>
          <p className="text-sm text-slate-600 font-sans mt-1">
            Your personalized language learning journey
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-sm font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Story
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
