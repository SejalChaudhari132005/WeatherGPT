import React, { useState } from 'react';
import { Search, MapPin, Star, X, Check, Navigation, Building2 } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useWeather } from '../../context/WeatherContext';
import { locationService } from '../../services/locationService';
import { MOCK_CITIES } from '../../data/mockCities';
import { CityOption } from '../../types/location';

export const LocationSelectorModal: React.FC = () => {
  const { locationModalOpen, setLocationModalOpen } = useUI();
  const { userLocation, setCustomLocation, detectUserLocation, locationLoading } = useWeather();

  const [query, setQuery] = useState('');
  const searchResults = locationService.searchLocations(query);

  const [savedCities, setSavedCities] = useState<CityOption[]>([
    MOCK_CITIES[0], // Mumbai
    MOCK_CITIES[1], // Pune
    MOCK_CITIES[4], // Delhi
    MOCK_CITIES[5], // Bengaluru
  ]);

  if (!locationModalOpen) return null;

  const handleSelectCity = (city: CityOption) => {
    setCustomLocation({
      latitude: city.latitude,
      longitude: city.longitude,
      city: city.name,
      district: city.district,
      state: city.state,
      country: city.country,
      pincode: city.pincode,
      isCustom: true
    });
    setLocationModalOpen(false);
  };

  const handleUseGPS = async () => {
    await detectUserLocation();
    setLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setLocationModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 mb-1">Select Location</h3>
        <p className="text-xs text-slate-500 mb-4">Choose your city, district, state, or search pincode for hyperlocal weather intelligence</p>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, district, state, pincode (e.g. Mumbai, 400001)..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            autoFocus
          />
        </div>

        <div className="overflow-y-auto space-y-4 pr-1 flex-1">
          {/* Use Current GPS Location Button */}
          <button
            onClick={handleUseGPS}
            disabled={locationLoading}
            className="w-full p-3.5 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200/80 text-sky-700 font-semibold text-sm flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                <Navigation className={`w-4 h-4 ${locationLoading ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-left">
                <div className="text-slate-900 font-bold">📍 Use Current GPS Location</div>
                <div className="text-xs text-sky-600">Detect browser latitude & longitude</div>
              </div>
            </div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Detect</span>
          </button>

          {/* Saved Locations */}
          {!query && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>⭐ Quick Saved Locations</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {savedCities.map((city, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectCity(city)}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{city.name}</div>
                      <div className="text-[11px] text-slate-400">{city.state}</div>
                    </div>
                    {userLocation?.city === city.name && (
                      <Check className="w-4 h-4 text-sky-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              🔎 {query ? 'Search Results' : 'Popular Cities'}
            </div>
            <div className="space-y-1.5">
              {searchResults.length > 0 ? (
                searchResults.map((city, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectCity(city)}
                    className="w-full p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 flex items-center justify-between transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{city.name}</div>
                        <div className="text-xs text-slate-500">
                          {city.district}, {city.state} {city.pincode ? `(${city.pincode})` : ''}
                        </div>
                      </div>
                    </div>
                    {userLocation?.city === city.name && (
                      <span className="text-xs font-semibold px-2 py-0.5 bg-sky-100 text-sky-700 rounded-md">
                        Selected
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <div className="py-6 text-center text-sm text-slate-400">
                  No cities found matching "{query}". Search supports any city or pincode.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
