"use client";
import React, { useState } from "react";
import SentenceList from "./sentence-list";

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

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
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
        side="B"
      />
    </div>
  );
};
