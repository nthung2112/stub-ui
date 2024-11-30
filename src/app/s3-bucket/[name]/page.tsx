import { MainLayout } from '@/components/main-layout';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { listBucketObjects } from '@/services/bucket-service';
import { FileText, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const formatBytes = (bytes?: number) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const formatDate = (date?: Date) => {
  return date?.toLocaleString() || '';
};

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name;
  const objects = await listBucketObjects(name);

  return (
    <MainLayout
      title={
        <Link href="/s3-bucket" className="flex gap-2">
          <ArrowLeft />
          Objects in {name}
        </Link>
      }
    >
      <div className="flex space-x-2 mb-4">
        <Input type="file" />
        <Button>Upload</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {objects.map((object) => (
            <TableRow key={object.Key}>
              <TableCell>{object.Key}</TableCell>
              <TableCell>{formatBytes(object.Size)}</TableCell>
              <TableCell>{formatDate(object.LastModified)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainLayout>
  );
}
