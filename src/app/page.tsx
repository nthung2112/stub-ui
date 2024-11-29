import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ManageMockData } from "./components/manage-mock-data"
import { FeatureFlags } from "./components/feature-flags"
import { PublishKafkaMessage } from "./components/publish-kafka-message"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="mock-data" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mock-data">Manage Mock Data</TabsTrigger>
          <TabsTrigger value="feature-flags">Feature Flags</TabsTrigger>
          <TabsTrigger value="kafka-message">Publish Kafka Message</TabsTrigger>
        </TabsList>
        <TabsContent value="mock-data" className="space-y-4">
          <ManageMockData />
        </TabsContent>
        <TabsContent value="feature-flags">
          <FeatureFlags />
        </TabsContent>
        <TabsContent value="kafka-message">
          <PublishKafkaMessage />
        </TabsContent>
      </Tabs>
    </div>
  )
}

