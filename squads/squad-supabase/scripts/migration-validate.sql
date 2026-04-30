-- ═══════════════════════════════════════════════════════════════
-- MIGRATION VALIDATION SCRIPT
-- Squad: squad-supabase | Agent: migrator (Voyager)
-- Run on BOTH source and destination, compare results
-- ═══════════════════════════════════════════════════════════════

-- 1. ROW COUNTS PER TABLE
SELECT
  schemaname,
  relname AS table_name,
  n_live_tup AS row_count
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY relname;

-- 2. TABLE STRUCTURE COMPARISON
SELECT
  table_name,
  column_name,
  data_type,
  udt_name,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- 3. CONSTRAINT COMPARISON
SELECT
  tc.table_name,
  tc.constraint_name,
  tc.constraint_type,
  string_agg(kcu.column_name, ', ' ORDER BY kcu.ordinal_position) AS columns
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public'
GROUP BY tc.table_name, tc.constraint_name, tc.constraint_type
ORDER BY tc.table_name, tc.constraint_type;

-- 4. FOREIGN KEY INTEGRITY CHECK
-- Returns orphaned records (should be 0 after successful migration)
DO $$
DECLARE
  r RECORD;
  cnt INTEGER;
BEGIN
  FOR r IN
    SELECT
      tc.table_name AS child_table,
      kcu.column_name AS child_column,
      ccu.table_name AS parent_table,
      ccu.column_name AS parent_column
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
  LOOP
    EXECUTE format(
      'SELECT COUNT(*) FROM %I c LEFT JOIN %I p ON c.%I = p.%I WHERE p.%I IS NULL AND c.%I IS NOT NULL',
      r.child_table, r.parent_table, r.child_column, r.parent_column, r.parent_column, r.child_column
    ) INTO cnt;
    IF cnt > 0 THEN
      RAISE NOTICE 'ORPHAN: %.% → %.%: % orphaned rows',
        r.child_table, r.child_column, r.parent_table, r.parent_column, cnt;
    END IF;
  END LOOP;
END $$;

-- 5. RLS STATUS
SELECT
  tablename,
  rowsecurity AS rls_enabled,
  (SELECT COUNT(*) FROM pg_policies p WHERE p.tablename = t.tablename AND p.schemaname = 'public') AS policy_count
FROM pg_tables t
WHERE t.schemaname = 'public'
ORDER BY tablename;

-- 6. FUNCTION COUNT
SELECT COUNT(*) AS function_count
FROM information_schema.routines
WHERE routine_schema = 'public';

-- 7. TRIGGER COUNT
SELECT COUNT(*) AS trigger_count
FROM information_schema.triggers
WHERE trigger_schema = 'public';

-- 8. INDEX COUNT
SELECT COUNT(*) AS index_count
FROM pg_indexes
WHERE schemaname = 'public';

-- 9. EXTENSION LIST
SELECT extname, extversion
FROM pg_extension
ORDER BY extname;

-- 10. SEQUENCE SYNC CHECK
-- After data import, sequences must match max(id)
SELECT
  sequencename,
  last_value,
  (SELECT MAX(id) FROM information_schema.columns WHERE column_default LIKE '%' || sequencename || '%') AS should_be
FROM pg_sequences
WHERE schemaname = 'public';

-- 11. AUTH USERS COUNT
SELECT COUNT(*) AS auth_user_count FROM auth.users;

-- 12. STORAGE BUCKETS
SELECT id, name, public, created_at FROM storage.buckets ORDER BY name;
