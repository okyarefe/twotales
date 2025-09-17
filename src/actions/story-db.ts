"use server";
import { revalidatePath } from "next/cache";
import { deleteStoryById } from "@/lib/supabase/queries";
export async function deleteStoryServerAction(storyId: string) {
  await deleteStoryById(storyId);
  revalidatePath("/dashboard"); // or the path you want to refresh after deletion
}
