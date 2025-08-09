import { languages } from "./constants";

export interface Story {
  id: string;
  created_at: string;
  english_version: string;
  translated_version: string;
  level: string;
  length: string;
  total_tokens: number;
  user_id: string;
  translate_to: string;
}

type StoryInsert = Omit<Story, "id" | "created_at">;

export const languages = [
  "Turkish",
  "Finnish",
  "Spanish",
  "French",
  "German",
] as const;

type Language = (typeof languages)[number];

export type language = "Turkish" | "Finnish" | "Spanish" | "French" | "German";

export type languageLevel =
  | "daily"
  | "academic"
  | "formal"
  | "casual"
  | "technical";

export type storyLength = "short" | "medium" | "long";
