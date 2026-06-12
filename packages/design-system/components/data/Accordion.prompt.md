Divulgação progressiva para FAQ/troubleshooting; um item aberto por vez.

```jsx
<Card title="Solução de problemas" padded={false}>
  <Accordion
    items={[
      { title: 'A impressora não aparece', content: 'Verifique se está em modo de pareamento...' },
      { title: 'O recibo sai cortado', content: 'Confirme a largura do papel (58/80mm).' },
    ]}
  />
</Card>
```

- Sempre dentro de `Card padded={false}`.
- `defaultOpen={0}` para abrir o primeiro item.
