import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/supabase/auth-server";
import StorySearch from "@/components/stories/story-search";
import TopicCreateForm from "@/components/stories/story-create-form";
import StoryListServer from "@/components/stories/story-list-server";
import { StoryGridSkeleton } from "@/components/stories/story-skeleton";

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

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section - Matches Dashboard structure for seamless transition */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-20 w-full shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="space-y-6">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
                My Stories
              </h2>
              <div className="flex items-center gap-3">
                <TopicCreateForm />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-slate-600 font-sans hidden sm:block">
                Access and manage all your generated stories in one place.
              </p>
              <div className="relative w-full sm:w-[300px] md:w-[400px] sm:order-first">
                <StorySearch initial={q} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Suspense
          key={q}
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StoryGridSkeleton />
            </div>
          }
        >
          <StoryListServer userId={user.id} query={q} />
        </Suspense>
      </div>
    </div>
  );
}
