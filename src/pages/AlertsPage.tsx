import React from 'react';
import { ArrowLeft, AlertTriangle, Zap, Wind, CloudRain, ShieldAlert } from 'lucide-react';
import { DemoBadge } from '../components/common/DemoBadge';

interface Props {
  onBack: () => void;
}

export const AlertsPage: React.FC<Props> = ({ onBack }) => {
  const alertsList = [
    {
      id: '1',
      title: 'Heavy Rain & Flooding Warning',
      severity: 'Medium Risk',
      location: 'Nashik & Surrounding Coastal Belt',
      time: 'Valid today until 9:00 PM',
      icon: CloudRain,
      color: 'border-amber-200 bg-amber-50 text-amber-900',
      badge: 'bg-amber-500 text-white',
      desc: 'Potential for intense rainfall spells leading to localized waterlogging in municipal low-lying transit corridors.',
    },
    {
      id: '2',
      title: 'Lightning & Squall Advisory',
      severity: 'Low Risk',
      location: 'Rural Agricultural Sectors',
      time: 'Valid next 12 Hours',
      icon: Zap,
      color: 'border-sky-200 bg-sky-50 text-sky-900',
      badge: 'bg-[#38b6ff] text-white',
      desc: 'Isolated lightning strikes accompanied by brief convective wind gusts up to 35 km/h.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] p-4 sm:p-6 font-['Arimo'] max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-white text-slate-700 border border-slate-200 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Weather Alerts</h2>
            <p className="text-xs text-slate-500 font-medium">Official disaster warning & hazard bulletins</p>
          </div>
        </div>

        <DemoBadge label="ALERT ENGINE" variant="amber" />
      </div>

      <div className="space-y-3">
        {alertsList.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className={`p-4 rounded-3xl border ${item.color} shadow-xs space-y-2`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-black">{item.title}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${item.badge}`}>
                  {item.severity}
                </span>
              </div>

              <p className="text-xs font-medium opacity-90 leading-relaxed">{item.desc}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] font-bold opacity-75">
                <span>📍 {item.location}</span>
                <span>{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
