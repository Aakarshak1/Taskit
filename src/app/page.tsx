import Image from 'next/image';
import userTodo from '../../public/userTodo.png';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between min-h-[75vh] py-4'>
      <div className='text-center'>
        <h1 className='text-3xl md:text-6xl font-bold mt-14 mb-5'>Task-it</h1>
        <h3 className='text-xl md:text-2xl font-bold mt-5 mb-5'> Your Tasks, Simplified.</h3>
        <p className='text-xl'>Productivity app to manage your task effortlessly</p>
        <Image
          className='flex justify-center ml-1'
          src={userTodo}
          alt='User clearing todo'
          width={600}
          height={400}
          placeholder='blur'
        />
        <p className='mt-8'>
          Task-it is a powerful task management tool built with Next.js, Tailwind CSS, and TypeScript, enabling you to
          effortlessly create, edit, update, and delete tasks.
        </p>
      </div>
    </main>
  );
}
