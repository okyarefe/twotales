import {
  getQuizQuestionsById,
  getStoryById,
  getQuizIdByStoryId,
} from "@/lib/supabase/queries";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryShowPage({ params }: PageProps) {
  try {
    const id = (await params).id;
    const [story, quizId] = await Promise.all([
      getStoryById(id),
      getQuizIdByStoryId(id),
    ]);
    const quizQuestions = await getQuizQuestionsById(quizId);
    if (!story) {
      return <div>Story does not exist.</div>;
    }

    const StoryQuizTabs = (await import("@/components/stories/StoryQuizTabs"))
      .StoryQuizTabs;
    return <StoryQuizTabs story={story} quizQuestions={quizQuestions || []} />;
  } catch {
    return <div>Something went wrong..</div>;
  }
}
