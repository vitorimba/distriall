# Speech Therapy Squad

**Vocal Rehabilitation by Elite Minds**
**Version:** 1.0.0 | **Prefix:** `speechtherapy` | **Entry Agent:** `@speechtherapy-chief`

Squad especializado em reabilitacao vocal com 7 agentes: 1 orquestrador + 6 baseados em
elite minds reais da ciencia vocal e fonoaudiologia. Projetado especificamente para
cantores e profissionais da voz com nodulos vocais que requerem reabilitacao de 12 semanas.

---

## Sumario

- [Quick Start](#quick-start)
- [Agentes](#agentes)
- [Arquitetura](#arquitetura)
- [Workflow: 12-Week Nodule Recovery](#workflow-12-week-nodule-recovery)
- [Tasks](#tasks)
- [Checklists](#checklists)
- [Para Cantores com Nodulos Vocais](#para-cantores-com-nodulos-vocais)
- [Slash Commands](#slash-commands)
- [Estrutura](#estrutura)

---

## Quick Start

### Ativacao do Squad

```
@speechtherapy-chief              # Ativa o orquestrador principal
/speechtherapy:agents:speechtherapy-chief   # Via slash command
```

### Ativacao de Agentes Individuais

```
@speechtherapy:{agent-id}                   # Sintaxe geral
/speechtherapy:agents:{agent-id}            # Via slash command

# Exemplos:
@speechtherapy:ingo-titze                   # Consultar Dr. Ingo Titze (SOVT)
@speechtherapy:joseph-stemple              # Consultar Dr. Joseph Stemple (VFE)
@speechtherapy:katherine-verdolini         # Consultar Dra. Katherine Verdolini (LMRVT)
```

### Primeiros Comandos

```
*help                              # Ver comandos disponiveis
*assess                            # Iniciar avaliacao vocal completa
*sovt                              # Protocolo SOVT personalizado
*vfe                               # Programa VFE completo
*hygiene                           # Plano de higiene vocal
*nodule-rehab {semana}             # Protocolo nodulos - semana especifica
```

### Fluxo Padrao

```
1. Ative @speechtherapy-chief
2. Descreva seu caso (sintomas, historico, se e cantor, tipo de uso vocal)
3. O chief roteia para avaliacao (Tier 0 — Ingo Titze ou Mara Behlau)
4. Protocolo de exercicios prescrito (Tier 1 — Stemple ou Verdolini)
5. Especialistas adicionais acionados se necessario (Tier 2)
6. Plano de 12 semanas gerado e monitorado
```

---

## Agentes

### Tabela Completa

| # | Agent ID | Tier | Mind (Persona) | Dominio | Comando Rapido |
|---|----------|------|----------------|---------|----------------|
| 1 | `speechtherapy-chief` | Orchestrator | -- | Triage, routing, coordenacao do protocolo | `@speechtherapy-chief` |
| 2 | `ingo-titze` | Tier 0 | Dr. Ingo Titze | Biomecanica vocal, SOVT science, phonation threshold pressure | `@speechtherapy:ingo-titze` |
| 3 | `mara-behlau` | Tier 0 | Dra. Mara Behlau | Avaliacao clinica, higiene vocal, contexto brasileiro | `@speechtherapy:mara-behlau` |
| 4 | `joseph-stemple` | Tier 1 | Dr. Joseph Stemple | Vocal Function Exercises (VFE), reabilitacao laringea | `@speechtherapy:joseph-stemple` |
| 5 | `katherine-verdolini` | Tier 1 | Dra. Katherine Verdolini Abbott | Resonant Voice Therapy (LMRVT), adducao otima | `@speechtherapy:katherine-verdolini` |
| 6 | `jackie-gartner-schmidt` | Tier 2 | Dra. Jackie Gartner-Schmidt | Conversation Training Therapy (CTT), carryover | `@speechtherapy:jackie-gartner-schmidt` |
| 7 | `jacob-lieberman` | Tier 2 | Dr. Jacob Lieberman | Manual Laryngeal Therapy, MTD, circunlaringea | `@speechtherapy:jacob-lieberman` |

### Elite Minds — Referencias

| Mind | Instituicao | Principal Contribuicao |
|------|-------------|----------------------|
| **Dr. Ingo Titze** | National Center for Voice and Speech (NCVS), Univ. Iowa | SOVT theory, PTP, vocal dose, glottal aerodynamics |
| **Dra. Mara Behlau** | Centro de Estudos da Voz (CEV), Sao Paulo | Avaliacao vocal clinica, higiene vocal, voz profissional |
| **Dr. Joseph Stemple** | University of Kentucky | Vocal Function Exercises (VFE), 4-exercise protocol |
| **Dra. Katherine Verdolini Abbott** | University of Pittsburgh | LMRVT, resonant voice, continuum adductory behavior |
| **Dra. Jackie Gartner-Schmidt** | Univ. Pittsburgh Voice Center | Conversation Training Therapy (CTT) |
| **Dr. Jacob Lieberman** | Charing Cross Hospital, London | Manual laryngeal massage, MTD assessment, circumlaryngeal therapy |

---

## Arquitetura

```
ORCHESTRATOR: @speechtherapy-chief
    |
    +-- TIER 0 -- DIAGNOSTICO E FUNDAMENTOS CIENTIFICOS
    |   +-- ingo-titze          Dr. Ingo Titze: SOVT, biomecanica, PTP, dosimetria vocal
    |   +-- mara-behlau         Dra. Mara Behlau: avaliacao clinica, higiene, voz profissional
    |
    +-- TIER 1 -- REABILITACAO CENTRAL
    |   +-- joseph-stemple      Dr. Stemple: Vocal Function Exercises (VFE), 4-exercise protocol
    |   +-- katherine-verdolini Dra. Verdolini: Resonant Voice (LMRVT), nasal glide, CTT base
    |
    +-- TIER 2 -- ESPECIALISTAS
        +-- jackie-gartner-schmidt  Dra. Gartner-Schmidt: CTT, carryover para fala conversacional
        +-- jacob-lieberman         Dr. Lieberman: terapia manual laringea, MTD, massagem circunlaringea
```

**Total: 7 agentes** (1 orchestrator + 2 tier-0 + 2 tier-1 + 2 tier-2)

**Fluxo:** Queixa vocal -> Chief -> Tier 0 (avaliacao) -> Tier 1 (exercicios) -> Tier 2 (especializacao) -> Plano 12 semanas -> Monitoramento

---

## Workflow: 12-Week Nodule Recovery

Workflow principal do squad. Projetado para nodulos vocais Stage 1-2 em cantores.

```
ENTRADA: Cantor com nodulos vocais confirmados (stroboscopia)
    |
    v
SEMANA 1-3: FASE 1 — FUNDACAO
    ingo-titze    -> Avaliacao biomecânica, baseline PTP, dosimetria vocal
    mara-behlau   -> Avaliacao clinica completa, higiene vocal, plano conservacao voz
    jacob-lieberman -> Avaliacao MTD, massagem circunlaringea se indicado
    |
    v
SEMANA 4-6: FASE 2 — INTRODUCAO DE EXERCICIOS
    joseph-stemple      -> Protocolo VFE introducao (2x diario, 4 exercicios)
    ingo-titze          -> SOVT progressoes (lip trill -> straw -> water)
    katherine-verdolini -> LMRVT nasal glide exercises
    |
    v
SEMANA 7-9: FASE 3 — CONSOLIDACAO
    joseph-stemple      -> VFE progressoes (aumentar MPT, dinamicas)
    katherine-verdolini -> LMRVT carryover para fala espontanea
    jackie-gartner-schmidt -> CTT: easy onset em conversacao real
    |
    v
SEMANA 10-12: FASE 4 — RETORNO AO CANTO
    speechtherapy-chief -> Protocolo graduado de retorno ao canto
    ingo-titze          -> Dosimetria: aquecimento/resfriamento, carga vocal
    mara-behlau         -> Plano de prevencao de recidiva
    |
    v
SAIDA: Stroboscopia normal + VHI-10 < 18 + confianca vocal restaurada
```

### Criterios de Alta

- Stroboscopia: onda mucosa bilateral restaurada, sem massa nodular visivel
- MPT: dentro dos limites normais para sexo/idade (mulheres: >15s, homens: >20s)
- VHI-10: < 18 pontos
- Extensao tonal: recuperada para a tessitura pre-nodulo
- Paciente relata: sem fadiga vocal, onset facil, confianca no canto

---

## Tasks

10 tasks executaveis, localizadas em `tasks/`.

| ID | Task | Arquivo | Executor | Descricao |
|----|------|---------|----------|-----------|
| ST-T-001 | Vocal Assessment | `vocal-assessment.md` | Hybrid | Avaliacao vocal completa: historico, sintomas, perceptual, acustica, stroboscopia |
| ST-T-002 | SOVT Protocol | `sovt-protocol.md` | Agent | Protocolo personalizado de exercicios SOVT (Titze): lip trill, straw, progressoes |
| ST-T-003 | VFE Program | `vfe-program.md` | Agent | Programa completo VFE (Stemple): 4 exercicios, 2x diario, progressoes por semana |
| ST-T-004 | Resonant Voice Therapy | `resonant-voice-therapy.md` | Agent | LMRVT (Verdolini): nasal glide, carryover para fala, sessao estruturada |
| ST-T-005 | Vocal Hygiene Plan | `vocal-hygiene-plan.md` | Agent | Plano personalizado de higiene vocal: hidratacao, nasal, ambiente, medicamentos |
| ST-T-006 | Nodule Rehabilitation | `nodule-rehabilitation.md` | Hybrid | Protocolo completo nodulos: avaliacao -> exercicios -> retorno gradual ao canto |
| ST-T-007 | Singer Return Protocol | `singer-return-protocol.md` | Agent | Protocolo graduado de retorno ao canto pos-reabilitacao (semanas 10-12) |
| ST-T-008 | Nasal Irrigation Protocol | `nasal-irrigation-protocol.md` | Agent | Protocolo irrigacao nasal: preparacao solucao, tecnica, frequencia |
| ST-T-009 | Manual Therapy Assessment | `manual-therapy-assessment.md` | Agent | Avaliacao DTM/MTD (Lieberman): palpacao, score, indicacao de massagem circunlaringea |
| ST-T-010 | Conversation Training | `conversation-training.md` | Agent | CTT (Gartner-Schmidt): easy onset, ressonancia em fala real, automonitoramento |

---

## Checklists

2 checklists de validacao em `checklists/`.

| Checklist | Arquivo | Uso |
|-----------|---------|-----|
| Vocal Hygiene | `vocal-hygiene-checklist.md` | Valida aderencia ao plano de higiene vocal: hidratacao, nasal, ambiente, comportamentos |
| Session Progress | `session-progress-checklist.md` | Valida progresso a cada sessao: qualidade vocal, aderencia, MPT, range, sintomas |

---

## Para Cantores com Nodulos Vocais

Esta squad foi **projetada especificamente para cantores com nodulos vocais** que requerem
reabilitacao de 12 semanas.

### Protocolo Recomendado

```
# Passo 1: Avaliacao inicial
@speechtherapy-chief Sou cantor e tenho nodulos vocais diagnosticados. Quero comecar o protocolo de reabilitacao.

# Passo 2: Avaliacao cientifica (Dr. Titze)
@speechtherapy:ingo-titze Avaliar biomecanica vocal e prescrever dosimetria inicial

# Passo 3: Avaliacao clinica (Dra. Behlau)
@speechtherapy:mara-behlau Avaliacao clinica e plano de higiene vocal personalizado

# Passo 4: Protocolo SOVT
@speechtherapy:ingo-titze *sovt Preciso do protocolo SOVT para semana 1

# Passo 5: Iniciar VFE
@speechtherapy:joseph-stemple *vfe Iniciar programa VFE - sou soprano lirico com nodulos bilaterais

# Passo 6: Adicionar ressonancia
@speechtherapy:katherine-verdolini *resonant Quero comecar terapia de voz ressonante

# Passo 7: Retorno ao canto
@speechtherapy-chief *singer-return Quero plano de retorno ao canto - semana 10
```

### Sinais de Progresso

- Semana 3: Reducao de esforco ao falar, menos fadiga
- Semana 6: Onset mais facil, passagem mais suave nas transicoes de registro
- Semana 9: Canto suave possivel sem desconforto
- Semana 12: Retorno gradual ao repertorio completo

### Red Flags — Consultar ENT Imediatamente

- Piora subita da voz apos esforco vocal (suspeita de hemorragia)
- Dor ao fonare (odinfonia)
- Sem melhora alguma apos 4 semanas de terapia rigorosa
- Voz completamente ausente por mais de 72h sem causa infecciosa

---

## Slash Commands

### Sintaxe de Ativacao

```
/speechtherapy:agents:{agent-id}      # Ativa agente especifico
/speechtherapy:tasks:{task-id}        # Executa task
/speechtherapy:workflows:{workflow}   # Inicia workflow
```

### Agentes

```
/speechtherapy:agents:speechtherapy-chief       # Orquestrador
/speechtherapy:agents:ingo-titze                # Dr. Ingo Titze (SOVT)
/speechtherapy:agents:mara-behlau               # Dra. Mara Behlau (Clinica)
/speechtherapy:agents:joseph-stemple            # Dr. Joseph Stemple (VFE)
/speechtherapy:agents:katherine-verdolini       # Dra. Katherine Verdolini (LMRVT)
/speechtherapy:agents:jackie-gartner-schmidt    # Dra. Jackie Gartner-Schmidt (CTT)
/speechtherapy:agents:jacob-lieberman           # Dr. Jacob Lieberman (Manual Therapy)
```

### Tasks

```
/speechtherapy:tasks:vocal-assessment          # ST-T-001: Avaliacao vocal
/speechtherapy:tasks:sovt-protocol             # ST-T-002: Protocolo SOVT
/speechtherapy:tasks:vfe-program               # ST-T-003: Programa VFE
/speechtherapy:tasks:resonant-voice-therapy    # ST-T-004: Terapia ressonante
/speechtherapy:tasks:vocal-hygiene-plan        # ST-T-005: Plano higiene vocal
/speechtherapy:tasks:nodule-rehabilitation     # ST-T-006: Reabilitacao nodulos
/speechtherapy:tasks:singer-return-protocol    # ST-T-007: Retorno ao canto
/speechtherapy:tasks:nasal-irrigation-protocol # ST-T-008: Irrigacao nasal
/speechtherapy:tasks:manual-therapy-assessment # ST-T-009: Avaliacao terapia manual
/speechtherapy:tasks:conversation-training     # ST-T-010: Treinamento conversacional
```

### Workflows

```
/speechtherapy:workflows:nodule-recovery-complete  # 12-Week Nodule Recovery Protocol
```

---

## Estrutura

```
squad-speechtherapy/
├── config.yaml                        # Configuracao do squad
├── package.json                       # Metadados NPM/AIOX
├── README.md                          # Este arquivo
├── agents/                            # Definicoes dos 7 agentes
│   ├── speechtherapy-chief.md         # Orquestrador
│   ├── ingo-titze.md                  # Dr. Ingo Titze (SOVT, biomecanica)
│   ├── mara-behlau.md                 # Dra. Mara Behlau (clinica, higiene)
│   ├── joseph-stemple.md              # Dr. Joseph Stemple (VFE)
│   ├── katherine-verdolini.md         # Dra. Katherine Verdolini (LMRVT)
│   ├── jackie-gartner-schmidt.md      # Dra. Jackie Gartner-Schmidt (CTT)
│   └── jacob-lieberman.md             # Dr. Jacob Lieberman (manual therapy)
├── tasks/                             # 10 tasks executaveis
│   ├── vocal-assessment.md
│   ├── sovt-protocol.md
│   ├── vfe-program.md
│   ├── resonant-voice-therapy.md
│   ├── vocal-hygiene-plan.md
│   ├── nodule-rehabilitation.md
│   ├── singer-return-protocol.md
│   ├── nasal-irrigation-protocol.md
│   ├── manual-therapy-assessment.md
│   └── conversation-training.md
├── workflows/                         # Workflow principal
│   └── nodule-recovery-complete.md    # 12-week protocol
├── checklists/                        # 2 checklists de validacao
│   ├── vocal-hygiene-checklist.md
│   └── session-progress-checklist.md
├── data/                              # Knowledge base
│   └── speechtherapy-kb.md            # Base de conhecimento completa
├── minds/                             # Perfis dos elite minds
│   ├── ingo-titze-profile.md
│   ├── mara-behlau-profile.md
│   ├── joseph-stemple-profile.md
│   ├── katherine-verdolini-profile.md
│   ├── jackie-gartner-schmidt-profile.md
│   └── jacob-lieberman-profile.md
├── templates/                         # Templates de output
│   ├── vocal-assessment-report-tmpl.md
│   ├── weekly-progress-tmpl.md
│   └── hygiene-plan-tmpl.md
├── config/                            # Configuracoes adicionais
├── docs/                              # Documentacao interna
└── scripts/                           # Scripts utilitarios
```

---

*Speech Therapy Squad v1.0.0 — Synkra AIOX*
*Projetado para cantores com nodulos vocais — protocolo de reabilitacao 12 semanas*
*Baseado em: Titze, Behlau, Stemple, Verdolini Abbott, Gartner-Schmidt, Lieberman*
