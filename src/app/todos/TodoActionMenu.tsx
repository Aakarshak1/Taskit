'use client';

import { useState, useRef } from 'react';

import { Ellipsis } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import TodoDialog from './TodoDialog';
import DialogItem from './DialogItem';

import { TODO_STATUSES } from '@/utils/constant';
import { Database } from '@/utils/schema.types';

type TodoType = Database['public']['Tables']['todos']['Row'];

type KebabMenuProps = {
  rowData: TodoType;
  updateTodoStatus: (status: string, id: number) => void;
  onViewTodo: (rowData: TodoType) => void;
  onDeleteTodo: (rowData: TodoType) => void;
};

export const formSchema = z.object({
  status: z.string({
    required_error: 'please select status.',
  }),
});

const TodoActionMenu = ({ rowData, updateTodoStatus, onViewTodo, onDeleteTodo }: KebabMenuProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef(null);
  const focusRef = useRef(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: rowData.status,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateTodoStatus(values.status, rowData.id);
    setDropdownOpen(false);
    setHasOpenDialog(false);
    form.reset();
  };

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0 ' ref={dropdownTriggerRef}>
          <span className='sr-only'>Open menu</span>
          <Ellipsis size={20} className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' hidden={hasOpenDialog} sideOffset={5}>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DialogItem triggerChildren='Change Status' onOpenChange={handleDialogItemOpenChange}>
          <DialogTitle className='p-0'>Change Status</DialogTitle>
          <DialogDescription>Change status of your todo</DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <Select onValueChange={field.onChange} defaultValue={rowData.status}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select status for your todo' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='todo'>{TODO_STATUSES.TODO}</SelectItem>
                        <SelectItem value='inprogress'>{TODO_STATUSES.INPROGRESS}</SelectItem>
                        <SelectItem value='done'>{TODO_STATUSES.DONE}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type='button' variant='secondary'>
                    Close
                  </Button>
                </DialogClose>
                <Button size='sm' type='submit'>
                  Confirm
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogItem>
        <DropdownMenuItem onClick={() => onViewTodo(rowData)}>View Todo</DropdownMenuItem>
        <TodoDialog
          onOpenChange={handleDialogItemOpenChange}
          triggerChildren='Edit Todo'
          formType='edit'
          todo={rowData}
        />
        <DropdownMenuItem className='text-red-500' onClick={() => onDeleteTodo(rowData)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoActionMenu;
