"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { languages, languageLevels } from "@/constants";
import {
  deductUserCredit,
  getUserCredits,
  saveQuizQuestions,
  saveStory,
} from "@/lib/supabase/queries";
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
  // Auth Check
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
    //CHECK IF USER HAS ENOUGH CREDIT

    const userCredit = await getUserCredits(user.id);
    if (userCredit < 1) {
      return {
        errors: { _form: ["You do not have enough credits to create a story"] },
      };
    }

    //API CALL TO openAI to create STORY
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

    const quiz = await generateQuizFromStory(story);

    saveQuizQuestions(savedStory.id, quiz.questions, story.totalTokens);

    // DECREASE THE USER'S CREDIT with supabase stored procedure
    // TODO: Modify user table to keep track of number of stories created ?
    // and update the procedure ?
    await deductUserCredit(user.id);
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
