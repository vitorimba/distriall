---
name: API Security Testing
description: Comprehensive API security testing based on OWASP API Top 10 and ASVS API verification
executor: security-chief → ball → van-der-stock
elicit: true
mode: interactive
---

# Task: API Security Testing

## Purpose

Testar a seguranca de APIs REST, GraphQL ou gRPC de forma abrangente, cobrindo o OWASP API Security Top 10 e verificacoes ASVS especificas para APIs. Identifica vulnerabilidades que scanners automatizados nao detectam, como falhas de logica de negocio.

## Inputs

| Input | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `api_base_url` | SIM | URL base da API |
| `api_type` | SIM | REST, GraphQL, gRPC |
| `api_docs` | NAO | OpenAPI/Swagger, GraphQL schema, ou documentacao |
| `auth_method` | SIM | JWT, API key, OAuth2, session-based |
| `test_credentials` | NAO | Credenciais de teste (roles diferentes) |
| `tech_stack` | NAO | Framework usado (Express, FastAPI, etc.) |
| `rate_limits` | NAO | Rate limits configurados |
| `scope` | NAO | Endpoints especificos para focar |

## Steps

### Phase 1: API Discovery & Mapping

**Executor:** @ball (Corey Ball)

1. **Mapear a API**
   - Coletar schema/documentacao (OpenAPI, GraphQL introspection)
   - Enumerar todos os endpoints
   - Identificar metodos HTTP por endpoint
   - Documentar parametros de entrada
   - Identificar endpoints autenticados vs publicos
   - Mapear roles e permissoes documentadas

2. **Classificar endpoints por risco**
   - Endpoints que manipulam dados pessoais (PII)
   - Endpoints financeiros/transacionais
   - Endpoints administrativos
   - Endpoints de autenticacao/autorizacao
   - Endpoints de upload/download

**Checkpoint:** API completamente mapeada

### Phase 2: OWASP API Security Top 10 Testing

**Executor:** @ball (Corey Ball)

3. **API1 — Broken Object Level Authorization (BOLA)**
   - Acessar recursos de outros usuarios trocando IDs
   - Testar com IDs sequenciais, UUIDs previsíveis
   - Verificar em todos endpoints que retornam/modificam dados
   - Testar com diferentes roles (admin, user, anonymous)

4. **API2 — Broken Authentication**
   - Testar brute force de credenciais
   - Verificar expiracao de tokens
   - Testar refresh token flow
   - Verificar logout invalida tokens
   - Testar credential stuffing

5. **API3 — Broken Object Property Level Authorization**
   - Testar mass assignment (enviar campos extras)
   - Verificar se campos sensiveis sao retornados sem necessidade
   - Testar atualizacao de campos protegidos (role, status)

6. **API4 — Unrestricted Resource Consumption**
   - Testar rate limiting (existente? efetivo?)
   - Testar paginacao (requests sem limite?)
   - Testar upload de arquivos grandes
   - Testar queries complexas/pesadas (GraphQL depth)

7. **API5 — Broken Function Level Authorization (BFLA)**
   - Acessar endpoints admin com user normal
   - Acessar endpoints de escrita com role de leitura
   - Mudar metodo HTTP (GET→POST, POST→DELETE)
   - Testar endpoints de gerenciamento

8. **API6 — Unrestricted Access to Sensitive Business Flows**
   - Testar automacao de fluxos de negocio
   - Testar bypass de captcha/verificacao
   - Testar abuso de funcionalidades (scraping, spam)

9. **API7 — Server-Side Request Forgery (SSRF)**
   - Testar parametros que aceitam URLs
   - Testar redirects que podem ser abusados
   - Verificar webhooks e callbacks

10. **API8 — Security Misconfiguration**
    - Verificar CORS (Access-Control-Allow-Origin)
    - Verificar headers de seguranca
    - Verificar SSL/TLS configuration
    - Verificar exposicao de stack traces
    - Verificar métodos HTTP desnecessarios habilitados

11. **API9 — Improper Inventory Management**
    - Identificar versoes antigas da API ainda ativas
    - Verificar endpoints nao documentados
    - Verificar ambientes expostos (staging, debug)

12. **API10 — Unsafe Consumption of APIs**
    - Verificar validacao de dados recebidos de APIs externas
    - Testar se API confia cegamente em dados de terceiros
    - Verificar timeout e circuit breaking

**Checkpoint:** OWASP API Top 10 completamente testado

### Phase 3: ASVS API Verification

**Executor:** @van-der-stock (Andrew van der Stock)

13. **V13 — API and Web Service Verification**
    - V13.1: Verificar input validation generico
    - V13.2: Verificar RESTful web service security
    - V13.3: Verificar SOAP web service (se aplicavel)
    - V13.4: Verificar GraphQL security (se aplicavel)

14. **Verificacoes adicionais ASVS**
    - V2: Authentication controls na API
    - V3: Session management (tokens)
    - V4: Access control per endpoint
    - V5: Input validation
    - V8: Data protection (dados em transito/repouso)

**Checkpoint:** ASVS API requirements verificados

### Phase 4: GraphQL-Specific Testing (se aplicavel)

**Executor:** @ball (Corey Ball)

15. **GraphQL Security**
    - Introspection habilitada em producao?
    - Query depth limiting implementado?
    - Query complexity limiting implementado?
    - Batching attacks possiveis?
    - Field-level authorization implementada?
    - N+1 query detection

### Phase 5: Report Generation

**Executor:** security-chief

16. Consolidar findings por severidade
17. Mapear cada finding ao OWASP API Top 10
18. Criar PoC para cada vulnerabilidade
19. Recomendar remediacao especifica
20. Calcular risk score da API

## Checkpoints

| # | Checkpoint | Criterio |
|---|-----------|----------|
| 1 | API mapeada | Todos endpoints catalogados |
| 2 | OWASP API Top 10 | Todas 10 categorias testadas |
| 3 | ASVS V13 | Todos requirements verificados |
| 4 | GraphQL (se aplicavel) | Testes especificos executados |
| 5 | Relatorio | Findings com PoC e remediacao |

## Veto Conditions

- **BLOCKED** se nao ha acesso a API
- **BLOCKED** se escopo de endpoints nao definido
- **ESCALATE** se BOLA/BFLA encontrado em producao com dados reais
- **PAUSED** se rate limiting estiver bloqueando testes legitimamente
- **WARN** se API sem autenticacao alguma

## Output

**API Security Report** contendo:

1. API Inventory (endpoints, metodos, auth)
2. OWASP API Top 10 Assessment
3. ASVS V13 Compliance
4. Findings por severidade com PoC
5. Risk Score
6. Remediation Plan

## Output Example

```markdown
# API Security Report — api.meuapp.com/v1

**Date:** 2026-03-29
**API Type:** REST + GraphQL
**Endpoints:** 47 REST + 1 GraphQL
**Auth:** JWT (Supabase Auth)

## OWASP API Top 10 Results
| Category | Status | Findings |
|----------|--------|----------|
| API1 BOLA | FAIL | 3 endpoints vulneraveis |
| API2 Auth | PASS | — |
| API3 Property | WARN | Mass assignment em /users |
| API4 Resources | FAIL | Sem rate limiting |
| API5 BFLA | PASS | — |
| API6 Business | WARN | Scraping possivel |
| API7 SSRF | PASS | — |
| API8 Misconfig | FAIL | CORS wildcard |
| API9 Inventory | WARN | /v0 ainda ativo |
| API10 Unsafe | PASS | — |

## Critical Finding: BOLA em /api/orders/:id
- **Request:** `GET /api/orders/456` (com token do user A)
- **Response:** Retorna pedido do user B (status 200)
- **Impacto:** Qualquer usuario pode ler pedidos de outros
- **Fix:** Adicionar RLS policy `auth.uid() = user_id`
```

## Outputs

- **api-inventory** — Todos os endpoints mapeados com metodos, parametros e classificacao de risco
- **owasp-api-top10-findings** — Vulnerabilidades encontradas por categoria com reproducao
- **api-security-report** — Relatorio consolidado com severidade e remediacao por finding
