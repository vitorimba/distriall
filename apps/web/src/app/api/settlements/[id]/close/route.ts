import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  // Fetch the settlement to check ownership and status
  const { data: settlement, error: fetchError } = await supabase
    .from('settlements')
    .select('id, account_id, status')
    .eq('id', id)
    .single();

  if (fetchError || !settlement) {
    return NextResponse.json({ error: 'Acerto nao encontrado' }, { status: 404 });
  }

  if (settlement.status === 'fechado') {
    return NextResponse.json({ error: 'Acerto ja esta fechado' }, { status: 409 });
  }

  // Verify user has admin role in the account
  const { data: accountUser } = await supabase
    .from('account_users')
    .select('role')
    .eq('account_id', settlement.account_id)
    .eq('user_id', user.id)
    .single();

  if (!accountUser || accountUser.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { data: updated, error: updateError } = await supabase
    .from('settlements')
    .update({
      status: 'fechado',
      closed_by: user.id,
      closed_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ settlement: updated });
}
