import React from "react";
import { Button } from "@/components/ui/button";

export interface SentenceListProps {
  sentences: string[];
  maxLen: number;
  hoveredIdx?: number | null;
  setHoveredIdx?: (idx: number | null) => void;
  side: string;
  hoverable?: boolean;
  hiddenMask?: boolean[];
  onToggle?: (idx: number) => void;
}

const SentenceList: React.FC<SentenceListProps> = ({
  sentences,
  maxLen,
  hoveredIdx,
  setHoveredIdx,
  side,
  hoverable = false,
  hiddenMask,
  onToggle,
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
        className={`px-1 py-2 rounded transition-colors duration-150 flex items-center justify-between gap-2 min-h-[36px] ${
          hoveredIdx === idx ? "bg-purple-200" : ""
        } ${hoverable ? "cursor-pointer" : ""}`}
      >
        <span
          aria-hidden={hiddenMask ? !!hiddenMask[idx] : false}
          className={`${hiddenMask && hiddenMask[idx] ? "opacity-0 select-none" : ""}`}
        >
          {sentences[idx] || ""}
        </span>
        {onToggle ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggle(idx)}
            aria-label={
              hiddenMask && hiddenMask[idx] ? "Show sentence" : "Hide sentence"
            }
            className="text-purple-700"
          >
            {hiddenMask && hiddenMask[idx] ? "Show" : "Hide"}
          </Button>
        ) : (
          <span className="inline-block h-8 w-[64px]" aria-hidden="true" />
        )}
      </div>
    ))}
  </div>
);

export default SentenceList;
