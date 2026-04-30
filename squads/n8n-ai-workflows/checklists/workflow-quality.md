# n8n Workflow Quality Checklist

## Architecture (Weight: 25%)
- [ ] Correct pattern selected for use case (Single/Chained/Router/Orchestrator/RAG)
- [ ] Minimal number of nodes (no unnecessary complexity)
- [ ] Clear trigger → process → output flow
- [ ] Sub-workflows used for reusable logic (> 3 uses)
- [ ] No circular references or infinite loops
- [ ] Data flow between nodes is explicit and documented

## AI Configuration (Weight: 25%)
- [ ] Right model per node (mini for routing, 4o for reasoning)
- [ ] System prompt is concise and focused (< 2000 tokens)
- [ ] Temperature set appropriately (0.1-0.3 for consistency, 0.7+ for creativity)
- [ ] Tools configured with clear descriptions
- [ ] Output parser configured for structured responses where needed
- [ ] Memory type appropriate (buffer for simple, postgres for persistent)
- [ ] Memory window sized correctly (not storing entire history)

## Error Handling (Weight: 20%)
- [ ] Try/catch on EVERY HTTP Request node
- [ ] Try/catch on EVERY external API call
- [ ] Fallback messages for AI failures
- [ ] Timeout configured on external calls (30s default)
- [ ] Retry logic with exponential backoff (max 3 retries)
- [ ] Graceful degradation (human handoff on repeated failures)
- [ ] Error logging to monitoring system

## Security (Weight: 15%)
- [ ] All credentials stored in n8n Credential store
- [ ] No API keys hardcoded in Code nodes
- [ ] Webhook authentication configured (header auth or HMAC)
- [ ] Input sanitization before AI processing
- [ ] Rate limiting per user/session
- [ ] No sensitive data (PII, credentials) in workflow logs
- [ ] CORS configured for web chat triggers

## Performance (Weight: 10%)
- [ ] Independent API calls run in parallel (Split + Merge)
- [ ] Caching for repeated queries (Redis or in-memory)
- [ ] Batch processing for bulk operations
- [ ] Code nodes used instead of AI for simple transformations
- [ ] Queue mode enabled for high-volume workflows
- [ ] Response time < 3s for chat interactions

## Cost Optimization (Weight: 5%)
- [ ] GPT-4o-mini or Haiku used for classification/routing
- [ ] System prompts optimized for minimal tokens
- [ ] RAG chunk size optimized (not too large)
- [ ] Token spend monitoring configured
- [ ] Monthly cost estimate documented

---

## Scoring

| Score | Rating | Action |
|-------|--------|--------|
| 90-100% | Excellent | Ready for production |
| 75-89% | Good | Minor fixes recommended |
| 60-74% | Acceptable | Fix issues before production |
| 40-59% | Poor | Significant rework needed |
| < 40% | Critical | Rebuild recommended |

## Quick Audit Template

```
Workflow: {name}
Date: {date}
Reviewer: {agent}

Architecture:    [ ]/6   ({score}%)
AI Config:       [ ]/7   ({score}%)
Error Handling:  [ ]/7   ({score}%)
Security:        [ ]/7   ({score}%)
Performance:     [ ]/6   ({score}%)
Cost:            [ ]/5   ({score}%)

TOTAL:           [ ]/38  ({score}%)
RATING:          {rating}
```
