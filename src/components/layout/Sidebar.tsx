import React from 'react';
import {
  CloudSun,
  Home,
  MessageSquare,
  Activity,
  Radar,
  Bell,
  ShieldAlert,
  Sprout,
  Fish,
  Plane,
  Building,
  GraduationCap,
  Map,
  Compass,
  Sliders,
  Globe,
  ChevronLeft,
  ChevronRight,
  Flame,
  ToggleLeft,
  ToggleRight,
  Eye,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { useUI, ActiveTab } from '../../context/UIContext';
import { useWeather } from '../../context/WeatherContext';
import { useLanguage, LANGUAGES, LanguageCode } from '../../context/LanguageContext';
import { UserRole } from '../../types/role';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    simpleMode,
    setSimpleMode,
    emergencyMode,
    setEmergencyMode
  } = useUI();

  const { activeRole, setActiveRole } = useWeather();
  const { language, setLanguage, t } = useLanguage();

  const mainNavItems: { id: ActiveTab; label: string; icon: any; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ask', label: 'Ask WeatherGPT', icon: MessageSquare },
    { id: 'live', label: 'Live Weather', icon: Activity },
    { id: 'radar', label: 'Radar', icon: Radar },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: 'Live' },
    { id: 'advisories', label: 'Advisories', icon: Sprout },
    { id: 'climate', label: 'Climate', icon: Flame },
    { id: 'whatif', label: 'What-If', icon: Sliders },
    { id: 'travel', label: 'Travel', icon: Map },
  ];

  const roleItems: { id: UserRole; label: string; icon: any }[] = [
    { id: 'Citizen', label: 'Citizen', icon: UserCheck },
    { id: 'Farmer', label: 'Farmer', icon: Sprout },
    { id: 'Fisher', label: 'Fisher', icon: Fish },
    { id: 'Disaster Manager', label: 'Disaster Manager', icon: ShieldAlert },
    { id: 'Aviation', label: 'Aviation', icon: Plane },
    { id: 'Urban Planner', label: 'Urban Planner', icon: Building },
    { id: 'Researcher', label: 'Researcher', icon: GraduationCap },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-r border-slate-200/80 transition-all duration-300 flex flex-col justify-between hidden md:flex ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Top Header & Logo */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2.5 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl text-white shadow-md shadow-sky-500/20 shrink-0">
            <CloudSun className="w-6 h-6 animate-float" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                Weather<span className="text-sky-600">GPT</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                Weather Intelligence
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Main Nav */}
        <div>
          {sidebarOpen && (
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Workspace
            </div>
          )}
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                  title={item.label}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-600'}`} />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                  {sidebarOpen && item.badge && (
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* WeatherGPT For You (Role Selector) */}
        <div>
          {sidebarOpen && (
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              WeatherGPT For You
            </div>
          )}
          <div className="space-y-1">
            {roleItems.map((r) => {
              const RoleIcon = r.icon;
              const isSelected = activeRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setActiveRole(r.id);
                    if (r.id === 'Farmer' || r.id === 'Fisher') setActiveTab('advisories');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-sky-50 text-sky-700 border border-sky-200/80'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                  title={r.label}
                >
                  <RoleIcon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                  {sidebarOpen && <span className="truncate">{r.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Footer Controls */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        {/* Simple Mode Toggle */}
        <button
          onClick={() => setSimpleMode(!simpleMode)}
          className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-semibold transition-colors ${
            simpleMode ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-600" />
            {sidebarOpen && <span>Simple Mode</span>}
          </div>
          {sidebarOpen && (simpleMode ? <ToggleRight className="w-5 h-5 text-indigo-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />)}
        </button>

        {/* Emergency Mode Button */}
        <button
          onClick={() => {
            setEmergencyMode(!emergencyMode);
            if (!emergencyMode) setActiveTab('emergency');
          }}
          className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition-all ${
            emergencyMode
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            {sidebarOpen && <span>🚨 Emergency Mode</span>}
          </div>
          {sidebarOpen && <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-200/60 text-rose-900">SOS</span>}
        </button>

        {/* Language Selector */}
        {sidebarOpen && (
          <div className="pt-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-sky-500/20 font-medium"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </aside>
  );
};
