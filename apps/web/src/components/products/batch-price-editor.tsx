'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SelectedVariant {
  id: string;
  name: string;
  productName: string;
  currentPrice: number;
}

interface BatchPriceEditorProps {
  selectedVariants: SelectedVariant[];
  onDone: () => void;
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function BatchPriceEditor({ selectedVariants, onDone }: BatchPriceEditorProps) {
  const [mode, setMode] = useState<'fixed' | 'percent'>('fixed');
  const [fixedPrice, setFixedPrice] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  function getNewPrice(current: number): number {
    if (mode === 'fixed') return fixedPrice;
    return Math.round((current * (1 + percent / 100)) * 100) / 100;
  }

  async function handleApply() {
    setSaving(true);
    const supabase = createClient();

    if (mode === 'fixed') {
      await supabase
        .from('product_variants')
        .update({ sell_price: fixedPrice })
        .in('id', selectedVariants.map((v) => v.id));
    } else {
      // Percent: update individually
      for (const v of selectedVariants) {
        const newPrice = getNewPrice(v.currentPrice);
        await supabase
          .from('product_variants')
          .update({ sell_price: newPrice })
          .eq('id', v.id);
      }
    }

    setSaving(false);
    setDone(true);
  }

  if (done) {
    return (
      <Card>
        <CardContent className="py-6 text-center">
          <p className="text-sm font-medium text-primary">
            {selectedVariants.length} variacao{selectedVariants.length !== 1 ? 'es' : ''} atualizada{selectedVariants.length !== 1 ? 's' : ''}!
          </p>
          <Button className="mt-3" size="sm" onClick={onDone}>Fechar</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Editar Precos em Lote ({selectedVariants.length} selecionadas)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant={mode === 'fixed' ? 'default' : 'outline'}
            onClick={() => setMode('fixed')}
          >
            Preco Fixo
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === 'percent' ? 'default' : 'outline'}
            onClick={() => setMode('percent')}
          >
            Percentual
          </Button>
        </div>

        {mode === 'fixed' ? (
          <div className="space-y-1">
            <Label>Novo preco de venda (R$)</Label>
            <Input
              type="number"
              step="0.01"
              value={fixedPrice || ''}
              onChange={(e) => setFixedPrice(Number(e.target.value))}
            />
          </div>
        ) : (
          <div className="space-y-1">
            <Label>Ajuste percentual (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={percent || ''}
              onChange={(e) => setPercent(Number(e.target.value))}
              placeholder="Ex: 10 para +10%, -5 para -5%"
            />
          </div>
        )}

        {/* Preview */}
        <div className="max-h-48 overflow-y-auto rounded border">
          <table className="w-full text-xs">
            <thead className="bg-muted">
              <tr>
                <th className="px-2 py-1 text-left font-normal">Variacao</th>
                <th className="px-2 py-1 text-right font-normal">Atual</th>
                <th className="px-2 py-1 text-right font-normal">Novo</th>
              </tr>
            </thead>
            <tbody>
              {selectedVariants.map((v) => (
                <tr key={v.id} className="border-t">
                  <td className="px-2 py-1">{v.productName} – {v.name}</td>
                  <td className="px-2 py-1 text-right text-muted-foreground">{formatBRL(v.currentPrice)}</td>
                  <td className="px-2 py-1 text-right font-medium">{formatBRL(getNewPrice(v.currentPrice))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleApply} disabled={saving} className="flex-1">
            {saving ? 'Aplicando...' : 'Aplicar'}
          </Button>
          <Button variant="outline" onClick={onDone}>Cancelar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
