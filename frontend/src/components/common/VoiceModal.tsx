import React from 'react';
import { Mic, X, Volume2, Sparkles } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useWeather } from '../../context/WeatherContext';
import { useVoice } from '../../hooks/useVoice';

export const VoiceModal: React.FC = () => {
  const { voiceModalOpen, setVoiceModalOpen } = useUI();
  const { sendQueryToWeatherGPT } = useWeather();

  const handleSpeechCaptured = (spokenText: string) => {
    if (spokenText && spokenText !== 'Listening (Simulated)...') {
      sendQueryToWeatherGPT(spokenText);
      setTimeout(() => {
        setVoiceModalOpen(false);
      }, 1200);
    }
  };

  const { isListening, transcript, startListening } = useVoice(handleSpeechCaptured);

  if (!voiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-200 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-200 rounded-full blur-3xl opacity-50"></div>

        <button
          onClick={() => setVoiceModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-sky-50 text-sky-600 border border-sky-100 shadow-inner">
          <Mic className={`w-10 h-10 ${isListening ? 'animate-bounce text-sky-600' : 'text-slate-400'}`} />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {isListening ? 'Listening to your voice...' : 'Voice Weather Assistant'}
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Ask in English, Hindi, or Marathi (e.g., "Will it rain tonight in my location?")
        </p>

        {/* Live Transcript Display */}
        <div className="bg-slate-50 rounded-2xl p-4 min-h-24 mb-6 flex flex-col items-center justify-center border border-slate-100">
          {transcript ? (
            <p className="text-slate-800 font-medium text-base">
              "<span className="text-sky-600">{transcript}</span>"
            </p>
          ) : (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Sparkles className="w-4 h-4 text-sky-500 animate-spin" />
              <span>Tap microphone below to start speaking</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={startListening}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-semibold shadow-lg shadow-sky-500/25 transition-all transform active:scale-95"
          >
            <Mic className="w-5 h-5" />
            <span>{isListening ? 'Listening...' : 'Tap to Speak'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
