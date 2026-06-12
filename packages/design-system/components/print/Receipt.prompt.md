Recibo térmico P&B para preview antes da impressão Bluetooth (e fallback em tela); use dentro de um Dialog no detalhe do pedido.

```jsx
<Receipt
  numero="#1042"
  cliente="Mercado São José"
  data="12/06/2026 08:14"
  itens={[{ produto: 'Água mineral 510ml (cx 12)', qtd: 20, preco: 12.0 }]}
  subtotal={1262}
  desconto={17}
  total={1245}
  pagamento="Pix"
/>
```

- Sempre papel branco + tinta preta (`--receipt-*`), idêntico nos dois temas.
- Hierarquia por peso/densidade (bold, --receipt-ink-soft) — nunca por cor.
- `largura="80mm"` para impressoras maiores. JetBrains Mono em tudo.
