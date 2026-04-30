# SF_RS_002 — RLS Policy Architecture

**Type:** Security Implementation Framework
**Phase:** 1 (Security Implementation)
**Agent:** guardian (Shield)
**Pattern:** RLS Policy Design & Validation

## Purpose

Framework para projetar, implementar e validar politicas de Row Level Security no PostgreSQL. Cobre a semantica de USING vs WITH CHECK, combinacao de politicas permissivas e restritivas, implicacoes de LEAKPROOF, e padroes de isolamento multi-tenant. Este heuristic e o guia definitivo para escrita de politicas RLS corretas.

## Configuration

```yaml
SF_RS_002:
  name: "RLS Policy Architecture"
  phase: 1
  agent: "guardian"
  depends_on: "SF_RS_001"

  policy_semantics:
    USING:
      applies_to: ["SELECT", "UPDATE (existing rows)", "DELETE"]
      behavior: "Filter — rows not matching are invisible, not denied"
      analogy: "A WHERE clause silently added to every query"
      danger: "User never knows rows exist — no error, no denial"

    WITH_CHECK:
      applies_to: ["INSERT", "UPDATE (new row values)"]
      behavior: "Constraint — rows not matching cause ERROR"
      analogy: "A CHECK constraint that varies per role"
      danger: "Missing WITH CHECK on INSERT = can write rows you cannot read"

  policy_combination:
    permissive:
      operator: "OR"
      behavior: "Any permissive policy granting access is sufficient"
      default_type: true
      note: "Multiple permissive policies EXPAND access"

    restrictive:
      operator: "AND"
      behavior: "ALL restrictive policies must be satisfied"
      default_type: false
      note: "Restrictive policies NARROW access — use for hard constraints"

    combination_formula: |
      (permissive_1 OR permissive_2 OR ... permissive_N)
      AND
      (restrictive_1 AND restrictive_2 AND ... restrictive_M)

  leakproof:
    purpose: "Allow optimizer to apply function before RLS filter"
    contract: "Function MUST NOT leak info via errors, timing, or side effects"
    risk: "Mismarked LEAKPROOF = optimizer reorders, data leaks through function"
    who_can_mark: "Only superuser can set LEAKPROOF"
    performance: "Enables predicate pushdown past security barrier"

  multi_tenant_patterns:
    - name: "JWT claim-based isolation"
      pattern: "USING (tenant_id = (current_setting('request.jwt.claims')::json->>'tenant_id')::uuid)"
      supabase: true
    - name: "Role-based isolation"
      pattern: "USING (owner_role = current_user)"
      supabase: false
    - name: "Session variable isolation"
      pattern: "USING (tenant_id = current_setting('app.current_tenant')::uuid)"
      supabase: false
```

## Decision Tree

```
INPUT: Table requiring RLS policies

STEP 1: ENABLE RLS
  ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;
  IF (table owner should also be restricted)
    ALTER TABLE {table} FORCE ROW LEVEL SECURITY;

STEP 2: IDENTIFY OPERATIONS
  FOR EACH operation IN [SELECT, INSERT, UPDATE, DELETE]:
    IF (operation needed by app roles)
      THEN design policy for that operation
    ELSE
      no policy = no access (deny by default)

STEP 3: DESIGN USING CLAUSE (reads)
  IF (multi-tenant)
    THEN USING (tenant_id = auth.uid() OR tenant_id = extracted_from_jwt)
  IF (role-based visibility)
    THEN USING (role_check_function(auth.uid(), row_id))
  IF (public data subset)
    THEN USING (is_public = true OR owner_id = auth.uid())
  NEVER: USING (true) — this disables the policy

STEP 4: DESIGN WITH CHECK CLAUSE (writes)
  IF (INSERT policy)
    THEN WITH CHECK (owner_id = auth.uid() AND tenant_id = extracted_from_jwt)
  IF (UPDATE policy)
    THEN USING (can_see_row) WITH CHECK (cannot_change_tenant_id)
  RULE: WITH CHECK must be at least as restrictive as USING

STEP 5: PERMISSIVE vs RESTRICTIVE
  IF (multiple access paths — e.g., owner OR admin OR public)
    THEN use multiple PERMISSIVE policies (they OR together)
  IF (hard constraint that must ALWAYS apply — e.g., tenant isolation)
    THEN use RESTRICTIVE policy (ANDs with all permissive)
  PATTERN: 1 restrictive for tenant boundary + N permissive for access levels

STEP 6: VALIDATE
  FOR EACH role IN [anon, authenticated, service_role]:
    TEST: SELECT should only return authorized rows
    TEST: INSERT should reject cross-tenant writes
    TEST: UPDATE should reject changing tenant_id
    TEST: DELETE should only affect owned rows

TERMINATION: All operations covered, all roles tested, no USING(true), no missing WITH CHECK
FALLBACK: If policy logic is complex, extract to SECURITY INVOKER function for readability
```

## Evaluation Criteria

| Criterion | Weight | Threshold | Description |
|-----------|--------|-----------|-------------|
| USING completeness | 0.9 | All read operations | Every SELECT/UPDATE/DELETE has USING |
| WITH CHECK presence | 0.9 | All write operations | Every INSERT/UPDATE has WITH CHECK |
| No USING(true) | 1.0 | Zero instances | Permissive-all policies forbidden |
| Restrictive for tenants | 0.9 | All multi-tenant tables | Tenant boundary is restrictive, not permissive |
| LEAKPROOF audit | 0.8 | All marked functions | Every LEAKPROOF function verified |
| Role testing | 0.9 | All app roles tested | anon, authenticated, service_role validated |

## Common Pitfalls

### 1. Missing WITH CHECK on INSERT
- **Problem:** Users can INSERT rows with any tenant_id, then cannot SELECT them
- **Impact:** Data written to wrong tenant, invisible but present — orphaned rows
- **Fix:** Always pair USING with WITH CHECK; for INSERT-only, WITH CHECK is mandatory

### 2. Permissive Policies Expanding Too Far
- **Problem:** Adding a permissive policy for "admin sees all" also affects non-admin queries via OR
- **Impact:** Combined permissive policies grant wider access than intended
- **Fix:** Use restrictive policy for tenant boundary, permissive only within tenant

### 3. SECURITY DEFINER Bypassing RLS
- **Problem:** A helper function with SECURITY DEFINER runs as the function owner (usually superuser)
- **Impact:** RLS is completely bypassed inside the function body
- **Fix:** Use SECURITY INVOKER unless there is a documented justification for DEFINER

### 4. Subquery Leaks
- **Problem:** RLS on table A, but a view or function joins to table B without its own RLS
- **Impact:** Data from table B leaks through the join
- **Fix:** Enable RLS on ALL tables containing sensitive data, not just the primary ones

### 5. UPDATE Without USING + WITH CHECK Pair
- **Problem:** UPDATE policy has USING but no WITH CHECK
- **Impact:** User can update a row to change its tenant_id, moving it to another tenant
- **Fix:** WITH CHECK must prevent changing the isolation key (tenant_id, owner_id)

## Validation Questions

1. "Existe alguma tabela com RLS habilitado mas sem politica definida? (deny-all implicito — intencional?)"
2. "Alguma politica usa USING(true)? Se sim, por que nao foi removida?"
3. "Toda operacao INSERT tem WITH CHECK correspondente?"
4. "O tenant_id esta protegido contra UPDATE via WITH CHECK?"
5. "Funcoes SECURITY DEFINER foram auditadas para bypass de RLS?"
6. "Politicas restritivas cobrem o boundary de tenant em todas as tabelas multi-tenant?"

## Performance Considerations

```yaml
performance:
  leakproof_impact: "Enables predicate pushdown — can improve query speed 2-10x on filtered queries"
  policy_count: "More policies = more quals added to queries — keep under 5 per table"
  subquery_in_policy: "Subqueries in USING clauses execute per-row — use JOINs or materialized lookups"
  index_alignment: "USING clause predicates should align with table indexes for efficient filtering"
  auth_function_cost: "auth.uid() and current_setting() are cheap — custom functions may not be"
```

---

**Pattern Compliance:** RLS Policy Design with Permissive/Restrictive Combination Logic
**Source:** Stephen Frost — RLS implementation (PostgreSQL 9.5), PGConf security talks, Crunchy Data best practices
**Previous Step:** SF_RS_001 (Defense in Depth Model)
