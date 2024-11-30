'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { MainLayout } from '@/components/main-layout';

export default function Page() {
  const [schemaTopic, setSchemaTopic] = useState('');
  const [message, setMessage] = useState('');

  const handlePublish = () => {
    // Here you would typically send this data to your Kafka broker
    console.log('Publishing Kafka message:', { schemaTopic, message });
    toast({
      title: 'Kafka Message Published',
      description: `Message published with schema ID: ${schemaTopic}`,
    });
  };

  return (
    <MainLayout title="Publish Kafka Message">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="schema-topic">Schema Topic</Label>
          <Input
            id="schema-topic"
            value={schemaTopic}
            onChange={(e) => setSchemaTopic(e.target.value)}
            placeholder="Select a Topic"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="kafka-message">Message (JSON)</Label>
          <Textarea
            id="kafka-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your Kafka message in JSON format"
            rows={10}
          />
        </div>
        <Button onClick={handlePublish}>Publish Message</Button>
      </div>
    </MainLayout>
  );
}
