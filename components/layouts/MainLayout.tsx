'use client';

import React, { ReactNode } from 'react';
import { ChatProvider } from '@/contexts/ChatContext';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import Branding from '@/components/Common/Branding';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ChatProvider>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="container flex justify-between items-center py-4">
            <Branding />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 container py-6">{children}</main>

        {/* Footer */}
        <footer className="border-t py-4 bg-background">
          <div className="container flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © 2025 triz.bot. All rights reserved.
            </div>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Version 1.0.0
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ChatProvider>
  );
};

export default MainLayout;