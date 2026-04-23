import { createClient } from "@/lib/supabase/server";

export async function getUserFlashcardsCount(userId: string): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("flashcards")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) throw new Error("Error fetching user flashcards count");

  return count ?? 0;
}

export async function verifyFlashcardOwnership(
  flashcardId: string,
  userId: string,
) {
  const supabase = await createClient();
  const { data: flashcard, error } = await supabase
    .from("flashcards")
    .select("id, user_id")
    .eq("id", flashcardId)
    .single();

  if (error || !flashcard || flashcard.user_id !== userId) {
    throw new Error("Flashcard not found or you do not have permission");
  }
}

export async function getFlashcardSentenceCount(
  flashcardId: string,
): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("flashcard_sentences")
    .select("id", { count: "exact", head: true })
    .eq("flashcard_id", flashcardId);

  if (error) {
    throw new Error("Error checking flashcard capacity");
  }

  return count ?? 0;
}

export async function insertFlashcardSentence(
  flashcardId: string,
  sourceSentence: string,
  targetSentence: string,
) {
  const supabase = await createClient();
  const { error } = await supabase.from("flashcard_sentences").insert({
    flashcard_id: flashcardId,
    source_sentence: sourceSentence,
    target_sentence: targetSentence,
    is_learned: false,
  });

  if (error) {
    console.log("-- insert error", error);
    throw new Error("Error adding sentence to flashcard");
  }
}

export async function getFlashcardSentenceWithOwner(sentenceId: string) {
  const supabase = await createClient();
  const { data: sentence, error } = await supabase
    .from("flashcard_sentences")
    .select("id, flashcards!inner(user_id)")
    .eq("id", sentenceId)
    .single();

  if (error || !sentence) {
    throw new Error("Sentence not found");
  }

  return sentence;
}

export async function updateSentenceLearned(
  sentenceId: string,
  isLearned: boolean,
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("flashcard_sentences")
    .update({ is_learned: isLearned })
    .eq("id", sentenceId);

  if (error) {
    throw new Error("Error updating sentence");
  }
}

export async function createFlashcard(
  userId: string,
  name: string,
  description: string,
) {
  const { data, error } = await (
    await createClient()
  )
    .from("flashcards")
    .insert({
      name: name,
      description: description,
      user_id: userId,
      language_pair: "tr-en",
    })
    .select("*");

  if (!data || error) {
    console.log("--errorr", error);
    throw new Error("Error creating flashcard");
  }

  return data[0];
}

export async function deleteFlashcard(userId: string, flashcardId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("flashcards")
    .delete()
    .eq("id", flashcardId)
    .eq("user_id", userId);

  if (error) {
    throw new Error("Error deleting flashcard");
  }
}
