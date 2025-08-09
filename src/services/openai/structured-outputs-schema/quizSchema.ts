import { z } from "zod";

export const quizSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .length(5, "There must be exactly 5 questions"),
});

export type QuizSchema = z.infer<typeof quizSchema>;
