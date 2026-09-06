import { supabase } from "../lib/supabase";
import { UserProfile } from "../types/user";

export class ProfileService {
  /**
   * Fetch the currently authenticated user's profile.
   *
   * The user ID comes from the authenticated Supabase session.
   */
  public async getCurrentProfile(): Promise<UserProfile | null> {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data as UserProfile | null;
    } catch (err) {
      console.error("Error fetching current profile:", err);
      return null;
    }
  }

  /**
   * Fetch profile by authenticated user ID.
   *
   * This is retained for compatibility with existing code.
   */
  public async getProfile(
    userId: string
  ): Promise<UserProfile | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.id !== userId) {
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data as UserProfile | null;
    } catch (err) {
      console.error("Error fetching profile:", err);
      return null;
    }
  }

  /**
   * Check if profile has required fields completed.
   */
  public isProfileComplete(
    profile: UserProfile | null
  ): boolean {
    if (!profile) {
      return false;
    }

    return Boolean(
      profile.username &&
      profile.role &&
      profile.latitude != null &&
      profile.longitude != null
    );
  }
}

export const profileService = new ProfileService();