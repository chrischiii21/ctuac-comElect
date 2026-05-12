import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const GET: APIRoute = async ({ url }) => {
  const sectionId = url.searchParams.get('sectionId');

  if (!sectionId) {
    return new Response('Missing sectionId', { status: 400 });
  }

  const { data, error } = await supabase
    .from('manual_tallies')
    .select('candidate_id, votes')
    .eq('section_id', sectionId);

  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
