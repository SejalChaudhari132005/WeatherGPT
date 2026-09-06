import React, { useState } from 'react';
import { Search, Navigation, Sparkles, AlertTriangle, Building2, X } from 'lucide-react';
import { useLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';
import { CityOption } from '../../types/location';

export const LocationSetupScreen: React.FC = () => {
  const { saveLocationGps, saveLocationManual, isSubmitting, errorMessage, clearError, searchLocations } = useLocation();
  const { goToStep } = useAuth();

  const [showManualSearch, setShowManualSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchResults = searchLocations(searchQuery);

  const handleUseGps = async () => {
    clearError();
    await saveLocationGps();
  };

  const handleSelectCity = async (city: CityOption) => {
    setShowManualSearch(false);
    await saveLocationManual(city);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-4 sm:p-6 md:p-8 relative">
      <div className="w-full max-w-md bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between min-h-[85vh] sm:min-h-[520px] transition-all">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Step 3 of 3 • Location Setup</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Where should WeatherGPT monitor weather for you?</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Get hyperlocal forecasts, rainfall risk, and warnings tailored for your location.
          </p>
        </div>

        {/* Main Choice Cards */}
        <div className="my-auto space-y-3.5 py-4">
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleUseGps}
                  className="px-3 py-1.5 bg-amber-600 text-white rounded-xl font-bold text-xs shadow-xs"
                >
                  Try Again
                </button>
                <button
                  onClick={() => {
                    clearError();
                    setShowManualSearch(true);
                  }}
                  className="px-3 py-1.5 bg-white text-amber-900 border border-amber-300 rounded-xl font-bold text-xs"
                >
                  Select Location Manually
                </button>
              </div>
            </div>
          )}

          {/* GPS Choice Button */}
          <button
            onClick={handleUseGps}
            disabled={isSubmitting}
            className="w-full p-5 rounded-3xl bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white shadow-xl shadow-sky-600/25 transition-all text-left flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shrink-0 group-hover:scale-105 transition-transform">
                <Navigation className={`w-6 h-6 ${isSubmitting ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <div className="text-base font-extrabold">📍 Use My Current Location</div>
                <div className="text-xs text-sky-100 font-medium">Auto-detect browser GPS lat/long</div>
              </div>
            </div>
          </button>

          {/* Manual Choice Button */}
          <button
            onClick={() => setShowManualSearch(true)}
            disabled={isSubmitting}
            className="w-full p-5 rounded-3xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 shadow-2xs transition-all text-left flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shrink-0 text-slate-600 group-hover:scale-105 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-extrabold text-slate-900">🔎 Select Location Manually</div>
                <div className="text-xs text-slate-500 font-medium">Search by city, district, state or pincode</div>
              </div>
            </div>
          </button>
        </div>

        {/* Manual Search Modal */}
        {showManualSearch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative max-h-[85vh] flex flex-col">
              <button
                onClick={() => setShowManualSearch(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-slate-900 mb-1">Search Location</h3>
              <p className="text-xs text-slate-500 mb-4">Enter city, district, state or pincode</p>

              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search location (e.g. Mumbai)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  autoFocus
                />
              </div>

              <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
                {searchResults.map((city, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectCity(city)}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 text-left transition-all flex items-center gap-3"
                  >
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">{city.name}</div>
                      <div className="text-[11px] text-slate-400">{city.district}, {city.state}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center text-xs text-slate-400">
          GPS permissions can be managed anytime in your browser settings.
        </div>
      </div>
    </div>
  );
};
