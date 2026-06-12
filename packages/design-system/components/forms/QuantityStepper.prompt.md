Stepper de quantidade (− n +) para o carrinho de pedido; alvos de toque grandes para uso em campo.

```jsx
<QuantityStepper value={item.qtd} onChange={(n) => setQtd(item.id, n)} />
<QuantityStepper value={qtd} size="lg" />  // mobile: alvos 44px
```

- Digitação direta no campo central também funciona.
- `min` padrão 1 — item com qtd 0 deve ser removido, não zerado.
