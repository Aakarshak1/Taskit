'use client';

import { useTransition, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { TODO_STATUSES } from '@/utils/constant';

const SortDataDropdown = ({ sortValue }: { sortValue: string }) => {
  const router = useRouter();
  const [value, setValue] = useState(sortValue);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (value === undefined) {
      return;
    } else if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }

    startTransition(() => {
      // All navigation are transitions automatically
      // But wrapping this allow us to observe the pending state
      router.replace(`/todos?${params.toString()}`);
    });
  }, [router, value]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='ml-auto'>
            Sort first <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuCheckboxItem
            key={TODO_STATUSES.TODO}
            checked={value === 'todo'}
            onCheckedChange={() => setValue('todo')}
          >
            {TODO_STATUSES.TODO}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key={TODO_STATUSES.INPROGRESS}
            checked={value === 'inprogress'}
            onCheckedChange={() => setValue('inprogress')}
          >
            {TODO_STATUSES.INPROGRESS}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key={TODO_STATUSES.DONE}
            checked={value === 'done'}
            onCheckedChange={() => setValue('done')}
          >
            {TODO_STATUSES.DONE}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortDataDropdown;
