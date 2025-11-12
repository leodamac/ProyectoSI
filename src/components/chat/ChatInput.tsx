'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { useChatContext } from '@/context/ChatContext';
import { VoiceController } from './VoiceController';

export function ChatInput() {
  const { sendMessage, isLoading } = useChatContext();
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Set height based on scrollHeight, with min and max limits
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 56), 240);
    textarea.style.height = `${newHeight}px`;
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim() || isLoading) return;

    sendMessage(input);
    setInput('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    // Shift+Enter creates a new line (default behavior)
  };

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript);
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje... (Shift+Enter para nueva línea)"
            className="w-full px-4 py-3 pr-14 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-600 bg-gray-50 focus:bg-white disabled:bg-gray-100 disabled:text-gray-700 disabled:placeholder:text-gray-500 transition-colors resize-none overflow-hidden"
            disabled={isLoading}
            rows={1}
            style={{ minHeight: '56px', maxHeight: '240px' }}
          />
          
          {/* Voice input button inside textarea */}
          <div className="absolute right-2 bottom-2">
            <VoiceController onTranscript={handleVoiceInput} />
          </div>
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-5 py-3.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-semibold shadow-sm"
          aria-label="Enviar mensaje"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        Presiona <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> para enviar, 
        <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs ml-1">Shift + Enter</kbd> para nueva línea
      </p>
    </div>
  );
}
