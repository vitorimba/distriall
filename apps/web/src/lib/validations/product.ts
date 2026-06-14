import { z } from 'zod/v4';

export const productVariantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome da variacao obrigatorio'),
  weight_grams: z.number().int().positive().optional(),
  cost_price: z.number().min(0, 'Preco de custo deve ser >= 0'),
  sell_price: z.number().min(0, 'Preco de venda deve ser >= 0'),
  sku: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Nome do produto obrigatorio'),
  description: z.string().optional(),
  category: z.string().optional(),
  unit: z.enum(['un', 'kg', 'g', 'l', 'cm']),
  variants: z.array(productVariantSchema).min(1, 'Pelo menos 1 variacao obrigatoria'),
});

export type ProductVariantInput = z.infer<typeof productVariantSchema>;
export type ProductInput = z.infer<typeof productSchema>;
