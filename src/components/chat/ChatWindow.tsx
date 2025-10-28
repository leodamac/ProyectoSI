'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from '@/context/ChatContext';
import { useAutoScroll } from '@/hooks/useAutoScroll';

export function ChatWindow() {
  const { messages, isLoading } = useChatContext();
  const { scrollRef, scrollToBottom } = useAutoScroll<HTMLDivElement>([
    messages.length,
    isLoading,
  ]);

  // Scroll to bottom on initial mount
  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {messages.length === 0 && (
        <div className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-4 shadow-lg"
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¡Hola! Soy tu asistente keto 🥑
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Puedo ayudarte con recetas, consejos nutricionales y conectarte con
            especialistas. ¿En qué puedo ayudarte hoy?
          </p>
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          const isLastMessage = index === messages.length - 1;

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                  isUser
                    ? 'bg-emerald-500 text-white rounded-br-md'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                  {isLastMessage &&
                    message.role === 'assistant' &&
                    isLoading &&
                    !message.content && (
                      <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-pulse rounded" />
                    )}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    isUser ? 'text-emerald-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {isLoading && messages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
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
    </div>
  );
}
