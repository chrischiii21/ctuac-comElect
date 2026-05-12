import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ CRITICAL: Supabase Public environment variables are missing!');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Admin client for backend operations
export const getSupabaseAdmin = () => {
  const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.error('❌ CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing!');
  }
  return createClient(supabaseUrl || '', serviceRoleKey || '');
};
