import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Conversation } from '../../types/chat';

interface Props {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export const ConversationItem: React.FC<Props> = ({
  conversation,
  isActive,
  onSelect,
  onRename,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`group relative flex items-center justify-between p-2.5 rounded-2xl transition-all font-['Arimo'] ${
        isActive
          ? 'bg-[#38b6ff]/15 text-[#004aad] font-extrabold border border-[#38b6ff]/40 shadow-2xs'
          : 'text-slate-700 hover:bg-slate-100/90 font-medium'
      }`}
    >
      <button
        onClick={onSelect}
        className="flex-1 flex items-center gap-2.5 min-w-0 text-left cursor-pointer"
      >
        <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#004aad]' : 'text-slate-400'}`} />
        <span className="text-xs truncate">{conversation.title}</span>
      </button>

      {/* Context Menu Button */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          aria-label="Conversation options"
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
        >
          <MoreVertical className="w-3.5 h-3.5" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 top-6 z-50 w-36 bg-white rounded-2xl shadow-xl border border-slate-200 p-1 space-y-0.5 text-xs font-bold text-slate-700 animate-fadeIn">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onRename();
              }}
              className="w-full px-3 py-2 rounded-xl hover:bg-sky-50 hover:text-[#004aad] flex items-center gap-2 text-left cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Rename</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onDelete();
              }}
              className="w-full px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 flex items-center gap-2 text-left cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
