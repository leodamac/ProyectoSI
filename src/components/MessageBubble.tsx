/**
 * Message Bubble Component with Typing Effect
 * Shows assistant messages with progressive typing animation
 */

'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Utensils } from 'lucide-react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { AIMessage, AIAction } from '@/context/AIAssistantContext';

interface MessageBubbleProps {
  message: AIMessage;
  isLatest: boolean;
  onExecuteAction?: (action: AIAction) => Promise<void>;
}

export default function MessageBubble({ message, isLatest, onExecuteAction }: MessageBubbleProps) {
  // Only apply typing effect to latest assistant message
  const shouldTypewrite = message.role === 'assistant' && isLatest;
  const displayedContent = useTypingEffect(
    message.content,
    shouldTypewrite ? 20 : 0 // 20ms per character for typing, 0 for instant
  );

  // Show full content immediately if not typing
  const content = shouldTypewrite ? displayedContent : message.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          message.role === 'user'
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">
          {content}
          {shouldTypewrite && content.length < message.content.length && (
            <span className="inline-block w-1 h-4 bg-gray-600 ml-0.5 animate-pulse" />
          )}
        </p>
        
        {/* Action button if present - only show when typing is complete */}
        {message.action && !message.action.executed && content.length === message.content.length && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.action.type === 'add_to_cart' && (
              <button
                onClick={() => message.action && onExecuteAction?.(message.action)}
                className="text-xs bg-white/90 hover:bg-white text-gray-800 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
              >
                <ShoppingCart className="w-3 h-3" />
                Agregar al carrito
              </button>
            )}
            {message.action.type === 'create_meal' && (
              <button
                onClick={() => message.action && onExecuteAction?.(message.action)}
                className="text-xs bg-white/90 hover:bg-white text-gray-800 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
              >
                <Utensils className="w-3 h-3" />
                Ver recetas
              </button>
            )}
            {message.action.type === 'navigate' && (
              <button
                onClick={() => message.action && onExecuteAction?.(message.action)}
                className="text-xs bg-white/90 hover:bg-white text-gray-800 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
              >
                <Utensils className="w-3 h-3" />
                Ir a página
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
