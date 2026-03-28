import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// 1) SET UP MOCKS — these must be declared before importing the server action
// ---------------------------------------------------------------------------

// Mock the Supabase server client.
// We create a fake `supabase.auth.getUser()` that we can control per test.
const mockGetUser = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: () => mockGetUser(),
    },
  }),
}));

// Mock Next.js cache — revalidatePath is a no-op in tests
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

// Mock the database queries used by createStory
const mockGetUserCredits = vi.fn();
const mockSaveStory = vi.fn();
const mockSaveQuizQuestions = vi.fn();
const mockDeductUserCredit = vi.fn();
vi.mock("@/lib/supabase/queries", () => ({
  getUserCredits: (...args: unknown[]) => mockGetUserCredits(...args),
  saveStory: (...args: unknown[]) => mockSaveStory(...args),
  saveQuizQuestions: (...args: unknown[]) => mockSaveQuizQuestions(...args),
  deductUserCredit: (...args: unknown[]) => mockDeductUserCredit(...args),
  // These are imported but not used in createStory — still need to export them
  markStoryFeedbackGenerated: vi.fn(),
  checkStoryHasFeedback: vi.fn(),
}));

// Mock OpenAI story/quiz generation (costs real money, is slow)
const mockGenerateStory = vi.fn();
const mockGenerateQuizFromStory = vi.fn();
vi.mock("@/services/openai/generateStory", () => ({
  generateStory: (...args: unknown[]) => mockGenerateStory(...args),
  generateQuizFromStory: (...args: unknown[]) =>
    mockGenerateQuizFromStory(...args),
}));

// ---------------------------------------------------------------------------
// 2) IMPORT the server action — it will receive the mocked dependencies
// ---------------------------------------------------------------------------
import { createStory } from "../stories";

// ---------------------------------------------------------------------------
// 3) HELPERS
// ---------------------------------------------------------------------------

/** Creates a FormData object from a plain object — simulates form submission */
function makeFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    fd.append(key, value);
  }
  return fd;
}

/** Valid form fields that pass schema validation */
const validFields = {
  title: "My Test Story",
  prompt: "A story about a brave dog exploring the forest",
  language: "Turkish",
  languageLevel: "B1",
  topic: "Prepositions",
};

/** The initial form state passed to createStory (first argument) */
const emptyFormState = { errors: {} };

// ---------------------------------------------------------------------------
// 4) TESTS
// ---------------------------------------------------------------------------

describe("createStory — integration", () => {
  // Reset all mocks before each test so they don't leak state
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // TEST 1: Validation fails → never reaches auth or DB
  // -------------------------------------------------------------------------
  it("returns validation errors for invalid form data", async () => {
    const badFormData = makeFormData({
      title: "", // too short
      prompt: "short", // < 10 chars
      language: "Klingon", // not a real language
      languageLevel: "Z9", // invalid
      topic: "Quantum Physics", // not a grammar topic
    });

    const result = await createStory(emptyFormState, badFormData);

    // All fields should have errors
    expect(result.errors.title).toBeDefined();
    expect(result.errors.prompt).toBeDefined();
    expect(result.errors.language).toBeDefined();
    expect(result.errors.languageLevel).toBeDefined();
    expect(result.errors.topic).toBeDefined();
    expect(result.success).toBe(false);

    // IMPORTANT: none of the downstream mocks should have been called.
    // This proves that validation runs FIRST, before auth/DB/AI.
    expect(mockGetUser).not.toHaveBeenCalled();
    expect(mockGetUserCredits).not.toHaveBeenCalled();
    expect(mockGenerateStory).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // TEST 2: Not authenticated → returns auth error
  // -------------------------------------------------------------------------
  it("returns auth error when user is not signed in", async () => {
    // Simulate: supabase.auth.getUser() returns no user
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const result = await createStory(emptyFormState, makeFormData(validFields));

    expect(result.errors._form).toContain(
      "You must be signed in to create a story",
    );
    // Should NOT have checked credits or called AI
    expect(mockGetUserCredits).not.toHaveBeenCalled();
    expect(mockGenerateStory).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // TEST 3: Not enough credits → returns credit error
  // -------------------------------------------------------------------------
  it("returns credit error when user has 0 credits", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockGetUserCredits.mockResolvedValue(0);

    const result = await createStory(emptyFormState, makeFormData(validFields));

    expect(result.errors._form).toContain(
      "You do not have enough credits to create a story",
    );
    // Should NOT have called AI or saved anything
    expect(mockGenerateStory).not.toHaveBeenCalled();
    expect(mockSaveStory).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // TEST 4: Happy path — everything succeeds
  // -------------------------------------------------------------------------
  it("creates story, saves to DB, deducts credit on success", async () => {
    // Set up mocks for the happy path
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockGetUserCredits.mockResolvedValue(5); // user has credits
    mockGenerateStory.mockResolvedValue({
      english: "The brave dog entered the forest.",
      translated: "Cesur köpek ormana girdi.",
      totalTokens: 150,
    });
    mockSaveStory.mockResolvedValue({
      id: "story-abc",
      english_version: "The brave dog entered the forest.",
      translated_version: "Cesur köpek ormana girdi.",
    });
    mockGenerateQuizFromStory.mockResolvedValue({
      id: "quiz-1",
      totalTokens: 80,
      questions: [{ question: "Where did the dog go?", answer: "The forest" }],
    });
    mockSaveQuizQuestions.mockResolvedValue(undefined);
    mockDeductUserCredit.mockResolvedValue(true);

    const result = await createStory(emptyFormState, makeFormData(validFields));

    // Should succeed with no errors
    expect(result.success).toBe(true);
    expect(result.errors).toEqual({});

    // Verify the full chain was called in order
    expect(mockGetUserCredits).toHaveBeenCalledWith("user-123");
    expect(mockGenerateStory).toHaveBeenCalledWith({
      title: "My Test Story",
      prompt: "A story about a brave dog exploring the forest",
      language: "Turkish",
      languageLevel: "B1",
      topic: "Prepositions",
    });
    expect(mockSaveStory).toHaveBeenCalled();
    expect(mockGenerateQuizFromStory).toHaveBeenCalled();
    expect(mockSaveQuizQuestions).toHaveBeenCalled();
    expect(mockDeductUserCredit).toHaveBeenCalledWith("user-123");
  });

  // -------------------------------------------------------------------------
  // TEST 5: OpenAI failure → returns error, does NOT deduct credit
  // -------------------------------------------------------------------------
  it("returns error and does not deduct credit when AI generation fails", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockGetUserCredits.mockResolvedValue(5);
    mockGenerateStory.mockRejectedValue(
      new Error("Story generation failed: API timeout"),
    );

    const result = await createStory(emptyFormState, makeFormData(validFields));

    expect(result.errors._form).toContain(
      "Story generation failed: API timeout",
    );
    // Credit should NOT be deducted if generation fails
    expect(mockDeductUserCredit).not.toHaveBeenCalled();
    expect(mockSaveStory).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // TEST 6: DB save fails → returns error, does NOT deduct credit
  // -------------------------------------------------------------------------
  it("returns error and does not deduct credit when DB save fails", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockGetUserCredits.mockResolvedValue(5);
    mockGenerateStory.mockResolvedValue({
      english: "A story",
      translated: "Bir hikaye",
      totalTokens: 100,
    });
    mockSaveStory.mockRejectedValue(
      new Error("Error saving story to database"),
    );

    const result = await createStory(emptyFormState, makeFormData(validFields));

    expect(result.errors._form).toContain("Error saving story to database");
    // Credit should NOT be deducted if save fails
    expect(mockDeductUserCredit).not.toHaveBeenCalled();
  });
});
