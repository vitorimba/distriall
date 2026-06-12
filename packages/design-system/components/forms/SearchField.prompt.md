Search input that tops every list screen (clientes, produtos, pedidos...).

```jsx
<SearchField placeholder="Buscar por cliente ou número..." value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />
```
