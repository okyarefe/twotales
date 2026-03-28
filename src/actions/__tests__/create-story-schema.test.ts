import { describe, it, expect } from "vitest";
import { z } from "zod";
import { languages, languageLevels, grammarTopics } from "@/constants";

// Recreate the schema here since it's not exported from stories.ts
// This tests the validation logic independently of server action side effects
const createStorySchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters long" })
    .regex(/^[a-zA-Z\s-]+$/, {
      message: "Title can only contain letters, spaces, and hyphens",
    }),
  prompt: z
    .string()
    .min(10, { message: "Description should be at least 10 characters long" }),
  language: z.enum([...languages] as [string, ...string[]], {
    errorMap: () => ({ message: "Please choose a language" }),
  }),
  languageLevel: z.enum(languageLevels, {
    errorMap: () => ({ message: "Choose a level" }),
  }),
  topic: z.enum(grammarTopics, {
    errorMap: () => ({ message: "Choose a topic to study" }),
  }),
});

describe("createStorySchema", () => {
  const validInput = {
    title: "My First Story",
    prompt: "A story about a dog who goes on an adventure",
    language: "Turkish",
    languageLevel: "B1",
    topic: "Prepositions",
  };

  it("accepts valid input", () => {
    const result = createStorySchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  describe("title validation", () => {
    it("rejects titles shorter than 3 characters", () => {
      const result = createStorySchema.safeParse({
        ...validInput,
        title: "Hi",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const titleErrors = result.error.flatten().fieldErrors.title;
        expect(titleErrors).toContain(
          "Title should be at least 3 characters long",
        );
      }
    });

    it("rejects titles with numbers", () => {
      const result = createStorySchema.safeParse({
        ...validInput,
        title: "Story123",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const titleErrors = result.error.flatten().fieldErrors.title;
        expect(titleErrors).toContain(
          "Title can only contain letters, spaces, and hyphens",
        );
      }
    });

    it("rejects titles with special characters", () => {
      const result = createStorySchema.safeParse({
        ...validInput,
        title: "Story @#$",
      });
      expect(result.success).toBe(false);
    });

    it("accepts titles with hyphens and spaces", () => {
      const result = createStorySchema.safeParse({
        ...validInput,
        title: "My-First Story",
      });
      expect(result.success).toBe(true);
    });

    it("rejects empty title", () => {
      const result = createStorySchema.safeParse({ ...validInput, title: "" });
      expect(result.success).toBe(false);
    });
  });

  describe("prompt validation", () => {
    it("rejects prompts shorter than 10 characters", () => {
      const result = createStorySchema.safeParse({
        ...validInput,
        prompt: "Too short",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const promptErrors = result.error.flatten().fieldErrors.prompt;
        expect(promptErrors).toContain(
          "Description should be at least 10 characters long",
        );
      }
    });

    it("accepts prompts with exactly 10 characters", () => {
      const result = createStorySchema.safeParse({
        ...validInput,
        prompt: "1234567890",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("language validation", () => {
    it("rejects invalid language", () => {
      const result = createStorySchema.safeParse({
        ...validInput,
        language: "Klingon",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const langErrors = result.error.flatten().fieldErrors.language;
        expect(langErrors).toContain("Please choose a language");
      }
    });

    it("accepts all supported languages", () => {
      for (const lang of languages) {
        const result = createStorySchema.safeParse({
          ...validInput,
          language: lang,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("languageLevel validation", () => {
    it("rejects invalid level", () => {
      const result = createStorySchema.safeParse({
        ...validInput,
        languageLevel: "D1",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const levelErrors = result.error.flatten().fieldErrors.languageLevel;
        expect(levelErrors).toContain("Choose a level");
      }
    });

    it("accepts all supported levels", () => {
      for (const level of languageLevels) {
        const result = createStorySchema.safeParse({
          ...validInput,
          languageLevel: level,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("topic validation", () => {
    it("rejects invalid topic", () => {
      const result = createStorySchema.safeParse({
        ...validInput,
        topic: "Quantum Physics",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const topicErrors = result.error.flatten().fieldErrors.topic;
        expect(topicErrors).toContain("Choose a topic to study");
      }
    });

    it("accepts all supported topics", () => {
      for (const topic of grammarTopics) {
        const result = createStorySchema.safeParse({
          ...validInput,
          topic,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("multiple validation errors", () => {
    it("returns errors for all invalid fields at once", () => {
      const result = createStorySchema.safeParse({
        title: "",
        prompt: "short",
        language: "invalid",
        languageLevel: "X",
        topic: "invalid",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.title).toBeDefined();
        expect(errors.prompt).toBeDefined();
        expect(errors.language).toBeDefined();
        expect(errors.languageLevel).toBeDefined();
        expect(errors.topic).toBeDefined();
      }
    });
  });
});
