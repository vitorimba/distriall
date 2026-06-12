Donut para distribuição proporcional (formas de pagamento, status); stat central + legenda interativa que destaca o segmento no hover.

```jsx
<DonutChart
  data={[{ label: 'Pix', value: 42 }, { label: 'Dinheiro', value: 23 }, { label: 'Boleto', value: 18 }]}
  centerValue="312"
  centerLabel="pedidos"
/>
```

- Máximo ~5 segmentos; agrupe o resto em "Outros".
- `showPercent={false}` mostra valores formatados em vez de %.
- Cores ciclam `--chart-1..5`; pode fixar com `color` por item.
