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
    <div>
      <h2 className="text-lg font-semibold mb-4">Quiz Questions</h2>
      <ul className="list-none p-0">
        {questions.map((q, idx) => (
          <li key={q.id} className="mb-4">
            <Button
              variant="outline"
              className={`w-full text-left ${
                openIdx === idx ? "font-bold" : ""
              }`}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              {q.question}
            </Button>
            {openIdx === idx && (
              <div className="border border-purple-300 rounded px-3 py-2 mt-1 italic text-purple-700">
                {q.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
