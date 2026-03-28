import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGetUser = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: () => mockGetUser(),
    },
  }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

const mockVerifyFlashcardOwnership = vi.fn();
const mockGetFlashcardSentenceCount = vi.fn();
const mockInsertFlashcardSentence = vi.fn();
vi.mock("@/lib/supabase/queries/flashcards", () => ({
  verifyFlashcardOwnership: (...args: unknown[]) =>
    mockVerifyFlashcardOwnership(...args),
  getFlashcardSentenceCount: (...args: unknown[]) =>
    mockGetFlashcardSentenceCount(...args),
  insertFlashcardSentence: (...args: unknown[]) =>
    mockInsertFlashcardSentence(...args),
  // Other exports from this module (not used by addSentenceToFlashcard)
  createFlashcard: vi.fn(),
  deleteFlashcard: vi.fn(),
  getFlashcardSentenceWithOwner: vi.fn(),
  updateSentenceLearned: vi.fn(),
}));

import { addSentenceToFlashcard } from "../flashcards";

describe("addSentenceToFlashcard — integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns error when user is not signed in", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const result = await addSentenceToFlashcard(
      "fc-1",
      "Hello",
      "Merhaba",
    );

    expect(result).toEqual({
      success: false,
      error: "You must be signed in to add sentences",
    });
    expect(mockVerifyFlashcardOwnership).not.toHaveBeenCalled();
  });

  it("returns error when user does not own the flashcard", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockVerifyFlashcardOwnership.mockRejectedValue(
      new Error("Flashcard not found or you do not have permission"),
    );

    const result = await addSentenceToFlashcard(
      "fc-1",
      "Hello",
      "Merhaba",
    );

    expect(result).toEqual({
      success: false,
      error: "Flashcard not found or you do not have permission",
    });
    expect(mockInsertFlashcardSentence).not.toHaveBeenCalled();
  });

  it("returns error when flashcard is full (10 sentences)", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockVerifyFlashcardOwnership.mockResolvedValue(undefined);
    mockGetFlashcardSentenceCount.mockResolvedValue(10);

    const result = await addSentenceToFlashcard(
      "fc-1",
      "Hello",
      "Merhaba",
    );

    expect(result).toEqual({
      success: false,
      error: "This flashcard is full (maximum 10 sentences)",
    });
    expect(mockInsertFlashcardSentence).not.toHaveBeenCalled();
  });

  it("allows adding when flashcard has 9 sentences", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockVerifyFlashcardOwnership.mockResolvedValue(undefined);
    mockGetFlashcardSentenceCount.mockResolvedValue(9);
    mockInsertFlashcardSentence.mockResolvedValue(undefined);

    const result = await addSentenceToFlashcard(
      "fc-1",
      "Hello",
      "Merhaba",
    );

    expect(result).toEqual({ success: true, data: undefined });
    expect(mockInsertFlashcardSentence).toHaveBeenCalledWith(
      "fc-1",
      "Hello",
      "Merhaba",
    );
  });

  it("successfully adds a sentence to flashcard", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockVerifyFlashcardOwnership.mockResolvedValue(undefined);
    mockGetFlashcardSentenceCount.mockResolvedValue(3);
    mockInsertFlashcardSentence.mockResolvedValue(undefined);

    const result = await addSentenceToFlashcard(
      "fc-1",
      "The cat is sleeping",
      "Kedi uyuyor",
    );

    expect(result).toEqual({ success: true, data: undefined });
    expect(mockVerifyFlashcardOwnership).toHaveBeenCalledWith(
      "fc-1",
      "user-123",
    );
    expect(mockInsertFlashcardSentence).toHaveBeenCalledWith(
      "fc-1",
      "The cat is sleeping",
      "Kedi uyuyor",
    );
  });
});
