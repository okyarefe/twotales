"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BookOpen, CheckCircle, Languages, Layers, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteFlashcardAction } from "@/actions/flashcards";
import type { Flashcard } from "@/types";

function formatLanguagePair(pair: string | null) {
  if (!pair) return null;

  const langMap: Record<string, string> = {
    tr: "Turkish",
    fi: "Finnish",
    es: "Spanish",
    fr: "French",
    de: "German",
    en: "English",
  };

  const [source, target] = pair.split("-");
  const sourceName = langMap[source] ?? source.toUpperCase();
  const targetName = langMap[target] ?? target.toUpperCase();

  return `${sourceName} → ${targetName}`;
}

export default function FlashcardCard({ flashcard }: { flashcard: Flashcard }) {
  const sentenceCount = flashcard.flashcard_sentences.length;
  const learnedCount = flashcard.flashcard_sentences.filter(
    (s) => s.is_learned,
  ).length;
  const [isPending, startTransition] = useTransition();
  const [isDeleted, setIsDeleted] = useState(false);

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      const result = await deleteFlashcardAction(flashcard.id);
      if (result.success) {
        setIsDeleted(true);
      } else {
        toast.error(result.error);
      }
    });
  }

  if (isDeleted) return null;

  return (
    <Link href={`/flashcards/${flashcard.id}`}>
      <Card className="h-full cursor-pointer border-slate-200 bg-gradient-to-br from-white to-slate-50 overflow-hidden group relative">
        {/* Accent line at top */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors">
              {flashcard.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                onClick={handleDelete}
                disabled={isPending}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                <Layers className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </div>
          {flashcard.description && (
            <CardDescription className="line-clamp-2">
              {flashcard.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2">
          {flashcard.language_pair && (
            <Badge variant="secondary" className="gap-1.5">
              <Languages className="w-3 h-3" />
              {formatLanguagePair(flashcard.language_pair)}
            </Badge>
          )}
          <Badge variant="outline" className="gap-1.5">
            <BookOpen className="w-3 h-3" />
            {sentenceCount} {sentenceCount === 1 ? "sentence" : "sentences"}
          </Badge>
          {learnedCount > 0 && (
            <Badge
              variant="outline"
              className="gap-1.5 border-green-200 text-green-700 bg-green-50"
            >
              <CheckCircle className="w-3 h-3" />
              {learnedCount}/{sentenceCount}
            </Badge>
          )}
        </CardContent>

        <CardFooter>
          <span className="text-xs text-slate-400 group-hover:text-purple-500 transition-colors">
            Click to study →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
