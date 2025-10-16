import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

import { UserMenu } from './user-menu';

const NAV_ITEMS = [
  { label: '대시보드', href: '/' },
  { label: '재고 현황', href: '/inventory' },
  { label: '보고서', href: '/reports' }
];

export interface AppHeaderProps {
  userName?: string | null;
  userEmail?: string | null;
}

export function AppHeader({ userName, userEmail }: AppHeaderProps): JSX.Element {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2 text-lg font-semibold text-slate-900" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 font-bold text-brand">
              CM
            </span>
            <span className="hidden sm:inline">Consumable Manager</span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-900"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>탐색</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <UserMenu email={userEmail} name={userName} />
        </div>
      </div>
    </header>
  );
}
