Empty-list and error states; every list screen needs one.

```jsx
<EmptyState title="Nenhum cliente ainda" description="Cadastre o primeiro cliente para começar." actionLabel="Novo cliente" onAction={fn} />
<EmptyState error title="Não foi possível carregar" actionLabel="Tentar novamente" onAction={retry} />
```
