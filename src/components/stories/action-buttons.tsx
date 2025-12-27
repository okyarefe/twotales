// components/story/StoryActions.tsx
"use client";

import { BookOpen, Trash, MessagesSquare } from "lucide-react";
import { deleteStoryServerAction } from "@/actions/stories";
import { openDreamJournal } from "@/actions/user-data";
import { useState } from "react";
import ConfirmationWindow from "../common/confirmation-window";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface StoryActionsProps {
  storyId: string;
}

export default function StoryActionButtons({ storyId }: StoryActionsProps) {
  const [, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

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

  async function handleDreamJournal() {
    try {
      await openDreamJournal();
      // If successful, navigate to dream journal page
      router.push(`/dream-journal/${storyId}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Unable to access Dream Journal`, {
          position: "top-center",
          style: {
            backgroundColor: "white",
            color: "red",
            borderColor: "red",
          },
        });
      } else {
        alert("Unable to access Dream Journal. Please try again.");
      }
    }
  }

  return (
    <div className="flex flex-col gap-2 pt-2">
      <div className="flex items-center gap-2">
        <Button
          asChild
          size="sm"
          className="h-9 px-3 text-sm font-semibold bg-purple-400 text-white hover:bg-purple-500"
        >
          <Link
            href={`/stories/${storyId}`}
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Read story
          </Link>
        </Button>

        <Button
          onClick={handleDreamJournal}
          variant="outline"
          size="sm"
          className="h-9 px-3 text-sm font-semibold border-purple-200 text-purple-700 hover:bg-purple-50"
        >
          <MessagesSquare className="w-4 h-4" />
          <span>Test yourself</span>
        </Button>

        <Button
          onClick={handleDelete}
          variant="ghost"
          size="sm"
          className="h-9 px-3 text-sm font-semibold text-red-500 hover:text-red-600"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>

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
