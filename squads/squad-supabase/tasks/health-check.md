# Task: Health Check

**Task ID:** health-check
**Version:** 1.0.0
**Executor:** diagnostician (Scout)
**Type:** Hybrid (Agent draft, human review)
**Duration:** 5-10 min
**Output:** health-report.md

---

## Purpose

Executar um scan completo de saúde em um projeto Supabase, avaliando schema, performance, segurança, data quality e automação. Produz um relatório com score e recomendações priorizadas.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| project_ref | string | Yes | Supabase project reference ID |
| project_url | string | No | Supabase dashboard URL |
| connection_string | string | Yes | Direct or pooled connection |
| focus_areas | list | No | Specific areas to focus on (default: all) |

---

## Preconditions

- [ ] Connection to Supabase database established
- [ ] pg_stat_statements extension enabled
- [ ] Read access to information_schema and pg_catalog

---

## Steps

### Step 1: Schema Discovery
```sql
-- Tables and columns
SELECT table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- Foreign keys
SELECT tc.table_name, kcu.column_name, ccu.table_name AS foreign_table
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY';

-- Row counts per table
SELECT schemaname, relname, n_live_tup
FROM pg_stat_user_tables ORDER BY n_live_tup DESC;
```

### Step 2: RLS Coverage Scan
```sql
-- RLS status per table
SELECT tablename, rowsecurity
FROM pg_tables WHERE schemaname = 'public';

-- Policy count per table
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies WHERE schemaname = 'public'
GROUP BY tablename;
```

### Step 3: Index Health
```sql
-- Index usage stats
SELECT relname, indexrelname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes ORDER BY idx_scan ASC;

-- Missing indexes (high seq scans)
SELECT relname, seq_scan, idx_scan, n_live_tup
FROM pg_stat_user_tables
WHERE seq_scan > 50 AND n_live_tup > 1000;
```

### Step 4: Performance Quick Scan
```sql
-- Top slow queries
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC LIMIT 10;

-- Table bloat
SELECT relname, n_dead_tup, last_vacuum, last_autovacuum
FROM pg_stat_user_tables WHERE n_dead_tup > 1000;
```

### Step 5: Data Quality Sample
```sql
-- NULL counts per column (sample)
-- Orphan records check
-- Duplicate detection on unique-candidate columns
```

### Step 6: Extension & Function Inventory
```sql
-- Extensions
SELECT extname, extversion FROM pg_extension;

-- Custom functions
SELECT routine_name, routine_type, data_type
FROM information_schema.routines WHERE routine_schema = 'public';

-- Triggers
SELECT trigger_name, event_object_table, action_timing, event_manipulation
FROM information_schema.triggers WHERE trigger_schema = 'public';
```

### Step 7: Calculate Scores
- Schema Design: 0-10 (naming, types, normalization, constraints)
- Performance: 0-10 (queries, indexes, bloat, connections)
- Security: 0-10 (RLS coverage, policies, roles)
- Data Quality: 0-10 (NULLs, orphans, duplicates, types)
- Automation: 0-10 (cron jobs, triggers, webhooks)
- **Overall: weighted average**

### Step 8: Generate Report
- Use template: health-report-tmpl.md
- Populate findings with severity levels
- Generate prioritized action plan
- Present to user

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| health-report.md | Markdown | Full health report with scores and recommendations |
| findings.json | JSON | Machine-readable findings for agent routing |

---

## Validation

- [ ] All 6 areas scanned
- [ ] Scores calculated for each dimension
- [ ] Findings categorized by severity
- [ ] Action plan prioritized
- [ ] Report generated from template
