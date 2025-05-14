import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for components that use client hooks
const ChatPage = dynamic(() => import('@/components/pages/ChatPage'), { ssr: false });

export default function Home() {
  return <ChatPage />;
}