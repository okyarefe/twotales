import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/dashboard";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/dashboard";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // Create user profile if it doesn't exist (using admin client to bypass RLS)
    if (!error) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const adminClient = createAdminClient();

          // Check if user exists
          const { data: existingUser } = await adminClient
            .from("users")
            .select("id")
            .eq("id", user.id)
            .maybeSingle();

          // Create user if doesn't exist
          if (!existingUser) {
            const { error: insertError } = await adminClient
              .from("users")
              .insert({
                id: user.id,
                email: user.email,
                role: "user",
                membership_type: "basic",
                story_credit: 5,
                tts_credit: 0,
              });

            if (insertError) {
              console.error("❌ Error creating user profile:", insertError);
            } else {
              // console.log(
              //   "✅ User profile created successfully for:",
              //   user.email
              // );
            }
          }
        }
      } catch (err) {
        console.error("❌ Error in user creation flow:", err);
      }
    }

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
