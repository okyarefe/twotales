"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { X } from "lucide-react";

interface StorySearchProps {
  initial?: string;
}

export default function StorySearch({ initial = "" }: StorySearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const [debounced, setDebounced] = useState(initial);
  const [isPending, startTransition] = useTransition();

  // debounce user input
  useEffect(() => {
    const t = setTimeout(() => {
      const trimmed = value.trim();
      
      if (trimmed === "") {
        setDebounced("");
      } else if (trimmed.length >= 2) {
        setDebounced(trimmed);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [value]);

  useEffect(() => {
    // push search param when debounced value changes
      const params = new URLSearchParams(window.location.search);
      if (debounced) {
        params.set("q", debounced);
      } else {
        params.delete("q");
      }

      const qs = params.toString();
      const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      
      startTransition(() => {
        router.push(url);
      });
    
  }, [debounced, router]);

    

  const onClear = useCallback(() => {
    setValue("");
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <input
        aria-label="Search stories by title"
        placeholder="Search by title..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-3 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      {isPending ? (
        <div
          className="w-5 h-5 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      ) : value ? (
        <button
          onClick={onClear}
          className="p-2 rounded-md hover:bg-slate-100"
          aria-label="Clear search"
        >
          <X className="w-6 h-6 text-slate-600 border border-violet-400 rounded-md" />
        </button>
      ) : null}
      {isPending ? <span className="sr-only" aria-live="polite">Searching…</span> : null}
    </div>
  );
}
