"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";

import { useUser } from "@/contexts/user-context";
import { useState } from "react";
import type { CSSProperties } from "react";
import GoogleSignInButton from "./google-signin-button";

export default function HeaderAuth() {
  const { user, userData, isLoading, signOut } = useUser();
  const [isSigningOut] = useState(false);

  const getInitial = (email?: string) => email?.charAt(0).toUpperCase() || "?";

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "purple",
  };

  // Show loading spinner while checking session or during sign out
  if (user && (isLoading || isSigningOut)) {
    return (
      <ClipLoader
        color="purple"
        loading={true}
        cssOverride={override}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  // User is logged in - show avatar with dropdown
  if (user?.email) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="border-2 border-purple-700 h-10 w-10 cursor-pointer">
            <AvatarImage
              src={
                typeof user.user_metadata.avatar_url === "string"
                  ? user.user_metadata.avatar_url
                  : undefined
              }
            />
            <AvatarFallback>{getInitial(user?.email ?? "")}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4 space-y-3">
            <div className="text-sm text-gray-600">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              {userData && (
                <>
                  <p>
                    <strong>Role:</strong>{" "}
                    <span className="capitalize">{userData.role}</span>
                  </p>
                  <p>
                    <strong>Membership:</strong>{" "}
                    <span className="capitalize">
                      {userData.membershipType}
                    </span>
                  </p>
                  <p>
                    <strong>Story Credits:</strong> {userData.storyCredit}
                  </p>
                  <p>
                    <strong>TTS Credits:</strong> {userData.ttsCredit}
                  </p>
                </>
              )}
            </div>
            <Button
              type="button"
              className="w-full text-purple border-2 border-purple-700 bg-white hover:opacity-60"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // User is not logged in - show sign in/up buttons
  return (
    <div className="flex flex-row gap-2">
      <GoogleSignInButton variant="signin">Sign In</GoogleSignInButton>

      <GoogleSignInButton variant="signup">Sign Up</GoogleSignInButton>
    </div>
  );
}
