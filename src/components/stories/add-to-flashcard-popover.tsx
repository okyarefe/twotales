"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Layers, Loader2, Search, Link } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useUser } from "@/contexts/user-context";
import { createClient } from "@/lib/supabase/client";
import { addSentenceToFlashcard } from "@/actions/flashcards";
import { type FlashcardListItem } from "@/lib/supabase/queries/stories";
import { getUserFlashcardList } from "@/lib/supabase/queries/client/flashcards";

export default function AddToFlashcardPopover({
  sourceSentence,
  targetSentence,
}: {
  sourceSentence: string;
  targetSentence: string;
}) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [flashcards, setFlashcards] = useState<FlashcardListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open || !user) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const list = await getUserFlashcardList(user!.id, createClient(), {
          search,
        });
        setFlashcards(list);
      } catch {
        toast.error("Failed to load flashcards");
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [open, user, search]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setSearch("");
  }

  async function handleAdd(flashcardId: string) {
    setAdding(flashcardId);
    const result = await addSentenceToFlashcard(flashcardId, sourceSentence, targetSentence);
    if (result.success) {
      toast.success("Sentence added to flashcard");
      setOpen(false);
    } else {
      toast.error(result.error);
    }
    setAdding(null);
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Add sentence to flashcard"
          className="text-purple-700 hover:bg-purple-100 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 shrink-0 font-medium"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-0">
        <div className="px-3 py-2 border-b border-slate-100">
          <p className="text-sm font-medium text-slate-700">Add to flashcard</p>
        </div>

        <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flashcards..."
            className="text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent w-full"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
          </div>
        ) : flashcards.length === 0 ? (
          <div className="px-3 py-4 text-center">
            <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            {search.trim() ? (
              <p className="text-sm text-slate-500">
                No flashcards match &quot;{search}&quot;
              </p>
            ) : (
              <>
                <p className="text-sm text-slate-500">No flashcards yet</p>
                <Link
                  href="/flashcards"
                  className="text-xs text-purple-600 hover:underline mt-1 inline-block"
                >
                  Go to flashcards
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="max-h-48 overflow-y-auto">
            {flashcards.map((fc) => {
              const isFull = fc.sentence_count >= 10;
              const isAdding = adding === fc.id;

              return (
                <button
                  key={fc.id}
                  onClick={() => !isFull && !isAdding && handleAdd(fc.id)}
                  disabled={isFull || isAdding}
                  className="w-full text-left px-3 py-2.5 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-sm text-slate-700 truncate">
                    {fc.name}
                  </span>
                  <span className="text-xs text-slate-400 shrink-0">
                    {isAdding ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : isFull ? (
                      "Full"
                    ) : (
                      `${fc.sentence_count}/10`
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
