"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";
import { signOut } from "@/actions/sign-out";
import { createClient } from "@/lib/supabase/client";

import { useEffect, useState, CSSProperties } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function HeaderAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const getInitial = (email?: string) => email?.charAt(0).toUpperCase() || "?";

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  console.log("User", user);
  const supabase = createClient();
  useEffect(() => {
    async function checkSession() {
      setIsSessionLoading(true);
      const { data } = await supabase.auth.getSession();
      console.log("Session - data", data);
      setUser(data.session?.user ?? null);
      setIsSessionLoading(false);
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  // Helper for avatar fallback

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign out Failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auth content (sign in/up or sign out)
  let authContent: React.ReactNode;
  if (isLoading || isSessionLoading) {
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
    authContent = null; // Or show a spinner if you prefer
  } else if (user?.email) {
    authContent = (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="border-2 border-purple-700 h-10 w-10">
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
          <div className="p-4">
            <Button
              type="submit"
              className="w-full md:w-auto"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <div className="flex flex-row gap-2 w-full md:w-auto">
        {error && (
          <div className="mb-2 p-2 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full md:w-auto"
          color="secondary"
          onClick={handleSignIn}
        >
          Sign In
        </Button>

        <Button
          type="submit"
          className="w-full md:w-auto"
          color="primary"
          onClick={handleSignIn}
        >
          Sign Up
        </Button>
      </div>
    );
  }

  return <div className="w-full md:w-auto">{authContent}</div>;
}
