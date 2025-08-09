import { z } from "zod";

export const storySchema = z.object({
  english_version: z.string().min(1, "English version is required"),
  translated_version: z.string().min(1, "Translated version is required"),
});

export type StorySchema = z.infer<typeof storySchema>;
