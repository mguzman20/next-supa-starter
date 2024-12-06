'use server';

import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return { status: 'error', message: 'Email and password are required' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}api/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return { status: 'error', message: 'Could not sign up' };
  } else {
    return { status: 'success', message: 'Check your email for a confirmation link' };
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { status: 'error', message: 'Could not sign in' };
  }

  return { status: 'success', message: 'Signed in' };
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return { status: 'error', message: 'Email is required' };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/api/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return { status: 'error', message: 'Could not reset password' };
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return { status: 'success', message: 'Check your email for a password reset link' };
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    return { status: 'error', message: 'Password and confirm password are required' };
  }

  if (password !== confirmPassword) {
    return { status: 'error', message: 'Passwords do not match' };
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return { status: 'error', message: 'Could not update password' };
  }

  return { status: 'success', message: 'Password updated' };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/');
};
