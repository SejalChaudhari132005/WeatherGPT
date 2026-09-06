import React from 'react';
import { PromptSuggestion } from '../../types/chat';

interface Props {
  suggestion: PromptSuggestion;
  onClick: (text: string) => void;
}

export const SuggestionCard: React.FC<Props> = ({ suggestion, onClick }) => {
  return (
    <button
      onClick={() => onClick(suggestion.text || suggestion.prompt || '')}
      className="p-3.5 rounded-2xl bg-white hover:bg-sky-50/80 border border-slate-200/90 hover:border-[#38b6ff]/50 shadow-2xs hover:shadow-md transition-all text-left flex items-start gap-3 group cursor-pointer font-['Arimo']"
    >
      <span className="text-xl p-2 rounded-xl bg-slate-50 group-hover:bg-white shrink-0 shadow-inner">
        {suggestion.icon}
      </span>
      <div className="flex-1">
        <span className="text-xs font-bold text-slate-800 group-hover:text-[#004aad] transition-colors leading-snug block">
          {suggestion.text}
        </span>
        <span className="text-[10px] text-slate-400 font-semibold block mt-0.5 uppercase tracking-wider">
          {suggestion.roleCategory} Prompt
        </span>
      </div>
    </button>
  );
};
