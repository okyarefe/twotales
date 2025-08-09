import { createClient } from "@/lib/supabase/server";
import { getUserStories } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import TopicCreateForm from "@/components/topics/topic-create-form";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const stories = await getUserStories(user.id);
  console.log("User stories", stories);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
      </div>

      <TopicCreateForm></TopicCreateForm>
    </div>
  );
}
