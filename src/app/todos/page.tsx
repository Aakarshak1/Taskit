import TodoFormDialog from './TodoDialog';
import { getData } from '@/lib/db';
import { Search } from './Search';
import TodosDataTable from './TodoTable';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SortDataDropdown from './SortDataDropdown';

import { Database } from '@/utils/schema.types';
type TodoType = Database['public']['Tables']['todos']['Row'];

const sortData = async (data: TodoType[], sortOption?: string) => {
  if (!sortOption) return data;

  const sortFunctions: Record<string, (a: TodoType, b: TodoType) => number> = {
    todo: (a: TodoType, b: TodoType) => {
      const statusA = a.status === 'todo' ? 0 : 1;
      const statusB = b.status === 'todo' ? 0 : 1;
      return statusA - statusB;
    },
    inprogress: (a: TodoType, b: TodoType) => {
      const statusA = a.status === 'inprogress' ? 0 : 1;
      const statusB = b.status === 'inprogress' ? 0 : 1;
      return statusA - statusB;
    },
    done: (a: TodoType, b: TodoType) => {
      const statusA = a.status === 'done' ? 0 : 1;
      const statusB = b.status === 'done' ? 0 : 1;
      return statusA - statusB;
    },
  };

  return [...data].sort(sortFunctions[sortOption]);
};

const Todos = async ({ searchParams }: { searchParams: { q: string; sort: string } }) => {
  const search = searchParams.q ?? '';
  const sortValue = searchParams.sort ?? '';
  let data = await getData();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  if (sortValue !== '') {
    data = await sortData(data, sortValue);
  }

  return (
    <main className='flex flex-1 flex-col p-4 md:p-6'>
      <div className='flex justify-between mb-8'>
        <h1 className='font-semibold text-lg md:text-2xl'>Todos</h1>
        <TodoFormDialog formType='create' />
      </div>
      <div className='mb-4 flex justify-between'>
        <Search value={search} />
        <SortDataDropdown sortValue={sortValue} />
      </div>
      <TodosDataTable data={data} />
    </main>
  );
};

export default Todos;
