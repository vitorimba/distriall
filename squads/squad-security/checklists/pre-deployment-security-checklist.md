# Pre-Deployment Security Checklist

Checklist obrigatorio antes de qualquer deploy para producao.
Todos os itens MUST-PASS devem estar concluidos. SHOULD-PASS sao altamente recomendados.

---

## 1. Authentication & Authorization [MUST-PASS]

- [ ] Autenticacao funciona corretamente em todos os fluxos
- [ ] Senhas hashadas com bcrypt/Argon2 (nunca plaintext/MD5/SHA)
- [ ] Rate limiting no login implementado
- [ ] Sessoes expiram apos inatividade
- [ ] Logout invalida sessao server-side
- [ ] Autorizacao verificada em TODOS endpoints da API
- [ ] RBAC/permissoes testadas para cada role
- [ ] Admin endpoints protegidos adequadamente
- [ ] MFA disponivel para contas administrativas

---

## 2. Data Protection [MUST-PASS]

- [ ] RLS habilitado em todas tabelas (se Supabase/Postgres)
- [ ] RLS policies testadas (cross-user access bloqueado)
- [ ] Dados sensiveis criptografados em repouso
- [ ] Comunicacao via HTTPS (TLS 1.2+)
- [ ] Dados sensiveis nao em logs
- [ ] Dados sensiveis nao em URLs
- [ ] Backups configurados e criptografados
- [ ] Retencao de dados definida

---

## 3. Secrets Management [MUST-PASS]

- [ ] Nenhuma API key/senha hardcoded no codigo
- [ ] `.env` no `.gitignore`
- [ ] Secrets em variaveis de ambiente (nao em codigo)
- [ ] Service role keys nao expostas no frontend
- [ ] Credenciais de terceiros armazenadas com seguranca
- [ ] Historico do git verificado (nenhum secret commitado antes)
  - Usar: `git log --all --full-history -S "secret_key"`

---

## 4. Input Validation [MUST-PASS]

- [ ] Validacao server-side em TODOS inputs
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] File upload validado (tipo, tamanho, extensao)
- [ ] Uploads armazenados fora do webroot
- [ ] Content-Type headers verificados

---

## 5. API Security [MUST-PASS]

- [ ] Rate limiting global implementado
- [ ] CORS configurado (nao wildcard `*`)
- [ ] Paginacao em endpoints de lista
- [ ] Respostas nao expoe dados excessivos
- [ ] Error handling nao vaza informacoes internas
- [ ] Debug mode DESABILITADO
- [ ] Swagger/API docs protegido ou removido em producao

---

## 6. Security Headers [SHOULD-PASS]

- [ ] Strict-Transport-Security (HSTS)
- [ ] Content-Security-Policy (CSP)
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY ou SAMEORIGIN
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy configurado
- [ ] X-Powered-By removido
- [ ] Server header removido ou generico

Verificar em: https://securityheaders.com

---

## 7. Infrastructure [SHOULD-PASS]

- [ ] CDN/WAF configurado (Cloudflare, AWS CloudFront)
- [ ] DDoS protection habilitada
- [ ] DNS configurado corretamente (DNSSEC se possivel)
- [ ] SSL certificate valido e nao proximo de expirar
- [ ] Portas desnecessarias fechadas
- [ ] Servicos desnecessarios desabilitados
- [ ] OS/runtime atualizado (patches recentes)

---

## 8. Monitoring & Logging [SHOULD-PASS]

- [ ] Error tracking configurado (Sentry, Datadog, etc.)
- [ ] Logging de eventos de seguranca habilitado
  - Logins (sucesso e falha)
  - Falhas de autorizacao
  - Rate limit violations
  - Erros de input validation
- [ ] Alertas configurados para eventos criticos
- [ ] Dashboard de monitoramento acessivel
- [ ] Log retention policy definida

---

## 9. Dependencies [SHOULD-PASS]

- [ ] `npm audit` / `pnpm audit` sem vulnerabilidades criticas/altas
- [ ] Lock file (package-lock.json / pnpm-lock.yaml) commitado
- [ ] Dependencias atualizadas para versoes com patches de seguranca
- [ ] Nenhuma dependencia com CVE critico sem mitigacao
- [ ] SRI (Subresource Integrity) em CDN resources

---

## 10. Compliance & Legal [MUST-PASS]

- [ ] Politica de privacidade publicada
- [ ] Termos de uso publicados
- [ ] Consentimento de dados coletado adequadamente
- [ ] Cookie consent banner (se aplicavel)
- [ ] LGPD/GDPR requirements basicos atendidos
- [ ] DPO/Encarregado designado (se aplicavel)

---

## 11. CI/CD Pipeline [SHOULD-PASS]

- [ ] Build logs nao expoe secrets
- [ ] Pipeline nao permite deploy sem testes passando
- [ ] Secrets injetados via pipeline (nao commitados)
- [ ] Preview environments nao acessam dados de producao
- [ ] Rollback strategy definida
- [ ] Deployment audit trail (quem fez deploy, quando)

---

## 12. Database [MUST-PASS]

- [ ] Credenciais de banco com permissoes minimas
- [ ] Conexao via SSL
- [ ] Backups automaticos habilitados
- [ ] Point-in-time recovery configurado (se disponivel)
- [ ] Nao acessivel publicamente (exceto via app)
- [ ] Default users/passwords removidos

---

## 13. Container/Cloud (se aplicavel) [SHOULD-PASS]

- [ ] Containers nao rodando como root
- [ ] Imagens scaneadas para vulnerabilidades
- [ ] Resource limits definidos (CPU, memory)
- [ ] Network policies implementadas
- [ ] Secrets nao em env vars (usar secrets manager)
- [ ] Base images atualizadas

---

## Gate de Aprovacao

### Para fazer deploy em producao, TODOS os seguintes devem ser TRUE:

| Gate | Status | Obrigatorio |
|------|--------|-------------|
| Todos itens MUST-PASS concluidos | [ ] | SIM |
| Nenhuma vulnerabilidade critica conhecida | [ ] | SIM |
| Nenhum secret exposto no codigo | [ ] | SIM |
| RLS habilitado e testado | [ ] | SIM |
| HTTPS configurado | [ ] | SIM |
| Politica de privacidade publicada | [ ] | SIM |
| Error handling configurado (sem stack traces) | [ ] | SIM |
| Itens SHOULD-PASS: 80%+ concluidos | [ ] | NAO (mas recomendado) |

### Decision

- **GO:** Todos MUST-PASS concluidos + 80%+ SHOULD-PASS
- **CONDITIONAL GO:** Todos MUST-PASS + plano para SHOULD-PASS pendentes
- **NO-GO:** Qualquer MUST-PASS falhando = NAO fazer deploy

---

## Assinaturas

| Role | Nome | Data | Aprovacao |
|------|------|------|-----------|
| Developer | | | [ ] GO / [ ] NO-GO |
| Security | | | [ ] GO / [ ] NO-GO |
| Tech Lead | | | [ ] GO / [ ] NO-GO |
