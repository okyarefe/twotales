"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { languages, languageLevels } from "@/constants";
import { saveQuizQuestions, saveStory } from "@/lib/supabase/queries";
import {
  generateQuizFromStory,
  generateStory,
} from "@/services/openai/generateStory";
import { createClient } from "@/lib/supabase/server";
import { Story, storyLength } from "@/types";

const createStorySchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/[a-z-]/),
  prompt: z.string().min(10),
  language: z.enum([...languages] as [string, ...string[]], {
    errorMap: () => ({ message: "Please choose a language" }),
  }),
  languageLevel: z.enum(languageLevels, {
    errorMap: () => ({ message: "Choose a level" }),
  }),
});

interface CreateStoryFormState {
  errors: {
    //validation
    languageLevel?: string[];
    language?: string[];
    title?: string[];
    prompt?: string[];
    //form level errors - saving to db, auth etc..
    _form?: string[];
  };
}

export async function createStory(
  formState: CreateStoryFormState,
  formData: FormData
): Promise<CreateStoryFormState> {
  const result = createStorySchema.safeParse({
    title: formData.get("title"),
    prompt: formData.get("prompt"),
    language: formData.get("language"),
    languageLevel: formData.get("languageLevel"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  // Auth Check - is user logged in?
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      errors: { _form: ["You must be signed in to create a story"] },
    };
  }

  try {
    // TODO: CHECK IF USER HAS ENOUGH TOKENS
    const story = await generateStory(result.data);

    // Prepare data to save into database
    const storyData = {
      english_version: story.english,
      translated_version: story.translated,
      level: result.data.languageLevel,
      length: "medium" as storyLength,
      total_tokens: story.totalTokens,
      user_id: user.id,
      translate_to: result.data.language,
      title: result.data.title,
    };
    // TODO: QUERY TO DATABASE.

    const savedStory: Story = await saveStory(storyData, user.id);
    console.log("Story saved to db -> ", savedStory);
    const quiz = await generateQuizFromStory(story);
    console.log("Quiz generated from server action - b4 save to db", quiz);

    saveQuizQuestions(savedStory.id, quiz.questions, story.totalTokens);

    // DECREASE USER'S TOKENS
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/stories");
  // redirect
  redirect("/stories");
}
