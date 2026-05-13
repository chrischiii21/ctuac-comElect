import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkTables() {
  const { data: votes, error: vError } = await supabase.from('votes').select('*').limit(1);
  console.log('Votes sample:', votes?.[0], vError ? 'Error: ' + vError.message : '');

  const { data: manual, error: mError } = await supabase.from('manual_tallies').select('*').limit(1);
  console.log('Manual Tallies sample:', manual?.[0], mError ? 'Error: ' + mError.message : '');
}

checkTables();
