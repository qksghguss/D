import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseConfig } from './config';

type GenericSupabaseClient = SupabaseClient<any, any, any, any, any>;

export function createClient(): GenericSupabaseClient | null {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  return createClientComponentClient({
    supabaseKey: config.supabaseKey,
    supabaseUrl: config.supabaseUrl
  });
}
