import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod/v4';

const generateSettlementSchema = z.object({
  account_id: z.string().uuid(),
  period_start: z.string().date(),
  period_end: z.string().date(),
}).refine(
  (data) => data.period_start < data.period_end,
  { message: 'period_start deve ser anterior a period_end' }
);

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = generateSettlementSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'account_id, period_start e period_end são obrigatórios', details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { account_id, period_start, period_end } = parsed.data;

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
