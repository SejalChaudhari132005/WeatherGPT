export type UserRole =
  | 'citizen'
  | 'farmer'
  | 'fisherman'
  | 'disaster_manager'
  | 'aviation'
  | 'urban_planner'
  | 'researcher'
  | 'journalist'
  | 'transport'
  | 'other';

export interface UserProfile {
  id?: string;
  user_id: string;
  username: string;
  phone: string;
  role: UserRole;
  preferred_language: string;
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  state: string;
  country: string;
  location_source: 'gps' | 'manual';
  created_at?: string;
  updated_at?: string;
}

export type AuthStatus =
  | 'LOADING'
  | 'UNAUTHENTICATED'
  | 'AUTHENTICATED'
  | 'PROFILE_INCOMPLETE'
  | 'PROFILE_COMPLETE';

export type OnboardingStep =
  | 'WELCOME'
  | 'PHONE'
  | 'OTP'
  | 'USERNAME'
  | 'ROLE'
  | 'ROLE_CONFIRM'
  | 'LOCATION'
  | 'LOCATION_CONFIRM'
  | 'COMPLETE';

export interface RoleOption {
  id: UserRole;
  title: string;
  subtitle: string;
  icon: string;
  advisoryPreview: string;
}
