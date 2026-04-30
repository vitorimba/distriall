# Architecture — Squad Gamification

> **Squad:** squad-gamification
> **Version:** 1.0.0
> **Framework:** Synkra AIOX v2.0

## Squad Architecture Diagram

```
+===========================================================================+
|                        SQUAD GAMIFICATION                                  |
|                                                                           |
|  +-------------------------------------------------------------------+   |
|  |                    TIER 0: ORCHESTRATOR                            |   |
|  |                                                                   |   |
|  |  +-------------------------------------------------------------+ |   |
|  |  |  gamification-chief (Chief Gamification Officer)             | |   |
|  |  |  - Coordinates all agents                                   | |   |
|  |  |  - Resolves framework conflicts                             | |   |
|  |  |  - Enforces veto conditions (32)                            | |   |
|  |  |  - Selects workflows                                        | |   |
|  |  |  - Entry point: *gamify                                     | |   |
|  |  +-------------------------------------------------------------+ |   |
|  +-------------------------------------------------------------------+   |
|           |              |              |              |                   |
|           v              v              v              v                   |
|  +-------------------------------------------------------------------+   |
|  |                    TIER 1: CORE AGENTS                            |   |
|  |                                                                   |   |
|  |  +--------------+  +--------------+  +--------------+            |   |
|  |  | motivation-  |  | behavior-    |  | player-      |            |   |
|  |  | analyst      |  | architect    |  | profiler     |            |   |
|  |  | (Yu-kai Chou)|  | (BJ Fogg)   |  | (Marczewski) |            |   |
|  |  | Octalysis    |  | B=MAP       |  | HEXAD        |            |   |
|  |  +--------------+  +--------------+  +--------------+            |   |
|  |                                                                   |   |
|  |  +--------------+  +--------------+  +--------------+            |   |
|  |  | experience-  |  | engagement-  |  | emotion-     |            |   |
|  |  | designer     |  | engineer     |  | designer     |            |   |
|  |  | (Amy Jo Kim) |  | (Nir Eyal)  |  | (Lazzaro +   |            |   |
|  |  | Game Thinking|  | Hooked Model |  |  Schell)     |            |   |
|  |  +--------------+  +--------------+  +--------------+            |   |
|  +-------------------------------------------------------------------+   |
|           |                                          |                    |
|           v                                          v                    |
|  +-------------------------------------------------------------------+   |
|  |                  TIER 2: DOMAIN SPECIALISTS                       |   |
|  |                                                                   |   |
|  |  +-------------------------+  +-------------------------+        |   |
|  |  | enterprise-strategist   |  | learning-designer       |        |   |
|  |  | (Kevin Werbach)         |  | (Karl Kapp)             |        |   |
|  |  | 6D Framework            |  | Gamification of Learning|        |   |
|  |  +-------------------------+  +-------------------------+        |   |
|  +-------------------------------------------------------------------+   |
|                                                                           |
+===========================================================================+
```

## Tier System Explanation

### Tier 0: Orchestrator

The `gamification-chief` is the single entry point and coordination hub for the squad. It has full authority to:

- **Delegate tasks** to any Tier 1 or Tier 2 agent
- **Resolve conflicts** between framework recommendations (e.g., Octalysis suggests adding CD8 but SDT analysis says it would harm autonomy)
- **Enforce veto conditions** — 32 conditions that can block gamification decisions
- **Select workflows** based on diagnostic results
- **Override agent recommendations** when they conflict with quality gates or ethical guidelines

The chief does not design mechanics directly. It analyzes, coordinates, and validates.

### Tier 1: Core Agents

Six agents that handle the primary analysis and design work:

**Analysis Group:**

| Agent | Framework | Primary Output |
|-------|-----------|----------------|
| motivation-analyst | Octalysis | Motivation balance maps, Core Drive analysis |
| behavior-architect | B=MAP | Behavior designs, habit formation specs |
| player-profiler | HEXAD | Player personas, segmentation strategies |

**Design Group:**

| Agent | Framework | Primary Output |
|-------|-----------|----------------|
| experience-designer | Game Thinking | Player journeys, progression systems, leaderboards |
| engagement-engineer | Hooked Model | Engagement loops, triggers, variable rewards |
| emotion-designer | 4 Keys to Fun + Lenses | Emotional maps, fun analysis, sensory design |

Tier 1 agents can be activated directly for focused work but are typically coordinated by the chief during workflow execution.

### Tier 2: Domain Specialists

Two agents with deep expertise in specific domains:

| Agent | Domain | When Activated |
|-------|--------|----------------|
| enterprise-strategist | Corporate gamification | Enterprise workflows, ROI analysis, compliance |
| learning-designer | Educational gamification | Learning workflows, Bloom's alignment, assessment |

Tier 2 agents are activated only when the product context matches their domain. A consumer app will rarely need the enterprise-strategist; an LMS will always need the learning-designer.

## Agent Interaction Model

### Delegation Pattern

```
User Request
    |
    v
gamification-chief
    |
    +-- Analyzes request
    +-- Selects workflow or task
    +-- Checks pre-conditions
    |
    v
Delegate to Agent(s)
    |
    +-- Agent executes task
    +-- Agent produces output artifacts
    +-- Agent reports completion
    |
    v
gamification-chief
    |
    +-- Validates output (quality gate)
    +-- Checks veto conditions
    +-- Resolves conflicts (if multi-agent)
    |
    v
Next Phase or Final Output
```

### Multi-Agent Collaboration

Some tasks require multiple agents working together:

| Task | Lead Agent | Support Agent | Collaboration Pattern |
|------|-----------|---------------|----------------------|
| player-persona-mapping | player-profiler | motivation-analyst | Sequential: profiler maps HEXAD, analyst cross-references Octalysis |
| motivation-audit | motivation-analyst | behavior-architect | Parallel: analyst does Octalysis, architect does B=MAP |
| leaderboard-design | experience-designer | player-profiler | Sequential: designer creates spec, profiler validates per persona |
| engagement-loop-design | engagement-engineer | behavior-architect | Sequential: engineer designs hooks, architect validates behavior |
| learning-gamification | learning-designer | emotion-designer | Parallel: designer handles pedagogy, emotion handles affect |

### Conflict Resolution

When two frameworks produce conflicting recommendations:

1. **Chief identifies the conflict** (e.g., Octalysis recommends CD8 Loss Avoidance, but SDT analysis shows autonomy would be harmed)
2. **Chief evaluates context** — Which framework is more relevant for this specific situation?
3. **Chief applies heuristics** — 22 consolidated heuristics guide resolution
4. **Chief checks veto conditions** — If either recommendation triggers a veto, it is blocked
5. **Chief documents resolution** — The decision and rationale are recorded in the output

## Data Flow Between Agents

### Artifact Flow

```
gamification-diagnostic
    |
    +-- diagnostic-report.md
    |
    v
player-persona-mapping          motivation-audit
    |                               |
    +-- player-personas.md          +-- motivation-audit-report.md
    +-- hexad-distribution.yaml     +-- motivation-balance-map.yaml
    |                               |
    v                               v
progression-design          engagement-loop-design
    |                               |
    +-- progression-system.yaml     +-- engagement-loops.yaml
    |                               |
    v                               v
leaderboard-design          onboarding-gamification
    |                               |
    +-- leaderboard-spec.md         +-- onboarding-spec.md
    |                               |
    v                               v
emotion-mapping             ab-test-gamification
    |                               |
    +-- emotion-map.yaml            +-- ab-test-results.md
    |                               |
    v                               v
anti-pattern-audit
    |
    +-- final-audit-report.md
```

### Input-Output Dependencies

| Task | Required Inputs (from) | Outputs (used by) |
|------|----------------------|-------------------|
| gamification-diagnostic | Product context (user) | All downstream tasks |
| player-persona-mapping | Diagnostic report (T-GM-001) | progression-design, engagement-loop-design, leaderboard-design |
| motivation-audit | Diagnostic report (T-GM-001) | engagement-loop-design, progression-design |
| progression-design | Player personas (T-GM-002), motivation audit (T-GM-003) | onboarding-gamification, leaderboard-design |
| engagement-loop-design | Player personas (T-GM-002), motivation audit (T-GM-003) | ab-test-gamification |
| leaderboard-design | Player personas (T-GM-002), progression system (T-GM-004) | emotion-mapping, ab-test-gamification |
| onboarding-gamification | Progression system (T-GM-004) | ab-test-gamification |
| emotion-mapping | All design outputs | anti-pattern-audit |
| ab-test-gamification | Design outputs | anti-pattern-audit |
| anti-pattern-audit | All outputs | Final delivery |

## Quality Gates and Checkpoints

### Gate Architecture

```
Phase N Output
    |
    v
+-------------------+
| Quality Gate      |
| GM-QG-XXX         |
|                   |
| Criteria:         |
| - Check 1 [ ]    |
| - Check 2 [ ]    |
| - Check 3 [ ]    |
| ...               |
+-------------------+
    |           |
    v           v
  PASS        FAIL
    |           |
    v           v
Phase N+1   Return to Phase N
            with feedback
```

### Gate Sequence

| Gate | Between | Key Criteria |
|------|---------|-------------|
| GM-QG-001 | Diagnostic -> Profiling | Diagnostic complete, data sufficient, context documented |
| GM-QG-002 | Profiling -> Strategy | All 6 HEXAD types evaluated, distribution sums to 100% |
| GM-QG-003 | Strategy -> Design | White Hat/Black Hat ratio acceptable, SDT assessment complete |
| GM-QG-004 | Design -> Build | Business goals mapped, ROI projected, ethical review passed |
| GM-QG-005 | Build -> Test | All mechanics specified, persona alignment verified |
| GM-QG-006 | Social mechanics | 90-9-1 addressed, anti-toxicity, opt-in/opt-out |
| GM-QG-007 | Test -> Launch | A/B test results, anti-pattern audit passed |
| GM-QG-008 | Enterprise specific | Legal/HR compliance, pilot results validated |

### Veto System

Veto conditions are hard blocks that prevent progression regardless of other gate results:

```
Quality Gate Check
    |
    v
+-------------------+
| Veto Condition    |
| Check             |
|                   |
| 8 Critical        |-----> If triggered: HARD BLOCK
| 12 High           |-----> If triggered: BLOCK (fixable)
| 12 Medium         |-----> If triggered: WARNING
+-------------------+
    |
    v
  (Continue if no critical/high veto triggered)
```

**Critical veto examples:**
- Dark pattern detected in mechanic design
- Gambling mechanics targeting minors
- Surveillance gamification (monitoring without consent)
- Loss aversion mechanics without opt-out

## Knowledge Base Architecture

```
data/
├── gamification-kb.md          # Domain knowledge base
│   (Comprehensive gamification science reference)
│
├── mechanics-catalog.yaml      # 55+ game mechanics
│   (Each mechanic: description, framework, HEXAD affinity,
│    Core Drives, implementation complexity)
│
├── motivation-frameworks.yaml  # All frameworks
│   (Octalysis, SDT, HEXAD, B=MAP, Game Thinking,
│    Hooked Model, 6D, Bloom's, 4 Keys, Flow)
│
├── anti-patterns-catalog.yaml  # Anti-patterns
│   (Pointsification, dark patterns, manipulation,
│    each with detection criteria and remediation)
│
└── case-studies.yaml           # 22 real case studies
    (Industry, challenge, solution, results, lessons)
```

## Configuration Architecture

```
config/
├── veto-conditions.yaml    # 32 veto conditions
│   (severity: critical|high|medium,
│    trigger: condition description,
│    action: BLOCK|WARN)
│
├── quality-gates.yaml      # 8 quality gates
│   (id: GM-QG-XXX,
│    phase: where it applies,
│    criteria: list of checks)
│
└── heuristics.yaml         # 22 heuristics
    (domain: motivation|behavior|engagement|...,
     framework: source framework,
     rule: decision guidance)
```

## Mind Architecture

Each agent has a `minds/` directory containing:

```
minds/[persona-name]/
├── heuristics.yaml    # Agent-specific decision heuristics
└── VOICE_DNA.yaml     # Persona voice and communication style
```

The `heuristics.yaml` captures the framework-specific decision rules that the agent applies during task execution. The `VOICE_DNA.yaml` defines how the agent communicates — tone, vocabulary, emphasis patterns, and response structure.
