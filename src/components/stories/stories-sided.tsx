"use client";
import React, { useState } from "react";

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
      {/* Story A */}
      <div style={{ flex: 1 }}>
        {Array.from({ length: maxLen }).map((_, idx) => (
          <div
            key={"A-" + idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              background: hoveredIdx === idx ? "yellow" : "transparent",
              padding: "4px",
              borderRadius: "4px",
              marginBottom: "4px",
              cursor: "pointer",
            }}
          >
            {sentencesA[idx] || ""}
          </div>
        ))}
      </div>
      {/* Story B */}
      <div style={{ flex: 1 }}>
        {Array.from({ length: maxLen }).map((_, idx) => (
          <div
            key={"B-" + idx}
            style={{
              background: hoveredIdx === idx ? "yellow" : "transparent",
              padding: "4px",
              borderRadius: "4px",
              marginBottom: "4px",
            }}
          >
            {sentencesB[idx] || ""}
          </div>
        ))}
      </div>
    </div>
  );
};
