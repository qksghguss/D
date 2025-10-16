import { cn } from '@/lib/utils';
import { missingSupabaseEnvVars } from '@/lib/supabase/config';

interface MissingSupabaseConfigProps {
  className?: string;
}

export function MissingSupabaseConfig({ className }: MissingSupabaseConfigProps): JSX.Element {
  const missingEnvVars = missingSupabaseEnvVars();

  return (
    <div
      className={cn(
        'w-full max-w-xl space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-sm',
        className
      )}
    >
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Supabase 환경 변수가 필요합니다</h1>
        <p className="text-sm text-amber-800">
          Supabase 프로젝트 연결 정보가 설정되지 않아 인증 기능을 사용할 수 없습니다. 아래 환경
          변수를 <code>.env.local</code> 파일에 추가한 후 다시 시도하세요.
        </p>
      </div>
      <div className="rounded-xl bg-white p-4 text-left text-sm text-slate-800 shadow-inner">
        <code className="block whitespace-pre-wrap">
          {`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
        </code>
        <p className="mt-3 text-xs text-slate-500">
          이미 <code>SUPABASE_URL</code> 및 <code>SUPABASE_ANON_KEY</code>를 사용 중이라면 동일한 값을
          위 변수에도 복사해 주세요.
        </p>
        {missingEnvVars.length > 0 ? (
          <p className="mt-3 text-xs font-medium text-amber-700">
            현재 누락된 변수: {missingEnvVars.join(', ')}
          </p>
        ) : null}
      </div>
    </div>
  );
}
