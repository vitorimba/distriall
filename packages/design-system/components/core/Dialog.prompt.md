Dialog modal sobre scrim escurecido com blur; para confirmações, formulários curtos e previews (ex.: recibo antes de imprimir).

```jsx
const [open, setOpen] = React.useState(false);

<Button variant="outline" icon="printer" onClick={() => setOpen(true)}>Imprimir</Button>
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Recibo — pedido #1042"
  footer={
    <React.Fragment>
      <Button variant="outline" onClick={() => setOpen(false)}>Fechar</Button>
      <Button icon="printer">Imprimir</Button>
    </React.Fragment>
  }
>
  <Receipt … />
</Dialog>
```

- Scrim usa `--overlay-scrim` + `--overlay-blur`; card usa `--radius-xl` e `--shadow-overlay`.
- Fecha por Esc, clique fora e X — omita `onClose` para forçar decisão.
- Footer: máx. 1 botão primary, à direita.
