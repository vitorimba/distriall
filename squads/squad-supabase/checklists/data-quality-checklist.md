# Data Quality Checklist

**Checklist ID:** data-quality
**Version:** 1.0.0
**Gate:** QG-005 (Output Validation)
**Agent:** analyst (Sage)
**Blocking:** No — advisory, critical items should be prioritized

---

## Completeness (NULLs & Missing Data)

- [ ] Required columns have NOT NULL constraints
- [ ] NULL percentage < 5% on business-critical columns
- [ ] Default values set where appropriate
- [ ] No columns that are 100% NULL (dead columns)
- [ ] Foreign keys populated (no orphan-ready NULLs)

## Accuracy (Values & Ranges)

- [ ] CHECK constraints on columns with valid ranges
- [ ] Enum types used for fixed-value columns (not free text)
- [ ] Numeric precision appropriate (no FLOAT for money)
- [ ] Date/timestamp values within reasonable ranges
- [ ] Email/URL/phone formats validated (via constraint or trigger)
- [ ] No impossible values (negative ages, future birthdates, etc.)

## Consistency (Formats & Patterns)

- [ ] Naming convention consistent (snake_case for columns)
- [ ] Date format consistent across all tables
- [ ] Boolean representation consistent (no mix of 0/1 and true/false)
- [ ] Text casing consistent (no mix of "Active", "active", "ACTIVE")
- [ ] Currency values in consistent precision
- [ ] UUID format consistent (v4 preferred)

## Uniqueness (Duplicates)

- [ ] Primary keys on all tables
- [ ] Unique constraints on natural keys
- [ ] No duplicate rows (check via GROUP BY HAVING COUNT > 1)
- [ ] Email/username uniqueness enforced
- [ ] Compound uniqueness where applicable

## Referential Integrity

- [ ] All foreign keys have corresponding FK constraints
- [ ] ON DELETE behavior defined (CASCADE, SET NULL, RESTRICT)
- [ ] No orphan records (child without parent)
- [ ] No circular references without clear justification
- [ ] Self-referencing FKs validated (no infinite loops)

## Schema Design

- [ ] Tables in at least 3NF (or justified denormalization)
- [ ] No JSON columns used as substitute for proper relations
- [ ] No comma-separated values in columns (1NF violation)
- [ ] Proper data types used (no VARCHAR for everything)
- [ ] created_at and updated_at on all mutable tables
- [ ] Soft delete pattern consistent (if used)
- [ ] Indexes support the query patterns

## Temporal Data

- [ ] Timestamps use TIMESTAMPTZ (not TIMESTAMP)
- [ ] Time zones handled consistently
- [ ] Historical data preserved (audit trail)
- [ ] No data with future created_at values

---

## Scoring

| Dimension | Items | Weight |
|-----------|-------|--------|
| Completeness | 5 | 0.20 |
| Accuracy | 6 | 0.20 |
| Consistency | 6 | 0.15 |
| Uniqueness | 5 | 0.15 |
| Referential Integrity | 5 | 0.15 |
| Schema Design | 7 | 0.10 |
| Temporal Data | 4 | 0.05 |
| **Total** | **38** | **1.00** |

**Score calculation:** (checked items / total items per category) × weight × 10
