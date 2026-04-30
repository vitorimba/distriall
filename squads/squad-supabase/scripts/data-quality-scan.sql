-- ═══════════════════════════════════════════════════════════════
-- DATA QUALITY SCAN SCRIPT
-- Squad: squad-supabase | Agent: analyst (Sage)
-- Run against any Supabase project for data quality overview
-- ═══════════════════════════════════════════════════════════════

-- 1. NULL ANALYSIS (per table, per column)
-- Generates dynamic SQL for each table
DO $$
DECLARE
  tbl RECORD;
  col RECORD;
  total_count BIGINT;
  null_count BIGINT;
  null_pct NUMERIC;
BEGIN
  RAISE NOTICE '═══ NULL ANALYSIS ═══';
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename
  LOOP
    EXECUTE format('SELECT COUNT(*) FROM %I', tbl.tablename) INTO total_count;
    IF total_count > 0 THEN
      FOR col IN
        SELECT column_name FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = tbl.tablename
        ORDER BY ordinal_position
      LOOP
        EXECUTE format(
          'SELECT COUNT(*) FROM %I WHERE %I IS NULL',
          tbl.tablename, col.column_name
        ) INTO null_count;
        IF null_count > 0 THEN
          null_pct := round(null_count::numeric / total_count * 100, 2);
          RAISE NOTICE '  %.%: %/% NULLs (%\%%)',
            tbl.tablename, col.column_name, null_count, total_count, null_pct;
        END IF;
      END LOOP;
    END IF;
  END LOOP;
END $$;

-- 2. DUPLICATE DETECTION (on primary key and unique candidates)
DO $$
DECLARE
  tbl RECORD;
  dup_count BIGINT;
BEGIN
  RAISE NOTICE '═══ DUPLICATE CHECK ═══';
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    -- Check for duplicate rows (all columns)
    EXECUTE format(
      'SELECT COUNT(*) - COUNT(DISTINCT ROW(%I.*)) FROM %I',
      tbl.tablename, tbl.tablename
    ) INTO dup_count;
    IF dup_count > 0 THEN
      RAISE NOTICE '  %: % potential duplicate rows', tbl.tablename, dup_count;
    END IF;
  END LOOP;
END $$;

-- 3. ORPHAN RECORDS (broken foreign keys)
DO $$
DECLARE
  r RECORD;
  cnt INTEGER;
BEGIN
  RAISE NOTICE '═══ ORPHAN RECORDS ═══';
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
      RAISE NOTICE '  %.% → %.%: % orphans',
        r.child_table, r.child_column, r.parent_table, r.parent_column, cnt;
    END IF;
  END LOOP;
END $$;

-- 4. DATA TYPE AUDIT (common mismatches)
SELECT
  table_name,
  column_name,
  data_type,
  udt_name,
  CASE
    WHEN column_name LIKE '%_at' AND data_type != 'timestamp with time zone'
      THEN 'Should be TIMESTAMPTZ'
    WHEN column_name LIKE '%_id' AND data_type = 'character varying'
      THEN 'Consider UUID or INTEGER'
    WHEN (column_name LIKE '%price%' OR column_name LIKE '%amount%' OR column_name LIKE '%cost%')
      AND data_type IN ('real', 'double precision')
      THEN 'Use NUMERIC for money'
    WHEN data_type = 'character varying' AND character_maximum_length IS NULL
      THEN 'VARCHAR without limit — consider TEXT or specific type'
    ELSE NULL
  END AS recommendation
FROM information_schema.columns
WHERE table_schema = 'public'
  AND (
    (column_name LIKE '%_at' AND data_type != 'timestamp with time zone')
    OR (column_name LIKE '%_id' AND data_type = 'character varying')
    OR ((column_name LIKE '%price%' OR column_name LIKE '%amount%') AND data_type IN ('real', 'double precision'))
  )
ORDER BY table_name, column_name;

-- 5. CONSTRAINT COVERAGE
SELECT
  t.table_name,
  COUNT(DISTINCT CASE WHEN tc.constraint_type = 'PRIMARY KEY' THEN tc.constraint_name END) AS pk_count,
  COUNT(DISTINCT CASE WHEN tc.constraint_type = 'FOREIGN KEY' THEN tc.constraint_name END) AS fk_count,
  COUNT(DISTINCT CASE WHEN tc.constraint_type = 'UNIQUE' THEN tc.constraint_name END) AS unique_count,
  COUNT(DISTINCT CASE WHEN tc.constraint_type = 'CHECK' THEN tc.constraint_name END) AS check_count
FROM information_schema.tables t
LEFT JOIN information_schema.table_constraints tc
  ON t.table_name = tc.table_name AND tc.table_schema = 'public'
WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE'
GROUP BY t.table_name
ORDER BY t.table_name;

-- 6. COLUMNS NAMED *_id WITHOUT FK CONSTRAINT
SELECT c.table_name, c.column_name
FROM information_schema.columns c
LEFT JOIN (
  SELECT kcu.table_name, kcu.column_name
  FROM information_schema.key_column_usage kcu
  JOIN information_schema.table_constraints tc
    ON kcu.constraint_name = tc.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
) fk ON c.table_name = fk.table_name AND c.column_name = fk.column_name
WHERE c.table_schema = 'public'
  AND c.column_name LIKE '%_id'
  AND c.column_name != 'id'
  AND fk.column_name IS NULL
ORDER BY c.table_name, c.column_name;

-- 7. TABLES MISSING created_at / updated_at
SELECT t.table_name,
  MAX(CASE WHEN c.column_name = 'created_at' THEN 'YES' ELSE 'NO' END) AS has_created_at,
  MAX(CASE WHEN c.column_name = 'updated_at' THEN 'YES' ELSE 'NO' END) AS has_updated_at
FROM information_schema.tables t
LEFT JOIN information_schema.columns c
  ON t.table_name = c.table_name AND c.column_name IN ('created_at', 'updated_at')
WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE'
GROUP BY t.table_name
HAVING MAX(CASE WHEN c.column_name = 'created_at' THEN 1 ELSE 0 END) = 0
   OR MAX(CASE WHEN c.column_name = 'updated_at' THEN 1 ELSE 0 END) = 0
ORDER BY t.table_name;
