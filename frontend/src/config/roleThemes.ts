export interface RoleThemeConfig {
  id: string;
  roleName: string;
  badgeLabel: string;
  modeBadgeLabel: string;
  modeIcon: string;
  primaryColor: string; // Hex color
  accentGradient: string; // Tailwind gradient class
  overlayGradient: string;
  badgeStyle: string;
  cardBorder: string;
  tagline: string;
  defaultDecision: {
    icon: string;
    action: string;
    reason: string;
  };
}

export const ROLE_THEMES: Record<string, RoleThemeConfig> = {
  citizen: {
    id: 'citizen',
    roleName: 'CITIZEN',
    badgeLabel: 'CITIZEN',
    modeBadgeLabel: 'MONSOON SKY',
    modeIcon: '🌤️',
    primaryColor: '#004aad',
    accentGradient: 'from-[#38b6ff] via-[#005bb5] to-[#004aad]',
    overlayGradient: 'from-slate-950/80 via-[#004aad]/60 to-[#38b6ff]/40',
    badgeStyle: 'bg-sky-500/30 text-sky-100 border-sky-300/40',
    cardBorder: 'border-sky-200/80',
    tagline: 'Your exact location, translated into a weather decision.',
    defaultDecision: {
      icon: '☔',
      action: 'Carry an umbrella',
      reason: 'Rain probability increases to 76% after 4 PM in your area.',
    },
  },

  farmer: {
    id: 'farmer',
    roleName: 'FARMER',
    badgeLabel: 'FARMER',
    modeBadgeLabel: 'AGRI MODE',
    modeIcon: '🌾',
    primaryColor: '#15803d',
    accentGradient: 'from-emerald-500 via-green-600 to-emerald-800',
    overlayGradient: 'from-slate-950/85 via-emerald-950/70 to-emerald-800/40',
    badgeStyle: 'bg-emerald-500/30 text-emerald-100 border-emerald-300/40',
    cardBorder: 'border-emerald-200/80',
    tagline: 'Precision weather intelligence for irrigation & crop protection.',
    defaultDecision: {
      icon: '🌾',
      action: 'Consider delaying irrigation',
      reason: 'Rain probability is high (76%) over the next 24 hours.',
    },
  },

  fisherman: {
    id: 'fisherman',
    roleName: 'FISHERMAN',
    badgeLabel: 'FISHERMAN',
    modeBadgeLabel: 'MARINE MODE',
    modeIcon: '🎣',
    primaryColor: '#0e7490',
    accentGradient: 'from-cyan-500 via-teal-600 to-cyan-900',
    overlayGradient: 'from-slate-950/85 via-cyan-950/70 to-teal-800/40',
    badgeStyle: 'bg-cyan-500/30 text-cyan-100 border-cyan-300/40',
    cardBorder: 'border-cyan-200/80',
    tagline: 'Coastal & offshore marine conditions for safe vessel navigation.',
    defaultDecision: {
      icon: '🎣',
      action: 'Sailing caution advised',
      reason: 'Wind gusts up to 28 km/h and wave heights of 1.4m expected after 2 PM.',
    },
  },

  disaster_manager: {
    id: 'disaster_manager',
    roleName: 'DISASTER MANAGER',
    badgeLabel: 'DISASTER MANAGER',
    modeBadgeLabel: 'RISK MODE',
    modeIcon: '🚨',
    primaryColor: '#b45309',
    accentGradient: 'from-amber-500 via-orange-600 to-rose-900',
    overlayGradient: 'from-slate-950/90 via-slate-900/80 to-amber-950/60',
    badgeStyle: 'bg-amber-500/30 text-amber-100 border-amber-300/40',
    cardBorder: 'border-amber-300/80',
    tagline: 'Situational weather risk monitoring & emergency response bulletins.',
    defaultDecision: {
      icon: '🚨',
      action: 'Monitor rainfall escalation',
      reason: 'Heavy rainfall warning active across 3 flood-prone municipal zones.',
    },
  },

  urban_planner: {
    id: 'urban_planner',
    roleName: 'URBAN PLANNER',
    badgeLabel: 'URBAN PLANNER',
    modeBadgeLabel: 'PLANNING MODE',
    modeIcon: '🏙️',
    primaryColor: '#6b21a8',
    accentGradient: 'from-purple-500 via-indigo-600 to-purple-900',
    overlayGradient: 'from-slate-950/85 via-purple-950/70 to-indigo-900/40',
    badgeStyle: 'bg-purple-500/30 text-purple-100 border-purple-300/40',
    cardBorder: 'border-purple-200/80',
    tagline: 'Municipal drainage stress & urban infrastructure exposure metrics.',
    defaultDecision: {
      icon: '🌊',
      action: 'Waterlogging risk increasing',
      reason: '42mm peak rainfall expected between 4 PM - 7 PM across low-lying underpasses.',
    },
  },

  researcher: {
    id: 'researcher',
    roleName: 'RESEARCHER',
    badgeLabel: 'RESEARCHER',
    modeBadgeLabel: 'ANALYSIS MODE',
    modeIcon: '📈',
    primaryColor: '#3730a3',
    accentGradient: 'from-indigo-500 via-slate-700 to-indigo-950',
    overlayGradient: 'from-slate-950/90 via-indigo-950/75 to-slate-900/50',
    badgeStyle: 'bg-indigo-500/30 text-indigo-100 border-indigo-300/40',
    cardBorder: 'border-indigo-200/80',
    tagline: 'Atmospheric anomalies & multi-year historical climate analytics.',
    defaultDecision: {
      icon: '📈',
      action: 'Rainfall anomaly detected',
      reason: 'Current precipitation is +18% above the 10-year historical baseline.',
    },
  },

  aviation: {
    id: 'aviation',
    roleName: 'AVIATION',
    badgeLabel: 'AVIATION',
    modeBadgeLabel: 'AVIATION MODE',
    modeIcon: '✈️',
    primaryColor: '#d97706',
    accentGradient: 'from-amber-500 via-amber-600 to-orange-800',
    overlayGradient: 'from-slate-950/85 via-amber-950/70 to-amber-900/40',
    badgeStyle: 'bg-amber-500/30 text-amber-100 border-amber-300/40',
    cardBorder: 'border-amber-200/80',
    tagline: 'Flight corridor visibility, crosswinds & cloud base ceiling alerts.',
    defaultDecision: {
      icon: '✈️',
      action: 'Monitor evening visibility',
      reason: 'Cloud base ceiling 2200m; visibility may drop during 6 PM showers.',
    },
  },
};

export const getRoleTheme = (roleId?: string): RoleThemeConfig => {
  if (!roleId) return ROLE_THEMES.citizen;
  const normalized = roleId.toLowerCase().trim();

  if (normalized.includes('farm')) return ROLE_THEMES.farmer;
  if (normalized.includes('fish') || normalized.includes('marine')) return ROLE_THEMES.fisherman;
  if (normalized.includes('disaster') || normalized.includes('emergency')) return ROLE_THEMES.disaster_manager;
  if (normalized.includes('urban') || normalized.includes('planner')) return ROLE_THEMES.urban_planner;
  if (normalized.includes('research') || normalized.includes('climate')) return ROLE_THEMES.researcher;
  if (normalized.includes('aviat')) return ROLE_THEMES.aviation;

  return ROLE_THEMES.citizen;
};
