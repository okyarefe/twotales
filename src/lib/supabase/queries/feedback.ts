import { createClient } from "@/lib/supabase/server";

export async function saveFeedback(
  userId: string,
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
  targetLanguage: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("feedbacks")
    .insert({
      user_id: userId,
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
  storyId: string,
): Promise<boolean> {
  const supabase = await createClient();

  // Check if story exists first
  const { data: existingStory, error: fetchError } = await supabase
    .from("stories")
    .select("id, user_id, feedback_generated")
    .eq("id", storyId)
    .single();

  if (fetchError) {
    throw new Error("Story not found");
  }

  // Now try to update
  const { data, error } = await supabase
    .from("stories")
    .update({ feedback_generated: true })
    .eq("id", storyId)
    .select();

  if (error) {
    throw new Error("Failed to mark story as feedback generated");
  }

  if (!data || data.length === 0) {
    console.error(
      "Update returned no rows. Possible RLS policy blocking update.",
      "Story user_id:",
      existingStory.user_id,
    );
    throw new Error("Update blocked - check RLS policies");
  }

  return true;
}

export async function checkStoryHasFeedback(storyId: string): Promise<boolean> {
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
