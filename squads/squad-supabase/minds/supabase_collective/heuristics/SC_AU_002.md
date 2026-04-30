# SC_AU_002 — Event Pipeline Architecture

**Heuristic ID:** SC_AU_002
**Expert:** Supabase Collective
**Domain:** Event-Driven Automation
**Agent:** automator (Cron)
**Version:** 1.0.0

---

## Overview

Framework para construir pipelines event-driven robustos no Supabase. Cada evento no banco pode disparar uma cadeia de ações automatizadas — desde notificações simples até workflows complexos com múltiplas etapas.

---

## Core Pattern

```
[Data Change] → [Trigger] → [pg_net] → [Edge Function] → [External Service] → [Callback]
     │              │           │             │                  │                │
   INSERT       plpgsql     async HTTP    TypeScript/Deno    Stripe, Slack    UPDATE result
   UPDATE       AFTER ROW   non-blocking  server-side        SendGrid, etc    back to DB
   DELETE       FOR EACH    fire & forget  close to user      Webhooks         close loop
```

---

## Pipeline Stages

### Stage 1: Event Source (Database Trigger)

```sql
CREATE OR REPLACE FUNCTION pipeline_trigger()
RETURNS trigger AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://<project>.supabase.co/functions/v1/pipeline-handler',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.service_role_key'),
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'event', TG_OP,
      'table', TG_TABLE_NAME,
      'record', row_to_json(NEW),
      'old_record', CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END,
      'timestamp', NOW()
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Key rules:**
- Use `AFTER` triggers (data already committed)
- Use `FOR EACH ROW` for granular control
- pg_net is async — trigger returns immediately, no blocking
- `SECURITY DEFINER` only if trigger needs cross-table reads

### Stage 2: Dispatch (pg_net)

- **Async by nature** — HTTP request is enqueued, not blocking
- **Fire and forget** — no response waited in trigger context
- **No retry** — pg_net does NOT retry on failure; for critical pipelines, use pgmq

### Stage 3: Processing (Edge Function)

```typescript
import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { event, table, record, old_record } = await req.json();

  switch (table) {
    case "orders":
      if (event === "INSERT") await handleNewOrder(record);
      break;
    case "users":
      if (event === "UPDATE") await handleProfileUpdate(record, old_record);
      break;
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
});
```

### Stage 4: External Service Call

- **Idempotency key** — always include unique key to prevent duplicate processing
- **Timeout** — Edge Functions: 60s default, 150s on Pro plan
- **Error handling** — catch errors, decide: retry, dead-letter, or alert

### Stage 5: Callback (Close the Loop)

```typescript
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
await supabase
  .from("orders")
  .update({ payment_status: "confirmed", processed_at: new Date() })
  .eq("id", record.id);
```

---

## Error Handling Strategies

| Strategy | When | Implementation |
|----------|------|----------------|
| **Retry with backoff** | Transient failures (5xx) | pgmq with delay between attempts |
| **Dead letter queue** | Permanent failures after N retries | pgmq dead-letter topic |
| **Alert** | Critical failures | pg_net → Slack webhook |
| **Compensating action** | Partial pipeline success | Undo previous steps |
| **Ignore** | Non-critical events | Log and continue |

### Retry with pgmq

```sql
SELECT pgmq.send('pipeline_queue',
  jsonb_build_object(
    'event', TG_OP,
    'record', row_to_json(NEW),
    'attempt', 1,
    'max_attempts', 3,
    'idempotency_key', gen_random_uuid()
  )
);
```

---

## Monitoring

```sql
-- pg_net pending requests
SELECT COUNT(*), status FROM net._http_response GROUP BY status;

-- pgmq queue depth
SELECT queue_name, msg_count FROM pgmq.metrics();

-- Alert on queue depth > threshold
SELECT cron.schedule('queue-alert', '*/5 * * * *',
  $$SELECT CASE WHEN (SELECT msg_count FROM pgmq.metrics()
    WHERE queue_name = 'pipeline_queue') > 100
  THEN net.http_post(
    url := 'https://hooks.slack.com/services/XXX',
    body := '{"text":"Queue depth alert!"}'::jsonb
  ) END$$
);
```

---

## Pipeline Templates

| Complexity | Pattern | Example |
|-----------|---------|---------|
| Simple | `INSERT → trigger → pg_net → webhook` | Slack notification |
| Medium | `INSERT → trigger → pgmq → Edge Function → callback` | Payment processing |
| Complex | `INSERT → pgmq → Step1 → Step2 → Step3 → notify` | Application approval workflow |

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Sync HTTP in trigger | Blocks transaction | Use pg_net (async) |
| No idempotency key | Duplicate processing | Include unique key always |
| No error handling | Silent failures | pgmq + dead-letter + alerts |
| High-freq trigger without filter | Performance hit | Add `WHEN` clause to trigger |
| Hardcoded URLs | Can't update without migration | Use `current_setting()` |

---

*Heuristic SC_AU_002 — Squad Supabase v1.0.0*
