import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ChatProvider } from '@/contexts/ChatContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'triz.bot - AI Chatbot',
  description: 'An intelligent chatbot with multiple personas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ChatProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ChatProvider>
      </body>
    </html>
  );
}