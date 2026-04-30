# MW_PO_001 — Index Decision Framework

**Expert:** Markus Winand
**Type:** Heuristic
**Domain:** Index Design & Selection
**Squad:** squad-supabase

---

## Purpose

A structured decision framework for determining when to create indexes, which columns to include, and how to order composite indexes. Eliminates guesswork from index design.

---

## Decision Tree: Should I Create an Index?

```
1. Is there a query that performs a sequential scan on > 10K rows?
   ├─ NO  → Do not index. Monitor.
   └─ YES → Continue to step 2.

2. Is the query executed frequently (> 10 req/min or critical path)?
   ├─ NO  → Low priority. Document and revisit.
   └─ YES → Continue to step 3.

3. Does the table receive heavy writes (> 50% write ratio)?
   ├─ YES → Evaluate write amplification cost. Proceed with caution.
   └─ NO  → Create the index. Proceed to Column Selection.
```

## Column Selection Rules

### Rule 1: Leading Column = Equality Predicate

The first column of a composite index MUST be the column used in an equality condition (`=`). Range conditions (`>`, `<`, `BETWEEN`, `LIKE 'prefix%'`) go after equality columns.

```
-- Query: WHERE status = 'active' AND created_at > '2024-01-01'
-- Index: (status, created_at)  -- status leads because it uses =
```

### Rule 2: Composite Index Order — EAR Pattern

Order columns by: **Equality → Access (range) → Range/Sort**

1. All columns with `=` conditions (any order among themselves)
2. One range condition column OR the ORDER BY column
3. Additional columns for covering (SELECT list)

```
-- Query: WHERE tenant_id = $1 AND status = $2 AND created_at > $3 ORDER BY created_at
-- Index: (tenant_id, status, created_at)
```

### Rule 3: Partial Indexes for Filtered Subsets

When queries consistently filter on a boolean or status column, use a partial index to reduce index size and maintenance cost.

```sql
-- Only 5% of rows are 'pending'
CREATE INDEX idx_orders_pending ON orders (created_at)
  WHERE status = 'pending';
```

**When to use partial indexes:**
- Subset is < 20% of total rows
- The filter condition appears in most queries targeting that subset
- The excluded rows are rarely queried

### Rule 4: Covering Indexes — Eliminate Table Access

If the SELECT list is small (2-4 columns), include them in the index with INCLUDE to enable index-only scans.

```sql
CREATE INDEX idx_users_email ON users (email)
  INCLUDE (name, avatar_url);
-- Query: SELECT name, avatar_url FROM users WHERE email = $1
-- Result: Index-only scan, zero table access
```

**When to use INCLUDE:**
- The query always selects the same small set of columns
- The included columns are not used in WHERE/ORDER BY
- Table rows are wide (many columns) making heap access expensive

### Rule 5: Do NOT Index These

- Columns with very low cardinality used alone (e.g., boolean `is_active` on 1M rows — only 2 distinct values)
- Columns only used in SELECT but never in WHERE or ORDER BY
- Tables with fewer than 1,000 rows (sequential scan is faster)
- Expressions that change on every query (non-deterministic functions)

## Composite Index Limit

- Maximum recommended columns in a composite index: **4**
- Beyond 4 columns, the index becomes too specialized and too expensive to maintain
- If you need more, reconsider the query pattern or split into multiple indexes

## Validation Checklist

After creating an index, verify:

- [ ] `EXPLAIN ANALYZE` shows the new index is used (Index Scan or Index Only Scan)
- [ ] Actual execution time decreased measurably
- [ ] Write performance (INSERT/UPDATE) did not degrade beyond acceptable limits
- [ ] The index is not a duplicate of an existing index (check `pg_stat_user_indexes`)
- [ ] Unused indexes are identified and dropped (`idx_scan = 0` over 30 days)

## Quick Reference: Index Type Selection

| Scenario | Index Type |
|----------|-----------|
| Equality lookups | B-tree (default) |
| Range queries, sorting | B-tree |
| Full-text search | GIN on tsvector |
| JSONB containment (`@>`) | GIN |
| Array operations (`&&`, `@>`) | GIN |
| Geometric / PostGIS | GiST |
| Low-cardinality boolean filter | Partial B-tree |
| Pattern matching (`LIKE 'abc%'`) | B-tree with text_pattern_ops |

---

> "The best index is the one that makes the database read less. The worst index is the one nobody uses but every write maintains."
> — Markus Winand
