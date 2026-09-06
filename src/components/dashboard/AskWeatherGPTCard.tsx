import React, { useState } from 'react';
import { Send, Mic, MapPin, Sparkles, Cpu, HelpCircle, ChevronRight } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useUI } from '../../context/UIContext';

export const AskWeatherGPTCard: React.FC = () => {
  const {
    chatMessages,
    sendQueryToWeatherGPT,
    isAiThinking,
    userLocation,
    setActiveExplainableMsg
  } = useWeather();

  const { setVoiceModalOpen } = useUI();
  const [inputText, setInputText] = useState('');

  const suggestedQuestions = [
    'Will it rain today?',
    'Will it rain tomorrow?',
    'Is it safe to travel?',
    'Flood risk near me',
    'Weather for my farm',
    'Is it safe to go fishing?',
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendQueryToWeatherGPT(inputText);
    setInputText('');
  };

  const handleQuestionClick = (q: string) => {
    sendQueryToWeatherGPT(q);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">Ask WeatherGPT</h2>
            <p className="text-xs text-slate-500">AI Atmospheric Intelligence • Conversational Desk</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
          <MapPin className="w-3.5 h-3.5 text-sky-600" />
          <span>{userLocation?.city || 'Mumbai'} Sector</span>
        </div>
      </div>

      {/* Conversation Feed */}
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1 mb-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] p-4 rounded-3xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white font-medium rounded-br-none shadow-md shadow-sky-600/15'
                  : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-bl-none shadow-2xs'
              }`}
            >
              {msg.text}

              {/* Explainable AI Trigger Button */}
              {msg.explainable && (
                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                  <button
                    onClick={() => setActiveExplainableMsg(msg)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-sky-100/80 hover:bg-sky-200/80 text-sky-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                    <span>Why this answer?</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>

                  <span className="text-[10px] text-slate-400 font-semibold">
                    Sources: {msg.explainable.sources.join(', ')}
                  </span>
                </div>
              )}
            </div>

            <span className="text-[10px] text-slate-400 font-medium mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isAiThinking && (
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-slate-500 text-xs w-max animate-pulse">
            <Cpu className="w-4 h-4 text-sky-600 animate-spin" />
            <span>WeatherGPT neural downscaler synthesizing model consensus...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="relative mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything about the weather..."
          className="w-full pl-4 pr-24 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-medium transition-all"
        />

        <div className="absolute right-2 top-2 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setVoiceModalOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-slate-200/60 transition-colors"
            title="Voice input"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 text-white font-bold transition-all shadow-md shadow-sky-600/20 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Suggested Questions Chips */}
      <div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Suggested Questions
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuestionClick(q)}
              className="px-3 py-1.5 bg-slate-100/80 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-600 transition-all cursor-pointer"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
