/**
 * Interaction Mode Modal Component
 * A modern modal for selecting interaction modes (voice/text input and output)
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MessageSquare, Volume2, Keyboard } from 'lucide-react';
import { InteractionMode } from '@/hooks/useVoiceMode';

interface InteractionModeModalProps {
  isOpen: boolean;
  currentMode: InteractionMode;
  onClose: () => void;
  onModeChange: (mode: InteractionMode) => void;
}

const modeOptions: {
  mode: InteractionMode;
  label: string;
  inputIcon: React.ReactNode;
  outputIcon: React.ReactNode;
  inputLabel: string;
  outputLabel: string;
  description: string;
  color: string;
}[] = [
  {
    mode: 'voice-voice',
    label: 'Voz-Voz',
    inputIcon: <Mic className="w-5 h-5" />,
    outputIcon: <Volume2 className="w-5 h-5" />,
    inputLabel: 'Voz',
    outputLabel: 'Voz',
    description: 'Habla y escucha las respuestas',
    color: 'from-purple-500 to-pink-500',
  },
  {
    mode: 'voice-text',
    label: 'Voz-Texto',
    inputIcon: <Mic className="w-5 h-5" />,
    outputIcon: <MessageSquare className="w-5 h-5" />,
    inputLabel: 'Voz',
    outputLabel: 'Texto',
    description: 'Habla y lee las respuestas',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    mode: 'text-voice',
    label: 'Texto-Voz',
    inputIcon: <Keyboard className="w-5 h-5" />,
    outputIcon: <Volume2 className="w-5 h-5" />,
    inputLabel: 'Texto',
    outputLabel: 'Voz',
    description: 'Escribe y escucha las respuestas',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    mode: 'text-text',
    label: 'Texto-Texto',
    inputIcon: <Keyboard className="w-5 h-5" />,
    outputIcon: <MessageSquare className="w-5 h-5" />,
    inputLabel: 'Texto',
    outputLabel: 'Texto',
    description: 'Chat tradicional por escrito',
    color: 'from-gray-500 to-slate-500',
  },
];

export default function InteractionModeModal({
  isOpen,
  currentMode,
  onClose,
  onModeChange,
}: InteractionModeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
                <div>
                  <h2 className="text-xl font-bold text-white">Modo de Interacción</h2>
                  <p className="text-sm text-white/90 mt-1">
                    Elige cómo quieres comunicarte
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modeOptions.map((option) => {
                    const isSelected = currentMode === option.mode;
                    return (
                      <motion.button
                        key={option.mode}
                        onClick={() => {
                          onModeChange(option.mode);
                          onClose();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        {/* Selected Badge */}
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            Activo
                          </div>
                        )}

                        {/* Title with gradient */}
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className={`w-10 h-10 bg-gradient-to-br ${option.color} rounded-lg flex items-center justify-center shadow-md`}
                          >
                            {option.inputIcon}
                          </div>
                          <h3 className="font-bold text-gray-900">{option.label}</h3>
                        </div>

                        {/* Input/Output Flow */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1.5 flex-1">
                            <div className="text-gray-600">{option.inputIcon}</div>
                            <span className="text-sm font-medium text-gray-700">
                              {option.inputLabel}
                            </span>
                          </div>
                          <div className="text-gray-400">→</div>
                          <div className="flex items-center gap-1.5 flex-1">
                            <div className="text-gray-600">{option.outputIcon}</div>
                            <span className="text-sm font-medium text-gray-700">
                              {option.outputLabel}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {option.description}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Info Footer */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Tip:</strong> Puedes cambiar el modo en cualquier momento durante
                    la conversación.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
