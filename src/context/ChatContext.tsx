'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ChatContextType {
  interimTranscript: string;
  setInterimTranscript: (transcript: string) => void;
  analyserNode: AnalyserNode | null;
  setAnalyserNode: (node: AnalyserNode | null) => void;
  audioContext: AudioContext | null;
  setAudioContext: (context: AudioContext | null) => void;
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
