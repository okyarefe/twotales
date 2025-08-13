"use client";
import React, { useState } from "react";

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
      <h2>Quiz Questions</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {questions.map((q, idx) => (
          <li key={q.id} style={{ marginBottom: "1rem" }}>
            <button
              style={{
                background: "#f3f3f3",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px 12px",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                fontWeight: openIdx === idx ? "bold" : "normal",
              }}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              {q.question}
            </button>
            {openIdx === idx && (
              <div
                style={{
                  background: "#fffbe6",
                  border: "1px solid #ffe58f",
                  borderRadius: "4px",
                  padding: "8px 12px",
                  marginTop: "4px",
                }}
              >
                {q.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
