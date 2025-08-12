"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUserData(userId: string) {
  const supabase = await createClient();
  
  try {
    // Get user data from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('email, role, membership_type, story_credit, tts_credit')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return null;
    }

    // Return the data in the format expected by the context
    return {
      id: userId,
      email: userData.email || '',
      role: userData.role || 'user',
      membershipType: userData.membership_type || 'free',
      storyCredit: userData.story_credit || 0,
      ttsCredit: userData.tts_credit || 0,
      // For backward compatibility, keep storiesCreated as 0 for now
      // You can add a stories table later if needed
      storiesCreated: 0,
      credits: userData.story_credit || 0, // Map story_credit to credits for backward compatibility
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
      .from('users')
      .select('story_credit, tts_credit')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return {
      storyCredit: data?.story_credit || 0,
      ttsCredit: data?.tts_credit || 0
    };
  } catch (error) {
    console.error("Error refreshing credits:", error);
    return null;
  }
}
