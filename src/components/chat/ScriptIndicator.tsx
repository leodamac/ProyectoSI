/**
 * Script Indicator Component
 * Shows when a script is active and provides hints/progress
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, ChevronUp, Lightbulb, X, BarChart3 } from 'lucide-react';

interface ScriptIndicatorProps {
  scriptName: string;
  progress: number;
  currentStep: number;
  totalSteps: number;
  hint?: string;
  onClose: () => void;
}

export default function ScriptIndicator({
  scriptName,
  progress,
  currentStep,
  totalSteps,
  hint,
  onClose,
}: ScriptIndicatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-3"
    >
      {/* Compact View */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg overflow-hidden">
        <div className="px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <FileText className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-purple-900 truncate">{scriptName}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-white/50 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  />
                </div>
                <span className="text-xs text-purple-700 flex-shrink-0">
                  {currentStep}/{totalSteps}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 ml-2">
            {hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="p-1 hover:bg-purple-100 rounded transition-colors"
                aria-label="Ver sugerencia"
                title="Ver sugerencia"
              >
                <Lightbulb
                  className={`w-4 h-4 ${showHint ? 'text-yellow-500' : 'text-purple-600'}`}
                />
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-purple-100 rounded transition-colors"
              aria-label={isExpanded ? 'Contraer' : 'Expandir'}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-purple-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-purple-600" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-purple-100 rounded transition-colors"
              aria-label="Cerrar guion"
              title="Detener guion"
            >
              <X className="w-4 h-4 text-purple-600" />
            </button>
          </div>
        </div>

        {/* Hint Banner */}
        <AnimatePresence>
          {showHint && hint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-3 py-2 bg-yellow-50 border-t border-yellow-200">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-800">{hint}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-3 py-3 bg-white/50 border-t border-purple-200 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <BarChart3 className="w-3 h-3 text-purple-600" />
                  <span className="text-purple-900 font-semibold">
                    Progreso: {progress}%
                  </span>
                </div>

                <div className="text-xs text-purple-700 space-y-1">
                  <p>
                    <strong>Modo:</strong> Simulación de Demo
                  </p>
                  <p>
                    <strong>Paso actual:</strong> {currentStep} de {totalSteps}
                  </p>
                </div>

                <div className="pt-2 border-t border-purple-200">
                  <p className="text-xs text-purple-600">
                    💡 <strong>Consejo:</strong> Puedes desviarte del guion en cualquier momento. El
                    sistema se adaptará a tus preguntas.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
