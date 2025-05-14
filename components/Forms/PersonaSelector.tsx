'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';

export type PersonaType = {
  id: string;
  name: string;
  description: string;
  avatarColor: string;
};

export const DEFAULT_PERSONAS: PersonaType[] = [
  {
    id: 'support',
    name: 'Support Bot',
    description: 'Help with product questions and issues',
    avatarColor: 'bg-blue-500',
  },
  {
    id: 'sales',
    name: 'Sales Bot',
    description: 'Information about pricing and features',
    avatarColor: 'bg-emerald-500',
  },
  {
    id: 'trainer',
    name: 'Trainer Bot',
    description: 'Learn how to use the product',
    avatarColor: 'bg-amber-500',
  },
];

interface PersonaSelectorProps {
  personas: PersonaType[];
  selectedPersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
  className?: string;
}

const PersonaSelector = ({
  personas,
  selectedPersona,
  onSelectPersona,
  className,
}: PersonaSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn('flex items-center gap-2 h-auto py-2', className)}
          aria-label="Select a persona"
        >
          <Avatar className={cn('h-8 w-8', selectedPersona.avatarColor)}>
            <span className="text-primary-foreground text-xs font-medium">
              {selectedPersona.name.charAt(0)}
            </span>
          </Avatar>
          <div className="flex flex-col items-start text-left">
            <span className="text-sm font-medium">{selectedPersona.name}</span>
            <span className="text-xs text-muted-foreground">{selectedPersona.description}</span>
          </div>
          <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {personas.map((persona) => (
          <DropdownMenuItem
            key={persona.id}
            onClick={() => onSelectPersona(persona)}
            className="flex items-center gap-2 py-2 cursor-pointer"
          >
            <Avatar className={cn('h-8 w-8', persona.avatarColor)}>
              <span className="text-primary-foreground text-xs font-medium">
                {persona.name.charAt(0)}
              </span>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{persona.name}</p>
              <p className="text-xs text-muted-foreground truncate">{persona.description}</p>
            </div>
            {selectedPersona.id === persona.id && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PersonaSelector;