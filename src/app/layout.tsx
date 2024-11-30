import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { ModalProvider } from '@/contexts/modal-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'A simple dashboard with sidebar navigation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ModalProvider>
          <div className="min-h-screen bg-background">
            {children}
            <Toaster />
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
