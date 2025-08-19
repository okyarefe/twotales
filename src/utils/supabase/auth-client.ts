import { createClient as createClientClient } from "@/lib/supabase/client";

export async function signInWithGoogle() {
  const supabase = createClientClient();
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });
}
