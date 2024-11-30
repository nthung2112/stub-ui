'use client';

import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-modal';
import { Pencil } from 'lucide-react';

import type { Bucket } from '@aws-sdk/client-s3';

export function BucketEditButton({ bucket }: { bucket: Bucket }) {
  const confirm = useConfirm();

  const handleClick = async () => {};

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <Pencil className="h-4 w-4" />
    </Button>
  );
}
