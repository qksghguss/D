'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { createClient } from '@/lib/supabase/client';

interface UserMenuProps {
  name?: string | null;
  email?: string | null;
}

export function UserMenu({ name, email }: UserMenuProps): JSX.Element {
  const router = useRouter();
  const supabase = createClient();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    if (supabase) {
      await supabase.auth.signOut();
    }

    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const initials = (name ?? email ?? '사용자')
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-10 w-10 rounded-full border border-slate-200" size="icon" variant="ghost">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="sr-only">사용자 메뉴 열기</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">{name ?? '사용자'}</p>
            <p className="text-xs text-slate-500">{email ?? 'email@example.com'}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 text-slate-700">
          <User className="h-4 w-4" /> 계정 설정
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 text-slate-700">
          <Settings className="h-4 w-4" /> 사용자 설정
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 text-red-600 focus:text-red-600"
          onSelect={handleSignOut}
        >
          <LogOut className="h-4 w-4" /> {isSigningOut ? '로그아웃 중...' : '로그아웃'}
        </DropdownMenuItem>
        {!supabase ? (
          <p className="px-2 pb-2 text-xs text-amber-600">Supabase 구성이 필요합니다.</p>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
