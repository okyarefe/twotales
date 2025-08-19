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
  storiesCreated: number;
}

interface UserContextType {
  user: SupabaseUser | null;
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
  refreshUserData: () => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  initialUser?: SupabaseUser | null;
  initialUserData?: UserData | null;
}

export function UserProvider({
  children,
  initialUser = null,
  initialUserData = null,
}: UserProviderProps) {
  const [user, setUser] = useState<SupabaseUser | null>(initialUser);
  const [userData, setUserData] = useState<UserData | null>(initialUserData);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialUser || !initialUserData);

  const supabase = createClient();
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserData(null);
    setIsLoading(false);
    router.push("/");
  };

  const fetchUserData = async (userId: string) => {
    try {
      const { getUserData } = await import("@/actions/user-data");
      setIsLoading(true);
      const data = await getUserData(userId);

      if (data) {
        setUserData(data);
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
    // If initial data is provided, skip client-side session check
    if (userData && initialUserData) {
      setIsLoading(false);
      return;
    }

    async function checkSession() {
      setIsLoading(true);

      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);

      if (currentUser?.id) {
        await fetchUserData(currentUser.id);
      } else {
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
  }, [supabase, router, initialUser, initialUserData, userData]);

  return (
    <UserContext.Provider
      value={{ user, userData, isLoading, refreshUserData, error, signOut }}
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
