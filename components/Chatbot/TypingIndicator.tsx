'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  isVisible: boolean;
  className?: string;
}

const TypingIndicator = ({ isVisible, className }: TypingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <div className={cn('flex items-center px-4 py-2', className)}>
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <span>Bot is typing</span>
        <motion.div className="flex space-x-1 ml-1">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: dot * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TypingIndicator;