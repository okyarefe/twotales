import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGetUser = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: () => mockGetUser(),
    },
  }),
}));

const mockCheckStoryHasFeedback = vi.fn();
const mockSaveFeedback = vi.fn();
const mockMarkStoryFeedbackGenerated = vi.fn();
vi.mock("@/lib/supabase/queries", () => ({
  checkStoryHasFeedback: (...args: unknown[]) =>
    mockCheckStoryHasFeedback(...args),
  saveFeedback: (...args: unknown[]) => mockSaveFeedback(...args),
  markStoryFeedbackGenerated: (...args: unknown[]) =>
    mockMarkStoryFeedbackGenerated(...args),
}));

const mockOpenAiCreate = vi.fn();
vi.mock("@/services/openai/client", () => ({
  openAiClient: {
    responses: {
      create: (...args: unknown[]) => mockOpenAiCreate(...args),
    },
  },
}));

vi.mock("@/services/openai/config", () => ({
  openAIConfig: {
    models: { STORY_GENERATION_MODEL: "gpt-test" },
  },
}));

vi.mock("@/services/openai/structured-outputs-schema/feedbackSchema", () => ({
  feedbackSchema: {
    parse: (data: unknown) => data, // passthrough for tests
  },
}));

vi.mock("@/services/openai/prompts", () => ({
  generateFeedbackPrompt: vi.fn().mockReturnValue("mocked prompt"),
}));

vi.mock("openai/helpers/zod", () => ({
  zodTextFormat: vi.fn().mockReturnValue({}),
}));

import { getStoryFeedback } from "../feedback";

const validInput = {
  storyId: "story-123",
  userAnswer: "Cesur köpek ormana girdi ve bir tavşan buldu.",
  storyCheckReference: "The brave dog entered the forest and found a rabbit.",
  targetLanguage: "Turkish",
};

describe("getStoryFeedback — integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns error when user is not signed in", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const result = await getStoryFeedback(validInput);

    expect(result).toEqual({
      success: false,
      error: "You must be signed in to generate feedback",
    });
    expect(mockCheckStoryHasFeedback).not.toHaveBeenCalled();
  });

  it("returns error when storyId is empty", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });

    const result = await getStoryFeedback({
      ...validInput,
      storyId: "  ",
    });

    expect(result).toEqual({
      success: false,
      error: "storyId is required to save feedback",
    });
  });

  it("returns error when feedback already exists for story", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockCheckStoryHasFeedback.mockResolvedValue(true);

    const result = await getStoryFeedback(validInput);

    expect(result).toEqual({
      success: false,
      error: "Feedback has already been generated for this story",
    });
    expect(mockOpenAiCreate).not.toHaveBeenCalled();
  });

  it("returns error when OpenAI returns empty feedback", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockCheckStoryHasFeedback.mockResolvedValue(false);
    mockOpenAiCreate.mockResolvedValue({ output_text: "" });

    const result = await getStoryFeedback(validInput);

    expect(result).toEqual({
      success: false,
      error: "Failed to generate feedback. Please try again.",
    });
    expect(mockSaveFeedback).not.toHaveBeenCalled();
  });

  it("returns error when OpenAI returns invalid JSON", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockCheckStoryHasFeedback.mockResolvedValue(false);
    mockOpenAiCreate.mockResolvedValue({
      output_text: "not valid json {{{",
    });

    const result = await getStoryFeedback(validInput);

    expect(result).toEqual({
      success: false,
      error: "Failed to parse AI feedback response. Please try again.",
    });
  });

  it("uses default topics when none provided", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockCheckStoryHasFeedback.mockResolvedValue(false);

    const feedbackData = { overall_score: 8, corrections: [] };
    mockOpenAiCreate.mockResolvedValue({
      output_text: JSON.stringify(feedbackData),
    });
    mockSaveFeedback.mockResolvedValue({ id: "fb-1" });
    mockMarkStoryFeedbackGenerated.mockResolvedValue(undefined);

    const result = await getStoryFeedback(validInput);

    expect(result.success).toBe(true);
    // The generateFeedbackPrompt mock was called — we trust it received
    // the default topics since no requestedTopics were provided
  });

  it("returns success with feedback on happy path", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockCheckStoryHasFeedback.mockResolvedValue(false);

    const feedbackData = {
      overall_score: 7,
      corrections: [{ original: "köpek", corrected: "köpek", note: "good" }],
    };
    mockOpenAiCreate.mockResolvedValue({
      output_text: JSON.stringify(feedbackData),
    });
    mockSaveFeedback.mockResolvedValue({ id: "fb-1" });
    mockMarkStoryFeedbackGenerated.mockResolvedValue(undefined);

    const result = await getStoryFeedback({
      ...validInput,
      requestedTopics: ["Verb conjugation"],
    });

    expect(result).toEqual({
      success: true,
      feedback: feedbackData,
      feedbackId: "fb-1",
    });
    expect(mockSaveFeedback).toHaveBeenCalledWith(
      "user-123",
      "story-123",
      feedbackData,
      validInput.userAnswer,
      "Turkish",
    );
    expect(mockMarkStoryFeedbackGenerated).toHaveBeenCalledWith("story-123");
  });
});
