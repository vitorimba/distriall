# Squad Supabase

**Especialista em Supabase e PostgreSQL** — análises complexas, otimização, segurança, automação e migração de bancos de dados.

## Quick Start

```bash
# Ativar o squad
@supabase-chief

# Ou ativar agente específico
@SquadSupabase:diagnostician   # Health check e diagnóstico
@SquadSupabase:optimizer       # Performance e indexação
@SquadSupabase:migrator        # Migração entre projetos
@SquadSupabase:analyst         # Data quality e correção
@SquadSupabase:guardian        # Segurança e RLS
@SquadSupabase:automator       # Automação e scheduling
```

## Agentes

| Agent | Persona | Tier | Mind Base | Especialidade |
|-------|---------|------|-----------|---------------|
| `supabase-chief` | Atlas 🗺️ | Orchestrator | — | Roteamento e coordenação |
| `diagnostician` | Scout 🔍 | 0 | Paul Copplestone | Health check, triage, auditoria |
| `optimizer` | Turbo ⚡ | 1 | Markus Winand | Performance, indexação, queries |
| `migrator` | Voyager 🚀 | 1 | Dimitri Fontaine | Migração entre contas |
| `analyst` | Sage 🧠 | 1 | Joe Celko | Data quality, normalização |
| `guardian` | Shield 🛡️ | 2 | Stephen Frost | RLS, segurança, permissions |
| `automator` | Cron ⚙️ | 3 | Supabase Collective | pg_cron, triggers, webhooks |

## Use Cases

1. **Análise de dados e correção** → `@SquadSupabase:diagnostician` → `@SquadSupabase:analyst`
2. **Melhorias e organização** → `@SquadSupabase:diagnostician` → `@SquadSupabase:optimizer`
3. **Otimização de performance** → `@SquadSupabase:optimizer`
4. **Automação hands-off** → `@SquadSupabase:automator`
5. **Migração entre contas** → `@SquadSupabase:migrator`

## Workflows

| Workflow | Trigger | Duration | Description |
|----------|---------|----------|-------------|
| Full Database Audit | `*audit` | 30-60 min | Auditoria completa (6 fases) |
| Project Migration | `*migrate` | 1-4 hours | Migração Supabase-to-Supabase |
| Performance Optimization | `*optimize` | 20-45 min | Diagnóstico → otimização → validação |

## Tasks

| Task | Agent | Description |
|------|-------|-------------|
| health-check | diagnostician | Scan de saúde completo |
| performance-audit | optimizer | Análise profunda de performance |
| data-quality-scan | analyst | Scan de qualidade de dados (6 dimensões) |
| rls-audit | guardian | Auditoria de Row Level Security |
| setup-automation | automator | Configurar automação |
| migrate-project | migrator | Migração completa de projeto |

## Quality Gates

| Gate | Name | Type |
|------|------|------|
| QG-001 | Request Classification | Routing |
| QG-002 | Diagnosis Complete | Blocking |
| QG-003 | Impact Assessment | Blocking |
| QG-004 | Security Review | Blocking |
| QG-005 | Output Validation | Blocking |
| QG-006 | Rollback & Recovery | Blocking |

## Structure

```
squad-supabase/
├── agents/           # 7 agent definitions
├── tasks/            # 6 executable tasks
├── workflows/        # 3 multi-phase workflows
├── templates/        # 5 output templates
├── checklists/       # 4 validation checklists
├── data/             # KB + patterns + playbooks
├── minds/            # 6 expert mind structures
├── docs/             # Documentation
├── scripts/          # Utility scripts
├── config.yaml       # Squad configuration
└── README.md         # This file
```

## Research Foundation

Built on frameworks from 6 elite minds:
- **Paul Copplestone** — Supabase architecture, "Postgres as substrate"
- **Markus Winand** — SQL performance, "Use The Index, Luke"
- **Dimitri Fontaine** — PostgreSQL migrations, "The Art of PostgreSQL"
- **Joe Celko** — Data quality, SQL standards, set-based thinking
- **Stephen Frost** — Row Level Security, PostgreSQL security
- **Supabase Collective** — Automation patterns, Edge Functions, pg_cron

---

*Squad Supabase v1.0.0 — Synkra AIOX*
