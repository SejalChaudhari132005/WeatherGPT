export type LocationSource = 'gps' | 'manual';

export interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  state: string;
  country: string;
  source: LocationSource;
  location_source?: LocationSource;
  pincode?: string;
  isCustom?: boolean;
  displayName?: string;
  updatedAt?: string;
}

export interface CityOption {
  name: string;
  district: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  pincode?: string;
}

export type GPSStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unavailable' | 'timeout' | 'error';
