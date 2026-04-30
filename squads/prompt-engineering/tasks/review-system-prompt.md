# Task: Review System Prompt

> Evaluate an existing system prompt against quality criteria from all 8 specialists.

## Metadata
- **executor**: @prompt-chief (orchestrates) + specialist agents
- **elicit**: true
- **estimated_time**: 15-30 minutes
- **complexity**: medium

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| prompt_text | YES | The system prompt to review |
| agent_type | YES | What type of agent this prompt is for |
| known_issues | NO | Any known problems with the current prompt |

## Evaluation Dimensions

### 1. Technique Appropriateness (@elvis-saravia)
- Are the right prompting techniques being used for this agent type?
- Is Chain-of-Thought used where complex reasoning is needed?
- Are few-shot examples relevant and well-crafted?
- Score: /10

### 2. Research Rigor (@sander-schulhoff)
- Are the techniques evidence-based?
- Is there adversarial robustness?
- Is the prompt testable and measurable?
- Score: /10

### 3. Agent Architecture (@lilian-weng)
- Is planning capability structured correctly?
- Is memory/context managed efficiently?
- Are tool integrations well-specified?
- Score: /10

### 4. Character & Persona (@amanda-askell)
- Is the persona well-defined and consistent?
- Are values and behavioral guidelines clear?
- Is empathy calibrated for the use case?
- Score: /10

### 5. Agentic Patterns (@simon-willison)
- Is the system prompt structure solid?
- Are there prompt injection protections?
- Are guardrails comprehensive?
- Score: /10

### 6. Framework Structure (@sheila-teo)
- Does the prompt cover all CO-STAR elements?
- Is it well-organized and readable?
- Score: /10

### 7. Principles Compliance (@james-phoenix)
- Does it give clear direction?
- Are output formats specified?
- Are examples provided?
- Is quality evaluable?
- Is labor divided for complex tasks?
- Score: /10

### 8. Systems Readiness (@chip-huyen)
- Is it token-efficient?
- Is it maintainable and versionable?
- Does it integrate well with the broader system?
- Score: /10

## Output

```
# Prompt Review Report

## Overall Score: X/10

## Dimension Scores
| Dimension | Score | Status |
|-----------|-------|--------|
| Technique Appropriateness | /10 | PASS/FAIL |
| Research Rigor | /10 | PASS/FAIL |
| Agent Architecture | /10 | PASS/FAIL |
| Character & Persona | /10 | PASS/FAIL |
| Agentic Patterns | /10 | PASS/FAIL |
| Framework Structure | /10 | PASS/FAIL |
| Principles Compliance | /10 | PASS/FAIL |
| Systems Readiness | /10 | PASS/FAIL |

## Critical Issues (must fix)
- [issue 1]

## Improvements (should fix)
- [improvement 1]

## Strengths
- [strength 1]
```

## Veto Conditions
- If prompt has NO persona definition → FAIL (route to @amanda-askell)
- If prompt has NO guardrails → FAIL (route to @simon-willison)
- If prompt has NO examples → WARN (route to @elvis-saravia)
- If overall score < 5.0 → RECOMMEND REBUILD from scratch

## Outputs

- **review-report** — Analise detalhada do prompt com pontos fortes e fracos
- **improvement-suggestions** — Lista priorizada de melhorias com exemplos de antes/depois
- **revised-prompt** — Versao revisada do prompt incorporando as melhorias
