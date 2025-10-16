export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseKey: string;
}

interface SupabaseEnv {
  url: string;
  key: string;
}

export interface ServerSupabaseConfigResult {
  config: SupabaseConfig;
  usedPublicFallback: boolean;
}

function normalizeEnvValue(value: string | undefined): string {
  return (value ?? '').trim();
}

function readPublicSupabaseEnv(): SupabaseEnv {
  return {
    url: normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL),
    key: normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  };
}

function readServerSupabaseEnv(): SupabaseEnv {
  return {
    url: normalizeEnvValue(process.env.SUPABASE_URL),
    key: normalizeEnvValue(process.env.SUPABASE_ANON_KEY)
  };
}

export function getClientSupabaseConfig(): SupabaseConfig | null {
  const { url, key } = readPublicSupabaseEnv();

  if (!url || !key) {
    return null;
  }

  return {
    supabaseUrl: url,
    supabaseKey: key
  };
}

export function getServerSupabaseConfig(): ServerSupabaseConfigResult | null {
  const publicEnv = readPublicSupabaseEnv();
  const serverEnv = readServerSupabaseEnv();

  const supabaseUrl = serverEnv.url || publicEnv.url;
  const supabaseKey = serverEnv.key || publicEnv.key;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  const usedPublicUrl = !serverEnv.url && Boolean(publicEnv.url);
  const usedPublicKey = !serverEnv.key && Boolean(publicEnv.key);
  const usedPublicFallback = usedPublicUrl || usedPublicKey;

  return {
    config: {
      supabaseUrl,
      supabaseKey
    },
    usedPublicFallback
  };
}

export function isSupabaseConfigured(): boolean {
  return getServerSupabaseConfig() !== null;
}

export function missingSupabaseEnvVars(): string[] {
  const missing = new Set<string>();
  const publicEnv = readPublicSupabaseEnv();
  const serverEnv = readServerSupabaseEnv();

  if (!publicEnv.url) {
    missing.add('NEXT_PUBLIC_SUPABASE_URL');
  }

  if (!publicEnv.key) {
    missing.add('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  if (!serverEnv.url) {
    missing.add('SUPABASE_URL');
  }

  if (!serverEnv.key) {
    missing.add('SUPABASE_ANON_KEY');
  }

  return Array.from(missing);
}
