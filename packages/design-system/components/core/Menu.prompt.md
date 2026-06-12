Menu dropdown de ações secundárias ("..." em linhas de tabela e headers); máx. ~6 itens, destrutivos por último após separador.

```jsx
<Menu
  items={[
    { label: 'Ver detalhes', icon: 'eye', onClick: ver },
    { label: 'Editar', icon: 'pencil', onClick: editar },
    'separator',
    { label: 'Cancelar pedido', icon: 'x-circle', danger: true, onClick: cancelar },
  ]}
/>
```

- Gatilho padrão é IconButton de reticências; `trigger` para custom.
- Em linha de tabela clicável, envolva em `stopPropagation`.
- No mobile, prefira BottomSheet para a mesma lista.
