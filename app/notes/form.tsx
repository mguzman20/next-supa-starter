'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export default function NotesForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          title: values.title,
          body: values.body,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      console.log(error);
      return;
    } else {
      console.log(data);
      toast('Nota creada');
      form.reset();
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="Estudiar..." {...field} />
              </FormControl>
              <FormDescription>Escribe un titulo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido</FormLabel>
              <FormControl>
                <Input placeholder="Estudiar..." {...field} />
              </FormControl>
              <FormDescription>Escribe el contenido.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
