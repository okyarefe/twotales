"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addSentenceToFlashcard(
  flashcardId: string,
  sourceSentence: string,
  targetSentence: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to add sentences");
  }

  // Verify the flashcard belongs to the user
  const { data: flashcard, error: flashcardError } = await supabase
    .from("flashcards")
    .select("id, user_id")
    .eq("id", flashcardId)
    .single();

  if (flashcardError || !flashcard || flashcard.user_id !== user.id) {
    throw new Error("Flashcard not found or you do not have permission");
  }

  // Check sentence count limit
  const { count, error: countError } = await supabase
    .from("flashcard_sentences")
    .select("id", { count: "exact", head: true })
    .eq("flashcard_id", flashcardId);

  if (countError) {
    throw new Error("Error checking flashcard capacity");
  }

  if ((count ?? 0) >= 10) {
    throw new Error("This flashcard is full (maximum 10 sentences)");
  }

  // Insert the sentence pair
  const { error: insertError } = await supabase
    .from("flashcard_sentences")
    .insert({
      flashcard_id: flashcardId,
      source_sentence: sourceSentence,
      target_sentence: targetSentence,
    });

  if (insertError) {
    throw new Error("Error adding sentence to flashcard");
  }

  revalidatePath("/flashcards");
}
