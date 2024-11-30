'use client';

import { BarChart3, Database, Flag, HardDrive } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavUser } from './nav-user';

const menuItems = [
  { icon: BarChart3, label: 'Mock Data', href: '/mock-data' },
  { icon: Database, label: 'Publish Kafka', href: '/publish-kafka' },
  { icon: Flag, label: 'Feature Flags', href: '/feature-flags' },
  { icon: HardDrive, label: 'S3 Bucket', href: '/s3-bucket' },
];

const user = {
  name: "Admin",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className='flex flex-row items-center p-2 relative pb-1'>
        <h2 className="text-lg font-semibold p-2">DB</h2>
        <div className="flex-1" />
        {open && <SidebarTrigger />}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className='p-2'>
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
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
