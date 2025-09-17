import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar } from "lucide-react";
import StoryActionButtons from "./action-buttons";
import type { Story } from "@/types";
import {
  formatDate,
  getLanguageColors,
  getLevelColor,
  getStoryLengthColors,
} from "@/utils/utils";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold text-slate-800 tracking-tight leading-tight">
            {story.title}
          </CardTitle>
          <Badge
            className={`text-xs font-medium ${getLevelColor(story.level)}`}
          >
            {story.level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Badges */}
        <div className="flex gap-2">
          <Badge
            className={`text-xs font-medium ${getLanguageColors("English")}`}
          >
            English
          </Badge>
          <Badge
            className={`text-xs font-medium ${getLanguageColors(
              story.translate_to
            )}`}
          >
            {story.translate_to}
          </Badge>
        </div>

        {/* Story Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-600 font-sans">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(story.created_at)}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <Badge
              className={`text-xs font-medium ${getStoryLengthColors(
                story.length
              )}`}
            >
              {story.length}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <StoryActionButtons storyId={story.id} />
      </CardContent>
    </Card>
  );
}
