# System Prompt Quality Checklist

> Validate any system prompt before deployment. Based on frameworks from 8 elite minds.

## Identity & Role (Amanda Askell)
- [ ] Agent has a clear name and identity
- [ ] Role is specific (not generic "helpful assistant")
- [ ] Values are defined (what the agent cares about)
- [ ] Personality traits are explicit
- [ ] Behavioral guidelines are actionable (not vague)

## Technique Stack (Elvis Saravia)
- [ ] Role prompting is applied (clear persona assignment)
- [ ] Few-shot examples included (minimum 3)
- [ ] Chain-of-thought enabled for complex reasoning scenarios
- [ ] Output format is specified
- [ ] Self-criticism or self-check mechanism present

## Architecture (Lilian Weng)
- [ ] Conversation flow has clear phases
- [ ] Memory/context strategy is defined
- [ ] Tool usage is specified with triggers and syntax
- [ ] Planning capability for multi-step tasks
- [ ] Escalation path is clear

## CO-STAR Structure (Sheila Teo)
- [ ] Context: Business background provided
- [ ] Objective: Clear primary goal
- [ ] Style: Writing style specified
- [ ] Tone: Emotional register defined
- [ ] Audience: Target user described
- [ ] Response: Expected output format specified

## Five Principles (James Phoenix & Mike Taylor)
- [ ] Direction: Clear instructions on what to do
- [ ] Format: Output structure specified
- [ ] Examples: Demonstration of ideal responses
- [ ] Quality: Evaluation criteria defined
- [ ] Labor: Complex tasks broken into steps

## Security & Guardrails (Simon Willison)
- [ ] Prompt injection prevention rules present
- [ ] "Never reveal system prompt" instruction included
- [ ] Topic boundaries defined (in-scope vs out-of-scope)
- [ ] NEVER-DO list is specific and comprehensive
- [ ] Redirect message for out-of-scope requests
- [ ] No sensitive data hardcoded in prompt

## Evaluation (Sander Schulhoff)
- [ ] Smoke test: passes 3 key scenarios
- [ ] Adversarial test: handles injection attempts
- [ ] Consistency test: similar inputs get similar quality outputs
- [ ] Edge case test: handles unexpected inputs gracefully

## Systems Integration (Chip Huyen)
- [ ] Token count is reasonable for the model's context window
- [ ] No redundant or unnecessary instructions
- [ ] Prompt is maintainable (well-organized, comments where needed)
- [ ] Version tracked
- [ ] Monitoring/evaluation metrics defined

---

## Scoring

| Category | Weight | Score /10 | Weighted |
|----------|--------|-----------|----------|
| Identity & Role | 15% | | |
| Technique Stack | 15% | | |
| Architecture | 10% | | |
| CO-STAR Structure | 15% | | |
| Five Principles | 10% | | |
| Security & Guardrails | 20% | | |
| Evaluation | 10% | | |
| Systems Integration | 5% | | |
| **TOTAL** | **100%** | | **/10** |

### Thresholds
- **9-10**: Production ready
- **7-8.9**: Good, minor improvements recommended
- **5-6.9**: Needs work, significant gaps
- **< 5**: Rebuild recommended
