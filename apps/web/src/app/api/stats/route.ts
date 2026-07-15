import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { DashboardStats } from '@distriall/shared';

function getDateRange(
  period: string,
  startDate?: string | null,
  endDate?: string | null
): { start: string; end: string } {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().split('T')[0];

  if (period === 'custom' && startDate && endDate) {
    return { start: startDate, end: endDate };
  }

  if (period === 'day') {
    return { start: fmt(today), end: fmt(today) };
  }

  if (period === 'week') {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start: fmt(start), end: fmt(end) };
  }

  // month (default)
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return { start: fmt(start), end: fmt(end) };
}

export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('account_id');
  const period = searchParams.get('period') ?? 'month';
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');

  const { start, end } = getDateRange(period, startDate, endDate);

  // Get accounts where user has financial visibility
  const accountQuery = supabase
    .from('account_users')
    .select('account_id')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .or('role.eq.admin,can_view_financial.eq.true');

  const { data: financialAccounts, error: accountsError } = await accountQuery;

  if (accountsError) {
    return NextResponse.json({ error: accountsError.message }, { status: 500 });
  }

  const financialAccountIds = (financialAccounts ?? []).map((r) => r.account_id);

  if (financialAccountIds.length === 0) {
    const empty: DashboardStats = {
      revenue: 0,
      cost: 0,
      profit: 0,
      order_count: 0,
      client_count: 0,
      avg_ticket: 0,
      payment_breakdown: [],
      product_ranking: [],
      weekly_evolution: [],
    };
    return NextResponse.json(empty);
  }

  // If filtering by a specific account, verify user has financial access to it
  let targetAccountIds: string[];
  if (accountId) {
    if (!financialAccountIds.includes(accountId)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    targetAccountIds = [accountId];
  } else {
    targetAccountIds = financialAccountIds;
  }

  // Query 1: Basic metrics
  const { data: ordersData, error: ordersError } = await supabase
    .from('orders')
    .select('total, total_cost, profit, client_id')
    .in('account_id', targetAccountIds)
    .gte('created_at', start)
    .lte('created_at', end + 'T23:59:59')
    .neq('status', 'cancelado');

  if (ordersError) {
    return NextResponse.json({ error: ordersError.message }, { status: 500 });
  }

  const orders = ordersData ?? [];
  const revenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const cost = orders.reduce((sum, o) => sum + (Number(o.total_cost) || 0), 0);
  const profit = orders.reduce((sum, o) => sum + (Number(o.profit) || 0), 0);
  const order_count = orders.length;
  const client_count = new Set(orders.map((o) => o.client_id).filter(Boolean)).size;
  const avg_ticket = order_count > 0 ? revenue / order_count : 0;

  // Queries 2-4 in parallel (independent of each other)
  const twelveWeeksAgo = new Date();
  twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);
  const twelveWeeksAgoStr = twelveWeeksAgo.toISOString().split('T')[0];

  const [paymentsResult, itemsResult, weeklyResult] = await Promise.all([
    // Query 2: Payment breakdown
    supabase
      .from('payments')
      .select('method, amount, orders!inner(account_id, status, created_at)')
      .in('orders.account_id', targetAccountIds)
      .gte('orders.created_at', start)
      .lte('orders.created_at', end + 'T23:59:59')
      .neq('orders.status', 'cancelado')
      .neq('status', 'cancelado'),
    // Query 3: Product ranking
    supabase
      .from('order_items')
      .select('product_name, variant_name, total, quantity, orders!inner(account_id, status, created_at)')
      .in('orders.account_id', targetAccountIds)
      .gte('orders.created_at', start)
      .lte('orders.created_at', end + 'T23:59:59')
      .neq('orders.status', 'cancelado')
      .eq('is_returned', false),
    // Query 4: Weekly evolution (last 12 weeks)
    supabase
      .from('orders')
      .select('total, profit, created_at')
      .in('account_id', targetAccountIds)
      .gte('created_at', twelveWeeksAgoStr)
      .neq('status', 'cancelado'),
  ]);

  if (paymentsResult.error) {
    return NextResponse.json({ error: paymentsResult.error.message }, { status: 500 });
  }
  if (itemsResult.error) {
    return NextResponse.json({ error: itemsResult.error.message }, { status: 500 });
  }
  if (weeklyResult.error) {
    return NextResponse.json({ error: weeklyResult.error.message }, { status: 500 });
  }

  // Payment breakdown
  const filteredPayments = paymentsResult.data ?? [];
  const paymentTotals: Record<string, number> = {};
  for (const p of filteredPayments) {
    const method = p.method as string;
    paymentTotals[method] = (paymentTotals[method] ?? 0) + Number(p.amount);
  }
  const totalPayments = Object.values(paymentTotals).reduce((s, v) => s + v, 0);
  const payment_breakdown = Object.entries(paymentTotals)
    .map(([method, amount]) => ({
      method,
      amount,
      percentage: totalPayments > 0 ? Math.round((amount / totalPayments) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  // Product ranking
  const filteredItems = itemsResult.data ?? [];
  const productMap: Record<
    string,
    { product_name: string; variant_name: string; total_value: number; total_quantity: number }
  > = {};
  for (const item of filteredItems) {
    const key = `${item.product_name}__${item.variant_name}`;
    if (!productMap[key]) {
      productMap[key] = {
        product_name: item.product_name,
        variant_name: item.variant_name,
        total_value: 0,
        total_quantity: 0,
      };
    }
    productMap[key].total_value += Number(item.total) || 0;
    productMap[key].total_quantity += Number(item.quantity) || 0;
  }
  const product_ranking = Object.values(productMap)
    .sort((a, b) => b.total_value - a.total_value)
    .slice(0, 10);

  const weeklyMap: Record<string, { revenue: number; profit: number }> = {};
  for (const o of weeklyResult.data ?? []) {
    const d = new Date(o.created_at);
    // ISO week: set to Monday of that week
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    const weekKey = monday.toISOString().split('T')[0];
    if (!weeklyMap[weekKey]) {
      weeklyMap[weekKey] = { revenue: 0, profit: 0 };
    }
    weeklyMap[weekKey].revenue += Number(o.total) || 0;
    weeklyMap[weekKey].profit += Number(o.profit) || 0;
  }

  const weekly_evolution = Object.entries(weeklyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, vals]) => ({
      week,
      revenue: vals.revenue,
      profit: vals.profit,
    }));

  const response: DashboardStats = {
    revenue,
    cost,
    profit,
    order_count,
    client_count,
    avg_ticket,
    payment_breakdown,
    product_ranking,
    weekly_evolution,
  };

  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'private, max-age=60, stale-while-revalidate=300',
    },
  });
}
