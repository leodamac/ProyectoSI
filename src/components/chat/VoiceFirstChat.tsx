/**
 * Voice-First Enhanced Chat Component
 * Supports multiple interaction modes with intelligent triggers
 */

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Volume2, VolumeX, Eye, EyeOff, Sparkles, HelpCircle, X, CheckCircle2 } from 'lucide-react';
import { useVoiceMode } from '@/hooks/useVoiceMode';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import ContextualCards, { LocationRequestCard } from './ContextualCards';
import { simulateEnhancedStreamingResponse, SimulationTrigger } from '@/utils/enhancedSimulation';
import { Nutritionist } from '@/types';
import InteractionModeModal from './InteractionModeModal';
import ModeIndicator from './ModeIndicator';

interface ProductCard {
  id: string;
  name: string;
  description: string;
  price: number;
  nutritionInfo: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  category: string;
}

interface ForumPostCard {
  id: string;
  title: string;
  username: string;
  aiSummary?: string;
  upvotes: number;
  commentCount: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  trigger?: SimulationTrigger;
}

export default function VoiceFirstChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModeModal, setShowModeModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showHistoryFull, setShowHistoryFull] = useState(false);
  const [pendingLocationRequest, setPendingLocationRequest] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | undefined>();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    mode,
    setMode,
    config,
    shouldPlayAudio,
    playResponse,
    stopAudio,
    isAudioPlaying,
  } = useVoiceMode('text-text');

  const { listening, startRecognition, stopRecognition, isSupported: sttSupported } =
    useSpeechToText((transcript, isFinal) => {
      if (isFinal) {
        sendMessage(transcript);
      }
    });

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 120);
    textarea.style.height = newHeight + 'px';
  }, [input]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(m => ({ role: m.role, content: m.content }));
      
      const assistantId = `assistant-${Date.now()}`;
      const assistantMessage: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      let fullText = '';
      let trigger: SimulationTrigger | undefined;
      let shouldRequestLocation = false;

      for await (const chunk of simulateEnhancedStreamingResponse(
        messageText,
        conversationHistory,
        userLocation
      )) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => {
            const updated = [...prev];
            const lastMsg = updated[updated.length - 1];
            if (lastMsg && lastMsg.id === assistantId) {
              lastMsg.content = fullText;
            }
            return updated;
          });
        }

        if (chunk.trigger) {
          trigger = chunk.trigger;
        }

        if (chunk.shouldRequestLocation) {
          shouldRequestLocation = true;
        }
      }

      // Update with trigger data
      setMessages(prev => {
        const updated = [...prev];
        const lastMsg = updated[updated.length - 1];
        if (lastMsg && lastMsg.id === assistantId) {
          lastMsg.trigger = trigger;
        }
        return updated;
      });

      // Show location request if needed
      if (shouldRequestLocation) {
        setPendingLocationRequest(true);
      }

      // Play audio if in voice mode
      if (shouldPlayAudio(true) && fullText) {
        await playResponse(fullText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Lo siento, ocurrió un error. Por favor intenta de nuevo.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = async () => {
    if (listening) {
      stopRecognition();
    } else {
      await startRecognition();
    }
  };

  const handleLocationAccept = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setPendingLocationRequest(false);
          
          // Update the last assistant message with location-based response
          if (messages.length > 0) {
            const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
            if (lastUserMessage) {
              setIsLoading(true);
              
              try {
                const conversationHistory = messages.map(m => ({ role: m.role, content: m.content }));
                const assistantId = `assistant-location-${Date.now()}`;
                const assistantMessage: Message = {
                  id: assistantId,
                  role: 'assistant',
                  content: '',
                  timestamp: new Date(),
                };

                setMessages(prev => [...prev, assistantMessage]);

                let fullText = '';
                let trigger: SimulationTrigger | undefined;

                for await (const chunk of simulateEnhancedStreamingResponse(
                  lastUserMessage.content,
                  conversationHistory,
                  { latitude: position.coords.latitude, longitude: position.coords.longitude }
                )) {
                  if (chunk.text) {
                    fullText += chunk.text;
                    setMessages(prev => {
                      const updated = [...prev];
                      const lastMsg = updated[updated.length - 1];
                      if (lastMsg && lastMsg.id === assistantId) {
                        lastMsg.content = fullText;
                      }
                      return updated;
                    });
                  }

                  if (chunk.trigger) {
                    trigger = chunk.trigger;
                  }
                }

                // Update with trigger data
                setMessages(prev => {
                  const updated = [...prev];
                  const lastMsg = updated[updated.length - 1];
                  if (lastMsg && lastMsg.id === assistantId) {
                    lastMsg.trigger = trigger;
                  }
                  return updated;
                });

                // Play audio if in voice mode
                if (shouldPlayAudio(true) && fullText) {
                  await playResponse(fullText);
                }
              } catch (error) {
                console.error('Error processing location:', error);
              } finally {
                setIsLoading(false);
              }
            }
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setPendingLocationRequest(false);
        }
      );
    }
  };

  const handleLocationDecline = () => {
    setPendingLocationRequest(false);
  };

  const handleCardAction = (action: string, data: unknown) => {
    console.log('Card action:', action, data);
    // Implement actions like adding to cart, scheduling, viewing posts
  };

  // Get visible messages based on mode
  const visibleMessages = showHistoryFull
    ? messages
    : messages.slice(-config.maxVisibleMessages);

  const hiddenCount = messages.length - visibleMessages.length;

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-xl border border-gray-200">
      {/* Interaction Mode Modal */}
      <InteractionModeModal
        isOpen={showModeModal}
        currentMode={mode}
        onClose={() => setShowModeModal(false)}
        onModeChange={setMode}
      />

      {/* Help Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowHelpModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">¿Qué puedo hacer?</h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Capacidades del Asistente</h4>
                  <ul className="space-y-2.5 text-sm text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Crear recetas keto personalizadas según tus preferencias</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Recomendar productos de la tienda y agregar al carrito</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Responder dudas sobre dieta keto y cetosis</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Sugerir planes de alimentación semanales</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Conectarte con nutricionistas certificados</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Navegar por todas las secciones de la plataforma</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Modos de Interacción</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Puedes interactuar usando voz o texto. Haz clic en el indicador de modo en la esquina superior derecha para cambiar.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      <div className="font-semibold text-emerald-900">Texto → Texto</div>
                      <div className="text-emerald-700 mt-1">Escribe y lee respuestas</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-900">Voz → Voz</div>
                      <div className="text-purple-700 mt-1">Habla y escucha</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Ejemplos de Preguntas</h4>
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <p>• &quot;Dame recetas keto para desayuno&quot;</p>
                    <p>• &quot;Agrega brownies keto al carrito&quot;</p>
                    <p>• &quot;Quiero agendar una cita con un nutricionista&quot;</p>
                    <p>• &quot;¿Cuántos carbohidratos puedo comer al día?&quot;</p>
                    <p>• &quot;Muéstrame productos sin gluten&quot;</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Mode Indicator */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Asistente Keto IA</h3>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              <span>Disponible 24/7</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Help Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Ver ayuda"
          >
            <HelpCircle className="w-5 h-5 text-white" />
          </button>

          {/* Mode Indicator */}
          <ModeIndicator mode={mode} onClick={() => setShowModeModal(true)} />
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-0"
      >
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">¡Hola! Soy tu asistente keto 🥑</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">
              Puedo ayudarte con recetas, productos, nutricionistas y más.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Mic className="w-4 h-4" />
              <span>Prueba hablar o escribir</span>
            </div>
          </div>
        )}

        {/* Show history toggle if there are hidden messages */}
        {hiddenCount > 0 && !showHistoryFull && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowHistoryFull(true)}
            className="w-full py-2 text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center justify-center gap-1 bg-emerald-50 rounded-lg"
          >
            <Eye className="w-3 h-3" />
            Ver {hiddenCount} mensajes anteriores
          </motion.button>
        )}

        {showHistoryFull && hiddenCount > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowHistoryFull(false)}
            className="w-full py-2 text-xs text-gray-600 hover:text-gray-700 font-medium flex items-center justify-center gap-1 bg-gray-100 rounded-lg"
          >
            <EyeOff className="w-3 h-3" />
            Ocultar historial
          </motion.button>
        )}

        {/* Messages */}
        <AnimatePresence>
          {visibleMessages.map((message) => {
            const isUser = message.role === 'user';
            
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'} flex-col gap-2`}
              >
                <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                      isUser
                        ? 'bg-emerald-500 text-white rounded-br-sm'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${isUser ? 'text-emerald-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Contextual Cards */}
                <>
                  {message.trigger && message.trigger.data && (() => {
                    const { type, data } = message.trigger;
                    if (type === 'product') {
                      return (
                        <div className="ml-2">
                          <ContextualCards
                            type="product"
                            data={data as ProductCard[]}
                            onAction={handleCardAction}
                          />
                        </div>
                      );
                    }
                    if (type === 'nutritionist') {
                      return (
                        <div className="ml-2">
                          <ContextualCards
                            type="nutritionist"
                            data={data as Nutritionist}
                            onAction={handleCardAction}
                          />
                        </div>
                      );
                    }
                    if (type === 'forum') {
                      return (
                        <div className="ml-2">
                          <ContextualCards
                            type="forum"
                            data={data as ForumPostCard[]}
                            onAction={handleCardAction}
                          />
                        </div>
                      );
                    }
                    return null;
                  })()}
                </>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Location Request Card */}
        {pendingLocationRequest && (
          <LocationRequestCard
            onAccept={handleLocationAccept}
            onDecline={handleLocationDecline}
          />
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200 rounded-b-2xl">
        {/* Voice Visualizer (when in voice modes) */}
        {(mode === 'voice-voice' || mode === 'voice-text') && listening && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-red-500 rounded-full"
                    animate={{ height: ['12px', '24px', '12px'] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-red-700">Escuchando...</span>
            </div>
          </div>
        )}

        {/* Audio Playing Indicator */}
        {isAudioPlaying && (
          <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-sm font-medium text-blue-700">Reproduciendo respuesta...</span>
              <button
                onClick={stopAudio}
                className="ml-auto p-1 hover:bg-blue-100 rounded"
              >
                <VolumeX className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2 items-end"
        >
          {/* Voice Input Button (for voice modes) */}
          {(mode === 'voice-voice' || mode === 'voice-text') && (
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`p-3 rounded-xl transition-all ${
                listening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
              disabled={!sttSupported}
            >
              {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          )}

          {/* Text Input (for text modes) */}
          {(mode === 'text-text' || mode === 'text-voice' || mode === 'voice-text') && (
            <>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Escribe tu mensaje..."
                aria-label="Escribe tu mensaje"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-colors resize-none overflow-y-auto min-h-[48px] max-h-[120px]"
                disabled={isLoading}
                rows={1}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
