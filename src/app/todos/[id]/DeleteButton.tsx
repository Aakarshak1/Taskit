'use client';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { deleteTodo } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const onClickDeleteTodo = async () => {
    const { error } = await deleteTodo(id);

    if (error) {
      toast.error(`Unable to delete todo`, {
        position: 'top-right',
      });
    }

    toast.success('Todo deleted Successfully', {
      position: 'top-right',
    });

    router.replace('/todos');
  };

  return (
    <Button variant='outline' size='icon' className='ml-2' onClick={onClickDeleteTodo}>
      <Trash className='text-red-600' />
    </Button>
  );
};

export default DeleteButton;
