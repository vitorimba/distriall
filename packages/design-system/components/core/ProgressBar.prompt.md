Barra de progresso determinada (rota do motorista, uso de algo); para indeterminado use Spinner/Skeleton.

```jsx
<ProgressBar value={2} max={3} label="Entregas concluídas" />
<ProgressBar value={100} tone="success" />
```

- `tone="success"` quando completo/positivo.
- Acompanhe com texto ("2 de 3 entregas") — a barra nunca é a única leitura.
