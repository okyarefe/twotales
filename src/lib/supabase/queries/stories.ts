import { createClient } from "@/lib/supabase/server";

import type { Story, StoryInsert, Flashcard } from "@/types";

export interface FlashcardListItem {
  id: string;
  name: string;
  sentence_count: number;
}

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

export async function getUserStories(
  userId: string,
  page: number = 1,
  pageSize: number = 8,
): Promise<{ stories: Story[]; total: number }> {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("stories")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return { stories: data as Story[], total: count ?? 0 };
}

export async function searchUserStories(
  userId: string,
  titleQuery: string,
  limit?: number,
): Promise<Story[]> {
  const supabase = await createClient();

  const cleanQuery = titleQuery?.trim();

  // If empty search, fallback to getUserStories
  if (!cleanQuery) {
    const result = await getUserStories(userId);
    return result.stories;
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
    .maybeSingle(); // ensures only one result

  if (error) {
    console.log("getStoryById error");
    throw new Error(error.message);
  }

  return data;
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
  const { error } = await supabase.from("stories").delete().eq("id", storyId);

  if (error) {
    console.error("Error deleting story:", error.message);
    return false;
  }

  return true;
}

export async function getUserFlashcards(
  userId: string,
  page: number = 1,
  pageSize: number = 4,
): Promise<{ flashcards: Flashcard[]; total: number }> {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("flashcards")
    .select(
      `
    id,
    name,
    description,
    language_pair,
    flashcard_sentences (
      id,
      source_sentence,
      target_sentence,
      is_learned
    )
  `,
      { count: "exact" },
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error("Error fetching user flashcards");
  }

  return { flashcards: data as Flashcard[], total: count ?? 0 };
}

export async function getFlashcardById(
  flashcardId: string,
): Promise<Flashcard | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("flashcards")
    .select(
      `
    id,
    name,
    description,
    language_pair,
    flashcard_sentences (
      id,
      source_sentence,
      target_sentence,
      is_learned
    )
  `,
    )
    .eq("id", flashcardId)
    .single();

  if (error) {
    throw new Error("Error fetching flashcard");
  }

  if (!data) {
    return null;
  }

  return data as Flashcard;
}
