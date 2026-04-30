# Usage Examples — Squad Gamification

> **Squad:** squad-gamification
> **Version:** 1.0.0
> **Framework:** Synkra AIOX v2.0

This document provides 5 complete usage examples showing how to use the Gamification Squad for real-world scenarios. Each example includes the scenario context, agents used, commands run, and expected output.

---

## Example 1: Gamifying a SaaS Onboarding

### Scenario

A B2B SaaS project management tool has a 25% activation rate (users who complete setup and use the core feature within 7 days). The product team wants to gamify the onboarding experience to increase activation to 50%+.

**Context:**
- 5,000 monthly signups
- Average session: 3 minutes during onboarding (too short)
- Drop-off points: after account creation (40%), after first project creation (30%)
- No existing gamification mechanics
- Target users: project managers, team leads, small business owners

### Agents Used

| Agent | Role in This Example |
|-------|---------------------|
| gamification-chief | Runs diagnostic, coordinates workflow |
| behavior-architect | Designs B=MAP-based onboarding flow |
| experience-designer | Creates progression system for onboarding |
| player-profiler | Maps user types to mechanic preferences |
| engagement-engineer | Designs first hook cycle |

### Commands Run

```
# Step 1: Run diagnostic
@gamification-chief *gamify
# Input: Product context, current metrics, drop-off data
# Output: diagnostic-report.md identifying onboarding as critical gap

# Step 2: Quick player profiling
@gamification-chief *profile-players
# Input: User demographics, usage patterns
# Output: HEXAD distribution (estimated: 35% Achiever, 25% Player, 20% Socialiser, 10% Free Spirit, 7% Philanthropist, 3% Disruptor)

# Step 3: Design onboarding gamification
@gamification-chief *gamify-onboarding
# Input: diagnostic report, player personas
# Output: onboarding-spec.md with B=MAP-based flow

# Step 4: Design progression for onboarding
@gamification-chief *design-progression
# Input: onboarding spec, player personas
# Output: progression-system.yaml with 5-step onboarding journey

# Step 5: Design first engagement loop
@gamification-chief *design-loops
# Input: progression system, player personas
# Output: engagement-loops.yaml with "first project" hook cycle
```

### Expected Output

**onboarding-spec.md highlights:**
- 5-step guided setup with progress bar (B=MAP: increase Ability by simplifying)
- Celebration animations at each step (B=MAP: Prompt through positive reinforcement)
- "Quick win" within 2 minutes — create first task, see it in Kanban view
- Skip option for experienced users (Autonomy — SDT)
- Team invite prompt after setup (Social Influence — CD5)

**progression-system.yaml highlights:**
```yaml
onboarding_progression:
  steps:
    - name: "Create Account"
      xp: 10
      celebration: "confetti"
      time_to_complete: "30s"
    - name: "Create First Project"
      xp: 25
      celebration: "badge_unlock"
      badge: "Project Pioneer"
      time_to_complete: "60s"
    - name: "Add First Task"
      xp: 15
      celebration: "progress_animation"
      time_to_complete: "30s"
    - name: "Invite Team Member"
      xp: 30
      celebration: "social_notification"
      time_to_complete: "45s"
    - name: "Complete First Sprint"
      xp: 50
      celebration: "achievement_unlock"
      badge: "Sprint Master"
      time_to_complete: "varies"
  total_xp: 130
  completion_badge: "Onboarding Complete"
```

**Key metrics to track:**
- Activation rate (target: 25% -> 50%)
- Time to first value (target: <5 minutes)
- Step completion rate per step
- D7 retention post-onboarding

---

## Example 2: Employee Engagement Program

### Scenario

A mid-size company (500 employees) wants to gamify its internal wellness and training platform. Current state: 40% of employees complete mandatory training, voluntary wellness activities have 15% participation.

**Context:**
- 500 employees across 3 offices
- Existing LMS with basic completion tracking
- Wellness program: step challenges, mindfulness, health screenings
- HR wants to avoid "mandatory fun" perception
- Budget: moderate (no cash prizes, can do swag/perks)

### Agents Used

| Agent | Role in This Example |
|-------|---------------------|
| gamification-chief | Runs diagnostic, selects enterprise workflow |
| enterprise-strategist | Applies 6D Framework, designs ROI model |
| learning-designer | Aligns training mechanics with Bloom's taxonomy |
| motivation-analyst | Audits motivation balance, ensures White Hat dominance |
| player-profiler | Profiles employee types |

### Commands Run

```
# Step 1: Enterprise diagnostic
@gamification-chief *gamify
# Input: LMS data, wellness participation data, employee survey results
# Output: diagnostic identifying training and wellness as separate gamification tracks

# Step 2: Enterprise strategy
@gamification-chief *enterprise-plan
# Input: diagnostic, business goals (training completion 80%, wellness 40%)
# Output: enterprise-strategy.md with 6D Framework application

# Step 3: Profile employees
@gamification-chief *profile-players
# Input: employee survey data, LMS usage patterns
# Output: HEXAD distribution (30% Socialiser, 25% Achiever, 20% Philanthropist, 15% Player, 7% Free Spirit, 3% Disruptor)

# Step 4: Learning gamification
@gamification-chief *gamify-learning
# Input: training content map, Bloom's levels per module
# Output: learning-mechanics-spec.md

# Step 5: Motivation audit
@gamification-chief *audit-motivation
# Input: current mechanics (completion tracking, certificates)
# Output: motivation-audit-report.md (extrinsic-light, needs social mechanics)

# Step 6: Anti-pattern audit
@gamification-chief *audit-patterns
# Input: all design outputs
# Output: No anti-patterns detected; warning about "mandatory fun" perception
```

### Expected Output

**enterprise-strategy.md highlights (6D Framework):**
- **Define:** Training completion 80%, wellness participation 40%, employee NPS +10
- **Delineate:** All employees; segment by role (managers, ICs, support)
- **Describe:** Weekly training modules, daily wellness micro-actions
- **Devise:** Team challenges, wellness streaks, peer recognition, mentoring badges
- **Don't forget:** Opt-out for all gamification; no public shaming; HR/legal review
- **Deploy:** Pilot with 50 employees (1 office), measure for 4 weeks, then scale

**ROI projection:**
```
Investment: 80 hours design + implementation
Expected return:
  - Training completion: 40% -> 80% = 200 more employees trained/quarter
  - Wellness participation: 15% -> 40% = 125 more active participants
  - Estimated productivity gain: $50K/year (reduced absenteeism, better training)
  - ROI: 3:1 in first year
```

**learning-mechanics-spec.md highlights:**
- Knowledge quests per module (Bloom's: Remember, Understand)
- Scenario challenges for application (Bloom's: Apply, Analyze)
- Peer teaching badges (Bloom's: Evaluate, Create + Philanthropist appeal)
- Team leaderboards per department (Socialiser appeal, opt-in)
- Weekly wellness streaks (3-day minimum, no penalty for breaking)

---

## Example 3: E-Learning Platform Gamification

### Scenario

An online course platform with 50,000 active learners wants to increase course completion rates from 12% to 30% and improve learner satisfaction scores.

**Context:**
- 200+ courses across technology, business, and creative skills
- Average course length: 8 hours
- Drop-off peak: after lesson 3 (of 10 average)
- Current mechanics: completion certificates, progress bars
- Learners range from beginners to advanced professionals

### Agents Used

| Agent | Role in This Example |
|-------|---------------------|
| gamification-chief | Diagnostic and workflow coordination |
| learning-designer | Bloom's-aligned mechanic design |
| experience-designer | Progression and journey design |
| player-profiler | Learner type segmentation |
| emotion-designer | Learning emotion mapping |
| engagement-engineer | Retention loop design |

### Commands Run

```
# Step 1: Diagnostic
@gamification-chief *gamify
# Identifies: weak scaffolding phase, no social mechanics, progress bar is only gamification

# Step 2: Profile learners
@gamification-chief *profile-players
# Output: 30% Achiever, 25% Free Spirit, 20% Player, 15% Socialiser, 7% Philanthropist, 3% Disruptor

# Step 3: Learning gamification design
@gamification-chief *gamify-learning
# Output: Bloom's-aligned challenge system per course

# Step 4: Progression design
@gamification-chief *design-progression
# Output: Skill tree system with branching paths

# Step 5: Emotion mapping
@gamification-chief *map-emotions
# Output: Emotional journey map identifying "lesson 3 despair" as key dropout cause

# Step 6: Engagement loops
@gamification-chief *design-loops
# Output: 3 retention loops (daily practice, weekly challenge, monthly mastery)

# Step 7: Anti-pattern audit
@gamification-chief *audit-patterns
# Output: Clean — no anti-patterns, one warning about streak pressure on casual learners
```

### Expected Output

**Skill tree system:**
```yaml
skill_tree:
  structure: "branching_paths"
  per_course:
    - name: "Fundamentals"
      lessons: 3
      unlock: "auto"
      badge: "Foundation Builder"
    - name: "Core Skills"
      lessons: 4
      unlock: "after_fundamentals"
      badge: "Skill Apprentice"
      branching:
        - path: "Practical Application"
          lessons: 3
          badge: "Practitioner"
        - path: "Deep Theory"
          lessons: 3
          badge: "Scholar"
    - name: "Mastery Project"
      lessons: 1
      unlock: "after_any_branch"
      badge: "Course Master"
      type: "creative_project"
```

**Emotional journey interventions:**
- Lesson 1-2: Easy Fun (curiosity, exploration) — low difficulty, quick wins
- Lesson 3: Hard Fun intervention (the "wall") — introduce first real challenge with scaffolding
- Lesson 4-6: People Fun — unlock study groups, peer reviews, discussion forums
- Lesson 7-8: Serious Fun — real-world application projects
- Lesson 9-10: Fiero moments — capstone project, peer recognition, mastery badge

**Retention loops:**
- Daily: 5-minute practice quiz (spaced repetition, variable difficulty)
- Weekly: Challenge of the Week (compete or collaborate with cohort)
- Monthly: Mastery showcase (present learning, earn peer recognition)

---

## Example 4: Customer Loyalty Program Redesign

### Scenario

An e-commerce platform with 200,000 active customers has a traditional points-based loyalty program. Points-to-discount conversion is the only mechanic. Redemption rate is declining (from 60% to 35% over 2 years), and the program is becoming a cost center.

**Context:**
- Average order: $85
- 1 point per $1 spent, 100 points = $5 discount
- Top 5% of customers generate 40% of revenue
- No social features, no tiers, no personalization
- Competitors have gamified loyalty programs with tiers and challenges

### Agents Used

| Agent | Role in This Example |
|-------|---------------------|
| gamification-chief | Diagnostic, anti-pattern detection |
| motivation-analyst | Identifies pointsification, audits motivation |
| player-profiler | Segments customers by engagement type |
| experience-designer | Redesigns progression and recognition |
| engagement-engineer | Designs purchase and engagement loops |

### Commands Run

```
# Step 1: Diagnostic
@gamification-chief *gamify
# Output: Identifies pointsification anti-pattern, pure CD4 (Ownership) reliance,
# zero social mechanics, no personalization

# Step 2: Motivation audit
@gamification-chief *audit-motivation
# Output: Left Brain dominant (CD2+CD4+CD6 = 22/30), Right Brain weak (8/30)
# Overjustification risk: 6/10 (high) — customers only buy when double-points active

# Step 3: Profile customers
@gamification-chief *profile-players
# Output: 30% Player, 25% Achiever, 20% Socialiser, 12% Free Spirit, 8% Philanthropist, 5% Disruptor

# Step 4: Redesign progression
@gamification-chief *design-progression
# Output: 4-tier system with non-monetary benefits

# Step 5: Design leaderboards
@gamification-chief *design-leaderboard
# Output: Multi-dimensional recognition boards

# Step 6: Design engagement loops
@gamification-chief *design-loops
# Output: Purchase loop + engagement loop (reviews, referrals, social sharing)

# Step 7: Anti-pattern audit
@gamification-chief *audit-patterns
# Output: Original pointsification resolved; new design clean
```

### Expected Output

**Redesigned tier system:**
```yaml
loyalty_tiers:
  - name: "Explorer"
    threshold: 0
    benefits:
      - "Basic rewards program"
      - "Birthday discount"
    color: "teal"
  - name: "Insider"
    threshold: 500
    benefits:
      - "Early access to sales"
      - "Free shipping on orders >$50"
      - "Exclusive Insider newsletter"
    color: "silver"
  - name: "VIP"
    threshold: 2000
    benefits:
      - "Free shipping always"
      - "Priority customer support"
      - "VIP-only products"
      - "Double points events"
    color: "gold"
  - name: "Ambassador"
    threshold: 5000
    benefits:
      - "All VIP benefits"
      - "Personal shopping advisor"
      - "Invite-only events"
      - "Product co-creation opportunities"
      - "Ambassador community access"
    color: "platinum"
```

**Multi-dimensional recognition:**
- Review Champion board (top reviewers — Philanthropist appeal)
- Trendsetter board (first to buy new categories — Free Spirit appeal)
- Collection Completionist board (most categories purchased — Achiever appeal)
- Social Influencer board (most successful referrals — Socialiser appeal)

**Engagement loop (beyond purchase):**
```
Trigger: Post-purchase email (24h after delivery)
Action: Write a review
Variable Reward: Random bonus points (10-100) + chance of "Review of the Week" feature
Investment: Review history builds reputation, unlocks "Trusted Reviewer" badge
```

---

## Example 5: Fitness App Engagement Boost

### Scenario

A fitness app with 100,000 downloads has strong week-1 engagement but loses 65% of users by week 3. The app has basic workout tracking, a step counter, and a simple streak system. Users report the app "gets boring after the initial excitement."

**Context:**
- D1 retention: 70%, D7: 45%, D14: 30%, D30: 15%
- Current mechanics: daily streak (check-in based), workout counter badge, step goals
- Core feature: AI-generated workout plans
- No social features
- Competitor apps have challenges, communities, and coaching elements

### Agents Used

| Agent | Role in This Example |
|-------|---------------------|
| gamification-chief | Diagnostic, overall coordination |
| motivation-analyst | Identifies Black Hat over-reliance, audits balance |
| engagement-engineer | Redesigns hook cycles for sustained engagement |
| emotion-designer | Maps emotional journey, designs fiero moments |
| experience-designer | Creates progression system and social mechanics |
| player-profiler | Profiles fitness user types |

### Commands Run

```
# Step 1: Diagnostic
@gamification-chief *gamify
# Output: Black Hat heavy (streak anxiety), no social, no mastery progression,
# engagement drops when novelty wears off (Tier 1 motivation only)

# Step 2: Motivation audit
@gamification-chief *audit-motivation
# Output: CD8 (Loss Avoidance via streaks) dominant, CD2 (Accomplishment) weak,
# CD5 (Social) absent, White Hat:Black Hat = 1:2 (critical)

# Step 3: Profile users
@gamification-chief *profile-players
# Output: 35% Achiever (fitness goal oriented), 25% Socialiser (want workout buddies),
# 20% Player (want rewards), 10% Free Spirit (want variety), 7% Philanthropist, 3% Disruptor

# Step 4: Emotion mapping
@gamification-chief *map-emotions
# Output: "Fiero deficit" — no celebration of personal records, no emotional peaks after week 1

# Step 5: Redesign engagement loops
@gamification-chief *design-loops
# Output: 3 new loops replacing anxiety-based streak

# Step 6: Design progression
@gamification-chief *design-progression
# Output: Fitness journey with mastery tiers and skill unlocks

# Step 7: Design social mechanics
@gamification-chief *design-leaderboard
# Output: Friend challenges, team workouts, relative boards

# Step 8: Anti-pattern audit
@gamification-chief *audit-patterns
# Output: Old streak was borderline coercive (warning). New design: clean.
```

### Expected Output

**Redesigned hook cycles:**

```yaml
engagement_loops:
  - name: "Daily Movement"
    trigger:
      type: "contextual"
      signal: "Morning notification based on schedule"
      fallback: "10am if no schedule"
    action: "Complete any workout (even 5 minutes)"
    variable_reward:
      - type: "achievement"
        chance: 0.3
        example: "New personal record!"
      - type: "social"
        chance: 0.2
        example: "Your friend Sarah also worked out today!"
      - type: "surprise"
        chance: 0.1
        example: "Bonus: You unlocked a new exercise!"
    investment: "Workout history grows, AI personalizes better"

  - name: "Weekly Challenge"
    trigger:
      type: "scheduled"
      day: "Monday morning"
    action: "Accept a themed challenge (strength, cardio, flexibility)"
    variable_reward:
      - type: "badge"
        example: "Cardio Warrior (Week 12)"
      - type: "leaderboard"
        example: "You placed #3 among friends!"
    investment: "Challenge history, streak of weeks challenged"

  - name: "Monthly Milestone"
    trigger:
      type: "progress"
      signal: "End of month approaching"
    action: "Complete monthly fitness assessment"
    variable_reward:
      - type: "progress_report"
        example: "You improved 15% in strength this month!"
      - type: "tier_unlock"
        example: "Welcome to Gold tier!"
    investment: "Fitness history, unlocked advanced workouts"
```

**Emotional journey redesign:**
- Week 1: Easy Fun (explore the app, try workouts, novelty) + Quick fiero (first workout completed)
- Week 2: Hard Fun (first real challenge, slight difficulty increase) + People Fun (invite a friend prompt)
- Week 3: People Fun (friend challenges, group workouts) + Serious Fun (first monthly progress report)
- Week 4+: Rotating Hard Fun (new challenges weekly) + People Fun (team events) + Fiero (personal records celebrated with full-screen animation)

**Streak redesign (from coercive to supportive):**
```yaml
streak_redesign:
  old:
    type: "consecutive_days"
    penalty: "streak resets to 0"
    problem: "Anxiety on rest days, guilt on missed days"
  new:
    type: "flexible_streak"
    rule: "4 out of 7 days = streak maintained"
    rest_day: "Rest days encouraged, count as 'recovery'"
    miss_protection: "1 free miss per week (Streak Shield)"
    framing: "You're on a 12-week fitness journey!" (not "Day 84 streak!")
    reward: "Weekly streak badge, not daily pressure"
```

**Social mechanics:**
- Friend challenges (1v1, 5-minute micro-challenges)
- Team workouts (join a 4-person squad for weekly goals)
- Relative leaderboard (friends only, weekly reset)
- Workout buddy matching (pair users with similar goals)
- Celebration wall (public kudos for personal records)

**Key metrics to track:**
- D14 retention (target: 30% -> 50%)
- D30 retention (target: 15% -> 30%)
- Social feature adoption rate
- Streak anxiety reports (should decrease)
- Weekly challenge participation rate
- Fiero moments per user per week
