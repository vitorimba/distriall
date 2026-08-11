'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface DeliveryConfirmSheetProps {
  clientName: string;
  onConfirm: (observation: string) => Promise<void>;
  onCancel: () => void;
}

export function DeliveryConfirmSheet({
  clientName,
  onConfirm,
  onCancel,
}: DeliveryConfirmSheetProps) {
  const [observation, setObservation] = useState('');
  const [confirming, setConfirming] = useState(false);

  async function handleConfirm() {
    setConfirming(true);
    try {
      await onConfirm(observation.trim());
    } finally {
      setConfirming(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="w-full rounded-t-2xl bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Confirmar entrega</h2>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="text-sm text-foreground">
          Entrega para <span className="font-bold">{clientName}</span>
        </p>

        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground font-medium" htmlFor="observation">
            Observação (opcional)
          </label>
          <textarea
            id="observation"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Alguma observação? (opcional)"
            className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3}
          />
        </div>

        <Button
          onClick={handleConfirm}
          disabled={confirming}
          className="w-full h-12 text-base font-bold"
          style={{ background: 'var(--success)', color: '#fff' }}
        >
          {confirming ? 'Confirmando...' : 'CONFIRMAR ENTREGA'}
        </Button>
      </div>
    </div>
  );
}
