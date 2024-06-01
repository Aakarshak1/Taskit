'use client';

import React from 'react';
import { CircleUserIcon, LogOut } from 'lucide-react';
import { type User as UserType } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

const UserModal = ({ user }: { user: UserType }) => {
  const supabase = createClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error?.message ?? 'Unable to Logout', {
        position: 'top-right',
      });
    }

    window.location.replace('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
          <CircleUserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-40'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem className='cursor-pointer'>{user.user_metadata.username}</DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>{user.user_metadata.email}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={signOut}>
          <LogOut className='mr-1' size={20} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserModal;
