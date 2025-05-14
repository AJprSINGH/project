'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PersonaType } from '@/components/Forms/PersonaSelector';

interface WelcomeMessageProps {
  persona: PersonaType;
  className?: string;
}

const WelcomeMessage = ({ persona, className = '' }: WelcomeMessageProps) => {
  const welcomeMessages = {
    support: "Hi there! I'm the Support Bot. How can I help you with your product questions or issues today?",
    sales: "Welcome! I'm the Sales Bot. I'm here to help you learn about our pricing and features. What would you like to know?",
    trainer: "Hello! I'm the Trainer Bot. I can help you learn how to use our product effectively. What would you like to learn about?",
  };

  const message = welcomeMessages[persona.id as keyof typeof welcomeMessages] || 
    "Hello! How can I assist you today?";

  return (
    <motion.div 
      className={`p-6 rounded-lg bg-muted/50 mb-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-medium mb-2">Welcome to boltt.new</h2>
      <p className="text-muted-foreground">{message}</p>
    </motion.div>
  );
};

export default WelcomeMessage;