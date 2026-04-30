# JC_DQ_001 — Data Quality Assessment Framework (DQAF)

**Expert:** Joe Celko
**Domain:** Data Quality Assessment
**Type:** Heuristic — 6-Dimension Quality Scoring
**Severity:** MUST for all schema reviews and data audits

---

## Purpose

Data quality is measurable. This framework defines 6 orthogonal dimensions, each scored 0-10, with concrete SQL patterns for automated assessment. A schema without quality checks is a schema waiting to corrupt your business decisions.

---

## The 6 Dimensions

### 1. Completeness (Are required values present?)

**Score 0-10:** Percentage of NOT NULL compliance across required columns.

```sql
-- Completeness check per table
SELECT
  'profiles' AS table_name,
  count(*) AS total_rows,
  count(*) FILTER (WHERE email IS NOT NULL) AS email_present,
  round(100.0 * count(*) FILTER (WHERE email IS NOT NULL) / NULLIF(count(*), 0), 2) AS email_completeness_pct
FROM public.profiles;
```

**Scoring:** 10 = 100% complete, 8 = >95%, 5 = >80%, 0 = <50%

**Rules:**
- Every business-required column MUST have `NOT NULL`
- Optional columns should have `DEFAULT` values where semantically meaningful
- Track completeness trends over time — degradation signals upstream issues

### 2. Accuracy (Do values reflect reality?)

**Score 0-10:** Percentage of values passing domain validation rules.

```sql
-- Accuracy: email format validation
SELECT count(*) FILTER (WHERE email !~ '^[^@]+@[^@]+\.[^@]+$') AS invalid_emails,
       count(*) AS total,
       round(100.0 * count(*) FILTER (WHERE email ~ '^[^@]+@[^@]+\.[^@]+$') / NULLIF(count(*), 0), 2) AS accuracy_pct
FROM public.profiles
WHERE email IS NOT NULL;

-- Accuracy: price within business range
SELECT count(*) FILTER (WHERE price < 0 OR price > 999999.99) AS out_of_range,
       count(*) AS total
FROM public.products;
```

**Scoring:** 10 = 100% valid, 8 = >98%, 5 = >90%, 0 = <70%

**Rules:**
- Use `CHECK` constraints for domain validation at the schema level
- Custom domains encode reusable validation: `CREATE DOMAIN email_address AS text CHECK (VALUE ~ '^[^@]+@[^@]+\.[^@]+$')`
- Range checks belong in the schema, not the application

### 3. Consistency (Do related values agree?)

**Score 0-10:** Cross-reference agreement between related columns and tables.

```sql
-- Consistency: FK integrity (should always be 0 orphans)
SELECT count(*) AS orphaned_orders
FROM public.orders o
LEFT JOIN public.users u ON o.user_id = u.id
WHERE u.id IS NULL;

-- Consistency: derived value matches source
SELECT count(*) FILTER (WHERE total != quantity * unit_price) AS inconsistent_totals,
       count(*) AS total
FROM public.order_items;
```

**Scoring:** 10 = zero inconsistencies, 7 = <0.1% inconsistent, 3 = <1%, 0 = >5%

**Rules:**
- Foreign keys MUST be enforced at the database level
- Derived/computed values should use generated columns or triggers
- Cross-table consistency checks should run as scheduled validations

### 4. Timeliness (Is data current and properly temporal?)

**Score 0-10:** Freshness of data and correctness of temporal handling.

```sql
-- Timeliness: stale records detection
SELECT count(*) FILTER (WHERE updated_at < now() - interval '90 days') AS stale_records,
       count(*) AS total
FROM public.profiles;

-- Timeliness: timezone handling
SELECT count(*) FILTER (WHERE created_at::text !~ '\+|\-|Z') AS missing_tz_info
FROM public.events;
```

**Scoring:** 10 = all timestamps TZ-aware and fresh, 5 = some stale data, 0 = no temporal tracking

**Rules:**
- Always use `TIMESTAMP WITH TIME ZONE` — never without
- Store in UTC, convert at presentation layer
- `updated_at` triggers must exist on every mutable table
- ISO 8601 is the only acceptable date format in text contexts

### 5. Uniqueness (Are duplicates controlled?)

**Score 0-10:** Absence of unintended duplicates.

```sql
-- Uniqueness: detect duplicate emails
SELECT email, count(*) AS occurrences
FROM public.profiles
GROUP BY email
HAVING count(*) > 1;

-- Uniqueness: detect duplicate composite keys
SELECT user_id, product_id, count(*)
FROM public.favorites
GROUP BY user_id, product_id
HAVING count(*) > 1;
```

**Scoring:** 10 = zero duplicates, 8 = <0.01%, 5 = <0.1%, 0 = >1%

**Rules:**
- Natural unique constraints MUST be declared: `UNIQUE(email)`, `UNIQUE(user_id, product_id)`
- Surrogate keys do NOT guarantee business uniqueness
- Deduplication should be a migration step, not a runtime query filter

### 6. Validity (Do values conform to allowed sets?)

**Score 0-10:** Conformance to enumerated or structured value domains.

```sql
-- Validity: enum compliance
SELECT count(*) FILTER (WHERE status NOT IN ('active', 'inactive', 'suspended')) AS invalid_status
FROM public.profiles;

-- Validity: structured format compliance (phone)
SELECT count(*) FILTER (WHERE phone !~ '^\+[1-9]\d{1,14}$') AS invalid_phones
FROM public.profiles
WHERE phone IS NOT NULL;
```

**Scoring:** 10 = 100% valid, 8 = >99%, 5 = >95%, 0 = <80%

**Rules:**
- Use PostgreSQL `ENUM` types or `CHECK` constraints for value sets
- Structured formats (phone, postal code) need CHECK constraints with regex
- Boolean values must be `BOOLEAN`, never `VARCHAR` with 'Y'/'N'

---

## Aggregate Quality Score

```
DQ_SCORE = (Completeness + Accuracy + Consistency + Timeliness + Uniqueness + Validity) / 6
```

| Score Range | Grade | Action Required |
|-------------|-------|-----------------|
| 9.0 - 10.0 | A | Maintain current practices |
| 7.0 - 8.9 | B | Address specific dimension gaps |
| 5.0 - 6.9 | C | Systematic quality improvement needed |
| 3.0 - 4.9 | D | Critical — data decisions unreliable |
| 0.0 - 2.9 | F | Emergency — stop using data for decisions |

---

## Key Principle

> "You cannot manage what you do not measure. Data quality is not an opinion — it is a score."
> — Joe Celko
