# Task: Optimize n8n Workflow

```yaml
task:
  name: "Optimize Workflow"
  id: "optimize-workflow"
  version: "1.0.0"
  execution_type: "Agent"
  responsible_executor: "n8n-chief"
  estimated_time: "15-30min"
  elicit: true

input:
  required:
    - name: "workflow_description"
      description: "Current workflow (JSON, screenshot, or description)"
    - name: "problem"
      description: "What's wrong (slow, expensive, unreliable)"
  optional:
    - name: "budget_target"
      description: "Target cost per interaction"
    - name: "latency_target"
      description: "Target response time"

output:
  - "Current state assessment (6 dimensions)"
  - "Prioritized optimization recommendations"
  - "Expected impact per recommendation"
  - "Implementation plan"

acceptance_criteria:
  - "All 6 dimensions scored"
  - "At least 3 actionable recommendations"
  - "Expected savings quantified"
```

## Optimization Framework (WRO)

### 6 Dimensions Review

Score each 1-10:

#### 1. Architecture
- Right pattern for the use case?
- Minimal nodes (no unnecessary complexity)?
- Clear data flow (no spaghetti)?
- Sub-workflows for reusable logic?

#### 2. AI Configuration
- Right model for each task? (mini for routing, 4o for reasoning)
- Optimized system prompts? (concise, focused)
- Appropriate temperature? (low for consistency)
- Tools properly configured?
- Memory appropriate? (not storing unnecessary context)

#### 3. Error Handling
- Try/catch on every external API call?
- Fallback paths for failures?
- Timeout handling?
- Retry with exponential backoff?
- Graceful degradation (not full stop)?

#### 4. Performance
- Parallel execution where possible?
- Caching for repeated queries?
- Batch processing for bulk operations?
- Lightweight nodes for simple transforms (Code vs AI)?
- Queue mode for high volume?

#### 5. Security
- Credentials in n8n credential store (not hardcoded)?
- Input sanitization before AI processing?
- Rate limiting per user/IP?
- No sensitive data in logs?
- Webhook authentication?

#### 6. Cost
- Token usage optimized? (concise prompts, right model)
- Cheaper model for routing/classification?
- Caching to avoid duplicate API calls?
- Batch operations where possible?
- Monitoring token spend?

### Common Optimizations

| Problem | Solution | Impact |
|---------|----------|--------|
| GPT-4o for everything | Use mini/haiku for routing | -70% cost |
| Long system prompts | Trim to essentials | -30% tokens |
| No caching | Add Redis/memory cache | -50% API calls |
| Sequential API calls | Parallel with Merge node | -60% latency |
| No rate limiting | Add Code node counter | Prevents overuse |
| Full history in memory | Window memory (last 10) | -40% tokens |
| Large chunks in RAG | Optimize chunk size | Better retrieval |
| No error handling | Add try/catch + fallback | +99% reliability |

## Outputs

- **current-state-assessment** — Score em 6 dimensoes do workflow atual
- **prioritized-recommendations** — Lista de otimizacoes com impacto esperado
- **implementation-plan** — Plano de execucao das melhorias priorizadas
