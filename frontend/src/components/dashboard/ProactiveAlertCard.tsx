import React from 'react';
import { Sparkles, CloudRain, Shield, Share2, ArrowRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const ProactiveAlertCard: React.FC = () => {
  const { setActiveTab } = useUI();

  return (
    <div className="rounded-3xl bg-gradient-to-r from-sky-50 via-indigo-50 to-blue-50 p-6 border border-sky-200/80 shadow-md relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Sparkles className="w-32 h-32 text-sky-600" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-600 text-white text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WeatherGPT noticed something</span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            🌧 Rainfall Intensity Escalation Imminent
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
            Doppler radar echo synthesis indicates rain intensity in your sector will increase by +35% during the next 2 hours. High probability of localized street runoff.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('alerts')}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Risk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('whatif')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-sky-600" />
            <span>Prepare</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'WeatherGPT Proactive Alert',
                  text: 'Rain intensity may increase in your area during the next 2 hours.'
                });
              } else {
                alert('Alert link copied to clipboard!');
              }
            }}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200 shadow-xs transition-all cursor-pointer"
            title="Share Notice"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
