'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from '@/providers/account-provider';
import { useRegions, type Region } from '@/hooks/use-regions';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/ui/field';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { MapPin, Plus, Pencil, Trash2, X, Check } from 'lucide-react';

export default function RegionsPage() {
  const router = useRouter();
  const { activeAccount } = useAccount();
  const { listRegions, createRegion, updateRegion, deleteRegion } = useRegions();
  const toast = useToast();

  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formCities, setFormCities] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!activeAccount) return;
    try {
      const data = await listRegions(activeAccount.id);
      setRegions(data);
    } catch {
      toast('Erro ao carregar regioes', 'danger');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAccount]);

  useEffect(() => {
    load();
  }, [load]);

  function resetForm() {
    setShowForm(false);
    setEditingId(null);
    setFormName('');
    setFormCities('');
  }

  function startEdit(region: Region) {
    setEditingId(region.id);
    setFormName(region.name);
    setFormCities(region.cities ?? '');
    setShowForm(true);
  }

  function startCreate() {
    resetForm();
    setShowForm(true);
  }

  async function handleSave() {
    if (!formName.trim()) return;
    if (!activeAccount) return;

    setSaving(true);
    try {
      if (editingId) {
        await updateRegion({ id: editingId, name: formName.trim(), cities: formCities.trim() });
        toast('Regiao atualizada', 'success');
      } else {
        await createRegion({ accountId: activeAccount.id, name: formName.trim(), cities: formCities.trim() });
        toast('Regiao criada', 'success');
      }
      resetForm();
      await load();
    } catch {
      toast('Erro ao salvar regiao', 'danger');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(regionId: string) {
    try {
      await deleteRegion(regionId);
      toast('Regiao excluida', 'success');
      await load();
    } catch {
      toast('Erro ao excluir regiao. Verifique se nao ha clientes vinculados.', 'danger');
    }
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader
        title="Regioes de Entrega"
        onBack={() => router.push('/settings')}
        actions={
          !showForm ? (
            <Button size="sm" onClick={startCreate}>
              <Plus className="mr-1 size-4" />
              Nova regiao
            </Button>
          ) : undefined
        }
      />

      {/* Create/Edit form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {editingId ? 'Editar regiao' : 'Nova regiao'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Field label="Nome da regiao" required>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Rio Preto"
                autoFocus
              />
            </Field>
            <Field label="Cidades (separadas por virgula)">
              <textarea
                value={formCities}
                onChange={(e) => setFormCities(e.target.value)}
                placeholder="Ex: Sao Jose do Rio Preto, Mirassol, Bady Bassitt"
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </Field>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} disabled={saving || !formName.trim()}>
                <Check className="mr-1 size-3.5" />
                {saving ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button size="sm" variant="outline" onClick={resetForm}>
                <X className="mr-1 size-3.5" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Regions list */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rect" className="h-16" />
          ))}
        </div>
      ) : regions.length === 0 && !showForm ? (
        <EmptyState
          icon={MapPin}
          title="Nenhuma regiao cadastrada"
          description="Crie regioes para agrupar clientes e pedidos por cidade."
        />
      ) : (
        <div className="space-y-2">
          {regions.map((region) => (
            <Card key={region.id}>
              <CardContent className="flex items-center gap-3 py-3">
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{region.name}</p>
                  {region.cities && (
                    <p className="text-xs text-muted-foreground truncate">
                      {region.cities}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEdit(region)}
                    aria-label={`Editar ${region.name}`}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(region.id)}
                    aria-label={`Excluir ${region.name}`}
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
