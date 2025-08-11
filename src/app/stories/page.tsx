import { createClient } from "@/lib/supabase/server";
import { Story } from "@/types";
import { redirect } from "next/navigation";
import { getUserStories } from "@/lib/supabase/queries";

import { StoryCard } from "@/components/stories/story-card";
import TopicCreateForm from "@/components/stories/story-create-form";

export default async function StoriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const stories: Story[] = await getUserStories(user.id);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
                My Stories
              </h2>
              <p className="text-sm text-slate-600 font-sans mt-1">
                Your personalized language learning journey
              </p>
            </div>

            <TopicCreateForm></TopicCreateForm>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
