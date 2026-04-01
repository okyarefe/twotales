'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar } from 'lucide-react';
import StoryActionButtons from './action-buttons';
import type { Story } from '@/types';
import {
  formatDate,
  getLanguageColors,
  getLevelColor,
  getStoryLengthColors,
} from '@/utils/utils';

interface StoryCardProps {
  story: Story;
  index?: number;
}

export function StoryCard({ story, index = 0 }: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.1, 0.5),
        ease: 'easeOut',
      }}
    >
      <Card className="shadow-lg transform transition-all duration-300 motion-reduce:transition-none hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 border-0 overflow-hidden min-w-0 bg-gradient-to-br from-white to-slate-50 group h-full">
        <CardHeader className="pt-2 pb-1.5 sm:pt-2.5 sm:pb-2">
          {/* Title with Level */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <CardTitle className="text-base sm:text-lg font-bold text-slate-900 leading-snug flex-1 break-words">
              {story.title}
            </CardTitle>
            <Badge
              className={`text-xs font-semibold shrink-0 px-2.5 py-1.5 rounded-full mt-0.5 ${getLevelColor(story.level)}`}
            >
              {story.level}
            </Badge>
          </div>

          {/* Accent Line Under Title */}
          <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-slate-300 rounded-full mb-1" />

          {/* Languages and Metadata in one row */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={`text-xs font-medium px-2 py-1 rounded-full ${getLanguageColors('English')}`}
            >
              English
            </Badge>
            <Badge
              className={`text-xs font-medium px-2 py-1 rounded-full ${getLanguageColors(
                story.translate_to,
              )}`}
            >
              {story.translate_to}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
              <BookOpen className="w-3 h-3 text-slate-400" />
              <Badge
                variant="outline"
                className={`text-xs font-medium px-2 py-1 rounded-full border-slate-200 ${getStoryLengthColors(
                  story.length,
                )}`}
              >
                {story.length}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-1 pb-2.5 sm:pt-1.5 sm:pb-3 space-y-2.5 flex flex-col justify-between h-[calc(100%-100px)]">
          {/* Date */}
          <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-600 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">{formatDate(story.created_at)}</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-0.5 mt-auto">
            <StoryActionButtons storyId={story.id} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
