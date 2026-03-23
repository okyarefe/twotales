import { createClient } from "@/lib/supabase/server";

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

export async function addStoryCreditsToUser(userId: string, amount: number) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("add_story_credits", {
    user_id_param: userId,
    amount_param: amount,
  });

  if (error) throw error;
}
