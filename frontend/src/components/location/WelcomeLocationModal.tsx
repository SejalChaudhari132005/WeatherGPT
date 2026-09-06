import React from 'react';
import { MapPin, Search, Compass, CloudRain, ShieldCheck, Sparkles, Navigation } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/LanguageContext';

export const WelcomeLocationModal: React.FC = () => {
  const { hasLocationBeenSet, detectUserLocation, locationLoading, locationError } = useWeather();
  const { setLocationModalOpen } = useUI();
  const { t } = useLanguage();

  if (hasLocationBeenSet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-8 md:p-10 shadow-2xl border border-slate-100/80 text-center relative overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-sky-100 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-70 pointer-events-none"></div>

        {/* Header Icon / Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100 text-xs font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
          <span>WeatherGPT Platform • AI Weather Desk</span>
        </div>

        {/* Headline & Subtitle */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
          Weather intelligence,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
            made conversational.
          </span>
        </h1>

        <p className="text-base font-semibold text-slate-700 tracking-wide mb-2 uppercase">
          "Ask. Understand. Act."
        </p>

        <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
          Get hyperlocal weather intelligence, instant disaster warnings, and agricultural risk advisories tailored specifically for your location.
        </p>

        {/* Loading state indicator */}
        {locationLoading ? (
          <div className="my-6 p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center gap-3 text-sky-700 animate-pulse">
            <Navigation className="w-5 h-5 animate-spin text-sky-600" />
            <span className="font-semibold text-sm">📍 Detecting your location...</span>
          </div>
        ) : null}

        {/* Location Error Alert */}
        {locationError && (
          <div className="my-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs text-left font-medium">
            ⚠️ {locationError} You can choose your location manually below.
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={detectUserLocation}
            disabled={locationLoading}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-lg shadow-sky-600/30 transition-all transform active:scale-95 flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
          >
            <MapPin className="w-5 h-5" />
            <span>📍 Use My Location</span>
          </button>

          <button
            onClick={() => setLocationModalOpen(true)}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-slate-200/80"
          >
            <Search className="w-5 h-5 text-slate-500" />
            <span>Choose Location</span>
          </button>
        </div>

        {/* Privacy Note */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Browser GPS permission is required only for hyperlocal rainfall risk accuracy.</span>
        </div>
      </div>
    </div>
  );
};
