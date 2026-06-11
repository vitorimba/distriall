'use client';

import { useState } from 'react';

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
      <div className="w-full bg-white rounded-t-3xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Confirmar entrega</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 text-3xl leading-none"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <p className="text-xl text-gray-700">
          Entrega para <span className="font-bold">{clientName}</span>
        </p>

        <div className="space-y-2">
          <label className="text-lg text-gray-700 font-medium" htmlFor="observation">
            Observacao (opcional)
          </label>
          <textarea
            id="observation"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Alguma observacao? (opcional)"
            className="w-full border-2 border-gray-300 rounded-xl p-4 text-lg text-gray-900 resize-none focus:outline-none focus:border-green-500"
            rows={3}
          />
        </div>

        <button
          onClick={handleConfirm}
          disabled={confirming}
          className="w-full h-16 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-2xl font-bold rounded-xl active:scale-95 transition-transform"
        >
          {confirming ? 'Confirmando...' : 'CONFIRMAR ENTREGA'}
        </button>
      </div>
    </div>
  );
}
