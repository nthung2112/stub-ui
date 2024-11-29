import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ManageMockData } from './components/manage-mock-data';
import { FeatureFlags } from './components/feature-flags';
import { PublishKafkaMessage } from './components/publish-kafka-message';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <Tabs defaultValue="mock-data" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mock-data">Mock Data</TabsTrigger>
          <TabsTrigger value="kafka-message">Publish Kafka</TabsTrigger>
          <TabsTrigger value="feature-flags">Feature Flags</TabsTrigger>
          <TabsTrigger value="s3-bucket">S3 Bucket</TabsTrigger>
        </TabsList>
        <TabsContent value="mock-data" className="space-y-4">
          <ManageMockData />
        </TabsContent>
        <TabsContent value="kafka-message">
          <PublishKafkaMessage />
        </TabsContent>
        <TabsContent value="feature-flags">
          <FeatureFlags />
        </TabsContent>
        <TabsContent value="s3-bucket">s3 bucket</TabsContent>
      </Tabs>
    </div>
  );
}
