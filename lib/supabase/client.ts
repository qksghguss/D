import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseConfig } from './config';

type GenericSupabaseClient = SupabaseClient<any>;

export function createClient(): GenericSupabaseClient | null {
  const config = getSupabaseConfig();

  if (!config) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Supabase configuration is missing. Returning null client instance.');
    }
    return null;
  }

  return createClientComponentClient<any>({
    supabaseKey: config.supabaseKey,
    supabaseUrl: config.supabaseUrl
  });
}
