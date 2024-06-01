import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Database } from '@/utils/schema.types';

type Todo = Database['public']['Tables']['todos']['Row'];

type TodoType = {
  data: Todo;
};

const TodoCard = (props: TodoType) => {
  const { data } = props;

  const onDeleteTodo = () => {
    console.log('delete');
  };

  return (
    <section className='w-full flex items-center justify-center px-4 py-20 theme-zinc'>
      <Card className='w-full max-w-xs'>
        <CardContent className='p-2 flex justify-between'>
          <Circle size={15} className='cursor-pointer' />
          <span className='flex ml-1'>{data.title}</span>
          {/* @ts-ignore */}
          <Badge variant={data.list}>{data.list}</Badge>
          {/* @ts-ignore */}
          <Badge variant={data.status}>{data.status}</Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-4 w-4 p-0 focus:outline-none'>
                <span className='sr-only'>Open menu</span>
                <Ellipsis size={20} className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem>View Todo</DropdownMenuItem>
              <DropdownMenuItem>Edit Todo</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </section>
  );
};

export default TodoCard;
