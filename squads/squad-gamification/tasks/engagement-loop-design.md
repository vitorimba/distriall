# Task: Engagement Loop Design

> **ID:** T-GM-005
> **Type:** Design
> **Squad:** squad-gamification
> **Agents:** engagement-engineer (lead), behavior-architect
> **Estimated Duration:** 2-3 hours
> **Inputs:** Player personas, motivation audit, progression spec
> **Outputs:** `engagement-loops-spec.md`, `hook-cycles.yaml`

## Purpose

Projetar ciclos de engajamento (Hook Model) que criem hábitos sustentáveis usando o framework Trigger→Action→Variable Reward→Investment. Cada loop é calibrado para o perfil do jogador e fase da jornada.

## Pre-Conditions

- [ ] Player personas definidas (T-GM-002)
- [ ] Motivation audit completo (T-GM-003)
- [ ] Comportamentos-alvo identificados

## Execution Steps

### Step 1: Hook Model Foundation
**Agent:** engagement-engineer

Definir os 4 componentes do Hook para cada comportamento-alvo:

```
┌─────────────┐     ┌─────────────┐
│   TRIGGER    │────▸│   ACTION    │
│ (External/   │     │ (Simplest   │
│  Internal)   │     │  behavior)  │
└─────────────┘     └──────┬──────┘
       ▴                    │
       │                    ▾
┌──────┴──────┐     ┌─────────────┐
│  INVESTMENT  │◂────│  VARIABLE   │
│ (Store value │     │   REWARD    │
│  for future) │     │ (Tribe/Hunt/│
│              │     │  Self)      │
└─────────────┘     └─────────────┘
```

### Step 2: Trigger Design
**Agent:** engagement-engineer

**External Triggers (iniciam o hábito):**
| Trigger Type | Example | When to Use | Fatigue Risk |
|-------------|---------|-------------|-------------|
| **Paid** | Ads, promoted content | Acquisition phase | High |
| **Earned** | PR, viral content, SEO | Growth phase | Low |
| **Relationship** | Friend invites, shares | Social products | Medium |
| **Owned** | Push notifications, email | Retention phase | High if abused |

**Internal Triggers (sustentam o hábito):**
| Emotion | Trigger | Product Response |
|---------|---------|-----------------|
| Boredom | "I have nothing to do" | New daily challenge available |
| Curiosity | "I wonder what's new" | Fresh content/updates |
| Fear of missing out | "Others might be ahead" | Progress comparison |
| Pride | "I want to show my achievement" | Share/display mechanics |
| Loneliness | "I want to connect" | Social features, team events |
| Uncertainty | "Did anyone respond?" | Notification of social actions |

**Trigger Frequency Rules:**
- Max 1 push notification per day for casual products
- Max 3 per day for high-engagement products
- Always provide notification settings
- Never trigger during sleep hours (respect timezone)
- Diminishing triggers as internal triggers strengthen

### Step 3: Action Design
**Agent:** behavior-architect

Aplicar B=MAP para simplificar a ação:

```
Behavior = Motivation × Ability × Prompt
```

**Fogg Behavior Grid — Ability Factors:**
| Factor | Simplify By |
|--------|------------|
| **Time** | Reduce time to complete (target: <30 seconds for initial action) |
| **Money** | Minimize or eliminate cost for core actions |
| **Physical Effort** | One-tap/click interactions |
| **Mental Effort** | Reduce choices, provide defaults |
| **Social Deviance** | Make action socially acceptable/desirable |
| **Non-Routine** | Align with existing habits and context |

**Action Chain:**
```yaml
action_chain:
  - step: 1
    action: "Open app/system"
    time: "3s"
    effort: "minimal"
    friction_points: []
  - step: 2
    action: "See personalized prompt"
    time: "2s"
    effort: "none (passive)"
    friction_points: []
  - step: 3
    action: "Complete micro-action"
    time: "10-30s"
    effort: "low"
    friction_points: ["decision paralysis if too many options"]
  - step: 4
    action: "Receive feedback"
    time: "1s"
    effort: "none (passive)"
    friction_points: []
```

### Step 4: Variable Reward Design
**Agent:** engagement-engineer

Projetar recompensas variáveis usando os 3 tipos de Nir Eyal:

**Reward of the Tribe (social):**
- Likes, comments, reactions from others
- Team achievements visible to group
- Social recognition and status updates
- Peer comparison (positive framing)

**Reward of the Hunt (resources):**
- Variable point rewards (10-100 instead of fixed 50)
- Mystery boxes with random items
- Loot drops with rarity tiers
- Scrolling through curated content (information foraging)

**Reward of the Self (mastery):**
- Skill progression feedback
- Personal best notifications
- Competency unlocks
- Flow state achievement indicators

**Variable Ratio Schedule:**
```yaml
reward_schedule:
  type: "variable_ratio"
  base_reward: 10
  bonus_probability: 0.3  # 30% chance of bonus
  bonus_multiplier: [2, 3, 5, 10]  # weighted random
  streak_bonus:
    3_days: 1.5x
    7_days: 2x
    30_days: 3x
  surprise_reward:
    probability: 0.05  # 5% chance of jackpot
    reward: "exclusive_item"
```

### Step 5: Investment Design
**Agent:** engagement-engineer

Projetar investimentos que aumentam valor futuro:

| Investment Type | What User Stores | Future Value Created |
|----------------|-----------------|---------------------|
| **Data** | Profile info, preferences | Better personalization |
| **Content** | Posts, creations, reviews | Portfolio, reputation |
| **Social** | Followers, connections, teams | Network effects |
| **Skill** | Learned abilities, certifications | Access to harder content |
| **Reputation** | Karma, ratings, trust score | Privileges, status |
| **Collection** | Items, badges, achievements | Sunk cost, completionism |
| **Customization** | Settings, themes, avatar | Ownership, identity |

**Investment Rules:**
- Investment should load the next trigger (closes the loop)
- Each investment makes the product more valuable to the user
- Investment should increase over time (escalation of commitment)
- Never require investment before first reward cycle completes

### Step 6: Loop Cadence Design
**Agent:** engagement-engineer

Definir loops para diferentes timeframes:

```yaml
loops:
  micro_loop:
    cadence: "every interaction (seconds-minutes)"
    example: "complete action → instant feedback → XP gain → see next action"
    trigger: internal
    investment: minimal (data, micro-progress)

  core_loop:
    cadence: "per session (minutes-hours)"
    example: "daily challenge → complete 3 tasks → variable reward → invest in streak"
    trigger: external (notification) + internal (habit)
    investment: medium (content, progress)

  meta_loop:
    cadence: "weekly/monthly"
    example: "weekly quest chain → unlock story chapter → earn exclusive reward → set next week goal"
    trigger: external (weekly reset notification)
    investment: high (social, reputation)

  narrative_loop:
    cadence: "seasonal/quarterly"
    example: "seasonal event → unique challenges → exclusive rewards → community milestone"
    trigger: external (event announcement)
    investment: very high (collections, status)
```

### Step 7: Habit Zone Analysis
**Agent:** engagement-engineer

Determinar se o produto está na Habit Zone:

```
         High ┌──────────────────┐
              │                  │
  Frequency   │   HABIT ZONE     │
  of Use      │   ■■■■■■■■■     │
              │                  │
              │                  │
         Low  └──────────────────┘
              Low  Perceived   High
                   Utility
```

**Target:** Mover o produto para a Habit Zone (alta frequência + alta utilidade percebida)

## Post-Conditions

- [ ] Hook cycles documentados para cada comportamento-alvo
- [ ] Triggers (external + internal) definidos
- [ ] Variable reward schedules especificados
- [ ] Investment types escolhidos e justificados
- [ ] Loop cadences (micro, core, meta, narrative) definidos
- [ ] Habit Zone analysis completa

## Quality Gate

Applies: `GM-QG-005` (Engagement Loop Quality Gate)

- [ ] Todos os 4 componentes do Hook presentes em cada loop
- [ ] Variable rewards com ao menos 2 tipos (Tribe/Hunt/Self)
- [ ] Investment loads the next trigger (loop fecha)
- [ ] Trigger frequency dentro dos limites éticos
- [ ] Action simplificada (Fogg ability factors checados)

## Next Tasks

- `progression-design` — Integrar loops com sistema de progressão
- `emotion-mapping` — Mapear emoções em cada fase do loop
- `ab-test-gamification` — Testar variantes dos loops
- `anti-pattern-audit` — Verificar que loops não são explorativos
