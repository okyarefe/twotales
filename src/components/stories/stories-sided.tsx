"use client";
import React, { useEffect, useState } from "react";
import SentenceList from "./sentence-list";
import { Button } from "@/components/ui/button";

interface StorySideBySideProps {
  storyA: string;
  storyB: string;
}

function splitSentences(story: string): string[] {
  return story
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => s + ".");
}

export const StorySideBySide: React.FC<StorySideBySideProps> = ({
  storyA,
  storyB,
}) => {
  const sentencesA = splitSentences(storyA);
  const sentencesB = splitSentences(storyB);
  const maxLen = Math.max(sentencesA.length, sentencesB.length);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hiddenB, setHiddenB] = useState<boolean[]>(Array(maxLen).fill(true));

  useEffect(() => {
    // Keep hidden mask length in sync with sentence count
    setHiddenB((prev) => {
      if (prev.length === maxLen) return prev;
      const next = Array(maxLen).fill(false);
      for (let i = 0; i < Math.min(prev.length, maxLen); i++) next[i] = prev[i];
      return next;
    });
  }, [maxLen]);

  const toggleSentenceB = (idx: number) => {
    setHiddenB((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const hideAllB = () => {
    setHiddenB(Array(maxLen).fill(true));
  };

  const showAllB = () => {
    setHiddenB(Array(maxLen).fill(false));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-center sm:justify-end gap-2 mb-3 sm:mb-4 sentence-controls">
        <Button
          variant="outline"
          size="sm"
          className="sentence-controls__btn text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5 text-purple-700 border-purple-300 hover:bg-purple-50 font-semibold tracking-wide transition-all"
          onClick={hideAllB}
        >
          Hide all
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="sentence-controls__btn text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5 text-purple-700 border-purple-300 hover:bg-purple-50 font-semibold tracking-wide transition-all"
          onClick={showAllB}
        >
          Show all
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
        <SentenceList
          sentences={sentencesA}
          maxLen={maxLen}
          hoveredIdx={hoveredIdx}
          setHoveredIdx={setHoveredIdx}
          side="A"
          hoverable
        />
        <SentenceList
          sentences={sentencesB}
          maxLen={maxLen}
          hoveredIdx={hoveredIdx}
          setHoveredIdx={setHoveredIdx}
          side="B"
          hoverable
          hiddenMask={hiddenB}
          onToggle={toggleSentenceB}
        />
      </div>
    </div>
  );
};
