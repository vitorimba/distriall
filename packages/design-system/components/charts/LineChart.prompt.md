Gráfico de linha/área para evolução temporal (faturamento, pedidos por semana); use quando a tendência importa mais que valores individuais.

```jsx
import { fmtBRL } from './chartUtils';

<LineChart
  data={[{ label: 'Seg', value: 3200 }, { label: 'Ter', value: 4100 }, { label: 'Qua', value: 3650 }]}
  formatValue={fmtBRL}
/>
```

- `area={false}` para linha pura; `showDots={false}` mostra pontos só no hover.
- Sempre uma série; para comparar séries, prefira dois cards lado a lado.
- Cor padrão `var(--chart-1)` (laranja); nunca hardcode hex.
