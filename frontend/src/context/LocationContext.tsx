import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserLocation, LocationSource, GPSStatus, CityOption } from '../types/location';
import { locationService } from '../services/locationService';
import { useAuthContext } from './AuthContext';

export interface LocationContextType {
  location: UserLocation | null;
  loading: boolean;
  isSubmitting: boolean;
  gpsStatus: GPSStatus;
  statusMessage: string;
  error: string | null;
  errorMessage: string | null;
  detectLocation: () => Promise<UserLocation | null>;
  selectLocation: (loc: UserLocation) => Promise<void>;
  saveLocationGps: () => Promise<boolean>;
  saveLocationManual: (cityObj: any) => Promise<boolean>;
  refreshLocation: () => Promise<void>;
  clearError: () => void;
  searchLocations: (query: string) => CityOption[];
  isSelectorOpen: boolean;
  openSelector: () => void;
  closeSelector: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId } = useAuthContext();
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [gpsStatus, setGpsStatus] = useState<GPSStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('Select location mode');
  const [error, setError] = useState<string | null>(null);
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);

  // Load saved location from Supabase profile on mount
  useEffect(() => {
    let isMounted = true;
    const loadProfileLocation = async () => {
      if (userId) {
        const saved = await locationService.getSavedLocation(userId);
        if (saved && isMounted) {
          console.log('[LocationContext] Restored saved profile location from Supabase:', saved);
          setLocation(saved);
        }
      }
    };
    loadProfileLocation();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  // Detect exact device GPS Location
  const detectLocation = useCallback(async (): Promise<UserLocation | null> => {
    setLoading(true);
    setGpsStatus('loading');
    setStatusMessage('Detecting exact device GPS coordinates...');
    setError(null);

    try {
      // 1. Get exact hardware GPS coordinates
      const coords = await locationService.getExactGPSPosition();
      console.log("GPS coordinates:", { latitude: coords.latitude, longitude: coords.longitude });

      // 2. Reverse geocode via backend LocationAgent
      const resolved = await locationService.resolveLocation(coords.latitude, coords.longitude, 'gps');
      console.log("Resolved location:", resolved);
      
      setLocation(resolved);
      setGpsStatus('success');
      setStatusMessage(`Detected: ${resolved.city}`);

      if (userId) {
        await locationService.saveLocation(userId, resolved);
      }

      setLoading(false);
      return resolved;
    } catch (err: any) {
      console.warn('[LocationContext] detectLocation error:', err);
      const msg = err.message || 'Location permission denied or unavailable.';
      setError(msg);
      
      if (msg.includes('denied')) {
        setGpsStatus('denied');
        setStatusMessage('Location permission denied in browser.');
      } else {
        setGpsStatus('error');
        setStatusMessage('Unable to detect current GPS location.');
      }

      setLoading(false);
      return null;
    }
  }, [userId]);

  // Save location from onboarding GPS flow
  const saveLocationGps = useCallback(async (): Promise<boolean> => {
    setIsSubmitting(true);
    const loc = await detectLocation();
    setIsSubmitting(false);
    return loc !== null;
  }, [detectLocation]);

  // Save location from onboarding manual selection
  const saveLocationManual = useCallback(async (cityObj: any): Promise<boolean> => {
    setIsSubmitting(true);
    const manualLoc: UserLocation = {
      latitude: cityObj.latitude || cityObj.lat,
      longitude: cityObj.longitude || cityObj.lng,
      city: cityObj.name || cityObj.city || 'Location',
      district: cityObj.district || cityObj.name || '',
      state: cityObj.state || '',
      country: cityObj.country || 'India',
      source: 'manual',
      location_source: 'manual',
    };

    console.log('[LocationContext] Selected manual location:', manualLoc);
    setLocation(manualLoc);
    
    if (userId) {
      await locationService.saveLocation(userId, manualLoc);
    }
    setIsSubmitting(false);
    return true;
  }, [userId]);

  // Select Manual Location
  const selectLocation = useCallback(async (newLoc: UserLocation) => {
    setLoading(true);
    const manualLoc: UserLocation = { ...newLoc, source: 'manual', location_source: 'manual' };
    console.log('[LocationContext] Manually selected location active:', manualLoc);
    
    setLocation(manualLoc);
    setStatusMessage(`Selected: ${manualLoc.city}`);
    setError(null);

    if (userId) {
      await locationService.saveLocation(userId, manualLoc);
    }
    setLoading(false);
    setIsSelectorOpen(false);
  }, [userId]);

  const refreshLocation = useCallback(async () => {
    if (location?.source === 'gps') {
      await detectLocation();
    } else if (location?.latitude != null && location?.longitude != null) {
      const resolved = await locationService.resolveLocation(location.latitude, location.longitude, 'manual');
      setLocation(resolved);
    }
  }, [location, detectLocation]);

  const searchLocations = useCallback((query: string) => {
    return locationService.searchLocations(query);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        isSubmitting,
        gpsStatus,
        statusMessage,
        error,
        errorMessage: error,
        detectLocation,
        selectLocation,
        saveLocationGps,
        saveLocationManual,
        refreshLocation,
        clearError: () => setError(null),
        searchLocations,
        isSelectorOpen,
        openSelector: () => setIsSelectorOpen(true),
        closeSelector: () => setIsSelectorOpen(false),
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};
