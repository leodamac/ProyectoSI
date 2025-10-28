'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, X, Crown, Calendar, User, MessageCircle, Zap, Sparkles, Clock } from 'lucide-react';
import { nutritionists } from '@/data/nutritionists';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ImprovedAIChatProps {
  onClose?: () => void;
  isFloating?: boolean;
}

// Message limits
const FREE_MESSAGE_LIMIT = 20;
const WARNING_THRESHOLD = 15;

// Scroll and textarea constants
const SCROLL_THRESHOLD = 50; // pixels from bottom to consider "at bottom"
const MAX_TEXTAREA_HEIGHT = 120; // pixels - matches CSS max-h-[120px]

// Suggested prompts that appear as clickable chips
const quickSuggestions = [
  { icon: "🍳", text: "Receta de desayuno keto rápida", category: "recetas" },
  { icon: "🛒", text: "¿Qué snacks keto me recomiendas?", category: "productos" },
  { icon: "⚖️", text: "Ayuda para bajar de peso", category: "peso" },
  { icon: "💪", text: "Mejorar rendimiento deportivo", category: "deporte" },
  { icon: "🍽️", text: "Plan de alimentación semanal", category: "plan" },
  { icon: "👨‍⚕️", text: "Consultar con nutricionista", category: "nutricionista" },
];

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

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export default function ImprovedAIChat({ onClose, isFloating = false }: ImprovedAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedNutritionist, setSelectedNutritionist] = useState<string | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [userHasScrolled, setUserHasScrolled] = useState(false);

  useEffect(() => {
    // Rotate placeholder text every 3 seconds
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % quickSuggestions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionConstructor = (window as typeof window & { 
        webkitSpeechRecognition: new () => ISpeechRecognition;
      }).webkitSpeechRecognition || (window as typeof window & { 
        SpeechRecognition: new () => ISpeechRecognition;
      }).SpeechRecognition;
      
      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'es-ES';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  useEffect(() => {
    // Auto-scroll only if user hasn't manually scrolled up
    if (!userHasScrolled) {
      scrollToBottom();
    }
  }, [messages, userHasScrolled]);

  // Handle scroll to detect when user scrolls up
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD;
      setUserHasScrolled(!isAtBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT) + 'px';
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Lo sentimos, tu navegador no soporta reconocimiento de voz. Por favor usa Chrome o Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const sendMessage = async (messageText: string) => {
    // Check message limit for free users
    if (!isPro && messageCount >= FREE_MESSAGE_LIMIT) {
      setShowProModal(true);
      return;
    }

    if (!messageText.trim()) return;

    // Hide suggestions after first message
    if (messages.length === 0) {
      setShowSuggestions(false);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setMessageCount(prev => prev + 1);
    setUserHasScrolled(false); // Reset scroll flag when sending new message

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim());

          for (const line of lines) {
            if (line.startsWith('0:')) {
              try {
                const text = JSON.parse(line.slice(2));
                assistantContent += text;
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage && lastMessage.role === 'assistant') {
                    lastMessage.content = assistantContent;
                  }
                  return newMessages;
                });
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, ocurrió un error. Por favor intenta de nuevo.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    // Auto-send after a short delay to show the text being set
    setTimeout(() => sendMessage(suggestion), 100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const openScheduleModal = (nutritionistId: string) => {
    if (!isPro) {
      setShowProModal(true);
      return;
    }
    setSelectedNutritionist(nutritionistId);
    setShowScheduleModal(true);
  };

  const recommendNutritionist = (messageContent: string) => {
    const lowerContent = messageContent.toLowerCase();
    
    if (lowerContent.includes('diabetes') || lowerContent.includes('glucosa')) {
      return nutritionists.find(n => n.id === 'n4');
    }
    if (lowerContent.includes('deporte') || lowerContent.includes('atleta') || lowerContent.includes('ejercicio') || lowerContent.includes('rendimiento')) {
      return nutritionists.find(n => n.id === 'n2');
    }
    if (lowerContent.includes('peso') || lowerContent.includes('adelgazar') || lowerContent.includes('bajar')) {
      return nutritionists.find(n => n.id === 'n3');
    }
    if (lowerContent.includes('nutricionista') || lowerContent.includes('doctor') || lowerContent.includes('especialista')) {
      return nutritionists.find(n => n.id === 'n1');
    }
    return null;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: isFloating ? 20 : 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: isFloating ? 20 : 0 }}
        className={`flex flex-col ${
          isFloating 
            ? 'h-[600px] w-full max-w-md' 
            : 'h-[calc(100vh-140px)] w-full max-w-4xl mx-auto'
        } bg-white rounded-2xl shadow-xl border border-gray-200`}
      >
        {/* Clean Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Asistente Keto AI</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Disponible 24/7</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isPro && (
              <button
                onClick={() => setShowProModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow-sm"
              >
                <Crown className="w-3 h-3" />
                Activar Pro
              </button>
            )}
            {isPro && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-sm">
                <Crown className="w-3 h-3" />
                Pro
              </span>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Messages - Clean Design */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        >
          {messages.length === 0 && (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hola! Soy tu asistente keto 🥑</h3>
              <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
                Puedo ayudarte con recetas, planes nutricionales y conectarte con especialistas
              </p>
            </div>
          )}
          
          {/* Clickable Suggestions - Show as placeholder chips */}
          {showSuggestions && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <p className="text-xs font-medium text-gray-500 text-center mb-3">Prueba preguntando:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickSuggestions.map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all text-left group"
                  >
                    <span className="text-2xl">{suggestion.icon}</span>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">{suggestion.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
          
          <AnimatePresence>
            {messages.map((message, index) => {
              const isUser = message.role === 'user';
              const recommendedNutritionist = !isUser ? recommendNutritionist(message.content) : null;
              const shouldShowRecommendation = recommendedNutritionist && 
                (message.content.toLowerCase().includes('nutricionista') || 
                 message.content.toLowerCase().includes('especialista') || 
                 message.content.toLowerCase().includes('doctor') ||
                 message.content.toLowerCase().includes('consulta') ||
                 (index >= 2 && messages.length > 3));
              
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col max-w-[85%]">
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        isUser
                          ? 'bg-emerald-500 text-white rounded-br-sm'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    
                    {/* Contextual nutritionist recommendation - Clean design */}
                    {shouldShowRecommendation && recommendedNutritionist && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-xl"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-3xl flex-shrink-0">{recommendedNutritionist.image}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-blue-900 mb-0.5">
                              {recommendedNutritionist.name}
                            </p>
                            <p className="text-xs text-blue-700 mb-2">
                              {recommendedNutritionist.specialty}
                            </p>
                            <button
                              onClick={() => openScheduleModal(recommendedNutritionist.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                            >
                              <Calendar className="w-3 h-3" />
                              Agendar consulta
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1.5">
                  <motion.div
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Clean & Professional */}
        <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
          {!isPro && messageCount >= WARNING_THRESHOLD && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between"
            >
              <span>
                <span className="font-semibold">{FREE_MESSAGE_LIMIT - messageCount} mensaje{(FREE_MESSAGE_LIMIT - messageCount) !== 1 ? 's' : ''}</span> restante{(FREE_MESSAGE_LIMIT - messageCount) !== 1 ? 's' : ''} en modo gratuito
              </span>
              <button 
                onClick={() => setShowProModal(true)} 
                className="font-semibold text-amber-700 hover:text-amber-800 underline"
              >
                Mejorar
              </button>
            </motion.div>
          )}
          
          <form onSubmit={handleFormSubmit} className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={quickSuggestions[placeholderIndex].text}
                className="w-full px-4 py-3 pr-11 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-colors resize-none overflow-hidden min-h-[48px] max-h-[120px]"
                disabled={isLoading || (!isPro && messageCount >= FREE_MESSAGE_LIMIT)}
                rows={1}
              />
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`absolute right-2.5 bottom-3 p-2 rounded-lg transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
                title={isListening ? 'Detener' : 'Usar voz'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading || (!isPro && messageCount >= FREE_MESSAGE_LIMIT)}
              className="px-5 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-semibold shadow-sm h-[48px]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>

      {/* Pro Upgrade Modal - Clean & Professional */}
      <AnimatePresence>
        {showProModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowProModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Keto Pro</h3>
                <p className="text-gray-600">Desbloquea todo el potencial de tu nutrición</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">Mensajes ilimitados</p>
                    <p className="text-xs text-gray-600">Chatea sin restricciones</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">Consultas con expertos</p>
                    <p className="text-xs text-gray-600">Agenda con nutricionistas certificados</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">Contenido exclusivo</p>
                    <p className="text-xs text-gray-600">Recetas y planes premium</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 text-center border border-gray-200">
                <p className="text-4xl font-bold text-gray-900 mb-1">$9.99<span className="text-lg font-normal text-gray-600">/mes</span></p>
                <p className="text-sm text-gray-600">Cancela cuando quieras • Sin compromiso</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowProModal(false)}
                  className="flex-1 px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Ahora no
                </button>
                <button
                  onClick={() => {
                    setShowProModal(false);
                    setShowPaymentModal(true);
                  }}
                  className="flex-1 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all font-semibold shadow-lg"
                >
                  Activar Pro
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal - Stripe-like Demo */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Método de pago</h3>
                <p className="text-sm text-gray-600">Selecciona cómo deseas pagar tu suscripción</p>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => {
                    alert('Redirigiendo a Stripe... (Modo Demo)\n\nEn producción, esto abriría el checkout de Stripe.');
                    setTimeout(() => {
                      setIsPro(true);
                      setMessageCount(0);
                      setShowPaymentModal(false);
                    }, 1000);
                  }}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-3 group"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">Stripe</p>
                    <p className="text-xs text-gray-600">Tarjeta de crédito o débito</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    alert('Procesando pago con PayPal... (Modo Demo)');
                    setTimeout(() => {
                      setIsPro(true);
                      setMessageCount(0);
                      setShowPaymentModal(false);
                    }, 1000);
                  }}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">PayPal</p>
                    <p className="text-xs text-gray-600">Cuenta PayPal</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    alert('Pago procesado con Google Pay! (Modo Demo)');
                    setTimeout(() => {
                      setIsPro(true);
                      setMessageCount(0);
                      setShowPaymentModal(false);
                    }, 1000);
                  }}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8" viewBox="0 0 48 19" fill="none">
                      <path d="M24.6 8.9h3.7v9.3h-3.7V8.9z" fill="#5F6368"/>
                      <path d="M39.6 11.5c0 2.8-2.1 4.8-4.7 4.8s-4.7-2-4.7-4.8 2.1-4.8 4.7-4.8 4.7 2 4.7 4.8zm-3.5 0c0-1.5-.9-2.4-2-2.4s-2 .9-2 2.4.9 2.4 2 2.4 2-.9 2-2.4z" fill="#5F6368"/>
                      <path d="M47.5 11.5c0 2.8-2.1 4.8-4.7 4.8s-4.7-2-4.7-4.8 2.1-4.8 4.7-4.8 4.7 2 4.7 4.8zm-3.5 0c0-1.5-.9-2.4-2-2.4s-2 .9-2 2.4.9 2.4 2 2.4 2-.9 2-2.4z" fill="#5F6368"/>
                      <path d="M15.3 8.1c-2.2 0-4 1.9-4 4.4s1.8 4.4 4 4.4c1.2 0 2.2-.5 2.8-1.3v1.1c0 1.7-.9 2.6-2.3 2.6-1.2 0-1.9-.8-2.2-1.5l-3.2 1.3c.9 2.2 3.3 3.9 5.4 3.9 3.1 0 5.8-1.8 5.8-6.2V7h-3.4v1.3c-.6-.8-1.6-1.2-2.9-1.2zm.3 3.5c-1.1 0-2 .9-2 2.4s.9 2.4 2 2.4 2-.9 2-2.4-.9-2.4-2-2.4z" fill="#5F6368"/>
                      <path d="M2.5 8.1c-2.6 0-4.7 2-4.7 4.8s2.1 4.8 4.7 4.8c1.8 0 2.9-.9 3.6-1.7l-2.8-1.9c-.4.6-1 .9-1.8.9-1 0-1.7-.5-2.1-1.3L7.7 11c-.7-1.8-2.7-2.9-5.2-2.9zm.2 3.5c-.8 0-1.6.4-1.8 1.2l-2.4 1 2.4 1c.2.8 1 1.2 1.8 1.2s1.6-.4 1.8-1.2l2.4-1-2.4-1c-.2-.8-1-1.2-1.8-1.2z" fill="#5F6368"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">Google Pay</p>
                    <p className="text-xs text-gray-600">Pago rápido y seguro</p>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                <span>Pagos seguros y encriptados</span>
              </div>

              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full px-5 py-2.5 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Cancelar
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                * Modo demo - Pagos simulados para pruebas
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Appointment Modal */}
      <AnimatePresence>
        {showScheduleModal && selectedNutritionist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Agendar Consulta</h3>
              
              {(() => {
                const nutritionist = nutritionists.find(n => n.id === selectedNutritionist);
                if (!nutritionist) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="text-5xl">{nutritionist.image}</div>
                      <div>
                        <p className="font-bold text-gray-900">{nutritionist.name}</p>
                        <p className="text-sm text-gray-600">{nutritionist.specialty}</p>
                        <p className="text-xs text-emerald-600 font-semibold mt-1">
                          ${nutritionist.price} USD / sesión
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Fecha y hora
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Motivo de consulta
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none bg-gray-50 focus:bg-white transition-colors"
                        rows={4}
                        placeholder="Describe brevemente el motivo de tu consulta y tus objetivos..."
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowScheduleModal(false)}
                        className="flex-1 px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          alert(`¡Cita agendada con ${nutritionist.name}! (Demo)\n\nRecibirás un email de confirmación.`);
                          setShowScheduleModal(false);
                        }}
                        className="flex-1 px-5 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold shadow-lg"
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
