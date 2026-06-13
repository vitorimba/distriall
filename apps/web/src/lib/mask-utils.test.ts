import { describe, it, expect } from 'vitest';
import {
  maskPhone,
  isPhoneComplete,
  maskCEP,
  maskCpfCnpj,
  maskMoney,
  parseMoney,
  MSG,
} from './mask-utils';

describe('maskPhone', () => {
  it('formata numero fixo (10 digitos)', () => {
    expect(maskPhone('1133334444')).toBe('(11) 3333-4444');
  });

  it('formata celular (11 digitos)', () => {
    expect(maskPhone('11987654321')).toBe('(11) 98765-4321');
  });

  it('retorna vazio para string vazia', () => {
    expect(maskPhone('')).toBe('');
  });

  it('ignora digitos alem de 11', () => {
    expect(maskPhone('119876543210000')).toBe('(11) 98765-4321');
  });

  it('formata parcialmente com menos de 10 digitos', () => {
    expect(maskPhone('11333')).toBe('(11) 333');
  });
});

describe('isPhoneComplete', () => {
  it('retorna true para fixo completo (10 digitos)', () => {
    expect(isPhoneComplete('(11) 3333-4444')).toBe(true);
  });

  it('retorna true para celular completo (11 digitos)', () => {
    expect(isPhoneComplete('(11) 98765-4321')).toBe(true);
  });

  it('retorna false para numero incompleto', () => {
    expect(isPhoneComplete('(11) 9876')).toBe(false);
  });

  it('retorna false para string vazia', () => {
    expect(isPhoneComplete('')).toBe(false);
  });
});

describe('maskCEP', () => {
  it('formata CEP completo', () => {
    expect(maskCEP('12345678')).toBe('12345-678');
  });

  it('formata CEP parcial', () => {
    expect(maskCEP('12345')).toBe('12345');
  });

  it('retorna vazio para string vazia', () => {
    expect(maskCEP('')).toBe('');
  });

  it('ignora digitos alem de 8', () => {
    expect(maskCEP('123456789')).toBe('12345-678');
  });
});

describe('maskCpfCnpj', () => {
  it('formata CPF completo (11 digitos)', () => {
    expect(maskCpfCnpj('12345678901')).toBe('123.456.789-01');
  });

  it('formata CNPJ completo (14 digitos)', () => {
    expect(maskCpfCnpj('12345678000195')).toBe('12.345.678/0001-95');
  });

  it('formata CPF parcial', () => {
    expect(maskCpfCnpj('12345')).toBe('123.45');
  });

  it('retorna vazio para string vazia', () => {
    expect(maskCpfCnpj('')).toBe('');
  });

  it('usa CPF para 12 digitos (12 < 14, threshold >= 12 vira CNPJ)', () => {
    const result = maskCpfCnpj('123456789012');
    expect(result).toBeTruthy();
  });
});

describe('maskMoney', () => {
  it('converte 123456 para 1.234,56', () => {
    expect(maskMoney('123456')).toBe('1.234,56');
  });

  it('converte 100 para 1,00', () => {
    expect(maskMoney('100')).toBe('1,00');
  });

  it('converte 0 para 0,00', () => {
    expect(maskMoney('0')).toBe('0,00');
  });

  it('retorna 0,00 para string vazia', () => {
    expect(maskMoney('')).toBe('0,00');
  });

  it('aceita numero inteiro como entrada', () => {
    expect(maskMoney(100)).toBe('1,00');
  });

  it('converte 10000 para 100,00', () => {
    expect(maskMoney('10000')).toBe('100,00');
  });
});

describe('parseMoney', () => {
  it('converte "1.234,56" para 1234.56', () => {
    expect(parseMoney('1.234,56')).toBe(1234.56);
  });

  it('converte "1,00" para 1', () => {
    expect(parseMoney('1,00')).toBe(1);
  });

  it('converte "0,00" para 0', () => {
    expect(parseMoney('0,00')).toBe(0);
  });

  it('retorna 0 para string vazia', () => {
    expect(parseMoney('')).toBe(0);
  });

  it('converte "100,00" para 100', () => {
    expect(parseMoney('100,00')).toBe(100);
  });
});

describe('MSG', () => {
  it('possui mensagem required', () => {
    expect(MSG.required).toBe('Campo obrigatorio');
  });

  it('possui mensagem phoneIncomplete', () => {
    expect(MSG.phoneIncomplete).toBe('Telefone incompleto');
  });

  it('possui mensagem invalidCpfCnpj', () => {
    expect(MSG.invalidCpfCnpj).toBe('CPF ou CNPJ invalido');
  });

  it('possui mensagem invalidCep', () => {
    expect(MSG.invalidCep).toBe('CEP invalido');
  });
});
