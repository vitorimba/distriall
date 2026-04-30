# Engagement Loop Specification — {{LOOP_NAME}}

> **ID:** GM-LOOP-{{ID}}
> **Type:** {{micro | core | meta | narrative}}
> **Cadence:** {{per_interaction | per_session | weekly | seasonal}}
> **Target Behavior:** {{behavior}}
> **Status:** Draft | Approved | Live

## 1. Loop Overview

```
┌─────────────┐     ┌─────────────┐
│   TRIGGER    │────▸│   ACTION    │
│              │     │             │
└─────────────┘     └──────┬──────┘
       ▴                    │
       │                    ▾
┌──────┴──────┐     ┌─────────────┐
│  INVESTMENT  │◂────│  VARIABLE   │
│              │     │   REWARD    │
└─────────────┘     └─────────────┘
```

**Loop Summary:** {{one_sentence_description}}
**Target HEXAD:** {{primary user types}}
**Core Drive:** CD{{number}} — {{name}}

## 2. Trigger Design

### External Triggers
| Trigger | Channel | Timing | Frequency Cap | Copy |
|---------|---------|--------|---------------|------|
| {{trigger}} | {{push/email/in-app}} | {{when}} | {{max_per_day}} | "{{message}}" |

### Internal Triggers
| Emotion | Situation | User Thought | Product Response |
|---------|-----------|-------------|-----------------|
| {{emotion}} | "{{situation}}" | "{{thought}}" | {{feature/action}} |

### Trigger Transition Plan
```
Phase 1 (Week 1-4): External triggers dominate
Phase 2 (Week 4-8): Mix of external + emerging internal
Phase 3 (Week 8+): Internal triggers dominate, external reduce to maintenance
```

## 3. Action Design

### B=MAP Analysis
| Factor | Current | Target | Simplification Strategy |
|--------|---------|--------|------------------------|
| **Time** | {{current_time}} | < {{target_time}} | {{strategy}} |
| **Money** | {{cost}} | {{target_cost}} | {{strategy}} |
| **Physical Effort** | {{effort}} | {{target}} | {{strategy}} |
| **Mental Effort** | {{effort}} | {{target}} | {{strategy}} |
| **Social Deviance** | {{level}} | {{target}} | {{strategy}} |
| **Non-Routine** | {{level}} | {{target}} | {{strategy}} |

### Action Chain
| Step | Action | Time | Effort | Friction Points |
|------|--------|------|--------|-----------------|
| 1 | {{action}} | {{time}} | {{level}} | {{friction}} |
| 2 | {{action}} | {{time}} | {{level}} | {{friction}} |
| 3 | {{action}} | {{time}} | {{level}} | {{friction}} |

### Minimum Viable Action
**The simplest version of this behavior:** {{description}}
**Can be completed in:** {{seconds/minutes}}
**Requires:** {{minimal requirements}}

## 4. Variable Reward Design

### Reward Types
| Type | Category | Description | Ratio |
|------|----------|-------------|-------|
| {{reward}} | Tribe / Hunt / Self | {{description}} | {{probability}} |

### Reward Schedule
```yaml
schedule:
  type: "{{variable_ratio | variable_interval | fixed_ratio | mixed}}"
  base_reward:
    type: "{{xp | points | badge | item}}"
    value: {{amount}}
  variable_bonus:
    probability: {{0.0-1.0}}
    multiplier_options: [{{2, 3, 5, 10}}]
  surprise_reward:
    probability: {{0.0-1.0}}
    reward: "{{description}}"
  streak_enhancement:
    applies_after: {{days}}
    multiplier: {{factor}}
```

### Reward Diversity
- **Reward of the Tribe:** {{social reward — likes, recognition, team success}}
- **Reward of the Hunt:** {{resource reward — variable points, items, content}}
- **Reward of the Self:** {{mastery reward — skill progress, personal bests, competence}}

## 5. Investment Design

### Investment Type
| Investment | What User Stores | Future Value | Loads Next Trigger? |
|-----------|-----------------|--------------|---------------------|
| {{investment}} | {{stored_value}} | {{future_benefit}} | {{yes/no — how}} |

### Investment Escalation
| Loop Iteration | Investment Required | Commitment Level |
|---------------|--------------------|--------------------|
| 1st time | {{minimal}} | Low |
| 2nd-5th time | {{moderate}} | Medium |
| 5th-10th time | {{significant}} | Medium-High |
| 10th+ time | {{substantial}} | High (habitual) |

### Investment → Trigger Connection
**How investment loads the next trigger:**
{{description of how the investment creates the conditions for the next trigger, closing the loop}}

## 6. Loop Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Loop Completion Rate | {{%}} | % users who complete full cycle |
| Time Through Loop | {{time}} | Average time for one full cycle |
| Loops Per Session | {{count}} | Average loops per session |
| Return Rate | {{%}} | % users who return for next cycle |
| Investment Rate | {{%}} | % users who invest after reward |
| Trigger Response Rate | {{%}} | % users who act on trigger |

## 7. Failure Paths

| Drop-off Point | Why Users Leave | Recovery |
|----------------|----------------|----------|
| After Trigger | {{reason}} | {{recovery_mechanic}} |
| During Action | {{reason}} | {{recovery_mechanic}} |
| Before Reward | {{reason}} | {{recovery_mechanic}} |
| Before Investment | {{reason}} | {{recovery_mechanic}} |

## 8. Ethical Safeguards

- [ ] Natural stopping points exist in loop
- [ ] Trigger frequency respects user preferences
- [ ] Variable rewards are not gambling (no real money)
- [ ] Investment is not exploitative (user genuinely benefits)
- [ ] Loop can be exited without penalty
- [ ] No dark patterns in trigger design
- [ ] Notification opt-out available

## 9. Integration Points

| System | Integration | Purpose |
|--------|-------------|---------|
| Progression | {{how loop connects to XP/levels}} | Advancement |
| Social | {{how loop connects to social features}} | Community |
| Analytics | {{events tracked}} | Measurement |
| Notifications | {{trigger delivery}} | Re-engagement |
