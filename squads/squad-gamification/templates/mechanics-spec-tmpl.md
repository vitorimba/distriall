# Game Mechanic Specification — {{MECHANIC_NAME}}

> **ID:** GM-MECH-{{ID}}
> **Category:** {{progression | social | reward | challenge | narrative | collection}}
> **Priority:** P{{0-3}}
> **Status:** Draft | Approved | In Development | Live | Deprecated

## 1. Overview

**Name:** {{mechanic_name}}
**Type:** {{mechanic_type}}
**Description:** {{one_paragraph_description}}
**Inspiration:** {{real_world_reference — e.g., "Duolingo streaks", "LinkedIn skill endorsements"}}

## 2. Design Rationale

### Why This Mechanic?
**Core Drive (Octalysis):** CD{{number}} — {{name}}
**4 Keys (Lazzaro):** {{Hard Fun | Easy Fun | People Fun | Serious Fun}}
**Target Behavior:** {{behavior this mechanic reinforces}}
**Target HEXAD Types:** {{types that respond to this mechanic}}
**B=MAP Role:** {{Increases Motivation | Increases Ability | Acts as Prompt}}

### Evidence Base
- **Research:** {{citation or framework reference}}
- **Case Study:** {{real product that uses this successfully}}
- **Expected Impact:** {{hypothesis about impact on primary metric}}

## 3. Detailed Specification

### 3.1 Rules
```yaml
mechanic:
  name: "{{name}}"
  trigger:
    event: "{{what triggers the mechanic}}"
    conditions:
      - "{{condition_1}}"
      - "{{condition_2}}"
  action:
    type: "{{what happens}}"
    parameters:
      {{param_1}}: {{value}}
      {{param_2}}: {{value}}
  reward:
    type: "{{reward_type}}"
    value: {{value}}
    variability: "{{fixed | variable_ratio | variable_interval}}"
  constraints:
    cooldown: "{{time between triggers}}"
    daily_cap: {{max_per_day}}
    lifetime_cap: {{max_total}}
```

### 3.2 States
```
[Initial] → [Active] → [Completed/Rewarded]
              ↓
           [Failed] → [Retry]
```

| State | Description | Transition Condition |
|-------|-------------|---------------------|
| Initial | {{description}} | {{condition}} |
| Active | {{description}} | {{condition}} |
| Completed | {{description}} | {{condition}} |
| Failed | {{description}} | {{condition}} |

### 3.3 Visual/UI Requirements
- **Location:** {{where in the UI}}
- **Visibility:** {{always visible | on interaction | in dedicated section}}
- **Animation:** {{on trigger | on completion | on level up}}
- **Sound:** {{audio feedback}}
- **Accessibility:** {{screen reader, color blind, keyboard navigation}}

### 3.4 Progression Integration
- **XP Granted:** {{amount and conditions}}
- **Level Requirement:** {{min level to access, if any}}
- **Unlock Condition:** {{how user accesses this mechanic}}
- **Scales With Level:** {{yes/no, how}}

### 3.5 Social Integration
- **Shareable:** {{yes/no}}
- **Comparable:** {{yes/no — can users compare?}}
- **Collaborative:** {{yes/no — can users cooperate?}}
- **Competitive:** {{yes/no — does it rank users?}}

## 4. Data Model

```yaml
schema:
  {{mechanic_name}}:
    user_id: string
    status: enum [initial, active, completed, failed]
    progress: number  # 0-100%
    value: number  # accumulated value
    started_at: datetime
    completed_at: datetime | null
    metadata:
      {{custom_field_1}}: {{type}}
      {{custom_field_2}}: {{type}}

events:
  - name: "{{mechanic}}_started"
    properties: [user_id, mechanic_id, timestamp]
  - name: "{{mechanic}}_progress"
    properties: [user_id, mechanic_id, progress_value, timestamp]
  - name: "{{mechanic}}_completed"
    properties: [user_id, mechanic_id, reward_earned, timestamp]
```

## 5. A/B Test Plan

**Hypothesis:** {{Adding this mechanic will improve {{metric}} by {{X%}}}}
**Control:** {{No mechanic | current version}}
**Variants:**
- A: {{variant_description}}
- B: {{variant_description}}
**Primary Metric:** {{metric}}
**Sample Size:** {{calculated}}
**Duration:** {{weeks}}
**Success Threshold:** {{minimum detectable effect}}

## 6. Edge Cases & Error Handling

| Scenario | Expected Behavior |
|----------|-------------------|
| User loses connection during action | {{behavior}} |
| Duplicate trigger event | {{behavior}} |
| User at max level/cap | {{behavior}} |
| Concurrent actions by same user | {{behavior}} |
| Time zone change (for daily mechanics) | {{behavior}} |

## 7. Anti-Pattern Checklist

- [ ] Does not create pointsification (points have real purpose)
- [ ] Does not exploit loss aversion unfairly
- [ ] Does not create unhealthy compulsion
- [ ] Opt-out available (for optional mechanics)
- [ ] Does not punish non-participation
- [ ] Variable rewards are fair (not gambling)
- [ ] Does not discriminate by demographic
- [ ] Accessible to users with disabilities

## 8. Dependencies

| Dependency | Type | Description |
|-----------|------|-------------|
| {{system}} | Required/Optional | {{why needed}} |

## 9. Approval

| Reviewer | Role | Status | Notes |
|----------|------|--------|-------|
| {{name}} | Product | Pending | |
| {{name}} | Engineering | Pending | |
| {{name}} | UX | Pending | |
| {{name}} | Ethics | Pending | |
