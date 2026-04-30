# MW_PO_002 — Query Optimization Pipeline

**Expert:** Markus Winand
**Type:** Heuristic
**Domain:** Query Performance Tuning
**Squad:** squad-supabase

---

## Purpose

A 6-step pipeline for systematically diagnosing and fixing slow SQL queries. Each step has specific red flags to identify and concrete actions to take. Never skip a step.

---

## Pipeline Overview

```
Step 1: EXPLAIN ANALYZE
  → Step 2: Identify Scan Types
    → Step 3: Check Cardinality Estimates
      → Step 4: Find Sorts & Aggregations
        → Step 5: Analyze Joins
          → Step 6: Apply Fix & Verify
```

---

## Step 1: Generate the Execution Plan

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) <your_query>;
```

**Always use ANALYZE** — it executes the query and shows actual vs estimated rows. Without ANALYZE, you are looking at the planner's guess, not reality.

**Red Flags at this step:**
- `execution time` > 100ms for OLTP queries (user-facing)
- `Buffers: shared read` is high relative to `shared hit` (cold cache, excessive I/O)
- Total rows processed is orders of magnitude higher than rows returned

---

## Step 2: Identify Scan Types

Scan the plan for how each table is accessed.

| Scan Type | Meaning | Action |
|-----------|---------|--------|
| `Seq Scan` | Full table read | Needs index if table > 10K rows |
| `Index Scan` | Index lookup + heap fetch | Good. Check if covering index can eliminate heap fetch |
| `Index Only Scan` | Index satisfies query entirely | Optimal. No action needed |
| `Bitmap Index Scan` | Index builds bitmap, then heap | Acceptable for medium selectivity. Check if plain Index Scan is possible |

**Red Flags:**
- `Seq Scan` on any table with > 10K rows in a frequent query
- `Seq Scan` with a `Filter:` line removing > 80% of rows (the database read everything to discard most of it)
- `Bitmap Heap Scan` with `Recheck Cond` and `lossy` blocks (work_mem too low)

---

## Step 3: Check Cardinality Estimates

Compare `rows=` (estimated) vs `actual rows=` for every node.

**Red Flags:**
- Estimate off by > 10x in either direction
- `rows=1` estimated but `actual rows=50000` — the planner chose a nested loop expecting 1 row
- Stale statistics: run `ANALYZE <table>` and re-check
- Correlated columns fooling the planner: consider `CREATE STATISTICS` (extended stats)

**Fix Actions:**
- `ANALYZE <table>` — refresh statistics
- Increase `default_statistics_target` for specific columns with skewed distribution
- `CREATE STATISTICS` for multi-column correlation
- As last resort, use CTEs as optimization fences (PostgreSQL 12+: `MATERIALIZED` hint)

---

## Step 4: Find Sorts and Aggregations

Look for `Sort`, `HashAggregate`, `GroupAggregate`, `Unique` nodes.

**Red Flags:**
- `Sort Method: external merge Disk` — data did not fit in `work_mem`, spilled to disk
- `Sort` on columns that could be served by an index in the correct order
- `HashAggregate` with `Batches: > 1` — hash table spilled to disk

**Fix Actions:**
- Add or adjust index to match ORDER BY columns (eliminate sort entirely)
- Increase `work_mem` for the session if sort is unavoidable: `SET LOCAL work_mem = '256MB'`
- For pagination: replace OFFSET with keyset pagination (seek method)

```sql
-- BAD: OFFSET pagination (scans and discards rows)
SELECT * FROM orders ORDER BY created_at DESC LIMIT 20 OFFSET 10000;

-- GOOD: Keyset pagination (seeks directly)
SELECT * FROM orders
WHERE created_at < $last_seen_created_at
ORDER BY created_at DESC
LIMIT 20;
```

---

## Step 5: Analyze Joins

Look for `Nested Loop`, `Hash Join`, `Merge Join` nodes.

| Join Type | Best When | Problem When |
|-----------|-----------|-------------|
| `Nested Loop` | Inner side returns few rows (< 100) | Inner side returns thousands — O(n*m) |
| `Hash Join` | Both sides medium, no useful index | Hash table exceeds work_mem |
| `Merge Join` | Both sides pre-sorted or large | Requires explicit sort on both inputs |

**Red Flags:**
- `Nested Loop` where inner side shows `actual rows=5000` per loop, `loops=200` — 1M row combinations
- `Hash Join` with `Batches: > 1` — hash table spilled to disk
- Join on columns with no index and high row counts on both sides

**Fix Actions:**
- Add index on the inner table's join column (enables indexed nested loop)
- Ensure join columns have matching types (implicit cast prevents index usage)
- For many-to-many explosions: check if the join condition is correct (missing predicate?)

---

## Step 6: Apply Fix and Verify

**The Golden Rule:** Every fix MUST be validated with a before/after comparison.

### Verification Protocol

```sql
-- 1. Capture BEFORE metrics
EXPLAIN (ANALYZE, BUFFERS) <original_query>;
-- Record: execution_time, rows_processed, buffers_read, buffers_hit

-- 2. Apply fix (index, rewrite, config)
CREATE INDEX CONCURRENTLY idx_... ON ...;

-- 3. Capture AFTER metrics
EXPLAIN (ANALYZE, BUFFERS) <original_query>;
-- Record: execution_time, rows_processed, buffers_read, buffers_hit

-- 4. Compare
-- execution_time decreased?
-- buffers_read decreased?
-- scan type improved (Seq → Index)?
-- rows_processed closer to rows_returned?
```

### Acceptance Criteria

- [ ] Execution time improved by measurable margin
- [ ] Scan type upgraded (Seq Scan eliminated or replaced)
- [ ] Cardinality estimates are within 10x of actual
- [ ] No new sort spills to disk introduced
- [ ] Write performance not degraded beyond acceptable threshold
- [ ] Fix works under load (not just with cold cache / single query)

### Rollback Plan

If the fix does not improve performance or introduces regressions:

```sql
-- Drop the index
DROP INDEX CONCURRENTLY idx_...;
-- Revert query change
-- Revert config change
RESET work_mem;
```

---

> "The execution plan does not lie. If your optimization did not change the plan, it did not change anything."
> — Markus Winand
