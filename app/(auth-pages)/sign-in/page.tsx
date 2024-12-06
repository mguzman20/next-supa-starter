'use client';

import { signInAction } from '@/lib/supabase/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();

  async function onSubmit(data: SignInForm) {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    const res = await signInAction(formData);

    if (res.status === 'error') {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      // redirect to protected page
      router.push('/protected');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex min-w-64 max-w-64 flex-col gap-4"
      >
        <div>
          <h1 className="text-2xl font-medium">Sign in</h1>
          <p className="text-sm text-foreground">
            Don&apos;t have an account?{' '}
            <Link className="font-medium text-foreground underline" href="/sign-up">
              Sign up
            </Link>
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@email.com" {...field} />
              </FormControl>
              <FormDescription>Enter your email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                <Link className="text-xs text-foreground underline" href="/forgot-password">
                  Forgot Password?
                </Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={form.formState.isSubmitting}>
          Sign In
        </Button>
      </form>
    </Form>
  );
}
