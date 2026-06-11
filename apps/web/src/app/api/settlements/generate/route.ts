import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { account_id, period_start, period_end } = body as {
    account_id: string;
    period_start: string;
    period_end: string;
  };

  if (!account_id || !period_start || !period_end) {
    return NextResponse.json(
      { error: 'account_id, period_start e period_end sao obrigatorios' },
      { status: 400 }
    );
  }

  // Verify user has admin role in the account
  const { data: accountUser } = await supabase
    .from('account_users')
    .select('role, can_view_financial')
    .eq('account_id', account_id)
    .eq('user_id', user.id)
    .single();

  if (!accountUser || accountUser.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { data: settlementId, error } = await supabase.rpc('generate_settlement', {
    p_account_id: account_id,
    p_period_start: period_start,
    p_period_end: period_end,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch the full settlement record
  const { data: settlement, error: fetchError } = await supabase
    .from('settlements')
    .select('*')
    .eq('id', settlementId)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  return NextResponse.json({ settlement }, { status: 201 });
}
