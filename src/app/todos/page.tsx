import TodoFormDialog from './TodoDialog';
import { getData } from '@/lib/db';
import { Search } from './Search';
import TodosDataTable from './TodoTable';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const Todos = async ({ searchParams }: { searchParams: { q: string } }) => {
  const search = searchParams.q ?? '';
  const data = await getData();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  return (
    <main className='flex flex-1 flex-col p-4 md:p-6'>
      <div className='flex justify-between mb-8'>
        <h1 className='font-semibold text-lg md:text-2xl'>Todos</h1>
        <TodoFormDialog formType='create' />
      </div>
      <div className='mb-4 flex justify-between'>
        <Search value={search} />
      </div>
      <TodosDataTable data={data} />
    </main>
  );
};

export default Todos;
