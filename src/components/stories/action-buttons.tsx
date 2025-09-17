// components/story/StoryActions.tsx
"use client";
import FormButton from "../common/form-button";
import { BookOpen, Trash } from "lucide-react";
import { deleteStoryServerAction } from "@/actions/story-db";
import { useState } from "react";
import ConfirmationWindow from "../common/confirmation-window";

import Link from "next/link";

interface StoryActionsProps {
  storyId: string;
}

export default function StoryActionButtons({ storyId }: StoryActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    setShowConfirm(true);
  }

  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      await deleteStoryServerAction(storyId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      alert("Error deleting story. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  }

  return (
    <div className="flex gap-2 pt-2 justify-between">
      <Link
        href={`/stories/${storyId}`}
        className="flex items-center p-2 rounded justify-center hover:bg-purple-200 text-xs font-medium hover:border-rounded border-1 border-black"
      >
        <BookOpen className="w-5 h-5 mr-1" /> Read Story
      </Link>

      <FormButton
        onClick={handleDelete}
        isLoading={isDeleting}
        loadingText="Deleting..."
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </FormButton>

      <ConfirmationWindow
        open={showConfirm}
        title="Are you sure?"
        message="This will permanently delete the story."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
