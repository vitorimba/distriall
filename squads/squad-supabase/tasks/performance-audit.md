# Task: Performance Audit

**Task ID:** performance-audit
**Version:** 1.0.0
**Executor:** optimizer (Turbo)
**Type:** Hybrid (Agent analysis, human approval for changes)
**Duration:** 10-20 min
**Output:** optimization-report.md

---

## Purpose

Análise profunda de performance de um projeto Supabase — identifica queries lentas, indexes faltantes, table bloat, problemas de RLS performance, e gera plano de otimização com estimativas de melhoria.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| connection_string | string | Yes | Database connection |
| target_tables | list | No | Specific tables (default: all) |
| target_queries | list | No | Specific queries to analyze |
| baseline_metrics | object | No | Previous metrics for comparison |

---

## Preconditions

- [ ] pg_stat_statements enabled
- [ ] Connection established
- [ ] Health check completed (recommended, not required)

---

## Steps

### Step 1: Collect Baseline Metrics
```sql
-- Database size
SELECT pg_size_pretty(pg_database_size(current_database()));

-- Table sizes
SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) as total_size,
       pg_size_pretty(pg_relation_size(relid)) as table_size,
       pg_size_pretty(pg_indexes_size(relid)) as index_size
FROM pg_stat_user_tables ORDER BY pg_total_relation_size(relid) DESC;

-- Connection stats
SELECT count(*), state FROM pg_stat_activity GROUP BY state;
```

### Step 2: Slow Query Analysis
```sql
-- Top 20 by mean time
SELECT queryid, query, calls, mean_exec_time, stddev_exec_time,
       total_exec_time, rows, shared_blks_hit, shared_blks_read
FROM pg_stat_statements
WHERE mean_exec_time > 100
ORDER BY mean_exec_time DESC LIMIT 20;
```

For each slow query:
- Run `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)`
- Identify scan types (Seq Scan = red flag on large tables)
- Check estimated vs actual rows
- Look for Sort operations without index
- Identify Nested Loops on large datasets

### Step 3: Index Deep Audit
```sql
-- Missing indexes
SELECT relname, seq_scan, seq_tup_read, idx_scan, n_live_tup,
       round((seq_scan::numeric / NULLIF(seq_scan + idx_scan, 0)) * 100, 2) as seq_pct
FROM pg_stat_user_tables
WHERE n_live_tup > 1000
ORDER BY seq_pct DESC NULLS LAST;

-- Unused indexes (candidates for removal)
SELECT indexrelname, relname, idx_scan, pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND indexrelname NOT LIKE 'pg_%'
ORDER BY pg_relation_size(indexrelid) DESC;

-- Duplicate indexes
SELECT array_agg(indexname) as index_names, tablename, indexdef
FROM pg_indexes WHERE schemaname = 'public'
GROUP BY tablename, indexdef HAVING count(*) > 1;
```

### Step 4: RLS Performance Check
- Identify non-LEAKPROOF functions in policies
- Check for subqueries in high-traffic table policies
- Verify indexes exist on columns used in USING clauses
- Measure policy overhead with `SET row_security = off` comparison

### Step 5: Table Maintenance Status
```sql
-- VACUUM and ANALYZE status
SELECT relname, n_live_tup, n_dead_tup,
       round(n_dead_tup::numeric / NULLIF(n_live_tup, 0) * 100, 2) as dead_pct,
       last_vacuum, last_autovacuum, last_analyze, last_autoanalyze
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
```

### Step 6: Generate Optimization Plan
For each finding:
- Severity: critical | high | medium | low
- Fix SQL: ready-to-execute
- Estimated improvement: percentage
- Risk assessment: safe | needs_testing | potentially_breaking
- Execution order: prioritized

### Step 7: Generate Report
- Use template: optimization-report-tmpl.md
- Include before/after EXPLAIN for each optimization
- Calculate total estimated improvement

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| optimization-report.md | Markdown | Full report with before/after evidence |
| optimization-plan.json | JSON | Machine-readable plan for execution |
| sql-scripts/ | SQL files | Ready-to-execute optimization scripts |

---

## Validation

- [ ] All slow queries analyzed with EXPLAIN
- [ ] Index audit complete (missing, unused, duplicate)
- [ ] RLS performance impact assessed
- [ ] Table maintenance status checked
- [ ] Optimization plan prioritized
- [ ] Report includes before/after evidence
