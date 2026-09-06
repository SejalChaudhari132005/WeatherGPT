import React from 'react';
import { UserCheck, Sprout, Fish, ShieldAlert, Plane, Building, GraduationCap, ArrowRight } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useUI } from '../../context/UIContext';
import { UserRole } from '../../types/role';

export const RoleBasedAdvisoryCard: React.FC = () => {
  const { activeRole, setActiveRole } = useWeather();
  const { setActiveTab } = useUI();

  const roles: { id: UserRole; title: string; desc: string; icon: any; color: string }[] = [
    { id: 'Citizen', title: 'Citizen', desc: 'Daily commute & outdoor safety', icon: UserCheck, color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { id: 'Farmer', title: 'Farmer', desc: 'Crop advisory & irrigation windows', icon: Sprout, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'Fisher', title: 'Fisher', desc: 'Wave height & safe sailing hours', icon: Fish, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'Disaster Manager', title: 'Disaster Manager', desc: 'Flood warnings & shelter routes', icon: ShieldAlert, color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 'Aviation', title: 'Aviation', desc: 'Visibility & runway crosswinds', icon: Plane, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { id: 'Urban Planner', title: 'Urban Planner', desc: 'Waterlogging & drainage load', icon: Building, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'Researcher', title: 'Researcher', desc: 'Microclimate & anomaly trends', icon: GraduationCap, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Tailored Weather Intelligence</h3>
          <p className="text-xs text-slate-500">Switch persona to adjust advisory parameters and recommendations</p>
        </div>

        <button
          onClick={() => setActiveTab('advisories')}
          className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {roles.map((r) => {
          const Icon = r.icon;
          const isSelected = activeRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => {
                setActiveRole(r.id);
                if (r.id === 'Farmer' || r.id === 'Fisher' || r.id === 'Disaster Manager') {
                  setActiveTab('advisories');
                }
              }}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? `${r.color} ring-2 ring-sky-500/40 shadow-sm font-bold scale-[1.02]`
                  : 'bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" />
                {isSelected && <span className="w-2 h-2 rounded-full bg-current"></span>}
              </div>
              <div>
                <div className="text-xs font-extrabold truncate">{r.title}</div>
                <div className="text-[10px] opacity-75 line-clamp-1 mt-0.5">{r.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
