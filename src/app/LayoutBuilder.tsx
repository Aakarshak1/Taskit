'use client';

import { usePathname } from 'next/navigation';
import NavBar from '@/components/navbar/Navbar';
import ThemeProvider from '@/components/theme/ThemeProvider';

const Pathname = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <div>
      {pathname === '/login' || pathname === '/todos' ? (
        <section className='max-w-screen-xl p-5 mx-auto'>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <NavBar />
            {children}
          </ThemeProvider>
        </section>
      ) : (
        children
      )}
    </div>
  );
};

export default Pathname;
