import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkSchema() {
  const { data, error } = await supabase.from('students').select('*').limit(1);
  if (error) {
    console.error('Error fetching students:', error);
    return;
  }
  console.log('Sample student record:', data[0]);
  console.log('Columns:', Object.keys(data[0] || {}));
}

checkSchema();
