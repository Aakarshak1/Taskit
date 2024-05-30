'use client';

import { usePathname } from 'next/navigation';
import NavBar from '@/components/navbar/Navbar';
import ThemeProvider from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

const Pathname = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <div>
      <section className='max-w-screen-md p-5 mx-auto'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <NavBar />
          {children}
          <Toaster
            richColors
            toastOptions={{
              duration: 2500,
            }}
          />
        </ThemeProvider>
      </section>
    </div>
  );
};

export default Pathname;
