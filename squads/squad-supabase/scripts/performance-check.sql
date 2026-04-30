-- ═══════════════════════════════════════════════════════════════
-- PERFORMANCE CHECK SCRIPT
-- Squad: squad-supabase | Agent: optimizer (Turbo)
-- Quick performance scan for any Supabase project
-- ═══════════════════════════════════════════════════════════════

-- 1. TOP 20 SLOWEST QUERIES
SELECT
  queryid,
  LEFT(query, 150) AS query_preview,
  calls,
  round(mean_exec_time::numeric, 2) AS avg_ms,
  round(max_exec_time::numeric, 2) AS max_ms,
  round(total_exec_time::numeric, 2) AS total_ms,
  rows AS avg_rows,
  shared_blks_hit + shared_blks_read AS total_blocks,
  CASE WHEN shared_blks_hit + shared_blks_read > 0
    THEN round(shared_blks_hit::numeric / (shared_blks_hit + shared_blks_read) * 100, 1)
    ELSE 100
  END AS cache_hit_pct
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat%'
  AND query NOT LIKE 'BEGIN%'
  AND query NOT LIKE 'COMMIT%'
ORDER BY mean_exec_time DESC
LIMIT 20;

-- 2. INDEX USAGE STATS
SELECT
  relname AS table_name,
  seq_scan,
  idx_scan,
  n_live_tup AS rows,
  CASE WHEN seq_scan + idx_scan > 0
    THEN round(idx_scan::numeric / (seq_scan + idx_scan) * 100, 1)
    ELSE 0
  END AS idx_usage_pct,
  CASE
    WHEN n_live_tup > 10000 AND seq_scan > idx_scan THEN 'NEEDS INDEX'
    WHEN n_live_tup > 1000 AND seq_scan > idx_scan * 10 THEN 'CONSIDER INDEX'
    ELSE 'OK'
  END AS recommendation
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY seq_scan DESC;

-- 3. UNUSED INDEXES (waste space, slow writes)
SELECT
  indexrelname AS index_name,
  relname AS table_name,
  idx_scan AS times_used,
  pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE '%_pkey'
  AND indexrelname NOT LIKE 'pg_%'
ORDER BY pg_relation_size(indexrelid) DESC;

-- 4. DUPLICATE INDEXES
SELECT
  array_agg(indexname) AS duplicate_indexes,
  tablename,
  array_agg(pg_size_pretty(pg_relation_size(indexname::regclass))) AS sizes
FROM pg_indexes
WHERE schemaname = 'public'
GROUP BY tablename, replace(indexdef, indexname, '')
HAVING COUNT(*) > 1;

-- 5. TABLE BLOAT
SELECT
  relname AS table_name,
  n_live_tup AS live_rows,
  n_dead_tup AS dead_rows,
  CASE WHEN n_live_tup > 0
    THEN round(n_dead_tup::numeric / n_live_tup * 100, 1)
    ELSE 0
  END AS dead_pct,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
  last_vacuum,
  last_autovacuum,
  CASE
    WHEN n_dead_tup > n_live_tup * 0.2 THEN 'VACUUM NEEDED'
    WHEN last_autovacuum IS NULL AND n_live_tup > 1000 THEN 'NEVER VACUUMED'
    ELSE 'OK'
  END AS status
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_dead_tup DESC;

-- 6. CONNECTION POOL STATUS
SELECT
  state,
  COUNT(*) AS connections,
  MAX(NOW() - state_change) AS longest_wait,
  AVG(NOW() - state_change) AS avg_wait
FROM pg_stat_activity
WHERE datname = current_database()
GROUP BY state
ORDER BY count DESC;

-- 7. LONG RUNNING QUERIES (> 1 minute)
SELECT
  pid,
  NOW() - query_start AS duration,
  state,
  LEFT(query, 200) AS query_preview
FROM pg_stat_activity
WHERE state != 'idle'
  AND query_start < NOW() - INTERVAL '1 minute'
  AND datname = current_database()
ORDER BY duration DESC;

-- 8. CACHE HIT RATIO (should be > 99%)
SELECT
  sum(heap_blks_read) AS heap_read,
  sum(heap_blks_hit) AS heap_hit,
  CASE WHEN sum(heap_blks_hit) + sum(heap_blks_read) > 0
    THEN round(sum(heap_blks_hit)::numeric / (sum(heap_blks_hit) + sum(heap_blks_read)) * 100, 2)
    ELSE 100
  END AS cache_hit_ratio
FROM pg_statio_user_tables;

-- 9. INDEX CACHE HIT RATIO
SELECT
  sum(idx_blks_read) AS idx_read,
  sum(idx_blks_hit) AS idx_hit,
  CASE WHEN sum(idx_blks_hit) + sum(idx_blks_read) > 0
    THEN round(sum(idx_blks_hit)::numeric / (sum(idx_blks_hit) + sum(idx_blks_read)) * 100, 2)
    ELSE 100
  END AS idx_cache_hit_ratio
FROM pg_statio_user_indexes;

-- 10. FK COLUMNS WITHOUT INDEXES
SELECT
  tc.table_name,
  kcu.column_name AS fk_column,
  ccu.table_name AS references_table,
  CASE WHEN i.indexname IS NOT NULL THEN 'INDEXED' ELSE 'MISSING INDEX' END AS index_status
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
LEFT JOIN pg_indexes i ON i.tablename = tc.table_name
  AND i.indexdef LIKE '%' || kcu.column_name || '%'
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
ORDER BY index_status DESC, tc.table_name;
