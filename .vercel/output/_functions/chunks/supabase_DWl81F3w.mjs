import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://drrtasomasdmqmtquzfn.supabase.co";
const supabaseAnonKey = "sb_publishable_KoncWb4ubH1LG6aV79Fqig_sQHLN6_g";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const getSupabaseAdmin = () => {
  const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycnRhc29tYXNkbXFtdHF1emZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU2NTI4NSwiZXhwIjoyMDk0MTQxMjg1fQ.Du5y7I0ont-qIqyHkAxS1bRyqyBrKt9MNeuqpOD8x2s";
  return createClient(supabaseUrl, serviceRoleKey);
};

export { getSupabaseAdmin as g, supabase as s };
