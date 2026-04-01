import { unstable_cache } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';

import type { Story } from '@/types';

// ─── Cached: getStoryById ────────────────────────────────────────────
// First request hits Supabase, subsequent requests serve from cache.
// Invalidated via revalidateTag("story-{id}") when a story is deleted.

export const getCachedStoryById = (storyId: string) =>
  unstable_cache(
    async (): Promise<Story | null> => {
      const { data, error } = await createAdminClient()
        .from('stories')
        .select('*')
        .eq('id', storyId)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    ['story-by-id', storyId],
    { tags: [`story-${storyId}`] },
  )();

// ─── Cached: getQuizIdByStoryId ──────────────────────────────────────

export const getCachedQuizIdByStoryId = (storyId: string) =>
  unstable_cache(
    async (): Promise<string | null> => {
      const { data, error } = await createAdminClient()
        .from('quizzes')
        .select('id')
        .eq('story_id', storyId.trim())
        .maybeSingle();

      if (error) {
        throw new Error('Error fetching quiz ID');
      }

      return data?.id || null;
    },
    ['quiz-id-by-story', storyId],
    { tags: [`story-${storyId}`] },
  )();

// ─── Cached: getQuizQuestionsById ────────────────────────────────────

export const getCachedQuizQuestionsById = (quizId: string) =>
  unstable_cache(
    async () => {
      const { data, error } = await createAdminClient()
        .from('quiz_questions')
        .select('id, question, answer')
        .eq('quiz_id', quizId.trim());

      if (error) {
        throw new Error('Error fetching quiz questions');
      }

      return data;
    },
    ['quiz-questions', quizId],
    { tags: [`quiz-${quizId}`] },
  )();
