import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle, Languages, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getFlashcardById } from "@/lib/supabase/queries/stories";
import SentenceCard from "./sentence-card";

const langMap: Record<string, string> = {
  tr: "Turkish",
  fi: "Finnish",
  es: "Spanish",
  fr: "French",
  de: "German",
  en: "English",
};

function formatLanguagePair(pair: string | null) {
  if (!pair) return null;
  const [source, target] = pair.split("-");
  const sourceName = langMap[source] ?? source.toUpperCase();
  const targetName = langMap[target] ?? target.toUpperCase();
  return `${sourceName} → ${targetName}`;
}

export default async function FlashcardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const flashcard = await getFlashcardById(id);
  console.log("Fetched flashcard:", flashcard);

  const sentenceCount = flashcard.flashcard_sentences.length;
  const learnedCount = flashcard.flashcard_sentences.filter(
    (s) => s.is_learned,
  ).length;

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-20 w-full shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <Link
            href="/flashcards"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to flashcards
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
                {flashcard.name}
              </h1>
              {flashcard.description && (
                <p className="text-sm text-slate-500">
                  {flashcard.description}
                </p>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                {flashcard.language_pair && (
                  <Badge variant="secondary" className="gap-1.5">
                    <Languages className="w-3 h-3" />
                    {formatLanguagePair(flashcard.language_pair)}
                  </Badge>
                )}
                <Badge variant="outline" className="gap-1.5">
                  <BookOpen className="w-3 h-3" />
                  {sentenceCount}{" "}
                  {sentenceCount === 1 ? "sentence" : "sentences"}
                </Badge>
                {sentenceCount > 0 && (
                  <Badge
                    variant="outline"
                    className="gap-1.5 border-green-200 text-green-700 bg-green-50"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {learnedCount}/{sentenceCount} learned
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
              <Layers className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Sentence cards */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {sentenceCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-1">
              No sentences yet
            </h3>
            <p className="text-sm text-slate-500">
              This flashcard doesn&apos;t have any sentences.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-4">
              Tap each sentence to reveal its translation.
            </p>
            {flashcard.flashcard_sentences.map((sentence, index) => (
              <SentenceCard
                key={sentence.id}
                sentence={sentence}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
