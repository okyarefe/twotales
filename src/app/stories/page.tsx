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

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const query = params.q ?? "";
  const q = Array.isArray(query) ? (query[0] ?? "") : (query ?? "");
  const stories: Story[] = q
    ? await searchUserStories(user.id, q, 50)
    : await getUserStories(user.id, 6);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 font-sans min-h-full">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
              <h2 className="text-md sm:text-lg md:text-2xl font-semibold text-slate-800 tracking-tight whitespace-nowrap">
                My Stories
              </h2>
              <div className="flex-1 min-w-[220px] sm:min-w-[260px] md:min-w-[320px] max-w-[420px]">
                <StorySearch initial={q} />
              </div>
            </div>
            <div className="w-full sm:w-auto flex justify-start sm:justify-end">
              <TopicCreateForm />
            </div>
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
