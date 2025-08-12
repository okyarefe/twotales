"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  email: string;
  role: string;
  membershipType: string;
  storyCredit: number;
  ttsCredit: number;
  // For backward compatibility
  storiesCreated: number;
  credits: number;
}

interface UserContextType {
  user: SupabaseUser | null;
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;

  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  const fetchUserData = async (userId: string) => {
    console.log("🔄 Fetching user data for:", userId);
    try {
      // Import the server action dynamically to avoid SSR issues
      const { getUserData } = await import("@/actions/user-data");
      setIsLoading(true);
      // Call the server action to safely fetch data
      const userData = await getUserData(userId);

      if (userData) {
        console.log("✅ User data fetched successfully:", userData);
        setUserData(userData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("⚠️ No user profile found");
        setError("No user profile found. Please complete your account setup.");
        setUserData(null);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("❌ Error fetching user data:", error);
      setError("Failed to load your account data. Please try again.");
      setUserData(null);
    }
  };

  const refreshUserData = async () => {
    console.log("🔄 Refreshing user data...");
    if (user?.id) {
      await fetchUserData(user.id);
    }
  };

  useEffect(() => {
    async function checkSession() {
      console.log("🔍 Checking for existing session...");
      setIsLoading(true);

      const { data } = await supabase.auth.getSession();
      console.log(
        "📋 Session check result:",
        data.session ? "User logged in" : "No session found"
      );

      const currentUser = data.session?.user ?? null;
      setUser(currentUser);

      if (currentUser?.id) {
        console.log("👤 User found, fetching additional data...");
        await fetchUserData(currentUser.id);
      } else {
        console.log("👤 No user found");
        setUserData(null);
        setIsLoading(false);
      }
    }

    checkSession();

    console.log("👂 Setting up auth state change listener...");
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(
          "🔄 Auth state changed:",
          event,
          session?.user?.email || "No user"
        );

        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser?.id) {
          console.log("👤 New user logged in, fetching data...");
          await fetchUserData(currentUser.id);

          router.push("/dashboard");
        } else {
          console.log("👤 User logged out, clearing data...");
          router.push("/");

          setUserData(null);
        }
      }
    );

    return () => {
      console.log("🧹 Cleaning up auth listener...");
      listener?.subscription.unsubscribe();
    };
  }, [supabase, router]);

  return (
    <UserContext.Provider
      value={{ user, userData, isLoading, refreshUserData, error }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
