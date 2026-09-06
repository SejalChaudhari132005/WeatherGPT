import { useAuthContext } from '../context/AuthContext';
import { locationService } from '../services/locationService';

export function useLocation() {
  const {
    userProfile,
    handleSaveLocationGps,
    handleSaveLocationManual,
    isSubmitting,
    errorMessage,
    setErrorMessage,
  } = useAuthContext();

  return {
    location: userProfile ? {
      latitude: userProfile.latitude,
      longitude: userProfile.longitude,
      city: userProfile.city,
      district: userProfile.district,
      state: userProfile.state,
      country: userProfile.country,
      location_source: userProfile.location_source,
    } : null,
    saveLocationGps: handleSaveLocationGps,
    saveLocationManual: handleSaveLocationManual,
    searchLocations: (q: string) => locationService.searchLocations(q),
    isSubmitting,
    errorMessage,
    clearError: () => setErrorMessage(null),
  };
}
