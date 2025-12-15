import { NextResponse } from "next/server";
import { createStory } from "@/actions/stories";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Call the existing server action. It returns an object with errors/success.
    const result = await createStory(
      { errors: {} },
      formData as unknown as FormData
    );
    
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log("hhere")
    return NextResponse.json(
      { errors: { _form: [message] }, success: false },
      { status: 500 }
    );
  }
}
