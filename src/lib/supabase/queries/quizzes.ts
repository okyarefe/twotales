import { createClient } from "@/lib/supabase/server";

export async function saveQuizQuestions(
  storyId: string,
  questions: { question: string; answer: string }[],
  totalTokens: number = 0
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();
  const { data, error } = await supabase.rpc("create_quiz_with_questions", {
    input_story_id: storyId,
    input_user_id: user?.id,
    input_total_tokens: totalTokens,
    input_questions: questions,
  });

  if (error) {
    console.error("Error creating quiz:", error.message);
    return null;
  }

  return data;
}

export async function getQuizQuestionsById(quizId: string) {
  const supabase = await createClient();
  const cleanQuizId = quizId.trim();
  const { data, error } = await supabase
    .from("quiz_questions")
    .select("id, question, answer")
    .eq("quiz_id", cleanQuizId);

  if (error) {
    console.error("Error fetching quiz questions:", error.message);
    return null;
  }

  return data;
}

export async function getQuizIdByStoryId(storyId: string) {
  const supabase = await createClient();
  const cleanStoryId = storyId.trim();

  const { data, error } = await supabase
    .from("quizzes")
    .select("id") // quiz id
    .eq("story_id", cleanStoryId)
    .single();

  if (error) {
    console.error("Error fetching quiz ID:", error.message);
    return null;
  }

  return data?.id || null;
}
