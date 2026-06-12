Bottom sheet mobile: ações sobre seleção/contexto ancoradas na base (spec 2.14); no desktop a mesma lista vira Menu.

```jsx
<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="3 pedidos selecionados"
  items={[
    { label: 'Marcar como carregado', icon: 'forklift', onClick: carregar },
    { label: 'Imprimir romaneio', icon: 'printer', onClick: imprimir },
    { label: 'Remover seleção', icon: 'x', danger: true, onClick: limpar },
  ]}
/>
```

- Itens têm altura mínima 48px (toque em campo).
- `children` para conteúdo livre (formulário curto) em vez de `items`.
