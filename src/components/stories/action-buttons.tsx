// components/story/StoryActions.tsx
"use client";
import FormButton from "../common/form-button";
import { BookOpen, Trash, Moon } from "lucide-react";
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
  const [isDeleting, setIsDeleting] = useState(false);
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
      router.push("/dream-journal");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, {
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
    <div className="flex gap-2 pt-2 justify-between items-center">
      <div className="flex items-center gap-1">
        <Button asChild variant="outline" size="sm">
          <Link href={`/stories/${storyId}`} className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" /> Read Story
          </Link>
        </Button>

        <Button onClick={handleDreamJournal} variant="outline" size="sm">
          <Moon className="w-4 h-4 mr-1" /> Dream Journal
        </Button>
        <FormButton
        onClick={handleDelete}
        isLoading={isDeleting}
        loadingText="Deleting..."
        
        size="sm"
      >
        <Trash className="w-1" />
        
      </FormButton>
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
