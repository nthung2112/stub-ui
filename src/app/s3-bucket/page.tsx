import Link from 'next/link';

import { MainLayout } from '@/components/main-layout';
import { listBuckets } from '@/services/bucket-service';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { BucketProvider } from './bucket-context';
import { BucketDeleteButton } from './bucket-delete-button';
import { AddBucketForm } from './add-bucket-form';

export default async function Page() {
  const buckets = await listBuckets();

  return (
    <MainLayout title="S3 Bucket Manager">
      <BucketProvider>
        <AddBucketForm />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bucket Name</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buckets.map((bucket) => (
              <TableRow key={bucket.Name}>
                <TableCell>
                  <Link href={`/s3-bucket/${bucket.Name}`}>{bucket.Name}</Link>
                </TableCell>
                <TableCell>{bucket.CreationDate?.toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <BucketDeleteButton bucket={bucket} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </BucketProvider>
    </MainLayout>
  );
}
