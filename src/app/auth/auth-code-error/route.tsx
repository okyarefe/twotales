// write get request handler for auth code error route
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  // Redirect to the login page with an error message
  return NextResponse.redirect(`${origin}/error`);
}
