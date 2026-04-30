# User Guide — Squad Gamification

> **Squad:** squad-gamification
> **Version:** 1.0.0
> **Framework:** Synkra AIOX v2.0

## Getting Started

### What is Squad Gamification?

Squad Gamification is a specialized AIOX squad that provides 9 AI agents trained in gamification science. Each agent embodies a recognized authority in the field and applies their framework to your product, enterprise program, or learning platform.

The squad takes a science-first approach: every mechanic recommended is grounded in established frameworks (Octalysis, B=MAP, Game Thinking, Hooked Model, HEXAD, 6D Framework, Gamification of Learning, 4 Keys to Fun) and validated against ethical guidelines.

### Prerequisites

Before using the squad, ensure you have:

1. **AIOX Framework installed** — The squad runs within the Synkra AIOX environment
2. **Product context documented** — What is the product? Who are the users? What are the business goals?
3. **Usage data (optional but recommended)** — DAU/MAU, retention metrics, user behavior data
4. **Stakeholder alignment** — Gamification affects UX, product, and business; align expectations early

### First Activation

All gamification work begins with the diagnostic:

```
@gamification-chief *gamify
```

This activates the `gamification-chief` agent, who runs `gamification-diagnostic` (T-GM-001). The diagnostic:

1. Assesses the current state of gamification in your product
2. Inventories existing mechanics (if any)
3. Identifies gaps and anti-patterns
4. Recommends the appropriate workflow
5. Produces a diagnostic report with prioritized recommendations

**Do not skip the diagnostic.** It is the mandatory entry point for all workflows.

## How to Activate Agents

### Via Orchestrator (recommended)

The safest way is through the chief:

```
@gamification-chief *[command]
```

The chief will delegate to the appropriate specialist automatically.

### Direct Agent Activation

For focused work, activate agents directly:

```
@motivation-analyst *audit-motivation
@behavior-architect *help
@experience-designer *design-progression
@engagement-engineer *design-loops
@player-profiler *profile-players
@enterprise-strategist *enterprise-plan
@learning-designer *gamify-learning
@emotion-designer *map-emotions
```

### Agent Commands

Each agent responds to the `*help` command, which lists available commands:

```
@[agent-name] *help
```

Common commands across all agents:

| Command | Description |
|---------|-------------|
| `*help` | List available commands for this agent |
| `*exit` | Exit the current agent mode |

## Common Workflows Walkthrough

### Workflow 1: Full Gamification (wf-full-gamification)

**When to use:** Complete end-to-end gamification of a product from scratch.
**Duration:** 2-4 weeks
**Phases:** 7

| Phase | Agent | Task | Output |
|-------|-------|------|--------|
| 1. Diagnostic | gamification-chief | gamification-diagnostic | diagnostic-report.md |
| 2. Profiling | player-profiler | player-persona-mapping | player-personas.md, hexad-distribution.yaml |
| 3. Strategy | motivation-analyst + enterprise-strategist | motivation-audit + enterprise-plan | motivation-audit-report.md, strategy.md |
| 4. Design | experience-designer + engagement-engineer | progression-design + engagement-loop-design + leaderboard-design | progression-system.yaml, engagement-loops.yaml, leaderboard-spec.md |
| 5. Build | behavior-architect + experience-designer | onboarding-gamification + emotion-mapping | onboarding-spec.md, emotion-map.yaml |
| 6. Test | engagement-engineer | ab-test-gamification | ab-test-results.md |
| 7. Launch | gamification-chief | anti-pattern-audit | final-audit-report.md |

**Step-by-step:**

```
# Phase 1: Start with diagnostic
@gamification-chief *gamify

# Phase 2: Profile your users
@gamification-chief *profile-players

# Phase 3: Audit motivation balance
@gamification-chief *audit-motivation

# Phase 4: Design mechanics
@gamification-chief *design-progression
@gamification-chief *design-loops
@gamification-chief *design-leaderboard

# Phase 5: Design onboarding and emotions
@gamification-chief *gamify-onboarding
@gamification-chief *map-emotions

# Phase 6: Test
@gamification-chief *ab-test

# Phase 7: Final audit
@gamification-chief *audit-patterns
```

### Workflow 2: App Gamification (wf-app-gamification)

**When to use:** Consumer app or SaaS product that needs engagement boost.
**Duration:** 1-2 weeks
**Phases:** 5

```
# Phase 1: Audit current state
@gamification-chief *diagnostic

# Phase 2: Map UX to gamification opportunities
@experience-designer *help  # Review available design commands

# Phase 3: Select and design mechanics
@gamification-chief *design-progression
@gamification-chief *design-loops

# Phase 4: Implementation spec
@gamification-chief *gamify-onboarding

# Phase 5: Optimize
@gamification-chief *ab-test
```

### Workflow 3: Enterprise Gamification (wf-enterprise-gamification)

**When to use:** Corporate employee engagement, training, or wellness programs.
**Duration:** 2-3 weeks
**Phases:** 6

```
# Phase 1: Assessment
@gamification-chief *diagnostic

# Phase 2: Business alignment
@enterprise-strategist *enterprise-plan

# Phase 3: Design
@gamification-chief *design-progression
@gamification-chief *design-loops

# Phase 4: Pilot design
@enterprise-strategist *help  # Pilot planning commands

# Phase 5: Scale plan
# (Handled within enterprise-plan output)

# Phase 6: Monitoring setup
@gamification-chief *ab-test
```

### Workflow 4: Learning Gamification (wf-learning-gamification)

**When to use:** Educational platforms, LMS, MOOCs, corporate training.
**Duration:** 1-2 weeks
**Phases:** 5

```
# Phase 1: Objective mapping
@learning-designer *gamify-learning

# Phase 2: Mechanic design
@gamification-chief *design-progression

# Phase 3: Content integration
@emotion-designer *map-emotions

# Phase 4: Testing
@gamification-chief *ab-test

# Phase 5: Iteration
@gamification-chief *audit-patterns
```

## Tips and Best Practices

### 1. Always Start with Diagnostic

Never jump directly to designing mechanics. The diagnostic identifies what your product actually needs, which may be different from what you expect. Many products already have "hidden gamification" (progress bars, notifications, streaks) that should be assessed before adding new mechanics.

### 2. Profile Before You Design

Player profiling (HEXAD mapping) should precede all design decisions. A leaderboard designed without knowing your user types will likely demotivate more people than it motivates. If your base is 60% Free Spirits, a competitive leaderboard is the wrong mechanic.

### 3. Watch the White Hat / Black Hat Balance

The Octalysis framework distinguishes between White Hat drives (positive, empowering, sustainable) and Black Hat drives (urgent, anxiety-inducing, effective short-term). A healthy system has a 2:1 White Hat to Black Hat ratio. If your system is Black Hat heavy, users will burn out.

### 4. Avoid Pointsification

The most common gamification anti-pattern is adding points, badges, and leaderboards without understanding why. Points without meaning are just numbers. Badges without achievement are just icons. Leaderboards without fairness are just demotivation tools.

### 5. Design for the Endgame

Most gamification systems focus on onboarding but ignore what happens after users "finish." Design mastery paths, community roles, and creative tools for long-term users. The endgame is where retention is won or lost.

### 6. Ethical Gamification is Non-Negotiable

The squad enforces 32 veto conditions including zero tolerance for dark patterns. If a mechanic manipulates users, exploits addictive tendencies, or targets vulnerable populations, it will be blocked. Ethical gamification is not just good practice — it is a constitutional requirement.

### 7. Test Everything

Use the `*ab-test` task to validate mechanics before full deployment. Small changes in gamification (badge color, notification timing, streak length) can have outsized effects on user behavior. Test, measure, iterate.

### 8. Use Playbooks for Quick Wins

If you need a fast solution, start with the playbooks:
- `playbooks/app-engagement-boost.md` — Boost DAU/MAU
- `playbooks/retention-rescue.md` — Fix declining retention
- `playbooks/onboarding-gamification.md` — Improve activation
- `playbooks/enterprise-employee-motivation.md` — Employee engagement

Playbooks provide tactical, step-by-step guides without requiring a full workflow.

## Glossary of Gamification Terms

| Term | Definition |
|------|------------|
| **B=MAP** | Behavior = Motivation x Ability x Prompt. BJ Fogg's behavior model. |
| **Black Hat** | Octalysis drives that create urgency/anxiety (CD6, CD7, CD8). Effective but unsustainable. |
| **Core Drive** | One of 8 motivational drivers in the Octalysis Framework. |
| **Dark Pattern** | A design pattern that manipulates users against their own interest. |
| **Endgame** | The phase after a user has experienced most content. Critical for long-term retention. |
| **Engagement Loop** | A recurring cycle that drives habitual behavior (Trigger-Action-Reward-Investment). |
| **Fiero** | The intense feeling of triumph after overcoming a challenge. Key emotion in gamification. |
| **Flow** | The state of optimal experience where challenge matches skill (Csikszentmihalyi). |
| **HEXAD** | 6 user types model by Andrzej Marczewski: Philanthropist, Socialiser, Free Spirit, Achiever, Player, Disruptor. |
| **Hook Cycle** | Nir Eyal's 4-phase model: Trigger, Action, Variable Reward, Investment. |
| **Mastery Path** | A progression system where users develop genuine skill over time. |
| **Octalysis** | Yu-kai Chou's gamification framework based on 8 Core Drives. |
| **Onboarding** | The first-time user experience. Critical window for establishing engagement patterns. |
| **Overjustification** | When extrinsic rewards undermine intrinsic motivation. A key risk in gamification. |
| **Pointsification** | The anti-pattern of adding points/badges without motivational alignment. |
| **Progression System** | XP, levels, tiers, and unlocks that give users a sense of advancement. |
| **Scaffolding** | The phase where users build skills through guided challenges after onboarding. |
| **SDT** | Self-Determination Theory (Deci & Ryan). Three basic needs: Autonomy, Competence, Relatedness. |
| **Streak** | A consecutive-day engagement mechanic. Effective but can become coercive. |
| **Variable Reward** | A reward with unpredictable magnitude or timing. Drives curiosity and engagement. |
| **Veto Condition** | A critical condition that blocks a gamification decision. 32 veto conditions are enforced. |
| **White Hat** | Octalysis drives that create positive, empowering feelings (CD1, CD2, CD3). Sustainable. |
| **6D Framework** | Kevin Werbach's enterprise gamification model: Define, Delineate, Describe, Devise, Don't forget, Deploy. |
| **4 Keys to Fun** | Nicole Lazzaro's emotional framework: Hard Fun, Easy Fun, People Fun, Serious Fun. |

## Support

### Validation Scripts

```bash
# Check squad structure is intact
bash scripts/validate-squad.sh

# View squad statistics
bash scripts/squad-stats.sh

# Agent fidelity report
bash scripts/fidelity-report.sh
```

### Common Issues

| Issue | Solution |
|-------|---------|
| Agent not responding | Ensure you are using the correct `@agent-name` syntax |
| Workflow stuck at quality gate | Review the gate criteria and fix failing conditions |
| Veto condition blocking progress | Read the veto condition detail and address the root cause |
| Diagnostic output seems incomplete | Ensure pre-conditions are met (product context, user data) |
