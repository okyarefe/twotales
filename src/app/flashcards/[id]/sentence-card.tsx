"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils/utils";
import type { FlashcardSentence } from "@/types";

export default function SentenceCard({
  sentence,
  index,
}: {
  sentence: FlashcardSentence;
  index: number;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      onClick={() => setRevealed(!revealed)}
      className="w-full text-left rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 hover:shadow-md hover:border-purple-200 group"
    >
      {/* Source sentence */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold flex items-center justify-center mt-0.5">
              {index + 1}
            </span>
            <p className="text-slate-800 font-medium leading-relaxed">
              {sentence.source_sentence}
            </p>
          </div>
          <div className="flex-shrink-0 mt-0.5 text-slate-400 group-hover:text-purple-500 transition-colors">
            {revealed ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* Target sentence (revealed on click) / Hint (hidden) */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: revealed ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-600 text-xs font-semibold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <p className="text-violet-700 font-medium leading-relaxed">
                {sentence.target_sentence}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hint when hidden */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: revealed ? "0fr" : "1fr",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-5 py-2.5 bg-slate-50">
            <p className="text-xs text-slate-400 text-center">
              Tap to reveal translation
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
