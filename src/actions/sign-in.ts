"use server";
import { createClient } from "@/lib/supabase/server";
export async function signIn() {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  console.log("---SITE URL ----", siteUrl);
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  return data;
}
