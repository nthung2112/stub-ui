'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RequestForm from './request-form';
import { RequestData } from '@/types';
import { createNewRequest } from '@/app/mock-data/action';

export function RequestAddButton() {
  const addRequest = async (newRequest: RequestData) => {
    console.log('Adding new request:', newRequest);
    await createNewRequest(newRequest);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4">Add New Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Add New Request</DialogTitle>
        </DialogHeader>
        <RequestForm onSubmit={addRequest} />
      </DialogContent>
    </Dialog>
  );
}
