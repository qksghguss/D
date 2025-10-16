export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseKey: string;
}

function readSupabaseUrl(): { publicUrl: string; serverUrl: string } {
  return {
    publicUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    serverUrl: process.env.SUPABASE_URL ?? ''
  };
}

function readSupabaseKey(): { publicKey: string; serverKey: string } {
  return {
    publicKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    serverKey: process.env.SUPABASE_ANON_KEY ?? ''
  };
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const { publicUrl, serverUrl } = readSupabaseUrl();
  const { publicKey, serverKey } = readSupabaseKey();

  const supabaseUrl = publicUrl || serverUrl;
  const supabaseKey = publicKey || serverKey;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return {
    supabaseUrl,
    supabaseKey
  };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

export function missingSupabaseEnvVars(): string[] {
  const missing = new Set<string>();
  const { publicUrl, serverUrl } = readSupabaseUrl();
  const { publicKey, serverKey } = readSupabaseKey();

  if (!publicUrl) {
    missing.add('NEXT_PUBLIC_SUPABASE_URL');
  }

  if (!publicKey) {
    missing.add('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  if (!publicUrl && !serverUrl) {
    missing.add('SUPABASE_URL');
  }

  if (!publicKey && !serverKey) {
    missing.add('SUPABASE_ANON_KEY');
  }

  return Array.from(missing);
}
