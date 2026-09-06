import React, { useEffect, useState } from 'react';
import { Mic, X, Square, AlertCircle } from 'lucide-react';
import { speechService } from '../../services/speechService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptCaptured: (text: string) => void;
}

export const VoiceInputModal: React.FC<Props> = ({ isOpen, onClose, onTranscriptCaptured }) => {
  const [transcript, setTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState('Listening...');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      speechService.stop();
      setTranscript('');
      setErrorMessage('');
      return;
    }

    if (!speechService.isSupported()) {
      setIsSupported(false);
      setErrorMessage('Voice input is not supported by your browser. Please type your weather question.');
      return;
    }

    setIsSupported(true);
    setStatusMessage('Listening... Speak your weather question.');

    speechService.start({
      onStart: () => setStatusMessage('Listening... Speak your weather question.'),
      onResult: (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          onTranscriptCaptured(text);
          onClose();
        }
      },
      onError: (err) => setErrorMessage(err),
      onEnd: () => {
        if (transcript.trim()) {
          onTranscriptCaptured(transcript);
          onClose();
        }
      },
    });

    return () => {
      speechService.stop();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStopAndSend = () => {
    speechService.stop();
    if (transcript.trim()) {
      onTranscriptCaptured(transcript);
    }
    onClose();
  };

  const handleCancel = () => {
    speechService.cancel();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 font-['Arimo'] animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center space-y-5 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center text-slate-400">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Voice Assistant</span>
          <button onClick={handleCancel} className="p-1 rounded-full hover:bg-slate-100 cursor-pointer" aria-label="Close voice modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Animated Pulsing Mic Circle */}
        <div className="relative flex justify-center py-2">
          <div className="w-24 h-24 rounded-full bg-[#38b6ff]/20 flex items-center justify-center animate-ping absolute"></div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#004aad] to-[#38b6ff] flex items-center justify-center text-white shadow-xl relative z-10">
            <Mic className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-slate-900">WeatherGPT Voice Input</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">{statusMessage}</p>
        </div>

        {/* Real-time transcript box */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 min-h-[70px] flex items-center justify-center text-sm font-bold text-[#004aad]">
          {transcript ? `"${transcript}"` : <span className="text-slate-400 italic font-normal">Listening for spoken query...</span>}
        </div>

        {errorMessage && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleStopAndSend}
            disabled={!transcript.trim()}
            className="flex-1 py-3 rounded-2xl bg-[#004aad] hover:bg-[#003882] disabled:bg-slate-300 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Send Question</span>
          </button>
        </div>
      </div>
    </div>
  );
};
