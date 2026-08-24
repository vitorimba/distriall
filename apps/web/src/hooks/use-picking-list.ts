import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';

export interface PickingListItem {
  product_variant_id: string;
  product_name: string;
  variant_name: string;
  total_quantity: number;
  unit_cost: number;
  total_cost: number;
  order_count: number;
}

export function usePickingList(targetDate: string) {
  const { activeAccount } = useAccount();
  const [items, setItems] = useState<PickingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPickingList = useCallback(async () => {
    if (!activeAccount || !targetDate) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data, error: rpcError } = await supabase.rpc('get_picking_list', {
      p_account_id: activeAccount.id,
      p_target_date: targetDate,
    });

    if (rpcError) {
      setError('Nao foi possivel carregar a picking list.');
      setLoading(false);
      return;
    }

    setItems((data as PickingListItem[]) ?? []);
    setLoading(false);
  }, [activeAccount, targetDate]);

  useEffect(() => {
    fetchPickingList();
  }, [fetchPickingList]);

  return { items, loading, error, refetch: fetchPickingList };
}
