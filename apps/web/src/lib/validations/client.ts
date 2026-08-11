import { z } from 'zod/v4';

export const clientSchema = z.object({
  name: z.string().min(1, 'Nome do cliente obrigatório'),
  trade_name: z.string().optional(),
  type: z.enum(['pf', 'pj']).optional(),
  document: z.string().optional(),
  state_registration: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  default_payment_method: z.enum(['dinheiro', 'pix', 'boleto', 'vale', 'cartao']).optional(),
  notes: z.string().optional(),
});

export type ClientInput = z.infer<typeof clientSchema>;

export const clientPriceSchema = z.object({
  product_variant_id: z.string().uuid(),
  custom_price: z.number().min(0, 'Preço deve ser >= 0'),
});

export type ClientPriceInput = z.infer<typeof clientPriceSchema>;
