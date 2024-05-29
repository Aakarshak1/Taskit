'use client';

import { useTransition, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, ChevronDownIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { TODO_STATUSES } from '@/utils/constant';

function Spinner() {
  return (
    <div className='absolute right-0 top-0 bottom-0 flex items-center justify-center'>
      <svg
        className='animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  );
}

export function Search(props: { value?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (value === undefined) {
      return;
    } else if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      // All navigation are transitions automatically
      // But wrapping this allow us to observe the pending state
      router.replace(`/todos?${params.toString()}`);
    });
  }, [router, value]);

  return (
    <div className='w-1/2 relative'>
      <SearchIcon className='absolute left-2.5 top-3 h-4 w-4 text-gray-500' />
      <Input
        ref={inputRef}
        value={value ?? ''}
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
        spellCheck={false}
        className='w-full bg-white shadow-none appearance-none pl-8'
        placeholder='Search title...'
      />
      {isPending && <Spinner />}
    </div>
  );
}

export function SortFilter() {
  return (
    <div className=''>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='ml-auto'>
            Sort by <ChevronDownIcon className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuCheckboxItem>{TODO_STATUSES.TODO}</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>{TODO_STATUSES.INPROGRESS}</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>{TODO_STATUSES.DONE}</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
