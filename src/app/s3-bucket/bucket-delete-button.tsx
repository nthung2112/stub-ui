'use client';

import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-modal';
import { Trash2 } from 'lucide-react';

import type { Bucket } from '@aws-sdk/client-s3';
import { deleteBucketAction } from './action';

export function BucketDeleteButton({ bucket }: { bucket: Bucket }) {
  const confirm = useConfirm();

  const handleClick = async () => {
    const result = await confirm({
      title: 'Delete Bucket',
      body: 'Are you sure you want to delete this bucket?',
    });

    if (result) {
      deleteBucketAction(bucket.Name!);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  );
}
