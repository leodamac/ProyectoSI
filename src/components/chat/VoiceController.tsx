'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceControllerProps {
  onTranscript?: (transcript: string) => void;
}

export function VoiceController({ onTranscript }: VoiceControllerProps) {
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing'>('idle');
  const [showFallback, setShowFallback] = useState(false);

  const { isListening, isSupported, start, stop } = useSpeechToText({
    lang: 'es-ES',
    continuous: false,
    interimResults: false,
    onResult: (text, isFinal) => {
      if (isFinal) {
        setStatus('processing');
        if (onTranscript) {
          onTranscript(text);
        }
        
        // Reset to idle after processing
        setTimeout(() => {
          setStatus('idle');
        }, 500);
      }
    },
    onError: (error) => {
      console.error('Speech recognition error:', error);
      setStatus('idle');
      setShowFallback(true);
      
      // Hide fallback message after 3 seconds
      setTimeout(() => {
        setShowFallback(false);
      }, 3000);
    },
  });

  useEffect(() => {
    if (isListening) {
      setStatus('listening');
    } else if (status === 'listening') {
      setStatus('idle');
    }
  }, [isListening, status]);

  const toggleListening = () => {
    if (!isSupported) {
      setShowFallback(true);
      setTimeout(() => setShowFallback(false), 3000);
      return;
    }

    if (isListening) {
      stop();
      setStatus('idle');
    } else {
      start();
    }
  };

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={toggleListening}
        whileTap={{ scale: 0.95 }}
        className={`p-2 rounded-lg transition-all ${
          status === 'listening'
            ? 'bg-red-500 text-white animate-pulse'
            : status === 'processing'
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
        }`}
        title={
          status === 'listening'
            ? 'Detener grabación'
            : status === 'processing'
            ? 'Procesando...'
            : 'Usar entrada de voz'
        }
        aria-label={
          status === 'listening' ? 'Detener grabación' : 'Activar micrófono'
        }
      >
        {status === 'listening' ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </motion.button>

      {/* Voice visualization (stub placeholder) */}
      <AnimatePresence>
        {status === 'listening' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-white rounded-full"
                    animate={{
                      height: ['8px', '16px', '8px'],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              <span>Escuchando...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback message */}
      <AnimatePresence>
        {showFallback && !isSupported && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap z-10"
          >
            <div className="text-center">
              <p>Voz no soportada</p>
              <p className="text-gray-300 mt-1">Usa Chrome o Edge</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing indicator */}
      <AnimatePresence>
        {status === 'processing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-medium"
          >
            Procesando...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
