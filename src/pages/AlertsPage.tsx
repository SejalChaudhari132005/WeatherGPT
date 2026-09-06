import React from 'react';
import { AlertBanner } from '../components/alerts/AlertBanner';
import { MOCK_ALERTS } from '../data/mockWeather';
import { AlertTriangle, ShieldCheck, Share2 } from 'lucide-react';
import { DemoBadge } from '../components/common/DemoBadge';

export const AlertsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Active Weather Alerts & Warnings</h1>
          <p className="text-xs text-slate-500">Official hazard notifications and disaster preparedness directives</p>
        </div>
        <DemoBadge label="LIVE FEED" variant="amber" />
      </div>

      <AlertBanner />

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Regional Advisory Feed</h3>
        {MOCK_ALERTS.map((alert) => (
          <div key={alert.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">{alert.issuedBy}</span>
              <span className="text-xs font-semibold text-slate-400">{alert.updatedAt}</span>
            </div>

            <h4 className="text-lg font-extrabold text-slate-900">{alert.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">{alert.description}</p>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-700 block uppercase tracking-wider">Recommended Safety Protocol:</span>
              {alert.recommendedActions.map((act, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
