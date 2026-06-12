Tabela de dados padrão: linhas clicáveis, colunas ordenáveis e células custom via render.

```jsx
<DataTable
  columns={[
    { key: 'cliente', label: 'Cliente', sortable: true },
    { key: 'total', label: 'Total', align: 'right', sortable: true, render: (r) => <Money value={r.total} /> },
    { key: 'data', label: 'Data', sortable: true, sortValue: (r) => Number(r.data.split('/').reverse().join('')) },
    { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status} /> },
  ]}
  rows={rows}
  rowKey="num"
  defaultSort={{ key: 'total', dir: 'desc' }}
  onRowClick={(r) => abrir(r)}
/>
```

- `sortable: true` por coluna; clique no cabeçalho cicla desc → asc → sem ordenação. Cabeçalho ativo fica laranja (`--accent-fg`).
- `sortValue` quando o valor exibido não ordena bem (datas em string, render custom).
- `align: 'right'` em toda coluna numérica (aplica `tabular-nums`).
- `dense` para tabelas compactas; `onRowClick` dá hover + cursor.
