# Task: Diagnose Workflow Architecture

```yaml
task:
  name: "Diagnose Architecture"
  id: "diagnose-architecture"
  version: "1.0.0"
  execution_type: "Agent"
  responsible_executor: "n8n-chief + pawel-cislo"
  estimated_time: "10-20min"
  elicit: true

input:
  required:
    - name: "use_case_description"
      description: "What the user wants to automate"
  optional:
    - name: "existing_workflow"
      description: "JSON or description of existing workflow"
    - name: "constraints"
      description: "Budget, latency, scale requirements"

output:
  - "Recommended architecture pattern"
  - "Justification with trade-offs"
  - "Visual architecture diagram"
  - "Model selection recommendation"
  - "Estimated cost range"
  - "Specialist routing recommendation"

veto_conditions:
  - "No use case provided → STOP"
  - "Multiple conflicting requirements → CLARIFY before recommending"

acceptance_criteria:
  - "Pattern selected from N8N-AP-001 to N8N-AP-005"
  - "Trade-offs documented (cost vs latency vs complexity)"
  - "Model recommendation per node"
  - "Next step is clear (which specialist to use)"
```

## Diagnostic Process

### Step 1: Classify Use Case

Ask these 5 diagnostic questions:

1. **"What should the agent DO?"** → Classify intent
   - Answer questions → Knowledge Agent
   - Process data → Pipeline
   - Handle multiple topics → Router
   - Coordinate sub-tasks → Orchestrator

2. **"How many distinct intents/paths?"**
   - 1 → Single Agent or Agentic RAG
   - 2-4 → Router
   - 5+ → Orchestrator

3. **"Does it need a knowledge base?"**
   - Yes, large (100+ docs) → Agentic RAG
   - Yes, small (< 20 docs) → System prompt may suffice
   - No → Standard agent

4. **"What channels?"**
   - Single channel → Standard trigger
   - Multi-channel → Consider channel abstraction layer

5. **"What's the expected volume?"**
   - Low (< 100/day) → Any pattern works
   - Medium (100-1000/day) → Consider queue mode
   - High (1000+/day) → Queue mode + horizontal scaling required

### Step 2: Apply Decision Tree

```
START
│
├── Sequential pipeline (no user interaction)?
│   └── Yes → CHAINED (N8N-AP-002)
│
├── How many user intents?
│   ├── 1 → Needs knowledge base?
│   │   ├── Large KB → AGENTIC RAG (N8N-AP-005)
│   │   └── Small/No KB → SINGLE AGENT (N8N-AP-001)
│   │
│   ├── 2-4 → ROUTER (N8N-AP-003)
│   │
│   └── 5+ or complex delegation → ORCHESTRATOR (N8N-AP-004)
│
└── Hybrid? → ORCHESTRATOR + RAG sub-agent
```

### Step 3: Generate Recommendation

Output format:

```markdown
## Architecture Recommendation

**Pattern:** {pattern_name} (N8N-AP-{id})
**Complexity:** {low|medium|high}

**Why this pattern:**
- {reason_1}
- {reason_2}

**Trade-offs:**
| Aspect | This Pattern | Alternative |
|--------|-------------|-------------|
| Cost | {$} | {$$} |
| Latency | {Xms} | {Yms} |
| Complexity | {low/med/high} | {low/med/high} |
| Scalability | {notes} | {notes} |

**Visual Architecture:**
```
{ASCII diagram}
```

**Model Selection:**
| Node | Model | Why |
|------|-------|-----|
| Classifier | gpt-4o-mini | Fast, cheap for routing |
| Main Agent | gpt-4o | Needs reasoning |
| ... | ... | ... |

**Estimated Cost:** ${X}/interaction, ${Y}/month at {volume}

**Next Step:** Route to @{specialist} for implementation
```

### Step 4: Route to Specialist

Based on the diagnosed pattern and use case, recommend the right specialist:

| Pattern | Primary Specialist | Secondary |
|---------|-------------------|-----------|
| Agentic RAG | @cole-medin | @leon-van-zyl (integrations) |
| Orchestrator (business) | @nate-herk | @pawel-cislo (architecture) |
| Router (support) | @leon-van-zyl | @cole-medin (RAG branch) |
| Single Agent | @max-tkacz | — |
| Chained (enterprise) | @max-tkacz | @jan-oberhauser (scaling) |

## Outputs

- **recommended-architecture-pattern** — Padrao selecionado (N8N-AP-001 a N8N-AP-005) com justificativa
- **visual-architecture-diagram** — Diagrama da arquitetura recomendada
- **model-selection-cost-estimate** — Modelo por no e faixa de custo estimada
