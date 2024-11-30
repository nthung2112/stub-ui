import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { RequestData } from '@/types';
import { RequestEditButton } from './request-edit-button';
import { RequestAddButton } from './request-add-button';
import { RequestDeleteButton } from './request-delete-button';

export default function RequestTable({ requests }: { requests: RequestData[] }) {
  return (
    <div className="container mx-auto p-4">
      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Method</TableHead>
            <TableHead className="w-[100px]">Response</TableHead>
            <TableHead>URI</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="w-[80px]">{request.method}</TableCell>
              <TableCell className="w-[100px]">{request.responseCode}</TableCell>
              <TableCell className="max-w-xs truncate">{request.uri}</TableCell>
              <TableCell className="w-[80px]">
                <div className="flex space-x-2">
                  <RequestEditButton request={request} />
                  <RequestDeleteButton request={request} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <RequestAddButton />
    </div>
  );
}
