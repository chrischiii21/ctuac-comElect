import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const { active } = await request.json();
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('settings')
    .upsert({ key: 'election_status', value: { active } });

  if (error) {
    console.error('Error toggling election:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true, active }), { status: 200 });
};
