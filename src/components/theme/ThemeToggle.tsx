'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <MenubarMenu>
      <MenubarTrigger className='cursor-pointer'>
        <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        <span className='sr-only'>Toggle theme button</span>
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem className='cursor-pointer' onClick={() => setTheme('light')}>
          Light
        </MenubarItem>
        <MenubarItem className='cursor-pointer' onClick={() => setTheme('dark')}>
          Dark
        </MenubarItem>
        <MenubarItem className='cursor-pointer' onClick={() => setTheme('system')}>
          System
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};

export default ThemeToggle;
