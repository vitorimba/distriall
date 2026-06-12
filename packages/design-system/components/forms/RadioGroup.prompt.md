Escolha única com todas as opções visíveis (3–6); para mais opções use Select.

```jsx
<Field label="Forma de pagamento">
  <RadioGroup
    direction="row"
    options={['Dinheiro', 'Pix', 'Boleto', 'Vale', 'Cartão', 'Misto']}
    value={payment}
    onChange={setPayment}
  />
</Field>
```

- `direction="row"` para opções curtas; coluna para opções com descrição.
- Sempre dentro de `Field` quando tem label.
