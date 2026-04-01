import { notFound, redirect } from 'next/navigation';
import { getUser } from '@/utils/supabase/auth-server';
import {
  getCachedStoryById,
  getCachedQuizIdByStoryId,
  getCachedQuizQuestionsById,
} from '@/lib/supabase/queries/cached';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryShowPage({ params }: PageProps) {
  const user = await getUser();
  if (!user) redirect('/login');

  const id = (await params).id;
  const [story, quizId] = await Promise.all([
    getCachedStoryById(id),
    getCachedQuizIdByStoryId(id),
  ]);

  if (!story || story.user_id !== user.id) notFound();

  const quizQuestions = quizId ? await getCachedQuizQuestionsById(quizId) : [];

  const StoryQuizTabs = (await import('@/components/stories/story-quiz-tabs'))
    .StoryQuizTabs;
  return <StoryQuizTabs story={story} quizQuestions={quizQuestions || []} />;
}
