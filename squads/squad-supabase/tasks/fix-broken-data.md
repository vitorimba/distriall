# Task: Fix Broken Data

**Task ID:** fix-broken-data
**Version:** 1.0.0
**Executor:** analyst (Sage)
**Type:** Hybrid (Agent generates fixes, human approves execution)
**Duration:** 10-30 min (depends on data volume)
**Output:** repair-plan.sql + execution report

---

## Purpose

Corrige dados quebrados identificados pelo data-quality-scan — NULLs indevidos, duplicatas, orphans, tipos incorretos, inconsistências de formato. Todas as correções são transacionais com rollback.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| connection_string | string | Yes | Database connection |
| findings | object | Yes | Output from data-quality-scan (findings.json) |
| auto_fix | boolean | No | Auto-fix low-risk issues (default: false) |
| dry_run | boolean | No | Generate SQL without executing (default: true) |

---

## Preconditions

- [ ] data-quality-scan completed (findings available)
- [ ] Write access to database
- [ ] Backup created (QG-006 compliance)
- [ ] Rollback scripts ready

---

## Steps

### Step 1: Classify Issues by Risk

| Risk Level | Description | Auto-Fix? | Example |
|-----------|-------------|-----------|---------|
| **Low** | Cosmetic, no data loss risk | Yes (if auto_fix=true) | Format standardization, casing |
| **Medium** | Data modification, reversible | Ask user | NULL filling with defaults, type casting |
| **High** | Data deletion or merge | Always ask | Duplicate removal, orphan cleanup |
| **Critical** | Schema change required | Always ask + backup | Column type change, constraint addition |

### Step 2: Generate Repair Scripts

**For each issue, generate:**

```sql
-- ═══════════════════════════════════════
-- FIX-{issue_id}: {description}
-- Risk: {level} | Affected rows: {count}
-- Table: {table} | Column: {column}
-- ═══════════════════════════════════════

BEGIN;
SAVEPOINT fix_{issue_id};

-- Show what will be affected
SELECT COUNT(*) AS affected_rows FROM {table} WHERE {condition};

-- Apply fix
{fix_sql}

-- Verify fix
{verification_sql}

-- If verification fails:
-- ROLLBACK TO SAVEPOINT fix_{issue_id};

-- If verification passes:
RELEASE SAVEPOINT fix_{issue_id};
COMMIT;
```

### Step 3: Fix Patterns by Category

**NULLs (Completeness):**
```sql
-- Fill with default value
UPDATE {table} SET {column} = {default_value}
WHERE {column} IS NULL;

-- Fill with derived value
UPDATE {table} SET {column} = (
  SELECT {derived_expression} FROM {source}
  WHERE {join_condition}
)
WHERE {column} IS NULL;
```

**Duplicates (Uniqueness):**
```sql
-- Identify duplicates (keep lowest ID)
WITH duplicates AS (
  SELECT id, ROW_NUMBER() OVER (
    PARTITION BY {unique_columns} ORDER BY id
  ) AS rn
  FROM {table}
)
-- Preview
SELECT * FROM {table} WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Delete duplicates (after user approval)
DELETE FROM {table} WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);
```

**Orphans (Referential Integrity):**
```sql
-- Find orphans
SELECT child.* FROM {child_table} child
LEFT JOIN {parent_table} parent ON child.{fk_column} = parent.id
WHERE parent.id IS NULL;

-- Option A: Delete orphans
DELETE FROM {child_table}
WHERE {fk_column} NOT IN (SELECT id FROM {parent_table});

-- Option B: Set FK to NULL (if nullable)
UPDATE {child_table} SET {fk_column} = NULL
WHERE {fk_column} NOT IN (SELECT id FROM {parent_table});

-- Option C: Create missing parent records
INSERT INTO {parent_table} (id, ...)
SELECT DISTINCT {fk_column}, ... FROM {child_table}
WHERE {fk_column} NOT IN (SELECT id FROM {parent_table});
```

**Format Inconsistencies (Consistency):**
```sql
-- Standardize text casing
UPDATE {table} SET {column} = LOWER({column})
WHERE {column} != LOWER({column});

-- Standardize email format
UPDATE {table} SET email = LOWER(TRIM(email))
WHERE email != LOWER(TRIM(email));

-- Trim whitespace
UPDATE {table} SET {column} = TRIM({column})
WHERE {column} != TRIM({column});
```

**Type Corrections (Validity):**
```sql
-- Cast VARCHAR to proper type (with validation)
ALTER TABLE {table}
ALTER COLUMN {column} TYPE {new_type}
USING {column}::{new_type};

-- Add constraint after cleaning
ALTER TABLE {table}
ADD CONSTRAINT {constraint_name} CHECK ({condition});
```

### Step 4: Present Repair Plan

**Format:**
```
═══════════════════════════════════════
REPAIR PLAN — {project_name}
═══════════════════════════════════════

Total Issues: {count}
  Low Risk:      {low_count}  (auto-fixable)
  Medium Risk:   {med_count}  (needs approval)
  High Risk:     {high_count} (needs approval + backup)
  Critical:      {crit_count} (needs approval + backup + staging test)

Estimated Affected Rows: {total_rows}
Estimated Duration: {duration}

[Detailed list of fixes with SQL]
```

### Step 5: Execute (if approved)

For each fix:
1. Begin transaction with SAVEPOINT
2. Execute fix SQL
3. Run verification query
4. If verification passes → RELEASE SAVEPOINT
5. If verification fails → ROLLBACK TO SAVEPOINT
6. Log result (success/failure/skipped)

### Step 6: Post-Fix Validation

```sql
-- Re-run data quality scan on affected tables
-- Compare before/after metrics
-- Generate execution report
```

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| repair-plan.sql | SQL | All fix scripts with transactions |
| execution-report.md | Markdown | What was fixed, what failed, what was skipped |
| before-after-metrics.json | JSON | DQ scores before and after |

---

## Validation

- [ ] All fixes wrapped in transactions with SAVEPOINT
- [ ] Affected row counts documented before execution
- [ ] User approved all medium+ risk fixes
- [ ] Backup verified before high/critical fixes
- [ ] Verification queries confirm fixes worked
- [ ] Post-fix DQ scan shows improvement
- [ ] No data loss occurred
