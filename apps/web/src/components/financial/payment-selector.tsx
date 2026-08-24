'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import type { PaymentEntry } from '@/lib/validations/payment';
import { maskMoney, parseMoney } from '@/lib/mask-utils';


const METHODS = [
  { value: 'dinheiro', label: 'Dinheiro' },
  { value: 'pix', label: 'Pix' },
  { value: 'boleto', label: 'Boleto' },
  { value: 'vale', label: 'Vale' },
  { value: 'cartao', label: 'Cartao' },
  { value: 'cheque', label: 'Cheque' },
] as const;

interface MixedPaymentUI {
  method: PaymentEntry['method'];
  amountDisplay: string;
}

export interface CheckFields {
  checkNumber: string;
  bank: string;
  compensationDate: string;
  linkedVoucherIds: string[];
}

interface PaymentSelectorProps {
  defaultMethod?: string;
  orderTotal: number;
  clientId?: string;
  accountId?: string;
  onChange: (payments: PaymentEntry[], isMixed: boolean) => void;
  onCheckFieldsChange?: (fields: CheckFields | null) => void;
}

export function PaymentSelector({ defaultMethod, orderTotal, clientId, accountId, onChange, onCheckFieldsChange }: PaymentSelectorProps) {
  const [mode, setMode] = useState<'simple' | 'mixed'>('simple');
  const [simpleMethod, setSimpleMethod] = useState(defaultMethod ?? 'dinheiro');
  const [mixedPayments, setMixedPayments] = useState<MixedPaymentUI[]>([
    { method: 'dinheiro', amountDisplay: '' },
  ]);
  const [checkFields, setCheckFields] = useState<CheckFields>({
    checkNumber: '',
    bank: '',
    compensationDate: '',
    linkedVoucherIds: [],
  });

  // Emit changes
  useEffect(() => {
    if (mode === 'simple') {
      onChange(
        [{ method: simpleMethod as PaymentEntry['method'], amount: orderTotal }],
        false
      );
    } else {
      onChange(
        mixedPayments.map((p) => ({ method: p.method, amount: parseMoney(p.amountDisplay) })),
        true
      );
    }
  }, [mode, simpleMethod, mixedPayments, orderTotal]); // eslint-disable-line react-hooks/exhaustive-deps

  function addMixedLine() {
    setMixedPayments([...mixedPayments, { method: 'pix', amountDisplay: '' }]);
  }

  function removeMixedLine(index: number) {
    if (mixedPayments.length <= 1) return;
    setMixedPayments(mixedPayments.filter((_, i) => i !== index));
  }

  function updateMixed(index: number, field: 'method' | 'amountDisplay', value: string) {
    setMixedPayments(
      mixedPayments.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      )
    );
  }

  // Auto-fill last line with remaining amount
  function autoFillLast() {
    if (mixedPayments.length < 2) return;
    const sumOthers = mixedPayments
      .slice(0, -1)
      .reduce((s, p) => s + parseMoney(p.amountDisplay), 0);
    const remaining = Math.round((orderTotal - sumOthers) * 100) / 100;
    if (remaining >= 0) {
      updateMixed(mixedPayments.length - 1, 'amountDisplay', maskMoney(String(Math.round(remaining * 100))));
    }
  }

  const mixedSum = mixedPayments.reduce((s, p) => s + parseMoney(p.amountDisplay), 0);
  const mixedDiff = Math.round((orderTotal - mixedSum) * 100) / 100;

  return (
    <div className="space-y-3">
      <Label>Forma de Pagamento</Label>

      {/* Mode toggle */}
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => setMode('simple')}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            mode === 'simple'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-input text-muted-foreground hover:bg-muted'
          }`}
        >
          Único
        </button>
        <button
          type="button"
          onClick={() => setMode('mixed')}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            mode === 'mixed'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-input text-muted-foreground hover:bg-muted'
          }`}
        >
          Misto
        </button>
      </div>

      {mode === 'simple' ? (
        <div className="flex flex-wrap gap-1.5">
          {METHODS.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setSimpleMethod(m.value)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                simpleMethod === m.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-input text-muted-foreground hover:bg-muted'
              }`}
            >
              {m.label}
              {m.value === 'boleto' && simpleMethod === 'boleto' && (
                <span className="ml-1 text-[10px] text-orange-600">(Boa Mesa)</span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {mixedPayments.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <select
                value={p.method}
                onChange={(e) => updateMixed(i, 'method', e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              >
                {METHODS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              <Input
                type="text"
                inputMode="numeric"
                value={p.amountDisplay}
                onChange={(e) => updateMixed(i, 'amountDisplay', maskMoney(e.target.value))}
                onBlur={() => i === mixedPayments.length - 1 && autoFillLast()}
                placeholder="0,00"
                prefix="R$"
                className="flex-1 num"
              />
              {p.method === 'boleto' && (
                <span className="text-[10px] text-orange-600 shrink-0">Boa Mesa</span>
              )}
              {mixedPayments.length > 1 && (
                <Button type="button" variant="ghost" size="icon-xs" onClick={() => removeMixedLine(i)}>
                  <Trash2 className="size-3.5 text-destructive" />
                </Button>
              )}
            </div>
          ))}

          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" size="sm" onClick={addMixedLine}>
              <Plus className="mr-1 size-3" /> Forma
            </Button>
            {mixedDiff !== 0 && (
              <span className="text-xs text-destructive">
                {mixedDiff > 0 ? `Falta R$ ${mixedDiff.toFixed(2)}` : `Excede R$ ${Math.abs(mixedDiff).toFixed(2)}`}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
