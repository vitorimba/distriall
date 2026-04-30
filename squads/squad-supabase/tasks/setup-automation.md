# Task: Setup Automation

**Task ID:** setup-automation
**Version:** 1.0.0
**Executor:** automator (Cron)
**Type:** Hybrid
**Duration:** 10-20 min
**Output:** automation setup scripts

---

## Purpose

Configurar automação no Supabase — pg_cron jobs, triggers, database webhooks, Edge Functions scheduling. Transforma processos manuais em pipelines automatizados.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| connection_string | string | Yes | Database connection |
| automation_type | enum | Yes | cron, trigger, webhook, edge_function, pipeline |
| description | string | Yes | What to automate |
| schedule | string | No | Cron expression (for cron type) |
| target_table | string | No | Table for trigger/webhook |
| target_event | string | No | INSERT, UPDATE, DELETE |

---

## Steps

### Step 1: Understand Automation Need
- Elicit: What manual process to automate?
- Classify: time-based, event-based, or pipeline
- Recommend: best approach from decision tree

### Step 2: Design Automation

**Decision Tree:**
```
Time-based recurring? → pg_cron
Data change triggered? → Database trigger + pg_net OR Webhook
Complex logic needed? → Edge Function
Large batch job? → Queue (pgmq) + Edge Function worker
External API integration? → Edge Function + pg_cron
```

### Step 3: Implement

**pg_cron:**
```sql
SELECT cron.schedule(
  'job-name',
  'cron-expression',
  $$SQL statement$$
);
```

**Trigger:**
```sql
CREATE OR REPLACE FUNCTION trigger_function()
RETURNS trigger AS $$
BEGIN
  -- Logic here
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_name
AFTER INSERT ON table_name
FOR EACH ROW EXECUTE FUNCTION trigger_function();
```

**Webhook (pg_net):**
```sql
CREATE OR REPLACE FUNCTION webhook_function()
RETURNS trigger AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://endpoint',
    body := row_to_json(NEW)::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Step 4: Test
- Verify automation fires correctly
- Check error handling
- Confirm no performance impact
- Validate security (no secret exposure)

### Step 5: Monitor
- Set up logging for automation
- Document schedule and expected behavior
- Create alert for failures

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| automation-script.sql | SQL | Ready-to-execute setup script |
| monitoring-query.sql | SQL | Query to check automation status |
| documentation.md | Markdown | Automation description and schedule |

---

## Validation

- [ ] Automation type correctly chosen
- [ ] Script tested on staging
- [ ] Error handling included
- [ ] No security vulnerabilities
- [ ] Monitoring configured
- [ ] Documentation complete
