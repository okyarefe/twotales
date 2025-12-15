"use server";

import { openAiClient } from "@/services/openai/client";
import { openAIConfig } from "@/services/openai/config";
import { feedbackSchema } from "@/services/openai/structured-outputs-schema/feedbackSchema";
import { zodTextFormat } from "openai/helpers/zod";

interface GetStoryFeedbackProps {
  userAnswer: string;
  storyCheckReference: string;
  targetLanguage: string;
}

export async function getStoryFeedback({
  userAnswer,
  storyCheckReference,
  targetLanguage,
}: GetStoryFeedbackProps) {
  try {
    console.log("Generating feedback for user's story...");
    const promptForAI = `
You are a language learning assistant. A student has read a story in English and attempted to rewrite it in ${targetLanguage}.

Original Story (English):
${storyCheckReference}

Student's Answer (${targetLanguage}):
${userAnswer}

Analyze the student's answer and provide:
1. A list of specific grammar/language topics they should review based on their mistakes (e.g., "past tense", "verb conjugation", "word order", "vocabulary")
2. A brief encouraging message about their performance
3. An approximate count of significant mistakes

Focus on the most important areas for improvement.
`;

    const response = await openAiClient.responses.create({
      model: openAIConfig.models.STORY_GENERATION_MODEL,
      instructions:
        "You are a helpful language learning assistant that provides constructive feedback on writing exercises.",
      input: promptForAI,
      text: { format: zodTextFormat(feedbackSchema, "feedback_generator") },
    });

    const feedbackText = response.output_text;

    if (!feedbackText || feedbackText.trim() === "") {
      console.error("OpenAI returned empty feedback");
      throw new Error("Failed to generate feedback. Please try again.");
    }

    let parsed;
    try {
      parsed = JSON.parse(feedbackText);
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError);
      console.error("Raw feedback content:", feedbackText);
      throw new Error(
        "Failed to parse AI feedback response. Please try again."
      );
    }

    // Validate with zod schema
    const validated = feedbackSchema.parse(parsed);

    return {
      success: true,
      feedback: validated,
    };
  } catch (error) {
    console.error("Error generating feedback:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred while generating feedback.",
    };
  }
}
