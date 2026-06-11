import { describe, it, expect } from 'vitest';
import { formatBRL } from '../currency';

describe('formatBRL', () => {
  it('formats integer value', () => {
    const result = formatBRL(1000);
    expect(result).toContain('1.000');
  });

  it('formats decimal value with 2 decimal places', () => {
    const result = formatBRL(993.5);
    expect(result).toContain('993,50');
  });

  it('formats large value with thousands separator', () => {
    const result = formatBRL(15420.0);
    expect(result).toContain('15.420');
  });

  it('includes BRL currency symbol', () => {
    const result = formatBRL(100);
    expect(result).toContain('R$');
  });

  it('formats zero', () => {
    const result = formatBRL(0);
    expect(result).toContain('0,00');
  });

  it('formats negative value', () => {
    const result = formatBRL(-500);
    expect(result).toContain('500');
  });
});
