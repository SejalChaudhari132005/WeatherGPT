import { useState, useEffect, useCallback } from 'react';

export function useVoice(onTranscriptResult?: (text: string) => void) {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      // Demo fallback if browser lacks Web Speech API
      setIsListening(true);
      setTranscript('Listening (Simulated)...');
      setTimeout(() => {
        const simulatedQuery = 'Will it rain tonight?';
        setTranscript(simulatedQuery);
        setIsListening(false);
        if (onTranscriptResult) onTranscriptResult(simulatedQuery);
      }, 2500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript && onTranscriptResult) {
          onTranscriptResult(transcript);
        }
      };

      recognition.start();
    } catch (e) {
      console.error('Failed to start speech recognition', e);
      setIsListening(false);
    }
  }, [transcript, onTranscriptResult]);

  const speakText = useCallback((text: string, lang: string = 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Stop any previous speech

    const cleanText = text.replace(/[*#_`]/g, ''); // strip markdown chars
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    speakText,
    stopSpeaking,
    isSpeaking
  };
}
