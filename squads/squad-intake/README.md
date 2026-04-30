# Squad Intake — Client Intake & Briefing

Squad especializado em coletar informacoes completas e estruturadas sobre o negocio de novos clientes para viabilizar o inicio de qualquer tipo de projeto.

## Filosofia

> "Diagnose before prescribing. Listen before asking. Understand before building."

Baseado em 6 elite minds com frameworks documentados de entrevista, discovery e onboarding de clientes.

## Fluxo de Uso

```
1. *new-intake {cliente}     → Inicia fluxo completo (7 fases)
2. *quick-intake {cliente}   → Versao rapida (so briefing)
3. *prepare-meeting {cliente} → Gera roteiro de reuniao
```

### Fluxo Completo (7 fases)

```
Preparacao → Reuniao → Briefing → Analise → Follow-up → Classificacao → Handoff
     |          |          |          |          |            |            |
  roteiro    notas     question.   report    perguntas    tipo/risk   intake-report
  + email   + qualify   person.   + gaps    adicionais   complex.    → squad-pm
```

## Agents

| Agent | Mind | Tier | Foco |
|-------|------|------|------|
| `intake-chief` (Iris) | Funcional | Orchestrator | Orquestra fluxo completo |
| `rob-fitzpatrick` | The Mom Test | Tier 0 | Entrevista sem vies — 3 regras para extrair fatos |
| `indi-young` | Mental Models | Tier 0 | Escuta profunda — motivacoes e modelos mentais |
| `alan-weiss` | Conceptual Agreement | Tier 1 | Objetivos/Medidas/Valor — estruturacao do intake |
| `blair-enns` | Win Without Pitching | Tier 1 | Diagnostico de expert — qualificacao de fit |
| `donna-weber` | Orchestrated Onboarding | Tier 2 | Processo estruturado — experiencia do cliente |
| `erika-hall` | Just Enough Research | Tier 2 | Analise pragmatica — deteccao de gaps e vieses |

## Comandos

### Intake
| Comando | Descricao |
|---------|-----------|
| `*new-intake {client}` | Iniciar intake completo (7 fases) |
| `*quick-intake {client}` | Intake rapido (so briefing) |
| `*prepare-meeting {client}` | Gerar roteiro de reuniao |
| `*generate-briefing {client}` | Gerar questionario pos-reuniao |
| `*analyze {client}` | Analisar respostas do briefing |
| `*gaps {client}` | Detectar gaps e gerar follow-up |
| `*classify {client}` | Classificar tipo/complexidade do projeto |
| `*report {client}` | Gerar relatorio consolidado |

### Utilidade
| Comando | Descricao |
|---------|-----------|
| `*status {client}` | Ver status do intake |
| `*list` | Listar intakes em andamento |
| `*help` | Mostrar comandos disponiveis |
| `*exit` | Sair do modo intake |

## Tipos de Projeto Suportados

O briefing se adapta automaticamente ao tipo de projeto com perguntas especificas:

| Tipo | Perguntas Extras |
|------|-----------------|
| **Web App / Sistema** | Roles, admin, volume de dados |
| **Mobile App** | Plataformas, offline, device features |
| **Website** | SEO, CMS, conversao, conteudo |
| **Automacao** | Processos, triggers, aprovacoes |
| **SaaS** | Pricing, multi-tenant, trial |
| **E-commerce** | SKUs, pagamento, logistica |

## Artefatos Gerados

Para cada cliente, o squad gera em `docs/intake/{client}/`:

| Artefato | Fase | Descricao |
|----------|------|-----------|
| `welcome-email.md` | 1 | Email de boas-vindas pre-reuniao |
| `roteiro-reuniao.md` | 1 | Roteiro com 5 blocos de perguntas |
| `discovery-notes.md` | 2 | Notas processadas da reuniao |
| `qualification-score.md` | 2 | Score de fit (4 dimensoes) |
| `briefing.md` | 3 | Questionario personalizado |
| `briefing-email.md` | 3 | Email de envio do briefing |
| `analysis-report.md` | 4 | Analise: completude, gaps, insights |
| `followup-questions.md` | 5 | Perguntas para gaps detectados |
| `project-classification.md` | 6 | Tipo, complexidade, riscos |
| `intake-report.md` | 7 | Relatorio final consolidado |
| `handoff-summary.md` | 7 | Resumo para squad-pm |

## Handoffs

| De | Para | Quando |
|----|------|--------|
| squad-intake | squad-pm:discovery-session | Intake completo, precisa de discovery |
| squad-intake | squad-pm:write-prd | Intake + discovery completos |
| squad-intake | squad-pm:project-diagnostic | Classificacao complexa |

## Quality Gates

| Gate | Check | Blocking |
|------|-------|----------|
| QG-INT-001 | Completude >= 85% | Sim |
| QG-INT-002 | Zero gaps CRITICAL pendentes | Sim |
| QG-INT-003 | Objetivos sao outcomes mensuraveis | Sim |
| QG-INT-004 | Client qualified (fit >= 10/20) | Sim |

## Frameworks Integrados

- **The Mom Test** (Rob Fitzpatrick) — 3 regras para entrevistas sem vies
- **Conceptual Agreement** (Alan Weiss) — Objetivos → Medidas → Valor
- **Mental Models** (Indi Young) — Listening sessions e escuta profunda
- **Win Without Pitching** (Blair Enns) — Diagnostico antes de proposta
- **Orchestrated Onboarding** (Donna Weber) — 6 fases de onboarding
- **Just Enough Research** (Erika Hall) — Analise pragmatica

## Ativacao

```
/squad-intake:intake-chief
```

---

*Squad Intake v1.0.0 — Criado via PRO Pipeline*
