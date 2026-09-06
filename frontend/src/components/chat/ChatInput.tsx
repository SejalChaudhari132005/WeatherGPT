import React, { useState } from 'react';
import { Mic, Send, Loader2 } from 'lucide-react';

interface Props {
  onSendMessage: (text: string) => void;
  onOpenVoiceModal: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<Props> = ({
  onSendMessage,
  onOpenVoiceModal,
  isLoading = false,
  disabled = false,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading || disabled) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-white via-white/95 to-transparent pt-3 pb-3 px-3 sm:px-4 font-['Arimo']">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex items-center gap-2 p-1.5 pl-3.5 bg-white border border-slate-300 rounded-3xl shadow-lg focus-within:border-[#38b6ff] focus-within:ring-2 focus-within:ring-[#38b6ff]/20 transition-all"
      >
        {/* Voice Input Microphone Button */}
        <button
          type="button"
          onClick={onOpenVoiceModal}
          disabled={isLoading || disabled}
          aria-label="Voice input"
          title="Voice input"
          className="p-2.5 rounded-2xl text-slate-500 hover:text-[#004aad] hover:bg-sky-50 transition-colors cursor-pointer shrink-0"
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Text Area / Input */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask WeatherGPT..."
          disabled={isLoading || disabled}
          className="flex-1 bg-transparent py-2 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading || disabled}
          aria-label="Send message"
          title="Send message"
          className="p-3 rounded-2xl bg-gradient-to-r from-[#38b6ff] to-[#004aad] hover:opacity-95 disabled:bg-slate-200 disabled:from-slate-200 disabled:to-slate-200 text-white font-extrabold shadow-md transition-all cursor-pointer shrink-0"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};
