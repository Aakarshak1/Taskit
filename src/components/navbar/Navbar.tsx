'use client';

import Link from 'next/link';
import { Github, Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

const NavBar = () => {
  const { setTheme } = useTheme();
  return (
    <Menubar className='flex justify-between'>
      <div className='flex'>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href='/'>Home</Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href='/todos'>Todos</Link>
          </MenubarTrigger>
        </MenubarMenu>
      </div>
      <div className='flex items-center'>
        <MenubarMenu>
          {/* <MenubarMenu>
            <MenubarTrigger className='cursor-pointer'>
              <User />
            </MenubarTrigger>
          </MenubarMenu> */}

          <MenubarMenu>
            <MenubarTrigger className='cursor-pointer'>
              <a href='https://github.com/Aakarshak1/Taskit' target='_blank'>
                <Github />
              </a>
            </MenubarTrigger>
          </MenubarMenu>

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
        </MenubarMenu>
      </div>
    </Menubar>
  );
};
export default NavBar;
