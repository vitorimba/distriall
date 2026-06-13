export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

export function isPhoneComplete(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}

export function maskCEP(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  return digits.replace(/^(\d{5})(\d)/, '$1-$2');
}

export function maskCpfCnpj(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 11) {
    return digits
      .slice(0, 11)
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
  }
  return digits
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

export function maskMoney(value: string | number): string {
  const digits = String(value).replace(/\D/g, '');
  if (!digits) return '0,00';
  const cents = parseInt(digits, 10);
  const reais = Math.floor(cents / 100);
  const remainder = cents % 100;
  const reaisFormatted = reais.toLocaleString('pt-BR');
  const centsFormatted = String(remainder).padStart(2, '0');
  return `${reaisFormatted},${centsFormatted}`;
}

export function parseMoney(formatted: string): number {
  const normalized = formatted.replace(/\./g, '').replace(',', '.');
  return parseFloat(normalized) || 0;
}

export const MSG = {
  required: 'Campo obrigatorio',
  phoneIncomplete: 'Telefone incompleto',
  invalidCpfCnpj: 'CPF ou CNPJ invalido',
  invalidCep: 'CEP invalido',
} as const;
