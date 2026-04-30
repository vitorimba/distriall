# Task: Diagnose Optimal Prompting Techniques

> Analyze an agent type and recommend the best prompting techniques.

## Metadata
- **executor**: @elvis-saravia + @sander-schulhoff
- **elicit**: true
- **estimated_time**: 10-15 minutes
- **complexity**: medium

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| agent_type | YES | Type of agent (sales, support, etc.) |
| complexity | YES | simple, medium, complex |
| scenarios | YES | 3-5 key scenarios the agent must handle |

## Technique Decision Matrix

Based on Elvis Saravia's 58-technique taxonomy and Sander Schulhoff's research:

### By Agent Type

| Agent Type | Primary Techniques | Secondary | Avoid |
|------------|-------------------|-----------|-------|
| **Sales** | Role Prompting, Few-Shot (3-5), Chain-of-Thought | Self-Ask, Decomposition | Over-reasoning (kills natural flow) |
| **Support** | Role Prompting, Few-Shot (5+), Chain-of-Thought, Self-Criticism | Retrieval-Augmented, Tool Use | Zero-shot (needs examples) |
| **Service/Scheduling** | Role Prompting, Structured Output, Few-Shot (3) | Tool Use (calendar) | Chain-of-Thought (overkill) |
| **Onboarding** | Role Prompting, Chain-of-Thought, Progressive Disclosure | Few-Shot, Self-Ask | Overwhelming with options |
| **Collections** | Role Prompting, Few-Shot, Guardrails-Heavy | Chain-of-Thought (payment plans) | Aggressive tone techniques |
| **Triage/Routing** | Role Prompting, Classification, Tool Use | Chain-of-Thought (complex routing) | Open-ended generation |

### By Complexity

| Complexity | Techniques to Add |
|-----------|-------------------|
| **Simple** | Role + Few-Shot is enough |
| **Medium** | Add Chain-of-Thought + Self-Criticism |
| **Complex** | Add Decomposition + Self-Ask + Tool Use + Memory Management |

### Technique Catalog (Top 15 for Agent Prompts)

| # | Technique | When to Use | Impact |
|---|-----------|------------|--------|
| 1 | **Role Prompting** | ALWAYS — foundation of every agent | Critical |
| 2 | **Few-Shot Examples** | ALWAYS — shows ideal behavior | Critical |
| 3 | **Chain-of-Thought** | Complex reasoning, diagnostics | High |
| 4 | **Self-Criticism** | Quality-sensitive responses | High |
| 5 | **Structured Output** | Consistent formatting needed | High |
| 6 | **Guardrails/Constraints** | Safety-critical agents | Critical |
| 7 | **Tool Use Specification** | Agent uses external tools | High |
| 8 | **Decomposition** | Multi-step workflows | Medium |
| 9 | **Self-Ask** | Research/investigation agents | Medium |
| 10 | **Retrieval-Augmented** | Knowledge-intensive agents | High |
| 11 | **Progressive Disclosure** | Onboarding, teaching agents | Medium |
| 12 | **Classification** | Triage, routing agents | High |
| 13 | **Ensembling** | High-stakes decisions | Medium |
| 14 | **Emotional Calibration** | Customer-facing agents | High |
| 15 | **Metacognitive Prompting** | Self-aware quality control | Medium |

## Output

```
# Technique Diagnosis: {{agent_type}}

## Recommended Stack
| Technique | Purpose | Priority |
|-----------|---------|----------|
| ... | ... | CRITICAL/HIGH/MEDIUM |

## Why This Stack
[Rationale for technique selection]

## Implementation Notes
[How to apply each technique in the system prompt]

## What to Avoid
[Techniques that would hurt this agent type]
```

## Veto Conditions
- If no Role Prompting → ALWAYS add it
- If no Few-Shot examples → ALWAYS require them
- If customer-facing with no Guardrails → BLOCK deployment

## Outputs

- **technique-recommendation** — Tecnica de prompting recomendada com justificativa
- **comparison-matrix** — Matriz comparativa de tecnicas candidatas com pros/contras
