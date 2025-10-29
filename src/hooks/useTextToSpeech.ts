'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseTextToSpeechResult {
  speak: (text: string) => void;
  stop: () => void;
  playing: boolean;
  isSupported: boolean;
}

export function useTextToSpeech(): UseTextToSpeechResult {
  const [playing, setPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const simulatedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if SpeechSynthesis API is available
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }

    return () => {
      if (utteranceRef.current && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (simulatedTimeoutRef.current) {
        clearTimeout(simulatedTimeoutRef.current);
      }
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      // Stop any ongoing speech
      if (isSupported && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (simulatedTimeoutRef.current) {
        clearTimeout(simulatedTimeoutRef.current);
      }

      if (isSupported && window.speechSynthesis) {
        // Use SpeechSynthesis API
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => {
          setPlaying(true);
        };

        utterance.onend = () => {
          setPlaying(false);
        };

        utterance.onerror = () => {
          setPlaying(false);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } else {
        // Simulated mode - use timeout based on text length
        setPlaying(true);
        
        // Estimate speaking time: ~150 words per minute, ~5 characters per word
        const estimatedDuration = Math.max(1000, (text.length / 5) * (60000 / 150));
        
        simulatedTimeoutRef.current = setTimeout(() => {
          setPlaying(false);
        }, estimatedDuration);
      }
    },
    [isSupported]
  );

  const stop = useCallback(() => {
    if (isSupported && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (simulatedTimeoutRef.current) {
      clearTimeout(simulatedTimeoutRef.current);
    }
    setPlaying(false);
  }, [isSupported]);

  return {
    speak,
    stop,
    playing,
    isSupported,
  };
}
