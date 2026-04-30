# Task: Data Quality Scan

**Task ID:** data-quality-scan
**Version:** 1.0.0
**Executor:** analyst (Sage)
**Type:** Hybrid
**Duration:** 10-15 min
**Output:** data-quality-report.md

---

## Purpose

Scan completo de qualidade de dados — identifica NULLs, duplicatas, orphans, problemas de normalização, tipos incorretos e inconsistências. Gera plano de correção com SQL pronto para executar.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| connection_string | string | Yes | Database connection |
| target_tables | list | No | Specific tables (default: all) |
| fix_mode | enum | No | "report_only" or "generate_fixes" (default: generate_fixes) |

---

## Steps

### Step 1: Completeness Analysis (NULLs)
For each table, for each column:
```sql
SELECT column_name,
       COUNT(*) as total,
       COUNT(column_name) as non_null,
       COUNT(*) - COUNT(column_name) as null_count,
       round((COUNT(*) - COUNT(column_name))::numeric / COUNT(*) * 100, 2) as null_pct
FROM table_name
GROUP BY column_name;
```

Flag: NULL > 5% on required columns, NULL = 100% (dead column)

### Step 2: Uniqueness (Duplicates)
```sql
-- Check for duplicates on candidate unique columns
SELECT column_values, COUNT(*) as occurrences
FROM table_name
GROUP BY column_values
HAVING COUNT(*) > 1
ORDER BY occurrences DESC;
```

### Step 3: Referential Integrity (Orphans)
```sql
-- For each FK relationship
SELECT child.id
FROM child_table child
LEFT JOIN parent_table parent ON child.parent_id = parent.id
WHERE parent.id IS NULL;
```

### Step 4: Accuracy (Value Ranges)
- Numeric columns: min, max, avg, stddev (detect outliers)
- Date columns: min, max (detect future dates, ancient dates)
- Enum-like columns: distinct values (detect typos)
- Boolean columns: distinct values (detect non-boolean data)

### Step 5: Consistency (Format Patterns)
- Email formats consistent
- Phone number formats consistent
- Date formats consistent (TIMESTAMPTZ everywhere)
- Naming conventions consistent (snake_case)
- Text casing consistent

### Step 6: Schema Design Review
- Normalization level assessment (1NF → BCNF)
- JSON column abuse detection
- Comma-separated value detection (1NF violation)
- Data type appropriateness (VARCHAR abuse, FLOAT for money)
- Missing constraints (NOT NULL, CHECK, FK)

### Step 7: Generate Findings & Fixes
For each issue:
- Issue ID, severity, category, table, column
- Description of the problem
- Affected row count
- Fix SQL (wrapped in transaction with SAVEPOINT)
- Validation query (verify fix worked)

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| data-quality-report.md | Markdown | Full DQ report with 6 dimensions scored |
| repair-plan.sql | SQL | Ready-to-execute repair scripts |
| findings.json | JSON | Machine-readable findings |

---

## Validation

- [ ] All 6 quality dimensions scanned
- [ ] Each dimension scored 0-10
- [ ] Findings categorized by severity
- [ ] Fix SQL generated and wrapped in transactions
- [ ] Affected row counts documented
