Confirmação efêmera de ação (salvou, pagou, imprimiu); some sozinho em ~3s. Para aviso persistente, use Alert.

```jsx
// 1. Envolva o app uma vez:
<ToastProvider><App /></ToastProvider>

// 2. Dispare de qualquer componente:
const toast = useToast();
toast('Pedido #1042 salvo', 'success');
toast('Falha ao conectar impressora', 'danger');
```

- Tones: `success` (padrão), `danger`, `info`. Terceiro arg = duração ms.
- Mensagens curtas, factuais, sentence case — sem "!" duplo.
