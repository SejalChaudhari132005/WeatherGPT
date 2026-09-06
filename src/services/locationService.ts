import { UserLocation, CityOption } from '../types/location';
import { MOCK_CITIES } from '../data/mockCities';

export class LocationService {
  /**
   * Browser Geolocation API call to obtain exact latitude and longitude
   */
  public async getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          let errorMsg = 'Failed to get your location.';
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = 'Location access was denied. Please allow location access or pick a city manually.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = 'Location information is unavailable.';
          } else if (error.code === error.TIMEOUT) {
            errorMsg = 'The request to get user location timed out.';
          }
          reject(new Error(errorMsg));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }

  /**
   * Reverse geocodes latitude & longitude into City, District, State, Country
   * Uses OpenStreetMap Nominatim free API with client-side fallback
   */
  public async reverseGeocode(latitude: number, longitude: number): Promise<UserLocation> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        { headers: { 'User-Agent': 'WeatherGPT-App/1.0' } }
      );

      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};

        const city =
          address.city ||
          address.town ||
          address.village ||
          address.suburb ||
          address.municipality ||
          'Detected Area';

        const district = address.state_district || address.county || address.district || city;
        const state = address.state || 'Region';
        const country = address.country || 'India';
        const pincode = address.postcode;

        return {
          latitude,
          longitude,
          city,
          district,
          state,
          country,
          pincode,
          isCustom: false,
        };
      }
    } catch (err) {
      console.warn('Reverse geocoding fetch failed, falling back to approximate lookup:', err);
    }

    // Fallback: Find closest mock city or return generic coordinates object
    const closest = this.findClosestMockCity(latitude, longitude);
    if (closest) {
      return {
        latitude,
        longitude,
        city: closest.name,
        district: closest.district,
        state: closest.state,
        country: closest.country,
        pincode: closest.pincode,
        isCustom: false,
      };
    }

    return {
      latitude,
      longitude,
      city: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
      district: 'GPS Location',
      state: 'Local Zone',
      country: 'India',
      isCustom: false,
    };
  }

  /**
   * Search locations by city name, district, state, or pincode
   */
  public searchLocations(query: string): CityOption[] {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_CITIES.slice(0, 5);

    return MOCK_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        (c.pincode && c.pincode.includes(q))
    );
  }

  private findClosestMockCity(lat: number, lon: number): CityOption | null {
    let minDistance = Infinity;
    let closest: CityOption | null = null;

    for (const city of MOCK_CITIES) {
      const d = Math.hypot(city.latitude - lat, city.longitude - lon);
      if (d < minDistance) {
        minDistance = d;
        closest = city;
      }
    }

    // If within ~100km radius (~1 degree roughly)
    return minDistance < 1.5 ? closest : null;
  }
}

export const locationService = new LocationService();
