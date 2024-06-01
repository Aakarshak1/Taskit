import Link from 'next/link';
import { Github } from 'lucide-react';

import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { createClient } from '@/utils/supabase/server';
import ThemeToggle from '@/components/theme/ThemeToggle';
import UserModal from './UserModal';

const NavBar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
          <MenubarMenu>
            <MenubarTrigger className='cursor-pointer'>
              <a href='https://github.com/Aakarshak1/Taskit' target='_blank'>
                <Github />
              </a>
            </MenubarTrigger>
          </MenubarMenu>
          {user ? <UserModal user={user} /> : null}
          <ThemeToggle />
        </MenubarMenu>
      </div>
    </Menubar>
  );
};
export default NavBar;
