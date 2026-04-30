# Squad Franchising Avend v1.0.0-pro

**Gestao e Expansao de Rede de Franquias de Vending Machines**
**Prefix:** `Avend` | **Pattern:** `FA` | **Entry Agent:** `@franchise-chief`

---

## Overview

Squad completo para gestao da maior rede de franquias de vending machines do Brasil — **Avend Franquias**. Fundada por **Guilherme Alvares**, a Avend opera 184 maquinas com 90 contratos de franquia ativos, faturamento estimado de ~R$20M, associada ABF.

Este squad cobre o ciclo completo de franchising: avaliacao de franqueabilidade, formatacao (COF, manuais, contratos), recrutamento e qualificacao de franqueados, onboarding, operacao, monitoramento de rede e expansao territorial. Modelo de microfranquia de vending machines com compliance total a Lei 13.966/2019.

13 agentes especializados organizados em 4 tiers + orchestrator, cada um com mind injection de especialistas reais do setor de franchising.

---

## Architecture

```
                    +--------------------+
                    |   Navigator (Chief) |   Orchestrator
                    +--------------------+
                             |
            +----------------+----------------+
            |                                 |
   +--------v--------+              +--------v--------+
   |    TIER 0        |              |    TIER 1        |
   | Strategy &       |              | Operations &     |
   | Governance       |              | Finance          |
   +---------+--------+              +--------+--------+
   | Gerber           |              | Mestre Cherto    |
   | Siebert          |              | Ops Seid         |
   +------------------+              | Campo Praxis     |
                                     | Lifecycle Vecchi |
            +----------------+       | Growth Mathews   |
            |                |       +------------------+
   +--------v--------+      |
   |    TIER 2        |      +-------+--------+
   | Specialist       |              |
   | Operations       |     +--------v--------+
   +---------+--------+     |    TIER 3        |
   | The Franchise    |     | (not in config)  |
   |   Modeler        |     +------------------+
   | The Franchise    |
   |   Counselor      |
   | The Manual       |
   |   Architect      |
   | The University   |
   |   Architect      |
   | The Franchise    |
   |   Whisperer      |
   +------------------+
```

---

## Agents (13)

| # | Agent ID | Name | Tier | Mind | Role |
|---|----------|------|------|------|------|
| 1 | `franchising-chief` | Navigator | Orchestrator | - | Orquestrador Principal do Franchising Avend Squad |
| 2 | `franchise-architect` | Gerber | T0 | Michael E. Gerber | Designer de Sistemas Replicaveis |
| 3 | `franchise-assessor` | Siebert | T0 | Mark Siebert | Avaliador de Franqueabilidade |
| 4 | `franchise-master-br` | Mestre Cherto | T1 | Marcelo Cherto | Brazilian Franchise Strategy Master |
| 5 | `franchise-operations` | Ops Seid | T1 | Michael Seid | Franchise Operations Master |
| 6 | `franchise-field-ops` | Campo Praxis | T1 | Adir Ribeiro | Field Operations & Network Management |
| 7 | `franchise-lifecycle` | Lifecycle Vecchi | T1 | Ana Vecchi | Franchise Lifecycle & Internationalization |
| 8 | `franchise-growth` | Growth Mathews | T1 | Joe Mathews | Network Growth & Franchisee Recruitment |
| 9 | `franchise-financial` | The Franchise Modeler | T2 | - | Franchise Financial Modeler |
| 10 | `franchise-legal` | The Franchise Counselor | T2 | Andrew Sherman | Franchise Legal & Compliance Specialist |
| 11 | `franchise-documentation` | The Manual Architect | T2 | Penny Hopkinson | Operations Manual & SOP Creator |
| 12 | `franchise-training` | The University Architect | T2 | - | Franchise University Architect |
| 13 | `franchise-relationship` | The Franchise Whisperer | T2 | Greg Nathan | Franchisee Relationship Manager |

---

## Tasks (12)

| ID | Name | Executor | Description |
|----|------|----------|-------------|
| FA-T-001 | Franchisability Assessment | hybrid | Avaliacao de franqueabilidade do negocio nos 8 pilares |
| FA-T-002 | Financial Modeling | agent | Modelagem financeira completa: unit economics, DRE, payback |
| FA-T-003 | COF Drafting | hybrid | Elaboracao da COF conforme Lei 13.966/2019 |
| FA-T-004 | Operations Manual | agent | Criacao do manual de operacoes da franquia |
| FA-T-005 | Training Program Design | agent | Design do programa de treinamento de franqueados |
| FA-T-006 | Franchisee Screening | hybrid | Triagem e qualificacao de candidatos a franqueado |
| FA-T-007 | Territory Analysis | agent | Analise e mapeamento de territorios para expansao |
| FA-T-008 | Network Health Check | agent | Analise de saude da rede com KPIs e benchmarking |
| FA-T-009 | Franchisee Onboarding | hybrid | Onboarding completo de novo franqueado |
| FA-T-010 | Operations Audit | hybrid | Auditoria operacional de unidade franqueada |
| FA-T-011 | Expansion Planning | agent | Planejamento de expansao territorial |
| FA-T-012 | Recruitment Marketing | agent | Estrategia de marketing para recrutamento de franqueados |

---

## Workflows (3)

| ID | Name | Phases | Description |
|----|------|--------|-------------|
| franchise-launch | Franchise Launch | 4 | Lancamento completo de franquia (assessment, formatting, pilot, scale) |
| franchisee-onboarding | Franchisee Onboarding | 3 | Onboarding de novo franqueado (screening, setup, launch) |
| network-health-review | Network Health Review | 3 | Review trimestral de saude da rede |

---

## Templates (5)

| File | Description |
|------|-------------|
| `cof-tmpl.md` | Template para Circular de Oferta de Franquia |
| `expansion-plan-tmpl.md` | Template para plano de expansao territorial |
| `franchisee-profile-tmpl.md` | Template para perfil de candidato a franqueado |
| `network-health-report-tmpl.md` | Template para relatorio de saude da rede |
| `unit-economics-tmpl.md` | Template para modelagem de unit economics |

---

## Checklists (4)

| File | Description |
|------|-------------|
| `cof-compliance-checklist.md` | Checklist de compliance da COF com Lei 13.966/2019 |
| `franchisee-qualification-checklist.md` | Checklist de qualificacao de candidato a franqueado |
| `onboarding-completion-checklist.md` | Checklist de conclusao de onboarding |
| `operations-audit-checklist.md` | Checklist de auditoria operacional |

---

## Minds (10)

| # | Mind | Associated Agent | Expertise |
|---|------|-----------------|-----------|
| 1 | Michael E. Gerber | franchise-architect | E-Myth Worldwide, sistemas replicaveis |
| 2 | Mark Siebert | franchise-assessor | iFranchise Group, avaliacao de franqueabilidade |
| 3 | Marcelo Cherto | franchise-master-br | Grupo Cherto / ABF, franchising brasileiro |
| 4 | Michael Seid | franchise-operations | MSA Worldwide, operacoes de franquia |
| 5 | Adir Ribeiro | franchise-field-ops | Praxis Business, operacoes de campo |
| 6 | Ana Vecchi | franchise-lifecycle | Vecchi Ancona Consulting, ciclo de vida |
| 7 | Joe Mathews | franchise-growth | Franchise Performance Group, crescimento |
| 8 | Andrew Sherman | franchise-legal | Franchise law authority, compliance |
| 9 | Penny Hopkinson | franchise-documentation | BFA advisor, manuais operacionais |
| 10 | Greg Nathan | franchise-relationship | Franchise Relationships Institute, E-Factor |

---

## Quick Start

```bash
# Ativar o squad
@franchise-chief

# Comandos rapidos
*help                          # Lista de comandos
*assess                        # Avaliacao de franqueabilidade
*model-financials              # Modelagem financeira
*draft-cof                     # Redigir COF
*screen-candidate              # Qualificar candidato
*network-health                # Saude da rede
```

---

## Commands

```bash
# Validacao estrutural
./scripts/validate-squad.sh

# Dashboard de estatisticas
./scripts/squad-stats.sh

# Relatorio de fidelidade dos agentes
./scripts/fidelity-report.sh
./scripts/fidelity-report.sh --csv
```

---

## Quality Standards

- **8 Quality Gates** definidos em `config/quality-gates.yaml`
- **Veto Conditions** em `config/veto-conditions.yaml`
- **Heuristics** em `config/heuristics.yaml`
- **Smoke Tests** para validacao rapida dos agentes
- **Golden Baselines** para benchmarking de respostas
- Compliance total com Lei 13.966/2019 (Lei de Franquias)
- Associada ABF (Associacao Brasileira de Franchising)

---

*Synkra AIOX | Squad Franchising Avend v1.0.0-pro*
