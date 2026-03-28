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

const mockGetStoryById = vi.fn();
const mockDeleteStoryById = vi.fn();
vi.mock("@/lib/supabase/queries", () => ({
  getStoryById: (...args: unknown[]) => mockGetStoryById(...args),
  deleteStoryById: (...args: unknown[]) => mockDeleteStoryById(...args),
  // Unused by deleteStoryServerAction but imported at module level
  deductUserCredit: vi.fn(),
  getUserCredits: vi.fn(),
  saveQuizQuestions: vi.fn(),
  saveStory: vi.fn(),
  markStoryFeedbackGenerated: vi.fn(),
  checkStoryHasFeedback: vi.fn(),
}));

vi.mock("@/services/openai/generateStory", () => ({
  generateStory: vi.fn(),
  generateQuizFromStory: vi.fn(),
}));

import { deleteStoryServerAction } from "../stories";

describe("deleteStoryServerAction — integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws when user is not signed in", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    await expect(deleteStoryServerAction("story-1")).rejects.toThrow(
      "You must be signed in to delete a story",
    );
    expect(mockGetStoryById).not.toHaveBeenCalled();
  });

  it("throws when story does not exist", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockGetStoryById.mockResolvedValue(null);

    await expect(deleteStoryServerAction("nonexistent")).rejects.toThrow(
      "Story not found or you do not have permission to delete it",
    );
    expect(mockDeleteStoryById).not.toHaveBeenCalled();
  });

  it("throws when user does not own the story", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockGetStoryById.mockResolvedValue({
      id: "story-1",
      user_id: "other-user",
    });

    await expect(deleteStoryServerAction("story-1")).rejects.toThrow(
      "Story not found or you do not have permission to delete it",
    );
    expect(mockDeleteStoryById).not.toHaveBeenCalled();
  });

  it("deletes story when user is the owner", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockGetStoryById.mockResolvedValue({
      id: "story-1",
      user_id: "user-123",
    });
    mockDeleteStoryById.mockResolvedValue(true);

    await deleteStoryServerAction("story-1");

    expect(mockDeleteStoryById).toHaveBeenCalledWith("story-1");
  });
});
