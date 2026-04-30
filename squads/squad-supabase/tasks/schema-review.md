# Task: Schema Review

**Task ID:** schema-review
**Version:** 1.0.0
**Executor:** diagnostician (Scout) + analyst (Sage)
**Type:** Hybrid
**Duration:** 10-15 min
**Output:** schema-review-report.md

---

## Purpose

Revisão completa do schema de um projeto Supabase — avalia naming conventions, tipos de dados, normalização, constraints, relacionamentos e aderência a best practices. Identifica problemas estruturais e gera recomendações.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| connection_string | string | Yes | Database connection |
| target_tables | list | No | Specific tables (default: all public) |
| strict_mode | boolean | No | Apply strict naming/type rules (default: false) |

---

## Preconditions

- [ ] Connection established
- [ ] Read access to information_schema and pg_catalog

---

## Steps

### Step 1: Schema Discovery
```sql
-- Full schema map
SELECT t.table_name, c.column_name, c.data_type, c.udt_name,
       c.is_nullable, c.column_default, c.character_maximum_length
FROM information_schema.tables t
JOIN information_schema.columns c ON t.table_name = c.table_name
WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name, c.ordinal_position;
```

### Step 2: Naming Convention Audit

**Rules:**
- Tables: snake_case, plural (e.g., `users`, `order_items`)
- Columns: snake_case, descriptive (e.g., `created_at`, `user_id`)
- Foreign keys: `{referenced_table_singular}_id` (e.g., `user_id`, `order_id`)
- Indexes: `idx_{table}_{columns}` (e.g., `idx_users_email`)
- Constraints: `{table}_{type}_{columns}` (e.g., `users_pkey`, `orders_user_id_fkey`)

**Check for:**
- camelCase violations
- Abbreviations inconsistentes
- Reserved words as identifiers
- Prefixos desnecessários (e.g., `tbl_`, `col_`)

### Step 3: Data Type Audit

**Common violations:**
| Anti-Pattern | Correct Type | Detection |
|-------------|-------------|-----------|
| `VARCHAR` for everything | Specific types | `character_varying` without max_length |
| `FLOAT`/`REAL` for money | `NUMERIC(precision, scale)` | monetary columns with float type |
| `TEXT` for enums | `CREATE TYPE ... AS ENUM` | Low distinct count with text type |
| `VARCHAR` for UUIDs | `UUID` | 36-char varchar with UUID pattern |
| `TIMESTAMP` without TZ | `TIMESTAMPTZ` | `timestamp without time zone` |
| `INTEGER` for booleans | `BOOLEAN` | Integer with only 0/1 values |
| `TEXT` for JSON | `JSONB` | Text columns with JSON content |

```sql
-- Find potential type mismatches
SELECT table_name, column_name, data_type, udt_name
FROM information_schema.columns
WHERE table_schema = 'public'
AND (
  (column_name LIKE '%_at' AND data_type != 'timestamp with time zone')
  OR (column_name LIKE '%_id' AND data_type NOT IN ('uuid', 'integer', 'bigint'))
  OR (column_name LIKE '%price%' AND data_type IN ('real', 'double precision'))
  OR (column_name LIKE '%amount%' AND data_type IN ('real', 'double precision'))
);
```

### Step 4: Constraint Coverage

```sql
-- Tables without primary keys
SELECT t.table_name
FROM information_schema.tables t
LEFT JOIN information_schema.table_constraints tc
  ON t.table_name = tc.table_name AND tc.constraint_type = 'PRIMARY KEY'
WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE'
  AND tc.constraint_name IS NULL;

-- Columns that should have NOT NULL but don't
-- (e.g., created_at, user_id, email)

-- Missing foreign key constraints
-- (columns named *_id without FK constraint)
SELECT c.table_name, c.column_name
FROM information_schema.columns c
LEFT JOIN information_schema.key_column_usage kcu
  ON c.table_name = kcu.table_name AND c.column_name = kcu.column_name
LEFT JOIN information_schema.table_constraints tc
  ON kcu.constraint_name = tc.constraint_name AND tc.constraint_type = 'FOREIGN KEY'
WHERE c.table_schema = 'public'
  AND c.column_name LIKE '%_id'
  AND c.column_name != 'id'
  AND tc.constraint_name IS NULL;

-- Missing CHECK constraints on bounded columns
```

### Step 5: Normalization Assessment

**Check each normal form:**
- **1NF:** No arrays/JSON used as substitute for relations? No comma-separated values?
- **2NF:** Composite key tables have no partial dependencies?
- **3NF:** No transitive dependencies (e.g., storing city AND zip code)?
- **BCNF:** Every determinant is a candidate key?

**Flag:**
- JSON columns with repeated structure (should be a table)
- Calculated/derived columns stored (violates 3NF unless justified)
- Denormalized columns (justified for read performance?)

### Step 6: Relationship Analysis

```sql
-- FK dependency graph
SELECT
  tc.table_name AS child_table,
  kcu.column_name AS child_column,
  ccu.table_name AS parent_table,
  ccu.column_name AS parent_column,
  rc.delete_rule,
  rc.update_rule
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints rc ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public';
```

**Check for:**
- Orphan tables (no FK in or out)
- Circular references
- Missing ON DELETE behavior (should be CASCADE, SET NULL, or RESTRICT — never default)
- Missing ON UPDATE behavior

### Step 7: Temporal Patterns

- All mutable tables have `created_at TIMESTAMPTZ DEFAULT NOW()`?
- All mutable tables have `updated_at TIMESTAMPTZ`?
- Update trigger for `updated_at` exists?
- Soft delete pattern consistent (if used)?

### Step 8: Generate Report

**Findings per category:**
- Naming: violations found
- Types: mismatches found
- Constraints: missing coverage
- Normalization: level per table
- Relationships: issues found
- Temporal: missing patterns

**Score:** 0-10 per category, weighted average for overall

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| schema-review-report.md | Markdown | Full review with findings |
| schema-fixes.sql | SQL | Recommended ALTER statements |
| dependency-graph.txt | Text | Table dependency visualization |

---

## Validation

- [ ] All public tables reviewed
- [ ] Naming conventions checked
- [ ] Data types audited
- [ ] Constraint coverage mapped
- [ ] Normalization assessed
- [ ] Relationships analyzed
- [ ] Temporal patterns checked
- [ ] Report generated with actionable fixes
