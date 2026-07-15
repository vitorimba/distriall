'use client';

import { useState, useCallback } from 'react';

export interface CepData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface UseCepLookupReturn {
  lookup: (cep: string) => Promise<CepData | null>;
  loading: boolean;
  error: string | null;
}

export function useCepLookup(): UseCepLookupReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(async (cep: string): Promise<CepData | null> => {
    const digits = cep.replace(/\D/g, '');
    if (digits.length !== 8) return null;

    setLoading(true);
    setError(null);

    try {
      // Primary: ViaCEP
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      if (res.ok) {
        const data = await res.json();
        if (!data.erro) {
          return {
            logradouro: data.logradouro || '',
            bairro: data.bairro || '',
            localidade: data.localidade || '',
            uf: data.uf || '',
          };
        }
      }

      // Fallback: BrasilAPI
      const fallback = await fetch(`https://brasilapi.com.br/api/cep/v1/${digits}`);
      if (fallback.ok) {
        const data = await fallback.json();
        return {
          logradouro: data.street || '',
          bairro: data.neighborhood || '',
          localidade: data.city || '',
          uf: data.state || '',
        };
      }

      setError('CEP nao encontrado');
      return null;
    } catch {
      setError('Erro ao consultar CEP');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { lookup, loading, error };
}
