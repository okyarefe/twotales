import { languageLevel, storyLength } from "@/types";

export function generateOpenAIStoryPrompt(
  prompt: string,
  language: string,
  level: languageLevel,
  length: storyLength,
  topic?: string
): string {
  const numberOfSentences =
    length === "short" ? 15 : length === "medium" ? 25 : 40;

  const topicLine = topic ? `Focus on practicing ${topic}.` : "";

  return `${prompt} ${topicLine}
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

export function generateFeedbackPrompt(
  userText: string,
  language: string,
  requestedTopics: string[]
): string {
  const topicsList = requestedTopics.map((t) => `- ${t}`).join("\n");

  return `You are a helpful language tutor. Analyze the following learner text (in ${language}) and produce a strict JSON-only response that matches this structure:

{
  "topics_to_review": [
    {"topic":"<topic name>", "short_explanation":"<one-line reason>", "example": {"incorrect":"<user's incorrect text>", "corrected":"<correct version>", "explanation":"<why this is correct>"}, "occurrences": <number>}
  ],
  "brief_feedback": "<one-sentence encouraging summary>",
  "mistakes_count": <integer>
}

Rules:
- Only include topics listed below. For each topic, provide exactly one representative example (the user's original incorrect fragment, the corrected version, and a 1-2 sentence explanation).
- If no mistake is found for a topic, set 'incorrect' and 'corrected' to empty strings and put a short 'explanation': "No significant mistake found." and set 'occurrences' to 0.
-- Keep 'short_explanation' concise (<= 12 words).
-- Keep 'brief_feedback' encouraging and concise (<= 20 words).
- Return valid JSON only — do NOT include any extra commentary, markdown, or surrounding text.

Learner text:
"""
${userText}
"""

Topics to check:
${topicsList}

Produce the JSON now.`;
}
