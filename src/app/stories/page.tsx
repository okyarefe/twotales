import { Story } from "@/types";
import { redirect } from "next/navigation";
import { getUserStories } from "@/lib/supabase/queries";

import { StoryCard } from "@/components/stories/story-card";
import TopicCreateForm from "@/components/stories/story-create-form";
import { getUser } from "@/utils/auth";

export default async function StoriesPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const stories: Story[] = await getUserStories(user.id, 6);
  console.log("My stories page!");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
              My Stories
            </h2>
            <TopicCreateForm />
          </div>
          <p className="text-sm text-slate-600 font-sans mt-1">
            Your personalized language learning journey
          </p>
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
