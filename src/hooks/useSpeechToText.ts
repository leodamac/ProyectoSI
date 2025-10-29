'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface UseSpeechToTextResult {
  listening: boolean;
  startRecognition: () => Promise<void>;
  stopRecognition: () => void;
  transcript: string;
  interimTranscript: string;
  isSupported: boolean;
}

// Simulated mode for when Web Speech API is not available
const SIMULATED_PHRASES = [
  '¿Qué recetas keto me recomiendas?',
  'Necesito un plan de alimentación',
  'Dame ideas para el desayuno',
  'Ayuda con mi dieta cetogénica',
];

export function useSpeechToText(
  onResult?: (transcript: string, isFinal: boolean) => void
): UseSpeechToTextResult {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const simulatedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onResultRef = useRef(onResult);

  // Keep the callback ref up to date
  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    // Check if Web Speech API is available
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as Window & { SpeechRecognition?: new () => ISpeechRecognition })
          .SpeechRecognition ||
        (window as Window & { webkitSpeechRecognition?: new () => ISpeechRecognition })
          .webkitSpeechRecognition;

      if (SpeechRecognition) {
        setIsSupported(true);
        const recognition = new SpeechRecognition() as ISpeechRecognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-ES';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interim = '';
          let final = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const transcriptText = result[0].transcript;

            if (result.isFinal) {
              final += transcriptText + ' ';
            } else {
              interim += transcriptText;
            }
          }

          if (interim) {
            setInterimTranscript(interim);
            onResultRef.current?.(interim, false);
          }

          if (final) {
            setTranscript((prev) => prev + final);
            setInterimTranscript('');
            onResultRef.current?.(final.trim(), true);
          }
        };

        recognition.onerror = (event: Event) => {
          console.error('Speech recognition error:', event);
          setListening(false);
        };

        recognition.onend = () => {
          setListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setIsSupported(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (simulatedTimeoutRef.current) {
        clearTimeout(simulatedTimeoutRef.current);
      }
    };
  }, []);

  const startRecognition = useCallback(async () => {
    if (recognitionRef.current && isSupported) {
      try {
        setListening(true);
        setTranscript('');
        setInterimTranscript('');
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setListening(false);
      }
    } else {
      // Simulated mode
      setListening(true);
      setTranscript('');
      setInterimTranscript('Escuchando...');
      
      // Simulate interim transcript
      simulatedTimeoutRef.current = setTimeout(() => {
        const randomPhrase =
          SIMULATED_PHRASES[Math.floor(Math.random() * SIMULATED_PHRASES.length)];
        setInterimTranscript(randomPhrase);
        onResultRef.current?.(randomPhrase, false);

        // Simulate final transcript
        if (simulatedTimeoutRef.current) {
          clearTimeout(simulatedTimeoutRef.current);
        }
        simulatedTimeoutRef.current = setTimeout(() => {
          setTranscript(randomPhrase);
          setInterimTranscript('');
          setListening(false);
          onResultRef.current?.(randomPhrase, true);
        }, 1000);
      }, 1500);
    }
  }, [isSupported]);

  const stopRecognition = useCallback(() => {
    if (recognitionRef.current && isSupported) {
      recognitionRef.current.stop();
    } else {
      // Simulated mode
      if (simulatedTimeoutRef.current) {
        clearTimeout(simulatedTimeoutRef.current);
      }
      setListening(false);
      setInterimTranscript('');
    }
  }, [isSupported]);

  return {
    listening,
    startRecognition,
    stopRecognition,
    transcript,
    interimTranscript,
    isSupported,
  };
}
