'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface MockDataItem {
  id: string;
  key: string;
  data: string;
}

export function ManageMockData() {
  const [mockDataItems, setMockDataItems] = useState<MockDataItem[]>([]);
  const [dataKey, setDataKey] = useState('');
  const [mockData, setMockData] = useState('');
  const [editingItem, setEditingItem] = useState<MockDataItem | null>(null);

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const savedMockData = localStorage.getItem('mockData');
    if (savedMockData) {
      setMockDataItems(JSON.parse(savedMockData));
    }
  }, []);

  const saveMockData = () => {
    if (editingItem) {
      // Update existing item
      const updatedItems = mockDataItems.map((item) =>
        item.id === editingItem.id ? { ...item, key: dataKey, data: mockData } : item
      );
      setMockDataItems(updatedItems);
      setEditingItem(null);
      toast({ title: 'Mock Data Updated', description: `Data updated for key: ${dataKey}` });
    } else {
      // Add new item
      const newItem: MockDataItem = {
        id: Date.now().toString(),
        key: dataKey,
        data: mockData,
      };
      setMockDataItems([...mockDataItems, newItem]);
      toast({ title: 'Mock Data Saved', description: `New data saved with key: ${dataKey}` });
    }
    setDataKey('');
    setMockData('');
    localStorage.setItem('mockData', JSON.stringify(mockDataItems));
  };

  const editItem = (item: MockDataItem) => {
    setEditingItem(item);
    setDataKey(item.key);
    setMockData(item.data);
  };

  const deleteItem = (id: string) => {
    const updatedItems = mockDataItems.filter((item) => item.id !== id);
    setMockDataItems(updatedItems);
    localStorage.setItem('mockData', JSON.stringify(updatedItems));
    toast({ title: 'Mock Data Deleted', description: 'Item has been removed' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Mock Data</h2>

      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDataItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.key}</TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{item.key}</DialogTitle>
                        </DialogHeader>
                        <pre className="mt-4 whitespace-pre-wrap bg-muted p-4 rounded-md">
                          {item.data}
                        </pre>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" onClick={() => editItem(item)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => deleteItem(item.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="data-key">Data Key</Label>
          <Input
            id="data-key"
            value={dataKey}
            onChange={(e) => setDataKey(e.target.value)}
            placeholder="Enter a key for this mock data"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mock-data">Mock Data (JSON)</Label>
          <Textarea
            id="mock-data"
            value={mockData}
            onChange={(e) => setMockData(e.target.value)}
            placeholder="Enter your mock data in JSON format"
            rows={10}
          />
        </div>
        <Button onClick={saveMockData}>
          {editingItem ? 'Update Mock Data' : 'Save Mock Data'}
        </Button>
      </div>
    </div>
  );
}
