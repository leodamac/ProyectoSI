/**
 * Script Selector Component
 * Allows users to select and load conversation scripts for demo
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, FileText, User, Target, Clock, X, Upload, Info } from 'lucide-react';
import { ConversationScript } from '@/types';
import { availableScripts } from '@/data/scripts';

interface ScriptSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScript: (script: ConversationScript) => void;
  currentScriptId?: string;
}

export default function ScriptSelector({
  isOpen,
  onClose,
  onSelectScript,
  currentScriptId,
}: ScriptSelectorProps) {
  const [selectedScript, setSelectedScript] = useState<ConversationScript | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const handleSelectScript = (script: ConversationScript) => {
    setSelectedScript(script);
  };

  const handleStartScript = () => {
    if (selectedScript) {
      onSelectScript(selectedScript);
      onClose();
    }
  };

  const handleUploadScript = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const scriptData = JSON.parse(e.target?.result as string);
        // Validate script structure
        if (scriptData.id && scriptData.name && scriptData.steps) {
          onSelectScript(scriptData as ConversationScript);
          onClose();
        } else {
          alert('Formato de script inválido. Por favor verifica el archivo JSON.');
        }
      } catch (error) {
        alert('Error al leer el archivo. Asegúrate de que sea un JSON válido.');
        console.error('Error parsing script:', error);
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Guiones de Demostración</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold">Modo Simulación de Demo</p>
                <p className="text-blue-700">
                  Los guiones simulan conversaciones reales para demostrar las capacidades del sistema.
                  Puedes seguir el guion o desviarte para explorar libremente.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {!selectedScript ? (
              <>
                {/* Script List */}
                <div className="grid gap-4 md:grid-cols-2">
                  {availableScripts.map((script) => {
                    const isCurrentScript = currentScriptId === script.id;
                    const borderClass = isCurrentScript
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300 bg-white';
                    
                    return (
                      <motion.div
                        key={script.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectScript(script)}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${borderClass}`}
                      >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{script.name}</h3>
                        {currentScriptId === script.id && (
                          <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full">
                            Activo
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{script.description}</p>

                      {/* Profile Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">
                            <strong>Perfil:</strong>{' '}
                            {script.userProfile.name || script.userProfile.type}
                          </span>
                        </div>
                        {script.userProfile.goals && script.userProfile.goals.length > 0 && (
                          <div className="flex items-start gap-2 text-sm">
                            <Target className="w-4 h-4 text-gray-500 mt-0.5" />
                            <span className="text-gray-700">
                              <strong>Objetivos:</strong> {script.userProfile.goals.join(', ')}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">
                            <strong>Duración:</strong> ~{script.metadata?.estimatedDuration || '10'}{' '}
                            min
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      {script.metadata?.tags && (
                        <div className="flex flex-wrap gap-1">
                          {script.metadata.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Steps Count */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          {script.steps.length} pasos en el guion
                        </p>
                      </div>
                    </motion.div>
                  );
                  })}
                </div>

                {/* Upload Custom Script */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
                  >
                    <Upload className="w-4 h-4" />
                    Cargar guion personalizado (JSON)
                  </button>

                  {showUpload && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <p className="text-sm text-gray-600 mb-3">
                        Carga un archivo JSON con el formato de guion. Consulta la documentación
                        para ver la estructura requerida.
                      </p>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleUploadScript}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-emerald-500 file:text-white
                          hover:file:bg-emerald-600
                          file:cursor-pointer cursor-pointer"
                      />
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              /* Script Details */
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedScript.name}
                  </h3>
                  <p className="text-gray-600">{selectedScript.description}</p>
                </div>

                {/* User Profile */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Perfil del Usuario
                  </h4>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <strong>Tipo:</strong> {selectedScript.userProfile.type}
                    </p>
                    {selectedScript.userProfile.name && (
                      <p>
                        <strong>Nombre:</strong> {selectedScript.userProfile.name}
                      </p>
                    )}
                    {selectedScript.userProfile.background && (
                      <p>
                        <strong>Contexto:</strong> {selectedScript.userProfile.background}
                      </p>
                    )}
                    {selectedScript.userProfile.goals && (
                      <p>
                        <strong>Objetivos:</strong> {selectedScript.userProfile.goals.join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Script Steps Preview */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Pasos del Guion</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedScript.steps.map((step, idx) => (
                      <div
                        key={step.id}
                        className="p-3 bg-white border border-gray-200 rounded-lg text-sm"
                      >
                        <p className="font-semibold text-gray-900 mb-1">
                          Paso {idx + 1}: {step.userInput || 'Respuesta libre'}
                        </p>
                        <p className="text-gray-600 line-clamp-2">
                          {step.assistantResponse.slice(0, 100)}...
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Back Button */}
                <button
                  onClick={() => setSelectedScript(null)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  ← Volver a la lista
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {selectedScript && (
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedScript.steps.length} pasos · ~
                {selectedScript.metadata?.estimatedDuration || 10} minutos
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedScript(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleStartScript}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-colors flex items-center gap-2 font-semibold"
                >
                  <Play className="w-4 h-4" />
                  Iniciar Guion
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
