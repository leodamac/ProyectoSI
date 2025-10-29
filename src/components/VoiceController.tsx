'use client';

import { useEffect, useCallback, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useChatContext } from '@/context/ChatContext';
import VoiceVisualizer from './VoiceVisualizer';

interface VoiceControllerProps {
  onTranscriptComplete?: (transcript: string) => void;
  disabled?: boolean;
}

export default function VoiceController({
  onTranscriptComplete,
  disabled = false,
}: VoiceControllerProps) {
  const {
    interimTranscript,
    setInterimTranscript,
    analyserNode,
    setAnalyserNode,
    audioContext,
    setAudioContext,
  } = useChatContext();

  const { listening, startRecognition, stopRecognition, isSupported: sttSupported } =
    useSpeechToText((transcript, isFinal) => {
      if (isFinal) {
        onTranscriptComplete?.(transcript);
        setInterimTranscript('');
      } else {
        setInterimTranscript(transcript);
      }
    });

  const { stop: stopSpeaking, playing, isSupported: ttsSupported } = useTextToSpeech();
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Setup audio analyser when starting recognition
  const setupAudioAnalyser = useCallback(async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Create audio context and analyser
      const AudioContextConstructor =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      
      if (!AudioContextConstructor) {
        throw new Error('AudioContext not supported');
      }
      
      const ctx = new AudioContextConstructor();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      setAudioContext(ctx);
      setAnalyserNode(analyser);
    } catch (error) {
      console.error('Error setting up audio analyser:', error);
      // Continue without analyser - visualizer will use simulated mode
      setAnalyserNode(null);
    }
  }, [setAudioContext, setAnalyserNode]);

  // Clean up audio analyser
  const cleanupAudioAnalyser = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close();
    }
    setAnalyserNode(null);
    setAudioContext(null);
  }, [audioContext, setAnalyserNode, setAudioContext]);

  // Handle voice recognition toggle
  const handleToggleRecognition = useCallback(async () => {
    if (listening) {
      stopRecognition();
      cleanupAudioAnalyser();
    } else {
      await setupAudioAnalyser();
      await startRecognition();
    }
  }, [listening, stopRecognition, cleanupAudioAnalyser, setupAudioAnalyser, startRecognition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAudioAnalyser();
      stopSpeaking();
    };
  }, [cleanupAudioAnalyser, stopSpeaking]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {/* Voice Recognition Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleRecognition}
          disabled={disabled}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            listening
              ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
          } disabled:bg-gray-300 disabled:cursor-not-allowed`}
          title={listening ? 'Detener reconocimiento de voz' : 'Iniciar reconocimiento de voz'}
        >
          {listening ? (
            <>
              <MicOff className="w-4 h-4" />
              <span className="text-sm">Detener</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span className="text-sm">Hablar</span>
            </>
          )}
        </motion.button>

        {/* TTS Status Indicator */}
        {playing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg"
          >
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Reproduciendo...</span>
          </motion.div>
        )}

        {/* Support Indicators */}
        <div className="flex items-center gap-1 ml-auto">
          {sttSupported ? (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded" title="Speech-to-Text soportado">
              STT ✓
            </span>
          ) : (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded" title="STT en modo simulado">
              STT ~
            </span>
          )}
          {ttsSupported ? (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded" title="Text-to-Speech soportado">
              TTS ✓
            </span>
          ) : (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded" title="TTS en modo simulado">
              TTS ~
            </span>
          )}
        </div>
      </div>

      {/* Voice Visualizer */}
      <AnimatePresence>
        <VoiceVisualizer
          analyserNode={analyserNode}
          isActive={listening || playing}
          mode={listening ? 'listening' : 'speaking'}
        />
      </AnimatePresence>

      {/* Interim Transcript Display */}
      <AnimatePresence>
        {interimTranscript && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm italic"
          >
            {interimTranscript}
          </motion.div>
        )}
      </AnimatePresence>
import { useState } from 'react';
import VoiceVisualizer from './VoiceVisualizer';
import KnightRiderLights from './KnightRiderLights';
import { Mic, MicOff } from 'lucide-react';

interface VoiceControllerProps {
  simulatedMode?: boolean;
}

export default function VoiceController({ simulatedMode = true }: VoiceControllerProps) {
  const [isListening, setIsListening] = useState(false);
  // Future: Will be used to store real audio analyser node
  // Using underscore prefix for unused state until real audio implementation
  const [_analyser, _setAnalyser] = useState<AnalyserNode | null>(null);

  const toggleListening = () => {
    setIsListening(!isListening);
    // In future implementations, this will initialize the Web Audio API
    // For now, we're in simulated mode, so analyser remains null
  };

  return (
    <div className="voice-controller bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Voice Control</h3>
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full transition-all ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
      </div>

      <div className="space-y-4">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'
            }`}
          />
          <span className="text-sm text-gray-600">
            {isListening ? 'Listening...' : 'Ready to listen'}
          </span>
        </div>

        {/* Knight Rider Lights Animation */}
        <div className="bg-gray-50 rounded-lg">
          <KnightRiderLights isActive={isListening} />
        </div>

        {/* Voice Visualizer */}
        <div className="flex justify-center">
          <VoiceVisualizer
            analyser={simulatedMode ? null : _analyser}
            isActive={isListening}
            width={300}
            height={100}
          />
        </div>

        {/* Mode indicator */}
        {simulatedMode && (
          <div className="text-xs text-gray-500 text-center">
            Simulated mode - No audio input required
          </div>
        )}
      </div>
    </div>
  );
}
