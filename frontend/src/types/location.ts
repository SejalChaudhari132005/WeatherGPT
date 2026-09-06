export interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode?: string;
  isCustom?: boolean;
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
