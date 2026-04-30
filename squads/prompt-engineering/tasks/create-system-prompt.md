# Task: Create System Prompt for AI Agent

> Full pipeline to create a production-ready system prompt for any AI agent type.

## Metadata
- **executor**: @prompt-chief (orchestrates) + specialist agents
- **elicit**: true
- **estimated_time**: 30-60 minutes
- **complexity**: medium-high

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| agent_type | YES | Type of agent (sales, support, service, onboarding, etc.) |
| business_context | YES | What business/product the agent serves |
| target_audience | YES | Who will interact with this agent |
| tone | NO | Desired tone (default: professional + empathetic) |
| tools_available | NO | External tools the agent can use (CRM, DB, APIs) |
| constraints | NO | Specific constraints or guardrails needed |
| examples | NO | Example conversations to use as few-shot |

## Elicitation

Ask the user these questions before proceeding:

1. **Agent Type**: "What type of agent is this? (sales, support, service, onboarding, collections, scheduling, other)"
2. **Business Context**: "Briefly describe the business/product this agent serves."
3. **Target Audience**: "Who are the users? (customers, leads, internal team, etc.)"
4. **Key Scenarios**: "List 3-5 main scenarios this agent must handle well."
5. **Tone & Personality**: "How should the agent sound? (professional, friendly, formal, casual, empathetic)"
6. **Boundaries**: "What should the agent NEVER do? What topics are off-limits?"
7. **Escalation**: "When should the agent escalate to a human?"
8. **Tools**: "Does the agent have access to any tools? (CRM, database, knowledge base, APIs)"

## Execution Phases

### Phase 1: Diagnose (Technique Selection)
**Agent**: @elvis-saravia
**Action**: Based on agent_type and scenarios, select optimal prompting techniques
**Output**: Technique stack with rationale

**Veto condition**: If agent_type is ambiguous, STOP and ask for clarification

### Phase 2: Architecture Design
**Agent**: @lilian-weng
**Action**: Design agent architecture
- Planning capabilities (task decomposition, conversation flow)
- Memory management (what to remember, context window strategy)
- Tool integration (when and how to use external tools)
**Output**: Architecture specification

### Phase 3: Character & Persona Design
**Agent**: @amanda-askell
**Action**: Design the agent's character
- Identity (who is this agent?)
- Values and principles
- Behavioral guidelines
- Tone dimensions
- Empathy patterns
- Anti-behaviors (what the agent must NOT do)
**Output**: Character specification

### Phase 4: Structure with CO-STAR
**Agent**: @sheila-teo
**Action**: Apply CO-STAR framework
- Context: background and business information
- Objective: what the agent must accomplish
- Style: writing/communication style
- Tone: emotional register
- Audience: who interacts with the agent
- Response: expected output format
**Output**: Structured prompt skeleton

### Phase 5: Apply Five Principles
**Agent**: @james-phoenix
**Action**: Validate and enhance against Five Principles
- Direction: clear role and objective
- Format: specified output structure
- Examples: few-shot examples for key scenarios
- Quality: evaluation criteria
- Labor: task decomposition for complex scenarios
**Output**: Enhanced prompt with principles applied

### Phase 6: Security & Guardrails
**Agent**: @simon-willison
**Action**: Add security layers
- Prompt injection prevention
- Topic boundaries
- Escalation triggers
- Safety guardrails
- Output sanitization rules
**Output**: Security-hardened prompt

### Phase 7: Evaluation
**Agent**: @sander-schulhoff
**Action**: Test the prompt
- Smoke test with 3 key scenarios
- Adversarial testing
- Consistency check
- Score against quality criteria
**Output**: Evaluation report with score

### Phase 8: Systems Integration Check
**Agent**: @chip-huyen
**Action**: Validate production readiness
- Context window usage efficiency
- Token cost optimization
- Integration patterns
- Monitoring recommendations
**Output**: Production readiness report

## Output

The final deliverable is a complete system prompt with:

```
# System Prompt: {Agent Name}

## Identity & Role
[Who the agent is, what it does]

## Core Instructions
[Primary behavioral guidelines]

## Conversation Flow
[How to handle different phases of interaction]

## Knowledge & Context
[Business context, product knowledge]

## Tools
[Available tools and when to use them]

## Examples
[Few-shot examples for key scenarios]

## Guardrails
[What NOT to do, escalation triggers, safety rules]

## Tone & Style
[Communication guidelines]

## Evaluation Criteria
[How to self-assess response quality]
```

## Completion Criteria
- [ ] All 8 phases executed
- [ ] Smoke test passes 3/3 scenarios
- [ ] No prompt injection vulnerabilities
- [ ] Guardrails defined for all edge cases
- [ ] Few-shot examples included (minimum 3)
- [ ] Escalation triggers documented
- [ ] Token cost estimated

## Outputs

- **system-prompt-document** — System prompt completo seguindo framework selecionado (CO-STAR, Five Principles, etc.)
- **prompt-rationale** — Justificativa das decisoes de design do prompt
- **quality-score** — Score de qualidade baseado no checklist system-prompt-quality
