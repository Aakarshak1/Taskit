import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import NavBar from '@/components/navbar/Navbar';
import ThemeProvider from '@/components/theme/ThemeProvider';
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
        <section className='max-w-screen-xl p-5 mx-auto'>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <NavBar />
            {children}
          </ThemeProvider>
        </section>
      </body>
    </html>
  );
}
