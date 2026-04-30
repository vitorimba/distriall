---
name: Full Security Audit
description: Comprehensive security audit covering threat modeling, verification, penetration testing, API security, and compliance
executor: security-chief → shostack → van-der-stock → stuttard → ball → ross
elicit: true
mode: interactive
---

# Task: Full Security Audit

## Purpose

Executar uma auditoria de seguranca completa em uma aplicacao, sistema ou infraestrutura. O audit cobre todas as camadas — desde threat modeling ate compliance — gerando um relatorio consolidado com findings, severidade, e plano de remediacao.

## Inputs

| Input | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `target` | SIM | URL, repositorio, ou descricao do sistema a ser auditado |
| `scope` | SIM | Escopo do audit (web app, API, infra, full stack) |
| `environment` | NAO | Producao, staging, desenvolvimento |
| `tech_stack` | NAO | Stack tecnologica (ex: Next.js, Supabase, AWS) |
| `compliance_frameworks` | NAO | Frameworks de compliance a verificar (LGPD, GDPR, NIST) |
| `previous_audits` | NAO | Relatorios de audits anteriores para comparacao |
| `credentials` | NAO | Credenciais de teste (se aplicavel) |

## Steps

### Phase 1: Reconnaissance & Scope Definition

**Executor:** security-chief

1. Definir escopo exato do audit
2. Identificar ativos e endpoints criticos
3. Mapear a superficie de ataque (attack surface)
4. Documentar tecnologias em uso
5. Classificar dados sensiveis presentes no sistema
6. Definir regras de engajamento (RoE)

**Checkpoint:** Escopo documentado e aprovado pelo solicitante

### Phase 2: Threat Modeling

**Executor:** @shostack (Adam Shostack)

7. Aplicar o framework STRIDE ao sistema
8. Criar diagrama de fluxo de dados (DFD)
9. Identificar trust boundaries
10. Enumerar ameacas por componente
11. Priorizar ameacas por impacto e probabilidade
12. Documentar mitigacoes existentes e gaps

**Checkpoint:** Threat model completo com ameacas priorizadas

### Phase 3: Security Verification (ASVS)

**Executor:** @van-der-stock (Andrew van der Stock)

13. Aplicar OWASP ASVS Level 1 (minimo) ou Level 2 (recomendado)
14. Verificar controles de autenticacao (V2)
15. Verificar controles de sessao (V3)
16. Verificar controles de acesso (V4)
17. Verificar validacao de input (V5)
18. Verificar criptografia (V6)
19. Verificar tratamento de erros e logging (V7)
20. Verificar protecao de dados (V8)
21. Verificar seguranca de comunicacao (V9)

**Checkpoint:** Score ASVS por categoria com gaps identificados

### Phase 4: Web Application Penetration Testing

**Executor:** @stuttard (Dafydd Stuttard)

22. Testar autenticacao e gerenciamento de sessao
23. Testar controles de acesso e autorizacao
24. Testar injeccoes (SQL, XSS, Command, SSTI)
25. Testar upload de arquivos e path traversal
26. Testar CSRF e clickjacking
27. Testar business logic flaws
28. Testar desserializacao insegura
29. Testar SSRF e open redirects

**Checkpoint:** Findings documentados com PoC e severidade

### Phase 5: API Security Testing

**Executor:** @ball (Corey Ball)

30. Testar BOLA (Broken Object Level Authorization)
31. Testar BFLA (Broken Function Level Authorization)
32. Testar mass assignment
33. Testar rate limiting e resource exhaustion
34. Testar exposicao excessiva de dados
35. Testar seguranca de autenticacao da API
36. Verificar versionamento e documentacao da API

**Checkpoint:** API findings documentados com OWASP API Top 10 mapping

### Phase 6: Compliance Check

**Executor:** @ross (Ron Ross)

37. Verificar controles NIST SP 800-53 aplicaveis
38. Avaliar compliance com LGPD (se aplicavel)
39. Avaliar compliance com GDPR (se aplicavel)
40. Identificar gaps de compliance
41. Criar plano de remediacao por prioridade

**Checkpoint:** Compliance gaps mapeados com remediacao

### Phase 7: Report Generation

**Executor:** security-chief

42. Consolidar findings de todas as fases
43. Classificar por severidade (Critical, High, Medium, Low, Info)
44. Calcular risk score geral
45. Gerar executive summary
46. Criar plano de remediacao priorizado
47. Incluir recomendacoes de quick wins vs long-term

## Checkpoints

| # | Checkpoint | Criterio |
|---|-----------|----------|
| 1 | Escopo definido | Documentado e aprovado |
| 2 | Threat model | STRIDE completo por componente |
| 3 | ASVS score | Todas categorias avaliadas |
| 4 | Web pentest | Todos vetores testados, PoCs documentadas |
| 5 | API pentest | OWASP API Top 10 verificado |
| 6 | Compliance | Gaps identificados |
| 7 | Relatorio | Consolidado e revisado |

## Veto Conditions

- **BLOCKED** se escopo nao foi definido ou aprovado
- **BLOCKED** se nao ha acesso ao sistema target
- **BLOCKED** se regras de engajamento nao foram estabelecidas
- **BLOCKED** se testing em producao sem autorizacao explicita
- **PAUSED** se finding critico encontrado que requer acao imediata

## Output

**Security Audit Report** contendo:

1. Executive Summary com risk score
2. Threat Model (STRIDE)
3. ASVS Verification Results
4. Penetration Test Findings
5. API Security Findings
6. Compliance Assessment
7. Remediation Roadmap (priorizado)
8. Quick Wins (correcoes imediatas)

## Output Example

```markdown
# Security Audit Report — [App Name]

**Date:** 2026-03-29
**Auditor:** Squad Security
**Risk Score:** 7.2/10 (HIGH)

## Executive Summary
Foram identificadas 23 vulnerabilidades, sendo 2 criticas, 5 altas,
10 medias e 6 baixas. As vulnerabilidades criticas envolvem BOLA na
API de usuarios e ausencia de RLS no Supabase.

## Critical Findings
1. **BOLA em /api/users/:id** — Qualquer usuario autenticado pode
   acessar dados de outros usuarios. CVSS: 9.1
2. **RLS desabilitado na tabela `orders`** — Dados acessiveis
   diretamente pelo Supabase client. CVSS: 9.4

## Remediation Priority
| # | Finding | Severidade | Esforco | Prazo |
|---|---------|-----------|---------|-------|
| 1 | Habilitar RLS | Critical | 2h | Imediato |
| 2 | Fix BOLA endpoint | Critical | 4h | Imediato |
| 3 | Implementar rate limiting | High | 8h | 1 semana |
```

## Outputs

- **attack-surface-map** — Reconnaissance scope doc com ativos, endpoints e tecnologias mapeadas
- **threat-model** — STRIDE DFD com ameacas priorizadas por impacto/probabilidade
- **asvs-score-report** — Score OWASP ASVS por categoria com gaps identificados
- **consolidated-audit-report** — Relatorio final com findings, severidade e plano de remediacao
