'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ChatWindow from '@/components/Chatbot/ChatWindow';
import ChatInput from '@/components/Chatbot/ChatInput';
import PersonaSelector, { DEFAULT_PERSONAS } from '@/components/Forms/PersonaSelector';
import { useChatContext } from '@/contexts/ChatContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2Icon, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WelcomeMessage from '@/components/Common/WelcomeMessage';
import ChatSettings from '@/components/Chatbot/ChatSettings';

const ChatPage = () => {
  const {
    messages,
    isTyping,
    persona,
    addUserMessage,
    changePersona,
    clearMessages,
  } = useChatContext();

  const [showSettings, setShowSettings] = useState(false);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 && (
          <WelcomeMessage persona={persona} className="mb-4" />
        )}

        <Card className="shadow-md border rounded-lg overflow-hidden">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 gap-4 border-b bg-muted/30 pb-4">
            <CardTitle className="text-xl font-semibold">Chat with triz.bot</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={clearMessages}
                aria-label="Clear chat"
                title="Clear chat history"
                className={messages.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                disabled={messages.length === 0}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
                aria-label="Chat settings"
                title="Chat settings"
              >
                <SettingsIcon className="h-4 w-4" />
              </Button>
              <PersonaSelector
                personas={DEFAULT_PERSONAS}
                selectedPersona={persona}
                onSelectPersona={changePersona}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[600px]">
            {showSettings ? (
              <ChatSettings onClose={() => setShowSettings(false)} />
            ) : (
              <>
                <ChatWindow
                  messages={messages}
                  isTyping={isTyping}
                  className="flex-1"
                />
                <ChatInput
                  onSendMessage={addUserMessage}
                  disabled={isTyping}
                  placeholder={`Ask ${persona.name} anything...`}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ChatPage;