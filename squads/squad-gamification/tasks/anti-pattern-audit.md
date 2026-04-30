# Task: Anti-Pattern Audit

> **ID:** T-GM-012
> **Type:** Quality Assurance
> **Squad:** squad-gamification
> **Agents:** gamification-chief (lead), motivation-analyst
> **Estimated Duration:** 1-2 hours
> **Inputs:** Current gamification mechanics, user feedback, engagement data
> **Outputs:** `anti-pattern-report.md`, `remediation-plan.yaml`

## Purpose

Detectar e remediar anti-patterns de gamificação incluindo pointsification, dark patterns, reward saturation, exploitative mechanics e designs que prejudicam o usuário ou minam motivação intrínseca.

## Pre-Conditions

- [ ] Mecânicas de gamificação implementadas ou projetadas
- [ ] Dados de engajamento disponíveis (se sistema em produção)
- [ ] Feedback de usuários (se disponível)

## Execution Steps

### Step 1: Pointsification Detection
**Agent:** gamification-chief

**Definition:** Pointsification = adição superficial de pontos, badges e leaderboards sem design de experiência significativa.

**Diagnostic Questions:**
- [ ] Pontos estão conectados a algum propósito real para o usuário?
- [ ] Badges representam conquistas genuínas ou ações triviais?
- [ ] Leaderboard motiva a maioria ou apenas o top 1%?
- [ ] Seria o sistema equivalente sem os pontos?
- [ ] Os usuários mencionam os pontos/badges em feedback orgânico?
- [ ] Pontos são gastáveis em algo desejável ou são meramente acumulados?

**Pointsification Severity:**
| Level | Indicator | Action |
|-------|-----------|--------|
| **Mild** | Points exist but are decorative | Redesign with purpose or remove |
| **Moderate** | Multiple mechanics without coherent system | Consolidate and connect to user goals |
| **Severe** | Points actively undermine product value | Complete redesign required |

### Step 2: Dark Pattern Scan
**Agent:** motivation-analyst

Verificar cada dark pattern conhecido:

| Dark Pattern | Description | Detection Signal | Severity |
|-------------|-------------|-----------------|----------|
| **Artificial Scarcity** | Fake urgency/limited availability | "Only 2 left!" when unlimited | High |
| **FOMO Exploitation** | Fear-based engagement | "Your friends did X, you didn't" | High |
| **Confirm-shaming** | Guilting opt-out ("No, I don't want to improve") | Negative option language | Medium |
| **Social Pressure** | Public shaming of low performers | Visible failure, bottom-of-list exposure | High |
| **Addiction Loops** | Designed to prevent stopping | No natural stopping points, auto-play | High |
| **Pay-to-Win** | Real money provides unfair advantage | Paid items > earned items in effectiveness | High |
| **Loot Box Gambling** | Random paid rewards with rare valuable items | Variable ratio on paid mechanics | High |
| **Streak Anxiety** | Punitive streak mechanics causing stress | High anxiety about breaking streaks | Medium |
| **Forced Virality** | Required social sharing for progress | "Share to unlock" gates | Medium |
| **Loss Framing** | Framing everything as potential loss | "You'll LOSE your progress if..." | Medium |
| **Infinite Scroll/Feed** | Bottomless content designed to prevent exit | No pagination, auto-load, time drain | Medium |
| **Hidden Costs** | Gradual revelation of required payments | Free start → paywall for core features | High |

### Step 3: Overjustification Analysis
**Agent:** motivation-analyst

**Test:** Would users still do this activity without the gamification?

| Activity | Pre-Gamification Motivation | Post-Gamification Motivation | Overjustification Risk |
|---------|---------------------------|-----------------------------|-----------------------|
| | Intrinsic (enjoyed it) | Now extrinsic (do it for points) | HIGH |
| | Neutral | Now extrinsic (do it for points) | LOW (acceptable) |
| | Avoided | Now extrinsic (do it for points) | NONE (desired outcome) |

**Red Flags:**
- [ ] Activity quality decreased after adding point rewards
- [ ] Users stop activity when rewards are temporarily removed
- [ ] Creative tasks became formulaic to maximize points
- [ ] Users express resentment ("I have to do X for points")
- [ ] "Gaming the system" behaviors appear

### Step 4: Ethical Framework Assessment
**Agent:** gamification-chief

Apply ethical gamification principles:

**Autonomy Check:**
- [ ] Users can opt-out of gamification entirely
- [ ] No punishment for non-participation
- [ ] Users control their visibility/privacy
- [ ] Users can customize which mechanics they see

**Transparency Check:**
- [ ] Scoring algorithms are explained
- [ ] Reward probabilities disclosed (if random)
- [ ] Data usage clearly communicated
- [ ] No hidden manipulation

**Wellbeing Check:**
- [ ] Natural stopping points exist
- [ ] No sleep/health-harmful mechanics
- [ ] Streak mechanics have freeze/grace periods
- [ ] Time-limited events don't require unhealthy engagement
- [ ] Notifications respect user preferences and quiet hours

**Fairness Check:**
- [ ] No pay-to-win advantages
- [ ] New users can compete meaningfully
- [ ] Mechanics don't favor specific demographics unfairly
- [ ] Accessibility requirements met

### Step 5: Reward Economy Audit
**Agent:** motivation-analyst

**Reward Inflation Detection:**
- Is the reward value perceived as decreasing over time?
- Are more rewards needed for the same motivation?
- Have reward tier costs been increasing?
- Is the "exchange rate" sustainable long-term?

**Reward Saturation Detection:**
- Users have more badges than they can display
- Points accumulate with no meaningful use
- Achievement notifications become annoying
- Users actively avoid earning more rewards

**Healthy Reward Economy Indicators:**
- [ ] Rewards have meaningful uses (spend, display, trade)
- [ ] Reward earning rate matches consumption rate
- [ ] High-value rewards remain aspirational
- [ ] Reward types diversified (not just points)
- [ ] Sunset plan for obsolete rewards

### Step 6: Remediation Plan
**Agent:** gamification-chief

Para cada anti-pattern detectado:

```yaml
remediation:
  - anti_pattern: ""
    severity: "" # critical | high | medium | low
    current_impact: ""
    remediation_action: ""
    timeline: "" # immediate | next_sprint | next_quarter
    owner: "" # agent responsible
    success_metric: ""
    rollback_plan: ""
```

**Priority Matrix:**
| | High User Impact | Low User Impact |
|------|-----------------|-----------------|
| **Easy to Fix** | Fix immediately | Fix in next sprint |
| **Hard to Fix** | Plan for next quarter, mitigate now | Backlog, monitor |

## Post-Conditions

- [ ] All 12 dark patterns checked
- [ ] Pointsification assessment complete
- [ ] Overjustification risks identified
- [ ] Ethical framework assessment passed
- [ ] Reward economy audited
- [ ] Remediation plan with timelines

## Quality Gate

- [ ] Zero critical dark patterns (must fix before launch)
- [ ] Zero high-severity dark patterns (must have plan)
- [ ] Opt-out mechanism verified
- [ ] Transparency requirements met
- [ ] Wellbeing safeguards in place

## Next Tasks

- `motivation-audit` — Deep dive on motivation balance
- `emotion-mapping` — Ensure positive emotional experience
- Remediate and re-test
