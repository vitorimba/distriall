'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { Money } from '@/components/ui/money';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface SettlementItemData {
  order_id: string;
  order_number: number;
  client_name: string;
  payment_method: string | null;
  expected_amount: number;
  received_amount: number | null;
  voucher_returned: boolean;
  boleto_returned: boolean;
  check_number: string | null;
  check_amount: number | null;
}

interface SettlementItemCardProps {
  item: SettlementItemData;
  onChange: (updated: SettlementItemData) => void;
  disabled?: boolean;
}

const PAYMENT_LABELS: Record<string, string> = {
  dinheiro: 'Dinheiro',
  vale: 'Vale',
  boleto: 'Boleto',
  cheque: 'Cheque',
  pix: 'Pix',
};

const PAYMENT_COLORS: Record<string, { bg: string; text: string }> = {
  dinheiro: { bg: 'bg-green-50', text: 'text-green-700' },
  vale: { bg: 'bg-amber-50', text: 'text-amber-700' },
  boleto: { bg: 'bg-blue-50', text: 'text-blue-700' },
  cheque: { bg: 'bg-purple-50', text: 'text-purple-700' },
  pix: { bg: 'bg-teal-50', text: 'text-teal-700' },
};

function getPaymentKey(method: string | null): string {
  return (method ?? '').toLowerCase();
}

export function SettlementItemCard({ item, onChange, disabled }: SettlementItemCardProps) {
  const method = getPaymentKey(item.payment_method);
  const label = PAYMENT_LABELS[method] ?? item.payment_method ?? 'N/A';
  const colors = PAYMENT_COLORS[method] ?? { bg: 'bg-gray-50', text: 'text-gray-700' };

  // Check if there's a discrepancy
  let hasIssue = false;
  if (method === 'dinheiro') {
    hasIssue = Math.abs(item.expected_amount - (Number(item.received_amount) || 0)) > 0.01;
  } else if (method === 'vale') {
    hasIssue = !item.voucher_returned;
  } else if (method === 'boleto') {
    hasIssue = !item.boleto_returned;
  } else if (method === 'cheque') {
    hasIssue = !item.check_number || (Number(item.check_amount) || 0) !== item.expected_amount;
  }

  return (
    <Card className={cn(hasIssue && !disabled && 'ring-2 ring-destructive/30')}>
      <CardContent className="pt-3 space-y-2">
        {/* Header: order number, client, payment badge */}
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              #{item.order_number} - {item.client_name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <Money value={item.expected_amount} className="text-xs font-semibold" />
            </div>
          </div>
          <Badge
            variant="secondary"
            className={cn('shrink-0', colors.bg, colors.text)}
          >
            {label}
          </Badge>
        </div>

        {/* Conditional fields based on payment method */}
        {method === 'dinheiro' && (
          <Field label="Valor recebido">
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={item.received_amount ?? ''}
              onChange={(e) =>
                onChange({
                  ...item,
                  received_amount: e.target.value ? Number(e.target.value) : null,
                })
              }
              disabled={disabled}
              prefix="R$"
            />
            {hasIssue && item.received_amount !== null && (
              <span className="text-xs text-destructive">
                Diferenca: <Money value={(Number(item.received_amount) || 0) - item.expected_amount} signed />
              </span>
            )}
          </Field>
        )}

        {method === 'vale' && (
          <Checkbox
            label="Vale devolvido"
            checked={item.voucher_returned}
            onChange={(e) =>
              onChange({
                ...item,
                voucher_returned: (e.target as HTMLInputElement).checked,
              })
            }
            disabled={disabled}
          />
        )}

        {method === 'boleto' && (
          <Checkbox
            label="Canhoto devolvido"
            checked={item.boleto_returned}
            onChange={(e) =>
              onChange({
                ...item,
                boleto_returned: (e.target as HTMLInputElement).checked,
              })
            }
            disabled={disabled}
          />
        )}

        {method === 'cheque' && (
          <div className="grid grid-cols-2 gap-2">
            <Field label="Numero do cheque">
              <Input
                type="text"
                placeholder="000000"
                value={item.check_number ?? ''}
                onChange={(e) =>
                  onChange({ ...item, check_number: e.target.value || null })
                }
                disabled={disabled}
              />
            </Field>
            <Field label="Valor do cheque">
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={item.check_amount ?? ''}
                onChange={(e) =>
                  onChange({
                    ...item,
                    check_amount: e.target.value ? Number(e.target.value) : null,
                  })
                }
                disabled={disabled}
                prefix="R$"
              />
            </Field>
          </div>
        )}

        {method === 'pix' && (
          <p className="text-xs text-muted-foreground">
            Pagamento via Pix -- conferencia automatica, sem retorno fisico.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
