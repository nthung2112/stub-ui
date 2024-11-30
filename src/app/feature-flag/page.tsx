'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MainLayout } from '@/components/main-layout';

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export default function Page() {
  const [flags, setFlags] = useState<FeatureFlag[]>([
    { id: '1', name: 'New UI', description: 'Enable new user interface', enabled: true },
    { id: '2', name: 'Beta Feature', description: 'Enable beta features', enabled: false },
    { id: '3', name: 'Dark Mode', description: 'Enable dark mode', enabled: true },
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flags.map((flag) => (
            <TableRow key={flag.name}>
              <TableCell>{flag.name}</TableCell>
              <TableCell>{flag.description}</TableCell>
              <TableCell>
                <Switch checked={flag.enabled} onCheckedChange={() => handleToggle(flag.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainLayout>
  );
}
