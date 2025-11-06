'use client';

import Navigation from '@/components/Navigation';
import VoiceFirstChat from '@/components/chat/VoiceFirstChat';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAIAssistant } from '@/context/AIAssistantContext';

export default function ChatIAPage() {
  // Close the floating assistant when on chat page (it's the same conversation)
  const { closeAssistant } = useAIAssistant();

  useEffect(() => {
    closeAssistant();
  }, [closeAssistant]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
        {/* Clean, minimalist chat interface - centered and focused */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <VoiceFirstChat />
        </motion.div>
      </div>
    </div>
  );
}
