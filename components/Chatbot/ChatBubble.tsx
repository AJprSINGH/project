import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Avatar } from '@/components/ui/avatar';
import { BotIcon, UserIcon } from 'lucide-react';

export type MessageType = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  persona?: string;
};

interface ChatBubbleProps {
  message: MessageType;
  className?: string;
}

const ChatBubble = ({ message, className }: ChatBubbleProps) => {
  const isBot = message.sender === 'bot';
  
  const avatarColors: Record<string, string> = {
    default: 'bg-primary',
    support: 'bg-blue-500',
    sales: 'bg-emerald-500',
    trainer: 'bg-amber-500',
  };
  
  const avatarColor = message.persona ? avatarColors[message.persona] || avatarColors.default : avatarColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex items-start gap-3 px-4 py-2',
        isBot ? 'justify-start' : 'justify-end',
        className
      )}
    >
      {isBot && (
        <Avatar className={cn('h-8 w-8', avatarColor)}>
          <BotIcon className="h-4 w-4 text-primary-foreground" />
        </Avatar>
      )}
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%] break-words',
          isBot 
            ? 'bg-muted text-foreground rounded-tl-none' 
            : 'bg-primary text-primary-foreground rounded-tr-none'
        )}
      >
        {message.text}
      </div>
      {!isBot && (
        <Avatar className="h-8 w-8 bg-secondary">
          <UserIcon className="h-4 w-4 text-secondary-foreground" />
        </Avatar>
      )}
    </motion.div>
  );
};

export default ChatBubble;