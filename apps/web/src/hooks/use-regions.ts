import { createClient } from '@/lib/supabase/client';

export interface Region {
  id: string;
  account_id: string;
  name: string;
  cities: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateRegionParams {
  accountId: string;
  name: string;
  cities?: string;
}

interface UpdateRegionParams {
  id: string;
  name: string;
  cities?: string;
}

export function useRegions() {
  async function listRegions(accountId: string): Promise<Region[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('delivery_regions')
      .select('*')
      .eq('account_id', accountId)
      .order('name', { ascending: true });

    if (error) throw error;
    return (data as Region[]) ?? [];
  }

  async function createRegion(params: CreateRegionParams): Promise<Region> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('delivery_regions')
      .insert({
        account_id: params.accountId,
        name: params.name,
        cities: params.cities || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Region;
  }

  async function updateRegion(params: UpdateRegionParams): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('delivery_regions')
      .update({
        name: params.name,
        cities: params.cities || null,
      })
      .eq('id', params.id);

    if (error) throw error;
  }

  async function deleteRegion(regionId: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('delivery_regions')
      .delete()
      .eq('id', regionId);

    if (error) throw error;
  }

  return { listRegions, createRegion, updateRegion, deleteRegion };
}
