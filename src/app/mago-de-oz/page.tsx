/**
 * Mago de Oz - Script Management Page
 * Página de configuración para gestionar y cargar guiones de demostración
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Play, 
  Trash2, 
  Download, 
  AlertCircle, 
  CheckCircle2,
  Eye,
  HelpCircle,
  Code,
  Eraser
} from 'lucide-react';
import { ConversationScript } from '@/types';
import { availableScripts } from '@/data/scripts';
import { getScriptEngine } from '@/lib/scriptEngine';
import { useAIAssistant } from '@/context/AIAssistantContext';

export default function MagoDeOzPage() {
  const [uploadedScripts, setUploadedScripts] = useState<ConversationScript[]>([]);
  const [selectedScript, setSelectedScript] = useState<ConversationScript | null>(null);
  const [activeScriptId, setActiveScriptId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scriptEngine = getScriptEngine();
  const { clearMessages } = useAIAssistant();

  // Load saved scripts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mago-de-oz-scripts');
    if (saved) {
      try {
        const scripts = JSON.parse(saved);
        setUploadedScripts(scripts);
      } catch (e) {
        console.error('Error loading saved scripts:', e);
      }
    }
  }, []);

  // Save scripts to localStorage whenever they change
  useEffect(() => {
    if (uploadedScripts.length > 0) {
      localStorage.setItem('mago-de-oz-scripts', JSON.stringify(uploadedScripts));
    }
  }, [uploadedScripts]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadSuccess(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const scriptData = JSON.parse(e.target?.result as string);
        
        // Validate script structure
        if (!scriptData.id || !scriptData.name || !scriptData.steps) {
          setUploadError('Formato de script inválido. Debe incluir: id, name, y steps.');
          return;
        }

        // Check if script with same ID already exists
        const exists = [...availableScripts, ...uploadedScripts].some(s => s.id === scriptData.id);
        if (exists) {
          setUploadError(`Ya existe un script con el ID "${scriptData.id}". Usa un ID único.`);
          return;
        }

        // Add to uploaded scripts
        setUploadedScripts(prev => [...prev, scriptData]);
        setUploadSuccess(`Script "${scriptData.name}" cargado exitosamente!`);
        
        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        setUploadError('Error al leer el archivo. Asegúrate de que sea un JSON válido.');
        console.error('Error parsing script:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleActivateScript = (script: ConversationScript) => {
    scriptEngine.loadScript(script);
    setActiveScriptId(script.id);
    setUploadSuccess(`Script "${script.name}" activado! Abre el asistente flotante para probarlo.`);
  };

  const handleDeleteScript = (scriptId: string) => {
    setUploadedScripts(prev => prev.filter(s => s.id !== scriptId));
    if (activeScriptId === scriptId) {
      scriptEngine.unloadScript();
      setActiveScriptId(null);
    }
  };

  const handleClearMessages = () => {
    clearMessages();
    setUploadSuccess('Historial de chat limpiado! Puedes iniciar una nueva conversación desde cero.');
  };

  const handleDownloadTemplate = () => {
    const template: ConversationScript = {
      id: 'mi-script-ejemplo',
      name: 'Mi Script de Ejemplo',
      description: 'Descripción de lo que hace este script',
      userProfile: {
        type: 'beginner',
        name: 'Usuario Ejemplo',
        goals: ['objetivo 1', 'objetivo 2'],
        restrictions: [],
        background: 'Contexto del usuario',
      },
      steps: [
        {
          id: 'step-1',
          order: 1,
          userInput: 'Hola',
          assistantResponse: '¡Hola! Bienvenido. ¿En qué puedo ayudarte?',
          audioFile: '/audio/greeting.mp3', // Opcional: URL del archivo de audio
          nextStepId: 'step-2',
        },
        {
          id: 'step-2',
          order: 2,
          userInput: 'Quiero información',
          assistantResponse: 'Claro, aquí está la información...',
          variants: [
            {
              pattern: '(info|información|ayuda)',
              response: 'Por supuesto, te ayudo con eso...',
              audioFile: '/audio/help-response.mp3', // Audio para esta variante
            },
          ],
        },
      ],
      metadata: {
        estimatedDuration: 5,
        difficulty: 'easy',
        tags: ['ejemplo', 'plantilla'],
        author: 'Tu Nombre',
        createdAt: new Date(),
      },
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla-script.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const allScripts = [...availableScripts, ...uploadedScripts];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mago de Oz</h1>
              <p className="text-gray-600">Sistema de Gestión de Guiones de Demostración</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">¿Qué es el Mago de Oz?</p>
                <p className="mb-2">
                  Este sistema te permite simular conversaciones reales con el asistente de IA 
                  para demostraciones. Los scripts se ejecutan de forma invisible - el usuario 
                  no sabe que está siguiendo un guion preparado.
                </p>
                <p className="text-xs">
                  <strong>✨ Nuevo:</strong> Ahora puedes especificar archivos de audio personalizados para cada 
                  respuesta del script. Agrega el campo <code className="bg-blue-100 px-1 rounded">audioFile</code> 
                  con la URL del audio en tu JSON.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-red-800">{uploadError}</p>
              <button
                onClick={() => setUploadError(null)}
                className="text-xs text-red-600 hover:text-red-700 mt-1"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        )}

        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-green-800">{uploadSuccess}</p>
              <button
                onClick={() => setUploadSuccess(null)}
                className="text-xs text-green-600 hover:text-green-700 mt-1"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Actions */}
          <div className="md:col-span-1 space-y-6">
            {/* Upload Script */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Subir Script
              </h2>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="script-upload"
              />
              
              <label
                htmlFor="script-upload"
                className="block w-full cursor-pointer"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-500 transition-colors text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="text-purple-600 font-semibold">Click para subir</span> o arrastra
                  </p>
                  <p className="text-xs text-gray-500">Archivos JSON únicamente</p>
                </div>
              </label>

              <button
                onClick={handleDownloadTemplate}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700"
              >
                <Download className="w-4 h-4" />
                Descargar Plantilla
              </button>

              <button
                onClick={handleClearMessages}
                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors text-sm font-medium text-red-700"
              >
                <Eraser className="w-4 h-4" />
                Limpiar Historial de Chat
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Documentación</h2>
              <div className="space-y-2">
                <a
                  href="/MAGO_DE_OZ_README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-sm text-purple-700 font-medium"
                >
                  📖 Guía Completa en Español
                </a>
                <a
                  href="/SCRIPT_QUICK_START.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm text-blue-700 font-medium"
                >
                  🚀 Quick Start (English)
                </a>
                <a
                  href="/SCRIPT_SYSTEM_IMPLEMENTATION.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700 font-medium"
                >
                  🔧 Documentación Técnica
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Scripts List */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Scripts Disponibles</h2>

              <div className="space-y-3">
                {allScripts.map((script) => {
                  const isActive = activeScriptId === script.id;
                  const isUploaded = uploadedScripts.some(s => s.id === script.id);

                  return (
                    <div
                      key={script.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isActive
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-gray-50 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">{script.name}</h3>
                            {isActive && (
                              <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                Activo
                              </span>
                            )}
                            {isUploaded && (
                              <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                                Personalizado
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{script.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>👤 {script.userProfile.name}</span>
                            <span>📝 {script.steps.length} pasos</span>
                            <span>⏱️ ~{script.metadata?.estimatedDuration || 10} min</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => setSelectedScript(script)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          {!isActive && (
                            <button
                              onClick={() => handleActivateScript(script)}
                              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                              title="Activar script"
                            >
                              <Play className="w-4 h-4 text-purple-600" />
                            </button>
                          )}
                          {isUploaded && (
                            <button
                              onClick={() => handleDeleteScript(script.id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              title="Eliminar script"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {allScripts.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No hay scripts disponibles</p>
                    <p className="text-sm">Sube un script para comenzar</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Script Details Modal */}
        {selectedScript && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedScript(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4">
                <h3 className="text-xl font-bold text-white">{selectedScript.name}</h3>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
                    <p className="text-gray-600">{selectedScript.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Perfil del Usuario</h4>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
                      <p><strong>Nombre:</strong> {selectedScript.userProfile.name}</p>
                      <p><strong>Tipo:</strong> {selectedScript.userProfile.type}</p>
                      {selectedScript.userProfile.goals && (
                        <p><strong>Objetivos:</strong> {selectedScript.userProfile.goals.join(', ')}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pasos del Script</h4>
                    <div className="space-y-2">
                      {selectedScript.steps.map((step, idx) => (
                        <div key={step.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                          <p className="font-semibold text-gray-900 mb-1">
                            Paso {idx + 1}: {step.userInput || 'Respuesta libre'}
                          </p>
                          <p className="text-gray-600 text-xs line-clamp-2">
                            {step.assistantResponse.slice(0, 150)}...
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
                <button
                  onClick={() => setSelectedScript(null)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-gray-700 font-medium"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
