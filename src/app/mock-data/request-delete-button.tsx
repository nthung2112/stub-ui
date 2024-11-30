'use client';

import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-modal';
import { Trash2 } from 'lucide-react';

import { deleteRequest } from './action';
import { RequestData } from '@/types';

export function RequestDeleteButton({ request }: { request: RequestData }) {
  const confirm = useConfirm();

  const handleClick = async () => {
    const result = await confirm({
      title: 'Delete Bucket',
      body: 'Are you sure you want to delete this bucket?',
    });

    if (result) {
      deleteRequest(request.id);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  );
}
