import Image from 'next/image';
import Link from 'next/link';
import userTodo from '../../public/userTodo.png';

import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/todos');
  }

  return (
    <main className='flex flex-col items-center justify-between min-h-[80vh] py-2'>
      <div className='text-center'>
        <h1 className='text-3xl md:text-6xl font-bold mt-7 mb-3'>Task-it</h1>
        <h3 className='text-xl md:text-2xl font-bold mb-5'> Your Tasks, Simplified.</h3>
        <p className='text-xl'>Productivity app to manage your task effortlessly</p>
        <Link href={'/login'}>
          <Button className=' mt-4 mb-2'>
            <span className='mr-1'>Create Your First Task</span>
            <ChevronRight />
          </Button>
        </Link>
        <div className='flex justify-center items-center'>
          <Image src={userTodo} alt='User clearing todo' width={600} height={400} placeholder='blur' />
        </div>
      </div>
      <div className='mt-4 flex justify-center items-center w-7/12 text-center'>
        Task-it is a powerful task management tool built with Next.js, Tailwind CSS, and TypeScript, enabling you to
        effortlessly create, edit, update, and delete tasks.
      </div>
    </main>
  );
}
