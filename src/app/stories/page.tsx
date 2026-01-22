import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/supabase/auth-server";
import StorySearch from "@/components/stories/story-search";
import TopicCreateForm from "@/components/stories/story-create-form";
import StoriesListServer from "@/components/stories/stories-list-server";
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
    <main className="min-h-screen bg-slate-50/50">
      {/* Hero / Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                My Stories
              </h1>
              <p className="text-slate-500 text-sm md:text-base">
                Access and manage all your generated stories in one place.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative w-full sm:w-[300px] md:w-[400px]">
                <StorySearch initial={q} />
              </div>
              <div className="shrink-0">
                <TopicCreateForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Suspense key={q} fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StoryGridSkeleton />
          </div>
        }>
          <StoriesListServer userId={user.id} query={q} />
        </Suspense>
      </div>
    </main>
  );
}
