'use client';

import React from 'react';
import { MessageSquareTextIcon } from 'lucide-react';

interface BrandingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Branding = ({ size = 'md', className = '' }: BrandingProps) => {
  const sizeClasses = {
    sm: 'text-lg gap-1',
    md: 'text-xl gap-2',
    lg: 'text-2xl gap-3',
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32,
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]} ${className}`}>
      <MessageSquareTextIcon 
        size={iconSizes[size]} 
        className="text-primary" 
      />
      <span className="font-bold">boltt.new</span>
    </div>
  );
};

export default Branding;