"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/utils/supabase/auth-client";
import React from "react";

type Variant = "signin" | "signup" | "learn";

const variantStyles: Record<Variant, string> = {
  signin: "bg-purple-500 text-white hover:bg-purple-400", // solid purple background
  signup:
    "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50", // white background with purple text/border
  learn:
    "bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:from-purple-500 hover:to-gray-900", // bold CTA gradient
};

export default function GoogleSignInButton({
  children,
  variant = "signin",
}: React.PropsWithChildren<{ variant?: Variant }>) {
  return (
    <Button
      size="lg"
      className={variantStyles[variant]}
      onClick={signInWithGoogle}
    >
      {children}
    </Button>
  );
}
