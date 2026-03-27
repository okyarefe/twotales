"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  createFlashcard,
  deleteFlashcard,
  verifyFlashcardOwnership,
  getFlashcardSentenceCount,
  insertFlashcardSentence,
  getFlashcardSentenceWithOwner,
  updateSentenceLearned,
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

  await verifyFlashcardOwnership(flashcardId, user.id);

  const count = await getFlashcardSentenceCount(flashcardId);
  if (count >= 10) {
    throw new Error("This flashcard is full (maximum 10 sentences)");
  }

  await insertFlashcardSentence(flashcardId, sourceSentence, targetSentence);

  revalidatePath("/flashcards");
}

export async function toggleSentenceLearnedAction(
  sentenceId: string,
  isLearned: boolean,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to update sentences");
  }

  const sentence = await getFlashcardSentenceWithOwner(sentenceId);
  const flashcardData = sentence.flashcards as unknown as { user_id: string };
  if (flashcardData.user_id !== user.id) {
    throw new Error("You do not have permission to update this sentence");
  }

  await updateSentenceLearned(sentenceId, isLearned);

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
