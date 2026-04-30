# Template: AI Agent Workflow Specification

## Workflow: {{workflow_name}}

**Pattern:** {{pattern_name}} (N8N-AP-{{pattern_id}})
**Created:** {{date}}
**Author:** {{agent_id}}

---

## Architecture

```
{{ascii_architecture_diagram}}
```

---

## Nodes

### Node 1: Trigger
```yaml
name: "{{trigger_name}}"
type: "{{trigger_type}}"  # webhook | chatTrigger | scheduleTrigger
config:
  {{trigger_config}}
```

### Node 2: AI Agent
```yaml
name: "{{agent_name}}"
type: "agent"
model:
  provider: "{{openai|anthropic}}"
  model: "{{model_name}}"
  temperature: {{temperature}}
system_prompt: |
  {{system_prompt}}
tools:
  {{tools_list}}
memory:
  type: "{{memory_type}}"
  config:
    {{memory_config}}
```

### Node N: Response
```yaml
name: "{{response_name}}"
type: "{{response_type}}"
config:
  {{response_config}}
```

---

## Data Flow

| From | To | Data Passed |
|------|-----|------------|
| {{node_1}} | {{node_2}} | {{data_description}} |

---

## Error Handling

| Node | Error Action | Fallback |
|------|-------------|----------|
| {{node}} | {{action}} | {{fallback}} |

---

## Cost Estimate

| Component | Cost/Interaction | Monthly ({{volume}}/day) |
|-----------|-----------------|--------------------------|
| AI Model | ${{cost}} | ${{monthly}} |
| API Calls | ${{cost}} | ${{monthly}} |
| **Total** | **${{total}}** | **${{monthly_total}}** |

---

## Testing Plan

1. [ ] Unit test each node with sample data
2. [ ] Integration test full workflow
3. [ ] Edge case: empty input
4. [ ] Edge case: API timeout
5. [ ] Edge case: rate limit hit
6. [ ] Load test: {{concurrent_users}} concurrent
7. [ ] Human review: 10 real conversations
