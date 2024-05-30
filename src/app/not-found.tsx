import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className='flex h-screen items-center justify-center'>
      <h1 className='text-4xl font-bold'> 404 </h1>
      <div className='ml-2'>| This page was not found</div>
      <Link href={'/'}>
        <Button variant='link' className='mr-1'>
          Return home{' '}
        </Button>
      </Link>
    </main>
  );
}
