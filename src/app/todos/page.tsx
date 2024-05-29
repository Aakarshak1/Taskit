// add tanstack query convert this to client component
import TodoFormDialog from './TodoDialog';
import { getData } from '@/lib/db';
import { Search, SortFilter } from './Search';
import TodosDataTable from './TodoTable';

const Todos = async ({ searchParams }: { searchParams: { q: string; offset: string } }) => {
  const search = searchParams.q ?? '';
  console.log(search);
  const offset = searchParams.offset ?? 0;
  const data = await getData(search, Number(offset));

  return (
    <main className='flex flex-1 flex-col p-4 md:p-6'>
      <div className='flex justify-between mb-8'>
        <h1 className='font-semibold text-lg md:text-2xl'>Todos</h1>
        <TodoFormDialog formType='create' />
      </div>
      <div className='mb-4 flex justify-between'>
        <Search value={searchParams.q} />
        <SortFilter />
      </div>
      <TodosDataTable data={data} />
    </main>
  );
};

export default Todos;
