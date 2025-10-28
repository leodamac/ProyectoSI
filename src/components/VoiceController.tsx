'use client';

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
