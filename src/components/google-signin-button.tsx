"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/utils/supabase/auth-client";
import React from "react";

type Variant = "signin" | "signup" | "learn";

const variantStyles: Record<Variant, string> = {
  signin: "bg-purple-400 text-white hover:bg-purple-400",
  signup:
    "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50",
  learn:
    "bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:from-purple-500 hover:to-gray-900",
};

export default function GoogleSignInButton({
  children,
  variant = "signin",
  showTextOnXs = false,
}: React.PropsWithChildren<{ variant?: Variant; showTextOnXs?: boolean }>) {
  const label =
    typeof children === "string"
      ? children
      : variant === "signin"
      ? "Sign in with Google"
      : variant === "signup"
      ? "Sign up with Google"
      : "Start learning";

  return (
    <Button
      size="sm"
      className={`${variantStyles[variant]} inline-flex items-center gap-2 rounded-md text-sm md:text-base h-8 md:h-10 px-2 sm:px-3 md:px-6`}
      onClick={signInWithGoogle}
      aria-label={label}
      title={label}
    >
      {/* Show icon for signin/signup, but hide for `learn` (hero CTA) */}
      {variant !== "learn" && <GoogleIcon className="w-4 h-4 md:w-5 md:h-5" />}

      {/* For the `learn` variant (hero CTA) always show text; otherwise hide on xs */}
      {variant === "learn" ? (
        <span>{children}</span>
      ) : showTextOnXs ? (
        <span>{children}</span>
      ) : (
        <span className="hidden sm:inline">{children}</span>
      )}
    </Button>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 533.5 544.3"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <path
        fill="#4285f4"
        d="M533.5 278.4c0-18-1.6-35.4-4.6-52.4H272.1v98.8h147.3c-6.4 34.5-25.6 63.8-54.7 84.1v70.1h88.4c51.6-47.5 81.9-117.7 81.9-200.6z"
      />
      <path
        fill="#34a853"
        d="M272.1 544.3c73.7 0 135.6-24.5 180.8-66.5l-88.4-70.1c-24.6 16.5-56.2 26.3-92.4 26.3-71 0-131.2-47.9-152.6-112.4H29.1v70.9C74.1 478.9 167 544.3 272.1 544.3z"
      />
      <path
        fill="#fbbc04"
        d="M119.5 323.5c-10.9-32.6-10.9-67.5 0-100.1V152.5H29.1c-39.7 79.5-39.7 173.9 0 253.4l90.4-82.4z"
      />
      <path
        fill="#ea4335"
        d="M272.1 107.7c39 0 74 13.5 101.6 39.8l76.1-76.1C407.8 24.1 345.9 0 272.1 0 167 0 74.1 65.4 29.1 160.8l90.4 70.9c21.3-64.5 81.6-112.4 152.6-112.4z"
      />
    </svg>
  );
}
