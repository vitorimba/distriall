'use client';

import { useState, useCallback, useRef } from 'react';

export interface CnpjData {
  razao_social: string;
  nome_fantasia: string;
  inscricao_estadual: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  telefone: string;
  email: string;
}

interface UseCnpjLookupReturn {
  lookup: (cnpj: string) => Promise<CnpjData | null>;
  loading: boolean;
  error: string | null;
}

export function useCnpjLookup(): UseCnpjLookupReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lookup = useCallback((cnpj: string): Promise<CnpjData | null> => {
    const digits = cnpj.replace(/\D/g, '');
    if (digits.length !== 14) return Promise.resolve(null);

    // Cancel previous debounced call
    if (debounceRef.current) clearTimeout(debounceRef.current);

    return new Promise((resolve) => {
      debounceRef.current = setTimeout(async () => {
        setLoading(true);
        setError(null);

        try {
          // Primary: CNPJ.ws (free tier: 3 req/min)
          const data = await fetchCnpjWs(digits);
          if (data) { resolve(data); return; }

          // Fallback: BrasilAPI
          const fallbackData = await fetchBrasilApi(digits);
          if (fallbackData) { resolve(fallbackData); return; }

          setError('CNPJ não encontrado');
          resolve(null);
        } catch {
          setError('Erro ao consultar CNPJ');
          resolve(null);
        } finally {
          setLoading(false);
        }
      }, 1500); // 1.5s debounce (rate limit protection)
    });
  }, []);

  return { lookup, loading, error };
}

async function fetchCnpjWs(digits: string): Promise<CnpjData | null> {
  try {
    const res = await fetch(`https://publica.cnpj.ws/cnpj/${digits}`);
    if (!res.ok) return null;
    const d = await res.json();

    const ie = d.inscricoes_estaduais?.find(
      (ie: { ativo: boolean; inscricao_estadual: string }) => ie.ativo
    )?.inscricao_estadual || '';

    const phone = d.estabelecimento?.ddd1 && d.estabelecimento?.telefone1
      ? `${d.estabelecimento.ddd1}${d.estabelecimento.telefone1}`
      : '';

    return {
      razao_social: d.razao_social || '',
      nome_fantasia: d.estabelecimento?.nome_fantasia || '',
      inscricao_estadual: ie,
      cep: d.estabelecimento?.cep || '',
      logradouro: d.estabelecimento?.logradouro || '',
      numero: d.estabelecimento?.numero || '',
      complemento: d.estabelecimento?.complemento || '',
      bairro: d.estabelecimento?.bairro || '',
      cidade: d.estabelecimento?.cidade?.nome || '',
      uf: d.estabelecimento?.estado?.sigla || '',
      telefone: phone,
      email: d.estabelecimento?.email || '',
    };
  } catch {
    return null;
  }
}

async function fetchBrasilApi(digits: string): Promise<CnpjData | null> {
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`);
    if (!res.ok) return null;
    const d = await res.json();

    const phone = d.ddd_telefone_1
      ? d.ddd_telefone_1.replace(/\D/g, '')
      : '';

    return {
      razao_social: d.razao_social || '',
      nome_fantasia: d.nome_fantasia || '',
      inscricao_estadual: '',
      cep: (d.cep || '').replace(/\D/g, ''),
      logradouro: d.logradouro || '',
      numero: d.numero || '',
      complemento: d.complemento || '',
      bairro: d.bairro || '',
      cidade: d.municipio || '',
      uf: d.uf || '',
      telefone: phone,
      email: d.email || '',
    };
  } catch {
    return null;
  }
}
