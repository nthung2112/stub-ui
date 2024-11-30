'use client';

import React, { useEffect, useState } from 'react';
import {
  listBuckets,
  createBucket,
  deleteBucket,
  updateBucketTags,
} from '@/services/bucket-service';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Bucket {
  Name?: string;
  CreationDate?: Date;
}

export default function Page() {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [newBucketName, setNewBucketName] = useState('');
  const [editingBucket, setEditingBucket] = useState<string | null>(null);
  const [tags, setTags] = useState<{ [key: string]: string }>({});

  const fetchBuckets = async () => {
    try {
      const data = await listBuckets();
      setBuckets(data);
    } catch (error) {
      console.error('Failed to fetch buckets', error);
      toast({
        title: 'Error',
        description: `Failed to fetch buckets`,
      });
    }
  };

  useEffect(() => {
    fetchBuckets();
  }, []);

  const handleCreateBucket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBucket(newBucketName);
      toast({
        title: 'Success',
        description: `Bucket created successfully`,
      });
      setNewBucketName('');
      fetchBuckets();
    } catch (error) {
      console.error('Failed to create bucket', error);
      toast({
        title: 'Error',
        description: `Failed to create bucket`,
      });
    }
  };

  const handleDeleteBucket = async (bucketName: string) => {
    try {
      await deleteBucket(bucketName);
      toast({
        title: 'Success',
        description: `Bucket deleted successfully`,
      });
      fetchBuckets();
    } catch (error) {
      console.error('Failed to delete bucket', error);
      toast({
        title: 'Error',
        description: `Failed to delete bucket`,
      });
    }
  };

  const handleUpdateTags = async (bucketName: string) => {
    try {
      await updateBucketTags(bucketName, tags);
      toast({
        title: 'Success',
        description: `Tags updated successfully`,
      });
      setEditingBucket(null);
      setTags({});
    } catch (error) {
      console.error('Failed to update tags', error);
      toast({
        title: 'Error',
        description: `Failed to update tags`,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">S3 Bucket Manager</h1>

      {/* Create Bucket Form */}
      <form onSubmit={handleCreateBucket} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newBucketName}
            onChange={(e) => setNewBucketName(e.target.value)}
            placeholder="New bucket name"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Create Bucket
          </button>
        </div>
      </form>

      {/* Bucket List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bucket Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Creation Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {buckets.map((bucket) => (
              <tr key={bucket.Name}>
                <td className="px-6 py-4 whitespace-nowrap">{bucket.Name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {bucket.CreationDate?.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {editingBucket === bucket.Name ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="tag-key=tag-value"
                          className="border rounded px-2"
                          onChange={(e) => {
                            const [key, value] = e.target.value.split('=');
                            setTags({ ...tags, [key]: value });
                          }}
                        />
                        <button
                          onClick={() => handleUpdateTags(bucket.Name!)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingBucket(bucket.Name!)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteBucket(bucket.Name!)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
