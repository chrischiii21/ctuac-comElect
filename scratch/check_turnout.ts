import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkTurnout() {
  // 1. Get online sections
  const { data: onlineSections } = await supabase.from('sections').select('id').eq('is_manual', false);
  const onlineSectionIds = onlineSections.map(s => s.id);

  // 2. Count students in online sections
  const { count: onlineStudentsCount } = await supabase.from('students').select('*', { count: 'exact', head: true }).in('section_id', onlineSectionIds);

  // 3. Count voted students in online sections
  const { count: onlineVotedCount } = await supabase.from('students').select('*', { count: 'exact', head: true }).in('section_id', onlineSectionIds).eq('has_voted', true);

  // 4. Count all students
  const { count: totalStudents } = await supabase.from('students').select('*', { count: 'exact', head: true });
  const { count: totalVoted } = await supabase.from('students').select('*', { count: 'exact', head: true }).eq('has_voted', true);

  console.log('Online Sections Count:', onlineSections.length);
  console.log('Online Students Count:', onlineStudentsCount);
  console.log('Online Voted Count:', onlineVotedCount);
  console.log('Total Students Count:', totalStudents);
  console.log('Total Voted Count:', totalVoted);
}

checkTurnout();
