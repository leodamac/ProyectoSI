import { useState, useCallback, useRef } from 'react';

/**
 * Speech Synthesis interface for TypeScript
 */

export interface UseTextToSpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export function useTextToSpeech(options: UseTextToSpeechOptions = {}) {
  const {
    lang = 'es-ES',
    rate = 1,
    pitch = 1,
    volume = 1,
    onStart,
    onEnd,
    onError,
  } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(
    typeof window !== 'undefined' && 'speechSynthesis' in window
  );
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Speak text
  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        setIsSupported(false);
        if (onError) {
          onError('Text-to-speech not supported in this browser');
        }
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      utterance.onstart = () => {
        setIsSpeaking(true);
        if (onStart) {
          onStart();
        }
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEnd) {
          onEnd();
        }
      };

      utterance.onerror = (event) => {
        setIsSpeaking(false);
        console.error('Speech synthesis error:', event);
        if (onError) {
          onError('Speech synthesis failed');
        }
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [lang, rate, pitch, volume, onStart, onEnd, onError]
  );

  // Stop speaking
  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Pause speaking
  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  }, []);

  // Resume speaking
  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
  }, []);

  // Get available voices
  const getVoices = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      return window.speechSynthesis.getVoices();
    }
    return [];
  }, []);

  return {
    isSpeaking,
    isSupported,
    speak,
    stop,
    pause,
    resume,
    getVoices,
  };
}
