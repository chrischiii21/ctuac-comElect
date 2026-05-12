import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { sectionId, candidateId, amount, total } = await request.json();
    const admin = getSupabaseAdmin();

    // 1. Fetch current tally
    const { data: current } = await admin
      .from('manual_tallies')
      .select('votes')
      .eq('section_id', sectionId)
      .eq('candidate_id', candidateId)
      .single();

    const newVotes = total !== undefined ? Math.max(0, total) : Math.max(0, (current?.votes || 0) + (amount || 0));

    // 2. Upsert (Update or Insert)
    const { error } = await admin
      .from('manual_tallies')
      .upsert({
        section_id: sectionId,
        candidate_id: candidateId,
        votes: newVotes,
        updated_at: new Date().toISOString()
      }, { onConflict: 'section_id,candidate_id' });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, votes: newVotes }), { status: 200 });
  } catch (error: any) {
    console.error('Manual Tally Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
