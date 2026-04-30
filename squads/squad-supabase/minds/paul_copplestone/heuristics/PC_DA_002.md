# PC_DA_002 — Postgres Substrate Health Check

**Expert:** Paul Copplestone
**Type:** Heuristic
**Domain:** Database Foundation Diagnostics
**Squad:** squad-supabase

---

## Purpose

A foundation-first diagnostic that validates the Postgres substrate before any Supabase service layer is evaluated. The database is the source of truth — if the substrate is compromised, every service built on top inherits the problem.

---

## Principle: Foundation First

```
Before asking "why is Auth slow?" → ask "is Postgres healthy?"
Before asking "why is Realtime lagging?" → ask "is the WAL clean?"
Before asking "why are API responses wrong?" → ask "is the schema correct?"
```

---

## 6 Substrate Dimensions

### 1. Schema Integrity

**The schema is the contract between the database and every service.**

| Check | Query | Expected | Problem |
|-------|-------|----------|---------|
| Foreign key validity | `SELECT conname FROM pg_constraint WHERE contype = 'f'` | All FKs reference valid tables/columns | Orphaned constraints after manual DDL |
| Enum consistency | `SELECT typname FROM pg_type WHERE typtype = 'e'` | Enums match application code | Stale enum values causing insert failures |
| Naming conventions | Inspect table/column names | Consistent snake_case | Mixed conventions breaking PostgREST auto-API |
| Schema ownership | `SELECT schemaname, tableowner FROM pg_tables` | `postgres` or `supabase_admin` owns tables | Application role owning tables (permission issues) |
| Constraint coverage | Check NOT NULL, CHECK constraints | Critical columns protected | Missing constraints allowing bad data |

**Action if unhealthy:** Fix schema issues via migration before debugging any service layer.

### 2. Extensions Audit

**Postgres extensions are the Supabase ecosystem. Missing extensions cause silent failures.**

| Extension | Purpose | Required When |
|-----------|---------|---------------|
| `pgcrypto` | UUID generation, encryption | Always (default) |
| `pgjwt` | JWT verification in SQL | Custom RLS with JWT claims |
| `pg_graphql` | GraphQL API | Using GraphQL endpoint |
| `pgvector` | Vector embeddings | AI/ML features, semantic search |
| `pg_net` | HTTP requests from SQL | Webhooks, external API calls from triggers |
| `pg_cron` | Scheduled jobs | Recurring database tasks |
| `pgsodium` | Encryption at rest | Column-level encryption (Vault) |
| `pg_stat_statements` | Query performance tracking | Always (monitoring) |

```sql
-- List installed extensions
SELECT extname, extversion FROM pg_extension ORDER BY extname;

-- Check if a specific extension is available but not installed
SELECT * FROM pg_available_extensions WHERE name = 'pgvector';
```

**Action if unhealthy:** Install missing extensions via migration: `CREATE EXTENSION IF NOT EXISTS pgvector;`

### 3. Connection Health

**Connection exhaustion is the number one silent killer in Supabase projects.**

```sql
-- Current connections by state
SELECT state, count(*)
FROM pg_stat_activity
GROUP BY state;

-- Connections by application
SELECT application_name, count(*)
FROM pg_stat_activity
GROUP BY application_name
ORDER BY count DESC;

-- Max connections setting
SHOW max_connections;
```

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Active connections | < 60% of max | 60-85% of max | > 85% of max |
| Idle connections | < 20 | 20-50 | > 50 idle connections |
| Idle in transaction | 0 | 1-3 | > 3 (transaction leak) |

**Common Supabase-specific issues:**
- Application connecting on port 5432 (direct) instead of 6543 (pooler)
- Edge Functions opening new connections per invocation without pooling
- Realtime holding persistent connections that count against the limit

**Action if unhealthy:** Switch to Supavisor (port 6543), identify and fix connection-leaking code.

### 4. RLS Coverage

**Row Level Security is the authorization layer. Tables without RLS are public to any authenticated API caller.**

```sql
-- Tables WITHOUT RLS enabled (DANGER)
SELECT schemaname, tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND NOT rowsecurity;

-- Tables WITH RLS enabled but NO policies (locked out)
SELECT t.tablename
FROM pg_tables t
LEFT JOIN pg_policies p ON t.tablename = p.tablename AND t.schemaname = p.schemaname
WHERE t.schemaname = 'public'
  AND t.rowsecurity = true
GROUP BY t.tablename
HAVING count(p.policyname) = 0;
```

| State | Risk Level | Action |
|-------|-----------|--------|
| RLS disabled, no policies | CRITICAL | Enable RLS + add policies immediately |
| RLS enabled, no policies | HIGH | Table is locked — no access via API. Add policies |
| RLS enabled, policies exist | Check | Verify policies match authorization requirements |
| RLS disabled, internal table only | Acceptable | Only if table is never exposed via PostgREST |

**Action if unhealthy:** Enable RLS on all public tables. Add policies. Test with `SET ROLE authenticated`.

### 5. Vacuum & Bloat

**Autovacuum keeps the database healthy. If it falls behind, queries slow down and storage grows.**

```sql
-- Tables with high dead tuple ratio
SELECT relname,
       n_live_tup,
       n_dead_tup,
       ROUND(n_dead_tup::numeric / NULLIF(n_live_tup + n_dead_tup, 0) * 100, 2) AS dead_pct,
       last_autovacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY dead_pct DESC;
```

| Dead Tuple % | Status | Action |
|-------------|--------|--------|
| < 5% | Healthy | Autovacuum working correctly |
| 5-20% | Warning | Check autovacuum settings, may need tuning |
| > 20% | Critical | Manual VACUUM ANALYZE, tune autovacuum thresholds |

**Action if unhealthy:** Run `VACUUM ANALYZE <table>` and adjust `autovacuum_vacuum_threshold` for high-churn tables.

### 6. Migration State

**Every schema change must be a tracked migration. Manual DDL in production creates drift.**

```bash
# Check migration status
supabase migration list

# Check for drift between local and remote
supabase db diff
```

| State | Status | Action |
|-------|--------|--------|
| All migrations applied, no drift | Healthy | No action |
| Pending migrations | Warning | Apply via `supabase db push` |
| Drift detected (remote has changes not in migrations) | Critical | Capture drift: `supabase db diff > fix.sql`, create migration |
| No migrations at all (manual DDL only) | Critical | Bootstrap: `supabase db dump`, create initial migration |

**Action if unhealthy:** Capture current state, create baseline migration, enforce migration discipline going forward.

---

## Substrate Health Score

| Dimension | Weight | Score (0-2) |
|-----------|--------|-------------|
| Schema Integrity | 20% | 0=broken, 1=inconsistent, 2=solid |
| Extensions | 10% | 0=missing critical, 1=partial, 2=complete |
| Connection Health | 25% | 0=exhausted, 1=warning, 2=healthy |
| RLS Coverage | 25% | 0=tables exposed, 1=partial, 2=full |
| Vacuum & Bloat | 10% | 0=critical bloat, 1=warning, 2=clean |
| Migration State | 10% | 0=no migrations, 1=drift, 2=clean |

**Weighted score < 1.0** = STOP. Fix the substrate before touching any Supabase service.
**Weighted score 1.0-1.5** = PROCEED WITH CAUTION. Address warnings in parallel.
**Weighted score > 1.5** = SUBSTRATE HEALTHY. Safe to diagnose upper layers.

---

> "Postgres is the substrate. If the foundation is cracked, painting the walls will not save the building."
> — Paul Copplestone philosophy
