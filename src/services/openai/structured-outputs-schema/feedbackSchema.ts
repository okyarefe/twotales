import { z } from "zod";

const exampleSchema = z.object({
  incorrect: z
    .string()
    .describe(
      "The user's original incorrect sentence or fragment. Empty string if none found."
    ),
  corrected: z
    .string()
    .describe(
      "Corrected version of the incorrect text. Empty string if none found."
    ),
  explanation: z
    .string()
    .describe(
      "Short explanation why the correction is needed (1-2 sentences)."
    ),
});

export const topicFeedbackSchema = z.object({
  topic: z
    .string()
    .describe("Topic name, e.g., 'Verb conjugation', 'Prepositions'."),
  short_explanation: z
    .string()
    .describe("One-line reason why this topic was flagged (concise)."),
  example: exampleSchema.describe(
    "One representative mistake and its correction for this topic."
  ),
  occurrences: z
    .number()
    .describe("Approximate number of related mistakes found for this topic"),
});

export const feedbackSchema = z.object({
  topics_to_review: z
    .array(topicFeedbackSchema)
    .describe(
      "List of topics; each includes exactly one example mistake + correction."
    ),
  brief_feedback: z
    .string()
    .describe(
      "A short, encouraging summary message about overall performance."
    ),
  mistakes_count: z
    .number()
    .describe(
      "Approximate total number of significant mistakes found across all topics."
    ),
});

export type FeedbackResponse = z.infer<typeof feedbackSchema>;
