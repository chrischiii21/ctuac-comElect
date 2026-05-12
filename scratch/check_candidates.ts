import { supabase } from '../src/lib/supabase';

async function testDuplicate() {
  const { data, error } = await supabase.from('students').insert([
    { student_id: '1', full_name: 'Test Duplicate', section_id: '55e0b8a8-b22b-4885-80db-5b92594fd3c3' }
  ]);
  console.log('Error:', error);
}

testDuplicate();
