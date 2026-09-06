import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { UserRole, RoleOption } from '../../types/user';

export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'citizen',
    title: 'Citizen',
    subtitle: 'Local weather, travel & daily safety info',
    icon: '👤',
    advisoryPreview: "You'll receive local weather, travel, and daily safety recommendations."
  },
  {
    id: 'farmer',
    title: 'Farmer',
    subtitle: 'Crop weather, rainfall windows & irrigation advisories',
    icon: '🌾',
    advisoryPreview: "You'll receive crop-weather insights, rainfall windows, and irrigation advisories."
  },
  {
    id: 'fisherman',
    title: 'Fisherman',
    subtitle: 'Marine conditions, wind, waves & safe sailing info',
    icon: '🎣',
    advisoryPreview: "You'll receive marine conditions, wind speeds, wave heights, and safe-sailing guidance."
  },
  {
    id: 'disaster_manager',
    title: 'Disaster Manager',
    subtitle: 'Early disaster warnings, flood risk & shelter routes',
    icon: '🚨',
    advisoryPreview: "You'll receive early flood warnings, emergency shelter routes, and risk telemetry."
  },
  {
    id: 'aviation',
    title: 'Aviation',
    subtitle: 'Runway visibility, crosswinds & cloud ceilings',
    icon: '✈️',
    advisoryPreview: "You'll receive METAR crosswind data, cloud ceilings, and runway visibility reports."
  },
  {
    id: 'urban_planner',
    title: 'Urban Planner',
    subtitle: 'Waterlogging risk, drainage load & microclimates',
    icon: '🏙️',
    advisoryPreview: "You'll receive waterlogging risk indices, storm basin telemetry, and urban heat maps."
  },
  {
    id: 'researcher',
    title: 'Researcher',
    subtitle: 'Atmospheric anomalies & decadal climate trends',
    icon: '🔬',
    advisoryPreview: "You'll receive raw climate anomaly datasets, grid mesh telemetry, and decadal trends."
  },
  {
    id: 'journalist',
    title: 'Journalist',
    subtitle: 'Weather news alerts, disaster statistics & reports',
    icon: '📰',
    advisoryPreview: "You'll receive verifiable weather incident reports, IMD feeds, and storm bulletins."
  },
  {
    id: 'transport',
    title: 'Transport / Logistics',
    subtitle: 'Highway route weather, pass hazards & heavy fog warnings',
    icon: '🚚',
    advisoryPreview: "You'll receive highway pass visibility alerts, route rain risks, and logistics advisories."
  },
  {
    id: 'other',
    title: 'Other',
    subtitle: 'General weather intelligence & atmospheric queries',
    icon: '🌟',
    advisoryPreview: "You'll receive general atmospheric weather intelligence tailored to your location."
  }
];

export const RoleSelectionScreen: React.FC = () => {
  const { saveRole, profile } = useProfile();
  const [selectedRole, setSelectedRole] = useState<UserRole>(profile?.role || 'citizen');

  const handleContinue = () => {
    saveRole(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-4 sm:p-6 md:p-8 relative">
      <div className="w-full max-w-md bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between min-h-[85vh] sm:min-h-[580px] transition-all">
        {/* Top Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Step 2 of 3 • Experience Role</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Choose your WeatherGPT experience</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            We'll personalize weather intelligence for you. Select your primary role:
          </p>
        </div>

        {/* Grid of 10 Roles */}
        <div className="my-4 space-y-2 max-h-[55vh] sm:max-h-[380px] overflow-y-auto pr-1">
          {ROLE_OPTIONS.map((r) => {
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-500/20 shadow-sm'
                    : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl p-2 rounded-xl bg-white shrink-0 shadow-2xs">{r.icon}</span>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">{r.title}</div>
                    <div className="text-xs text-slate-500 font-medium line-clamp-1">{r.subtitle}</div>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div className="pt-2">
          <button
            onClick={handleContinue}
            className="w-full py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-extrabold text-base shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
