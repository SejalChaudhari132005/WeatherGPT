// WeatherGPT Front-end Voice Interaction Service
// Abstracted layer wrapping Web Speech API (SpeechRecognition / webkitSpeechRecognition)

export interface SpeechServiceCallbacks {
  onStart?: () => void;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (errorMessage: string) => void;
  onEnd?: () => void;
}

class SpeechService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      this.recognition = new SpeechRecognitionAPI();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  public isSupported(): boolean {
    return !!this.recognition;
  }

  public start(callbacks: SpeechServiceCallbacks): boolean {
    if (!this.recognition) {
      if (callbacks.onError) {
        callbacks.onError('Voice recognition is not supported in this browser. Please type your message.');
      }
      return false;
    }

    if (this.isListening) {
      this.stop();
    }

    this.recognition.onstart = () => {
      this.isListening = true;
      if (callbacks.onStart) callbacks.onStart();
    };

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const text = finalTranscript || interimTranscript;
      if (callbacks.onResult && text) {
        callbacks.onResult(text, !!finalTranscript);
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      let msg = 'Voice recognition error occurred.';
      if (event.error === 'not-allowed') {
        msg = 'Microphone access denied. Please check your browser permissions.';
      } else if (event.error === 'no-speech') {
        msg = 'No speech was detected. Please try speaking again.';
      }
      if (callbacks.onError) callbacks.onError(msg);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (callbacks.onEnd) callbacks.onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (err: any) {
      if (callbacks.onError) callbacks.onError(err.message || 'Could not start voice listener');
      return false;
    }
  }

  public stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
      this.isListening = false;
    }
  }

  public cancel(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.abort();
      } catch (e) {
        // Ignore
      }
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();
