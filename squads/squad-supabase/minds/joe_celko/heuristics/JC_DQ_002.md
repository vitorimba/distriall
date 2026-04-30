# JC_DQ_002 — Set-Based Thinking Model

**Expert:** Joe Celko
**Domain:** SQL Query Design & Relational Theory
**Type:** Heuristic — Set-Based Decision Tree
**Severity:** MUST for all SQL development

---

## Purpose

SQL is a declarative, set-based language. The optimizer works with sets, not rows. Every time you write a cursor, a loop, or row-by-row processing, you are fighting the engine that was designed to help you. This heuristic provides a decision tree for choosing the correct set-based technique for any data operation.

---

## Why Sets Beat Procedures

| Aspect | Procedural (Cursors/Loops) | Set-Based (SQL) |
|--------|---------------------------|-----------------|
| Optimization | None — row-by-row, fixed plan | Full optimizer participation |
| Parallelism | Sequential by definition | Optimizer can parallelize |
| Lock duration | Holds locks across iterations | Minimal lock window |
| Code volume | 20-50 lines for simple operations | 3-10 lines for the same result |
| Maintenance | Imperative logic obscures intent | Declarative logic documents intent |
| Correctness | Must handle edge cases manually | Set algebra handles them inherently |

**The rule:** If your SQL contains `LOOP`, `WHILE`, `CURSOR`, `FETCH`, or application-side iteration over query results for transformation — refactor to a set operation.

---

## The Set-Based Toolkit

### 1. Common Table Expressions (CTEs)

**Use when:** You need to decompose a complex query into named, readable steps.

```sql
WITH active_users AS (
  SELECT id, email, created_at
  FROM public.users
  WHERE status = 'active'
),
recent_orders AS (
  SELECT user_id, count(*) AS order_count, max(created_at) AS last_order
  FROM public.orders
  WHERE created_at > now() - interval '30 days'
  GROUP BY user_id
)
SELECT au.email, COALESCE(ro.order_count, 0) AS recent_orders
FROM active_users au
LEFT JOIN recent_orders ro ON au.id = ro.user_id;
```

**Decision:** Prefer CTEs over subqueries when the same derived table is referenced multiple times or when readability demands named steps. PostgreSQL 12+ inlines CTEs when beneficial — no performance penalty.

### 2. Window Functions

**Use when:** You need calculations across related rows without collapsing the result set.

```sql
-- Rank, running totals, moving averages, gaps-and-islands
SELECT
  user_id,
  created_at,
  amount,
  sum(amount) OVER (PARTITION BY user_id ORDER BY created_at) AS running_total,
  row_number() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS recency_rank,
  amount - lag(amount) OVER (PARTITION BY user_id ORDER BY created_at) AS delta_from_previous
FROM public.orders;
```

**Key functions:** `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`, `LEAD()`, `SUM() OVER`, `AVG() OVER`, `FIRST_VALUE()`, `LAST_VALUE()`, `NTH_VALUE()`, `NTILE()`

**Decision:** If you need "the previous row" or "running total" or "rank within group" — window function, never a self-join or cursor.

### 3. LATERAL Joins

**Use when:** You need a correlated subquery in the FROM clause — essentially "for each row, compute this set."

```sql
-- Top 3 orders per user (set-based, no cursor)
SELECT u.id, u.email, recent.*
FROM public.users u
CROSS JOIN LATERAL (
  SELECT o.id AS order_id, o.amount, o.created_at
  FROM public.orders o
  WHERE o.user_id = u.id
  ORDER BY o.created_at DESC
  LIMIT 3
) recent;
```

**Decision:** When you need "top-N per group" or "dependent subquery that returns multiple rows" — LATERAL replaces cursors and application loops.

### 4. GROUPING SETS / ROLLUP / CUBE

**Use when:** You need multiple levels of aggregation in a single pass.

```sql
-- Sales by region, by product, and grand total — one query
SELECT
  COALESCE(region, '(All Regions)') AS region,
  COALESCE(product, '(All Products)') AS product,
  sum(amount) AS total_sales,
  count(*) AS transaction_count
FROM public.sales
GROUP BY GROUPING SETS (
  (region, product),  -- detail
  (region),           -- subtotal by region
  (product),          -- subtotal by product
  ()                  -- grand total
);
```

**Decision:** If you are running multiple `GROUP BY` queries and `UNION ALL`-ing them — replace with `GROUPING SETS`.

### 5. Recursive CTEs

**Use when:** You need to traverse hierarchical or graph data stored in adjacency list format.

```sql
-- Org chart traversal (adjacency list)
WITH RECURSIVE org_tree AS (
  SELECT id, name, manager_id, 1 AS depth
  FROM public.employees
  WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, ot.depth + 1
  FROM public.employees e
  JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT * FROM org_tree ORDER BY depth, name;
```

**Decision:** For tree/graph traversal, recursive CTE replaces application-side BFS/DFS loops. Add `LIMIT` or depth guard to prevent infinite recursion on cycles.

---

## Decision Tree

```
Need to transform data?
├── One row depends on another row?
│   ├── Previous/next row → Window Function (LAG/LEAD)
│   ├── Running aggregate → Window Function (SUM/AVG OVER)
│   ├── Rank within group → Window Function (ROW_NUMBER/RANK)
│   └── Top-N per group → LATERAL Join
├── Multiple aggregation levels?
│   └── GROUPING SETS / ROLLUP / CUBE
├── Hierarchical traversal?
│   └── Recursive CTE
├── Complex multi-step logic?
│   └── CTE chain (WITH ... AS)
├── Conditional insert/update?
│   └── MERGE or INSERT ... ON CONFLICT
└── Row-by-row processing temptation?
    └── STOP. Reformulate as a set operation.
```

---

## Common Refactoring Patterns

| Procedural Pattern | Set-Based Replacement |
|---|---|
| Loop updating rows one by one | `UPDATE ... FROM` with JOIN |
| Cursor to compute running total | `SUM() OVER (ORDER BY ...)` |
| Application loop for top-N per group | `LATERAL` + `LIMIT` |
| Multiple queries with UNION ALL | `GROUPING SETS` |
| Recursive application traversal | `WITH RECURSIVE` |
| Temp table + loop to deduplicate | `DISTINCT ON` or `ROW_NUMBER()` partition |

---

## Key Principle

> "If you are thinking about the order of rows, you are thinking procedurally. Think about the set of rows that satisfies your predicate — that is SQL."
> — Joe Celko
