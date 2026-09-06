import { UserLocation, LocationSource, CityOption } from '../types/location';
import { MOCK_CITIES } from '../data/mockCities';
import { supabase } from '../lib/supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export class LocationService {
  /**
   * 1. Retrieve EXACT device hardware GPS coordinates via HTML5 Geolocation API
   */
  public async getExactGPSPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser. Please search your location manually.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log('[LocationService] Exact Hardware GPS Coordinates obtained:', lat, lon);
          resolve({ latitude: lat, longitude: lon });
        },
        (error) => {
          let errorMsg = 'Failed to retrieve GPS location.';
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = 'Location permission is denied in your browser settings. Click the lock icon 🔒 in your browser URL bar to allow location access.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = 'Device GPS sensor is currently unavailable. Please enable device location or search manually.';
          } else if (error.code === error.TIMEOUT) {
            errorMsg = 'GPS location detection timed out. Please try again or search manually.';
          }
          reject(new Error(errorMsg));
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    });
  }

  /**
   * Main method: try exact GPS first, with explicit error propagation
   */
  public async getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
    try {
      return await this.getExactGPSPosition();
    } catch (gpsError: any) {
      console.warn('[LocationService] Exact GPS failed:', gpsError.message);
      // Try IP fallback as secondary attempt
      try {
        return await this.detectLocationFromIP();
      } catch (ipError) {
        throw gpsError;
      }
    }
  }

  /**
   * Fallback IP location lookup when browser GPS is disabled
   */
  public async detectLocationFromIP(): Promise<{ latitude: number; longitude: number }> {
    const response = await fetch(`${API_BASE_URL}/api/location/detect_ip`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.location && data.location.latitude && data.location.longitude) {
        console.log('[LocationService] Network IP Location resolved:', data.location.city, data.location.latitude, data.location.longitude);
        return {
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        };
      }
    }

    throw new Error('Network location detection unavailable');
  }

  /**
   * 2. Call FastAPI backend Location Agent /api/location/resolve to reverse geocode exact coordinates
   */
  public async resolveLocation(
    latitude: number,
    longitude: number,
    source: LocationSource = 'gps'
  ): Promise<UserLocation> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/location/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, source }),
      });

      if (!response.ok) {
        throw new Error(`Location resolution failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.location) {
        return {
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          city: data.location.city,
          district: data.location.district,
          state: data.location.state,
          country: data.location.country,
          source: data.location.source || source,
          location_source: data.location.source || source,
          displayName: data.location.display_name,
          updatedAt: new Date().toISOString(),
        };
      }
      throw new Error('Invalid response structure from location resolve endpoint');
    } catch (err) {
      console.warn('[LocationService] Backend resolve failed:', err);
      return {
        latitude,
        longitude,
        city: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
        district: 'Current Coordinates',
        state: 'Local Region',
        country: 'India',
        source,
        location_source: source,
        updatedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Backward-compatible alias for reverseGeocode
   */
  public async reverseGeocode(latitude: number, longitude: number): Promise<UserLocation> {
    return this.resolveLocation(latitude, longitude, 'gps');
  }

  /**
   * 3. Call FastAPI backend /api/location/search?q=query for manual location search (cities, towns, villages, talukas across India)
   */
  public async searchLocation(query: string): Promise<UserLocation[]> {
    const q = query.trim();
    if (!q) return [];

    try {
      const response = await fetch(`${API_BASE_URL}/api/location/search?q=${encodeURIComponent(q)}`);
      if (!response.ok) return [];

      const data = await response.json();
      if (data.success && Array.isArray(data.results)) {
        return data.results.map((res: any) => ({
          latitude: res.latitude,
          longitude: res.longitude,
          city: res.city || 'Location',
          district: res.district || res.city,
          state: res.state || '',
          country: res.country || 'India',
          source: 'manual' as LocationSource,
          location_source: 'manual' as LocationSource,
          displayName: res.display_name,
        }));
      }
      return [];
    } catch (err) {
      console.warn('[LocationService] Location search error:', err);
      return [];
    }
  }

  /**
   * Backward-compatible searchLocations
   */
  public searchLocations(query: string): CityOption[] {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_CITIES;

    return MOCK_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        (c.pincode && c.pincode.includes(q))
    );
  }

  /**
   * 4. Save dynamic location context to user profile in Supabase
   */
  public async saveLocation(userId: string, location: UserLocation): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          latitude: location.latitude,
          longitude: location.longitude,
          city: location.city,
          district: location.district,
          state: location.state,
          country: location.country,
          location_source: location.source,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        console.error('[LocationService] Supabase profile location update error:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('[LocationService] Save location exception:', err);
      return false;
    }
  }

  /**
   * 5. Fetch saved location from Supabase profile
   */
  public async getSavedLocation(userId: string): Promise<UserLocation | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('latitude, longitude, city, district, state, country, location_source')
        .eq('id', userId)
        .single();

      if (error || !data || data.latitude == null || data.longitude == null) {
        return null;
      }

      return {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        district: data.district || data.city || '',
        state: data.state || '',
        country: data.country || 'India',
        source: (data.location_source as LocationSource) || 'manual',
        location_source: (data.location_source as LocationSource) || 'manual',
      };
    } catch (err) {
      console.warn('[LocationService] getSavedLocation error:', err);
      return null;
    }
  }
}

export const locationService = new LocationService();
