import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseConfig } from './config';

type GenericSupabaseClient = SupabaseClient<any>;

export function createServerClient(): GenericSupabaseClient | null {
  const config = getSupabaseConfig();

  if (!config) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Supabase configuration is missing. Returning null server client instance.');
    }
    return null;
  }

  return createServerComponentClient<any>(
    { cookies },
    {
      supabaseKey: config.supabaseKey,
      supabaseUrl: config.supabaseUrl
    }
  );
}
