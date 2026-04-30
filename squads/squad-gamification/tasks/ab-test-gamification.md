# Task: A/B Test Gamification

> **ID:** T-GM-011
> **Type:** Validation
> **Squad:** squad-gamification
> **Agents:** engagement-engineer (lead), player-profiler
> **Estimated Duration:** 1-2 hours (design) + 2-4 weeks (execution)
> **Inputs:** Mechanic specs, baseline metrics, player segments
> **Outputs:** `ab-test-plan.md`, `test-results.yaml`, `recommendations.md`

## Purpose

Projetar e executar testes A/B para mecânicas de gamificação, isolando o impacto de cada mecânica em métricas-chave de engajamento, retenção e comportamento.

## Pre-Conditions

- [ ] Mecânicas projetadas e prontas para implementação
- [ ] Baseline metrics estabelecidas (pré-gamificação)
- [ ] Segmentação de usuários possível (A/B split)
- [ ] Volume de usuários suficiente para significância estatística

## Execution Steps

### Step 1: Hypothesis Definition
**Agent:** engagement-engineer

Para cada mecânica a testar:

```yaml
hypothesis:
  id: "H-GM-001"
  mechanic: "Streak system with 7-day rewards"
  hypothesis: "Adding a streak system will increase D7 retention by 15%"
  null_hypothesis: "Streak system has no effect on D7 retention"
  primary_metric: "d7_retention_rate"
  secondary_metrics:
    - "daily_active_users"
    - "avg_session_duration"
    - "actions_per_session"
  guardrail_metrics:
    - "customer_satisfaction_score"  # must not decrease
    - "support_tickets"  # must not increase
    - "uninstall_rate"  # must not increase
  minimum_detectable_effect: 0.05  # 5% relative change
  significance_level: 0.05  # p < 0.05
  power: 0.80  # 80% power
```

### Step 2: Sample Size Calculation
**Agent:** engagement-engineer

```yaml
sample_calculation:
  baseline_conversion: 0.30  # e.g., 30% D7 retention
  minimum_detectable_effect: 0.05  # detect 5% relative change (30% → 31.5%)
  significance_level: 0.05
  power: 0.80
  tails: 2  # two-tailed test
  # Formula: n = (Z_alpha/2 + Z_beta)^2 × (p1(1-p1) + p2(1-p2)) / (p1-p2)^2
  estimated_sample_per_variant: 0  # calculate
  number_of_variants: 2  # control + treatment
  total_sample_needed: 0
  estimated_duration_days: 0  # based on daily traffic
```

### Step 3: Test Design
**Agent:** engagement-engineer

**Test Variants:**
| Test ID | Control (A) | Treatment (B) | Treatment (C) optional |
|---------|-------------|---------------|----------------------|
| T-001 | No streaks | Basic streaks (visual only) | Streaks + rewards |
| T-002 | No leaderboard | Global leaderboard | Relative leaderboard |
| T-003 | Static rewards | Variable rewards (hunt) | Variable rewards (tribe) |
| T-004 | No progression | Linear XP | Branching skill tree |
| T-005 | Text achievements | Badge achievements | Animated achievements |

**Segmentation Strategy:**
```yaml
segmentation:
  method: "random_assignment"
  stratification:
    - "user_tenure"  # new vs existing
    - "activity_level"  # low/medium/high
    - "platform"  # iOS/Android/Web
  exclusions:
    - "internal_employees"
    - "users_in_other_active_tests"
  sticky_assignment: true  # user stays in same variant
  assignment_salt: "gamification_test_001"
```

### Step 4: Measurement Plan
**Agent:** engagement-engineer

**Primary Metrics per Mechanic:**
| Mechanic | Primary Metric | Measurement Method | Success Threshold |
|----------|---------------|-------------------|-------------------|
| Streaks | D7, D30 retention | Cohort analysis | +10% vs control |
| Leaderboards | Actions/session | Event counting | +15% vs control |
| Badges | Feature discovery rate | Funnel analysis | +20% vs control |
| XP/Levels | Session duration | Time tracking | +10% vs control |
| Rewards | Return visits/week | Frequency counting | +15% vs control |
| Challenges | Task completion rate | Conversion tracking | +20% vs control |

**Guardrail Metrics (must not degrade):**
- Customer satisfaction (NPS/CSAT)
- Support ticket volume
- Uninstall/churn rate
- Page load time (performance)
- Crash rate

### Step 5: Analysis Plan
**Agent:** engagement-engineer

```yaml
analysis:
  primary:
    method: "two_proportion_z_test"  # for conversion metrics
    alternative: "welch_t_test"  # for continuous metrics
    correction: "bonferroni"  # if multiple comparisons

  secondary:
    segmentation_analysis:
      - "by_hexad_type"  # does mechanic work differently per player type?
      - "by_tenure"  # different effect for new vs existing?
      - "by_platform"  # platform-specific effects?

  timing:
    peek_schedule: [7, 14, 21, 28]  # days
    early_stopping:
      enabled: true
      method: "sequential_analysis"
      futility_threshold: 0.01  # stop if clearly no effect
      harm_threshold: -0.05  # stop if negative effect

  reporting:
    confidence_interval: true
    effect_size: true
    practical_significance: true  # not just statistical
    segment_breakdown: true
```

### Step 6: Per-Persona Impact Analysis
**Agent:** player-profiler

Analisar resultados segmentados por HEXAD type:

| HEXAD Type | Mechanic Impact | Engagement Change | Retention Change | Recommendation |
|-----------|----------------|-------------------|------------------|---------------|
| Philanthropist | | | | |
| Socialiser | | | | |
| Free Spirit | | | | |
| Achiever | | | | |
| Player | | | | |
| Disruptor | | | | |

## Post-Conditions

- [ ] Hipóteses formais definidas
- [ ] Sample sizes calculados
- [ ] Test variants documentados
- [ ] Measurement plan completo
- [ ] Analysis plan com early stopping rules
- [ ] Per-persona analysis planned

## Quality Gate

- [ ] Statistical power >= 80%
- [ ] Guardrail metrics defined (do no harm)
- [ ] No test contaminates other active tests
- [ ] Early stopping rules prevent prolonged negative impact
- [ ] Results interpretable per player segment

## Next Tasks

- Positive results → `progression-design` or `engagement-loop-design` (refine winning mechanic)
- Negative results → `anti-pattern-audit` (investigate why)
- Mixed results → Additional segmented testing
