"use server";

import { createClient } from "@/lib/supabase/server";
import type { UserData } from "@/types";

export async function getUserData(userId: string): Promise<UserData | null> {
  const supabase = await createClient();

  try {
    // Get user data from users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select(
        "email, role, membership_type, story_credit, tts_credit,num_stories"
      )
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return null;
    }

    // Return the data in the format expected by the context
    return {
      id: userId,
      email: userData.email || "",
      role: userData.role || "user",
      membershipType: userData.membership_type || "free",
      storyCredit: userData.story_credit || 0,
      ttsCredit: userData.tts_credit || 0,
      // For backward compatibility, keep storiesCreated as 0 for now
      // You can add a stories table later if needed
      storiesCreated: userData.num_stories || 0,
    };
  } catch (error) {
    console.error("Error in getUserData:", error);
    return null;
  }
}

export async function refreshUserCredits(userId: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("users")
      .select("story_credit, tts_credit")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return {
      storyCredit: data?.story_credit || 0,
      ttsCredit: data?.tts_credit || 0,
    };
  } catch (error) {
    console.error("Error refreshing credits:", error);
    return null;
  }
}

// Server action to check membership before allowing access to Dream Journal
export async function openDreamJournal() {
  const supabase = await createClient();

  // Get auth user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to access the Dream Journal.");
  }

  // Fetch membership_type from users table
  // const { data: userData, error } = await supabase
  //   .from("users")
  //   .select("membership_type")
  //   .eq("id", user.id)
  //   .single();

  // if (error) {
  //   console.error("Error fetching membership_type:", error);
  //   throw new Error("Unable to verify membership. Please try again.");
  // }

  // // If membership is 'member', throw an error as requested
  // if (userData?.membership_type != "premium") {
  //   throw new Error("Dream Journal is available only for premium members");
  // }

  // Otherwise allow access
  return { ok: true };
}
