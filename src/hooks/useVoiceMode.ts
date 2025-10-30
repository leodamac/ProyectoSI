/**
 * Voice Mode Hook - Manages voice-first interaction modes
 * Supports: voice-only (Alexa-style), voice-to-text, text-to-voice, text-only
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AudioManager, AudioConfig } from '@/lib/audioProvider';

export type InteractionMode = 'voice-voice' | 'voice-text' | 'text-voice' | 'text-text';

export interface VoiceModeConfig {
  mode: InteractionMode;
  autoPlayResponses: boolean;
  showChatHistory: boolean;
  maxVisibleMessages: number;
}

export interface UseVoiceModeResult {
  mode: InteractionMode;
  setMode: (mode: InteractionMode) => void;
  config: VoiceModeConfig;
  updateConfig: (updates: Partial<VoiceModeConfig>) => void;
  shouldPlayAudio: (isAssistantMessage: boolean) => boolean;
  shouldShowMessage: (isAssistantMessage: boolean) => boolean;
  audioManager: AudioManager;
  playResponse: (text: string, audioSource?: string) => Promise<void>;
  stopAudio: () => void;
  isAudioPlaying: boolean;
}

export function useVoiceMode(initialMode: InteractionMode = 'text-text'): UseVoiceModeResult {
  const [mode, setMode] = useState<InteractionMode>(initialMode);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const [config, setConfig] = useState<VoiceModeConfig>({
    mode: initialMode,
    autoPlayResponses: false,
    showChatHistory: true,
    maxVisibleMessages: 3,
  });

  const audioManagerRef = useRef<AudioManager | null>(null);

  // Initialize AudioManager once on mount
  useEffect(() => {
    if (!audioManagerRef.current) {
      audioManagerRef.current = new AudioManager();
    }
  }, []);

  // Update config when mode changes
  useEffect(() => {
    const newConfig: Partial<VoiceModeConfig> = {
      mode,
    };

    switch (mode) {
      case 'voice-voice':
        newConfig.autoPlayResponses = true;
        newConfig.showChatHistory = false;
        newConfig.maxVisibleMessages = 3;
        break;
      case 'voice-text':
        newConfig.autoPlayResponses = false;
        newConfig.showChatHistory = true;
        newConfig.maxVisibleMessages = 10;
        break;
      case 'text-voice':
        newConfig.autoPlayResponses = true;
        newConfig.showChatHistory = true;
        newConfig.maxVisibleMessages = 10;
        break;
      case 'text-text':
        newConfig.autoPlayResponses = false;
        newConfig.showChatHistory = true;
        newConfig.maxVisibleMessages = 50;
        break;
    }

    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, [mode]);

  // Set up audio callbacks
  useEffect(() => {
    if (audioManagerRef.current) {
      audioManagerRef.current.onStart(() => {
        setIsAudioPlaying(true);
      });

      audioManagerRef.current.onEnd(() => {
        setIsAudioPlaying(false);
      });
    }
  }, []);

  const updateConfig = useCallback((updates: Partial<VoiceModeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const shouldPlayAudio = useCallback(
    (isAssistantMessage: boolean) => {
      if (!isAssistantMessage) return false;
      return config.autoPlayResponses;
    },
    [config.autoPlayResponses]
  );

  const shouldShowMessage = useCallback(
    (isAssistantMessage: boolean) => {
      // Always show user messages
      if (!isAssistantMessage) return true;
      
      // In voice-only mode, show minimal history
      if (mode === 'voice-voice') {
        return config.showChatHistory;
      }
      
      return true;
    },
    [mode, config.showChatHistory]
  );

  const playResponse = useCallback(
    async (text: string, audioSource?: string) => {
      if (!audioManagerRef.current) return;
      
      const audioConfig: AudioConfig = audioSource
        ? {
            type: 'file',
            source: audioSource,
            volume: 1.0,
          }
        : {
            type: 'tts',
            text: text,
            lang: 'es-ES',
            rate: 1.0,
            pitch: 1.0,
            volume: 1.0,
          };

      try {
        await audioManagerRef.current.play(audioConfig);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    },
    []
  );

  const stopAudio = useCallback(() => {
    if (!audioManagerRef.current) return;
    audioManagerRef.current.stop();
    setIsAudioPlaying(false);
  }, []);

  return {
    mode,
    setMode,
    config,
    updateConfig,
    shouldPlayAudio,
    shouldShowMessage,
    audioManager: audioManagerRef.current!,
    playResponse,
    stopAudio,
    isAudioPlaying,
  };
}
