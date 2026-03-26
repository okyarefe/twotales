"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  createFlashcard,
  deleteFlashcard,
} from "@/lib/supabase/queries/flashcards";

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

export async function deleteFlashcardAction(flashcardId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to delete flashcards");
  }

  await deleteFlashcard(user.id, flashcardId);
  revalidatePath("/flashcards");
}

export type FormState = { error: string } | { success: true } | null;

export async function createFlashcardFormAction(
  userId: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  try {
    await createFlashcard(userId, name, description);
    revalidatePath("/flashcards");
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create flashcard";
    return { error: message };
  }
}
