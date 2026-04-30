# Task: Onboarding Gamification

> **ID:** T-GM-007
> **Type:** Design
> **Squad:** squad-gamification
> **Agents:** behavior-architect (lead), experience-designer
> **Estimated Duration:** 2-3 hours
> **Inputs:** Product description, user journey, player personas
> **Outputs:** `onboarding-gamification-spec.md`, `first-session-flow.yaml`

## Purpose

Gamificar a experiência de primeiro uso, transformando a barreira de onboarding em um momento de engajamento usando Tiny Habits (BJ Fogg), Game Thinking scaffolding (Amy Jo Kim), e princípios de Discovery phase do Octalysis.

## Pre-Conditions

- [ ] Produto/sistema descrito
- [ ] Player personas disponíveis (T-GM-002)
- [ ] Fluxo de onboarding atual mapeado (ou inexistente)

## Execution Steps

### Step 1: Current Onboarding Analysis
**Agent:** behavior-architect

Avaliar estado atual usando B=MAP:

| Onboarding Step | Motivation (1-10) | Ability (1-10) | Prompt Present? | Dropout Rate |
|----------------|-------------------|----------------|-----------------|-------------|
| Sign-up | | | | |
| Profile setup | | | | |
| First action | | | | |
| First reward | | | | |
| First return | | | | |

**Friction Audit:**
- [ ] How many steps to first value moment?
- [ ] How many decisions required?
- [ ] How much information required upfront?
- [ ] Time to "aha moment" (seconds? minutes? days?)

### Step 2: Tiny Habits Design
**Agent:** behavior-architect

Aplicar Tiny Habits (BJ Fogg) para o onboarding:

**Formula:** After I [ANCHOR], I will [TINY BEHAVIOR], and celebrate with [CELEBRATION]

**Onboarding Tiny Habits Chain:**
```yaml
tiny_habits:
  - anchor: "Open app for first time"
    tiny_behavior: "Tap one button to see what the product does"
    celebration: "Welcome animation + achievement sound"
    success_momentum: "User feels capable"

  - anchor: "See welcome screen"
    tiny_behavior: "Choose one preference (max 3 options)"
    celebration: "Personalized response appears instantly"
    success_momentum: "User feels product knows them"

  - anchor: "Complete first preference"
    tiny_behavior: "Complete one micro-task (10 seconds)"
    celebration: "First badge earned + congratulations"
    success_momentum: "User feels accomplished"

  - anchor: "Earn first badge"
    tiny_behavior: "Try one more feature"
    celebration: "Progress bar appears showing 3/10 complete"
    success_momentum: "User sees clear path forward"
```

### Step 3: Discovery Phase Design (Octalysis)
**Agent:** behavior-architect

Focar nos Core Drives mais efetivos para Discovery phase:

| Core Drive | Application in Onboarding | Priority |
|-----------|--------------------------|----------|
| **CD1: Epic Meaning** | "Join 10,000 people transforming their..." | High |
| **CD2: Accomplishment** | First badge within 60 seconds | High |
| **CD3: Creativity** | Choice in how to proceed | Medium |
| **CD5: Social Influence** | "Your friend X is already here" | High |
| **CD7: Unpredictability** | Mystery first reward | Medium |

**Avoid in Onboarding:**
- CD6 (Scarcity) — Don't pressure new users
- CD8 (Loss Avoidance) — Don't threaten new users
- Complex choices — Keep it simple

### Step 4: Scaffolding System (Game Thinking)
**Agent:** experience-designer

Aplicar scaffolding de Amy Jo Kim:

**Scaffolding Levels:**
```yaml
scaffolding:
  level_1_guided:
    name: "Tutorial Island"
    hand_holding: high
    choices: minimal (2-3 options max)
    complexity: lowest
    rewards: frequent and generous
    duration: "first session"
    goal: "User completes first meaningful action"

  level_2_supported:
    name: "Training Grounds"
    hand_holding: medium
    choices: moderate (3-5 options)
    complexity: increasing
    rewards: regular
    duration: "sessions 2-5"
    goal: "User develops core habit loop"

  level_3_independent:
    name: "Open World"
    hand_holding: low (hints on demand)
    choices: full
    complexity: normal
    rewards: earned
    duration: "sessions 6+"
    goal: "User is self-directed and habitual"
```

### Step 5: First Session Flow
**Agent:** experience-designer

Design the "golden path" for first 5 minutes:

```yaml
first_session:
  minute_0_to_1:
    - action: "App opens with engaging visual"
    - action: "One-line value proposition"
    - action: "Single CTA button: 'Get Started'"
    - emotion: curiosity, anticipation

  minute_1_to_2:
    - action: "Quick personalization (2-3 taps)"
    - action: "Instant feedback based on choices"
    - action: "First micro-achievement unlocked"
    - emotion: surprise, delight

  minute_2_to_3:
    - action: "First real task (guided, simple)"
    - action: "Immediate visible result"
    - action: "XP bar appears, level 1 achieved"
    - emotion: accomplishment, competence

  minute_3_to_4:
    - action: "Social element introduced (optional)"
    - action: "Preview of what's ahead (curiosity driver)"
    - action: "Second achievement or badge"
    - emotion: belonging, curiosity

  minute_4_to_5:
    - action: "Clear next step presented"
    - action: "Daily challenge introduced"
    - action: "Reminder setup (opt-in)"
    - emotion: purpose, anticipation for return
```

### Step 6: Return Triggers
**Agent:** behavior-architect

Design triggers for Day 1, Day 3, Day 7 returns:

```yaml
return_triggers:
  day_1:
    trigger: "Your streak starts now — check back tomorrow to keep it!"
    incentive: "2x XP on day 2"
    channel: "push_notification + in-app"

  day_3:
    trigger: "You have a new challenge waiting"
    incentive: "Unlock special feature at day 3 streak"
    channel: "push_notification"

  day_7:
    trigger: "You've been here a week! Claim your weekly reward"
    incentive: "Exclusive weekly badge + surprise reward"
    channel: "push_notification + email"

  churning_user:
    trigger: "We've added something new based on your interests"
    incentive: "Come back bonus (extra XP, temporary boost)"
    timing: "3 days after last activity"
    max_attempts: 3
```

## Post-Conditions

- [ ] Friction audit completo do onboarding atual
- [ ] Tiny Habits chain para onboarding definida
- [ ] Scaffolding levels projetados
- [ ] First session flow (5 minutos) detalhado
- [ ] Return triggers para D1/D3/D7 definidos
- [ ] Métricas de sucesso do onboarding definidas

## Quality Gate

Applies: `GM-QG-007` (Onboarding Quality Gate)

- [ ] Time-to-first-value < 60 seconds
- [ ] First achievement within first 2 minutes
- [ ] No more than 3 decisions in first session
- [ ] Return triggers non-aggressive (opt-in)
- [ ] Scaffolding progressivo (não abrupto)
- [ ] B=MAP validated para cada step

## Next Tasks

- `engagement-loop-design` — Loops para além do onboarding
- `progression-design` — Sistema de progressão a partir do scaffolding
- `emotion-mapping` — Emoções do onboarding
