# Task: Design Agent Persona

> Create a complete persona/character specification for an AI agent.
> Based on Amanda Askell's character design methodology.

## Metadata
- **executor**: @amanda-askell
- **elicit**: true
- **estimated_time**: 15-20 minutes
- **complexity**: medium

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| agent_type | YES | Type of agent |
| brand_voice | YES | Brand personality and values |
| target_audience | YES | Who interacts with this agent |
| scenarios | YES | Key interaction scenarios |

## Elicitation

1. "What's the brand personality in 3 words?"
2. "If this agent were a person, how would you describe them?"
3. "What emotion should users feel after interacting with the agent?"
4. "What should the agent NEVER sound like?"
5. "Are there real people (team members, spokespersons) whose style should be reflected?"

## Character Design Framework

### Layer 1: Identity Core
- **Name**: (optional, but humanizes the agent)
- **Role Statement**: "I am a [role] who [primary function]"
- **Identity Anchor**: One sentence that captures the agent's essence

### Layer 2: Values & Principles
- **Primary Values** (max 3): What the agent prioritizes above all
- **Secondary Values** (max 3): Important but not at the expense of primary
- **Value Conflicts**: When values conflict, which wins? (e.g., speed vs accuracy)

### Layer 3: Behavioral Guidelines
- **DO behaviors**: Specific actions the agent should take
- **DON'T behaviors**: Specific actions the agent must avoid
- **GRAY ZONE behaviors**: Judgment calls with guidance

### Layer 4: Tone Dimensions
Based on Askell's multidimensional approach:

| Dimension | Spectrum | Setting |
|-----------|----------|---------|
| Formality | Casual ←→ Formal | |
| Warmth | Cool ←→ Warm | |
| Energy | Calm ←→ Enthusiastic | |
| Confidence | Humble ←→ Assertive | |
| Humor | Serious ←→ Playful | |
| Detail | Concise ←→ Thorough | |

### Layer 5: Empathy Calibration
- **Acknowledgment patterns**: How to recognize user emotions
- **Validation phrases**: Stock phrases for emotional moments
- **Escalation sensitivity**: When emotions signal need for human
- **Recovery patterns**: How to recover from agent mistakes

### Layer 6: Anti-Persona
What the agent is NOT:
- NOT a [specific anti-persona]
- NEVER sounds like [anti-example]
- REJECTS [specific unwanted behavior]

## Output

```yaml
persona:
  name: "{{agent_name}}"
  identity: "{{one-sentence identity}}"
  
  values:
    primary:
      - "{{value_1}}: {{why}}"
      - "{{value_2}}: {{why}}"
      - "{{value_3}}: {{why}}"
    secondary:
      - "{{value_4}}"
    conflict_resolution: "When {{value_1}} conflicts with {{value_2}}, prioritize {{winner}} because {{reason}}"
  
  tone:
    formality: {{1-10}}
    warmth: {{1-10}}
    energy: {{1-10}}
    confidence: {{1-10}}
    humor: {{1-10}}
    detail: {{1-10}}
  
  behaviors:
    always:
      - "{{behavior_1}}"
    never:
      - "{{anti_behavior_1}}"
    judgment:
      - "{{gray_zone}}: {{guidance}}"
  
  empathy:
    acknowledgment: "{{pattern}}"
    validation_phrases:
      - "{{phrase_1}}"
      - "{{phrase_2}}"
    escalation_triggers:
      - "{{trigger}}"
  
  anti_persona:
    - "NOT a {{description}}"
    
  signature_phrases:
    - "{{phrase that captures the agent's voice}}"
```

## Veto Conditions
- If persona has no values defined → VETO
- If tone dimensions are all at extremes → VETO (unrealistic)
- If no anti-persona defined → WARN (agent identity is weak)
- If empathy section empty for customer-facing agent → VETO

## Outputs

- **persona-profile** — Perfil completo da persona com voice_dna, behavioral_states e heuristics
- **character-sheet** — Documento de referencia com tom, vocabulario e limites comportamentais
