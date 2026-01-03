"use server";
import { createClient } from "@/lib/supabase/server";
export async function signIn() {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  console.log(
    " +000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  );
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  return data;
}

export async function signOut() {
  const supabase = await createClient();
  return supabase.auth.signOut();
}
