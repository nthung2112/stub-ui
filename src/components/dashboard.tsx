import { Header } from '@/components/header';
import { DashboardSidebar } from '@/components/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface DashboardProps {
  children: React.ReactNode;
}

export function Dashboard({ children }: DashboardProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">\
          <Header />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
