-- ═══════════════════════════════════════════════════════════════
-- SUPABASE HEALTH CHECK SCRIPT
-- Squad: squad-supabase | Agent: diagnostician (Scout)
-- Run against any Supabase project for instant health overview
-- ═══════════════════════════════════════════════════════════════

-- 1. DATABASE SIZE
SELECT pg_size_pretty(pg_database_size(current_database())) AS database_size;

-- 2. TABLE OVERVIEW (rows, size, indexes)
SELECT
  relname AS table_name,
  n_live_tup AS row_count,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
  pg_size_pretty(pg_relation_size(relid)) AS table_size,
  pg_size_pretty(pg_indexes_size(relid)) AS index_size,
  (SELECT COUNT(*) FROM pg_indexes WHERE tablename = relname) AS index_count
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;

-- 3. RLS COVERAGE
SELECT
  t.tablename,
  t.rowsecurity AS rls_enabled,
  COALESCE(p.policy_count, 0) AS policy_count,
  CASE
    WHEN t.rowsecurity = false THEN 'CRITICAL: RLS DISABLED'
    WHEN COALESCE(p.policy_count, 0) = 0 THEN 'WARNING: RLS ON BUT NO POLICIES'
    ELSE 'OK'
  END AS status
FROM pg_tables t
LEFT JOIN (
  SELECT tablename, COUNT(*) AS policy_count
  FROM pg_policies WHERE schemaname = 'public'
  GROUP BY tablename
) p ON t.tablename = p.tablename
WHERE t.schemaname = 'public'
ORDER BY t.rowsecurity ASC, t.tablename;

-- 4. TOP 10 SLOW QUERIES (requires pg_stat_statements)
SELECT
  LEFT(query, 100) AS query_preview,
  calls,
  round(mean_exec_time::numeric, 2) AS avg_ms,
  round(total_exec_time::numeric, 2) AS total_ms,
  rows
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat%'
ORDER BY mean_exec_time DESC
LIMIT 10;

-- 5. MISSING INDEXES (tables with high sequential scans)
SELECT
  relname AS table_name,
  seq_scan,
  idx_scan,
  n_live_tup AS rows,
  round(seq_scan::numeric / NULLIF(seq_scan + idx_scan, 0) * 100, 1) AS seq_scan_pct
FROM pg_stat_user_tables
WHERE n_live_tup > 1000 AND seq_scan > 50
ORDER BY seq_scan_pct DESC NULLS LAST;

-- 6. UNUSED INDEXES
SELECT
  indexrelname AS index_name,
  relname AS table_name,
  idx_scan AS times_used,
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE 'pg_%'
  AND indexrelname NOT LIKE '%_pkey'
ORDER BY pg_relation_size(indexrelid) DESC;

-- 7. TABLE BLOAT (dead tuples)
SELECT
  relname AS table_name,
  n_live_tup AS live_rows,
  n_dead_tup AS dead_rows,
  round(n_dead_tup::numeric / NULLIF(n_live_tup, 0) * 100, 1) AS dead_pct,
  last_vacuum,
  last_autovacuum,
  last_analyze
FROM pg_stat_user_tables
WHERE n_dead_tup > 100
ORDER BY n_dead_tup DESC;

-- 8. EXTENSIONS
SELECT extname, extversion FROM pg_extension ORDER BY extname;

-- 9. CUSTOM FUNCTIONS
SELECT
  routine_name,
  routine_type,
  data_type AS return_type
FROM information_schema.routines
WHERE routine_schema = 'public'
ORDER BY routine_name;

-- 10. TRIGGERS
SELECT
  trigger_name,
  event_object_table AS table_name,
  action_timing || ' ' || event_manipulation AS event,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- 11. ACTIVE CONNECTIONS
SELECT
  state,
  COUNT(*) AS count,
  MAX(NOW() - state_change) AS longest_duration
FROM pg_stat_activity
WHERE datname = current_database()
GROUP BY state;

-- 12. CRON JOBS (if pg_cron enabled)
SELECT jobid, schedule, command, nodename, active
FROM cron.job
ORDER BY jobid;
