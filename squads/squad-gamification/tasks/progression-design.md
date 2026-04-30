# Task: Progression Design

> **ID:** T-GM-004
> **Type:** Design
> **Squad:** squad-gamification
> **Agents:** experience-designer (lead), engagement-engineer
> **Estimated Duration:** 2-4 hours
> **Inputs:** Player personas, motivation audit, business objectives
> **Outputs:** `progression-system-spec.md`, `xp-curve.yaml`, `unlock-tree.yaml`

## Purpose

Projetar sistemas de progressão (níveis, XP, curvas de desbloqueio) que mantenham jogadores em estado de Flow e criem senso de avanço significativo ao longo da jornada.

## Pre-Conditions

- [ ] Player personas definidas (T-GM-002)
- [ ] Motivation audit completo (T-GM-003)
- [ ] Catálogo de conteúdo/features disponíveis para unlock

## Execution Steps

### Step 1: Progression Philosophy
**Agent:** experience-designer

Definir a filosofia do sistema de progressão:

**Progression Types:**
| Type | Description | Best For | Example |
|------|-------------|----------|---------|
| **Linear** | XP fixo por nível, progressão uniforme | Onboarding, aprendizado | Duolingo (primeiros 10 níveis) |
| **Exponential** | XP crescente por nível, desacelera com tempo | RPGs, fidelidade | WoW levels, airline miles |
| **Asymptotic** | Progressão rápida no início, plateau | Habilidades, mastery | Elo ratings, skill systems |
| **Prestige** | Reset com bonus, recomeço prestigiado | Retenção longo prazo | CoD Prestige, seasonal resets |
| **Branching** | Múltiplos caminhos paralelos | Diversidade, autonomy | Skill trees, talent paths |
| **Milestone** | Saltos discretos (não contínuo) | Enterprise, certifications | Belt systems, tier upgrades |

### Step 2: XP Curve Design
**Agent:** experience-designer

Projetar curva de XP usando fórmulas comprovadas:

**Formula Options:**

```
Linear:     XP(n) = base + (n × increment)
Polynomial: XP(n) = base × n^exponent
Exponential: XP(n) = base × growth_rate^n
Logarithmic: XP(n) = base × ln(n + 1) × multiplier
Custom:     XP(n) = floor(base × (n^exponent) / divisor) + offset
```

**Design Parameters:**
```yaml
xp_curve:
  formula: "polynomial"  # recommended default
  base_xp: 100           # XP para nível 1→2
  exponent: 1.5           # Ritmo de crescimento
  max_level: 50           # Nível máximo
  xp_sources:
    - action: "complete_task"
      xp: 10
      cooldown: null
    - action: "daily_login"
      xp: 5
      cooldown: "24h"
    - action: "help_others"
      xp: 15
      cooldown: null
    - action: "complete_challenge"
      xp: 50
      cooldown: "per_challenge"
  level_milestones:
    5: "Novice badge + feature unlock"
    10: "Apprentice badge + customization unlock"
    20: "Expert badge + mentor ability"
    30: "Master badge + content creation"
    50: "Legend badge + all features"
```

### Step 3: Flow Channel Design
**Agent:** experience-designer

Aplicar Flow Theory (Csikszentmihalyi) para manter challenge-skill balance:

```
        High ┌──────────────────────┐
             │    ANXIETY           │
             │         ╱            │
  Challenge  │       ╱  FLOW       │
             │     ╱    CHANNEL    │
             │   ╱                 │
             │ ╱   BOREDOM         │
        Low  └──────────────────────┘
             Low      Skill      High
```

**Difficulty Scaling Rules:**
- **Early Game (Levels 1-5):** 80% success rate → Build confidence
- **Mid Game (Levels 6-20):** 60-70% success rate → Maintain engagement
- **Late Game (Levels 21-40):** 50-60% success rate → Create mastery challenge
- **Endgame (Levels 41-50):** 40-50% success rate → Prestige-level difficulty

### Step 4: Unlock System Design
**Agent:** engagement-engineer

Projetar árvore de desbloqueio:

**Unlock Categories:**
| Category | Examples | Motivation | Core Drive |
|----------|----------|------------|-----------|
| **Functional** | New features, tools, abilities | Competence | CD2, CD3 |
| **Cosmetic** | Themes, avatars, colors | Self-expression | CD3, CD4 |
| **Social** | Team creation, mentoring, titles | Status, connection | CD5 |
| **Content** | New levels, challenges, areas | Curiosity | CD7 |
| **Privileges** | Early access, voting rights | Status, autonomy | CD4, CD6 |

**Unlock Pacing:**
- Every 1-2 levels in early game
- Every 3-5 levels in mid game
- Every 5-10 levels in late game
- Prestigious unlocks at milestone levels

### Step 5: Anti-Stagnation Mechanisms
**Agent:** engagement-engineer

Prevenir "dead zones" onde progresso fica invisível:

- **Micro-Progress Bars:** Sub-level progress sempre visível
- **Daily/Weekly Challenges:** Fresh goals independentes do nível
- **Seasonal Events:** Content rotativo com recompensas exclusivas
- **Social Progress:** Compare with friends at similar levels
- **Surprise Milestones:** Hidden achievements discovered along the way
- **Streak Multipliers:** Bonus XP for consistent engagement
- **Catch-up Mechanics:** Returning users get boosted XP temporarily

### Step 6: Endgame Design
**Agent:** experience-designer

O que acontece quando o jogador atinge nível máximo:

**Endgame Options:**
1. **Prestige System:** Reset com perks, badges acumulativos
2. **Mastery Tracks:** Especialização em áreas específicas
3. **Mentorship:** High-level players ajudam novatos (XP for teaching)
4. **Content Creation:** Players criam desafios para outros
5. **Governance:** Voting, moderation, community leadership
6. **Seasonal Reset:** Partial reset com ranking seasonal

### Step 7: Specification Output
**Agent:** experience-designer

Gerar especificação completa usando `progression-system-tmpl.md`.

## Post-Conditions

- [ ] Curva de XP definida com fórmula e parâmetros
- [ ] Árvore de unlock documentada
- [ ] Flow channel por fase da jornada
- [ ] Endgame strategy definida
- [ ] Anti-stagnation mechanisms incluídos
- [ ] Spec completa usando template

## Quality Gate

Applies: `GM-QG-004` (Progression Design Quality Gate)

- [ ] Curva de XP testada (simulação de 100 sessões)
- [ ] Unlock pacing balanceado (sem dead zones > 3 níveis)
- [ ] Endgame definido (não termina abruptamente)
- [ ] Flow channel mantido em todas as fases
- [ ] Alinhado com player personas

## Next Tasks

- `engagement-loop-design` — Integrar progressão nos loops
- `leaderboard-design` — Competição baseada em nível
- `emotion-mapping` — Emoções por fase da progressão
