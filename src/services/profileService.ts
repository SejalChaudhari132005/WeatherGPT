import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types/user';

const LOCAL_PROFILE_KEY = 'weathergpt_user_profile';

export class ProfileService {
  /**
   * Fetch profile by user_id from Supabase or localStorage fallback
   */
  public async getProfile(userId: string): Promise<UserProfile | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (data && !error) {
          localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data));
          return data as UserProfile;
        }
      } catch (err) {
        console.warn('Error fetching profile from Supabase:', err);
      }
    }

    // LocalStorage fallback
    const saved = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.user_id === userId || !isSupabaseConfigured()) {
          return parsed as UserProfile;
        }
      } catch (e) {
        console.error('Error parsing local profile', e);
      }
    }

    return null;
  }

  /**
   * Save or update profile in Supabase & LocalStorage
   */
  public async upsertProfile(profileData: Partial<UserProfile> & { user_id: string }): Promise<UserProfile> {
    const updatedProfile: UserProfile = {
      user_id: profileData.user_id,
      username: profileData.username || '',
      phone: profileData.phone || '',
      role: profileData.role || 'citizen',
      preferred_language: profileData.preferred_language || 'en',
      latitude: profileData.latitude || 19.076,
      longitude: profileData.longitude || 72.8777,
      city: profileData.city || 'Mumbai',
      district: profileData.district || 'Mumbai City',
      state: profileData.state || 'Maharashtra',
      country: profileData.country || 'India',
      location_source: profileData.location_source || 'gps',
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .upsert([updatedProfile], { onConflict: 'user_id' })
          .select()
          .single();

        if (data && !error) {
          localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data));
          return data as UserProfile;
        }
      } catch (err) {
        console.warn('Supabase upsert error, storing locally:', err);
      }
    }

    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(updatedProfile));
    return updatedProfile;
  }

  /**
   * Check if profile has all mandatory onboarding fields completed
   */
  public isProfileComplete(profile: UserProfile | null): boolean {
    if (!profile) return false;
    return Boolean(
      profile.username &&
      profile.username.trim().length > 0 &&
      profile.role &&
      profile.city &&
      profile.latitude &&
      profile.longitude
    );
  }
}

export const profileService = new ProfileService();
