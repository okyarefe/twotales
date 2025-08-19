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
    try {
      // Import the server action dynamically to avoid SSR issues
      const { getUserData } = await import("@/actions/user-data");
      setIsLoading(true);
      // Call the server action to safely fetch data
      const userData = await getUserData(userId);

      if (userData) {
        setUserData(userData);
        setIsLoading(false);
      } else {
        setIsLoading(false);

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
    if (user?.id) {
      await fetchUserData(user.id);
    }
  };

  useEffect(() => {
    async function checkSession() {
      setIsLoading(true);

      const { data } = await supabase.auth.getSession();

      const currentUser = data.session?.user ?? null;
      setUser(currentUser);

      if (currentUser?.id) {
        await fetchUserData(currentUser.id);
      } else {
        console.log("👤 No user found");
        setUserData(null);
        setIsLoading(false);
      }
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser?.id) {
          await fetchUserData(currentUser.id);
          if (event === "SIGNED_IN") {
            router.push("/dashboard");
          }
        } else {
          router.push("/");

          setUserData(null);
        }
      }
    );

    return () => {
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
