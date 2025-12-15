import { z } from "zod";

export const feedbackSchema = z.object({
  topics_to_review: z.array(z.string()).describe("List of grammar or language topics the user should review based on their mistakes"),
  brief_feedback: z.string().describe("A brief encouraging message about their performance"),
  mistakes_count: z.number().describe("Approximate number of significant mistakes found"),
});

export type FeedbackResponse = z.infer<typeof feedbackSchema>;
