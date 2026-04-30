---
name: Compliance Check
description: LGPD/GDPR/NIST compliance assessment with gap analysis and remediation plan
executor: security-chief → ross → cavoukian
elicit: true
mode: interactive
---

# Task: Compliance Check

## Purpose

Avaliar o nivel de conformidade de um sistema ou organizacao com frameworks regulatorios e de seguranca (LGPD, GDPR, NIST). Identifica gaps, riscos legais e gera um plano de remediacao priorizado.

## Inputs

| Input | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `system_description` | SIM | Descricao do sistema/aplicacao |
| `frameworks` | SIM | Quais frameworks verificar (LGPD, GDPR, NIST, todos) |
| `data_types` | SIM | Tipos de dados processados (PII, financeiro, saude) |
| `jurisdiction` | SIM | Jurisdicoes aplicaveis (Brasil, EU, US, global) |
| `current_controls` | NAO | Controles de seguranca ja implementados |
| `previous_assessment` | NAO | Assessment anterior para comparacao |
| `organization_size` | NAO | Porte da organizacao (afeta requisitos) |

## Steps

### Phase 1: Scope & Data Mapping

**Executor:** security-chief

1. Mapear todos os tipos de dados pessoais processados
2. Identificar bases legais para processamento (LGPD Art. 7)
3. Documentar fluxo de dados (coleta → processamento → armazenamento → descarte)
4. Identificar terceiros com acesso a dados (processadores/subprocessadores)
5. Mapear transferencias internacionais de dados
6. Classificar dados por sensibilidade

**Checkpoint:** Data mapping completo

### Phase 2: NIST Controls Assessment

**Executor:** @ross (Ron Ross)

7. Avaliar controles de Access Control (AC)
8. Avaliar controles de Audit and Accountability (AU)
9. Avaliar controles de Identification and Authentication (IA)
10. Avaliar controles de System and Communications Protection (SC)
11. Avaliar controles de System and Information Integrity (SI)
12. Avaliar controles de Risk Assessment (RA)
13. Avaliar controles de Configuration Management (CM)
14. Avaliar controles de Incident Response (IR)
15. Mapear gaps por familia de controles
16. Classificar gaps por severidade (Critical, Major, Minor)

**Checkpoint:** NIST assessment com gaps identificados

### Phase 3: LGPD Compliance Assessment

**Executor:** @cavoukian (Ann Cavoukian) + @ross (Ron Ross)

17. **Principios Fundamentais (Art. 6)**
    - Finalidade: dados coletados com proposito especifico?
    - Adequacao: processamento compativel com finalidade?
    - Necessidade: minimizacao de dados implementada?
    - Livre acesso: titular pode consultar seus dados?
    - Qualidade: dados mantidos atualizados e corretos?
    - Transparencia: informacoes claras sobre processamento?
    - Seguranca: medidas tecnicas e administrativas?
    - Prevencao: medidas para evitar danos?
    - Nao discriminacao: processamento nao gera discriminacao?
    - Responsabilizacao: demonstracao de cumprimento?

18. **Bases Legais (Art. 7)**
    - Consentimento obtido adequadamente?
    - Interesse legitimo documentado (LIA)?
    - Obrigacao legal identificada?
    - Execucao de contrato justificada?

19. **Direitos do Titular (Art. 18)**
    - Acesso aos dados implementado?
    - Correcao de dados possivel?
    - Anonimizacao/bloqueio/eliminacao disponivel?
    - Portabilidade implementada?
    - Revogacao de consentimento funcional?

20. **Medidas Tecnicas**
    - Criptografia em transito e em repouso?
    - Logs de acesso a dados pessoais?
    - Controle de acesso baseado em funcao (RBAC)?
    - Pseudonimizacao/anonimizacao?
    - Backup e recuperacao de dados?

21. **Governanca**
    - DPO/Encarregado designado?
    - Politica de privacidade publicada?
    - RIPD (Relatorio de Impacto) elaborado?
    - Procedimento de notificacao de incidentes?
    - Treinamento de colaboradores?

**Checkpoint:** LGPD gaps mapeados

### Phase 4: GDPR Cross-Reference (se aplicavel)

**Executor:** @cavoukian (Ann Cavoukian)

22. Verificar requisitos adicionais do GDPR vs LGPD
23. Avaliar mecanismos de transferencia internacional (SCCs, adequacy)
24. Verificar DPIAs (Data Protection Impact Assessments)
25. Avaliar Data Protection by Design and by Default

**Checkpoint:** GDPR gaps adicionais identificados

### Phase 5: Gap Analysis & Remediation Plan

**Executor:** security-chief

26. Consolidar gaps de todos os frameworks
27. Classificar por risco (legal, financeiro, reputacional)
28. Priorizar remediacao (quick wins vs projetos)
29. Estimar esforco e custo de remediacao
30. Criar timeline de implementacao
31. Definir KPIs de compliance

## Checkpoints

| # | Checkpoint | Criterio |
|---|-----------|----------|
| 1 | Data mapping | Todos fluxos de dados documentados |
| 2 | NIST assessment | Controles avaliados por familia |
| 3 | LGPD assessment | Todos artigos relevantes verificados |
| 4 | GDPR check | Requisitos adicionais mapeados |
| 5 | Remediation plan | Priorizado com timeline |

## Veto Conditions

- **BLOCKED** se data mapping nao esta completo
- **BLOCKED** se tipos de dados pessoais nao identificados
- **BLOCKED** se jurisdicoes aplicaveis nao definidas
- **ESCALATE** se encontrar violacao ativa de compliance (notificar DPO/legal)
- **PAUSED** se necessario acesso a documentacao de terceiros

## Output

**Compliance Report** contendo:

1. Data Mapping Summary
2. NIST Controls Assessment (por familia)
3. LGPD Compliance Score (por artigo)
4. GDPR Additional Requirements (se aplicavel)
5. Gap Analysis (consolidado)
6. Risk Assessment (legal, financeiro, reputacional)
7. Remediation Roadmap (priorizado)
8. Quick Wins (implementacao imediata)

## Output Example

```markdown
# Compliance Report — [System Name]

**Date:** 2026-03-29
**Frameworks:** LGPD, NIST SP 800-53
**Compliance Score:** 62% (NEEDS IMPROVEMENT)

## LGPD Score por Categoria
| Categoria | Score | Status |
|-----------|-------|--------|
| Bases Legais | 80% | ADEQUATE |
| Direitos do Titular | 45% | NON-COMPLIANT |
| Medidas Tecnicas | 70% | PARTIAL |
| Governanca | 55% | PARTIAL |

## Top Gaps
1. **Direito de portabilidade nao implementado** — LGPD Art. 18, V
   - Risco: Multa ate 2% do faturamento
   - Remediacao: Implementar endpoint de export JSON/CSV
   - Esforco: 16h dev

2. **Logs de acesso a dados pessoais ausentes** — NIST AU-3
   - Risco: Impossibilidade de auditar acessos
   - Remediacao: Implementar audit trail
   - Esforco: 24h dev

## Remediation Timeline
| Fase | Acoes | Prazo |
|------|-------|-------|
| Imediato | Politica de privacidade, consentimento | 1 semana |
| Curto prazo | RBAC, logs, criptografia | 1 mes |
| Medio prazo | Portabilidade, DPO, RIPD | 3 meses |
```

## Outputs

- **data-map** — Inventario de dados pessoais com fluxos, bases legais e terceiros envolvidos
- **nist-gap-report** — Assessment por familia de controles NIST com gaps classificados
- **compliance-gap-plan** — Plano de remediacao priorizado com riscos legais identificados
