# PMBOK Squad

Squad educacional baseado no **PMBOK 7th Edition** para o Cohort AIOS Fundamentals.

## Visao Geral

11 agentes especializados em gerenciamento de projetos:

| # | Agente | Persona | Area PMBOK | Comando Rapido |
|---|--------|---------|------------|----------------|
| 0 | `@pm-chief` | Atlas | Orquestrador | `*plan` |
| 1 | `@integration-manager` | Iris | Integracao | `*charter` |
| 2 | `@scope-manager` | Sofia | Escopo | `*wbs` |
| 3 | `@schedule-manager` | Tempo | Cronograma | `*schedule` |
| 4 | `@cost-manager` | Dinero | Custos | `*budget` |
| 5 | `@quality-manager` | Quinn | Qualidade | `*quality-plan` |
| 6 | `@resource-manager` | Rex | Recursos | `*raci` |
| 7 | `@communications-manager` | Clara | Comunicacoes | `*comm-plan` |
| 8 | `@risk-manager` | Risco | Riscos | `*risk-register` |
| 9 | `@procurement-manager` | Petra | Aquisicoes | `*procurement-plan` |
| 10 | `@stakeholder-manager` | Stella | Partes Interessadas | `*stakeholder-register` |

## Quick Start

```bash
# Ativar o orquestrador
@pm-chief

# Gerar plano de projeto completo (ciclo PMBOK full)
*plan

# Ou usar agentes individuais
@scope-manager
*wbs
```

## Workflow Completo

O workflow `full-pmbok-cycle.yaml` executa todas as 10 areas na ordem correta:

```
Charter → Stakeholders → Escopo/WBS → Cronograma → Custos
→ Qualidade → Recursos → Comunicacao → Riscos → Aquisicoes
→ Plano Integrado
```

## Para Estudantes

Este squad demonstra na pratica:
1. **Multi-agent orchestration** — Como 11 agentes colaboram
2. **PMBOK framework** — As 10 areas de conhecimento aplicadas
3. **Task-first architecture** — Cada agente tem tasks executaveis
4. **CLI-first** — Tudo via terminal, sem UI necessaria

## Estrutura

```
squads/pmbok/
├── squad.yaml              # Manifesto do squad
├── README.md               # Este arquivo
├── agents/                 # 11 agentes (chief + 10 areas)
├── tasks/                  # Tasks executaveis por area
├── workflows/              # Ciclo PMBOK completo
├── checklists/             # Checklists de verificacao
├── templates/              # Templates de documentos
└── config/                 # Configuracoes do squad
```
