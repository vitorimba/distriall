# Playbook: App Engagement Boost via Gamification

> **ID:** PB-GM-001
> **Objective:** Increase daily active usage and session quality for consumer/SaaS apps
> **Duration:** 6-8 weeks from diagnostic to measurable impact
> **Lead Agent:** engagement-engineer
> **Support:** experience-designer, player-profiler, motivation-analyst, emotion-designer
> **Frameworks:** Octalysis (Yu-kai Chou), B=MAP (BJ Fogg), Hooked (Nir Eyal), HEXAD (Marczewski), 4 Keys to Fun (Lazzaro)
> **Version:** 2.0

---

## When to Use This Playbook

- DAU/MAU ratio below 20%
- Average session time declining for 2+ consecutive weeks
- D7 retention below 40%
- Users complete onboarding but don't return within 48 hours
- Features exist but discovery rate is below 30%
- App store reviews mention "boring", "nothing to do", or "repetitive"
- Session frequency dropping despite stable install rates
- Core action completion rate per session declining month over month

## Veto Conditions — When NOT to Use This Playbook

Do NOT apply this playbook if any of the following are true:

| Condition | Reason | Alternative |
|-----------|--------|-------------|
| Product has no clear core value proposition | Gamification cannot create value where none exists | Fix product-market fit first |
| Active user base below 500 DAU | Sample size too small for meaningful A/B tests | Focus on acquisition first |
| App is undergoing major architectural rewrite | Gamification layer will be rebuilt anyway | Wait for stable architecture |
| Users report critical bugs as primary complaint | Engagement mechanics on broken foundation will backfire | Fix reliability first |
| Legal/compliance review pending on data collection | Gamification requires behavioral tracking | Get compliance clearance |
| Team lacks engineering capacity for 6 weeks | Half-implemented gamification is worse than none | Defer or staff up |
| NPS is below 10 with "product is useless" sentiment | Users don't see value — gamification becomes manipulation | Revisit core value prop |
| Target audience is strongly anti-gamification (e.g., some B2B medical, legal) | Cultural mismatch causes backlash | Use subtle progress/feedback instead |

**Decision Tree for Veto:**
```
Is the product fundamentally useful without gamification?
├─ NO → VETO. Fix product first.
└─ YES → Does the team have 6 weeks of eng capacity?
    ├─ NO → VETO. Defer or reduce scope to Quick Wins only.
    └─ YES → Is the user base large enough for A/B tests (500+ DAU)?
        ├─ NO → Proceed with Quick Wins only, skip A/B testing phase.
        └─ YES → PROCEED with full playbook.
```

---

## Agent Routing

| Phase | Lead Agent | Supporting Agents | Deliverables |
|-------|-----------|-------------------|-------------|
| Phase 1: Diagnostic | motivation-analyst | player-profiler | Baseline report, Octalysis audit, HEXAD distribution |
| Phase 2: Quick Wins | engagement-engineer | experience-designer, emotion-designer | Streak system, variable rewards, progress bars |
| Phase 3: Core Loop | behavior-architect | engagement-engineer, experience-designer | Core loop spec, daily challenge system, trigger map |
| Phase 4: Social Layer | experience-designer | engagement-engineer, player-profiler | Social features spec, leaderboard design |
| Phase 5: Measure | motivation-analyst | engagement-engineer | A/B test results, optimization recommendations |
| Final Review | gamification-chief | All agents | Go/no-go on each mechanic, kill underperformers |

---

## Phase 1: Diagnostic Sprint (Week 1)

### Day 1-2: Metric Baseline

Capture current state with precision. Every number must come from production analytics, not estimates. The engagement-engineer pulls data while the motivation-analyst prepares the audit framework.

```yaml
baseline_metrics:
  engagement:
    dau: 0
    mau: 0
    dau_mau_ratio: 0
    avg_sessions_per_day: 0
    avg_session_duration_seconds: 0
    actions_per_session: 0
    median_time_between_sessions_hours: 0
    feature_discovery_rate: 0  # % of features used at least once within 30 days
  retention:
    d1: 0
    d3: 0
    d7: 0
    d14: 0
    d30: 0
    d60: 0
    d90: 0
  funnel:
    install_to_signup: 0
    signup_to_first_action: 0
    first_action_to_second_session: 0
    second_session_to_weekly_active: 0
    weekly_active_to_monthly_active: 0
  monetization:
    arpu: 0
    conversion_to_paid: 0
    ltv: 0
```

**Procedural Steps:**
1. Export retention cohorts for the last 90 days from your analytics platform (Amplitude, Mixpanel, Firebase, or equivalent).
2. Calculate DAU/MAU ratio as a rolling 28-day average, not a single snapshot.
3. Segment all metrics by acquisition channel — organic users behave differently from paid.
4. Identify the "activation event" — the single action most correlated with D30 retention. If unknown, run a correlation analysis: for each possible first-session action, calculate D30 retention for users who did vs. didn't perform it.
5. Document the baseline in a shared dashboard accessible to all squad agents.

### Day 2-3: Funnel Leak Identification

Apply AARRR framework to find biggest leaks:

**Acquisition → Activation → Retention → Revenue → Referral**

For each transition, calculate:
- Conversion rate (percentage moving to next stage)
- Drop-off rate (percentage lost)
- Median time in stage
- Top 3 reasons for drop-off (from analytics + user feedback)

**Priority Rule:** Fix the biggest funnel leak first. A 10% improvement on the biggest leak often exceeds a 50% improvement on a small leak.

**Decision Tree for Funnel Priority:**
```
Where is the biggest absolute user loss?
├─ Acquisition → Activation (>50% drop-off)
│   → Onboarding is broken. Apply PB-GM-003 (Onboarding) FIRST.
├─ Activation → Retention (>60% drop-off in D1-D7)
│   → Habit loop missing. Prioritize Phase 3 (Core Loop) of this playbook.
├─ Retention → Revenue (users stay but don't pay)
│   → This playbook helps indirectly. Pair with monetization strategy.
└─ Revenue → Referral (users pay but don't share)
    → Add social layer (Phase 4) with sharing incentives.
```

**Case Study — Duolingo:** When Duolingo analyzed their funnel in 2018, they found the biggest leak was D1→D7 retention (users completed lesson 1 but never returned). Their response was the streak system + push notification optimization, which increased DAU by 4.5x over 4 years. They did NOT try to fix everything at once — they fixed the biggest leak first.

### Day 3-5: Quick Octalysis + HEXAD Audit

Fast assessment (not full diagnostic, those can come later). The motivation-analyst leads this with support from player-profiler.

**Step 1 — Octalysis Feature Mapping:**
1. List every product feature and user interaction.
2. Map each to one or more Octalysis Core Drives.
3. Score each Core Drive 0-10 based on existing product features.
4. Create the octagonal radar chart to visualize gaps.

**Step 2 — HEXAD Distribution Estimation:**
1. If survey data exists, use Marczewski's HEXAD survey (24 questions).
2. If no survey data, estimate from behavioral patterns:
   - Users who explore every feature → Free Spirits
   - Users who complete all achievements → Achievers
   - Users who interact with other users most → Socialisers
   - Users who help others (forums, guides) → Philanthropists
   - Users who compete on leaderboards → Players
   - Users who break/hack/test limits → Disruptors

**Step 3 — Gap Cross-Reference:**
Identify the 2-3 biggest Core Drive gaps and cross-reference: Which HEXAD types are the gaps hurting most?

| Core Drive Gap | HEXAD Types Hurt | Impact | Priority |
|---------------|-----------------|--------|----------|
| CD3 (Creativity) low | Free Spirits, Disruptors | High churn in explorers | HIGH |
| CD5 (Social) low | Socialisers, Philanthropists | No viral loop, no belonging | HIGH |
| CD7 (Unpredictability) low | Players, Free Spirits | Boredom after novelty fades | MEDIUM |

**Critical Insight:** Most engagement-poor apps over-index on CD2 (Accomplishment) and under-index on CD3 (Creativity), CD5 (Social), and CD7 (Unpredictability). If your audit shows this pattern, you have a classic "achievement treadmill" problem — users complete tasks but don't feel creative, connected, or surprised.

**Case Study — Nike+ Run Club:** Nike+ initially focused heavily on CD2 (badges for distance milestones) and CD4 (logging your runs). Engagement plateaued. When they added CD5 (run with friends, challenges) and CD7 (surprise achievements mid-run), monthly active runners increased 40% within one quarter.

---

## Phase 2: Quick Wins (Week 2-3)

Quick wins are mechanics that can be designed, built, and deployed within 5-7 days each. They create visible impact fast and build organizational confidence for deeper investments. The engagement-engineer leads implementation while experience-designer handles UX and emotion-designer handles feedback moments.

### Quick Win 1: Onboarding First-Value Acceleration

**Target:** Reduce time to first meaningful value moment to < 60 seconds.

**Procedural Steps:**
1. Map current time to first value moment using session recordings (Hotjar, FullStory, or equivalent). Time starts at app open, ends at first "aha moment."
2. Remove every unnecessary step. Apply the "would the user miss this?" test — if removing a step doesn't reduce value, remove it.
3. Defer all profiling to after the first value moment (progressive profiling).
4. Add one delightful moment in first 30 seconds — a micro-animation, a personalized greeting, or an unexpected visual.
5. Add first achievement within 2 minutes — this must feel earned, not given.
6. Show "what's next" clearly with a breadcrumb trail showing 3-5 upcoming milestones.

**B=MAP Application (BJ Fogg):**
- **Behavior** = First meaningful action in the app
- **Motivation** = Already high (they just installed). Don't try to increase it — preserve it by not frustrating them.
- **Ability** = Reduce steps, reduce decisions, reduce cognitive load. Every unnecessary form field, every extra tap, every ambiguous label reduces Ability.
- **Prompt** = Clear, single CTA visible without scrolling. Not "Explore our features" (vague) but "Create your first [thing]" (specific).

**Decision Tree:**
```
Is time to first value currently > 3 minutes?
├─ YES → Aggressive friction removal needed. Cut 50%+ of pre-value steps.
│   Is sign-up required before value?
│   ├─ YES → Move sign-up AFTER first value moment (ghost account pattern).
│   └─ NO → Good. Focus on reducing in-app steps.
└─ NO (1-3 minutes) → Moderate optimization. Focus on delight, not removal.
    Add celebration at first value moment to make it memorable.
```

**Case Study — Canva:** Canva lets users create a design before signing up. The first value moment (seeing a professional-looking design with your content) happens in under 60 seconds. Sign-up is prompted only when users try to download. This pattern achieves >70% signup-to-first-action conversion.

### Quick Win 2: Streak System

**Target:** Create daily return habit via loss aversion and consistency commitment.

**Implementation Specification:**
```yaml
streak_system:
  trigger: "First meaningful action each day"
  definition: "User must complete at least one core action (not just open the app)"
  visual: "Flame icon with day count, always visible on home screen"
  milestones:
    3_days:
      reward: "Bonus content unlock"
      message: "3 days strong! Here's something special."
      celebration: "Subtle animation + haptic feedback"
    7_days:
      reward: "Badge + exclusive feature trial"
      message: "One week streak! You've earned [feature]."
      celebration: "Full-screen animation + sound effect"
    14_days:
      reward: "Premium trial or unique cosmetic"
      message: "Two weeks committed! Enjoy this reward."
      celebration: "Shareable achievement card"
    30_days:
      reward: "Significant reward + social share prompt"
      message: "30 days! You're in the top 5% of users."
      celebration: "Special badge with glow effect"
    60_days:
      reward: "Exclusive tier unlock + permanent profile flair"
      message: "60 days! Legendary commitment."
    100_days:
      reward: "Ultimate reward + personal congratulation from team"
      message: "100 days! You're part of the 1%."
  safety:
    grace_period: 12  # hours after midnight local time
    freeze_per_month: 2  # users can freeze streak without losing it
    freeze_cost: "Free first time, then 50 coins each"
    break_message: "Welcome back! Let's restart together."
    break_reward: "2x XP for first session back (no punishment for breaking)"
    maximum_streak_display: 999  # prevent overflow issues
  psychology:
    loss_aversion: "Show 'Streak at risk!' at 10pm if no action today"
    social_proof: "Show average streak of similar users"
    escalating_commitment: "Rewards get progressively better"
```

**Critical Design Decision — Streak Forgiveness:**
```
User broke their streak. How long was the streak?
├─ < 7 days → Soft reset. "Let's start fresh! 2x XP today."
├─ 7-29 days → Offer free freeze retroactively (one-time). "We saved your streak!"
├─ 30-99 days → Offer paid freeze OR "Comeback Streak" (3 days to restore).
└─ 100+ days → Personal notification: "Your 100+ day streak is at risk!" before break.
    After break: "Legend Never Dies" badge (permanent) + restart with 2x multiplier for 7 days.
```

**Case Study — Duolingo Streaks:** Duolingo's streak is their single most impactful retention mechanic. Users with 7+ day streaks have 3.5x higher D30 retention than non-streak users. The streak freeze (purchasable with in-app currency) generates significant revenue while reducing frustration. Key insight: they added the freeze AFTER launch, in response to user complaints about lost streaks. Listen to your users.

### Quick Win 3: Variable Reward Layer

**Target:** Make core interactions unpredictable and exciting using Nir Eyal's variable reward framework.

**Procedural Steps:**
1. Identify the 3 most frequent user actions (the actions users repeat daily).
2. For each action, design a 4-tier reward table:
   - 70% chance: Standard reward (10 XP) — baseline expectation
   - 20% chance: Bonus reward (25 XP + brief animation) — pleasant surprise
   - 8% chance: Rare reward (50 XP + badge progress + unique animation) — excitement
   - 2% chance: Legendary reward (100 XP + exclusive item + full celebration) — stories worth sharing
3. Add visual differentiation: standard = blue, bonus = purple, rare = gold, legendary = rainbow/holographic.
4. Never reduce below standard reward — every action is always positive.
5. Add a "Recent Drops" feed showing anonymous recent legendary drops by other users.

**Three Types of Variable Rewards (Hooked Model):**
- **Reward of the Tribe:** Social recognition — "You were the most active in your group today" (variable: sometimes you are, sometimes you aren't)
- **Reward of the Hunt:** Material/informational — variable XP, random loot boxes, surprise content unlocks (variable: you never know what you'll get)
- **Reward of the Self:** Personal mastery — "New personal best!", skill level up, competence feedback (variable: based on your own performance variation)

**Implementation Detail — Preventing Exploitation:**
```yaml
variable_reward_guardrails:
  max_legendary_per_user_per_day: 1
  max_rare_per_user_per_day: 3
  minimum_time_between_rewards: 30_seconds
  anti_bot: "Require human interaction pattern (not just tapping)"
  fairness: "Pseudo-random with pity timer — guaranteed rare within 25 actions"
  transparency: "Show reward tier percentages in FAQ (not hidden)"
```

**Case Study — Starbucks Rewards:** Starbucks uses "Bonus Star" challenges that appear unpredictably in the app. "Buy 3 handcrafted beverages this week for 150 bonus Stars." The challenges are personalized (variable content) and time-limited (variable schedule). Users check the app daily to see if new bonus challenges appeared. This drove 25% increase in app opens.

### Quick Win 4: Progress Visibility

**Target:** Users always know where they stand and what's next. Progress must be visible, not buried.

**Procedural Steps:**
1. Add persistent progress bar on the main screen (top or bottom, always visible).
2. Add "Next Unlock" preview — show the next reward/feature/badge with a visual preview and distance remaining.
3. Add session summary on app close: "Today you earned X XP, completed Y actions, and are Z% to Level N."
4. Add weekly summary notification (push or in-app): "Your week: 5 sessions, 230 XP, 1 badge earned."
5. Add "All-time Stats" page: total XP, badges, streaks, personal bests.

**Lazzaro's 4 Keys to Fun Application:**
- **Hard Fun** (challenge): Show the next challenge/goal clearly. "3 more actions to earn Gold Badge."
- **Easy Fun** (exploration): Show undiscovered features/areas. "5 features you haven't tried yet."
- **People Fun** (social): Show how you compare. "You're 3 spots from Top 10 this week."
- **Serious Fun** (meaning): Show impact. "Your contributions helped 50 other users this month."

---

## Phase 3: Core Loop Engineering (Week 3-5)

This is the most important phase. Quick wins create initial lift, but the core engagement loop determines long-term retention. The behavior-architect leads this phase.

### Design Core Engagement Loop (Hooked Model)

**The loop must be completable in a single session (< 5 minutes) and repeatable daily.**

**Trigger Design:**
| Trigger Type | Implementation | Frequency | Personalization |
|-------------|---------------|-----------|----------------|
| External: Push notification | "Your daily challenge is ready" | 1/day max | Based on preferred active time |
| External: In-app prompt | "New challenge available" on app open | Per session | Based on HEXAD type |
| External: Email digest | Weekly engagement summary | 1/week | Based on activity level |
| Internal: Habit cue | User checks app as part of daily routine | Target: daily | N/A (this is the goal) |
| Internal: FOMO | "Limited time challenge ending in 3h" | 1-2/week max | Based on past challenge completion |
| Internal: Social | "Your friend just beat your score" | Event-driven | Based on social connections |

**Decision Tree — Trigger Frequency:**
```
Is the user a daily active user (7+ sessions/week)?
├─ YES → Reduce external triggers. 1 push/week max. They have internal triggers.
├─ MODERATE (3-6 sessions/week) → 2-3 external triggers/week. Focus on habit building.
└─ LOW (1-2 sessions/week) → Daily external triggers. Vary content to avoid fatigue.
    Is the user engaging with push notifications?
    ├─ YES (>30% open rate) → Continue current cadence.
    └─ NO (<10% open rate) → Switch to email. Reduce push to 1/week.
        If email also fails → Switch to in-app only. Don't annoy.
```

**Action Simplification (BJ Fogg — Tiny Habits):**
- Map the primary user action (the thing they do most often).
- Reduce to minimum viable action: the smallest version of the action that still delivers value.
- Ensure < 30 seconds from app open to first in-session reward.
- Remove all unnecessary decisions between opening the app and completing the core action.

**Variable Reward Implementation (Hooked Model):**
- **Reward of the Tribe:** Social recognition for activity — leaderboard movement, "most helpful" tags, community acknowledgment
- **Reward of the Hunt:** Variable point/item rewards — random bonus XP, surprise unlocks, mystery boxes
- **Reward of the Self:** Personal best tracking, skill progress, mastery indicators, "new record" celebrations

**Investment Design (Hooked Model):**
The investment phase is what makes the next trigger more effective. Each session should leave the product slightly more valuable for the user.
- **User data:** Preferences saved that improve the next session's personalization
- **Content:** Created/saved/favorited content that increases switching cost
- **Social:** Connections made that create return reasons ("your friend posted something")
- **Progress:** XP/level accumulated that would feel wasteful to abandon
- **Reputation:** Badges, ratings, contributions that represent invested identity

### Design Daily Challenge System

```yaml
daily_challenges:
  count: 3  # 3 challenges per day
  difficulty_mix:
    easy: 1   # completable in 1-2 minutes, quick confidence win
    medium: 1  # main challenge, 5-10 minutes, requires engagement
    hard: 1    # stretch goal, 10-15 minutes, optional (bonus reward)
  rotation: "Unique challenges daily from pool of 100+"
  personalization: "Challenge type weighted by user's HEXAD profile"
  completion_reward:
    per_challenge: "10-50 XP (variable, see Quick Win 3)"
    all_three: "Bonus chest with random reward (1 rare guaranteed)"
    hard_challenge: "Additional badge progress"
  expiry: "24 hours (midnight local time)"
  catch_up: false  # yesterday's challenges are gone (scarcity drives action)
  streak_integration: "Completing at least 1 challenge counts as daily streak action"
```

**Challenge Design by HEXAD Type:**
| HEXAD Type | Challenge Style | Example |
|-----------|----------------|---------|
| Achiever | Completion/mastery | "Complete 5 actions with 100% accuracy" |
| Socialiser | Social interaction | "Give feedback to 3 other users" |
| Free Spirit | Exploration | "Discover 2 features you haven't used" |
| Philanthropist | Helping | "Help a new user with their first action" |
| Player | Competition | "Beat your personal best score" |
| Disruptor | Innovation | "Find a creative new way to use [feature]" |

### Design Progression System

```yaml
progression_system:
  xp_sources:
    core_action: 10-50  # variable reward
    daily_challenge_easy: 15
    daily_challenge_medium: 30
    daily_challenge_hard: 50
    all_challenges_bonus: 75
    streak_bonus: "5 XP per streak day (caps at 50)"
    social_action: 10-20
    exploration: 25  # using a new feature

  level_curve:
    type: "logarithmic"  # levels get harder but not exponentially so
    level_1: 100
    level_5: 400
    level_10: 800
    level_20: 1500
    level_50: 3500
    max_level: 100

  level_rewards:
    every_level: "Celebration animation + 'Level X!' badge"
    every_5_levels: "Feature unlock or cosmetic"
    every_10_levels: "Significant reward + shareable achievement"
    every_25_levels: "Prestige item + exclusive access"
    level_50: "Hall of Fame entry"
    level_100: "Legendary status + unique rewards"
```

---

## Phase 4: Social Layer (Week 5-6)

Social features are the strongest long-term retention driver. Users with 3+ active connections have 3-5x higher retention. The experience-designer leads this phase.

### Add Social Proof (Low Implementation Effort)

**Procedural Steps:**
1. Show real-time user count: "1,234 people active right now" (only if number is impressive).
2. Display popular actions: "Trending: [action] — 500 users tried this today."
3. Show completion social proof: "X users completed this challenge today" on each challenge card.
4. Add "Users like you" comparisons: "Users who did [A] also loved [B]."

### Add Opt-In Social Features (Medium Effort)

**Friend Challenges:**
- 1v1 challenges on weekly metrics (opt-in, both parties must accept)
- Duration: 7 days, tracked on both users' dashboards
- Reward: Winner gets badge + XP; loser gets "Good Sport" XP (no punishment)
- Matchmaking: Match users of similar activity levels (prevent discouragement)

**Team Formation:**
- Users can create or join teams (3-10 members)
- Weekly team goals: "Together, complete 100 actions this week"
- Team leaderboard (team vs team, not individual within team)
- Team chat or reaction system (lightweight social)

**Peer Recognition:**
- "Kudos" system: give up to 3 kudos per day to other users
- Kudos visible on recipient's profile
- Monthly "Most Recognized" spotlight

**Social Sharing of Achievements:**
- Shareable achievement cards (designed for Instagram/Twitter)
- Include actual value: "I learned X" or "I completed Y" (not just "I got a badge")
- Auto-generated image with user's stats (no manual design needed)

### Leaderboard Design

**Decision Tree — Should You Add a Leaderboard?**
```
Is your user base primarily competitive (>40% Players/Achievers in HEXAD)?
├─ YES → Add visible leaderboard with weekly reset.
├─ MIXED → Add opt-in leaderboard, hidden by default.
└─ NO (mostly Socialisers/Philanthropists) → Skip competitive leaderboard.
    Instead: add "contribution board" (most helpful, most creative).
```

**If adding leaderboard:**
- Use relative positioning: show user's position ±5 spots (not global rank if >1000 users)
- Weekly reset: every Monday, everyone starts fresh (prevents permanent discouragement)
- Multi-dimensional: different boards for different strengths (most consistent, most creative, most helpful, most improved)
- Always opt-in, never forced or shown by default
- Show "personal best rank" alongside current rank

**Case Study — Strava Segments:** Strava's segment leaderboards work because they're contextual (specific routes), relative (show nearby competitors), and multi-dimensional (age groups, gender, weight classes). Users compete against relevant peers, not the entire world. This makes competition motivating rather than demoralizing.

---

## Phase 5: Measure & Optimize (Week 6-8)

The motivation-analyst leads this phase. Every mechanic must prove its value with data or be killed.

### A/B Test Key Mechanics

| Test | Control | Treatment | Primary Metric | Secondary Metric | Duration | Min Sample |
|------|---------|-----------|---------------|-----------------|----------|-----------|
| Streaks | No streaks | Streaks with freeze | D7 retention | Sessions/week | 2 weeks | 1000/group |
| Variable rewards | Fixed 10 XP | Variable 5-50 XP | Actions/session | Session duration | 2 weeks | 1000/group |
| Daily challenges | No challenges | 3 daily challenges | DAU | D14 retention | 2 weeks | 1000/group |
| Social features | No social | Friend comparison | D30 retention | Invites sent | 3 weeks | 1000/group |
| Progress visibility | No progress bar | Persistent progress | Feature discovery | Session count | 2 weeks | 500/group |
| Push timing | Generic time | Personalized time | Push open rate | D7 retention | 2 weeks | 2000/group |

**A/B Test Decision Protocol:**
```
After test duration, check statistical significance (p < 0.05):
├─ Significant positive (primary metric up, no guardrail hit) → SHIP to 100%.
├─ Significant positive BUT guardrail metric worsened → INVESTIGATE.
│   Is guardrail metric change > 5% negative?
│   ├─ YES → KILL the variant. The cost outweighs the benefit.
│   └─ NO → Ship with guardrail monitoring for 2 more weeks.
├─ Not significant after full duration → EXTEND 1 week OR KILL.
│   Is the trend directionally positive?
│   ├─ YES → Extend 1 week for more data.
│   └─ NO → Kill. Not worth the complexity.
└─ Significant negative → KILL immediately.
```

### Metrics & KPIs Dashboard

```yaml
monitoring:
  daily_checks:
    - dau
    - sessions_per_user
    - streak_maintenance_rate
    - challenge_completion_rate
    - variable_reward_distribution  # verify randomness is working
    - push_notification_open_rate

  weekly_checks:
    - dau_mau_ratio
    - d7_retention_cohort
    - engagement_loop_completion_rate
    - feature_discovery_rate
    - social_feature_adoption
    - leaderboard_participation_rate
    - average_session_duration_trend

  monthly_checks:
    - d30_retention_cohort
    - ltv_impact
    - nps_trend
    - churn_rate_by_segment
    - gamification_roi  # cost of development vs revenue impact

  guardrails:
    uninstall_rate: "Must not increase >2% from baseline"
    support_tickets: "Must not increase >10% from baseline"
    app_store_rating: "Must not decrease >0.1 stars"
    nps: "Must not decrease >5 points"
    notification_opt_out: "Must not increase >3%"
    session_quality: "Actions per session must not decrease (gaming detection)"
```

**Benchmark Targets:**
| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| DAU/MAU | <10% | 10-20% | 20-30% | >30% |
| D1 Retention | <25% | 25-40% | 40-55% | >55% |
| D7 Retention | <10% | 10-20% | 20-35% | >35% |
| D30 Retention | <5% | 5-10% | 10-20% | >20% |
| Sessions/Week | <2 | 2-4 | 4-7 | >7 |
| Streak Maintenance (7-day) | <20% | 20-40% | 40-60% | >60% |
| Challenge Completion | <15% | 15-30% | 30-50% | >50% |

### Optimization Cadence

- **Daily:** Check dashboards for anomalies (automated alerts for >2 standard deviation changes)
- **Weekly:** Review A/B test intermediate results, adjust quick-win mechanics
- **Bi-weekly:** Deep dive into cohort analysis by user segment
- **Monthly:** Full gamification health assessment — is each mechanic still performing?
- **Quarterly:** Strategy review: kill underperformers, design new mechanics, evolve the system

---

## Timeline Summary

| Week | Phase | Key Activities | Deliverables | Go/No-Go Gate |
|------|-------|---------------|-------------|---------------|
| 1 | Diagnostic | Baseline metrics, funnel analysis, Octalysis audit, HEXAD estimation | Diagnostic report | Biggest funnel leak identified |
| 2 | Quick Wins | Implement streak system, variable rewards | Streak live, variable rewards live | Feature discovery > 0 issues |
| 3 | Quick Wins + Core Loop | Progress visibility, begin core loop design | Progress bars live, loop spec complete | Quick wins showing directional improvement |
| 4 | Core Loop | Daily challenges, trigger system, progression | Challenges live, progression live | Core loop completable in < 5 min |
| 5 | Social Layer | Social proof, friend challenges, team formation | Social features live | Adoption > 10% of DAU |
| 6 | Measure | A/B tests running, leaderboard (if appropriate) | Test results for streaks + variable rewards | Statistical significance on 2+ tests |
| 7 | Optimize | Kill underperformers, double down on winners | Optimization report | Primary metric improved vs baseline |
| 8 | Stabilize | Final A/B results, documentation, handoff | Full results report, maintenance playbook | All guardrails green |

---

## Expected Outcomes

| Metric | Baseline → Target | Timeline | Confidence |
|--------|-------------------|----------|-----------|
| DAU/MAU | +5-15 percentage points | 4-6 weeks | High |
| D7 Retention | +10-20% relative | 4 weeks | High |
| D30 Retention | +5-15% relative | 8 weeks | Medium |
| Session Duration | +10-30% | 3 weeks | High |
| Sessions/Week | +20-40% | 4 weeks | Medium |
| Feature Discovery | +15-25% | 3 weeks | Medium |
| Streak Adoption | 30-50% of DAU | 4 weeks | High |
| Challenge Completion | 25-40% of DAU | 5 weeks | Medium |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Streaks adopted but DAU unchanged | Streak trigger too easy (open app = counts) | Require meaningful action, not just app open |
| Variable rewards feel unfair | RNG not transparent or pity timer missing | Add pity timer, show drop rates in FAQ |
| Daily challenges ignored | Challenges too hard or irrelevant | Personalize by HEXAD type, ensure easy challenge is truly easy |
| Social features low adoption | Users don't know about them or fear exposure | Add in-app discovery prompts, make all social strictly opt-in |
| Leaderboard causing complaints | Competitive pressure on non-competitive users | Make opt-in only, add non-competitive boards (most helpful) |
| Push notifications being disabled | Too frequent or irrelevant | Reduce to 1/day max, personalize timing and content |
| NPS dropping despite engagement up | Gamification feels forced or manipulative | Audit for dark patterns, add opt-out for all mechanics |
| Session quality declining (low actions/session) | Users gaming the system for streaks | Require meaningful actions, not just presence |
| Quick wins lifted metrics but they're plateauing | Novelty wore off, core loop not strong enough | Accelerate Phase 3 (core loop), add content freshness |
| Engineering team resistant | Gamification feels like "toys" to engineers | Share business case data (Duolingo, Nike+), frame as behavioral science |
| Monetization decreased despite engagement up | Users spending time on free gamification instead of paid features | Align gamification rewards with monetization (streaks unlock premium trials) |

---

## Output Examples

### Diagnostic Report Structure
```markdown
# Engagement Diagnostic Report — [App Name]
## Baseline Metrics (as of YYYY-MM-DD)
- DAU: 12,400 | MAU: 89,000 | DAU/MAU: 13.9%
- D1: 32% | D7: 18% | D30: 8%
- Avg session: 3.2 min | Sessions/week: 2.1

## Biggest Funnel Leak
Activation → Retention (D1→D7): 44% drop-off
Root causes: No return trigger, no progress visibility, no reason to come back.

## Octalysis Audit
CD2 (Accomplishment): 7/10 — Strong badge system
CD3 (Creativity): 2/10 — No creative expression
CD5 (Social): 1/10 — No social features at all
CD7 (Unpredictability): 3/10 — Rewards are predictable

## HEXAD Distribution (estimated)
Achievers: 35% | Socialisers: 25% | Free Spirits: 20% | Players: 10% | Philanthropists: 8% | Disruptors: 2%

## Recommended Priority
1. Add streak system (addresses D1→D7 leak)
2. Add variable rewards (addresses CD7 gap)
3. Add social layer (addresses CD5 gap, benefits 25% Socialisers)
```

---

## Red Flags (Stop and Reassess)

- Engagement increases but satisfaction (NPS) decreases → Dark pattern risk. Audit immediately.
- Streaks causing user complaints about anxiety → Adjust safety nets (more freezes, grace period).
- Uninstall rate increases after gamification launch → Gamification is annoying, not engaging. Simplify or remove.
- Only "Player" HEXAD types engaging → One-size-fits-all problem. Add mechanics for other types.
- Quality of user actions decreasing (more actions but less meaningful) → Overjustification effect. Restructure rewards to incentivize quality.
- Users finding exploits → Fix exploits quietly, don't punish exploiters publicly. Add guardrails.
- Engineering cost exceeding 8 weeks → Scope was too large. Ship what's ready, defer the rest.

---

## Final Checklist

Before marking this playbook complete, verify:

- [ ] Baseline metrics documented with date and source
- [ ] Biggest funnel leak identified and addressed first
- [ ] Octalysis audit completed with Core Drive scores
- [ ] HEXAD distribution estimated or surveyed
- [ ] Streak system live with safety nets (grace period, freeze)
- [ ] Variable reward system live with pity timer and guardrails
- [ ] Progress visibility implemented (bar, next unlock, session summary)
- [ ] Core engagement loop completable in < 5 minutes per session
- [ ] Daily challenge system live with HEXAD-personalized challenges
- [ ] Social layer implemented (at minimum: social proof)
- [ ] A/B tests run with statistical significance on primary mechanics
- [ ] All guardrail metrics monitored and green (NPS, uninstall rate, app rating)
- [ ] Underperforming mechanics killed, winners documented
- [ ] Maintenance cadence established (weekly, monthly, quarterly reviews)
- [ ] Handoff documentation complete for ongoing operations
