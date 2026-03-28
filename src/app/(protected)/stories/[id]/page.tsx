import { notFound } from "next/navigation";
import {
  getQuizQuestionsById,
  getStoryById,
  getQuizIdByStoryId,
} from "@/lib/supabase/queries";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryShowPage({ params }: PageProps) {
  const id = (await params).id;
  const [story, quizId] = await Promise.all([
    getStoryById(id),
    getQuizIdByStoryId(id),
  ]);

  if (!story) notFound();

  const quizQuestions = quizId ? await getQuizQuestionsById(quizId) : [];

  const StoryQuizTabs = (await import("@/components/stories/story-quiz-tabs"))
    .StoryQuizTabs;
  return <StoryQuizTabs story={story} quizQuestions={quizQuestions || []} />;
}
