import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseConfig } from './config';

type GenericSupabaseClient = SupabaseClient<any, any, any, any, any>;

export function createServerClient(): GenericSupabaseClient | null {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  return createServerComponentClient(
    { cookies },
    {
      supabaseKey: config.supabaseKey,
      supabaseUrl: config.supabaseUrl
    }
  );

export function createServerClient() {
  return createServerComponentClient({ cookies });
}
