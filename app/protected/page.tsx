import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-12">
      <div className="w-full">
        <div className="flex items-center gap-3 rounded-md bg-accent p-3 px-5 text-sm text-foreground">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated user
        </div>
        <div className="my-4 flex items-center gap-3 rounded-md bg-accent p-3 px-5 text-sm text-foreground">
          <InfoIcon size="16" strokeWidth={2} />
          Go to supabase and create a table called &quot;notes&quot; with the following columns: id,
          user_id, title, body
        </div>
      </div>
      <Button size="sm" variant="default">
        <Link href={'/notes'}>Go to notes (server)</Link>
      </Button>
      <Button size="sm" variant="outline">
        <Link href={'/notes-client'}>Go to notes (client)</Link>
      </Button>
      <div className="flex flex-col items-start gap-2">
        <h2 className="mb-4 text-2xl font-bold">Your user details</h2>
        <pre className="max-h-32 overflow-auto rounded border p-3 font-mono text-xs">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
