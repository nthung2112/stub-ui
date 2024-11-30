'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createBucketAction } from './action';
import { toast } from '@/hooks/use-toast';

export function AddBucketForm() {
  const handleSubmit = async (data: FormData) => {
    const result = await createBucketAction(data);
    if (result.success) {
      toast({
        title: 'Success',
        description: 'Bucket created successfully',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create bucket',
      });
    }
  };

  return (
    <form className="flex space-x-2 mb-4" action={handleSubmit}>
      <Input required name="bucketName" placeholder="Enter bucket name" />
      <Button>Add new</Button>
    </form>
  );
}
