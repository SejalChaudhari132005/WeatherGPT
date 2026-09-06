import React, { useState } from 'react';
import { Send, Mic, Sparkles, Bot, HelpCircle, ChevronRight, Cpu } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useUI } from '../../context/UIContext';

export const AskWeatherGPTCard: React.FC = () => {
  const {
    chatMessages,
    sendQueryToWeatherGPT,
    isAiThinking,
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
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendQueryToWeatherGPT(inputText);
    setInputText('');
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white p-6 sm:p-8 shadow-xl shadow-blue-600/25 border border-sky-400/30 flex flex-col justify-between min-h-[460px]">
      {/* Top Badge */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-sky-100 border border-white/20">
          <Bot className="w-4 h-4 text-sky-200" />
          <span>WEATHERGPT ASSISTANT</span>
          <span className="opacity-60">• Ready when you are</span>
        </div>

        <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-wider text-sky-200 border border-white/15">
          AI WEATHER DESK
        </span>
      </div>

      {/* Main Headline */}
      <div className="z-10 space-y-3 my-auto py-2">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
          What would you like to<br />
          know about the sky?
        </h2>

        <p className="text-xs sm:text-sm text-sky-100 font-medium max-w-lg leading-relaxed">
          Type a question or use your voice. WeatherGPT will turn conditions into a decision you can act on.
        </p>
      </div>

      {/* Chat Messages Feed if active */}
      {chatMessages.length > 1 && (
        <div className="z-10 my-3 max-h-48 overflow-y-auto space-y-3 pr-1">
          {chatMessages.slice(-2).map((msg) => (
            <div
              key={msg.id}
              className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-white/20 text-white font-bold ml-auto max-w-[80%]'
                  : 'bg-white text-slate-900 shadow-md font-semibold max-w-[90%]'
              }`}
            >
              {msg.text}
              {msg.explainable && (
                <button
                  onClick={() => setActiveExplainableMsg(msg)}
                  className="mt-2 text-[10px] font-extrabold text-sky-600 hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3 h-3" /> Why this answer?
                </button>
              )}
            </div>
          ))}

          {isAiThinking && (
            <div className="p-3 bg-white/20 rounded-2xl text-xs font-semibold text-sky-100 flex items-center gap-2 animate-pulse">
              <Cpu className="w-4 h-4 animate-spin text-white" />
              <span>WeatherGPT neural downscaler synthesizing model consensus...</span>
            </div>
          )}
        </div>
      )}

      {/* Floating White Input Pill */}
      <form onSubmit={handleSend} className="relative z-10 my-4">
        <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full p-2 pl-4 shadow-lg border border-white/90">
          <Sparkles className="w-5 h-5 text-sky-500 shrink-0 mr-2" />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask WeatherGPT anything about the weather..."
            className="w-full bg-transparent text-slate-900 text-xs sm:text-sm font-semibold placeholder:text-slate-400 focus:outline-none"
          />

          <div className="flex items-center gap-1 shrink-0 ml-2">
            <button
              type="button"
              onClick={() => setVoiceModalOpen(true)}
              className="p-2 rounded-full text-slate-400 hover:text-sky-600 hover:bg-slate-100 transition-colors"
              title="Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white shadow-md shadow-sky-600/30 transition-transform active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Suggested Pill Chips */}
      <div className="z-10 pt-2 flex flex-wrap items-center gap-2">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => sendQueryToWeatherGPT(q)}
            className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold text-white transition-all backdrop-blur-sm cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};
