import type { SupabaseClient } from "@supabase/supabase-js";

export interface FlashcardListItem {
  id: string;
  name: string;
  sentence_count: number;
}

export async function getUserFlashcardList(
  userId: string,
  supabase: SupabaseClient,
): Promise<FlashcardListItem[]> {
  const { data, error } = await supabase
    .from("flashcards")
    .select("id, name, flashcard_sentences(count)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to load flashcards");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((fc: any) => ({
    id: fc.id,
    name: fc.name,
    sentence_count: fc.flashcard_sentences?.[0]?.count ?? 0,
  }));
}
