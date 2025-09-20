"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export interface QuizQuestion {
  id: string;
  question: string;
  answer: string;
}

interface QuizShowPageProps {
  questions: QuizQuestion[];
}

export const QuizShowPage: React.FC<QuizShowPageProps> = ({ questions }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="max-w-xl mx-auto px-2">
      <h2 className="text-center text-lg font-semibold mb-4">Quiz Questions</h2>
      <ul className="list-none p-0">
        {questions.map((q, idx) => (
          <li key={q.id} className="mb-2">
            <Button
              variant="outline"
              className={`w-full text-left sm:text-xs whitespace-normal break-words !normal-case !h-auto !shrink items-start !flex-wrap px-6 py-4 leading-relaxed rounded-lg ${
                openIdx === idx ? "font-bold" : ""
              }`}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              {q.question}
            </Button>
            {openIdx === idx && (
              <div className="border border-purple-300 rounded px-3 py-2 mt-1 italic text-purple-700 bg-white break-words whitespace-pre-line">
                {q.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
