import { Suspense } from "react";
import { getUser } from "@/utils/supabase/auth-server";
import FlashcardListServer from "./flashcard-list-server";

type SearchParams = {
  page?: string | string[] | undefined;
};

export default async function FlashcardsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await getUser();
  const params = await searchParams;

  // Parse page number from URL, default to 1, ensure it's at least 1
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const page = Math.max(1, Number(rawPage) || 1);

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white/50 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-20 w-full shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="space-y-6">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
                My FlashCards
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-slate-600 font-sans hidden sm:block">
                Access and manage all your generated flashcards in one place.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Suspense
          key={page}
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 rounded-lg bg-white border border-slate-200 animate-pulse"
                />
              ))}
            </div>
          }
        >
          <FlashcardListServer userId={user.id} page={page} />
        </Suspense>
      </div>
    </div>
  );
}
