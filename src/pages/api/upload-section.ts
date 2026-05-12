import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const sectionName = formData.get('sectionName') as string;
  const csvFile = formData.get('csvFile') as File;

  if (!sectionName || !csvFile) {
    return new Response('Missing required fields', { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // 1. Create the section
  const { data: section, error: sectionError } = await supabase
    .from('sections')
    .insert([{ name: sectionName }])
    .select()
    .single();

  if (sectionError) {
    console.error('Section Error:', sectionError);
    return new Response('Error creating section', { status: 500 });
  }

  // 2. Parse CSV
  const text = await csvFile.text();
  const rows = text.split('\n').map(row => row.split(',').map(cell => cell.trim()));
  
  // Assume header: student_id, full_name
  const students = rows
    .slice(1) // Skip header
    .filter(row => row.length >= 2 && row[0] !== '')
    .map(row => ({
      student_id: row[0],
      full_name: row[1],
      section_id: section.id,
      has_voted: false
    }));

  if (students.length > 0) {
    const { error: studentError } = await supabase
      .from('students')
      .insert(students);

    if (studentError) {
      console.error('Student Error:', studentError);
      return new Response('Error importing students', { status: 500 });
    }
  }

  return redirect('/admin?success=true');
};
