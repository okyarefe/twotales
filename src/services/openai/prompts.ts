import { languageLevel, storyLength } from "@/types";

export function generateOpenAIStoryPrompt(
  prompt: string,
  language: string,
  level: languageLevel,
  length: storyLength
): string {
  const numberOfSentences =
    length === "short" ? 15 : length === "medium" ? 25 : 40;

  return `${prompt} +
          I want to hear the same story in English and ${language} using ${level} vocabulary. 
          

          First, give me the complete English story, then the same story in ${language}. Do not mix any content!

          Make sure:
          - The number of sentences in both stories are exactly the same.
          - Each sentence corresponds directly to the sentence in the other language.
          - Each story must have ${numberOfSentences} sentences. Ignore if otherwise specified.
          - Do not include any ** or other special formatting characters in the sentences.

          Please ensure that both stories match sentence-for-sentence precisely.`;
}

export function extractStories(text: string): {
  english: string;
  translated: string;
} {
  const englishMatch = text.match(/English:\s*([\s\S]*?)\s*Turkish:/i);
  const translatedMatch = text.match(/Turkish:\s*([\s\S]*)/i);

  return {
    english: englishMatch?.[1]?.trim() ?? "",
    translated: translatedMatch?.[1]?.trim() ?? "",
  };
}

export function getTranslatedStory(
  stories: Record<string, string> | undefined
): string | null {
  if (!stories) return null;

  for (const [key, value] of Object.entries(stories)) {
    if (key.toLowerCase() !== "english" && value) {
      return value;
    }
  }

  return null;
}
