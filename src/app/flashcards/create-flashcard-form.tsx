"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  createFlashcardFormAction,
  type FormState,
} from "@/actions/flashcards";

export default function CreateFlashcardForm({ userId }: { userId: string }) {
  const boundAction = createFlashcardFormAction.bind(null, userId);
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    boundAction,
    null,
  );

  return (
    <form action={formAction}>
      {state && "error" in state && (
        <p className="text-sm text-red-500 mb-2">{state.error}</p>
      )}
      {state && "success" in state && (
        <p className="text-sm text-green-600 mb-2">Flashcard created!</p>
      )}
      <div>
        <Label>Name</Label>
        <Input type="text" name="name" />

        <Label>Description</Label>
        <Input type="text" name="description" />

        <Button
          type="submit"
          disabled={isPending}
          variant="secondary"
          className="mt-2"
        >
          {isPending ? "Creating..." : "Create Flashcard"}
        </Button>
      </div>
    </form>
  );
}
