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
  );
}
