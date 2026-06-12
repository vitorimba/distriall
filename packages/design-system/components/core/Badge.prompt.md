Colored status badge; auto-labels DistriAll statuses in pt-BR.

```jsx
<Badge tone="entregue" />            {/* renders "Entregue", green */}
<Badge tone="pendente">3 vales</Badge>
```

Domain tones: pedido (`lancado/confirmado/carregado/entregue/cancelado`), vale (`pendente/pago/vencido`), acerto (`rascunho/conferido/fechado`); generic `success/danger/warning/info/accent/neutral`. `size="lg"` for order-detail headers.
