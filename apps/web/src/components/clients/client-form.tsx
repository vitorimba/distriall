'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { clientSchema, type ClientInput } from '@/lib/validations/client';
import { maskPhone, maskCpfCnpj, isPhoneComplete, MSG } from '@/lib/mask-utils';
import { validateDocument, unmask } from '@/lib/validators/document';
import { useCnpjLookup } from '@/hooks/use-cnpj-lookup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/ui/field';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';

interface ClientFormProps {
  client?: {
    id: string;
    name: string;
    trade_name: string | null;
    type: string | null;
    document: string | null;
    state_registration: string | null;
    email: string | null;
    address: string | null;
    city: string | null;
    neighborhood: string | null;
    phone: string | null;
    whatsapp: string | null;
    default_payment_method: string | null;
    notes: string | null;
  };
}

export function ClientForm({ client }: ClientFormProps) {
  const isEdit = !!client;
  const router = useRouter();
  const toast = useToast();
  const { activeAccount } = useAccount();
  const cnpjLookup = useCnpjLookup();

  const [clientType, setClientType] = useState<'pf' | 'pj'>((client?.type as 'pf' | 'pj') ?? 'pf');
  const [name, setName] = useState(client?.name ?? '');
  const [tradeName, setTradeName] = useState(client?.trade_name ?? '');
  const [document, setDocument] = useState(client?.document ? maskCpfCnpj(client.document) : '');
  const [stateRegistration, setStateRegistration] = useState(client?.state_registration ?? '');
  const [email, setEmail] = useState(client?.email ?? '');
  const [address, setAddress] = useState(client?.address ?? '');
  const [city, setCity] = useState(client?.city ?? '');
  const [neighborhood, setNeighborhood] = useState(client?.neighborhood ?? '');
  const [phone, setPhone] = useState(client?.phone ?? '');
  const [whatsapp, setWhatsapp] = useState(client?.whatsapp ?? '');
  const [paymentMethod, setPaymentMethod] = useState(client?.default_payment_method ?? '');
  const [notes, setNotes] = useState(client?.notes ?? '');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const isPJ = clientType === 'pj';

  async function handleCnpjBlur() {
    const digits = unmask(document);
    if (digits.length !== 14) return;

    const data = await cnpjLookup.lookup(digits);
    if (!data) return;

    // Auto-fill: never overwrite user-entered values
    if (!name) setName(data.razao_social);
    if (!tradeName) setTradeName(data.nome_fantasia);
    if (!stateRegistration) setStateRegistration(data.inscricao_estadual);
    if (!email) setEmail(data.email);
    if (!address) setAddress(data.logradouro ? `${data.logradouro}, ${data.numero}` : '');
    if (!neighborhood) setNeighborhood(data.bairro);
    if (!city) setCity(data.cidade);
    if (!phone && data.telefone) setPhone(maskPhone(data.telefone));

    toast('Dados preenchidos via CNPJ', 'success');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    const newFieldErrors: Record<string, string> = {};
    if (!name.trim()) newFieldErrors.name = MSG.required;
    if (phone && !isPhoneComplete(phone)) newFieldErrors.phone = MSG.phoneIncomplete;
    if (whatsapp && !isPhoneComplete(whatsapp)) newFieldErrors.whatsapp = MSG.phoneIncomplete;

    const docDigits = unmask(document);
    if (docDigits && !validateDocument(docDigits)) {
      newFieldErrors.document = MSG.invalidCpfCnpj;
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    const input: ClientInput = {
      name,
      trade_name: tradeName || undefined,
      type: clientType,
      document: docDigits || undefined,
      state_registration: stateRegistration || undefined,
      email: email || undefined,
      address: address || undefined,
      city: city || undefined,
      neighborhood: neighborhood || undefined,
      phone: phone || undefined,
      whatsapp: whatsapp || undefined,
      default_payment_method: (paymentMethod || undefined) as ClientInput['default_payment_method'],
      notes: notes || undefined,
    };

    const result = clientSchema.safeParse(input);
    if (!result.success) {
      setErrors(result.error.issues.map((i) => i.message));
      return;
    }

    if (!activeAccount) return;
    setSaving(true);
    const supabase = createClient();

    const row = {
      name,
      trade_name: tradeName || null,
      type: clientType,
      document: docDigits || null,
      state_registration: stateRegistration || null,
      email: email || null,
      address: address || null,
      city: city || null,
      neighborhood: neighborhood || null,
      phone: phone || null,
      whatsapp: whatsapp || null,
      default_payment_method: paymentMethod || null,
      notes: notes || null,
    };

    if (isEdit && client) {
      await supabase.from('clients').update(row).eq('id', client.id);
    } else {
      await supabase.from('clients').insert({ ...row, account_id: activeAccount.id });
    }

    setSaving(false);
    toast('Cliente salvo', 'success');
    router.push(isEdit && client ? `/clients/${client.id}` : '/clients');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Editar Cliente' : 'Novo Cliente'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* PF/PJ Toggle */}
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={clientType === 'pf' ? 'default' : 'outline'}
              onClick={() => setClientType('pf')}
            >
              Pessoa Fisica
            </Button>
            <Button
              type="button"
              size="sm"
              variant={clientType === 'pj' ? 'default' : 'outline'}
              onClick={() => setClientType('pj')}
            >
              Pessoa Juridica
            </Button>
          </div>

          <Field label={isPJ ? 'Razao Social' : 'Nome'} required error={fieldErrors.name}>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                if (!name.trim()) setFieldErrors((prev) => ({ ...prev, name: MSG.required }));
                else setFieldErrors((prev) => { const { name: _, ...rest } = prev; return rest; });
              }}
              aria-invalid={!!fieldErrors.name}
              required
            />
          </Field>

          <Field label="Nome Fantasia">
            <Input id="trade_name" value={tradeName} onChange={(e) => setTradeName(e.target.value)} />
          </Field>

          {/* Document (CPF/CNPJ) */}
          <div className="grid grid-cols-2 gap-3">
            <Field label={isPJ ? 'CNPJ' : 'CPF'} error={fieldErrors.document}>
              <div className="relative">
                <Input
                  id="document"
                  type="text"
                  inputMode="numeric"
                  value={document}
                  onChange={(e) => setDocument(maskCpfCnpj(e.target.value))}
                  onBlur={() => {
                    const digits = unmask(document);
                    if (digits && !validateDocument(digits)) {
                      setFieldErrors((prev) => ({ ...prev, document: MSG.invalidCpfCnpj }));
                    } else {
                      setFieldErrors((prev) => { const { document: _, ...rest } = prev; return rest; });
                    }
                    // Auto-fill CNPJ on blur
                    if (isPJ && digits.length === 14) handleCnpjBlur();
                  }}
                  aria-invalid={!!fieldErrors.document}
                  placeholder={isPJ ? '00.000.000/0001-00' : '000.000.000-00'}
                />
                {cnpjLookup.loading && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
              </div>
            </Field>
            {isPJ && (
              <Field label="Inscricao Estadual">
                <Input
                  id="state_registration"
                  value={stateRegistration}
                  onChange={(e) => setStateRegistration(e.target.value)}
                />
              </Field>
            )}
          </div>

          <Field label="Email">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
            />
          </Field>

          <Field label="Endereco">
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Cidade">
              <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </Field>
            <Field label="Bairro">
              <Input id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Telefone" error={fieldErrors.phone}>
              <Input
                id="phone"
                type="text"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(maskPhone(e.target.value))}
                onBlur={() => {
                  if (phone && !isPhoneComplete(phone)) setFieldErrors((prev) => ({ ...prev, phone: MSG.phoneIncomplete }));
                  else setFieldErrors((prev) => { const { phone: _, ...rest } = prev; return rest; });
                }}
                aria-invalid={!!fieldErrors.phone}
              />
            </Field>
            <Field label="WhatsApp" error={fieldErrors.whatsapp}>
              <Input
                id="whatsapp"
                type="text"
                inputMode="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
                onBlur={() => {
                  if (whatsapp && !isPhoneComplete(whatsapp)) setFieldErrors((prev) => ({ ...prev, whatsapp: MSG.phoneIncomplete }));
                  else setFieldErrors((prev) => { const { whatsapp: _, ...rest } = prev; return rest; });
                }}
                aria-invalid={!!fieldErrors.whatsapp}
              />
            </Field>
          </div>
          <Field label="Forma de Pagamento Padrao">
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Nenhuma</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="pix">Pix</option>
              <option value="boleto">Boleto</option>
              <option value="vale">Vale</option>
              <option value="cartao">Cartao</option>
            </select>
          </Field>
          <Field label="Notas">
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </Field>
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
          {saving ? 'Salvando...' : isEdit ? 'Salvar Alteracoes' : 'Criar Cliente'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
