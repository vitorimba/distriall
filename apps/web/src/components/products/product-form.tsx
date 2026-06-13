'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { productSchema, type ProductInput, type ProductVariantInput } from '@/lib/validations/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/ui/field';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { Plus, Trash2 } from 'lucide-react';

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description: string | null;
    category: string | null;
    unit: string;
    product_variants: {
      id: string;
      name: string;
      weight_grams: number | null;
      cost_price: number;
      sell_price: number;
      sku: string | null;
    }[];
  };
}

const EMPTY_VARIANT: ProductVariantInput = {
  name: '',
  weight_grams: undefined,
  cost_price: 0,
  sell_price: 0,
  sku: undefined,
};

export function ProductForm({ product }: ProductFormProps) {
  const isEdit = !!product;
  const router = useRouter();
  const toast = useToast();
  const { activeAccount } = useAccount();

  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [category, setCategory] = useState(product?.category ?? '');
  const [unit, setUnit] = useState(product?.unit ?? 'un');
  const [variants, setVariants] = useState<(ProductVariantInput & { id?: string })[]>(
    product?.product_variants?.map((v) => ({
      id: v.id,
      name: v.name,
      weight_grams: v.weight_grams ?? undefined,
      cost_price: v.cost_price,
      sell_price: v.sell_price,
      sku: v.sku ?? undefined,
    })) ?? [{ ...EMPTY_VARIANT }]
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  function addVariant() {
    setVariants([...variants, { ...EMPTY_VARIANT }]);
  }

  function removeVariant(index: number) {
    if (variants.length <= 1) return;
    setVariants(variants.filter((_, i) => i !== index));
  }

  function updateVariant(index: number, field: string, value: string | number) {
    setVariants(
      variants.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    const input: ProductInput = {
      name,
      description: description || undefined,
      category: category || undefined,
      unit: unit as 'un' | 'kg' | 'g' | 'l',
      variants,
    };

    const result = productSchema.safeParse(input);
    if (!result.success) {
      setErrors(result.error.issues.map((i) => i.message));
      return;
    }

    if (!activeAccount) return;
    setSaving(true);
    const supabase = createClient();

    if (isEdit && product) {
      // Update product
      await supabase
        .from('products')
        .update({ name, description: description || null, category: category || null, unit })
        .eq('id', product.id);

      // Upsert variants
      for (const v of variants) {
        if (v.id) {
          await supabase
            .from('product_variants')
            .update({
              name: v.name,
              weight_grams: v.weight_grams ?? null,
              cost_price: v.cost_price,
              sell_price: v.sell_price,
              sku: v.sku ?? null,
            })
            .eq('id', v.id);
        } else {
          await supabase.from('product_variants').insert({
            product_id: product.id,
            account_id: activeAccount.id,
            name: v.name,
            weight_grams: v.weight_grams ?? null,
            cost_price: v.cost_price,
            sell_price: v.sell_price,
            sku: v.sku ?? null,
          });
        }
      }

      // Remove deleted variants
      const currentIds = variants.filter((v) => v.id).map((v) => v.id!);
      const originalIds = product.product_variants.map((v) => v.id);
      const toDelete = originalIds.filter((id) => !currentIds.includes(id));
      if (toDelete.length > 0) {
        await supabase.from('product_variants').update({ is_active: false }).in('id', toDelete);
      }
    } else {
      // Create product
      const { data: newProduct } = await supabase
        .from('products')
        .insert({
          account_id: activeAccount.id,
          name,
          description: description || null,
          category: category || null,
          unit,
        })
        .select()
        .single();

      if (newProduct) {
        const variantRows = variants.map((v) => ({
          product_id: newProduct.id,
          account_id: activeAccount.id,
          name: v.name,
          weight_grams: v.weight_grams ?? null,
          cost_price: v.cost_price,
          sell_price: v.sell_price,
          sku: v.sku ?? null,
        }));
        await supabase.from('product_variants').insert(variantRows);
      }
    }

    setSaving(false);
    toast('Produto salvo', 'success');
    router.push('/products');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Editar Produto' : 'Novo Produto'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Field label="Nome" required>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
          <Field label="Descricao">
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Categoria">
              <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Ex: temperos" />
            </Field>
            <Field label="Unidade">
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="un">Unidade</option>
                <option value="kg">Kg</option>
                <option value="g">Gramas</option>
                <option value="l">Litros</option>
              </select>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Variacoes</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addVariant}>
            <Plus className="mr-1 size-3.5" /> Variacao
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {variants.map((v, i) => (
            <div key={i} className="rounded-md border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Variacao {i + 1}</span>
                {variants.length > 1 && (
                  <Button type="button" variant="ghost" size="icon-xs" onClick={() => removeVariant(i)}>
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Nome" required>
                  <Input
                    value={v.name}
                    onChange={(e) => updateVariant(i, 'name', e.target.value)}
                    placeholder="Ex: 500g"
                    required
                  />
                </Field>
                <Field label="Peso (g)">
                  <Input
                    type="number"
                    value={v.weight_grams ?? ''}
                    onChange={(e) => updateVariant(i, 'weight_grams', e.target.value ? Number(e.target.value) : '')}
                    placeholder="500"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Preco Custo" required>
                  <Input
                    type="number"
                    step="0.01"
                    value={v.cost_price || ''}
                    onChange={(e) => updateVariant(i, 'cost_price', Number(e.target.value))}
                    required
                  />
                </Field>
                <Field label="Preco Venda" required>
                  <Input
                    type="number"
                    step="0.01"
                    value={v.sell_price || ''}
                    onChange={(e) => updateVariant(i, 'sell_price', Number(e.target.value))}
                    required
                  />
                </Field>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {errors.length > 0 && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3">
          {errors.map((err, i) => (
            <p key={i} className="text-sm text-destructive">{err}</p>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={saving}>
          {saving ? 'Salvando...' : isEdit ? 'Salvar Alteracoes' : 'Criar Produto'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
