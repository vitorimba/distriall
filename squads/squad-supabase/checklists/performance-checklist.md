# Performance Checklist

**Checklist ID:** performance
**Version:** 1.0.0
**Gate:** QG-005 (Output Validation)
**Agent:** optimizer (Turbo)
**Blocking:** No — advisory, but high-severity items should be addressed

---

## Indexing

- [ ] All foreign key columns have indexes
- [ ] Columns in WHERE clauses of frequent queries are indexed
- [ ] Composite indexes follow leading column rule (most selective first)
- [ ] No duplicate indexes (same columns, same order)
- [ ] No unused indexes (idx_scan = 0 for extended period)
- [ ] Partial indexes used where appropriate (e.g., WHERE active = true)
- [ ] Covering indexes for critical queries (avoid table lookup)
- [ ] Index size reasonable (< 50% of table size as rule of thumb)

## Query Performance

- [ ] No sequential scans on tables with > 10k rows
- [ ] All critical queries have EXPLAIN ANALYZE baseline
- [ ] No N+1 query patterns from application
- [ ] Pagination uses keyset method (not OFFSET) for deep pages
- [ ] CTEs used for readability, not as optimization barriers
- [ ] Window functions preferred over correlated subqueries
- [ ] Proper JOIN types used (not all LEFT JOINs)
- [ ] LIMIT used with ORDER BY for top-N queries

## Table Maintenance

- [ ] Autovacuum enabled and properly configured
- [ ] No tables with excessive dead tuples (> 20% of total)
- [ ] Table statistics up to date (recent ANALYZE)
- [ ] No significant table bloat
- [ ] Partitioning considered for tables > 10M rows

## Connection Management

- [ ] Connection pooling via Supavisor configured
- [ ] Pool size appropriate for workload
- [ ] No connection leaks from application
- [ ] Prepared statements used for repeated queries
- [ ] Transaction duration monitored (no long-running transactions)

## RLS Performance

- [ ] All functions in RLS policies are LEAKPROOF (or justified)
- [ ] RLS policy columns are indexed
- [ ] No subqueries in hot-path policies
- [ ] Policy complexity is minimal (simple equality checks preferred)
- [ ] auth.uid() caching per-request (not per-row)

## Supabase-Specific

- [ ] PostgREST filters use indexed columns
- [ ] Realtime subscriptions limited to necessary tables
- [ ] Edge Functions cold start optimized
- [ ] Storage access uses CDN when possible
- [ ] pg_stat_statements enabled for monitoring

---

## Scoring

| Category | Items | Weight |
|----------|-------|--------|
| Indexing | 8 | 0.30 |
| Query Performance | 8 | 0.25 |
| Table Maintenance | 5 | 0.15 |
| Connection Management | 5 | 0.10 |
| RLS Performance | 5 | 0.10 |
| Supabase-Specific | 5 | 0.10 |
| **Total** | **36** | **1.00** |

**Score calculation:** (checked items / total items per category) × weight × 10
