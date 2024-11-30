'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HttpMethod, RequestData } from '@/types';

interface HttpRequestManagerProps {
  initialData?: RequestData;
  onSubmit: (data: RequestData) => void;
}

export default function HttpRequestManager({ initialData, onSubmit }: HttpRequestManagerProps) {
  const [requestData, setRequestData] = useState<RequestData>({
    id: '',
    method: 'POST',
    responseCode: 200,
    uri: '',
    responseBody: '',
  });

  useEffect(() => {
    if (initialData) {
      setRequestData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMethodChange = (value: HttpMethod) => {
    setRequestData((prev) => ({ ...prev, method: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(requestData);
  };

  return (
    <form onSubmit={handleSubmit} className="gap-y-4 flex gap-4">
      <div className="flex flex-col gap-4 flex-none w-[300px]">
        <div>
          <Label htmlFor="method">HTTP Method</Label>
          <Select name="method" value={requestData.method} onValueChange={handleMethodChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select HTTP method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="responseCode">Response Code</Label>
          <Input
            type="number"
            id="responseCode"
            name="responseCode"
            value={requestData.responseCode}
            onChange={handleInputChange}
            placeholder="e.g., 200"
          />
        </div>
        <div>
          <Label htmlFor="uri">URI</Label>
          <Input
            type="text"
            id="uri"
            name="uri"
            value={requestData.uri}
            onChange={handleInputChange}
            placeholder="e.g., https://api.example.com/data"
          />
        </div>

        <Button type="submit">{initialData ? 'Update' : 'Add'} Request</Button>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="responseBody">Response Body</Label>
          <Textarea
            id="responseBody"
            name="responseBody"
            value={requestData.responseBody}
            onChange={handleInputChange}
            placeholder="Enter response body (JSON, XML, etc.)"
            rows={20}
          />
        </div>
      </div>
    </form>
  );
}
