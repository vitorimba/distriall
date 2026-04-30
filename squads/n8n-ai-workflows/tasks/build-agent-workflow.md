# Task: Build AI Agent Workflow in n8n

```yaml
task:
  name: "Build AI Agent Workflow"
  id: "build-agent-workflow"
  version: "1.0.0"
  execution_type: "Agent"
  responsible_executor: "n8n-chief (routes to specialist)"
  estimated_time: "30-60min"
  elicit: true

input:
  required:
    - name: "use_case"
      description: "What the agent should do (e.g., customer support, sales, scheduling)"
    - name: "channels"
      description: "Communication channels (WhatsApp, Telegram, web chat, email, phone)"
  optional:
    - name: "existing_tools"
      description: "APIs/services already in use (CRM, calendar, DB)"
    - name: "volume"
      description: "Expected message volume per day"
    - name: "languages"
      description: "Languages the agent must support"

output:
  - "Workflow architecture diagram (ASCII)"
  - "Node-by-node specification"
  - "System prompt for each AI node"
  - "Memory and tool configuration"
  - "Error handling strategy"
  - "Cost estimate per interaction"
  - "Testing plan"

veto_conditions:
  - "No use case defined → STOP, ask user"
  - "No channel defined → STOP, ask user"
  - "Financial decisions without human-in-the-loop → VETO"
  - "Direct database writes without validation → VETO"
  - "GPT-4o used for simple classification → WARN (suggest mini/haiku)"

acceptance_criteria:
  - "Architecture pattern selected and justified"
  - "All n8n nodes specified with configuration"
  - "System prompts written for all AI nodes"
  - "Error handling on every external API call"
  - "Human-in-the-loop for critical paths"
  - "Cost estimate provided"
  - "Memory strategy defined"
```

## Workflow

### Phase 1: Requirements Elicitation

Ask the user (if not already provided):

1. **Use case:** "What should this AI agent do? (e.g., answer customer questions, qualify leads, book meetings)"
2. **Channels:** "Where will users interact? (WhatsApp, Telegram, web chat, email, phone)"
3. **Knowledge:** "What information does the agent need? (product docs, FAQs, order database, calendar)"
4. **Integrations:** "What systems should it connect to? (CRM, calendar, payment, DB)"
5. **Escalation:** "When should it hand off to a human?"
6. **Volume:** "How many interactions per day expected?"

### Phase 2: Architecture Selection (WADE Framework)

Based on requirements, select pattern from `data/agent-patterns.yaml`:

| Use Case | Primary Pattern | Enhanced With |
|----------|----------------|---------------|
| Customer support | Router | Agentic RAG for FAQ |
| Sales qualification | Orchestrator | Router for intents |
| Scheduling | Single Agent | Calendar tool |
| Document Q&A | Agentic RAG | — |
| Multi-channel | Orchestrator | Channel sub-agents |
| Lead nurturing | Chained | — |

**Output:** Architecture diagram with pattern justification.

### Phase 3: Node Specification

For each node in the workflow, specify:

```yaml
node:
  name: "{descriptive_name}"
  type: "{n8n_node_type}"  # e.g., "AI Agent", "HTTP Request", "Switch", "Code"
  config:
    # Node-specific configuration
  error_handling:
    on_error: "{continue|stop|retry}"
    retry_count: 3
    fallback: "{fallback_action}"
```

### Phase 4: AI Configuration

For each AI Agent node:

```yaml
ai_config:
  model: "{model_name}"
  temperature: 0.3  # Low for consistency
  system_prompt: |
    {detailed_system_prompt}
  tools:
    - name: "{tool_name}"
      type: "{n8n_tool_type}"
      description: "{what_it_does}"
  memory:
    type: "{buffer|postgres|redis}"
    window: 10  # messages to remember
    session_key: "{{ $json.session_id }}"
  output_parser:
    type: "structured"
    schema: "{expected_output_format}"
```

### Phase 5: Integration Wiring

For each external integration:

```yaml
integration:
  service: "{service_name}"
  node_type: "{n8n_node_type}"
  credential: "{credential_type}"
  config:
    endpoint: "{API_endpoint}"
    method: "{GET|POST|PUT}"
    headers: {}
    body: {}
  error_handling:
    timeout: 30000  # ms
    retry: 3
    fallback: "{what_to_do_on_failure}"
```

### Phase 6: Production Safeguards

Apply these safeguards to every workflow:

1. **Rate Limiting:** Code node with counter per user/session
2. **Error Handling:** Try/catch on every external call
3. **Fallback Messages:** "Desculpe, estou com dificuldade. Transferindo para um atendente."
4. **Logging:** Write to Google Sheets / DB for monitoring
5. **Human Escalation:** Slack/email notification trigger
6. **Cost Tracking:** Log tokens used per interaction
7. **Session Management:** Timeout after 30min inactivity

### Phase 7: Cost Estimation

Calculate per-interaction cost:

```
Routing/Classification: ~$0.0003 (GPT-4o-mini, ~200 tokens)
Main Agent Response: ~$0.003 (GPT-4o, ~500 tokens)
RAG Retrieval: ~$0.0001 (embedding lookup)
Total per interaction: ~$0.003-0.01
Monthly (1000/day): ~$90-300
```

### Phase 8: Testing Plan

1. **Unit Test:** Each node individually with sample data
2. **Integration Test:** Full workflow with test webhook
3. **Edge Cases:** Empty input, timeout, rate limit hit
4. **Load Test:** Concurrent messages (n8n queue mode)
5. **Human Review:** 10 real conversations before go-live

---

## Handoff Rules

| Condition | Route To |
|-----------|----------|
| RAG system design needed | @cole-medin |
| Business/sales automation focus | @nate-herk |
| Custom n8n node needed | @max-tkacz |
| WhatsApp/Telegram integration | @leon-van-zyl |
| Architecture pattern unclear | @pawel-cislo |
| Platform scaling questions | @jan-oberhauser |

## Outputs

- **workflow-architecture-diagram** — Representacao ASCII da estrutura do agente
- **node-specification** — Especificacao detalhada de cada no com system prompts
- **cost-estimate** — Estimativa de custo por interacao e plano de testes
