import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/actions/user-data";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const userId = data.user?.id;
  const userFromSupabase = userId ? await getUserData(userId) : null;

  if (userFromSupabase) {
    redirect("/dashboard"); // 🚀 send logged-in users to dashboard
  }

  return (
    <div>
      <h1>Welcome to TwoTales</h1>
      <p>Please log in to continue.</p>
    </div>
  );
}
