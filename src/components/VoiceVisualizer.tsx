'use client';

import { useEffect, useRef } from 'react';

interface VoiceVisualizerProps {
  analyser: AnalyserNode | null;
  isActive: boolean;
  width?: number;
  height?: number;
}

export default function VoiceVisualizer({ 
  analyser, 
  isActive, 
  width = 300, 
  height = 100 
}: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    let dataArray: Uint8Array<ArrayBuffer>;
    let bufferLength: number;

    if (analyser) {
      // Real audio mode
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength) as Uint8Array<ArrayBuffer>;
    } else {
      // Simulated mode
      bufferLength = 32;
      dataArray = new Uint8Array(bufferLength) as Uint8Array<ArrayBuffer>;
    }

    const barWidth = (width / bufferLength) * 2.5;
    let barHeight: number;
    let x = 0;

    // Simulated animation variables
    let simulatedPhase = 0;

    const draw = () => {
      if (!isActive) {
        // Clear canvas when not active
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, width, height);
        return;
      }

      x = 0;

      // Clear canvas with background color
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);

      if (analyser) {
        // Real audio visualization
        analyser.getByteFrequencyData(dataArray);
      } else {
        // Simulated visualization
        simulatedPhase += 0.05;
        for (let i = 0; i < bufferLength; i++) {
          const amplitude = Math.sin(simulatedPhase + i * 0.5) * 50 + 75;
          dataArray[i] = Math.floor(amplitude);
        }
      }

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * height * 0.8;

        // Create gradient for bars
        const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(1, '#059669');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    if (isActive) {
      draw();
    } else {
      // Draw static state
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyser, isActive, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-lg shadow-sm border border-gray-200"
      style={{ display: 'block', maxWidth: '100%' }}
    />
  );
}
