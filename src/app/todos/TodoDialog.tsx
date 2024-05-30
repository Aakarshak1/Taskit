'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Database } from '@/utils/schema.types';
import { TODO_STATUSES, LISTS, formSchema } from '@/utils/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTodo, updateTodo } from '@/lib/db';
import { toast } from 'sonner';

type Todos = Database['public']['Tables']['todos']['Row'];

type TodoDialogProps = {
  formType: 'edit' | 'create';
  todo?: Todos;
};

export default function TodoFormDialog({ formType, todo }: TodoDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo?.title ?? '',
      description: todo?.description ?? '',
      status: todo?.status ?? 'inprogress',
      list: todo?.list ?? 'personal',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const _todo = {
      ...values,
      id: todo?.id,
      is_complete: todo?.is_complete,
      user_id: todo?.user_id,
      inserted_at: todo?.inserted_at,
    };

    const { data, error } = formType === 'edit' ? await updateTodo(_todo) : await createTodo(values);

    if (error) {
      toast.error(`Unable to ${formType === 'edit' ? 'update' : 'create'} todo`, {
        position: 'top-right',
      });
    }

    toast.success(`Todo ${formType === 'edit' ? 'updated' : 'created'} successfully`, {
      position: 'top-right',
    });

    form.reset();
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(_open) => {
        setOpen(_open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          {formType === 'edit' && 'Edit todo'}
          {formType === 'create' && 'Create todo'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {formType === 'edit' && 'Edit todo'}
            {formType === 'create' && 'Create todo'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>
                    Title
                    <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='title of your todo' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description
                    <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder='Write little bit about your todo' className='resize-none' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            <FormField
              control={form.control}
              name='list'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select status for your todo' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='personal'>{LISTS.PERSONAL}</SelectItem>
                      <SelectItem value='work'>{LISTS.WORK}</SelectItem>
                      <SelectItem value='shopping'>{LISTS.SHOPPING}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit'>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
