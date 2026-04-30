-- ═══════════════════════════════════════════════════════════════
-- RLS AUDIT SCRIPT
-- Squad: squad-supabase | Agent: guardian (Shield)
-- Run against any Supabase project for security overview
-- ═══════════════════════════════════════════════════════════════

-- 1. RLS COVERAGE (CRITICAL CHECK)
SELECT
  t.tablename,
  t.rowsecurity AS rls_enabled,
  COALESCE(p.policy_count, 0) AS policies,
  CASE
    WHEN NOT t.rowsecurity THEN '🔴 CRITICAL: DISABLED'
    WHEN COALESCE(p.policy_count, 0) = 0 THEN '🟡 WARNING: NO POLICIES'
    ELSE '🟢 OK'
  END AS status
FROM pg_tables t
LEFT JOIN (
  SELECT tablename, COUNT(*) AS policy_count
  FROM pg_policies WHERE schemaname = 'public'
  GROUP BY tablename
) p ON t.tablename = p.tablename
WHERE t.schemaname = 'public'
ORDER BY t.rowsecurity ASC, COALESCE(p.policy_count, 0) ASC;

-- 2. ALL POLICIES DETAIL
SELECT
  tablename,
  policyname,
  permissive,
  roles::text,
  cmd,
  LEFT(qual::text, 200) AS using_clause,
  LEFT(with_check::text, 200) AS with_check_clause
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;

-- 3. SECURITY DEFINER FUNCTIONS (HIGH RISK)
SELECT
  p.proname AS function_name,
  pg_get_function_arguments(p.oid) AS arguments,
  p.provolatile AS volatility,
  CASE p.prosecdef
    WHEN true THEN '🔴 SECURITY DEFINER'
    ELSE '🟢 SECURITY INVOKER'
  END AS security_mode
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
ORDER BY p.prosecdef DESC, p.proname;

-- 4. ROLE PERMISSIONS ON PUBLIC TABLES
SELECT
  grantee,
  table_name,
  string_agg(privilege_type, ', ' ORDER BY privilege_type) AS privileges
FROM information_schema.table_privileges
WHERE table_schema = 'public'
GROUP BY grantee, table_name
ORDER BY grantee, table_name;

-- 5. TABLES WITHOUT SELECT POLICY (potential data leak)
SELECT t.tablename
FROM pg_tables t
LEFT JOIN pg_policies p
  ON t.tablename = p.tablename
  AND p.schemaname = 'public'
  AND p.cmd = 'SELECT'
WHERE t.schemaname = 'public'
  AND t.rowsecurity = true
  AND p.policyname IS NULL;

-- 6. TABLES WITHOUT INSERT WITH CHECK (allows any data)
SELECT t.tablename
FROM pg_tables t
LEFT JOIN pg_policies p
  ON t.tablename = p.tablename
  AND p.schemaname = 'public'
  AND p.cmd = 'INSERT'
WHERE t.schemaname = 'public'
  AND t.rowsecurity = true
  AND p.policyname IS NULL;

-- 7. PERMISSIVE vs RESTRICTIVE POLICY COUNT
SELECT
  tablename,
  permissive,
  COUNT(*) AS count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename, permissive
ORDER BY tablename;

-- 8. FUNCTIONS USED IN POLICIES (check LEAKPROOF)
-- Manual review: look for function calls in qual/with_check columns
SELECT
  tablename,
  policyname,
  qual::text AS using_clause,
  with_check::text AS check_clause
FROM pg_policies
WHERE schemaname = 'public'
  AND (qual::text LIKE '%(%' OR with_check::text LIKE '%(%)%')
ORDER BY tablename;
