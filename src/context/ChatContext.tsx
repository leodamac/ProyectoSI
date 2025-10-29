'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ChatContextType {
  interimTranscript: string;
  setInterimTranscript: (transcript: string) => void;
  analyserNode: AnalyserNode | null;
  setAnalyserNode: (node: AnalyserNode | null) => void;
  audioContext: AudioContext | null;
  setAudioContext: (context: AudioContext | null) => void;
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { simulateStreamingResponse } from '@/utils/simulateResponses';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [interimTranscript, setInterimTranscript] = useState('');
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const handleSetAnalyserNode = useCallback((node: AnalyserNode | null) => {
    setAnalyserNode(node);
  }, []);

  const handleSetAudioContext = useCallback((context: AudioContext | null) => {
    setAudioContext(context);
  }, []);

  const value: ChatContextType = {
    interimTranscript,
    setInterimTranscript,
    analyserNode,
    setAnalyserNode: handleSetAnalyserNode,
    audioContext,
    setAudioContext: handleSetAudioContext,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
}

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Create assistant message placeholder
      const assistantId = `assistant-${Date.now()}`;
      const assistantMessage: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Simulate streaming response
      let accumulatedContent = '';
      
      for await (const chunk of simulateStreamingResponse(content)) {
        accumulatedContent += chunk;
        
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          
          if (lastMessage && lastMessage.id === assistantId) {
            lastMessage.content = accumulatedContent;
          }
          
          return updated;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Lo siento, ocurrió un error. Por favor intenta de nuevo.',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
