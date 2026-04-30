# Pre-Production Checklist — Banking API Integration

Checklist obrigatorio antes de colocar qualquer integracao bancaria em producao.

## Autenticacao

- [ ] Credenciais de producao obtidas (client_id, client_secret)
- [ ] Certificado de producao instalado (separado do sandbox)
- [ ] Token refresh automatico implementado
- [ ] Credenciais armazenadas em vault/secrets manager (NAO no codigo)
- [ ] Certificados NAO commitados no git (.gitignore atualizado)

## Seguranca

- [ ] TLS 1.2+ em todas as comunicacoes
- [ ] Certificado mTLS configurado (Inter, Sicoob)
- [ ] Validacao de certificado SSL habilitada (nao desabilitou verify)
- [ ] Logs NAO contem tokens, senhas ou dados sensiveis
- [ ] Dados financeiros encriptados em repouso (DB)
- [ ] Rate limiting implementado no lado do cliente

## Resiliencia

- [ ] Retry com backoff exponencial implementado
- [ ] Timeout configurado em todas as requests (30s max)
- [ ] Circuit breaker para falhas consecutivas
- [ ] Fallback definido para indisponibilidade do banco
- [ ] Logs estruturados com request ID para rastreamento

## Dados

- [ ] Valores monetarios em centavos (inteiro, nao float)
- [ ] Datas em UTC ISO 8601
- [ ] Paginacao implementada para endpoints que retornam listas
- [ ] Idempotencia em operacoes de escrita (POST com idempotency key)
- [ ] Reconciliacao diaria entre sistema e banco

## Monitoramento

- [ ] Alertas configurados para erros 5xx
- [ ] Alerta de certificado expirando (30 dias antes)
- [ ] Dashboard de taxa de sucesso/falha por banco
- [ ] Alerta de rate limit (429) frequente
- [ ] Log de todas as transacoes financeiras (audit trail)

## Testes

- [ ] Testado no sandbox/homologacao do banco
- [ ] Cenarios de erro testados (401, 403, 429, 500)
- [ ] Cenario de certificado expirado testado
- [ ] Cenario de token expirado durante operacao testado
- [ ] Cenario de timeout testado
- [ ] Cenario de dados inesperados testado (campos null, array vazio)
