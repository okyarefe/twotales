import { quizSchema } from "./structured-outputs-schema/quizSchema";
import { languageLevel } from "@/types";
import { openAiClient } from "./client";
import { openAIConfig } from "./config";
import { generateOpenAIStoryPrompt } from "./prompts";
import { storySchema } from "./structured-outputs-schema/storySchema";
import { zodTextFormat } from "openai/helpers/zod";

interface GenerateStoryProps {
  title: string;
  prompt: string;
  language: string;
  languageLevel: string;
}

export async function generateStory(props: GenerateStoryProps) {
  try {
    const promptForOpenAI = generateOpenAIStoryPrompt(
      props.prompt,
      props.language,
      props.languageLevel as languageLevel,
      "medium"
    );

    const response = await openAiClient.responses.create({
      model: openAIConfig.models.STORY_GENERATION_MODEL,
      instructions: openAIConfig.systemPrompts.STORY_GENERATION,
      input: promptForOpenAI,
      text: { format: zodTextFormat(storySchema, "story_generator") },
    });

    const totalTokens = response.usage?.total_tokens;
    console.log("TOTAL TOKENS", totalTokens);
    const story = response.output_text;
    console.log("STORY", story);

    // Check if story is empty or null
    if (!story || story.trim() === "") {
      console.error("Open AI returned empty story");
      throw new Error("Failed to generate story..Please try again");
    }

    let parsed;
    try {
      parsed = JSON.parse(story);
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError);
      console.error("Raw story content:", story);
      throw new Error("Failed to parse AI response as JSON..please try again");
    }

    // Validate the parsed object has required properties
    if (!parsed.english_version || !parsed.translated_version) {
      console.error("Missing required properties in parsed response:", parsed);
      throw new Error(
        "AI response missing required story versions..please try again"
      );
    }

    const generatedStories = {
      english: parsed.english_version,
      translated: parsed.translated_version,
      totalTokens: totalTokens || 0,
    };

    return generatedStories;
  } catch (error) {
    // Re-throw with more context
    if (error instanceof Error) {
      throw new Error(`Story generation failed: ${error.message}`);
    } else {
      throw new Error("Story generation failed with unknown error");
    }
  }
}

export async function generateQuizFromStory(story: {
  english: string;
  translated: string;
  total_tokens?: number;
}): Promise<{
  id: string;
  totalTokens: number;
  questions: { question: string; answer: string }[];
}> {
  try {
    const response = await openAiClient.responses.parse({
      model: openAIConfig.models.QUIZ_GENERATION_MODEL,
      input: [
        {
          role: "system",
          content:
            "You are a quiz generator. Generate a quiz with exactly 5 questions based on the provided story. Each question should have a clear answer.",
        },
        {
          role: "user",
          content: story.translated,
        },
      ],
      text: {
        format: zodTextFormat(quizSchema, "quiz_questions_generator"),
      },
    });

    if (response.output_parsed) {
      const quizReturn = {
        id: response.id,
        totalTokens: response.usage?.total_tokens || 0,
        questions: response.output_parsed.questions,
      };

      return quizReturn;
    } else {
      throw new Error("Quiz parsing failed: No valid response received.");
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz. Please try again later.");
  }
}
