# SF_RS_001 — Defense in Depth Model

**Type:** Security Architecture Framework
**Phase:** 0 (Security Design)
**Agent:** guardian (Shield)
**Pattern:** Layered Security Assessment

## Purpose

Framework para avaliar e implementar seguranca em PostgreSQL seguindo o modelo de Defense in Depth de Stephen Frost. Cada camada adiciona protecao que a anterior nao consegue fornecer. O modelo exige que todas as 4 camadas sejam avaliadas para qualquer schema ou feature nova.

## Configuration

```yaml
SF_RS_001:
  name: "Defense in Depth Model"
  phase: 0
  agent: "guardian"

  layers:
    - layer: 1
      name: "Roles (Authentication)"
      postgresql_version: "8.1+"
      scope: "Identity — WHO is connecting"
      controls:
        - "CREATE ROLE with LOGIN/NOLOGIN"
        - "Role inheritance (INHERIT/NOINHERIT)"
        - "Role membership (GRANT role TO role)"
        - "Connection limits (CONNECTION LIMIT)"
        - "Password policies (VALID UNTIL)"
      sufficient_when: "Only need to control who can connect"
      insufficient_when: "Need to control what objects they access"

    - layer: 2
      name: "GRANT System (Object Privileges)"
      postgresql_version: "7.0+"
      scope: "Object access — WHAT they can touch"
      controls:
        - "GRANT/REVOKE on tables, views, functions, schemas"
        - "SELECT, INSERT, UPDATE, DELETE per table"
        - "EXECUTE on functions"
        - "USAGE on schemas and sequences"
        - "DEFAULT PRIVILEGES for future objects"
      sufficient_when: "Only need table-level access control"
      insufficient_when: "Need to hide specific columns or filter rows"

    - layer: 3
      name: "Column-Level Privileges"
      postgresql_version: "8.4+"
      scope: "Attribute access — WHICH columns they see"
      controls:
        - "GRANT SELECT(col1, col2) ON table TO role"
        - "GRANT UPDATE(col1) ON table TO role"
        - "Per-column INSERT restrictions"
        - "Attribute-level ACL entries"
      sufficient_when: "Need to hide columns but all visible rows are accessible"
      insufficient_when: "Need to filter which rows a role can see"

    - layer: 4
      name: "Row Level Security (RLS)"
      postgresql_version: "9.5+"
      scope: "Row filtering — WHICH rows they see"
      controls:
        - "CREATE POLICY with USING (read filter)"
        - "CREATE POLICY with WITH CHECK (write filter)"
        - "Permissive policies (OR combination)"
        - "Restrictive policies (AND combination)"
        - "Per-command policies (SELECT, INSERT, UPDATE, DELETE)"
        - "FORCE ROW LEVEL SECURITY on table owners"
      sufficient_when: "Multi-tenant isolation, user-scoped data, role-based row access"
      insufficient_when: "Never — RLS is the innermost defense layer"

  assessment_order: "ALWAYS evaluate bottom-up: RLS → Column → GRANT → Roles"
```

## Decision Tree

```
INPUT: New table or feature requiring access control

STEP 1: ROLE ASSESSMENT
  IF (new actor type identified)
    THEN create dedicated role with minimal privileges
  IF (role needs membership in groups)
    THEN use GRANT role TO role with NOINHERIT where possible

STEP 2: GRANT ASSESSMENT
  IF (role needs access to specific tables only)
    THEN GRANT only required operations (SELECT, INSERT, etc.)
  IF (future tables in schema need same grants)
    THEN use ALTER DEFAULT PRIVILEGES

STEP 3: COLUMN ASSESSMENT
  IF (table contains sensitive columns — PII, secrets, internal IDs)
    THEN GRANT SELECT on non-sensitive columns only
  IF (role should update only specific fields)
    THEN GRANT UPDATE(col1, col2) explicitly

STEP 4: RLS ASSESSMENT
  IF (table contains data belonging to multiple tenants/users)
    THEN ENABLE ROW LEVEL SECURITY + CREATE POLICY
  IF (rows have ownership or visibility rules)
    THEN write USING clause for reads, WITH CHECK for writes
  IF (table owner should also be restricted)
    THEN ALTER TABLE ... FORCE ROW LEVEL SECURITY

TERMINATION: All 4 layers evaluated, each with explicit GRANT or DENY justification
FALLBACK: If unsure about a layer, default to DENY — add access explicitly when proven needed
```

## Evaluation Criteria

| Criterion | Weight | Threshold | Description |
|-----------|--------|-----------|-------------|
| Role separation | 0.9 | Dedicated roles | No shared credentials, no superuser in app |
| GRANT minimality | 0.9 | Least privilege | Only granted operations actually used |
| Column restriction | 0.7 | PII protected | Sensitive columns not exposed to app roles |
| RLS enabled | 0.9 | All multi-tenant tables | Every table with tenant data has policies |
| Owner restriction | 0.8 | FORCE RLS | Table owners also subject to RLS where needed |
| Default deny | 0.9 | No USING(true) | No permissive-all policies in production |

## Failure Modes

### Layer Skipping
- **Trigger:** Team jumps to RLS without proper Role/GRANT foundation
- **Manifestation:** RLS policies work but role has unnecessary table-level privileges
- **Detection:** Role can ALTER TABLE, DROP, or TRUNCATE despite only needing SELECT
- **Recovery:** Audit GRANT chain, revoke excess privileges, re-test

### Superuser in Application
- **Trigger:** Using postgres or superuser role in application connection string
- **Manifestation:** All 4 layers are bypassed — superuser ignores RLS, GRANT, everything
- **Detection:** Check connection role in pg_stat_activity
- **Recovery:** Create dedicated application role with minimal privileges immediately

### Layer 4 Without Layer 2
- **Trigger:** RLS policies exist but no GRANT restrictions on table
- **Manifestation:** RLS filters rows but role has DELETE/TRUNCATE privileges it should not have
- **Detection:** Review pg_class and pg_policy together
- **Recovery:** Apply GRANT restrictions at table level, then verify RLS still functions

---

**Pattern Compliance:** Layered Security Assessment with Bottom-Up Evaluation
**Source:** Stephen Frost — PostgreSQL Security Architecture (PGConf talks, Crunchy Data publications)
**Next Step:** SF_RS_002 (RLS Policy Architecture)
