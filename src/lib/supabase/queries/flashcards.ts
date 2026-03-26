import { createClient } from "@/lib/supabase/server";

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
