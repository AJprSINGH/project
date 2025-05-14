'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ChatSettingsProps {
  onClose: () => void;
}

const ChatSettings = ({ onClose }: ChatSettingsProps) => {
  // These would be connected to real state in a full implementation
  const [saveHistory, setSaveHistory] = React.useState(true);
  const [notifications, setNotifications] = React.useState(false);
  const [responseLength, setResponseLength] = React.useState([50]);

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Chat Settings</h2>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close settings">
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Preferences</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="save-history">Save chat history</Label>
              <p className="text-sm text-muted-foreground">
                Keep your conversation history between sessions
              </p>
            </div>
            <Switch 
              id="save-history" 
              checked={saveHistory}
              onCheckedChange={setSaveHistory}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Enable notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new messages
              </p>
            </div>
            <Switch 
              id="notifications" 
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Response Settings</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="response-length">Response Length</Label>
              <span className="text-sm text-muted-foreground">
                {responseLength[0]}%
              </span>
            </div>
            <Slider 
              id="response-length"
              min={0} 
              max={100} 
              step={1}
              value={responseLength}
              onValueChange={setResponseLength}
            />
            <p className="text-sm text-muted-foreground">
              Adjust how detailed the bot's responses should be
            </p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button onClick={onClose} className="w-full">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;