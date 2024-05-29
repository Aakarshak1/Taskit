import { createClient } from '@/utils/supabase/server';

export async function getData(search: string, offset: number) {
  const supabase = createClient();
  if (search) {
    // Partial search implement
    const { data, error } = await await supabase.rpc('search_todos', { prefix: `'${search}'` }).limit(10);

    console.log({ data, error });

    return data;
  }
  const { data, error } = await supabase.from('todos').select().limit(10);

  if (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return data;
}
