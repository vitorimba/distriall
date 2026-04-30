# Task: RLS Audit

**Task ID:** rls-audit
**Version:** 1.0.0
**Executor:** guardian (Shield)
**Type:** Hybrid
**Duration:** 10-15 min
**Output:** rls-matrix.md

---

## Purpose

Auditoria completa de Row Level Security — verifica cobertura, analisa políticas, testa com diferentes roles, identifica vulnerabilidades e gera RLS matrix completa.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| connection_string | string | Yes | Database connection |
| target_tables | list | No | Specific tables (default: all public) |
| test_roles | list | No | Roles to test (default: anon, authenticated, service_role) |

---

## Steps

### Step 1: RLS Coverage Map
```sql
SELECT t.tablename,
       t.rowsecurity as rls_enabled,
       COUNT(p.policyname) as policy_count
FROM pg_tables t
LEFT JOIN pg_policies p ON t.tablename = p.tablename AND t.schemaname = p.schemaname
WHERE t.schemaname = 'public'
GROUP BY t.tablename, t.rowsecurity
ORDER BY t.rowsecurity ASC, t.tablename;
```

### Step 2: Policy Detail Analysis
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies WHERE schemaname = 'public'
ORDER BY tablename, cmd;
```

For each policy:
- Parse USING and WITH CHECK clauses
- Check if functions used are LEAKPROOF
- Verify indexes exist on referenced columns
- Assess complexity (simple auth.uid() vs subquery)

### Step 3: SECURITY DEFINER Audit
```sql
SELECT p.proname, p.prosecdef, p.provolatile,
       pg_get_functiondef(p.oid) as definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' AND p.prosecdef = true;
```

### Step 4: Role Permission Analysis
```sql
SELECT grantee, table_name, privilege_type
FROM information_schema.table_privileges
WHERE table_schema = 'public'
ORDER BY grantee, table_name;
```

### Step 5: Vulnerability Scan
Check for:
- Tables without RLS (CRITICAL)
- `USING (true)` on sensitive tables
- Missing WITH CHECK on INSERT/UPDATE
- Non-LEAKPROOF functions in policies
- service_role key exposure patterns
- SECURITY DEFINER without justification
- Overly permissive role grants

### Step 6: Generate RLS Matrix
- Use template: rls-matrix-tmpl.md
- Coverage percentage
- Per-table policy breakdown
- Role permission summary
- Vulnerability findings

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| rls-matrix.md | Markdown | Complete RLS coverage matrix |
| vulnerabilities.json | JSON | Security findings with severity |
| fix-policies.sql | SQL | Recommended policy fixes |

---

## Validation

- [ ] All public tables checked for RLS
- [ ] All policies analyzed for correctness
- [ ] SECURITY DEFINER functions audited
- [ ] Role permissions mapped
- [ ] Vulnerabilities identified and classified
- [ ] RLS matrix generated
