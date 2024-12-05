import { signOutAction } from '@/lib/supabase/actions';
import { hasEnvVars } from '@/lib/supabase/check-env-vars';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { createClient } from '@/lib/supabase/server';

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex items-center gap-4">
          <div>
            <Badge variant={'default'} className="pointer-events-none font-normal">
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={'outline'}
              disabled
              className="pointer-events-none cursor-none opacity-75"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={'default'}
              disabled
              className="pointer-events-none cursor-none opacity-75"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOutAction}>
        <Button type="submit" size="sm" variant={'outline'}>
          Sign out
        </Button>
      </form>
      <Button asChild size="sm" variant="default">
        <Link href="/protected">Perfil</Link>
      </Button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={'outline'}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={'default'}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
