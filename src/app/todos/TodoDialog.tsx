'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { revalidatePath } from 'next/cache';
import { Database } from '@/utils/schema.types';
import { TODO_STATUSES, LISTS } from '@/utils/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
const supabase = createClient();

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  description: z.string().min(1, {
    message: 'Description is required.',
  }),
  status: z.string({
    required_error: 'please select status.',
  }),
  list: z.string().optional(),
});

type Todos = Database['public']['Tables']['todos']['Row'];

type TodoDialogProps = {
  formType: 'edit' | 'create';
  todo?: Todos;
};

export default function TodoFormDialog({ formType, todo }: TodoDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // const supabase = useSupabaseClient<Database>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'in',
      list: '0',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // ✅ This will be type-safe and validated.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('todos').insert({ ...values, is_complete: false, user_id: user?.id });

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
        <Button variant='outline'>
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
