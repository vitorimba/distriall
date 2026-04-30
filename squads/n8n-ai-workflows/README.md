# 🔗 n8n AI Workflow Architects

Squad especializado em **n8n** para criar fluxos de **AI agents** para atendimento ao cliente, vendas, agendamento, RAG, multi-agent systems e automacoes inteligentes.

## Quick Start

```
@n8n-chief          # Orchestrador — ponto de entrada para tudo
@cole-medin         # RAG, Context Engineering, AI agents producao
@nate-herk          # Automacao de vendas, multi-agent, business
@max-tkacz          # n8n internals, nodes, debugging, performance
@leon-van-zyl       # WhatsApp, Telegram, email, calendar, memoria
@pawel-cislo        # Arquitetura de AI agents, design patterns
@jan-oberhauser     # Visao da plataforma, scaling, enterprise
```

## Agents (7)

### Tier 0 — Diagnostico/Arquitetura
| Agent | Baseado em | Especialidade |
|-------|-----------|---------------|
| 🔗 n8n-chief | Sintetizado | Orchestrador, diagnostico, routing |
| 🏗️ pawel-cislo | Pawel Cislo | AI Agent Architecture Patterns |
| 🌐 jan-oberhauser | Jan Oberhauser | Platform Vision, Scaling |

### Tier 1 — Masters
| Agent | Baseado em | Especialidade |
|-------|-----------|---------------|
| 🧠 cole-medin | Cole Medin | RAG, Context Engineering, Production AI |
| ⚡ nate-herk | Nate Herk | Sales Automation, Multi-Agent, Business |

### Tier 2 — Systematizers
| Agent | Baseado em | Especialidade |
|-------|-----------|---------------|
| 🔧 max-tkacz | Max Tkacz | n8n Internals, Nodes, Performance |
| 📱 leon-van-zyl | Leon van Zyl | Integrations, WhatsApp, Memory |

## Commands (n8n-chief)

| Command | Descricao |
|---------|-----------|
| `*build-agent` | Construir AI agent workflow |
| `*design-workflow` | Projetar workflow completo |
| `*build-rag` | Sistema RAG com n8n |
| `*diagnose` | Diagnosticar arquitetura ideal |
| `*review-workflow` | Auditar workflow existente |
| `*optimize-workflow` | Otimizar performance/custo |
| `*export-json` | Exportar como JSON n8n |

## Architecture Patterns

O squad trabalha com 5 patterns de AI agents no n8n:

| Pattern | Quando Usar | Complexidade |
|---------|------------|-------------|
| Single Agent | 1 tarefa, 1-3 tools | Low |
| Chained | Pipeline sequencial | Medium |
| Router | Multi-intent (suporte) | Medium |
| Orchestrator | Multi-agent delegacao | High |
| Agentic RAG | Knowledge base Q&A | High |

## Use Cases Cobertos

- **Atendimento ao Cliente** — WhatsApp/Telegram/Email AI bots
- **Vendas** — Lead qualification, follow-up automation
- **Agendamento** — Calendar bots, meeting scheduling
- **RAG** — Knowledge base Q&A com vector stores
- **Multi-Agent** — Orchestrator + sub-agents especializados
- **Voice** — AI phone agents com Retell/Vapi
- **Document Processing** — Ingestion, analysis, extraction

## Files Structure

```
squads/n8n-ai-workflows/
├── agents/                    # 7 agent files
│   ├── n8n-chief.md          # Orchestrador
│   ├── cole-medin.md         # Tier 1: RAG/Production
│   ├── nate-herk.md          # Tier 1: Business/Sales
│   ├── max-tkacz.md          # Tier 2: Platform/Nodes
│   ├── leon-van-zyl.md       # Tier 2: Integrations
│   ├── pawel-cislo.md        # Tier 0: Architecture
│   └── jan-oberhauser.md     # Tier 0: Strategy
├── tasks/
│   ├── build-agent-workflow.md
│   ├── build-rag-system.md
│   ├── design-workflow.md
│   ├── diagnose-architecture.md
│   ├── optimize-workflow.md
│   └── export-workflow.md
├── templates/
│   ├── agent-workflow-tmpl.md
│   ├── workflow-spec-tmpl.md
│   └── rag-workflow-tmpl.md
├── checklists/
│   └── workflow-quality.md
├── data/
│   ├── agent-patterns.yaml    # 5 architecture patterns
│   ├── common-mistakes.yaml   # 20+ common mistakes
│   └── optimization-patterns.yaml
├── minds/                     # Mind DNA files (6 experts)
├── config.yaml
└── README.md
```

## Quality Standards

- Todos os workflows passam pelo checklist de qualidade (38 pontos)
- Error handling obrigatorio em toda chamada externa
- Human-in-the-loop para decisoes criticas
- Cost estimation em todo workflow
- Model tiering (mini para routing, 4o para reasoning)

---

*Squad created by Squad Architect — Clone minds > create bots.*
*Based on 6 elite minds with documented frameworks.*
