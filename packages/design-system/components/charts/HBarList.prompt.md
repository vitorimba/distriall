Ranking horizontal (rótulo + barra + valor) para listas ordenadas: top produtos, cidades, clientes. Mais legível que barras verticais quando os rótulos são longos.

```jsx
import { fmtBRL } from './chartUtils';

<HBarList
  data={[{ label: 'Água mineral 510ml', value: 4944 }, { label: 'Refrigerante cola 2L', value: 2304 }]}
  formatValue={fmtBRL}
/>
```

- Ordene `data` do maior para o menor antes de passar.
- `maxValue` fixa a base da escala (útil para comparar dois cards).
