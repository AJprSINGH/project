'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Circle as CircleNotch } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loader = ({ size = 'md', className }: LoaderProps) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <CircleNotch 
      className={cn(
        'animate-spin text-muted-foreground',
        sizeMap[size],
        className
      )} 
    />
  );
};

export default Loader;