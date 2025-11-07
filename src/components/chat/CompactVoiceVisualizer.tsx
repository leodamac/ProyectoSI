/**
 * Compact Voice Visualizer Component
 * A minimal, non-intrusive voice feedback indicator for mobile
 * Shows as a small circle that can be expanded to see conversation
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, X, ChevronUp, VolumeX } from 'lucide-react';

interface CompactVoiceVisualizerProps {
  listening: boolean;
  isAudioPlaying: boolean;
  messages: Array<{ role: string; content: string }>;
  onClose?: () => void;
  onToggleListening?: () => void;
  onStopAudio?: () => void;
}

export default function CompactVoiceVisualizer({
  listening,
  isAudioPlaying,
  messages,
  onClose,
  onToggleListening,
  onStopAudio,
}: CompactVoiceVisualizerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine if component should be visible
  const shouldShow = useMemo(() => {
    return listening || isAudioPlaying || isExpanded || messages.length > 0;
  }, [listening, isAudioPlaying, isExpanded, messages.length]);

  // Don't render if not needed
  if (!shouldShow) {
    return null;
  }

  return (
    <>
      {/* Compact Circle Indicator (when not expanded) */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-20 right-4 z-[45]"
          >
            <button
              onClick={() => setIsExpanded(true)}
              className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all ${
                listening
                  ? 'bg-red-500 animate-pulse'
                  : isAudioPlaying
                  ? 'bg-blue-500 animate-pulse'
                  : 'bg-emerald-500'
              }`}
              aria-label="Expandir asistente de voz"
            >
              {/* Pulse Animation Rings */}
              {(listening || isAudioPlaying) && (
                <>
                  <motion.div
                    className={`absolute inset-0 rounded-full ${
                      listening ? 'bg-red-400' : 'bg-blue-400'
                    }`}
                    animate={{
                      scale: [1, 1.5, 1.8],
                      opacity: [0.5, 0.3, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeOut',
                    }}
                  />
                  <motion.div
                    className={`absolute inset-0 rounded-full ${
                      listening ? 'bg-red-400' : 'bg-blue-400'
                    }`}
                    animate={{
                      scale: [1, 1.3, 1.5],
                      opacity: [0.6, 0.4, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeOut',
                      delay: 0.3,
                    }}
                  />
                </>
              )}

              {/* Icon */}
              {listening ? (
                <Mic className="w-7 h-7 text-white relative z-10" />
              ) : isAudioPlaying ? (
                <Volume2 className="w-7 h-7 text-white relative z-10" />
              ) : (
                <Mic className="w-7 h-7 text-white relative z-10" />
              )}

              {/* Tap to expand hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
              >
                Toca para ver
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
              </motion.div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded View (modal sheet from bottom) */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[55]"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[60] max-h-[60vh] overflow-hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {listening ? (
                    <>
                      <Mic className="w-5 h-5 text-white animate-pulse" />
                      <span className="text-white font-semibold text-sm">Escuchando...</span>
                    </>
                  ) : isAudioPlaying ? (
                    <>
                      <Volume2 className="w-5 h-5 text-white animate-pulse" />
                      <span className="text-white font-semibold text-sm">Hablando...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold text-sm">Asistente de Voz</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {/* Stop audio button */}
                  {isAudioPlaying && onStopAudio && (
                    <button
                      onClick={onStopAudio}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      aria-label="Detener audio"
                    >
                      <VolumeX className="w-4 h-4 text-white" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                    aria-label="Minimizar"
                  >
                    <ChevronUp className="w-5 h-5 text-white" />
                  </button>
                  {/* Close button if provided */}
                  {onClose && (
                    <button
                      onClick={onClose}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      aria-label="Cerrar"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* Conversation */}
              <div className="p-4 overflow-y-auto max-h-[50vh] space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    <Mic className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                    <p>Habla para comenzar</p>
                  </div>
                ) : (
                  messages.slice(-5).map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                          msg.role === 'user'
                            ? 'bg-emerald-500 text-white rounded-br-sm'
                            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Voice Visualizer (when active) */}
              {(listening || isAudioPlaying) && (
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1 rounded-full ${
                          listening ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                        animate={{ height: ['16px', '32px', '16px'] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          delay: i * 0.1,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                  {/* Mic button to toggle listening */}
                  {onToggleListening && (
                    <button
                      onClick={onToggleListening}
                      className={`mt-3 w-full py-2 rounded-lg font-semibold transition-all ${
                        listening
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-emerald-500 text-white hover:bg-emerald-600'
                      }`}
                    >
                      {listening ? 'Detener' : 'Hablar'}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
