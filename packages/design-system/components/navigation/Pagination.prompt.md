Paginação para tabelas longas (>25 linhas); renderizar logo abaixo da DataTable, dentro do mesmo Card.

```jsx
const [page, setPage] = React.useState(1);
const pageRows = rows.slice((page - 1) * 25, page * 25);

<Card padded={false}>
  <DataTable columns={cols} rows={pageRows} />
  <Pagination page={page} totalItems={rows.length} pageSize={25} onChange={setPage} label="produtos" />
</Card>
```

- Com `totalItems` mostra "1–25 de 312 produtos"; senão "Página 2 de 13".
- Não paginar listas curtas — até ~25 linhas vão sem paginação.
