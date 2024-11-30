'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import RequestForm from './request-form';
import { RequestData } from '@/types';

export function RequestEditButton({ request }: { request: RequestData }) {
  const [editingRequest, setEditingRequest] = useState<RequestData | null>(null);

  const updateRequest = (updatedRequest: RequestData) => {
    setEditingRequest(updatedRequest);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setEditingRequest(request)}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit Request</DialogTitle>
        </DialogHeader>
        {editingRequest && (
          <RequestForm
            initialData={editingRequest}
            onSubmit={(updatedRequest) =>
              updateRequest({ ...updatedRequest, id: editingRequest.id })
            }
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
