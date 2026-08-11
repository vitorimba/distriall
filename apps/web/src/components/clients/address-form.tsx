'use client';

import { useState } from 'react';
import { maskCEP } from '@/lib/mask-utils';
import { unmask } from '@/lib/validators/document';
import { useCepLookup } from '@/hooks/use-cep-lookup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/ui/field';

interface AddressFormData {
  label: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  is_fiscal: boolean;
  is_default_delivery: boolean;
}

interface AddressFormProps {
  initial?: Partial<AddressFormData>;
  onSave: (data: AddressFormData) => void;
  onCancel: () => void;
  saving?: boolean;
}

export function AddressForm({ initial, onSave, onCancel, saving }: AddressFormProps) {
  const cepLookup = useCepLookup();

  const [label, setLabel] = useState(initial?.label ?? '');
  const [cep, setCep] = useState(initial?.cep ? maskCEP(initial.cep) : '');
  const [street, setStreet] = useState(initial?.street ?? '');
  const [number, setNumber] = useState(initial?.number ?? '');
  const [complement, setComplement] = useState(initial?.complement ?? '');
  const [neighborhood, setNeighborhood] = useState(initial?.neighborhood ?? '');
  const [city, setCity] = useState(initial?.city ?? '');
  const [state, setState] = useState(initial?.state ?? '');
  const [isFiscal, setIsFiscal] = useState(initial?.is_fiscal ?? false);
  const [isDelivery, setIsDelivery] = useState(initial?.is_default_delivery ?? false);

  async function handleCepBlur() {
    const digits = unmask(cep);
    if (digits.length !== 8) return;

    const data = await cepLookup.lookup(digits);
    if (!data) return;

    if (!street) setStreet(data.logradouro);
    if (!neighborhood) setNeighborhood(data.bairro);
    if (!city) setCity(data.localidade);
    if (!state) setState(data.uf);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      label: label || 'Principal',
      cep: unmask(cep),
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      is_fiscal: isFiscal,
      is_default_delivery: isDelivery,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Rótulo">
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ex: Matriz, Filial, Depósito"
          />
        </Field>
        <Field label="CEP">
          <div className="relative">
            <Input
              value={cep}
              onChange={(e) => setCep(maskCEP(e.target.value))}
              onBlur={handleCepBlur}
              inputMode="numeric"
              placeholder="00000-000"
            />
            {cepLookup.loading && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Field label="Logradouro">
            <Input value={street} onChange={(e) => setStreet(e.target.value)} />
          </Field>
        </div>
        <Field label="Número">
          <Input value={number} onChange={(e) => setNumber(e.target.value)} />
        </Field>
      </div>

      <Field label="Complemento">
        <Input value={complement} onChange={(e) => setComplement(e.target.value)} placeholder="Sala, andar, bloco..." />
      </Field>

      <div className="grid grid-cols-3 gap-3">
        <Field label="Bairro">
          <Input value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
        </Field>
        <Field label="Cidade">
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </Field>
        <Field label="UF">
          <Input value={state} onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))} maxLength={2} />
        </Field>
      </div>

      <div className="flex gap-4 pt-1">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isFiscal}
            onChange={(e) => setIsFiscal(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Endereço fiscal (NF-e)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isDelivery}
            onChange={(e) => setIsDelivery(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Entrega padrão
        </label>
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" size="sm" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar endereço'}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
