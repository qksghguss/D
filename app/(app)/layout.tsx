import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { AppHeader } from '@/components/app-header';
import { createServerClient } from '@/lib/supabase/server';

export default async function AppLayout({ children }: { children: ReactNode }): Promise<JSX.Element> {
  const supabase = createServerClient();

  if (!supabase) {
    redirect('/login');
  }

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader userEmail={user.email} userName={user.user_metadata?.full_name ?? user.email} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 lg:px-6">
        {children}
      </main>
    </div>
  );
}
