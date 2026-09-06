import React from 'react';
import { MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { getRoleTheme } from '../../config/roleThemes';

interface Props {
  role: string;
  locationName: string;
  onAskGpt: (promptText: string) => void;
}

export const QuickActions: React.FC<Props> = ({ role, locationName, onAskGpt }) => {
  const city = locationName.split(',')[0] || 'my location';
  const roleKey = (role || 'citizen').toLowerCase();

  const getQuickActionChips = () => {
    if (roleKey.includes('farm')) {
      return [
        { label: '🌧️ Rain Forecast', prompt: `Will it rain near my farm in ${city} in the next 24 hours?` },
        { label: '🌾 Crop Advisory', prompt: `What is the agricultural advisory for crops in ${city} today?` },
        { label: '💧 Irrigation Plan', prompt: `Should I irrigate my crops today in ${city}?` },
        { label: '🌡️ Heat Risk', prompt: `Is there any crop heat stress risk in ${city}?` },
      ];
    }

    if (roleKey.includes('fish') || roleKey.includes('marine')) {
      return [
        { label: '🎣 Can I sail?', prompt: `Is it safe for me to go fishing offshore near ${city} tomorrow?` },
        { label: '🌊 Wave Forecast', prompt: `What is the wave height and swell forecast near ${city}?` },
        { label: '🌬️ Wind Speed', prompt: `What will the coastal wind speed be near ${city}?` },
        { label: '⛈️ Storm Warning', prompt: `Are there offshore thunderstorm warnings for ${city}?` },
      ];
    }

    if (roleKey.includes('disaster') || roleKey.includes('emergency')) {
      return [
        { label: '🚨 Risk Areas', prompt: `What areas are at high risk in ${city} right now?` },
        { label: '🌊 Flood Map', prompt: `Where is urban flooding or waterlogging expected in ${city}?` },
        { label: '📢 Active Alerts', prompt: `Show all active emergency alerts for ${city}.` },
        { label: '📊 Situation Report', prompt: `Generate a weather situation report for ${city}.` },
      ];
    }

    if (roleKey.includes('urban') || roleKey.includes('planner')) {
      return [
        { label: '🌊 Waterlogging', prompt: `Which low-lying drainage zones in ${city} are vulnerable to waterlogging today?` },
        { label: '🏙️ Construction Risk', prompt: `Is high-rise crane operation safe in ${city} with today's wind speeds?` },
        { label: '🌡️ Heat Island', prompt: `What is the urban heat island assessment for ${city} today?` },
        { label: '🌧️ Drainage Load', prompt: `What is the expected municipal drainage load in ${city}?` },
      ];
    }

    // Citizen Default
    return [
      { label: '☔ Rain Outlook', prompt: `Will it rain in ${city} today? Should I carry an umbrella?` },
      { label: '🚗 Travel Safety', prompt: `Is it safe to travel in and around ${city} today?` },
      { label: '🌡️ Heat Index', prompt: `Is there a heatwave or high temperature risk in ${city}?` },
      { label: '🌤️ Weekend Weather', prompt: `What is the weather outlook for this weekend in ${city}?` },
    ];
  };

  const chips = getQuickActionChips();

  return (
    <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#004aad] to-[#38b6ff] text-white shadow-xl space-y-3 font-['Arimo']">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-xl bg-white/20 backdrop-blur-md shrink-0">
            <Sparkles className="w-4 h-4 text-[#fcd444]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-black truncate">What do you want to know?</h3>
            <p className="text-[9px] sm:text-[10px] text-sky-100 font-medium truncate">Tap to open WeatherGPT AI Assistant</p>
          </div>
        </div>

        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 opacity-80 shrink-0" />
      </div>

      <div className="grid grid-cols-2 gap-2 pt-0.5">
        {chips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => onAskGpt(chip.prompt)}
            className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 text-left text-[11px] sm:text-xs font-extrabold text-white transition-all cursor-pointer flex items-center justify-between gap-1 group active:scale-95 min-w-0"
          >
            <span className="truncate">{chip.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-200 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
