import { apiRequest } from "./apiService";
import { UserProfile } from "../types/user";

interface SaveGpsLocationResponse {
  message: string;
  profile: UserProfile;
}

export async function saveGpsLocation(
  latitude: number,
  longitude: number,
  location?: {
    city?: string;
    district?: string;
    state?: string;
    country?: string;
  }
) {

  return apiRequest<SaveGpsLocationResponse>(
    "/api/profile/location",
    {
      method: "POST",

      body: JSON.stringify({
        latitude,
        longitude,

        city: location?.city,
        district: location?.district,
        state: location?.state,
        country: location?.country,

        location_source: "gps",
      }),
    }
  );
}