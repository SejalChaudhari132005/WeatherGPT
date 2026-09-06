import React, { useState, useEffect } from 'react';
import { Search, Navigation, Sparkles, AlertTriangle, Building2, X, Loader2, MapPin, Check } from 'lucide-react';
import { useLocation } from '../../hooks/useLocation';
import { useAuthContext } from '../../context/AuthContext';
import { locationService } from '../../services/locationService';
import { UserLocation } from '../../types/location';

export const LocationSetupScreen: React.FC = () => {
  const { isSubmitting, errorMessage, clearError, selectLocation } = useLocation();
  const { handleSaveLocationGps, handleSaveLocationManual } = useAuthContext();

  const [showManualSearch, setShowManualSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [liveResults, setLiveResults] = useState<UserLocation[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [gpsStatusMsg, setGpsStatusMsg] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const q = searchQuery.trim();
    if (q.length >= 2) {
      setSearching(true);
      const timer = setTimeout(async () => {
        const results = await locationService.searchLocation(q);
        if (active) {
          setLiveResults(results);
          setSearching(false);
        }
      }, 300);
      return () => {
        active = false;
        clearTimeout(timer);
      };
    } else {
      setLiveResults([]);
      setSearching(false);
    }
  }, [searchQuery]);

  const handleUseGps = async () => {
    clearError();
    setLocalError(null);
    setGpsLoading(true);
    setGpsStatusMsg('Requesting browser GPS permission...');

    try {
      // 1. Fetch exact hardware coordinates
      const coords = await locationService.getExactGPSPosition();
      setGpsStatusMsg(`GPS Lat: ${coords.latitude.toFixed(4)}, Lon: ${coords.longitude.toFixed(4)}. Resolving location...`);

      // 2. Resolve via backend LocationAgent
      const resolved = await locationService.resolveLocation(coords.latitude, coords.longitude, 'gps');
      setGpsStatusMsg(`Resolved: ${resolved.city}, ${resolved.state}`);

      // 3. Save to context & AuthContext profile
      await handleSaveLocationGps();
    } catch (e: any) {
      console.warn('[LocationSetupScreen] GPS resolution error:', e);
      setGpsLoading(false);
      setGpsStatusMsg(null);
      setLocalError(
        e.message ||
        'Location access was denied or unavailable. Click lock icon 🔒 in browser URL bar to allow location access or search your village/city below.'
      );
    }
  };

  const handleSelectLocation = async (loc: UserLocation) => {
    setShowManualSearch(false);
    await selectLocation(loc);
    await handleSaveLocationManual({
      latitude: loc.latitude,
      longitude: loc.longitude,
      name: loc.city,
      district: loc.district,
      state: loc.state,
      country: loc.country,
    });
  };

  const activeError = localError || errorMessage;

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-4 sm:p-6 md:p-8 relative font-['Arimo']">
      <div className="w-full max-w-md bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between min-h-[85vh] sm:min-h-[520px] transition-all">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Step 3 of 3 • Location Setup</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Where should WeatherGPT monitor weather for you?</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Get hyperlocal forecasts, rainfall risk, and warnings tailored for your exact location, village, town, or city.
          </p>
        </div>

        {/* Main Choice Cards */}
        <div className="my-auto space-y-3.5 py-4">
          {activeError && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold space-y-2.5 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{activeError}</div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleUseGps}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-xs cursor-pointer"
                >
                  Retry GPS
                </button>
                <button
                  onClick={() => {
                    setLocalError(null);
                    clearError();
                    setShowManualSearch(true);
                  }}
                  className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Search Village / City
                </button>
              </div>
            </div>
          )}

          {/* Status Message pill when detecting */}
          {gpsStatusMsg && !activeError && (
            <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-[#004aad] text-xs font-bold flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin shrink-0 text-[#38b6ff]" />
              <span className="truncate">{gpsStatusMsg}</span>
            </div>
          )}

          {/* Option A: Use Current GPS / Hardware Location */}
          <button
            onClick={handleUseGps}
            disabled={isSubmitting || gpsLoading}
            className="w-full p-5 rounded-3xl bg-gradient-to-r from-sky-500 via-[#005bb5] to-[#004aad] text-white shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-between text-left group cursor-pointer border border-sky-400/30"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-white/20 backdrop-blur-md group-hover:bg-white/30 transition-colors">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-base font-black tracking-tight">Use Exact Current Location</div>
                <div className="text-xs text-sky-100 font-medium">Detect exact device GPS coordinates</div>
              </div>
            </div>
            {(isSubmitting || gpsLoading) ? (
              <Loader2 className="w-5 h-5 animate-spin text-white shrink-0" />
            ) : (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">GPS</span>
            )}
          </button>

          {/* Option B: Search Any City / Village / Panchayat / District */}
          <button
            onClick={() => setShowManualSearch(true)}
            disabled={isSubmitting || gpsLoading}
            className="w-full p-5 rounded-3xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-800 transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-200/70 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors text-slate-600">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-black tracking-tight text-slate-900">Select Location Manually</div>
                <div className="text-xs text-slate-500 font-medium">Search any village, town, taluka, or city across India</div>
              </div>
            </div>
          </button>
        </div>

        {/* Manual Location Search Overlay / Modal */}
        {showManualSearch && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 max-h-[85vh] flex flex-col font-['Arimo']">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900">Search Any Location in India</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Enter village, taluka, town, district, or city name</p>
                </div>
                <button
                  onClick={() => setShowManualSearch(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type any village, town, or city (e.g. Khed, Shirur, Nashik)..."
                  className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#38b6ff] focus:bg-white shadow-inner"
                  autoFocus
                />
                {searching && (
                  <Loader2 className="w-4 h-4 absolute right-3.5 top-3.5 text-[#38b6ff] animate-spin" />
                )}
              </div>

              <div className="overflow-y-auto space-y-1.5 flex-1 pr-1 max-h-64">
                {liveResults.length > 0 ? (
                  liveResults.map((loc, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectLocation(loc)}
                      className="w-full p-3 rounded-2xl hover:bg-sky-50/80 border border-slate-100 hover:border-sky-200 text-left transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-slate-400 group-hover:text-[#004aad] shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#004aad]">{loc.city}, {loc.state}</div>
                          <div className="text-[10px] text-slate-400">{loc.district} • {loc.country}</div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : searchQuery.trim().length >= 2 && !searching ? (
                  <div className="p-4 text-center text-xs text-slate-400 font-medium">
                    No matching location found. Try typing district or state name.
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400 font-medium">
                    Start typing to search every city, village, or town across India.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center text-xs text-slate-400">
          Hyperlocal GPS resolution active. You can change location anytime from the dashboard.
        </div>
      </div>
    </div>
  );
};
