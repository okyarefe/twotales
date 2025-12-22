import { Story } from "@/types";
import { redirect } from "next/navigation";
import { getUserStories, searchUserStories } from "@/lib/supabase/queries";

import { StoryCard } from "@/components/stories/story-card";
import TopicCreateForm from "@/components/stories/story-create-form";
import { getUser } from "@/utils/supabase/auth-server";
import StorySearch from "@/components/stories/story-search";

type SearchParams = {
  q?: string | string[] | undefined;
};


export default async function StoriesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const query =  params.q ?? "";
  const q = Array.isArray(query) ? query[0] ?? "" : query ?? "";
  const stories: Story[] = q
    ? await searchUserStories(user.id, q, 50)
    : await getUserStories(user.id, 6);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <TopicCreateForm />
          </div>
          <p className="text-sm text-slate-600 font-sans mt-1">
            Your personalized language learning journey
          </p>
          <div className="flex items-center gap-4">
              <h2 className="text-md sm:text-lg md:text-2xl font-semibold text-slate-800 tracking-tight">
                My Stories
              </h2>
              <StorySearch initial={q} />
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
