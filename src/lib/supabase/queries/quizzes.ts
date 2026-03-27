import { createClient } from "@/lib/supabase/server";

export async function saveQuizQuestions(
  userId: string,
  storyId: string,
  questions: { question: string; answer: string }[],
  totalTokens: number = 0,
) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_quiz_with_questions", {
    input_story_id: storyId,
    input_user_id: userId,
    input_total_tokens: totalTokens,
    input_questions: questions,
  });

  if (error) {
    throw new Error("Error creating quiz");
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
    console.log("getQuizQuestionsById throw error");
    throw new Error("Error fetching quiz questions");
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
    .maybeSingle();

  if (error) {
    console.log("getQuizIdByStoryId error");

    throw new Error("Error fetching quiz ID");
  }

  return data?.id || null;
}
