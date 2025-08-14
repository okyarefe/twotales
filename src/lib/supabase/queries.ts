import { createClient } from "@/lib/supabase/server";
import type { Story, StoryInsert } from "@/types";

export async function saveStory(storyData: StoryInsert, userId: string) {
  const finalObject = { ...storyData, user_id: userId };

  const { data, error } = await (await createClient())
    .from("stories")
    .insert(finalObject)
    .select("*");
  if (!data || error) {
    throw new Error("Error saving story to database");
  }

  return data[0];
}

export async function getUserStories(userId: string, limit?: number) {
  const query = (await createClient())
    .from("stories")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (limit) {
    query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getStoryById(storyId: string): Promise<Story | null> {
  const { data, error } = await (await createClient())
    .from("stories")
    .select("*")
    .eq("id", storyId)
    .single(); // ensures only one result

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function saveQuizQuestions(
  storyId: string,
  questions: { question: string; answer: string }[],
  totalTokens: number = 0
) {
  console.log("saveQuizQuestions function called");
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

  console.log("Quiz created successfully:", data);
  return data;
}

export async function getQuizQuestionsById(quizId: string) {
  const supabase = await createClient();
  const cleanQuizId = quizId.trim();
  const { data, error } = await supabase
    .from("quiz_questions")
    .select("id, question, answer")
    .eq("quiz_id", cleanQuizId);

  console.log("data in db", data);

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

export async function getUserCredits(userId: string): Promise<number> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("story_credit")
    .eq("id", userId)
    .single();

  if (error) throw new Error("Error fetching user credits");
  return data.story_credit ?? 0;
}

export async function deductUserCredit(userId: string): Promise<boolean> {
  const supabase = await createClient();

  // deduct user credit with atomic operation - stored procedure in supabase
  const { data, error } = await supabase.rpc("deduct_credit", {
    user_id: userId,
  });

  if (error) throw new Error(error.message);
  return data?.success ?? false;
}

export async function getUserStoriesCount(userId: string): Promise<number> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("stories")
    .select("id", { count: "exact" })
    .eq("user_id", userId);

  if (error) throw new Error("Error fetching user stories count");

  return data?.length ?? 0; // number of stories
}
