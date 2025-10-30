/**
 * Mode Indicator Component
 * A persistent badge showing the current interaction mode
 */

'use client';

import { Mic, MessageSquare, Volume2, Keyboard } from 'lucide-react';
import { InteractionMode } from '@/hooks/useVoiceMode';

interface ModeIndicatorProps {
  mode: InteractionMode;
  onClick?: () => void;
  compact?: boolean;
}

const modeConfig: Record<
  InteractionMode,
  {
    label: string;
    inputIcon: React.ReactNode;
    outputIcon: React.ReactNode;
    color: string;
    bgColor: string;
  }
> = {
  'voice-voice': {
    label: 'Voz-Voz',
    inputIcon: <Mic className="w-3 h-3" />,
    outputIcon: <Volume2 className="w-3 h-3" />,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100 border-purple-300',
  },
  'voice-text': {
    label: 'Voz-Texto',
    inputIcon: <Mic className="w-3 h-3" />,
    outputIcon: <MessageSquare className="w-3 h-3" />,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100 border-blue-300',
  },
  'text-voice': {
    label: 'Texto-Voz',
    inputIcon: <Keyboard className="w-3 h-3" />,
    outputIcon: <Volume2 className="w-3 h-3" />,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100 border-emerald-300',
  },
  'text-text': {
    label: 'Texto-Texto',
    inputIcon: <Keyboard className="w-3 h-3" />,
    outputIcon: <MessageSquare className="w-3 h-3" />,
    color: 'text-gray-700',
    bgColor: 'bg-gray-100 border-gray-300',
  },
};

export default function ModeIndicator({ mode, onClick, compact = false }: ModeIndicatorProps) {
  const config = modeConfig[mode];

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg transition-all hover:shadow-md ${config.bgColor} ${config.color} ${
        onClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'
      }`}
      title="Cambiar modo de interacción"
    >
      <div className="flex items-center gap-1">
        {config.inputIcon}
        <span className="text-xs">→</span>
        {config.outputIcon}
      </div>
      {!compact && <span className="text-xs font-semibold">{config.label}</span>}
    </button>
  );
}
