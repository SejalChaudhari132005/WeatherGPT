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
   * Strictly preserves explicit latitude/longitude without injecting hardcoded city fallbacks.
   */
  public async upsertProfile(profileData: Partial<UserProfile> & { user_id: string }): Promise<UserProfile> {
    const existing = await this.getProfile(profileData.user_id);

    const updatedProfile: UserProfile = {
      user_id: profileData.user_id,
      username: profileData.username ?? existing?.username ?? '',
      phone: profileData.phone ?? existing?.phone ?? '',
      role: profileData.role ?? existing?.role ?? 'citizen',
      preferred_language: profileData.preferred_language ?? existing?.preferred_language ?? 'en',
      latitude: profileData.latitude ?? existing?.latitude ?? (null as any),
      longitude: profileData.longitude ?? existing?.longitude ?? (null as any),
      city: profileData.city ?? existing?.city ?? '',
      district: profileData.district ?? existing?.district ?? '',
      state: profileData.state ?? existing?.state ?? '',
      country: profileData.country ?? existing?.country ?? 'India',
      location_source: profileData.location_source ?? existing?.location_source ?? 'gps',
      created_at: existing?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(updatedProfile));

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .upsert(updatedProfile, { onConflict: 'user_id' })
          .select()
          .single();

        if (data && !error) {
          localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data));
          return data as UserProfile;
        }
      } catch (err) {
        console.warn('Supabase profile upsert warning:', err);
      }
    }

    return updatedProfile;
  }

  /**
   * Check if profile has required fields completed
   */
  public isProfileComplete(profile: UserProfile | null): boolean {
    if (!profile) return false;
    return Boolean(profile.username && profile.role && profile.latitude != null && profile.longitude != null);
  }
}


export const profileService = new ProfileService();


