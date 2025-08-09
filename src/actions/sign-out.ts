"use server";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient()
  return supabase.auth.signOut()
}
