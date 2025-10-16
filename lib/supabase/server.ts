import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';

import { getServerSupabaseConfig } from './config';

type GenericSupabaseClient = SupabaseClient<any>;

export function createServerClient(): GenericSupabaseClient | null {
  const result = getServerSupabaseConfig();

  if (!result) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Supabase configuration is missing. Returning null server client instance.');
    }
    return null;
  }

  if (result.usedPublicFallback && process.env.NODE_ENV !== 'production') {
    console.warn('Supabase server configuration is missing. Falling back to public environment variables.');
  }

  return createServerComponentClient<any>(
    { cookies },
    {
      supabaseKey: result.config.supabaseKey,
      supabaseUrl: result.config.supabaseUrl
    }
  );
}
