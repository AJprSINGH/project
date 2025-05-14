'use client';

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageType } from '@/components/Chatbot/ChatBubble';
import { sendMessage as sendMessageApi } from '@/services/chatbotApi';
import { logChatEvent } from '@/services/analyticsService';
import { PersonaType } from '@/components/Forms/PersonaSelector';

export function useChatSession(initialPersona: PersonaType) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [persona, setPersona] = useState<PersonaType>(initialPersona);

  const addUserMessage = useCallback((text: string) => {
    const userMessage: MessageType = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    logChatEvent('message_sent', { text, personaId: persona.id });
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Call mock API service
    sendMessageApi(text, persona.id)
      .then(response => {
        setIsTyping(false);
        
        const botMessage: MessageType = {
          id: uuidv4(),
          text: response.text,
          sender: 'bot',
          timestamp: new Date(),
          persona: persona.id,
        };
        
        setMessages(prev => [...prev, botMessage]);
        logChatEvent('bot_responded', { text: response.text, personaId: persona.id });
      })
      .catch(error => {
        setIsTyping(false);
        console.error('Error getting bot response:', error);
        
        // Add error message
        const errorMessage: MessageType = {
          id: uuidv4(),
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'bot',
          timestamp: new Date(),
          persona: persona.id,
        };
        
        setMessages(prev => [...prev, errorMessage]);
        logChatEvent('bot_error', { error: error.message, personaId: persona.id });
      });
  }, [persona]);

  const changePersona = useCallback((newPersona: PersonaType) => {
    setPersona(newPersona);
    logChatEvent('persona_changed', { 
      from: persona.id, 
      to: newPersona.id 
    });
    
    // Optional: Add a system message about changing persona
    const systemMessage: MessageType = {
      id: uuidv4(),
      text: `You are now chatting with the ${newPersona.name}.`,
      sender: 'bot',
      timestamp: new Date(),
      persona: newPersona.id,
    };
    
    setMessages(prev => [...prev, systemMessage]);
  }, [persona]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    logChatEvent('chat_cleared', { personaId: persona.id });
  }, [persona]);

  return {
    messages,
    isTyping,
    persona,
    addUserMessage,
    changePersona,
    clearMessages,
  };
}