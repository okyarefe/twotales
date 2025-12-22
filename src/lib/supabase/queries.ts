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
  const {  error } = await supabase
    .from("stories")
    .delete()
    .eq("id", storyId);
  
  if (error) {
    console.error("Error deleting story:", error.message);
    return false;
  }

  return true;
}

export async function saveFeedback(
  storyId: string,
  feedbackData: {
    topics_to_review: Array<{
      topic: string;
      short_explanation: string;
      example: {
        incorrect: string;
        corrected: string;
        explanation: string;
      };
      occurrences: number;
    }>;
    brief_feedback: string;
    mistakes_count: number;
  },
  userAnswer: string,
  targetLanguage: string
) {
  const supabase = await createClient();
  
  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("feedbacks")
    .insert({
      user_id: user.id,
      story_id: storyId,
      feedback_data: feedbackData, // JSONB column
      user_answer: userAnswer,
      target_language: targetLanguage,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Error saving feedback:", error.message);
    throw new Error("Failed to save feedback to database");
  }

  return data;
}

export async function markStoryFeedbackGenerated(
  storyId: string
): Promise<boolean> {
  const supabase = await createClient();
  
  // First, verify the story exists and get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
 

  // Check if story exists first
  const { data: existingStory, error: fetchError } = await supabase
    .from("stories")
    .select("id, user_id, feedback_generated")
    .eq("id", storyId)
    .single();

  if (fetchError) {
    console.error("Error fetching story:", fetchError.message);
    throw new Error("Story not found");
  }



  // Now try to update
  const { data, error } = await supabase
    .from("stories")
    .update({ feedback_generated: true })
    .eq("id", storyId)
    .select();

  if (error) {
    console.error("Error updating story feedback status:", error);
    throw new Error(`Failed to mark story as feedback generated: ${error.message}`);
  }

  if (!data || data.length === 0) {
    console.error("Update returned no rows. Possible RLS policy blocking update.");
    console.error("Story user_id:", existingStory.user_id, "Current user_id:", user?.id);
    throw new Error("Update blocked - check RLS policies");
  }

  return true;
}

export async function checkStoryHasFeedback(
  storyId: string
): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("stories")
    .select("feedback_generated")
    .eq("id", storyId)
    .single();

  if (error) {
    console.error("Error checking story feedback status:", error.message);
    return false;
  }

  return data?.feedback_generated ?? false;
}

export async function getFeedbackByStoryId(storyId: string) {
  const supabase = await createClient();
 
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .eq("story_id", storyId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching feedback:", error.message);
    return null;
  }

  return data;
}
