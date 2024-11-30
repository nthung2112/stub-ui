'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { MainLayout } from '@/components/main-layout';

interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
}

export default function Page() {
  const [flags, setFlags] = useState<FeatureFlag[]>([
    { id: '1', name: 'New UI', enabled: false },
    { id: '2', name: 'Beta Feature', enabled: true },
    { id: '3', name: 'Experimental API', enabled: false },
  ]);

  const handleToggle = (id: string) => {
    setFlags(flags.map((flag) => (flag.id === id ? { ...flag, enabled: !flag.enabled } : flag)));
    const flag = flags.find((f) => f.id === id);
    if (flag) {
      toast({
        title: 'Feature Flag Updated',
        description: `${flag.name} is now ${!flag.enabled ? 'enabled' : 'disabled'}`,
      });
    }
  };

  return (
    <MainLayout title="Feature Flags">
      {flags.map((flag) => (
        <div key={flag.id} className="flex items-center justify-between">
          <Label htmlFor={`flag-${flag.id}`}>{flag.name}</Label>
          <Switch
            id={`flag-${flag.id}`}
            checked={flag.enabled}
            onCheckedChange={() => handleToggle(flag.id)}
          />
        </div>
      ))}
    </MainLayout>
  );
}
