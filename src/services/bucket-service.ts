import {
  CreateBucketCommand,
  DeleteBucketCommand,
  ListBucketsCommand,
  PutBucketTaggingCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
  type _Object,
} from '@aws-sdk/client-s3';
import { s3Client } from './s3-client';

export const listBuckets = async () => {
  try {
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);
    return response.Buckets || [];
  } catch (error) {
    console.error('Error listing buckets:', error);
    throw error;
  }
};

export const createBucket = async (bucketName: string) => {
  try {
    const command = new CreateBucketCommand({
      Bucket: bucketName,
    });
    await s3Client.send(command);
  } catch (error) {
    console.error('Error creating bucket:', error);
    throw error;
  }
};

export const deleteBucket = async (bucketName: string) => {
  try {
    const command = new DeleteBucketCommand({
      Bucket: bucketName,
    });
    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting bucket:', error);
    throw error;
  }
};

export const updateBucketTags = async (bucketName: string, tags: { [key: string]: string }) => {
  try {
    const command = new PutBucketTaggingCommand({
      Bucket: bucketName,
      Tagging: {
        TagSet: Object.entries(tags).map(([Key, Value]) => ({ Key, Value })),
      },
    });
    await s3Client.send(command);
  } catch (error) {
    console.error('Error updating bucket tags:', error);
    throw error;
  }
};

export const listBucketObjects = async (bucketName: string): Promise<_Object[]> => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });
    const response = await s3Client.send(command);
    return response.Contents || [];
  } catch (error) {
    console.error('Error listing bucket objects:', error);
    throw error;
  }
};

export const uploadObject = async (bucketName: string, key: string, file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    });
    await s3Client.send(command);
  } catch (error) {
    console.error('Error uploading object:', error);
    throw error;
  }
};

export const deleteObject = async (bucketName: string, key: string) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting object:', error);
    throw error;
  }
};

export const getObjectMetadata = async (bucketName: string, key: string) => {
  try {
    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const response = await s3Client.send(command);
    return response;
  } catch (error) {
    console.error('Error getting object metadata:', error);
    throw error;
  }
};

export const getObjectUrl = async (bucketName: string, key: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const url = await s3Client.send(command);
    return url;
  } catch (error) {
    console.error('Error getting object URL:', error);
    throw error;
  }
};
