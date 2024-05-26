import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import Layout from '@/app/LayoutBuilder';

import { cn } from '@/lib/utils';

import '@/styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Task It',
  description: 'To Do it? taskIt',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
