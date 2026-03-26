"use client";

import { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  createFlashcardFormAction,
  type FormState,
} from "@/actions/flashcards";

export default function CreateFlashcardForm({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const boundAction = createFlashcardFormAction.bind(null, userId);
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    boundAction,
    null,
  );

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} variant="secondary">
        <Plus className="size-4" />
        Create
      </Button>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-2 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-700">New Flashcard</h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600"
        >
          <X className="size-4" />
        </button>
      </div>
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
    </div>
  );
}
