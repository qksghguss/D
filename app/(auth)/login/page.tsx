import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createServerClient } from '@/lib/supabase/server';

import { LoginForm } from './login-form';

export default async function LoginPage(): Promise<JSX.Element> {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">계정에 로그인</h1>
          <p className="text-sm text-slate-600">Supabase 계정으로 로그인하여 대시보드를 확인하세요.</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-slate-500">
          Supabase 프로젝트가 없나요?{' '}
          <Link className="font-medium text-brand hover:underline" href="https://supabase.com">
            Supabase에서 시작하기
          </Link>
        </p>
      </div>
    </div>
  );
}
