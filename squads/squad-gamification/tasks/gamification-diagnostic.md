# Task: Gamification Diagnostic

> **ID:** T-GM-001
> **Type:** Entry Point (T0)
> **Squad:** squad-gamification
> **Agents:** gamification-chief (lead), motivation-analyst, player-profiler
> **Estimated Duration:** 2-4 hours
> **Inputs:** System/app description, current metrics, user demographics
> **Outputs:** `gamification-diagnostic-report.md`, `opportunity-map.yaml`

## Purpose

Conduzir uma auditoria completa do estado atual de gamificação (ou ausência dela) em um sistema, app ou ambiente corporativo. Este é o ponto de entrada obrigatório para qualquer workflow de gamificação — nenhuma mecânica deve ser projetada sem diagnóstico prévio.

## Pre-Conditions

- [ ] Sistema/app acessível ou documentação disponível
- [ ] Métricas atuais de engajamento fornecidas (DAU/MAU, retention, session time)
- [ ] Perfil demográfico dos usuários (ao menos overview)
- [ ] Objetivos de negócio definidos (o que se quer melhorar)

## Execution Steps

### Step 1: Context Gathering
**Agent:** gamification-chief

Coletar informações fundamentais:
- Qual o produto/sistema/ambiente?
- Qual o público-alvo (idade, perfil, contexto)?
- Quais são os objetivos de negócio?
- Existem mecânicas de gamificação já implementadas?
- Quais são as métricas atuais (engagement, retention, NPS)?
- Quais são os comportamentos desejados dos usuários?
- Qual é o budget/timeline disponível?

```yaml
context:
  product_type: "" # app | web | enterprise | education | hybrid
  audience_size: 0
  audience_demographics:
    age_range: ""
    primary_context: "" # work | leisure | learning | health
  current_metrics:
    dau_mau_ratio: 0
    d1_retention: 0
    d7_retention: 0
    d30_retention: 0
    avg_session_time_minutes: 0
    nps_score: 0
  existing_gamification:
    has_points: false
    has_badges: false
    has_leaderboards: false
    has_levels: false
    has_streaks: false
    has_challenges: false
    custom_mechanics: []
  business_objectives:
    primary: ""
    secondary: []
  desired_behaviors:
    - behavior: ""
      current_frequency: ""
      target_frequency: ""
```

### Step 2: Octalysis Audit
**Agent:** motivation-analyst

Avaliar cada um dos 8 Core Drives no estado atual:

| Core Drive | Score (0-10) | Evidence |
|-----------|-------------|----------|
| CD1: Epic Meaning & Calling | | |
| CD2: Development & Accomplishment | | |
| CD3: Empowerment of Creativity & Feedback | | |
| CD4: Ownership & Possession | | |
| CD5: Social Influence & Relatedness | | |
| CD6: Scarcity & Impatience | | |
| CD7: Unpredictability & Curiosity | | |
| CD8: Loss & Avoidance | | |

**Análise White Hat vs Black Hat:**
- White Hat (CD1+CD2+CD3): Score total → Sustentabilidade a longo prazo
- Black Hat (CD6+CD7+CD8): Score total → Urgência a curto prazo
- Balance Ratio: White Hat / Black Hat → Ideal entre 1.5 e 2.5

### Step 3: User Type Profiling
**Agent:** player-profiler

Estimar distribuição HEXAD dos usuários atuais:

| HEXAD Type | Estimated % | Motivation | Served By Current System? |
|-----------|------------|------------|--------------------------|
| Philanthropist | | Meaning, purpose | |
| Socialiser | | Relatedness, social | |
| Free Spirit | | Autonomy, creativity | |
| Achiever | | Mastery, competence | |
| Player | | Rewards, extrinsic | |
| Disruptor | | Change, influence | |

### Step 4: Behavior Analysis
**Agent:** gamification-chief (delegates to behavior-architect if needed)

Para cada comportamento desejado, aplicar B=MAP:

```
Behavior = Motivation × Ability × Prompt
```

| Target Behavior | Motivation (1-10) | Ability (1-10) | Prompt Exists? | B=MAP Score | Gap |
|----------------|-------------------|----------------|----------------|-------------|-----|
| | | | | | |

### Step 5: Engagement Loop Assessment
**Agent:** gamification-chief (delegates to engagement-engineer if needed)

Avaliar se loops de engajamento existem:

- **Trigger:** Existem triggers internos/externos? São consistentes?
- **Action:** A ação mínima é simples? Qual o friction score?
- **Reward:** Recompensas são variáveis? São meaningful?
- **Investment:** O usuário investe algo que aumenta valor futuro?

### Step 6: Anti-Pattern Detection
**Agent:** gamification-chief

Verificar presença de anti-patterns comuns:

- [ ] **Pointsification** — Pontos sem propósito ou conexão com valor
- [ ] **Reward Saturation** — Excesso de recompensas diminuindo valor percebido
- [ ] **Leaderboard Toxicity** — Rankings que desmotivam 90% dos usuários
- [ ] **Badge Inflation** — Badges triviais que não representam conquistas reais
- [ ] **Dark Patterns** — Manipulação via loss aversion ou FOMO artificial
- [ ] **One-Size-Fits-All** — Mesma mecânica para todos os perfis de jogador
- [ ] **Extrinsic Overjustification** — Recompensas extrínsecas matando motivação intrínseca
- [ ] **Dead-End Progression** — Sistema de níveis que termina abruptamente
- [ ] **Grinding Without Purpose** — Repetição sem narrativa ou significado
- [ ] **Social Pressure Exploitation** — Vergonha social como motivador

### Step 7: Opportunity Mapping
**Agent:** gamification-chief

Consolidar findings em mapa de oportunidades:

```yaml
opportunities:
  high_impact_low_effort:
    - opportunity: ""
      core_drives_activated: []
      estimated_impact: "" # high | medium | low
      estimated_effort: "" # high | medium | low
      target_metrics: []
  high_impact_high_effort:
    - opportunity: ""
      core_drives_activated: []
      estimated_impact: ""
      estimated_effort: ""
      target_metrics: []
  quick_wins:
    - opportunity: ""
      core_drives_activated: []
      estimated_impact: ""
      estimated_effort: ""
      target_metrics: []
```

### Step 8: Report Generation
**Agent:** gamification-chief

Gerar relatório final usando template `gamification-strategy-tmpl.md` contendo:
1. Executive Summary
2. Current State Assessment (Octalysis scores, HEXAD distribution)
3. Anti-Pattern Findings
4. Opportunity Map (prioritized)
5. Recommended Workflow (qual workflow seguir: full, enterprise, app, learning)
6. Recommended Next Tasks
7. Risk Assessment
8. Success Metrics (KPIs to track)

## Post-Conditions

- [ ] Relatório de diagnóstico completo gerado
- [ ] Mapa de oportunidades priorizado
- [ ] Workflow recomendado identificado
- [ ] Próximas tasks definidas
- [ ] Anti-patterns documentados (se existentes)
- [ ] Baseline metrics registradas

## Quality Gate

Applies: `GM-QG-001` (Diagnostic Quality Gate)

- [ ] Todos os 8 Core Drives avaliados
- [ ] Distribuição HEXAD estimada
- [ ] Ao menos 3 oportunidades identificadas
- [ ] Anti-patterns verificados
- [ ] Métricas baseline documentadas
- [ ] Recomendação de workflow justificada

## Error Handling

| Error | Recovery |
|-------|----------|
| Metrics unavailable | Use industry benchmarks, flag as estimated |
| System not accessible | Work from documentation/screenshots, flag gaps |
| Objectives unclear | Elicit from stakeholders, propose based on metrics |
| No existing gamification | Score all drives as baseline 0-1, focus on greenfield opportunities |

## Next Tasks

Depending on diagnosis results:
- If user profiling needed → `player-persona-mapping`
- If motivation balance off → `motivation-audit`
- If enterprise context → `enterprise-gamification-plan`
- If engagement loops missing → `engagement-loop-design`
- If onboarding weak → `onboarding-gamification`
- If anti-patterns found → `anti-pattern-audit` (deep dive)
