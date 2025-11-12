'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Minus, Send, Sparkles, ShoppingCart, Calendar, BookOpen, ChefHat, Info, Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { useAIAssistant } from '@/context/AIAssistantContext';
import { usePathname } from 'next/navigation';
import { useVoiceMode } from '@/hooks/useVoiceMode';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import InteractionModeModal from '@/components/chat/InteractionModeModal';
import CompactVoiceVisualizer from '@/components/chat/CompactVoiceVisualizer';
import MessageBubble from '@/components/MessageBubble';
import { beginnerKetoScript } from '@/data/scripts';
import { getScriptEngine } from '@/lib/scriptEngine';

const MAX_TEXTAREA_HEIGHT = 100; // Maximum height for auto-resizing textarea in pixels

export default function FloatingAIAssistant() {
  const {
    messages,
    isOpen,
    isMinimized,
    isLoading,
    openAssistant,
    closeAssistant,
    toggleMinimize,
    sendMessage,
    executeAction,
  } = useAIAssistant();

  const pathname = usePathname();
  
  // Hide floating assistant on chat page to avoid duplication
  const shouldHide = pathname === '/chat-ia';

  const [input, setInput] = useState('');
  const [showModeModal, setShowModeModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Script system state
  const scriptEngine = useRef(getScriptEngine());
  const [scriptInitialized, setScriptInitialized] = useState(false);

  // Voice mode integration
  const {
    mode,
    setMode,
    shouldPlayAudio,
    playResponse,
    stopAudio,
    isAudioPlaying,
  } = useVoiceMode('text-text');

  const { listening, startRecognition, stopRecognition, isSupported: sttSupported } =
    useSpeechToText((transcript, isFinal) => {
      // Interrupt audio playback when user starts speaking
      if (isAudioPlaying) {
        stopAudio();
      }
      
      if (isFinal) {
        handleSendVoice(transcript);
      }
    });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-play audio when new assistant messages arrive
  useEffect(() => {
    const playLastAssistantMessage = async () => {
      if (messages.length === 0) return;
      
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant' && shouldPlayAudio(true)) {
        // Check if script engine has an audio file for this message
        const engine = scriptEngine.current;
        const currentStep = engine.getCurrentStep();
        const audioFile = currentStep?.audioFile;
        
        await playResponse(lastMessage.content, audioFile);
      }
    };

    if (!isLoading) {
      playLastAssistantMessage();
    }
  }, [messages, isLoading, shouldPlayAudio, playResponse]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT);
    textarea.style.height = newHeight + 'px';
  }, [input]);

  // Auto-initialize script when assistant opens
  useEffect(() => {
    if (isOpen && !scriptInitialized && messages.length === 0) {
      // Load the beginner script automatically
      scriptEngine.current.loadScript(beginnerKetoScript);
      setScriptInitialized(true);
      
      // Auto-send first message after a short delay
      setTimeout(() => {
        handleSendVoice('Hola');
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, scriptInitialized, messages.length]);

  // Auto-start listening when switching to voice mode
  useEffect(() => {
    if (isOpen && (mode === 'voice-voice' || mode === 'voice-text') && !listening && sttSupported) {
      // Start listening automatically after a short delay
      const timer = setTimeout(() => {
        startRecognition();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [mode, isOpen, listening, sttSupported, startRecognition]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  const handleSendVoice = useCallback(async (transcript: string) => {
    if (!transcript.trim() || isLoading) return;
    await sendMessage(transcript);
  }, [isLoading, sendMessage]);

  const handleVoiceToggle = async () => {
    if (listening) {
      stopRecognition();
    } else {
      await startRecognition();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick action buttons
  const quickActions = [
    { icon: ShoppingCart, label: 'Ver Productos', action: () => sendMessage('Muéstrame los productos disponibles') },
    { icon: Calendar, label: 'Agendar Cita', action: () => sendMessage('Quiero agendar una cita con un nutricionista') },
    { icon: BookOpen, label: 'Ver Foro', action: () => sendMessage('Llévame al foro') },
    { icon: ChefHat, label: 'Recetas', action: () => sendMessage('Dame recetas keto') },
  ];

  // Don't render on chat page
  if (shouldHide) {
    return null;
  }

  // In voice-voice mode, use compact visualizer (both mobile and desktop)
  if (isOpen && mode === 'voice-voice') {
    return (
      <>
        <InteractionModeModal
          isOpen={showModeModal}
          currentMode={mode}
          onClose={() => setShowModeModal(false)}
          onModeChange={setMode}
        />
        <CompactVoiceVisualizer
          listening={listening}
          isAudioPlaying={isAudioPlaying}
          messages={messages.map(m => ({ role: m.role, content: m.content }))}
          onClose={closeAssistant}
          onToggleListening={handleVoiceToggle}
          onStopAudio={stopAudio}
          alwaysShow={true}
        />
      </>
    );
  }

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openAssistant}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[45] bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Abrir asistente de IA"
      >
        <MessageCircle className="w-6 h-6" />
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {/* Interaction Mode Modal */}
      <InteractionModeModal
        isOpen={showModeModal}
        currentMode={mode}
        onClose={() => setShowModeModal(false)}
        onModeChange={setMode}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-[45] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col ${
          isMinimized ? 'sm:w-80 h-16' : 'sm:w-96 h-[500px] sm:h-[600px]'
        } transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold">Asistente Keto</h3>
          </div>
          <div className="flex items-center gap-2">
            {/* Mode Settings Button */}
            {!isMinimized && (
              <button
                onClick={() => setShowModeModal(true)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
                aria-label="Configurar modo de interacción"
                title="Cambiar modo (Voz/Texto)"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={toggleMinimize}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              aria-label={isMinimized ? 'Maximizar' : 'Minimizar'}
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={closeAssistant}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                  <p className="text-sm font-medium">¡Hola! Soy tu asistente Keto.</p>
                  <p className="text-xs mt-2 text-gray-500">Pregúntame sobre productos, recetas,<br />citas o cualquier cosa keto.</p>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2 mt-6">
                    {quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={action.action}
                        className="flex flex-col items-center gap-1 p-3 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 border border-gray-200 rounded-lg transition-colors text-xs"
                      >
                        <action.icon className="w-5 h-5 text-emerald-600" />
                        <span className="text-gray-700">{action.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 p-3 bg-blue-50 rounded-lg text-left">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-800">
                        Puedo ayudarte a agregar productos al carrito, buscar recetas, agendar citas y navegar por toda la plataforma.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isLatest={index === messages.length - 1}
                  onExecuteAction={executeAction}
                />
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-2xl">
              {/* Voice Visualizer (when listening) - More compact */}
              {listening && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-2 p-2 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-red-500 rounded-full"
                            animate={{ height: ['8px', '16px', '8px'] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-red-700">Escuchando...</span>
                    </div>
                    <button
                      onClick={stopRecognition}
                      className="text-xs text-red-700 hover:text-red-900 font-medium"
                    >
                      Detener
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Audio Playing Indicator - More compact */}
              {isAudioPlaying && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-blue-600 animate-pulse" />
                      <span className="text-xs font-medium text-blue-700">Reproduciendo...</span>
                    </div>
                    <button
                      onClick={stopAudio}
                      className="p-1 hover:bg-blue-100 rounded"
                      aria-label="Detener audio"
                    >
                      <VolumeX className="w-3 h-3 text-blue-600" />
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-2 items-end">
                {/* Voice Input Button (for voice modes) */}
                {(mode === 'voice-voice' || mode === 'voice-text') && (
                  <button
                    type="button"
                    onClick={handleVoiceToggle}
                    className={`p-3 rounded-lg transition-all ${
                      listening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                    }`}
                    disabled={!sttSupported}
                    aria-label={listening ? 'Detener grabación' : 'Activar voz'}
                  >
                    {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                )}

                {/* Text Input (for text modes or hybrid) */}
                {(mode === 'text-text' || mode === 'text-voice' || mode === 'voice-text') && (
                  <>
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                      style={{ maxHeight: `${MAX_TEXTAREA_HEIGHT}px` }}
                      rows={1}
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg px-4 py-2 hover:from-emerald-600 hover:to-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      aria-label="Enviar mensaje"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Voice-only mode (no text input) */}
                {mode === 'voice-voice' && (
                  <p className="flex-1 text-center text-sm text-gray-500 py-2" role="status" aria-live="polite">
                    Usa el botón de micrófono para hablar
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
