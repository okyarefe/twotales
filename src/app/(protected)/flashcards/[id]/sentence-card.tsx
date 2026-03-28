"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, CheckCircle, Circle } from "lucide-react";
import { toggleSentenceLearnedAction } from "@/actions/flashcards";
import type { FlashcardSentence } from "@/types";

export default function SentenceCard({
  sentence,
  index,
}: {
  sentence: FlashcardSentence;
  index: number;
}) {
  const [revealed, setRevealed] = useState(false);
  const [learned, setLearned] = useState(sentence.is_learned);
  const [isPending, startTransition] = useTransition();

  function handleToggleLearned(e: React.MouseEvent) {
    e.stopPropagation();
    const newValue = !learned;
    setLearned(newValue);
    startTransition(async () => {
      const result = await toggleSentenceLearnedAction(sentence.id, newValue);
      if (!result.success) {
        setLearned(!newValue);
      }
    });
  }

  return (
    <div
      onClick={() => setRevealed(!revealed)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setRevealed(!revealed);
        }
      }}
      className={`w-full text-left rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-md group cursor-pointer ${
        learned
          ? "border-green-200 bg-green-50/30 hover:border-green-300"
          : "border-slate-200 bg-white hover:border-purple-200"
      }`}
    >
      {/* Source sentence */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center mt-0.5 ${
                learned
                  ? "bg-green-100 text-green-600"
                  : "bg-indigo-100 text-indigo-600"
              }`}
            >
              {index + 1}
            </span>
            <p className="text-slate-800 font-medium leading-relaxed">
              {sentence.source_sentence}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
            <button
              onClick={handleToggleLearned}
              disabled={isPending}
              className={`transition-colors p-1 rounded-md hover:bg-green-100 ${
                learned
                  ? "text-green-500"
                  : "text-slate-300 hover:text-green-500"
              }`}
              title={learned ? "Mark as not learned" : "Mark as learned"}
            >
              {learned ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
            <div className="text-slate-400 group-hover:text-purple-500 transition-colors">
              {revealed ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </div>
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
    </div>
  );
}
