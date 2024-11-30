import { MainLayout } from '@/components/main-layout';
import { getAllRequests } from '@/app/mock-data/action';
import RequestTable from './request-table';

export default async function Page() {
  const requests = await getAllRequests();

  return (
    <MainLayout title="Request Manager">
      <RequestTable requests={requests} />
    </MainLayout>
  );
}
