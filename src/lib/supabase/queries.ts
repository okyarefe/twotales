import { createClient } from "@/lib/supabase/server";

import type { Story, StoryInsert } from "@/types";
import type { FeedbackResponse } from "@/services/openai/structured-outputs-schema/feedbackSchema";

export async function saveStory(storyData: StoryInsert, userId: string) {
  const finalObject = { ...storyData, user_id: userId };

  const { data, error } = await (await createClient())
    .from("stories")
    .insert(finalObject)
    .select("*");
  if (!data || error) {
    throw new Error("Error saving story to database");
  }

  // Increment the user's num_stories count using a stored procedure
  const { error: incrementError } = await (
    await createClient()
  ).rpc("increment_num_stories", { user_id: userId });

  if (incrementError) {
    throw new Error("Error updating user's story count");
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

export async function searchUserStories(
  userId: string,
  titleQuery: string,
  limit?: number
) {
  const supabase = await createClient();

  const cleanQuery = titleQuery?.trim();

  // If empty search, fallback to getUserStories
  if (!cleanQuery) {
    return getUserStories(userId, limit);
  }

  const ilikePattern = `%${cleanQuery.replace(/%/g, "\\%").replace(/_/g, "\\_")}%`;

  const query = supabase
    .from("stories")
    .select("*")
    .eq("user_id", userId)
    .ilike("title", ilikePattern)
    .order("created_at", { ascending: false });

  if (limit) query.limit(limit);

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

// Implemented num_stories field to the users table instead of
// using this function
export async function getUserStoriesCount(userId: string): Promise<number> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("stories")
    .select("id", { count: "exact" })
    .eq("user_id", userId);

  if (error) throw new Error("Error fetching user stories count");

  return data?.length ?? 0; // number of stories
}

export async function deleteStoryById(storyId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stories")
    .delete()
    .eq("id", storyId);
  console.log("Delete story data:", data);
  if (error) {
    console.error("Error deleting story:", error.message);
    return false;
  }

  return true;
}

interface SaveFeedbackParams {
  userId: string;
  entryType: string;
  entryId: string;
  targetLanguage: string;
  topics: string[];
  feedback: FeedbackResponse;
  model?: string;
  tokenCost?: number;
}

export async function saveFeedback(params: SaveFeedbackParams) {
  const supabase = await createClient();
  
  const {
    userId,
    entryType,
    entryId,
    targetLanguage,
    topics,
    feedback,
    model,
    tokenCost,
  } = params;

  const { data, error } = await supabase
    .from("story_feedback")
    .upsert(
      {
        user_id: userId,
        entry_type: entryType,
        entry_id: entryId,
        target_language: targetLanguage,
        topics,
        feedback,
        brief_feedback: feedback.brief_feedback,
        mistakes_count: feedback.mistakes_count,
        model,
        token_cost: tokenCost,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,entry_type,entry_id",
      }
    )
    .select("*")
    .single();

  if (error) {
    console.error("Error saving feedback:", error.message);
    throw new Error("Failed to save feedback to database");
  }

  return data;
}
