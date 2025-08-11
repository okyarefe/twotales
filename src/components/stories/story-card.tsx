import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { BookOpen, Brain, Calendar } from "lucide-react";
import type { Story } from "@/types";
import {
  formatDate,
  getLanguageColors,
  getLevelColor,
  getStoryLengthColors,
} from "@/utils/utils";
import Link from "next/link";

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
        <div className="flex gap-2 pt-2 justify-between">
          <div className="flex items-center p-2 rounded justify-center hover:bg-purple-200 text-xs font-medium hover:border-rounded border-1 border-black">
            <BookOpen className="w-5 h-5 mr-1"></BookOpen>
            <Link href={`/stories/${story.id}`}>Read Story</Link>
          </div>
          <div className="flex items-center p-2 rounded justify-center hover:bg-purple-200 text-xs font-medium hover:border-rounded border-1 border-black">
            <Brain className="w-5 h-5 mr-1" />

            <Link href={`/stories/${story.id}`} className="text-l">
              {" "}
              Take Quiz
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
