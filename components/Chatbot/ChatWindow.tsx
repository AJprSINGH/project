'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import ChatBubble, { MessageType } from './ChatBubble';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  messages: MessageType[];
  isTyping: boolean;
  className?: string;
}

const ChatWindow = ({ messages, isTyping, className }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change or bot is typing
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div 
      className={cn(
        'flex flex-col gap-2 py-4 overflow-y-auto',
        className
      )}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center px-4">
            Start a conversation by typing a message below.
          </p>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>
      )}
      
      <TypingIndicator isVisible={isTyping} />
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;