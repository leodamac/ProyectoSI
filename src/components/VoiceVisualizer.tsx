'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface VoiceVisualizerProps {
  analyserNode: AnalyserNode | null;
  isActive: boolean;
  mode?: 'listening' | 'speaking';
}

export default function VoiceVisualizer({
  analyserNode,
  isActive,
  mode = 'listening',
}: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const simulatedBarsRef = useRef<number[]>([]);

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

    const barCount = 20;
    const barWidth = canvas.width / barCount;

    // Initialize simulated bars
    if (simulatedBarsRef.current.length === 0) {
      simulatedBarsRef.current = Array(barCount).fill(0);
    }

    const drawVisualizer = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyserNode && isActive) {
        // Real audio data
        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserNode.getByteFrequencyData(dataArray);

        // Sample data for visualization
        const step = Math.floor(bufferLength / barCount);

        for (let i = 0; i < barCount; i++) {
          const value = dataArray[i * step];
          const barHeight = (value / 255) * canvas.height * 0.8;
          const x = i * barWidth;
          const y = canvas.height - barHeight;

          // Gradient color based on mode
          const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
          if (mode === 'listening') {
            gradient.addColorStop(0, '#10b981'); // emerald-500
            gradient.addColorStop(1, '#059669'); // emerald-600
          } else {
            gradient.addColorStop(0, '#3b82f6'); // blue-500
            gradient.addColorStop(1, '#2563eb'); // blue-600
          }

          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth - 2, barHeight);
        }
      } else if (isActive) {
        // Simulated visualization
        for (let i = 0; i < barCount; i++) {
          // Smooth random animation
          const target = Math.random() * 0.7 + 0.1;
          simulatedBarsRef.current[i] += (target - simulatedBarsRef.current[i]) * 0.1;

          const barHeight = simulatedBarsRef.current[i] * canvas.height;
          const x = i * barWidth;
          const y = canvas.height - barHeight;

          // Gradient color based on mode
          const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
          if (mode === 'listening') {
            gradient.addColorStop(0, '#10b981');
            gradient.addColorStop(1, '#059669');
          } else {
            gradient.addColorStop(0, '#3b82f6');
            gradient.addColorStop(1, '#2563eb');
          }

          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth - 2, barHeight);
        }
      }

      animationFrameRef.current = requestAnimationFrame(drawVisualizer);
    };

    if (isActive) {
      drawVisualizer();
    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    let dataArray: Uint8Array;
    let bufferLength: number;

    if (analyser) {
      // Real audio mode
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
    } else {
      // Simulated mode
      bufferLength = 32;
      dataArray = new Uint8Array(bufferLength);
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
        // TypeScript workaround for lib.dom strict types
        (analyser.getByteFrequencyData as (arr: Uint8Array) => void)(dataArray);
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
  }, [analyserNode, isActive, mode]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="w-full py-2"
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={60}
        className="w-full h-[60px] rounded-lg"
      />
    </motion.div>
  }, [analyser, isActive, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-lg shadow-sm border border-gray-200"
      style={{ display: 'block', maxWidth: '100%' }}
    />
  );
}
