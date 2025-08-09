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
