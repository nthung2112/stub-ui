import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from './main-sidebar';
import { Header } from './header';

interface DashboardProps {
  children: React.ReactNode;
  title: string;
}

export function MainLayout({ children, title }: DashboardProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <Header title={title} />
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
