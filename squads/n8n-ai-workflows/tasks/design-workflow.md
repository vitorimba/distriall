# Task: Design Complete n8n Workflow

```yaml
task:
  name: "Design n8n Workflow"
  id: "design-workflow"
  version: "1.0.0"
  execution_type: "Agent"
  responsible_executor: "n8n-chief"
  estimated_time: "20-45min"
  elicit: true

input:
  required:
    - name: "goal"
      description: "What the workflow should accomplish"
    - name: "trigger"
      description: "What starts the workflow (webhook, schedule, event, manual)"
  optional:
    - name: "integrations"
      description: "External services to connect"
    - name: "constraints"
      description: "Budget, latency, volume constraints"

output:
  - "Workflow architecture diagram"
  - "Node specification list"
  - "Data flow mapping"
  - "Error handling plan"
  - "Deployment checklist"

veto_conditions:
  - "No clear goal → STOP, ask user"
  - "No trigger defined → STOP, ask user"
  - "Workflow exceeds 50 nodes → WARN, suggest sub-workflows"
  - "No error handling → VETO, must add"

acceptance_criteria:
  - "Clear trigger → process → output flow"
  - "Each node has defined purpose"
  - "Error handling on external calls"
  - "Data flow between nodes is explicit"
```

## Workflow

### Step 1: Understand the Goal

Ask:
- "What should this workflow accomplish end-to-end?"
- "What triggers it? (webhook, schedule, event, chat message)"
- "What's the expected output? (message sent, data saved, notification, etc.)"
- "What external services need to connect?"

### Step 2: Map the Flow

Create a visual representation:

```
[Trigger] → [Process 1] → [Decision?] → [Process 2] → [Output]
                              ↓
                         [Alt Path] → [Output 2]
```

### Step 3: Select Nodes

For each step, choose the appropriate n8n node:

| Need | n8n Node |
|------|----------|
| Start from HTTP call | Webhook |
| Start on schedule | Schedule Trigger |
| Start from chat | Chat Trigger |
| AI processing | AI Agent / LLM Chain |
| API call | HTTP Request |
| Conditional routing | Switch / IF |
| Data transformation | Code / Set |
| Loop processing | Loop Over Items |
| Wait for event | Wait |
| Send notification | Slack / Email / WhatsApp |
| Database operation | Postgres / MySQL / Supabase |
| File processing | Read/Write Binary |
| Merge data | Merge |
| Split data | Split Out |

### Step 4: Define Data Flow

For each connection between nodes, specify:
- What data passes through
- How expressions reference previous node output
- Any data transformation needed

### Step 5: Add Safeguards

- Error handling on every HTTP Request / external call
- Rate limiting where applicable
- Logging for debugging
- Retry logic for transient failures

### Step 6: Document

Generate specification with:
1. Architecture diagram (ASCII)
2. Node list with configurations
3. Data flow description
4. Error handling strategy
5. Deployment steps

## Outputs

- **workflow-architecture-diagram** — Diagrama visual da arquitetura completa
- **node-specification-list** — Lista de nos com proposito e mapeamento de dados
- **error-handling-plan** — Estrategia de erros e checklist de deploy
