# Squad Gamification

Gamification Squad for the Synkra AIOX framework. 9 specialized agents that design, implement, and optimize gamification systems for apps, enterprises, and educational platforms.

## Overview

### Purpose

The Gamification Squad provides a comprehensive, framework-driven approach to gamification design. Instead of ad-hoc "add points and badges" implementations, this squad orchestrates 9 domain experts — each embodying a recognized authority in gamification science — to produce gamification systems that are psychologically grounded, ethically sound, and measurably effective.

### Philosophy

Gamification is not about superficial rewards. It is about understanding human motivation and designing systems that align user goals with business objectives through meaningful engagement. The squad operates on three core principles:

1. **Motivation First, Mechanics Second** — Every mechanic must map to a validated motivational driver (Octalysis Core Drive, SDT need, or HEXAD type). Mechanics without motivational backing are rejected.
2. **Ethical by Default** — 32 veto conditions enforce zero tolerance for dark patterns, gambling mechanics targeting minors, surveillance gamification, and manipulative loss aversion. Ethics checks run on every workflow phase.
3. **Evidence-Based** — All recommendations reference established frameworks (Octalysis, B=MAP, Game Thinking, Hooked Model, HEXAD, 6D Framework) and real case studies. No invented mechanics.

### Target Users

- **Product teams** gamifying SaaS products, mobile apps, or web platforms
- **Enterprise teams** designing employee engagement, training, or wellness programs
- **Education teams** building gamified learning experiences (LMS, MOOCs, corporate training)
- **Consultants** running gamification audits or designing engagement strategies for clients
- **UX designers** integrating game mechanics into user journeys

## Architecture

### Tier System

The squad uses a 3-tier agent architecture:

```
                    +---------------------------+
                    |   TIER 0: ORCHESTRATOR    |
                    |   gamification-chief       |
                    |   (Chief Gamification      |
                    |    Officer)                |
                    +---------------------------+
                           |
          +----------------+----------------+
          |                                 |
  +-------v--------+             +---------v--------+
  | TIER 1: CORE   |             | TIER 1: CORE     |
  | ANALYSTS       |             | DESIGNERS        |
  |                |             |                  |
  | motivation-    |             | experience-      |
  |   analyst      |             |   designer       |
  | behavior-      |             | engagement-      |
  |   architect    |             |   engineer       |
  | player-        |             | emotion-         |
  |   profiler     |             |   designer       |
  +----------------+             +------------------+
          |                                 |
  +-------v--------+             +---------v--------+
  | TIER 2: DOMAIN |             | TIER 2: DOMAIN   |
  | SPECIALISTS    |             | SPECIALISTS      |
  |                |             |                  |
  | enterprise-    |             | learning-        |
  |   strategist   |             |   designer       |
  +----------------+             +------------------+
```

- **Tier 0 (Orchestrator):** `gamification-chief` coordinates all agents, resolves framework conflicts, enforces veto conditions, selects workflows
- **Tier 1 (Core):** 5 agents handling analysis (motivation, behavior, player profiling) and design (experience, engagement, emotion)
- **Tier 2 (Domain Specialists):** 2 agents with domain-specific expertise (enterprise strategy, learning design)

### Agent Interaction Model

Agents interact through a delegation pattern:

1. **gamification-chief** receives the request and runs the diagnostic task
2. Based on diagnostic results, the chief selects a workflow and delegates phases to specialists
3. Each specialist produces artifacts that feed into the next phase
4. Quality gates between phases validate outputs before proceeding
5. The chief resolves conflicts when frameworks disagree (e.g., Octalysis vs. B=MAP recommendations)

### Handoff Flow

```
User Request
  |
  v
gamification-chief (*gamify)
  |
  v
gamification-diagnostic (T-GM-001)
  |
  +---> player-profiler (HEXAD mapping)
  |       |
  |       v
  +---> motivation-analyst (Octalysis audit)
  |       |
  |       v
  +---> behavior-architect (B=MAP design)
  |       |
  |       v
  +---> experience-designer (journey + progression)
  |       |
  |       v
  +---> engagement-engineer (hook cycles)
  |       |
  |       v
  +---> emotion-designer (emotional mapping)
  |       |
  |       v
  +---> enterprise-strategist / learning-designer (domain-specific)
  |
  v
Quality Gate + Anti-Pattern Audit
  |
  v
Final Deliverables
```

## Agent Catalog

| Agent | Persona | Tier | Role | Key Framework | Primary Expertise |
|-------|---------|------|------|---------------|-------------------|
| **gamification-chief** | Chief Gamification Officer | 0 | Orchestrator | All frameworks | Coordination, delegation, veto enforcement, anti-pattern detection |
| **motivation-analyst** | Yu-kai Chou | 1 | Core Analyst | Octalysis (8 Core Drives) | Motivation analysis, White/Black Hat balance, SDT assessment |
| **behavior-architect** | BJ Fogg | 1 | Core Analyst | B=MAP, Tiny Habits | Behavior design, ability simplification, prompt design, habit formation |
| **experience-designer** | Amy Jo Kim | 1 | Core Designer | Game Thinking | Player journey, scaffolding, Flow channel, progression design |
| **engagement-engineer** | Nir Eyal | 1 | Core Designer | Hooked Model | Engagement loops, variable rewards, triggers, A/B testing |
| **player-profiler** | Andrzej Marczewski | 1 | Core Analyst | HEXAD User Types | Player segmentation, persona-mechanic alignment, behavioral signals |
| **enterprise-strategist** | Kevin Werbach | 2 | Domain Specialist | 6D Framework | Enterprise gamification, ROI, legal/ethics, pilot design |
| **learning-designer** | Karl Kapp | 2 | Domain Specialist | Gamification of Learning | Learning gamification, Bloom's alignment, spaced repetition |
| **emotion-designer** | Nicole Lazzaro + Jesse Schell | 1 | Core Designer | 4 Keys to Fun + Lenses | Emotional design, fiero, sensory design, fun analysis |

## Task Catalog

| ID | Task | Command | Executor(s) | Description |
|----|------|---------|-------------|-------------|
| T-GM-001 | gamification-diagnostic | `*diagnostic` | gamification-chief, motivation-analyst, player-profiler | Full gamification audit; mandatory entry point for all workflows |
| T-GM-002 | player-persona-mapping | `*profile-players` | player-profiler, motivation-analyst | Map users to HEXAD types and Octalysis Core Drives |
| T-GM-003 | motivation-audit | `*audit-motivation` | motivation-analyst, behavior-architect | Analyze intrinsic/extrinsic balance, detect overjustification |
| T-GM-004 | progression-design | `*design-progression` | experience-designer, engagement-engineer | XP curves, levels, unlocks, mastery paths |
| T-GM-005 | engagement-loop-design | `*design-loops` | engagement-engineer, behavior-architect | Hook model cycles (trigger-action-reward-investment) |
| T-GM-006 | leaderboard-design | `*design-leaderboard` | experience-designer, player-profiler | Social competition mechanics with anti-toxicity design |
| T-GM-007 | onboarding-gamification | `*gamify-onboarding` | behavior-architect, experience-designer | First-time user experience gamification |
| T-GM-008 | enterprise-gamification-plan | `*enterprise-plan` | enterprise-strategist, motivation-analyst | Business gamification strategy with ROI |
| T-GM-009 | learning-gamification | `*gamify-learning` | learning-designer, emotion-designer | Educational gamification with Bloom's alignment |
| T-GM-010 | emotion-mapping | `*map-emotions` | emotion-designer, experience-designer | 4 Keys to Fun analysis and emotional journey |
| T-GM-011 | ab-test-gamification | `*ab-test` | engagement-engineer, player-profiler | Test gamification mechanics variants |
| T-GM-012 | anti-pattern-audit | `*audit-patterns` | gamification-chief, motivation-analyst | Detect dark patterns, pointsification, and ethical violations |

## Workflow Catalog

| Workflow | Phases | Duration | Use Case | Phase Sequence |
|----------|--------|----------|----------|----------------|
| **wf-full-gamification** | 7 | 2-4 weeks | Complete end-to-end gamification | Diagnostic - Profile - Strategy - Design - Build - Test - Launch |
| **wf-enterprise-gamification** | 6 | 2-3 weeks | Corporate/employee gamification | Assessment - Alignment - Design - Pilot - Scale - Monitor |
| **wf-app-gamification** | 5 | 1-2 weeks | Consumer app or SaaS product | Audit - UX Mapping - Mechanic Selection - Implementation - Optimization |
| **wf-learning-gamification** | 5 | 1-2 weeks | Educational or training platforms | Objective Mapping - Mechanic Design - Content Integration - Testing - Iteration |

### Workflow Selection Guide

| Situation | Recommended Workflow |
|-----------|---------------------|
| New product without gamification | wf-full-gamification |
| Existing product with low engagement | wf-app-gamification |
| Employee engagement / HR program | wf-enterprise-gamification |
| LMS, MOOC, or corporate training | wf-learning-gamification |
| Quick audit of existing gamification | Run `*diagnostic` alone |
| Specific mechanic optimization | Run individual tasks directly |

## Template Catalog

| Template | File | Purpose |
|----------|------|---------|
| **Gamification Strategy** | `templates/gamification-strategy-tmpl.md` | Master strategy document covering goals, personas, mechanics, and roadmap |
| **Player Journey** | `templates/player-journey-tmpl.md` | Map the full player journey from discovery through endgame |
| **Mechanics Spec** | `templates/mechanics-spec-tmpl.md` | Detailed specification for individual game mechanics |
| **Progression System** | `templates/progression-system-tmpl.md` | XP curves, levels, tiers, and unlock systems |
| **Engagement Loop** | `templates/engagement-loop-tmpl.md` | Hook cycle specification (trigger, action, reward, investment) |
| **ROI Report** | `templates/roi-report-tmpl.md` | Enterprise gamification ROI analysis and projections |

## Checklist Catalog

| Checklist | File | Purpose |
|-----------|------|---------|
| **Gamification Quality Gate** | `checklists/gamification-quality-gate.md` | Master quality gate covering all 8 GM-QG checkpoints |
| **Ethical Gamification** | `checklists/ethical-gamification.md` | Verify no dark patterns, manipulation, or exploitation |
| **UX Gamification** | `checklists/ux-gamification.md` | Ensure gamification enhances rather than hinders usability |
| **Enterprise Readiness** | `checklists/enterprise-readiness.md` | Validate corporate gamification meets business requirements |
| **Player Experience** | `checklists/player-experience.md` | Verify player journey is engaging, fair, and rewarding |

## Playbook Catalog

| Playbook | File | Purpose |
|----------|------|---------|
| **App Engagement Boost** | `playbooks/app-engagement-boost.md` | Tactical guide to boost DAU/MAU in consumer apps |
| **Enterprise Employee Motivation** | `playbooks/enterprise-employee-motivation.md` | Step-by-step for gamifying employee programs |
| **Onboarding Gamification** | `playbooks/onboarding-gamification.md` | Gamify the first-time user experience for higher activation |
| **Retention Rescue** | `playbooks/retention-rescue.md` | Emergency playbook for declining retention metrics |

## Quick Start

### How to Activate

All gamification work begins with the diagnostic:

```
@gamification-chief *gamify
```

This triggers `tasks/gamification-diagnostic.md` (T-GM-001), which assesses the current state and recommends the appropriate workflow.

### First Commands

1. **Start a full gamification project:**
   ```
   @gamification-chief *gamify
   ```

2. **Run a quick motivation audit:**
   ```
   @gamification-chief *audit-motivation
   ```

3. **Profile your user base:**
   ```
   @gamification-chief *profile-players
   ```

4. **Check for anti-patterns:**
   ```
   @gamification-chief *audit-patterns
   ```

### Agent Direct Activation

You can activate specific agents directly for focused work:

```
@motivation-analyst *help        # Octalysis analysis commands
@behavior-architect *help        # B=MAP behavior design commands
@experience-designer *help       # Game Thinking design commands
@engagement-engineer *help       # Hooked Model engineering commands
@player-profiler *help           # HEXAD profiling commands
@enterprise-strategist *help     # 6D enterprise strategy commands
@learning-designer *help         # Learning gamification commands
@emotion-designer *help          # 4 Keys to Fun + Lenses commands
```

## Usage Examples

### Example 1: Gamifying a SaaS Onboarding

**Scenario:** A B2B SaaS product has a 30% activation rate. You want to gamify the onboarding to increase first-week engagement.

```
@gamification-chief *gamify
# Chief runs diagnostic, identifies onboarding as critical gap
# Recommends wf-app-gamification workflow

@behavior-architect *gamify-onboarding
# Designs B=MAP-based onboarding flow:
#   - Tiny Habits for first actions
#   - Ability simplification (reduce friction)
#   - Celebration prompts on milestones

@experience-designer *design-progression
# Creates onboarding progression:
#   - 5-step setup wizard with progress bar
#   - Quick-win rewards for first actions
#   - Mastery path preview (show what's ahead)
```

**Expected Output:** `onboarding-spec.md`, `progression-system.yaml`, `onboarding-hooks.yaml`

### Example 2: Enterprise Employee Engagement

**Scenario:** A company wants to gamify its internal training platform to increase completion rates from 40% to 75%.

```
@gamification-chief *gamify
# Diagnostic identifies enterprise training context
# Recommends wf-enterprise-gamification workflow

@enterprise-strategist *enterprise-plan
# Applies 6D Framework:
#   Define: Training completion, knowledge retention
#   Delineate: Employees, managers
#   Describe: Weekly training modules, quizzes
#   Devise: Team challenges, streak rewards, mentoring badges
#   Don't forget: Legal/HR compliance, opt-out option
#   Deploy: Pilot with 100 users, then scale

@learning-designer *gamify-learning
# Designs learning mechanics:
#   - Bloom's-aligned challenges
#   - Spaced repetition with XP rewards
#   - Knowledge battles (team vs team)
```

**Expected Output:** `enterprise-strategy.md`, `roi-report.md`, `learning-mechanics-spec.md`

### Example 3: Retention Rescue for Mobile App

**Scenario:** A fitness app is losing 60% of users after week 2. You need an emergency engagement intervention.

```
@gamification-chief *diagnostic
# Full audit reveals: no engagement loops, pure extrinsic rewards, no social mechanics

@motivation-analyst *audit-motivation
# Octalysis reveals Black Hat heavy (CD6 Scarcity + CD8 Loss Avoidance)
# Recommends shifting to White Hat (CD1 Epic Meaning + CD3 Creativity)

@engagement-engineer *design-loops
# Designs 3 Hook cycles:
#   1. Daily check-in loop (trigger: morning notification)
#   2. Workout streak loop (trigger: streak countdown)
#   3. Social challenge loop (trigger: friend activity)

@emotion-designer *map-emotions
# Maps emotional journey:
#   - Fiero moments (personal records)
#   - Social fun (group challenges)
#   - Serious fun (health progress insights)
```

**Expected Output:** `motivation-audit-report.md`, `engagement-loops.yaml`, `emotion-map.yaml`

### Example 4: E-Learning Platform Gamification

**Scenario:** An online course platform wants to increase course completion rates and learner satisfaction.

```
@gamification-chief *gamify
# Recommends wf-learning-gamification

@player-profiler *profile-players
# Identifies learner HEXAD distribution:
#   40% Achievers, 25% Socialisers, 20% Free Spirits, 15% Players

@learning-designer *gamify-learning
# Designs Bloom's-aligned mechanics:
#   - Knowledge quests per module
#   - Mastery badges per competency
#   - Peer review challenges
#   - Creative project showcases

@experience-designer *design-progression
# Creates learning progression:
#   - Skill trees with branching paths
#   - Difficulty scaling per learner level
#   - Milestone celebrations
```

**Expected Output:** `player-personas.md`, `learning-mechanics-spec.md`, `progression-system.yaml`

### Example 5: Customer Loyalty Program

**Scenario:** An e-commerce platform wants to redesign its loyalty program beyond simple point accumulation.

```
@gamification-chief *diagnostic
# Identifies pointsification anti-pattern in current loyalty program

@motivation-analyst *audit-motivation
# Reveals over-reliance on extrinsic rewards (CD4 Ownership only)
# Recommends adding CD1 (Epic Meaning), CD3 (Creativity), CD5 (Social)

@player-profiler *profile-players
# Segments customers into HEXAD types
# Recommends personalized loyalty tiers per type

@experience-designer *design-leaderboard
# Designs multi-dimensional recognition:
#   - Top reviewer board (Philanthropist)
#   - Social sharer board (Socialiser)
#   - Collection completionist board (Achiever)
#   - Trendsetter board (Free Spirit)
```

**Expected Output:** `loyalty-strategy.md`, `persona-mechanics-map.yaml`, `leaderboard-spec.md`

## Configuration

### config.yaml

The main squad configuration lives in `config.yaml`. Key settings:

| Setting | Value | Description |
|---------|-------|-------------|
| `max_concurrent_agents` | 4 | Maximum agents running simultaneously |
| `default_workflow` | wf-full-gamification | Default workflow when none specified |
| `entry_task` | gamification-diagnostic | Mandatory first task |
| `veto_enforcement` | strict | All veto conditions enforced |
| `quality_gate_enforcement` | strict | All quality gates must pass |
| `ethics_check` | always | Ethics validation on every phase |
| `anti_pattern_detection` | enabled | Continuous anti-pattern monitoring |

### Governance Configuration

| File | Content |
|------|---------|
| `config/veto-conditions.yaml` | 32 veto conditions (8 critical, 24 high/medium) |
| `config/quality-gates.yaml` | 8 quality gates (GM-QG-001 to GM-QG-008) |
| `config/heuristics.yaml` | 22 decision-making heuristics |

### Dependencies

| Dependency | Type | Purpose |
|------------|------|---------|
| squad-ux | Internal (optional) | UX integration for gamified interfaces |
| squad-analytics | Internal (optional) | Metrics tracking for gamification KPIs |
| analytics-platform | External | Track engagement, retention, progression metrics |
| notification-service | External | Trigger-based notifications for engagement loops |

## Frameworks Reference

| Framework | Author | Focus | Key Concept |
|-----------|--------|-------|-------------|
| **Octalysis** | Yu-kai Chou | Motivation analysis | 8 Core Drives (White Hat vs Black Hat) |
| **B=MAP** | BJ Fogg | Behavior design | Behavior = Motivation x Ability x Prompt |
| **Game Thinking** | Amy Jo Kim | Experience design | Player mastery journey and scaffolding |
| **Hooked Model** | Nir Eyal | Habit formation | Trigger-Action-Reward-Investment cycle |
| **HEXAD** | Andrzej Marczewski | Player profiling | 6 user types (Philanthropist, Socialiser, Free Spirit, Achiever, Player, Disruptor) |
| **6D Framework** | Kevin Werbach | Enterprise strategy | Define-Delineate-Describe-Devise-Don't forget-Deploy |
| **Gamification of Learning** | Karl Kapp | Education | Bloom's taxonomy + game mechanics alignment |
| **4 Keys to Fun** | Nicole Lazzaro | Emotion design | Hard Fun, Easy Fun, People Fun, Serious Fun |
| **Lenses of Game Design** | Jesse Schell | Holistic design | 113 analytical lenses for game element evaluation |
| **Self-Determination Theory** | Deci & Ryan | Motivation science | Autonomy, Competence, Relatedness |
| **Flow Theory** | Csikszentmihalyi | Optimal experience | Challenge-skill balance for sustained engagement |

## Quality Governance

### 8 Quality Gates (GM-QG-001 to GM-QG-008)

Every workflow phase has a quality gate that must pass before proceeding:

| Gate | Name | Phase | Key Checks |
|------|------|-------|------------|
| GM-QG-001 | Diagnostic Quality | Diagnostic | Completeness, data accuracy, framework coverage |
| GM-QG-002 | Player Profiling | Profiling | All 6 HEXAD types evaluated, concrete data, distribution sums to 100% |
| GM-QG-003 | Motivation Balance | Motivation Audit | White/Black Hat ratio, SDT assessment, overjustification check |
| GM-QG-004 | Strategy Alignment | Strategy | Business goals mapped, ROI projected, ethical review passed |
| GM-QG-005 | Design Completeness | Design | All mechanics specified, persona alignment verified, progression balanced |
| GM-QG-006 | Social Mechanics | Leaderboard/Social | 90-9-1 problem addressed, anti-toxicity measures, opt-in/opt-out |
| GM-QG-007 | Launch Readiness | Pre-Launch | A/B test results, anti-pattern audit passed, metrics instrumented |
| GM-QG-008 | Enterprise Readiness | Enterprise | Legal/HR compliance, pilot results, scale plan validated |

### 32 Veto Conditions

Critical conditions that block gamification decisions:

- **8 Critical Vetos (zero tolerance):** Dark patterns, gambling mechanics targeting minors, surveillance gamification, manipulative loss aversion, pay-to-win without disclosure, addiction-by-design, data exploitation, discriminatory mechanics
- **24 High/Medium Vetos:** Covering design quality, motivation balance, enterprise compliance, learning effectiveness, and ethical boundaries

### 22 Heuristics

Consolidated decision-making heuristics from all frameworks, covering: motivation design, behavior architecture, engagement engineering, player profiling, experience design, emotion mapping, enterprise strategy, learning design, and ethics.

## Frequently Asked Questions

### Q: Where do I start?

Always start with `@gamification-chief *gamify`. The diagnostic task (T-GM-001) analyzes your current state and recommends the right workflow. Never skip the diagnostic.

### Q: Can I run individual tasks without a full workflow?

Yes. Each task can be executed independently via its command (e.g., `*audit-motivation`, `*profile-players`). However, tasks assume their pre-conditions are met. Check the task's Pre-Conditions section before running it standalone.

### Q: What if two frameworks disagree?

The `gamification-chief` resolves framework conflicts. For example, if Octalysis recommends adding CD8 (Loss Avoidance) but SDT analysis shows it would harm autonomy, the chief mediates based on context, user type distribution, and ethical guidelines. The chief's resolution is documented in the strategy output.

### Q: How do I handle gamification for a product that already has mechanics?

Run `*diagnostic` first. It will inventory existing mechanics, map them to frameworks, and identify gaps and anti-patterns. Then use `wf-app-gamification` for targeted improvements rather than a full redesign.

### Q: What are the most common anti-patterns?

1. **Pointsification** — Adding points/badges without motivational alignment
2. **One-size-fits-all** — Same mechanics for all user types
3. **Extrinsic-only** — Over-reliance on external rewards (overjustification effect)
4. **Toxic leaderboards** — Global rankings that demotivate 90% of users
5. **Dark patterns** — Manipulative mechanics (false urgency, hidden costs, addiction loops)

The `*audit-patterns` task detects all of these.

### Q: How do I measure gamification success?

Each workflow produces metrics recommendations. Common KPIs include:
- **Engagement:** DAU/MAU ratio, session length, actions per session
- **Retention:** D1/D7/D30 retention, churn rate
- **Progression:** Completion rate, level distribution, unlock rate
- **Social:** Team participation, referral rate, social actions per user
- **Business:** Conversion rate, LTV, NPS, training completion (enterprise)

### Q: Can I use this squad for non-digital contexts?

The squad is designed primarily for digital products but the frameworks (especially 6D Framework and Octalysis) apply to physical and hybrid contexts. Use `@enterprise-strategist` for non-digital scenarios.

### Q: How do quality gates work?

Quality gates are checkpoints between workflow phases. Each gate has specific criteria that must pass before proceeding to the next phase. If a gate fails, work returns to the previous phase with specific feedback. Gates are enforced automatically when `quality_gate_enforcement: strict` is set in config.yaml.

## Structure

```
squad-gamification/
├── config.yaml              # Squad configuration
├── package.json             # Squad manifest
├── README.md                # This file
├── CHANGELOG.md             # Release notes
├── tasks/                   # 12 executable tasks
│   ├── gamification-diagnostic.md
│   ├── player-persona-mapping.md
│   ├── motivation-audit.md
│   ├── progression-design.md
│   ├── engagement-loop-design.md
│   ├── leaderboard-design.md
│   ├── onboarding-gamification.md
│   ├── enterprise-gamification-plan.md
│   ├── learning-gamification.md
│   ├── emotion-mapping.md
│   ├── ab-test-gamification.md
│   └── anti-pattern-audit.md
├── workflows/               # 4 multi-phase workflows
│   ├── wf-full-gamification.yaml
│   ├── wf-enterprise-gamification.yaml
│   ├── wf-app-gamification.yaml
│   └── wf-learning-gamification.yaml
├── templates/               # 6 document templates
│   ├── gamification-strategy-tmpl.md
│   ├── player-journey-tmpl.md
│   ├── mechanics-spec-tmpl.md
│   ├── progression-system-tmpl.md
│   ├── engagement-loop-tmpl.md
│   └── roi-report-tmpl.md
├── checklists/              # 5 quality checklists
│   ├── gamification-quality-gate.md
│   ├── ethical-gamification.md
│   ├── ux-gamification.md
│   ├── enterprise-readiness.md
│   └── player-experience.md
├── data/                    # Knowledge bases and catalogs
│   ├── gamification-kb.md
│   ├── mechanics-catalog.yaml
│   ├── motivation-frameworks.yaml
│   ├── anti-patterns-catalog.yaml
│   └── case-studies.yaml
├── playbooks/               # 4 tactical playbooks
│   ├── app-engagement-boost.md
│   ├── enterprise-employee-motivation.md
│   ├── onboarding-gamification.md
│   └── retention-rescue.md
├── config/                  # Governance configuration
│   ├── veto-conditions.yaml
│   ├── quality-gates.yaml
│   └── heuristics.yaml
├── docs/                    # Documentation
│   ├── user-guide.md
│   ├── architecture.md
│   └── examples.md
├── scripts/                 # Operational scripts
│   ├── validate-squad.sh
│   ├── squad-stats.sh
│   └── fidelity-report.sh
├── benchmarks/              # Smoke tests and baselines
└── minds/                   # 9 agent mind directories
    ├── yu-kai-chou/
    ├── bj-fogg/
    ├── amy-jo-kim/
    ├── nir-eyal/
    ├── andrzej-marczewski/
    ├── kevin-werbach/
    ├── karl-kapp/
    ├── nicole-lazzaro/
    └── jesse-schell/
```

## Validation

```bash
# Structural validation
bash scripts/validate-squad.sh

# Statistics dashboard
bash scripts/squad-stats.sh

# Agent fidelity report
bash scripts/fidelity-report.sh
```

## Version History

| Version | Date | Summary |
|---------|------|---------|
| 1.0.0 | 2026-03-14 | Initial release: 9 agents, 12 tasks, 4 workflows, 6 templates, 5 checklists, 4 playbooks, 32 veto conditions, 8 quality gates, 22 heuristics |

## Version

- **Squad Version:** 1.0.0
- **AIOX Framework:** v2.0
- **Created:** 2026-03-14
