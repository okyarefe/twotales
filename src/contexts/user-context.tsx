"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// UPDATE THE CONTEXT WHEN MUTATION HAPPENS (E.G. CREDIT USAGE, MEMBERSHIP CHANGE)

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
  const isSigningOut = useRef(false);

  const signOut = async () => {
    // Set flag BEFORE signOut so the onAuthStateChange listener
    // knows to ignore the event and not update any React state.
    isSigningOut.current = true;
    await supabase.auth.signOut();
    // Full page navigation — lets the middleware handle the redirect
    // and the server re-render everything fresh. No staggered state.
    window.location.href = "/login";
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
    // If the server already gave us user data, no need to re-fetch on mount.
    // But we always set up the auth listener regardless.
    if (!initialUser || !initialUserData) {
      // No server data — check session client-side
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
    } else {
      setIsLoading(false);
    }

    // Always listen for auth changes (token refresh, sign-in from another tab, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // During sign-out, skip all state updates — the full page reload
        // will handle everything. Without this, React state updates cause
        // client components (header) to flash before the page navigates.

        if (isSigningOut.current) return;

        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser?.id) {
          await fetchUserData(currentUser.id);
        } else {
          setUserData(null);
        }
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
