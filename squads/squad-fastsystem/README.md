# Squad FastSystem

> **System Performance & Speed Optimization**
> v1.1.0 | AIOX Squad Standard v4.0.0-pro

---

## Overview

O **Squad FastSystem** e o squad especializado em performance de sistemas dentro do ecossistema AIOX. Cobre todo o stack de performance: desde profiling de kernel e analise de queries ate otimizacao de frontend e estrategias de caching.

### Missao

Garantir que todo sistema sob responsabilidade do AIOX opere com performance otima, latencia minima e capacidade de escalar conforme demanda.

### Principios

1. **Measure First** — Nunca otimize sem baseline e metricas
2. **Data-Driven** — Decisoes baseadas em profiling, nao em intuicao
3. **Budget-Oriented** — Performance budgets definem limites aceitaveis
4. **Resilience-Aware** — Performance sem resiliencia e fragil
5. **Cost-Conscious** — Otimizacao considera custo de infraestrutura

---

## Quick Start

```bash
# Ativar o squad
@fastsystem

# Diagnostico rapido do sistema
@fastsystem *system-diagnostic

# Auditoria de performance frontend
@fastsystem *frontend-audit

# Otimizacao de queries
@fastsystem *query-optimization

# Playbook: sistema lento em producao
@fastsystem *playbook producao-lenta
```

---

## Architecture

### Tier Diagram

```
                    ┌─────────────────────────┐
                    │     ORCHESTRATOR        │
                    │   Velocity (Chief)      │
                    └────────┬────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────┴─────┐ ┌─────┴─────┐ ┌──────┴──────┐
        │    T0     │ │    T0     │ │ SPECIALIST  │
        │  Gregg    │ │  Majors   │ │   Cache     │
        │ (Profiler)│ │  (Observ) │ │ (Caching)   │
        └───────────┘ └───────────┘ └─────────────┘
              │              │
    ┌─────────┼─────────┬────┴────────┐
    │         │         │             │
┌───┴───┐┌───┴───┐┌────┴────┐┌──────┴───┐
│  T1   ││  T1   ││  T1     ││    T1    │
│WebPerf││Markus ││Kleppmann││  Nygard  │
│(Front)││(DB)   ││(SysArch)││(Resilie.)│
└───────┘└───────┘└─────────┘└──────────┘
              │
    ┌─────────┼──────────┐
    │         │          │
┌───┴───┐┌───┴───┐┌─────┴───┐
│  T2   ││  T2   ││   T2    │
│ Alex  ││Nicole ││  Chris  │
│(Scale)││(Deliv)││(Micros) │
└───────┘└───────┘└─────────┘
```

### Agent Summary

| Agent | Name | Tier | Mind | Role |
|-------|------|------|------|------|
| `fastsystem-chief` | Velocity | Orchestrator | — | Orquestra analises, prioriza otimizacoes |
| `system-profiler` | Gregg | T0 | Brendan Gregg | Diagnostico de sistema, USE method, flame graphs |
| `observability-engineer` | Majors | T0 | Charity Majors | Instrumentacao, metricas, tracing distribuido |
| `web-performance-engineer` | WebPerf | T1 | Addy Osmani | Web Vitals, bundle optimization, rendering |
| `database-optimizer` | Markus | T1 | Markus Winand | Query tuning, indexacao, EXPLAIN plans |
| `system-architect` | Kleppmann | T1 | Martin Kleppmann | Arquitetura de sistemas de dados, distributed systems |
| `resilience-engineer` | Nygard | T1 | Michael Nygard | Circuit breakers, bulkheads, graceful degradation |
| `scalability-designer` | Alex | T2 | Alex Xu | Horizontal/vertical scaling, capacity planning |
| `delivery-accelerator` | Nicole | T2 | Nicole Forsgren | CI/CD speed, DORA metrics |
| `microservices-optimizer` | Chris | T2 | Martin Kleppmann | Service mesh, distributed patterns |
| `caching-specialist` | Cache | Specialist | Steve Souders | Multi-layer caching, invalidation, CDN |

---

## Tasks

| ID | Task | Agent Padrao | Descricao |
|----|------|-------------|-----------|
| FS-T-001 | `system-diagnostic` | Gregg | Diagnostico completo usando USE method |
| FS-T-002 | `query-optimization` | Markus | Otimizacao de queries SQL |
| FS-T-003 | `frontend-audit` | WebPerf | Auditoria Web Vitals + Lighthouse |
| FS-T-004 | `caching-strategy` | Cache | Design de caching multi-camada |
| FS-T-005 | `load-testing` | Alex | Planejamento e execucao de load tests |
| FS-T-006 | `bottleneck-analysis` | Velocity | Identificacao e correcao de gargalos |
| FS-T-007 | `resilience-audit` | Nygard | Avaliacao de padroes de estabilidade |
| FS-T-008 | `deployment-pipeline-optimization` | Nicole | Otimizacao de CI/CD |
| FS-T-009 | `database-indexing` | Markus | Design de estrategia de indices |
| FS-T-010 | `api-latency-reduction` | Kleppmann | Reducao de latencia de APIs |
| FS-T-011 | `capacity-planning` | Velocity | Estimativa e planejamento de capacidade |
| FS-T-012 | `performance-budget` | Velocity | Definicao e enforcement de budgets |

---

## Workflows

| Workflow | Fases | Descricao |
|----------|-------|-----------|
| `performance-triage` | 5 | Diagnostic → Profile → Identify → Fix → Verify |
| `full-system-optimization` | 8 | Pipeline completo de otimizacao end-to-end |
| `incident-response-performance` | 6 | Resposta a incidentes de performance em producao |
| `scaling-readiness` | 7 | Preparar sistema para escalar 10x |

---

## Templates

| Template | Descricao |
|----------|-----------|
| `performance-audit-report-tmpl.md` | Relatorio completo de auditoria de performance |
| `bottleneck-analysis-tmpl.md` | Template de identificacao de gargalos |
| `caching-strategy-tmpl.md` | Documento de design de caching |
| `capacity-planning-tmpl.md` | Template de estimativa de capacidade |
| `optimization-roadmap-tmpl.md` | Plano de otimizacao priorizado |
| `dora-metrics-dashboard-tmpl.md` | Relatorio de metricas DORA |

---

## Checklists

| Checklist | Itens | Descricao |
|-----------|-------|-----------|
| `pre-deployment-performance-checklist.md` | 25+ | Verificacoes antes do deploy |
| `database-performance-checklist.md` | 20+ | Otimizacao de banco de dados |
| `frontend-performance-checklist.md` | 20+ | Web Vitals e frontend |
| `resilience-checklist.md` | 20+ | Padroes de estabilidade |
| `caching-checklist.md` | 15+ | Configuracao de cache |

---

## Playbooks

| Playbook | Trigger | Descricao |
|----------|---------|-----------|
| `producao-lenta.md` | Sistema lento em producao | Diagnostico e correcao emergencial |
| `migracao-sem-downtime.md` | Migracao planejada | Migracao sem perda de performance |
| `escalar-10x.md` | Crescimento esperado | Preparar para 10x de trafego |
| `otimizar-custo-cloud.md` | Custo elevado | Reduzir custo sem perder performance |

---

## Elite Minds

O Squad FastSystem incorpora o conhecimento de 10 referências mundiais em performance:

| Mind | Expert | Dominio | Heuristicas |
|------|--------|---------|-------------|
| `brendan_gregg` | Brendan Gregg | Systems Performance, eBPF | BG_USE_001, BG_USE_002 |
| `charity_majors` | Charity Majors | Observability, Honeycomb | CM_OBS_001, CM_OBS_002 |
| `addy_osmani` | Addy Osmani | Web Performance, Chrome | AO_WP_001, AO_WP_002 |
| `steve_souders` | Steve Souders | Web Performance Rules | SS_WP_001, SS_WP_002 |
| `markus_winand` | Markus Winand | SQL Performance, Indexing | MW_SQL_001, MW_SQL_002 |
| `martin_kleppmann` | Martin Kleppmann | Distributed Systems, DDIA | MK_DS_001, MK_DS_002 |
| `michael_nygard` | Michael Nygard | Release It!, Resilience | MN_RE_001, MN_RE_002 |
| `alex_xu` | Alex Xu | System Design, APIs | AX_SD_001, AX_SD_002 |
| `chris_richardson` | Chris Richardson | Microservices Patterns | CR_MS_001, CR_MS_002 |
| `nicole_forsgren` | Nicole Forsgren | DORA, Accelerate | NF_DO_001, NF_DO_002 |

### Fontes Primarias

- **Systems Performance** (Brendan Gregg, 2020)
- **Observability Engineering** (Charity Majors et al., 2022)
- **Learning Patterns** (Addy Osmani, 2021)
- **High Performance Web Sites** (Steve Souders, 2007)
- **SQL Performance Explained** (Markus Winand, 2012)
- **Designing Data-Intensive Applications** (Martin Kleppmann, 2017)
- **Release It!** (Michael Nygard, 2018)
- **System Design Interview** (Alex Xu, 2020)
- **Microservices Patterns** (Chris Richardson, 2018)
- **Accelerate** (Nicole Forsgren et al., 2018)

---

## Slash Commands Reference

### Diagnostico
```
@fastsystem *system-diagnostic       # Diagnostico completo USE method
@fastsystem *bottleneck-analysis     # Encontrar gargalos
@fastsystem *frontend-audit          # Auditoria Web Vitals
```

### Otimizacao
```
@fastsystem *query-optimization      # Otimizar queries SQL
@fastsystem *caching-strategy        # Design de caching
@fastsystem *api-latency-reduction   # Reduzir latencia de API
@fastsystem *database-indexing       # Estrategia de indices
@fastsystem *deployment-pipeline-optimization  # CI/CD speed
```

### Planejamento
```
@fastsystem *capacity-planning       # Estimativa de capacidade
@fastsystem *performance-budget      # Definir budgets
@fastsystem *load-testing            # Planejar load tests
```

### Resiliencia
```
@fastsystem *resilience-audit        # Audit de resiliencia
```

### Workflows
```
@fastsystem *workflow performance-triage           # Triage rapido
@fastsystem *workflow full-system-optimization     # Otimizacao completa
@fastsystem *workflow incident-response-performance # Incidente em prod
@fastsystem *workflow scaling-readiness            # Preparar para escalar
```

### Playbooks
```
@fastsystem *playbook producao-lenta         # Sistema lento
@fastsystem *playbook migracao-sem-downtime  # Migracao segura
@fastsystem *playbook escalar-10x            # Escalar 10x
@fastsystem *playbook otimizar-custo-cloud   # Reduzir custo
```

---

## Data & Knowledge Base

| Arquivo | Descricao |
|---------|-----------|
| `data/fastsystem-kb.md` | Knowledge base completa do dominio |
| `data/performance-benchmarks.yaml` | Benchmarks da industria |
| `data/optimization-patterns.yaml` | Catalogo de padroes de otimizacao |
| `data/tool-reference.yaml` | Ferramentas por camada |
| `data/anti-patterns-catalog.yaml` | Anti-patterns com correcoes |

---

## Config & Governance

| Arquivo | Descricao |
|---------|-----------|
| `config/veto-conditions.yaml` | 30+ condicoes de veto |
| `config/quality-gates.yaml` | 6 quality gates |
| `config/heuristics.yaml` | 15+ heuristicas consolidadas |

---

## Benchmarks & Validation

| Arquivo | Descricao |
|---------|-----------|
| `benchmarks/smoke-test-suite.md` | 33 smoke tests (3 por agente) |
| `benchmarks/baseline-registry.yaml` | Baselines de performance |

---

## Scripts

| Script | Descricao |
|--------|-----------|
| `scripts/validate-squad.sh` | Validador estrutural do squad |
| `scripts/squad-stats.sh` | Dashboard de estatisticas |
| `scripts/fidelity-report.sh` | Relatorio de fidelidade por agente |

---

## Directory Structure

```
squad-fastsystem/
├── config.yaml                 # Squad configuration
├── README.md                   # This file
├── CHANGELOG.md                # Version history
├── package.json                # NPM package
├── tasks/                      # 12 task definitions
│   ├── system-diagnostic.md
│   ├── query-optimization.md
│   ├── frontend-audit.md
│   ├── caching-strategy.md
│   ├── load-testing.md
│   ├── bottleneck-analysis.md
│   ├── resilience-audit.md
│   ├── deployment-pipeline-optimization.md
│   ├── database-indexing.md
│   ├── api-latency-reduction.md
│   ├── capacity-planning.md
│   └── performance-budget.md
├── workflows/                  # 4 workflow definitions
│   ├── performance-triage.yaml
│   ├── full-system-optimization.yaml
│   ├── incident-response-performance.yaml
│   └── scaling-readiness.yaml
├── templates/                  # 6 document templates
│   ├── performance-audit-report-tmpl.md
│   ├── bottleneck-analysis-tmpl.md
│   ├── caching-strategy-tmpl.md
│   ├── capacity-planning-tmpl.md
│   ├── optimization-roadmap-tmpl.md
│   └── dora-metrics-dashboard-tmpl.md
├── checklists/                 # 5 checklists
│   ├── pre-deployment-performance-checklist.md
│   ├── database-performance-checklist.md
│   ├── frontend-performance-checklist.md
│   ├── resilience-checklist.md
│   └── caching-checklist.md
├── data/                       # 5 data files
│   ├── fastsystem-kb.md
│   ├── performance-benchmarks.yaml
│   ├── optimization-patterns.yaml
│   ├── tool-reference.yaml
│   └── anti-patterns-catalog.yaml
├── playbooks/                  # 4 playbooks
│   ├── producao-lenta.md
│   ├── migracao-sem-downtime.md
│   ├── escalar-10x.md
│   └── otimizar-custo-cloud.md
├── config/                     # 3 governance files
│   ├── veto-conditions.yaml
│   ├── quality-gates.yaml
│   └── heuristics.yaml
├── scripts/                    # 3 utility scripts
│   ├── validate-squad.sh
│   ├── squad-stats.sh
│   └── fidelity-report.sh
├── benchmarks/                 # 2 benchmark files
│   ├── smoke-test-suite.md
│   └── baseline-registry.yaml
├── minds/                      # 10 elite minds
│   ├── brendan_gregg/
│   ├── charity_majors/
│   ├── addy_osmani/
│   ├── steve_souders/
│   ├── markus_winand/
│   ├── martin_kleppmann/
│   ├── michael_nygard/
│   ├── alex_xu/
│   ├── chris_richardson/
│   └── nicole_forsgren/
└── docs/                       # Documentation
```

---

*Squad FastSystem v1.1.0 — AIOX Squad Standard v4.0.0-pro*
