'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Money } from '@/components/ui/money';

interface SplitEntry {
  accountId: string;
  accountName: string;
  percentage: number;
}

interface ExpenseSplitEditorProps {
  splits: SplitEntry[];
  totalAmount: number;
  onChange: (splits: SplitEntry[]) => void;
}

export function ExpenseSplitEditor({ splits, totalAmount, onChange }: ExpenseSplitEditorProps) {
  const totalPercentage = splits.reduce((sum, s) => sum + s.percentage, 0);
  const isValid = Math.abs(totalPercentage - 100) < 0.01;

  function handlePercentageChange(index: number, value: string) {
    const num = parseFloat(value) || 0;
    const updated = splits.map((s, i) =>
      i === index ? { ...s, percentage: num } : s
    );
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Rateio por Conta</Label>
      {splits.map((split, index) => {
        const splitAmount = Math.round((totalAmount * split.percentage / 100) * 100) / 100;
        return (
          <div key={split.accountId} className="flex items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-sm">{split.accountName}</span>
            <div className="flex items-center gap-1">
              <Input
                type="number"
                min={0}
                max={100}
                step={0.01}
                value={split.percentage || ''}
                onChange={(e) => handlePercentageChange(index, e.target.value)}
                className="w-20 text-right"
              />
              <span className="text-xs text-muted-foreground">%</span>
            </div>
            <Money value={splitAmount} className="w-24 text-right text-sm text-muted-foreground" />
          </div>
        );
      })}
      <div className="flex items-center justify-between border-t pt-2 text-sm">
        <span className={isValid ? 'text-green-600' : 'text-red-600'}>
          Total: {totalPercentage.toFixed(2)}%
        </span>
        <Money value={totalAmount} className="font-medium" />
      </div>
      {!isValid && (
        <p className="text-xs text-red-600">Percentuais devem somar 100%</p>
      )}
    </div>
  );
}
