Card de KPI: ícone, valor grande, label, delta % colorido e sparkline opcional na base.

```jsx
<StatCard icon="wallet" label="Faturamento" value="R$ 28.520,30" delta={3.2} spark={[3200, 4100, 3650, 5200, 6840]} accent />
<StatCard icon="trending-up" label="Lucro" value="R$ 7.104,12" delta={1.8} />
<StatCard label="Carregando" loading />
```

- `accent` = hero laranja com gradiente — **máximo 1 por linha**.
- `spark` (number[]) renderiza Sparkline na base; no accent a linha fica branca automaticamente.
- `delta` positivo verde / negativo vermelho; `loading` mostra skeleton.
