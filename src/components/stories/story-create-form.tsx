"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { createStory } from "@/actions";
import { useRouter } from "next/navigation";

import { useActionState, startTransition, useEffect, useRef } from "react";
import FormButton from "../common/form-button";
import { Button } from "../ui/button";
import { useState } from "react";
import { languages, languageLevels } from "@/constants";
import { language } from "@/types";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(createStory, {
    errors: {},
  });
  const [selectedLanguage, setSelectedLanguage] = useState<language>();
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState("");
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const justSubmitted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (justSubmitted.current) {
      setSubmitting(false); // Show errors again after response

      if (formState.success === true) {
        // Show success toast
        toast.success("Story created successfully!", {
          position: "top-center",
          style: {
            backgroundColor: "white",
            color: "purple",
            borderColor: "purple",
          },
        });
        resetFormInputs();
        router.push("/stories");
      } else if (formState.errors._form) {
        toast.error(formState.errors._form.join(", "), {
          position: "top-center",
          style: {
            backgroundColor: "white",
            color: "red",
            borderColor: "red",
          },
        });
      }
      justSubmitted.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    justSubmitted.current = true;
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  function resetFormInputs() {
    setTitle("");
    setPrompt("");
    setSelectedLanguage(undefined);
    setSelectedLanguageLevel("");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="createStory">
          {" "}
          <Plus className="w-4 h-4 mr-2" />
          Create story
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4">
            <h3>Create a Topic</h3>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`w-full p-2 border rounded-md text-left ${
                      formState.errors.language
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedLanguage || "Select a language"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Languages</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        onSelect={() => setSelectedLanguage(lang)}
                      >
                        {lang}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {!submitting && formState.errors.language && (
                  <p className="mt-1 text-sm text-red-600">
                    {formState.errors.language.join(", ")}
                  </p>
                )}
                <input
                  type="hidden"
                  name="language"
                  value={selectedLanguage || ""}
                />
              </div>
              <div className="w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`w-full p-2 border rounded-md text-left ${
                      formState.errors.languageLevel
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedLanguageLevel || "Select a Level"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Language Levels</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {languageLevels.map((langLevel) => (
                      <DropdownMenuItem
                        key={langLevel}
                        onSelect={() => setSelectedLanguageLevel(langLevel)}
                      >
                        {langLevel}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {!submitting && formState.errors.languageLevel && (
                  <p className="mt-1 text-sm text-red-600">
                    {formState.errors.languageLevel.join(", ")}
                  </p>
                )}
                <input
                  type="hidden"
                  name="languageLevel"
                  value={selectedLanguageLevel || ""}
                />
              </div>
            </div>

            <Input
              name="title"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
            {!submitting && formState.errors.title && (
              <p id="title-error" className="mt-1 text-sm text-red-600">
                {formState.errors.title.join(", ")}
              </p>
            )}
            <Textarea
              name="prompt"
              placeholder="Describe your story"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></Textarea>
            {!submitting && formState.errors.prompt && (
              <p id="description-error" className="mt-1 text-sm text-red-600">
                {formState.errors.prompt.join(", ")}
              </p>
            )}
            {!submitting && formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400 rounded text-center">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}
            <FormButton isLoading={isPending}>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
