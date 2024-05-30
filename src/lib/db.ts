'use server';
import { createClient } from '@/utils/supabase/server';
import { Database } from '@/utils/schema.types';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import { formSchema } from '@/utils/constant';
import { revalidatePath } from 'next/cache';

type TodoType = Database['public']['Tables']['todos']['Row'];
type TodoTypeUpdate = Database['public']['Tables']['todos']['Update'];

export async function createTodo(values: z.infer<typeof formSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const res = await supabase.from('todos').insert({ ...values, is_complete: false, user_id: user?.id });
  revalidatePath('/');
  return res;
}

export async function updateTodo(value: TodoTypeUpdate) {
  const supabase = createClient();

  const res = await supabase.from('todos').upsert({
    ...value,
  });

  return res;
}

export async function deleteTodo(todoId: string | number) {
  const supabase = createClient();

  const res = await supabase.from('todos').delete().eq('id', Number(todoId));
  revalidatePath('/todos', 'page');
  return res;
}

export async function getData(search: string, offset: number) {
  const supabase = createClient();
  if (search) {
    // Partial search implement
    const { data, error } = await supabase.rpc('search_todos', { prefix: `'${search}'` }).limit(10);
    console.log({ data, error });
    return data;
  }

  const { data, error } = await supabase
    .from('todos')
    .select()
    .order('inserted_at', {
      ascending: false,
    })
    .limit(10);

  if (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return data;
}

export async function getDataByID(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase.from('todos').select().eq('id', `${id}`);

  if (error) {
    notFound();
  }
  return data;
}
