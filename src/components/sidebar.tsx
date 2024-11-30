'use client';

import { BarChart3, Database, Flag, HardDrive } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const menuItems = [
  { icon: BarChart3, label: 'Mock Data', href: '/mock-data' },
  { icon: Database, label: 'Publish Kafka', href: '/publish-kafka' },
  { icon: Flag, label: 'Feature Flags', href: '/feature-flags' },
  { icon: HardDrive, label: 'S3 Bucket', href: '/s3-bucket' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <div className="flex-1" />
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
