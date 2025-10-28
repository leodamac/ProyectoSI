'use client';

import { motion } from 'framer-motion';

interface KnightRiderLightsProps {
  isActive: boolean;
  lightCount?: number;
}

export default function KnightRiderLights({ 
  isActive, 
  lightCount = 10 
}: KnightRiderLightsProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      {Array.from({ length: lightCount }).map((_, index) => (
        <motion.div
          key={index}
          className="w-3 h-3 rounded-full"
          initial={{ backgroundColor: '#d1d5db' }}
          animate={
            isActive
              ? {
                  backgroundColor: [
                    '#d1d5db',
                    '#10b981',
                    '#059669',
                    '#10b981',
                    '#d1d5db',
                  ],
                }
              : { backgroundColor: '#d1d5db' }
          }
          transition={
            isActive
              ? {
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}
