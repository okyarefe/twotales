import Link from "next/link";
import { Story } from "@/types";
import { getUserStories, searchUserStories } from "@/lib/supabase/queries";
import { StoryCard } from "@/components/stories/story-card";
import StoryEmpty from "./story-empty";

const PAGE_SIZE = 8;

interface StoryListServerProps {
  userId: string;
  query: string;
  page: number;
}

export default async function StoryListServer({
  userId,
  query,
  page,
}: StoryListServerProps) {
  let stories: Story[];
  let totalPages = 1;

  if (query) {
    stories = await searchUserStories(userId, query, 50);
  } else {
    const result = await getUserStories(userId, page, PAGE_SIZE);
    stories = result.stories;
    totalPages = Math.ceil(result.total / PAGE_SIZE);
  }

  if (stories.length === 0) {
    return <StoryEmpty isSearch={!!query} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <StoryCard key={story.id} story={story} index={index} />
        ))}
      </div>

      {/* Pagination — only for non-search views */}
      {!query && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          {page > 1 ? (
            <Link
              href={`/stories?page=${page - 1}`}
              className="px-4 py-2 text-sm font-medium rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Previous
            </Link>
          ) : (
            <span className="px-4 py-2 text-sm font-medium rounded-md bg-white border border-slate-200 text-slate-300 cursor-not-allowed">
              Previous
            </span>
          )}

          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={`/stories?page=${page + 1}`}
              className="px-4 py-2 text-sm font-medium rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Next
            </Link>
          ) : (
            <span className="px-4 py-2 text-sm font-medium rounded-md bg-white border border-slate-200 text-slate-300 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      )}
    </>
  );
}
