Sticky bottom bar on order create/edit: totals + the save action.

```jsx
<StickyBar
  items={[
    { label: 'Subtotal', value: <Money value={482} /> },
    { label: 'Lucro est.', value: <Money value={120.5} />, highlight: true },
  ]}
  action={<Button size="lg">Salvar pedido</Button>}
/>
```
