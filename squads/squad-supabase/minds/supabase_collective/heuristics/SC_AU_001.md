# SC_AU_001 — Automation Decision Tree

**Type:** Decision Framework
**Phase:** 0 (Automation Design)
**Agent:** automator (Cron)
**Pattern:** Tool Selection Pipeline

## Purpose

Framework de decisao para escolher a ferramenta correta de automacao no Supabase. Dado um processo que precisa ser automatizado, este heuristic classifica o tipo de automacao e recomenda a ferramenta ideal com o padrao de implementacao correspondente.

## Configuration

```yaml
SC_AU_001:
  name: "Automation Decision Tree"
  phase: 0
  agent: "automator"

  tools:
    - id: "pg_cron"
      type: "time-based"
      best_for: "Scheduled SQL jobs — cleanup, aggregation, reporting"
      runs_in: "PostgreSQL (extension)"
      complexity: "low"
      reliability: "high — runs inside the database"
      limitations: "SQL only, no external logic, no HTTP natively"

    - id: "pg_cron_pg_net"
      type: "time-based + HTTP"
      best_for: "Scheduled HTTP calls — API polling, webhook dispatch, cache warming"
      runs_in: "PostgreSQL (pg_cron schedules pg_net calls)"
      complexity: "low"
      reliability: "medium — HTTP calls can fail"
      limitations: "No complex logic, no response processing beyond status code"

    - id: "trigger"
      type: "event-based (synchronous)"
      best_for: "Data validation, derived columns, audit logs, cascading updates"
      runs_in: "PostgreSQL (trigger function)"
      complexity: "low-medium"
      reliability: "high — runs in same transaction"
      limitations: "Synchronous — blocks the triggering transaction"

    - id: "database_webhook"
      type: "event-based (asynchronous)"
      best_for: "Notify external services on data changes"
      runs_in: "Supabase platform (pg_net under the hood)"
      complexity: "low"
      reliability: "medium — async HTTP, no built-in retry"
      limitations: "Fire-and-forget, limited payload customization"

    - id: "edge_function"
      type: "complex logic"
      best_for: "Business logic, API orchestration, third-party SDKs, transformations"
      runs_in: "Deno runtime (Supabase Edge Functions)"
      complexity: "medium"
      reliability: "high — with proper error handling"
      limitations: "Cold starts, 150s timeout, requires deployment"

    - id: "pgmq_queue"
      type: "pipeline / guaranteed delivery"
      best_for: "Batch processing, ordered events, retry with backoff, dead letter"
      runs_in: "PostgreSQL (pgmq extension)"
      complexity: "medium"
      reliability: "very high — database-backed queue"
      limitations: "Needs consumer (Edge Function or pg_cron) to process"

  classification_inputs:
    - "Is it time-based or event-based?"
    - "Does it need external HTTP calls?"
    - "Does it require complex business logic?"
    - "Does it need guaranteed delivery / retry?"
    - "Does it need to run in the same transaction?"
```

## Decision Tree

```
INPUT: Description of what needs to be automated

STEP 1: CLASSIFY TRIGGER TYPE
  IF (runs on a schedule — "every hour", "daily at midnight", "every 5 minutes")
    THEN type = TIME_BASED → go to STEP 2
  IF (reacts to data change — "when user signs up", "after order created", "on status update")
    THEN type = EVENT_BASED → go to STEP 3
  IF (processes batch of items — "process pending emails", "sync queued records")
    THEN type = PIPELINE → go to STEP 4

STEP 2: TIME-BASED RESOLUTION
  IF (action is pure SQL — DELETE old rows, UPDATE aggregates, INSERT reports)
    THEN RECOMMEND: pg_cron
    EXAMPLE: SELECT cron.schedule('cleanup', '0 3 * * *', $$DELETE FROM logs WHERE created_at < now() - interval '30 days'$$);
  IF (action requires HTTP call — ping API, send webhook, warm cache)
    THEN RECOMMEND: pg_cron + pg_net
    EXAMPLE: SELECT cron.schedule('daily-report', '0 8 * * *', $$SELECT net.http_post(url:='https://api.example.com/reports', body:='{"date":"today"}'::jsonb)$$);
  IF (action requires complex logic — transform data, call multiple APIs, use SDK)
    THEN RECOMMEND: pg_cron + Edge Function
    EXAMPLE: pg_cron calls Edge Function via pg_net, Edge Function handles logic

STEP 3: EVENT-BASED RESOLUTION
  IF (action must be in same transaction — validate data, set derived column, audit log)
    THEN RECOMMEND: trigger (synchronous)
    EXAMPLE: CREATE TRIGGER set_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_timestamp();
  IF (action is notify external service — send email, update search index, sync CRM)
    AND (fire-and-forget is acceptable)
    THEN RECOMMEND: Database Webhook
    EXAMPLE: Supabase Dashboard → Database Webhooks → POST to Edge Function URL
  IF (action requires complex logic on data change)
    THEN RECOMMEND: trigger → pg_net → Edge Function
    EXAMPLE: Trigger fires, pg_net calls Edge Function with payload, function handles logic
  IF (action needs guaranteed delivery — cannot lose events)
    THEN RECOMMEND: trigger → pgmq queue → consumer
    EXAMPLE: Trigger enqueues to pgmq, pg_cron consumer processes with retry

STEP 4: PIPELINE RESOLUTION
  IF (ordered processing required)
    THEN RECOMMEND: pgmq with single consumer
  IF (parallel processing acceptable)
    THEN RECOMMEND: pgmq with multiple consumers
  IF (dead letter handling needed)
    THEN RECOMMEND: pgmq with dead letter queue configuration
  CONSUMER OPTIONS:
    - pg_cron polling queue every N seconds (simple)
    - Edge Function triggered by pg_cron (complex logic)
    - External service polling queue API (external integration)

TERMINATION: Tool selected, implementation pattern chosen, monitoring strategy defined
FALLBACK: If unsure, start with simplest tool (pg_cron or trigger), escalate if insufficient
```

## Evaluation Criteria

| Criterion | Weight | Threshold | Description |
|-----------|--------|-----------|-------------|
| Simplicity | 0.8 | Simplest viable tool | Do not over-engineer — pg_cron before Edge Function |
| Reliability | 0.9 | Matches requirement | Guaranteed delivery needs queue, not webhook |
| Latency | 0.7 | Matches expectation | Real-time needs trigger, batch can use cron |
| Observability | 0.8 | Logs and monitoring | Every automation must be monitorable |
| Failure handling | 0.9 | Retry strategy defined | No fire-and-forget for critical paths |
| Maintainability | 0.7 | SQL preferred | SQL automations easier to maintain than deployed functions |

## Validation Questions

1. "O tipo de automacao e time-based, event-based ou pipeline?"
2. "A acao mais simples (SQL puro) e suficiente ou precisa de logica externa?"
3. "A entrega garantida e necessaria ou fire-and-forget e aceitavel?"
4. "Existe estrategia de retry e monitoramento definida?"
5. "A ferramenta escolhida e a mais simples que resolve o problema?"

## Failure Modes

### Over-Engineering
- **Trigger:** Developer builds Edge Function para algo que pg_cron resolve em 1 linha SQL
- **Detection:** Automation requires deployment, has cold starts, but only runs simple query
- **Recovery:** Rewrite as pg_cron job, remove Edge Function

### Missing Retry Logic
- **Trigger:** Database Webhook dispara para servico externo sem retry
- **Detection:** Events silently lost when external service is temporarily down
- **Recovery:** Replace webhook with trigger → pgmq → consumer with exponential backoff

### Synchronous External Call in Trigger
- **Trigger:** Trigger function makes HTTP call via pg_net but waits for response
- **Detection:** Transactions hang when external service is slow
- **Recovery:** Make the call async (pg_net is async by default) or queue for later processing

---

**Pattern Compliance:** Tool Selection Pipeline with Complexity Escalation
**Source:** Supabase Documentation, Paul Copplestone (launch talks), Ant Wilson (architecture posts)
**Next Step:** SC_AU_002 (Event Pipeline Architecture)
