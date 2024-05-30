import { Badge } from '@/components/ui/badge';
import TodoDialog from '../TodoDialog';
import { getDataByID } from '@/lib/db';
import { notFound } from 'next/navigation';
import DeleteButton from './DeleteButton';

type SingleTodoProps = {
  params: { id: string };
};

const SingleTodo = async ({ params }: SingleTodoProps) => {
  const data = await getDataByID(Number(params.id));
  if (!data || data?.length <= 0) {
    notFound();
  }

  const todo = data?.[0];

  return (
    <div className='flex flex-col'>
      <div className=' flex justify-end my-4'>
        <TodoDialog formType='edit' todo={todo} />
        <DeleteButton id={params.id} />
      </div>
      <div className='flex flex-col items-center justify-between min-h-[75vh] py-4'>
        <div className='w-full border'>
          <div className='flex justify-between items-center py-4 px-3 flex-wrap border'>
            <h2 className='text-xl font-semibold p-2'>{todo.title}</h2>
            <div>
              <p className='p-2'>{new Date(todo.inserted_at).toLocaleString()}</p>
              {/* @ts-ignore */}
              <Badge variant={todo.status}>{todo.status}</Badge>
              {/* @ts-ignore */}
              <Badge variant={todo.list}>{todo.list}</Badge>
            </div>
          </div>
          <div className=''>
            <p className='w-full p-5'>{todo.description}</p>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default SingleTodo;
