# Web Application Security Checklist

Baseado em OWASP ASVS Level 1/2 e OWASP Top 10 2021.

---

## V2 — Authentication

### V2.1 — Password Security
- [ ] Senhas com minimo de 8 caracteres
- [ ] Senhas com maximo de 128+ caracteres (nao limitar)
- [ ] Verificacao contra lista de senhas comuns (breach database)
- [ ] Password meter/strength indicator presente
- [ ] Sem restricoes de caracteres especiais
- [ ] Funcionalidade de "show password" disponivel

### V2.2 — Multi-Factor Authentication
- [ ] MFA disponivel para todos usuarios
- [ ] MFA obrigatorio para administradores
- [ ] MFA via TOTP (Google Authenticator) ou WebAuthn
- [ ] SMS como MFA: apenas como fallback (nao primario)
- [ ] Codigos de recuperacao gerados e armazenados com seguranca

### V2.3 — Credential Recovery
- [ ] Reset de senha via link temporario (nao envia senha por email)
- [ ] Link de reset expira em 1 hora ou menos
- [ ] Link de reset e single-use
- [ ] Perguntas de seguranca NAO usadas como metodo unico
- [ ] Mensagens de erro genericas (nao revelar se email existe)

### V2.4 — Account Lockout
- [ ] Rate limiting no login (max 5-10 tentativas)
- [ ] Lockout temporario apos tentativas falhas
- [ ] CAPTCHA apos N tentativas falhas
- [ ] Nao revelar se conta foi bloqueada vs senha incorreta

---

## V3 — Session Management

### V3.1 — Session Tokens
- [ ] Tokens de sessao gerados server-side (nunca client-side)
- [ ] Tokens com entropia suficiente (128+ bits)
- [ ] Tokens nao expostos em URLs (query parameters)
- [ ] Cookies com flag `HttpOnly`
- [ ] Cookies com flag `Secure`
- [ ] Cookies com flag `SameSite=Lax` ou `Strict`
- [ ] Cookie `Path` restrito ao necessario

### V3.2 — Session Lifecycle
- [ ] Sessao expira apos periodo de inatividade (15-30 min para admin)
- [ ] Sessao expira apos periodo maximo absoluto (8-24h)
- [ ] Logout invalida sessao server-side (nao apenas client)
- [ ] Nova sessao gerada apos login (prevenir session fixation)
- [ ] Rotacao de session ID periodica

### V3.3 — Session Termination
- [ ] Botao de logout visivel e funcional
- [ ] Logout de todas sessoes ativas ("logout everywhere")
- [ ] Sessoes anteriores invalidadas apos mudanca de senha

---

## V4 — Access Control

### V4.1 — General Access Control
- [ ] Principio do menor privilegio aplicado
- [ ] Deny by default (tudo bloqueado, liberar explicitamente)
- [ ] Controles de acesso no servidor (nunca apenas client-side)
- [ ] Controles de acesso consistentes em toda a aplicacao
- [ ] Logs de falhas de acesso registrados

### V4.2 — Object Level Access
- [ ] Verificacao de propriedade em cada request (BOLA/IDOR prevention)
- [ ] IDs nao sequenciais para objetos sensiveis (UUIDs)
- [ ] Verificacao de autorizacao em CADA endpoint
- [ ] Nao confiar em dados do client para autorizacao

### V4.3 — Function Level Access
- [ ] Funcoes administrativas protegidas por role check
- [ ] Separacao de roles (admin, user, viewer, etc.)
- [ ] RBAC ou ABAC implementado
- [ ] Endpoints de admin em path separado (ex: /admin/)

---

## V5 — Input Validation

### V5.1 — Input Validation
- [ ] Validacao de TODOS inputs no servidor
- [ ] Whitelist validation preferida sobre blacklist
- [ ] Tipo, tamanho e range validados
- [ ] Content-Type headers verificados
- [ ] File uploads: tipo, tamanho, extensao validados
- [ ] File uploads: armazenados fora do webroot
- [ ] File uploads: nomes sanitizados (sem path traversal)

### V5.2 — Sanitization
- [ ] HTML output encoding (prevencao de XSS)
- [ ] Context-aware encoding (HTML, JS, CSS, URL)
- [ ] SQL queries parametrizadas (nunca concatenar strings)
- [ ] OS command execution evitado (ou sanitizado rigorosamente)
- [ ] LDAP queries parametrizadas
- [ ] XML parsers configurados contra XXE

### V5.3 — Output Encoding
- [ ] Content-Type header correto em todas respostas
- [ ] X-Content-Type-Options: nosniff
- [ ] JSON responses com Content-Type: application/json
- [ ] Nao refletir input do usuario sem encoding

---

## V6 — Cryptography

### V6.1 — Data Classification
- [ ] Dados sensiveis identificados e classificados
- [ ] Dados sensiveis criptografados em repouso
- [ ] Dados sensiveis criptografados em transito
- [ ] Chaves de criptografia gerenciadas adequadamente

### V6.2 — Algorithms
- [ ] TLS 1.2+ em todas comunicacoes
- [ ] TLS 1.3 preferido quando possivel
- [ ] Certificados SSL validos e nao expirados
- [ ] HSTS habilitado (Strict-Transport-Security)
- [ ] Algoritmos fracos desabilitados (MD5, SHA1 para crypto, DES, RC4)
- [ ] Bcrypt/Argon2 para hashing de senhas (nunca MD5/SHA)

---

## V7 — Error Handling & Logging

### V7.1 — Error Handling
- [ ] Erros NAO expoe stack traces em producao
- [ ] Erros NAO expoe informacoes internas (paths, versoes, queries)
- [ ] Mensagens de erro genericas para o usuario
- [ ] Erros detalhados apenas em logs internos
- [ ] Pagina de erro customizada (nao default do framework)

### V7.2 — Logging
- [ ] Logins (sucesso e falha) registrados
- [ ] Falhas de autorizacao registradas
- [ ] Input validation failures registrados
- [ ] Logs contem timestamp, IP, user, acao
- [ ] Logs NAO contem senhas, tokens, dados sensiveis
- [ ] Logs protegidos contra tampering
- [ ] Retencao de logs definida (minimo 90 dias)

---

## V8 — Data Protection

### V8.1 — General Data Protection
- [ ] Dados sensiveis nao em cache do browser (Cache-Control: no-store)
- [ ] Dados sensiveis nao em URLs (query parameters)
- [ ] Autocomplete desabilitado em campos sensiveis
- [ ] Dados sensiveis mascarados na interface (****)
- [ ] Backups criptografados

### V8.2 — Client-side Data
- [ ] Dados sensiveis nao em localStorage/sessionStorage
- [ ] Dados sensiveis nao em cookies sem criptografia
- [ ] Service Workers nao cacheiam dados sensiveis

---

## V9 — Communication Security

### V9.1 — TLS Configuration
- [ ] HTTPS em todo o site (sem mixed content)
- [ ] HTTP redireciona para HTTPS (301)
- [ ] HSTS com max-age >= 31536000 (1 ano)
- [ ] HSTS includeSubDomains habilitado

### V9.2 — Security Headers
- [ ] Content-Security-Policy (CSP) configurado
- [ ] X-Frame-Options: DENY ou SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy configurado
- [ ] CORS configurado adequadamente (nao usar wildcard `*`)

---

## V10 — OWASP Top 10 2021 Specific

### A01 — Broken Access Control
- [ ] Todos itens de V4 verificados
- [ ] CORS restrictivo
- [ ] Directory listing desabilitado
- [ ] Metadata/backup files nao acessiveis

### A02 — Cryptographic Failures
- [ ] Todos itens de V6 verificados
- [ ] Dados em transito sempre criptografados

### A03 — Injection
- [ ] Todos itens de V5 verificados
- [ ] ORM ou parameterized queries usados

### A05 — Security Misconfiguration
- [ ] Default credentials removidas
- [ ] Features desnecessarias desabilitadas
- [ ] Error handling configurado para producao
- [ ] Security headers implementados

### A07 — Identification and Authentication Failures
- [ ] Todos itens de V2 verificados

### A08 — Software and Data Integrity Failures
- [ ] Dependencias verificadas (npm audit, Snyk)
- [ ] CI/CD pipeline seguro
- [ ] Subresource Integrity (SRI) em CDN resources

### A09 — Security Logging and Monitoring Failures
- [ ] Todos itens de V7 verificados
- [ ] Alertas configurados para eventos criticos

---

## Score Guide

| Score | Rating | Acao |
|-------|--------|------|
| 90-100% | A (Excellent) | Manter e revisar periodicamente |
| 75-89% | B (Good) | Corrigir gaps de media prioridade |
| 60-74% | C (Adequate) | Plano de remediacao necessario |
| 40-59% | D (Poor) | Remediacao urgente necessaria |
| 0-39% | F (Critical) | Parar tudo e corrigir imediatamente |
