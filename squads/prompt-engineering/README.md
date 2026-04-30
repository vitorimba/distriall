# Prompt Engineering Squad

> System Prompts & Prompt Engineering para Agentes de IA
> 8 elite minds com frameworks documentados | Pipeline de 8 fases

## Objetivo

Criar system prompts poderosos e production-ready para agentes de IA de atendimento, vendas, suporte, onboarding, cobranca e mais.

## Tier System

### Orchestrator
| Agent | Papel |
|-------|-------|
| **@prompt-chief** | Triage, routing e coordenacao do pipeline |

### Tier 0 — Diagnostico & Selecao de Tecnicas
| Agent | Baseado em | Framework |
|-------|-----------|-----------|
| **@elvis-saravia** | Elvis Saravia (DAIR.AI) | Taxonomia de 58 tecnicas de prompting |
| **@sander-schulhoff** | Sander Schulhoff (LearnPrompting) | The Prompt Report + HackAPrompt |

### Tier 1 — Arquitetura & Design Masters
| Agent | Baseado em | Framework |
|-------|-----------|-----------|
| **@lilian-weng** | Lilian Weng (OpenAI) | Agent = Planning + Memory + Tools |
| **@amanda-askell** | Amanda Askell (Anthropic) | Character Design Methodology |
| **@simon-willison** | Simon Willison | Agentic Engineering Patterns + Security |

### Tier 2 — Framework Systematizers
| Agent | Baseado em | Framework |
|-------|-----------|-----------|
| **@james-phoenix** | James Phoenix & Mike Taylor (O'Reilly) | Five Principles of Prompting |
| **@sheila-teo** | Sheila Teo | CO-STAR Framework |
| **@chip-huyen** | Chip Huyen (Stanford/NVIDIA) | AI Engineering Systems |

## Pipeline de Criacao

```
*create-prompt {tipo}

  Phase 1: @elvis-saravia    → Diagnostico de tecnicas
  Phase 2: @lilian-weng      → Arquitetura do agente
  Phase 3: @amanda-askell    → Design de persona/character
  Phase 4: @sheila-teo       → Estrutura CO-STAR
  Phase 5: @james-phoenix    → Validacao Five Principles
  Phase 6: @simon-willison   → Seguranca e guardrails
  Phase 7: @sander-schulhoff → Avaliacao e testes
  Phase 8: @chip-huyen       → Production readiness
```

## Comandos Principais

| Comando | Descricao |
|---------|-----------|
| `*create-prompt {tipo}` | Criar system prompt completo |
| `*review-prompt` | Revisar prompt existente |
| `*diagnose {tipo}` | Diagnosticar melhores tecnicas |
| `*persona-design {tipo}` | Projetar persona do agente |
| `*security-check` | Verificar vulnerabilidades |
| `*costar {prompt}` | Aplicar framework CO-STAR |
| `*validate {prompt}` | Validar contra Five Principles |
| `*production-check` | Verificar prontidao para producao |

## Tipos de Agente Suportados

- **Sales** — Agentes de vendas consultivas
- **Support** — Suporte tecnico e atendimento
- **Service** — Agendamento e servicos
- **Onboarding** — Integracao de novos usuarios
- **Collections** — Cobranca e recuperacao
- **Triage** — Triagem e roteamento

## Estrutura do Squad

```
squads/prompt-engineering/
├── agents/           # 9 agentes (1 orchestrator + 8 specialists)
├── tasks/            # Tasks executaveis
├── templates/        # Templates de system prompts
├── workflows/        # Workflow de criacao
├── checklists/       # Checklists de qualidade
├── data/             # Dados de referencia
├── config/           # Configuracoes
├── docs/             # Documentacao
└── minds/            # DNA extraido dos experts
```

## Quick Start

1. Ative o orchestrator: `@prompt-chief` ou `/promptEng:prompt-chief`
2. Crie um prompt: `*create-prompt sales`
3. Ou revise um existente: `*review-prompt`

---

*Prompt Engineering Squad v1.0.0 — Clone minds > create bots.*
