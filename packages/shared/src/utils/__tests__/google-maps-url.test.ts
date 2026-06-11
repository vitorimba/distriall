import { describe, it, expect } from 'vitest';
import { buildGoogleMapsUrl } from '../delivery';

describe('buildGoogleMapsUrl', () => {
  it('returns base maps URL for empty addresses', () => {
    expect(buildGoogleMapsUrl([])).toBe('https://www.google.com/maps');
  });

  it('generates URL with single address', () => {
    const url = buildGoogleMapsUrl(['Rua das Flores 123, Rio Preto']);
    expect(url).toBe(
      'https://www.google.com/maps/dir/Rua%20das%20Flores%20123%2C%20Rio%20Preto'
    );
  });

  it('generates URL with multiple addresses as waypoints', () => {
    const url = buildGoogleMapsUrl([
      'Rua A 100, Centro, Rio Preto',
      'Rua B 200, Jardim, Votoporanga',
    ]);
    expect(url).toBe(
      'https://www.google.com/maps/dir/Rua%20A%20100%2C%20Centro%2C%20Rio%20Preto/Rua%20B%20200%2C%20Jardim%2C%20Votoporanga'
    );
  });

  it('encodes special characters in addresses', () => {
    const url = buildGoogleMapsUrl(['Av. Brasil & Filhos, Sao Paulo']);
    expect(url).toContain('Av.');
    expect(url).toContain(encodeURIComponent('Av. Brasil & Filhos, Sao Paulo'));
  });

  it('generates correct URL with 3 or more waypoints', () => {
    const addresses = [
      'Endereco 1',
      'Endereco 2',
      'Endereco 3',
      'Endereco 4',
    ];
    const url = buildGoogleMapsUrl(addresses);
    expect(url.startsWith('https://www.google.com/maps/dir/')).toBe(true);
    addresses.forEach((addr) => {
      expect(url).toContain(encodeURIComponent(addr));
    });
  });
});
