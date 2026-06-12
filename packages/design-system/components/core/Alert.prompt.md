Banner inline persistente para avisos/erros em contexto (compatibilidade, offline, validação de bloco). Para confirmação efêmera, use Toast.

```jsx
<Alert tone="warning" title="Impressão indisponível neste navegador">
  Web Bluetooth funciona no Chrome e Edge para Android.
</Alert>

<Alert tone="danger" title="Sem conexão" action={<Button size="sm" variant="outline">Tentar novamente</Button>}>
  Não foi possível atualizar as entregas.
</Alert>
```

- Tones: info, success, warning, danger. Ícone deriva do tone.
- `action` para o botão de retry — padrão do error state do produto.
