'use client';

import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  listBuckets,
  createBucket,
  deleteBucket,
  updateBucketTags,
  listBucketObjects,
  uploadObject,
  deleteObject,
  getObjectMetadata,
} from '@/services/bucket-service';
import type { _Object } from '@aws-sdk/client-s3';

interface Bucket {
  Name?: string;
  CreationDate?: Date;
}

interface BucketContextType {
  buckets: Bucket[];
  editingBucket: string | null;
  tags: { [key: string]: string };
  selectedBucket: string | null;
  bucketObjects: _Object[];
  dialogOpen: boolean;
  objectMetadata: Record<string, any> | null;
  metadataDialogOpen: boolean;
  setEditingBucket: (bucket: string | null) => void;
  setDialogOpen: (open: boolean) => void;
  setMetadataDialogOpen: (open: boolean) => void;
  handleCreateBucket: (bucketName: string) => Promise<void>;
  handleDeleteBucket: (bucketName: string) => Promise<void>;
  handleUpdateTags: (bucketName: string) => Promise<void>;
  handleTagChange: (key: string, value: string) => void;
  handleRowClick: (bucketName: string) => Promise<void>;
  handleUploadObject: (key: string, file: File) => Promise<void>;
  handleDeleteObject: (key: string) => Promise<void>;
  handleViewMetadata: (key: string) => Promise<void>;
}

const BucketContext = createContext<BucketContextType | undefined>(undefined);

export function BucketProvider({ children }: { children: React.ReactNode }) {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [editingBucket, setEditingBucket] = useState<string | null>(null);
  const [tags, setTags] = useState<{ [key: string]: string }>({});
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const [bucketObjects, setBucketObjects] = useState<_Object[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [objectMetadata, setObjectMetadata] = useState<Record<string, any> | null>(null);
  const [metadataDialogOpen, setMetadataDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchBuckets = async () => {
    try {
      const data = await listBuckets();
      setBuckets(data);
    } catch (error) {
      console.error('Failed to fetch buckets', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch buckets',
      });
    }
  };

  const fetchBucketObjects = async (bucketName: string) => {
    try {
      const objects = await listBucketObjects(bucketName);
      setBucketObjects(objects);
    } catch (error) {
      console.error('Failed to fetch bucket objects', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch bucket objects',
      });
    }
  };

  const handleCreateBucket = async (bucketName: string) => {
    try {
      await createBucket(bucketName);
      toast({
        title: 'Success',
        description: 'Bucket created successfully',
      });
      fetchBuckets();
    } catch (error) {
      console.error('Failed to create bucket', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create bucket',
      });
    }
  };

  const handleDeleteBucket = async (bucketName: string) => {
    try {
      await deleteBucket(bucketName);
      toast({
        title: 'Success',
        description: 'Bucket deleted successfully',
      });
      fetchBuckets();
    } catch (error) {
      console.error('Failed to delete bucket', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete bucket',
      });
    }
  };

  const handleUpdateTags = async (bucketName: string) => {
    try {
      await updateBucketTags(bucketName, tags);
      toast({
        title: 'Success',
        description: 'Tags updated successfully',
      });
      setEditingBucket(null);
      setTags({});
    } catch (error) {
      console.error('Failed to update tags', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update tags',
      });
    }
  };

  const handleTagChange = (key: string, value: string) => {
    setTags({ ...tags, [key]: value });
  };

  const handleRowClick = async (bucketName: string) => {
    setSelectedBucket(bucketName);
    setDialogOpen(true);
    await fetchBucketObjects(bucketName);
  };

  const handleUploadObject = async (key: string, file: File) => {
    if (!selectedBucket) return;
    try {
      await uploadObject(selectedBucket, key, file);
      toast({
        title: 'Success',
        description: 'Object uploaded successfully',
      });
      await fetchBucketObjects(selectedBucket);
    } catch (error) {
      console.error('Failed to upload object', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to upload object',
      });
    }
  };

  const handleDeleteObject = async (key: string) => {
    if (!selectedBucket) return;
    try {
      await deleteObject(selectedBucket, key);
      toast({
        title: 'Success',
        description: 'Object deleted successfully',
      });
      await fetchBucketObjects(selectedBucket);
    } catch (error) {
      console.error('Failed to delete object', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete object',
      });
    }
  };

  const handleViewMetadata = async (key: string) => {
    if (!selectedBucket) return;
    try {
      const metadata = await getObjectMetadata(selectedBucket, key);
      setObjectMetadata(metadata);
      setMetadataDialogOpen(true);
    } catch (error) {
      console.error('Failed to fetch object metadata', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch object metadata',
      });
    }
  };

  const value = {
    buckets,
    editingBucket,
    tags,
    selectedBucket,
    bucketObjects,
    dialogOpen,
    objectMetadata,
    metadataDialogOpen,
    setEditingBucket,
    setDialogOpen,
    setMetadataDialogOpen,
    handleCreateBucket,
    handleDeleteBucket,
    handleUpdateTags,
    handleTagChange,
    handleRowClick,
    handleUploadObject,
    handleDeleteObject,
    handleViewMetadata,
  };

  return <BucketContext.Provider value={value}>{children}</BucketContext.Provider>;
}

export const useBucketContext = () => {
  const context = useContext(BucketContext);
  if (context === undefined) {
    throw new Error('useBucketContext must be used within a BucketProvider');
  }
  return context;
};
