import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getUser(): Promise<User> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    throw new Error("User not authenticated");
  }

  return data.user;
}
