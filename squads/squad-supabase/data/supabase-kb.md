# Supabase Knowledge Base

**Squad:** squad-supabase
**Version:** 1.0.0
**Last Updated:** 2026-03-09

---

## 1. Supabase Architecture Overview

Supabase is an open-source Firebase alternative built on PostgreSQL. Core philosophy: **"Postgres as substrate"** — the database is the foundation for all services.

### Service Stack

| Service | Technology | Purpose |
|---------|-----------|---------|
| Database | PostgreSQL 15+ | Core relational database |
| Auth | GoTrue | Authentication & authorization |
| Storage | S3-compatible | File storage with policies |
| Realtime | Elixir/Phoenix | WebSocket subscriptions |
| Edge Functions | Deno | Server-side TypeScript |
| PostgREST | Haskell | Auto-generated REST API |
| pg_graphql | Rust | Auto-generated GraphQL API |
| Supavisor | Elixir | Connection pooling |

### Key Extensions

| Extension | Purpose | Common Use |
|-----------|---------|-----------|
| pg_cron | Job scheduling | Recurring tasks |
| pg_net | Async HTTP | Call APIs from SQL |
| pg_stat_statements | Query stats | Performance monitoring |
| pgvector | Vector embeddings | AI/ML similarity search |
| pgjwt | JWT handling | Custom token operations |
| pg_hashids | ID obfuscation | Public-facing IDs |
| postgis | Geospatial | Location-based queries |
| plv8 | JavaScript in SQL | Complex transformations |

---

## 2. Connection Patterns

### Connection Types

| Type | When to Use | Pool |
|------|------------|------|
| Direct (port 5432) | Migrations, admin tasks | No |
| Supavisor Transaction (port 6543) | Short-lived queries | Yes |
| Supavisor Session (port 5432 via Supavisor) | Long-lived connections, LISTEN/NOTIFY | Yes |
| PostgREST API | Application CRUD via HTTP | N/A |

### Connection String Format
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

---

## 3. RLS Patterns

### Basic Patterns

**User owns row:**
```sql
CREATE POLICY "Users can view own data"
ON table_name FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
```

**Organization access:**
```sql
CREATE POLICY "Org members access"
ON table_name FOR SELECT
TO authenticated
USING (
  org_id IN (
    SELECT org_id FROM org_members
    WHERE user_id = auth.uid()
  )
);
```

**Public read, auth write:**
```sql
-- Read: anyone
CREATE POLICY "Public read" ON table_name
FOR SELECT TO anon, authenticated USING (true);

-- Write: authenticated only
CREATE POLICY "Auth write" ON table_name
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);
```

### Performance-Critical RLS Rules

1. **ALWAYS** index columns used in USING clauses
2. **PREFER** `auth.uid() = column` over subqueries
3. **MARK** helper functions as `LEAKPROOF` when safe
4. **AVOID** non-LEAKPROOF functions — they prevent index usage
5. **MINIMIZE** policy complexity on high-traffic tables

---

## 4. Performance Patterns

### Index Strategy

```sql
-- Single column (most common)
CREATE INDEX idx_table_column ON table_name (column);

-- Composite (respect leading column rule)
CREATE INDEX idx_table_a_b ON table_name (a, b);
-- WHERE a = X AND b = Y → uses index
-- WHERE a = X → uses index
-- WHERE b = Y → does NOT use index (missing leading column)

-- Partial (subset optimization)
CREATE INDEX idx_active_users ON users (email) WHERE active = true;

-- Covering (avoid table lookup)
CREATE INDEX idx_orders_covering ON orders (user_id) INCLUDE (total, status);

-- CONCURRENTLY (no table lock)
CREATE INDEX CONCURRENTLY idx_name ON table (column);
```

### Keyset Pagination

```sql
-- BAD: OFFSET pagination (O(n))
SELECT * FROM posts ORDER BY id LIMIT 20 OFFSET 1000;

-- GOOD: Keyset pagination (O(1))
SELECT * FROM posts WHERE id > $last_seen_id ORDER BY id LIMIT 20;
```

### Monitoring Queries

```sql
-- Top slow queries
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC LIMIT 10;

-- Missing indexes (tables with high seq scans)
SELECT relname, seq_scan, idx_scan, n_live_tup
FROM pg_stat_user_tables
WHERE seq_scan > 100 AND n_live_tup > 10000
ORDER BY seq_scan DESC;

-- Unused indexes
SELECT indexrelname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND indexrelname NOT LIKE 'pg_%';

-- Table bloat
SELECT relname, n_dead_tup, n_live_tup,
  round(n_dead_tup::numeric / NULLIF(n_live_tup, 0) * 100, 2) as dead_pct
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
```

---

## 5. Migration Patterns

### Supabase-to-Supabase Migration

```bash
# Export schema
pg_dump --schema-only --no-owner --no-acl \
  "postgresql://postgres:pass@source:5432/postgres" > schema.sql

# Export data
pg_dump --data-only --no-owner \
  "postgresql://postgres:pass@source:5432/postgres" > data.sql

# Import to destination
psql "postgresql://postgres:pass@dest:5432/postgres" < schema.sql
psql "postgresql://postgres:pass@dest:5432/postgres" < data.sql
```

### Auth Users Migration

```sql
-- Export auth users (must use service_role or direct connection)
COPY (SELECT * FROM auth.users) TO '/tmp/auth_users.csv' WITH CSV HEADER;

-- Import (requires careful handling of password hashes)
-- Use Supabase Admin API or direct SQL with proper schema
```

### Critical Migration Order

1. Types & Enums
2. Tables (no constraints)
3. Data (parent tables first by FK dependency)
4. Constraints (PKs, UNIQUEs, FKs)
5. Functions
6. Triggers
7. RLS Policies
8. Indexes (last — fastest data loading)

---

## 6. Automation Patterns

### pg_cron Examples

```sql
-- Cleanup old data every day at midnight
SELECT cron.schedule('cleanup-old-data', '0 0 * * *',
  $$DELETE FROM logs WHERE created_at < NOW() - INTERVAL '30 days'$$
);

-- Refresh materialized view every hour
SELECT cron.schedule('refresh-stats', '0 * * * *',
  $$REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_stats$$
);

-- Call Edge Function weekly
SELECT cron.schedule('weekly-report', '0 9 * * 1',
  $$SELECT net.http_post(
    url := 'https://project.supabase.co/functions/v1/weekly-report',
    headers := '{"Authorization": "Bearer <service_role_key>"}'::jsonb
  )$$
);
```

### Database Webhook Pattern

```sql
-- Webhook on new order (via pg_net)
CREATE OR REPLACE FUNCTION notify_new_order()
RETURNS trigger AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://your-api.com/webhooks/new-order',
    body := jsonb_build_object('order_id', NEW.id, 'total', NEW.total)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_order
AFTER INSERT ON orders
FOR EACH ROW EXECUTE FUNCTION notify_new_order();
```

---

## 7. Supabase CLI Commands

```bash
# Project management
supabase init                    # Initialize local project
supabase start                   # Start local development
supabase stop                    # Stop local services
supabase db reset                # Reset local database

# Migrations
supabase migration new <name>    # Create new migration
supabase db push                 # Push migrations to remote
supabase db pull                 # Pull remote schema changes
supabase migration list          # List migration status

# Edge Functions
supabase functions new <name>    # Create new function
supabase functions serve         # Serve locally
supabase functions deploy <name> # Deploy to production

# Database
supabase db dump                 # Dump remote database
supabase inspect db <command>    # Database inspection tools
```

---

## 8. Common Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| RLS disabled on public tables | Data exposed to anyone with API key | Enable RLS + add policies |
| OFFSET pagination | O(n) performance degradation | Use keyset pagination |
| VARCHAR for everything | No type safety, waste of checks | Use proper types (INT, BOOLEAN, TIMESTAMPTZ) |
| JSON columns as tables | Can't index, can't FK, can't validate | Normalize into proper tables |
| Missing indexes on FK columns | Slow JOINs, slow cascading deletes | Add indexes on all FK columns |
| service_role in client code | Full database access exposed | Use anon key + RLS |
| No VACUUM monitoring | Table bloat, slow queries | Enable autovacuum monitoring |
| Comma-separated values | 1NF violation, impossible to query | Junction/bridge table |
| TIMESTAMP without TZ | Timezone confusion | Always use TIMESTAMPTZ |
| N+1 queries from ORM | Hundreds of queries instead of one | Use JOINs or batch loading |

---

*Supabase Knowledge Base — Squad Supabase v1.0.0*
