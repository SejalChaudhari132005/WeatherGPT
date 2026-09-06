import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { WeatherInsightCard } from '../weather/WeatherInsightCard';
import { WeatherAdvisoryCard } from '../weather/WeatherAdvisoryCard';
import { WeatherSourceCard } from '../weather/WeatherSourceCard';

interface Props {
  message: ChatMessageType;
  onFollowupClick?: (text: string) => void;
}

export const ChatMessage: React.FC<Props> = ({ message, onFollowupClick }) => {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end my-3 font-['Arimo'] animate-fadeIn">
        <div className="max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-3xl rounded-tr-xs bg-gradient-to-r from-[#38b6ff] to-[#004aad] text-white shadow-md">
          <p className="text-sm font-bold leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  // Assistant / WeatherGPT Response
  return (
    <div className="flex gap-3 my-4 max-w-[95%] font-['Arimo'] animate-fadeIn">
      {/* WeatherGPT Icon */}
      <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0 mt-1">
        <img src="/assets/logo-icon.png" alt="WeatherGPT" className="w-5 h-5 object-contain" />
      </div>

      <div className="flex-1 space-y-2">
        {/* Assistant Header */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-900 tracking-tight">WeatherGPT</span>
          <span className="text-[10px] text-slate-400 font-semibold">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Narrative Response Layout */}
        <div className="p-4 rounded-3xl rounded-tl-xs bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">
            {message.text}
          </div>

          {/* Embedded Weather Insight Metrics Card */}
          {message.weatherData && <WeatherInsightCard data={message.weatherData} />}

          {/* Embedded Advisory Box */}
          {message.weatherData?.advisory && typeof message.weatherData.advisory !== 'string' && (
            <WeatherAdvisoryCard advisory={message.weatherData.advisory} />
          )}

          {/* Footer Metadata (Location, Updated, Confidence, Sources) */}
          {message.weatherData && <WeatherSourceCard data={message.weatherData} />}
        </div>

        {/* Suggested Followups */}
        {message.suggestedFollowups && message.suggestedFollowups.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {message.suggestedFollowups.map((followup, idx) => (
              <button
                key={idx}
                onClick={() => onFollowupClick && onFollowupClick(followup)}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-[#004aad] text-xs font-bold border border-slate-200/80 transition-colors cursor-pointer"
              >
                {followup}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
