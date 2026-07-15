import { describe, it, expect } from 'vitest';
import { validateCpf, validateCnpj, validateDocument, unmask } from './document';

describe('validateCpf', () => {
  it('accepts valid CPF', () => {
    expect(validateCpf('52998224725')).toBe(true);
    expect(validateCpf('11144477735')).toBe(true);
  });

  it('rejects CPF with all same digits', () => {
    expect(validateCpf('11111111111')).toBe(false);
    expect(validateCpf('00000000000')).toBe(false);
    expect(validateCpf('99999999999')).toBe(false);
  });

  it('rejects CPF with wrong check digits', () => {
    expect(validateCpf('52998224726')).toBe(false);
    expect(validateCpf('12345678901')).toBe(false);
  });

  it('rejects CPF with wrong length', () => {
    expect(validateCpf('1234567890')).toBe(false);
    expect(validateCpf('123456789012')).toBe(false);
    expect(validateCpf('')).toBe(false);
  });

  it('strips non-digit chars before validating', () => {
    expect(validateCpf('529.982.247-25')).toBe(true);
  });
});

describe('validateCnpj', () => {
  it('accepts valid CNPJ', () => {
    expect(validateCnpj('11222333000181')).toBe(true);
    expect(validateCnpj('11444777000161')).toBe(true);
  });

  it('rejects CNPJ with all same digits', () => {
    expect(validateCnpj('11111111111111')).toBe(false);
    expect(validateCnpj('00000000000000')).toBe(false);
  });

  it('rejects CNPJ with wrong check digits', () => {
    expect(validateCnpj('11222333000182')).toBe(false);
    expect(validateCnpj('12345678000199')).toBe(false);
  });

  it('rejects CNPJ with wrong length', () => {
    expect(validateCnpj('1122233300018')).toBe(false);
    expect(validateCnpj('112223330001811')).toBe(false);
  });

  it('strips non-digit chars before validating', () => {
    expect(validateCnpj('11.222.333/0001-81')).toBe(true);
  });
});

describe('validateDocument', () => {
  it('auto-detects CPF (<=11 digits)', () => {
    expect(validateDocument('52998224725')).toBe(true);
    expect(validateDocument('529.982.247-25')).toBe(true);
  });

  it('auto-detects CNPJ (>11 digits)', () => {
    expect(validateDocument('11222333000181')).toBe(true);
    expect(validateDocument('11.222.333/0001-81')).toBe(true);
  });

  it('rejects invalid documents', () => {
    expect(validateDocument('11111111111')).toBe(false);
    expect(validateDocument('11111111111111')).toBe(false);
  });
});

describe('unmask', () => {
  it('removes all non-digit characters', () => {
    expect(unmask('529.982.247-25')).toBe('52998224725');
    expect(unmask('11.222.333/0001-81')).toBe('11222333000181');
    expect(unmask('15010-000')).toBe('15010000');
    expect(unmask('(17) 99999-1234')).toBe('17999991234');
  });

  it('returns empty string for empty input', () => {
    expect(unmask('')).toBe('');
  });
});
