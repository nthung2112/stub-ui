'use server';

import { createBucket, deleteBucket } from '@/services/bucket-service';
import { revalidatePath } from 'next/cache';

export const createBucketAction = async (formData: FormData) => {
  const bucketName = String(formData.get('bucketName') || '');
  try {
    await createBucket(bucketName);

    revalidatePath('/s3-bucket');
    return { success: true, message: 'Bucket created successfully' };
  } catch (error) {
    console.error('Failed to create bucket:', error);
    return { success: false, message: 'Failed to create bucket' };
  }
};

export const deleteBucketAction = async (bucketName: string) => {
  try {
    await deleteBucket(bucketName);

    revalidatePath('/s3-bucket');
    return { success: true, message: 'Bucket deleting successfully' };
  } catch (error) {
    console.error('Failed to deleting bucket:', error);
    return { success: false, message: 'Failed to deleting bucket' };
  }
};
