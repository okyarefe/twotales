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
    <Card className="shadow-sm transform transition-all duration-200 motion-reduce:transition-none hover:shadow-lg hover:scale-100 sm:hover:scale-105 hover:-translate-y-1 border-slate-200 overflow-hidden min-w-0">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-0">
          <CardTitle className="text-base font-semibold text-slate-800 tracking-tight leading-tight wrap-break-word flex-1">
            {story.title}
          </CardTitle>
          <Badge
            className={`text-xs font-medium shrink-0 ${getLevelColor(story.level)}`}
          >
            {story.level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Badges */}
        <div className="flex flex-wrap gap-2">
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-600 font-sans">
          <div className="flex items-center gap-1 min-w-0">
            <Calendar className="w-3 h-3 shrink-0" />
            <span className="truncate">{formatDate(story.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3 shrink-0" />
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
