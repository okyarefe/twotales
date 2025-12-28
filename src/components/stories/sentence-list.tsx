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
  <div className="flex-1">
    {Array.from({ length: maxLen }).map((_, idx) => (
      <div
        key={`${side}-${idx}`}
        onMouseEnter={
          hoverable && setHoveredIdx ? () => setHoveredIdx(idx) : undefined
        }
        onMouseLeave={
          hoverable && setHoveredIdx ? () => setHoveredIdx(null) : undefined
        }
        className={`px-2 sm:px-3 py-3 sm:py-4 rounded-lg transition-colors duration-150 flex items-start sm:items-center justify-between gap-2 min-h-[52px] sm:min-h-[60px] ${
          hoveredIdx === idx ? "bg-purple-300" : ""
        } ${hoverable ? "cursor-pointer" : ""}`}
      >
        <span
          aria-hidden={hiddenMask ? !!hiddenMask[idx] : false}
          className={`text-base sm:text-lg leading-relaxed flex-1 font-normal tracking-normal ${hiddenMask && hiddenMask[idx] ? "opacity-0 select-none" : ""}`}
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
            className="text-purple-700 hover:bg-purple-100 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 shrink-0 font-medium"
          >
            {hiddenMask && hiddenMask[idx] ? "Show" : "Hide"}
          </Button>
        ) : (
          <span
            className="inline-block h-8 w-[48px] sm:w-[64px] shrink-0"
            aria-hidden="true"
          />
        )}
      </div>
    ))}
  </div>
);

export default SentenceList;
