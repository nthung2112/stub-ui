'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export function PublishKafkaMessage() {
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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Publish Kafka Message</h2>
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
  );
}
