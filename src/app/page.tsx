import Image from 'next/image';
import userTodo from '../../public/userTodo.png';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between min-h-[80vh] py-2'>
      <div className='text-center'>
        <h1 className='text-3xl md:text-6xl font-bold mt-7 mb-3'>Task-it</h1>
        <h3 className='text-xl md:text-2xl font-bold mb-5'> Your Tasks, Simplified.</h3>
        <p className='text-xl'>Productivity app to manage your task effortlessly</p>
        <div className='flex justify-center items-center'>
          <Image src={userTodo} alt='User clearing todo' width={600} height={400} placeholder='blur' />
        </div>
      </div>
      <div className='mt-4 flex justify-center items-center w-7/12 text-center'>
        Task-it is a powerful task management tool built with Next.js, Tailwind CSS, and TypeScript, enabling you to
        effortlessly create, edit, update, and delete tasks.
      </div>
    </main>
  );
}
