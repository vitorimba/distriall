Barras verticais para comparar valores entre categorias discretas (dias, meses, contas); a maior barra ganha destaque automático.

```jsx
<BarChart
  data={[{ label: 'Seg', value: 3200 }, { label: 'Ter', value: 4100 }, { label: 'Qua', value: 3650 }]}
  showValues
/>
```

- `showValues` imprime o valor acima de cada barra (estilo "45%" das referências).
- `highlightMax={false}` deixa todas as barras com opacidade cheia.
