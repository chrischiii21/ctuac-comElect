import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log('🚀 Seeding Election Data...');

  // 1. Clean up existing data (Optional, remove if you want to keep data)
  // await supabase.from('candidates').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // 2. Add Sample Candidates
  const candidates = [
    { name: 'Marcus Aurelius', position: 'President' },
    { name: 'Seneca the Younger', position: 'Vice President' },
    { name: 'Zeno of Citium', position: 'CAS Senator' },
    { name: 'Epictetus', position: 'BSIT HR' },
  ];

  const { error: cError } = await supabase.from('candidates').upsert(candidates, { onConflict: 'name' });
  if (cError) console.error('Error seeding candidates:', cError);
  else console.log('✅ Candidates added.');

  // 3. Add a Sample Section
  const { data: section, error: sError } = await supabase
    .from('sections')
    .insert([{ name: 'BSIT-4A' }])
    .select()
    .single();

  if (sError) {
    if (sError.code === '23505') {
        console.log('ℹ️ Sample section already exists.');
    } else {
        console.error('Error seeding section:', sError);
    }
  } else {
    console.log(`✅ Section ${section.name} created.`);
    console.log(`🔗 Voting URL: http://localhost:4321/section/${section.token}`);

    // 4. Add Sample Students to that Section
    const students = [
      { student_id: '2021-0001', full_name: 'John Doe', section_id: section.id },
      { student_id: '2021-0002', full_name: 'Jane Smith', section_id: section.id },
      { student_id: '2021-0003', full_name: 'Alice Cooper', section_id: section.id },
    ];

    const { error: stError } = await supabase.from('students').insert(students);
    if (stError) console.error('Error seeding students:', stError);
    else console.log('✅ Students added.');
  }

  console.log('✨ Seeding complete! Go to /admin to see the data.');
}

seed();
