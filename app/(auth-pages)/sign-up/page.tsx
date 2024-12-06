'use client';

import { signUpAction } from '@/lib/supabase/actions';
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
import { SmtpMessage } from '../smtp-message';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function Signup() {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpForm) {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    const res = await signUpAction(formData);

    if (res.status === 'error') {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex min-w-64 max-w-64 flex-col gap-4"
      >
        <div>
          <h1 className="text-2xl font-medium">Sign up</h1>
          <p className="text text-sm text-foreground">
            Already have an account?{' '}
            <Link className="font-medium text-primary underline" href="/sign-in">
              Sign in
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
              <FormDescription>Enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={form.formState.isSubmitting}>
          Sign Up
        </Button>
      </form>
      <SmtpMessage />
    </Form>
  );
}
