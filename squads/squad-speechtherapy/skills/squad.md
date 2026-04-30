# SpeechTherapy Squad Skills

## Available Skills

### Agent Activation
- `/speechtherapy:agents:speechtherapy-chief` — Ativar orchestrador (roteia para especialista)
- `/speechtherapy:agents:ingo-titze` — Voice Science, SOVT (T0)
- `/speechtherapy:agents:mara-behlau` — Clinical Fono, Vocal Hygiene (T0)
- `/speechtherapy:agents:joseph-stemple` — Vocal Function Exercises (T1)
- `/speechtherapy:agents:katherine-verdolini` — Resonant Voice Therapy / LMRVT (T1)
- `/speechtherapy:agents:jackie-gartner-schmidt` — Conversation Training / CTT (T2)
- `/speechtherapy:agents:jacob-lieberman` — Manual Therapy / MTD (T2)

### Task Execution
- `/speechtherapy:tasks:vocal-assessment` — Avaliacao vocal completa
- `/speechtherapy:tasks:sovt-protocol` — Protocolo de exercicios SOVT
- `/speechtherapy:tasks:vfe-program` — Programa de exercicios funcionais vocais
- `/speechtherapy:tasks:resonant-voice-therapy` — Terapia de voz ressonante (LMRVT)
- `/speechtherapy:tasks:vocal-hygiene-plan` — Plano de higiene vocal
- `/speechtherapy:tasks:nodule-rehabilitation` — Protocolo de reabilitacao de nodulos (12 semanas)
- `/speechtherapy:tasks:singer-return-protocol` — Protocolo de retorno para cantores
- `/speechtherapy:tasks:nasal-irrigation-protocol` — Protocolo de irrigacao nasal
- `/speechtherapy:tasks:manual-therapy-assessment` — Avaliacao para terapia manual laringea
- `/speechtherapy:tasks:conversation-training` — Treino conversacional (CTT)

### Mind Consultation
- `/speechtherapy:minds:{mind-name}:artifacts:VOICE_DNA` — Consultar Voice DNA de um expert
- `/speechtherapy:minds:{mind-name}:heuristics:{CODE}` — Consultar heuristica especifica

#### Minds disponiveis:
- `ingo_titze` — Ingo Titze (Voice Science)
- `mara_behlau` — Mara Behlau (Clinical Fono)
- `joseph_stemple` — Joseph Stemple (VFE)
- `katherine_verdolini` — Katherine Verdolini (LMRVT)
- `jackie_gartner_schmidt` — Jackie Gartner-Schmidt (CTT)
- `jacob_lieberman` — Jacob Lieberman (Manual Therapy)

### Checklist Validation
- `/speechtherapy:checklists:vocal-hygiene-checklist` — Checklist de higiene vocal
- `/speechtherapy:checklists:session-progress-checklist` — Checklist de progresso de sessao

### Workflow Execution
- `/speechtherapy:workflows:nodule-recovery-complete` — Workflow completo de recuperacao de nodulos vocais

### Benchmark Execution
- `/speechtherapy:benchmarks:smoke-test-suite` — Suite de smoke tests (35 cenarios)
- `/speechtherapy:benchmarks:baseline-registry` — Registro de baselines de performance

### Scripts
- `./scripts/validate-squad.sh [--verbose]` — Validar estrutura do squad
- `./scripts/squad-stats.sh` — Dashboard de estatisticas
- `./scripts/fidelity-report.sh [--csv]` — Relatorio de fidelidade por agente

## Quick Start

1. Ativar: `/speechtherapy:agents:speechtherapy-chief`
2. Descrever o caso clinico — o orchestrador roteia para o specialist correto
3. Tasks, checklists e workflows sao usados automaticamente pelo specialist

## Tier Routing

| Tier | Agents | Quando usar |
|------|--------|-------------|
| Orchestrator | speechtherapy-chief | Roteamento, triagem, coordenacao multi-agente |
| T0 — Diagnosis | ingo-titze, mara-behlau | Avaliacao vocal, ciencia da voz, SOVT, higiene vocal |
| T1 — Rehabilitation | joseph-stemple, katherine-verdolini | VFE, terapia ressonante, reabilitacao ativa |
| T2 — Specialists | jackie-gartner-schmidt, jacob-lieberman | CTT, terapia manual laringea, casos especificos |

**Regra:** T0 (diagnostico) antes de T1 (reabilitacao) antes de T2 (especializado). Nunca pular tiers.

## Cross-Squad Integration

Este squad e **standalone** — nao depende de outros squads para funcionar.

**Integracao possivel:**
- **squad-fitcoach-pro** — Para coaches que trabalham com cantores/profissionais da voz, coordenar saude vocal via `/squad-speechtherapy:speechtherapy-chief`
- **squad-gamification** — Principios de gamificacao podem ser aplicados a adesao de exercicios vocais (streaks, progressao, recompensas)

**Para acessar de outro squad:**
```
/squad-speechtherapy:speechtherapy-chief
```

## Evidence Base

Todos os protocolos sao baseados em evidencia cientifica publicada. Ver `docs/evidence-base.md` para detalhes completos com citacoes de RCTs e estudos.

## Clinical Domain

- Reabilitacao de nodulos vocais
- Protocolo de 12 semanas
- Cantores e profissionais da voz
- Exercicios SOVT, VFE, LMRVT
- Terapia manual laringea (MTD)
- Treino conversacional (CTT)
- Higiene vocal
