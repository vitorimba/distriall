<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: create-fix-plan
  task_name: Create Fix Plan
  status: active
  responsible_executor: 'responsive-chief'
  execution_type: Worker
  estimated_time: 30m
  domain: Tactical
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

<!-- SINKRA_CONTRACT:START -->
```yaml
sinkra_contract:
  Domain: Tactical
  atomic_layer: Atom
  executor: Worker
  pre_condition: "inputs e dependencias resolvidos antes de iniciar."
  post_condition: "output principal gerado e pronto para handoff."
  performance: "executar dentro do SLA, registrar erro e escalar sem falha silenciosa."
```
<!-- SINKRA_CONTRACT:END -->

# Task: Create Fix Plan

**Task ID:** create-fix-plan
**Version:** 1.0.0
**Executor:** responsive-chief (Rex)
**Type:** Hybrid (Agent draft, human review)
**Duration:** 15-30 min
**Output:** fix-plan.md

---

## Purpose

Criar um plano de correcao priorizado a partir dos resultados da auditoria responsiva. Agrupa fixes por componente, estima esforco, define ordem de execucao e organiza em fases para implementacao eficiente.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| audit_report | file | Yes | responsive-audit-report.md da task responsive-audit |
| findings_json | file | Yes | findings.json com dados estruturados dos issues |
| time_budget | string | No | Budget de tempo disponivel (default: sem limite) |
| team_size | number | No | Quantidade de executores disponiveis (default: 1) |
| priority_override | list | No | Componentes ou breakpoints para priorizar manualmente |

---

## Elicitation

> **elicit: true** — Perguntas contextuais antes da execucao.

1. **Qual o budget de tempo?** (Horas/dias disponiveis para implementacao)
2. **Existe deadline?** (Data limite para conclusao)
3. **Quantos executores disponiveis?** (Para paralelizar tasks)
4. **Alguma area de foco especial?** (Mobile-first, acessibilidade, performance)

---

## Preconditions

- [ ] Audit report disponivel e completo
- [ ] findings.json parseavel e com issues categorizados
- [ ] Ao menos 1 issue identificado na auditoria

---

## Steps

### Step 1: Audit Ingestion

Processar o relatorio de auditoria e dados estruturados.

- Parsear findings.json para obter lista completa de issues
- Mapear issues por severidade (critical, high, medium, low)
- Mapear issues por componente (Atomic Design level)
- Mapear issues por breakpoint afetado
- Calcular metricas: total issues, distribuicao por severidade, breakpoints mais afetados

### Step 2: Impact-Effort Matrix

Classificar cada issue na matriz impacto vs esforco.

- **Quick Wins:** Alto impacto + Baixo esforco → Prioridade 1
- **Major Projects:** Alto impacto + Alto esforco → Prioridade 2
- **Fill-ins:** Baixo impacto + Baixo esforco → Prioridade 3
- **Thankless Tasks:** Baixo impacto + Alto esforco → Prioridade 4 (ou descarte)

Para cada issue, classificar:
- Impacto visual (quantos usuarios/breakpoints afetados)
- Impacto funcional (funcionalidade perdida vs estetica)
- Esforco estimado (S: <30min, M: 30min-2h, L: 2h-8h, XL: >8h)
- Risco de regressao (baixo, medio, alto)

### Step 3: Dependency Mapping

Identificar dependencias entre fixes.

- Mapear fixes que dependem de outros (ex: token system antes de spacing fixes)
- Identificar fixes que podem rodar em paralelo
- Detectar fixes que impactam multiplos componentes (cascading changes)
- Marcar fixes que requerem mudancas estruturais (HTML) vs cosmeticas (CSS only)
- Identificar shared utilities/mixins que beneficiam multiplos fixes

### Step 4: Component Grouping

Agrupar fixes por componente para minimizar context switching.

- Agrupar issues do mesmo componente/area
- Ordenar grupos por severidade agregada
- Identificar componentes que precisam de refactor completo vs patches
- Marcar componentes compartilhados que beneficiam multiplas paginas

### Step 5: Phase Definition

Organizar fixes em fases de implementacao.

**Phase 1: Critical Fixes (immediate)**
- Todos os issues severity=critical
- Quick wins de alto impacto
- Foundation fixes (viewport meta, resets, base responsive setup)

**Phase 2: Structural Fixes (high priority)**
- Layout grid/flexbox corrections
- Navigation responsiveness
- Token system setup (se necessario)
- Issues severity=high

**Phase 3: Component Fixes (medium priority)**
- Per-component responsive fixes
- Image optimization setup
- Typography scaling
- Issues severity=medium

**Phase 4: Polish & Optimization (low priority)**
- Defensive CSS improvements
- Performance optimizations
- Edge case handling
- Issues severity=low

### Step 6: Execution Order Definition

Definir a ordem exata de execucao dentro de cada fase.

- Ordenar por: dependencias → impacto → esforco
- Marcar tasks paralelizaveis
- Definir checkpoints de validacao entre fases
- Estimar timeline para cada fase
- Alocar executores por fase (se team_size > 1)

### Step 7: Risk Assessment

Avaliar riscos do plano de correcao.

- Identificar fixes com alto risco de regressao
- Mapear areas que precisam de testes mais rigorosos
- Definir rollback strategy para cada fase
- Identificar pontos de no-return (mudancas estruturais)

### Step 8: Generate Fix Plan Document

Compilar o plano de correcao final.

- Summary executivo com metricas
- Impact-effort matrix visual
- Dependency graph
- Fases detalhadas com tasks, executores e timeline
- Risk register
- Definition of Done para cada fase

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| fix-plan.md | Markdown | Plano de correcao priorizado com fases e timeline |
| execution-order.json | JSON | Ordem de execucao estruturada para routing entre agents |
| dependency-graph.md | Markdown | Grafico de dependencias entre fixes |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Audit report ausente ou incompleto | BLOCK — executar responsive-audit primeiro | NON-NEGOTIABLE |
| findings.json invalido ou vazio | BLOCK — auditoria nao produziu issues parseveis | NON-NEGOTIABLE |
| Zero issues encontrados na auditoria | BLOCK — nada a planejar, projeto responsivo | NON-NEGOTIABLE |
| Mais de 200 issues | WARN — recomendar scope reduction por area | WARNING |

---

## Completion Criteria

- [ ] Todos os issues do audit report endereçados no plano
- [ ] Impact-effort matrix gerada para cada issue
- [ ] Dependencias entre fixes mapeadas
- [ ] Fases definidas com ordem de execucao clara
- [ ] Estimativa de esforco total calculada
- [ ] Risk assessment completo
- [ ] Plano pronto para handoff ao implement-fixes
- [ ] execution-order.json gerado para routing

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches template specification
- [ ] No critical issues in output
