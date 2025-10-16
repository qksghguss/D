import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Consumable Management Portal',
  description: 'Manage consumables with a modern Supabase-powered dashboard.'
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen bg-slate-50`}>{children}</body>
    </html>
  );
}
