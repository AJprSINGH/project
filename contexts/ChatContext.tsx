'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useChatSession } from '@/hooks/useChatSession';
import { MessageType } from '@/components/Chatbot/ChatBubble';
import { PersonaType, DEFAULT_PERSONAS } from '@/components/Forms/PersonaSelector';

// Define the shape of our context
interface ChatContextProps {
  messages: MessageType[];
  isTyping: boolean;
  persona: PersonaType;
  addUserMessage: (text: string) => void;
  changePersona: (persona: PersonaType) => void;
  clearMessages: () => void;
}

// Create the context with a default value
const ChatContext = createContext<ChatContextProps | undefined>(undefined);

// Provider component that wraps the app
export function ChatProvider({ children }: { children: ReactNode }) {
  const initialPersona = DEFAULT_PERSONAS[0]; // Default to first persona
  
  const {
    messages,
    isTyping,
    persona,
    addUserMessage,
    changePersona,
    clearMessages,
  } = useChatSession(initialPersona);
  
  return (
    <ChatContext.Provider
      value={{
        messages,
        isTyping,
        persona,
        addUserMessage,
        changePersona,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// Custom hook to use the chat context
export function useChatContext() {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  
  return context;
}