/* Máscaras e validação pt-BR — utilitários compartilhados dos formulários.
   Aplicar no onChange: value={v} onChange={(e) => setV(maskPhone(e.target.value))} */

export const onlyDigits = (v) => String(v || '').replace(/\D/g, '');

/* (35) 3622-1040 fixo · (35) 99812-4455 celular — decide pelo tamanho */
export function maskPhone(v) {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/* 37500-000 */
export function maskCEP(v) {
  const d = onlyDigits(v).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

/* CPF 123.456.789-09 ou CNPJ 12.345.678/0001-95 — decide pelo tamanho */
export function maskCpfCnpj(v) {
  const d = onlyDigits(v).slice(0, 14);
  if (d.length <= 11) {
    return d
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return d
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

/* Digitação de moeda: dígitos viram centavos — "12345" → "123,45" */
export function maskMoney(v) {
  const d = onlyDigits(v).slice(0, 12);
  if (!d) return '';
  const n = parseInt(d, 10) / 100;
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* "123,45" → 123.45 */
export const parseMoney = (v) => {
  const n = parseFloat(String(v || '').replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
};

/* Mensagens canônicas de validação — sempre estas, nunca variações */
export const MSG = {
  obrigatorio: 'Campo obrigatório',
  telefoneInvalido: 'Telefone incompleto',
  valorInvalido: 'Informe um valor maior que zero',
  emailInvalido: 'E-mail inválido',
};

export const isPhoneComplete = (v) => [10, 11].includes(onlyDigits(v).length);
