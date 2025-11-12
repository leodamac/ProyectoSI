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

// Voice recognition timeout settings
const SILENCE_TIMEOUT = 300000; // 5 minutes of silence before auto-stopping (300000ms = 5min)
const MAX_LISTENING_TIME = 600000; // 10 minutes maximum listening time (600000ms = 10min)

export function useSpeechToText(
  onResult?: (transcript: string, isFinal: boolean) => void
): UseSpeechToTextResult {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const simulatedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
            
            // Reset silence timeout when there's activity
            if (silenceTimeoutRef.current) {
              clearTimeout(silenceTimeoutRef.current);
            }
            
            // Set new silence timeout
            silenceTimeoutRef.current = setTimeout(() => {
              if (recognitionRef.current && listening) {
                console.log('Auto-stopping due to silence');
                stopRecognition();
              }
            }, SILENCE_TIMEOUT);
          }

          if (final) {
            setTranscript((prev) => prev + final);
            setInterimTranscript('');
            onResultRef.current?.(final.trim(), true);
            
            // Clear timeouts after final result
            if (silenceTimeoutRef.current) {
              clearTimeout(silenceTimeoutRef.current);
            }
            
            // Auto-stop after getting a final result
            setTimeout(() => {
              if (recognitionRef.current && listening) {
                stopRecognition();
              }
            }, 500);
          }
        };

        recognition.onerror = (event: Event) => {
          console.error('Speech recognition error:', event);
          setListening(false);
          
          // Clear all timeouts
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }
          if (maxTimeoutRef.current) {
            clearTimeout(maxTimeoutRef.current);
          }
        };

        recognition.onend = () => {
          setListening(false);
          
          // Clear all timeouts
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }
          if (maxTimeoutRef.current) {
            clearTimeout(maxTimeoutRef.current);
          }
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
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
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
        
        // Set maximum listening time timeout
        maxTimeoutRef.current = setTimeout(() => {
          console.log('Auto-stopping due to max time limit');
          stopRecognition();
        }, MAX_LISTENING_TIME);
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
    
    // Clear all timeouts
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
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
