# API Security Checklist

Baseado em OWASP API Security Top 10 (2023) e melhores praticas de seguranca de APIs.

---

## API1 — Broken Object Level Authorization (BOLA)

- [ ] Cada request verifica se o usuario tem acesso ao objeto solicitado
- [ ] Verificacao de propriedade em endpoints GET, PUT, PATCH, DELETE
- [ ] IDs nao sao sequenciais/previsíveis (usar UUIDs)
- [ ] Nao confiar em IDs enviados pelo client para autorizacao
- [ ] RLS (Row Level Security) habilitado no banco de dados
- [ ] Testes automatizados para BOLA em todos endpoints CRUD
- [ ] Logs de tentativas de acesso a objetos de outros usuarios

---

## API2 — Broken Authentication

### Tokens & Credentials
- [ ] JWT assinado com algoritmo seguro (RS256 ou ES256, nunca "none")
- [ ] JWT com expiracao curta (15 min access token)
- [ ] Refresh tokens com expiracao longa e rotacao
- [ ] Tokens armazenados de forma segura (HttpOnly cookies)
- [ ] Tokens invalidados no logout (server-side blacklist ou short-lived)
- [ ] API keys nao usadas como unico metodo de autenticacao para usuarios

### Login & Sessions
- [ ] Rate limiting no endpoint de login
- [ ] Brute force protection (lockout, CAPTCHA)
- [ ] Password hashing com bcrypt/Argon2 (nunca MD5/SHA1)
- [ ] Sessoes invalidadas apos mudanca de senha
- [ ] MFA disponivel e recomendado

---

## API3 — Broken Object Property Level Authorization

### Mass Assignment
- [ ] Whitelist de campos aceitaveis em cada endpoint
- [ ] Campos sensiveis (role, isAdmin, balance) nao aceitam input do usuario
- [ ] DTOs/schemas separados para input e output
- [ ] Framework configurado para rejeitar campos nao declarados

### Excessive Data Exposure
- [ ] Endpoints retornam apenas campos necessarios (select especifico)
- [ ] Dados sensiveis filtrados antes de resposta (passwords, tokens)
- [ ] Diferentes serializers por role (admin ve mais que user)
- [ ] GraphQL: fields com autorizacao individual
- [ ] Nao retornar objetos completos do banco "as-is"

---

## API4 — Unrestricted Resource Consumption

### Rate Limiting
- [ ] Rate limiting global implementado (ex: 1000 req/min por IP)
- [ ] Rate limiting por endpoint (login mais restrito)
- [ ] Rate limiting por usuario autenticado
- [ ] Headers de rate limit retornados (X-RateLimit-Limit, Remaining, Reset)
- [ ] Resposta 429 Too Many Requests quando excedido

### Resource Limits
- [ ] Paginacao obrigatoria em endpoints de lista (max 100 items)
- [ ] Tamanho maximo de payload definido (ex: 1MB)
- [ ] Timeout em requests de longa duracao
- [ ] Upload de arquivos com limite de tamanho
- [ ] GraphQL: query depth limiting
- [ ] GraphQL: query complexity limiting
- [ ] GraphQL: batching limiting

---

## API5 — Broken Function Level Authorization (BFLA)

- [ ] Endpoints administrativos protegidos por role check
- [ ] Separacao clara de endpoints por role (user vs admin)
- [ ] Verificacao de permissao em CADA endpoint (nao apenas path)
- [ ] Mudanca de metodo HTTP nao bypassa autorizacao (GET→POST)
- [ ] Endpoints de gerenciamento nao acessiveis por usuarios normais
- [ ] Debug/test endpoints removidos em producao
- [ ] Documentacao interna/admin nao acessivel publicamente

---

## API6 — Unrestricted Access to Sensitive Business Flows

- [ ] CAPTCHA ou proof-of-work em fluxos sensiveis (registro, compra)
- [ ] Rate limiting em fluxos de negocio criticos
- [ ] Deteccao de automacao/bots
- [ ] Fingerprinting de devices/browsers
- [ ] Fluxos multi-step validam estado server-side
- [ ] Anti-scraping measures implementadas

---

## API7 — Server-Side Request Forgery (SSRF)

- [ ] URLs fornecidas pelo usuario sao validadas (whitelist de dominios)
- [ ] Acesso a metadata de cloud bloqueado (169.254.169.254)
- [ ] Redirects nao sao seguidos automaticamente
- [ ] Webhooks validam destino antes de enviar
- [ ] DNS rebinding protection implementada
- [ ] Internal network ranges bloqueados (10.x, 172.16.x, 192.168.x)

---

## API8 — Security Misconfiguration

### CORS
- [ ] Access-Control-Allow-Origin NAO e `*` (wildcard)
- [ ] Origins permitidas explicitamente listadas
- [ ] Access-Control-Allow-Credentials com origins especificas
- [ ] Preflight requests (OPTIONS) configurados

### Headers
- [ ] Content-Type validado em requests
- [ ] Content-Type correto em responses
- [ ] Security headers configurados (ver web-security-checklist)
- [ ] X-Powered-By removido
- [ ] Server header removido ou generico

### Error Handling
- [ ] Stack traces nao expostos em producao
- [ ] Mensagens de erro padronizadas (RFC 7807 Problem Details)
- [ ] Status codes corretos (nao 200 para tudo)
- [ ] Erros nao vazam informacoes sobre infra (versao DB, paths)

### Configuration
- [ ] Debug mode desabilitado em producao
- [ ] HTTPS obrigatorio (HTTP redireciona)
- [ ] Metodos HTTP desnecessarios desabilitados (TRACE, TRACK)
- [ ] Default credentials removidas
- [ ] API documentation (Swagger UI) protegida em producao

---

## API9 — Improper Inventory Management

- [ ] Todas versoes da API documentadas
- [ ] Versoes antigas desativadas ou com data de sunset
- [ ] Endpoints nao documentados identificados e removidos/documentados
- [ ] Ambientes de staging/dev nao acessiveis publicamente
- [ ] Inventario de APIs mantido atualizado
- [ ] Monitoring em todas versoes ativas

---

## API10 — Unsafe Consumption of APIs

- [ ] Dados recebidos de APIs externas sao validados
- [ ] Timeouts configurados para chamadas a APIs externas
- [ ] Circuit breaker implementado para dependencias externas
- [ ] Falhas de APIs externas tratadas gracefully
- [ ] Credenciais de APIs externas armazenadas com seguranca
- [ ] TLS verificado em chamadas a APIs externas

---

## Authentication Methods Specific

### JWT Security
- [ ] Algoritmo verificado server-side (rejeitar "none")
- [ ] Key confusion attack prevenido (nao aceitar RS256 como HS256)
- [ ] Claims validados (iss, aud, exp, iat)
- [ ] JWK rotation implementado
- [ ] Tokens nao armazenados em localStorage (preferir HttpOnly cookies)

### API Key Security
- [ ] API keys geradas com alta entropia
- [ ] API keys com escopo limitado (read-only, specific endpoints)
- [ ] API keys rotacionaveis sem downtime
- [ ] API keys revogaveis imediatamente
- [ ] API keys nao em query parameters (usar headers)

### OAuth2 Security
- [ ] State parameter usado (CSRF protection)
- [ ] PKCE implementado para public clients
- [ ] Redirect URIs validadas (exact match, nao pattern)
- [ ] Scopes minimos solicitados
- [ ] Token storage seguro

---

## GraphQL Specific

- [ ] Introspection desabilitada em producao
- [ ] Query depth limit configurado (ex: max 10 niveis)
- [ ] Query complexity limit configurado
- [ ] Batching com limite de queries por batch
- [ ] Field-level authorization implementada
- [ ] Timeout por query
- [ ] Persisted queries em producao (opcional mas recomendado)
- [ ] N+1 query prevention (DataLoader ou similar)

---

## Monitoring & Observability

- [ ] Todas requests logadas (method, path, status, duration, user)
- [ ] Falhas de autenticacao logadas com IP e timestamp
- [ ] Falhas de autorizacao logadas com detalhes
- [ ] Rate limit violations alertadas
- [ ] Anomalias de trafego detectadas
- [ ] Dashboards de seguranca da API configurados
- [ ] Alertas para padroes suspeitos (credential stuffing, scanning)

---

## Score Guide

| Score | Rating | Acao |
|-------|--------|------|
| 90-100% | A (Excellent) | API bem protegida, manter monitoramento |
| 75-89% | B (Good) | Pequenos gaps, planejar correcoes |
| 60-74% | C (Adequate) | Remediacao necessaria em areas especificas |
| 40-59% | D (Poor) | Riscos significativos, corrigir urgentemente |
| 0-39% | F (Critical) | API insegura, nao deveria estar em producao |
