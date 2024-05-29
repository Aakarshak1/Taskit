'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required!').email('Invalid email!'),
  password: z.string().min(1, 'Password is required!').min(8, 'Password must have than 8 characters!'),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      router.push('/');
      toast.error(error?.message ?? 'Unable to Login', {
        position: 'top-right',
      });
    }
    router.push('/');
  };

  return (
    <section className='w-full flex items-center justify-center px-4 py-20 theme-zinc'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='p-5'>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Enter your email below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your email</FormLabel>
                      <FormControl>
                        <Input placeholder='mail@example.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your password' type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter>
                <Button className='w-full mt-3' type='submit'>
                  Login
                </Button>
              </CardFooter>
            </form>
            <p className='text-center text-md text-gray-600 mt-1'>
              Don&apos;t have an account?
              <Link className='text-blue-500 hover:underline ml-1' href='/signup'>
                Sign up
              </Link>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginForm;
