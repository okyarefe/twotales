import Link from "next/link";
import { Layers } from "lucide-react";
import { getUserFlashcards } from "@/lib/supabase/queries/stories";
import FlashcardCard from "./flashcard-card";

const PAGE_SIZE = 4;

export default async function FlashcardListServer({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) {
  const { flashcards, total } = await getUserFlashcards(
    userId,
    page,
    PAGE_SIZE,
  );
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      {flashcards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-1">
            No flashcards yet
          </h3>
          <p className="text-sm text-slate-500">
            Flashcards you create from your stories will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {flashcards.map((flashcard) => (
            <FlashcardCard key={flashcard.id} flashcard={flashcard} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          {page > 1 ? (
            <Link
              href={`/flashcards?page=${page - 1}`}
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
              href={`/flashcards?page=${page + 1}`}
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
