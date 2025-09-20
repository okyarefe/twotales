import React from "react";

export interface SentenceListProps {
  sentences: string[];
  maxLen: number;
  hoveredIdx?: number | null;
  setHoveredIdx?: (idx: number | null) => void;
  side: string;
  hoverable?: boolean;
}

const SentenceList: React.FC<SentenceListProps> = ({
  sentences,
  maxLen,
  hoveredIdx,
  setHoveredIdx,
  side,
  hoverable = false,
}) => (
  <div className="flex-1 sm:text-xm md:text-base">
    {Array.from({ length: maxLen }).map((_, idx) => (
      <div
        key={`${side}-${idx}`}
        onMouseEnter={
          hoverable && setHoveredIdx ? () => setHoveredIdx(idx) : undefined
        }
        onMouseLeave={
          hoverable && setHoveredIdx ? () => setHoveredIdx(null) : undefined
        }
        className={`px-1 py-1 rounded mb-1 transition-colors duration-150 ${
          hoveredIdx === idx ? "bg-purple-200" : ""
        } ${hoverable ? "cursor-pointer" : ""}`}
      >
        {sentences[idx] || ""}
      </div>
    ))}
  </div>
);

export default SentenceList;
