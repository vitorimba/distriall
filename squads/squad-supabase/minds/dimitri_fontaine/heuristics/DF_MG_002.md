# DF_MG_002 — Schema Versioning Framework

**Expert:** Dimitri Fontaine
**Domain:** PostgreSQL Schema Versioning
**Type:** Heuristic — Versioned Migration Patterns
**Severity:** MUST for all schema changes

---

## Purpose

Every schema change is a versioned, reviewable, testable migration file. This framework defines the numbering convention, UP/DOWN contract, idempotent patterns, and the correct dependency ordering for PostgreSQL objects.

---

## Numbering Convention

```
{timestamp}_{sequence}_{description}.sql

Example:
20260309001_create_profiles_table.sql
20260309002_add_profiles_rls_policies.sql
20260309003_create_get_profile_function.sql
```

- **Timestamp:** `YYYYMMDD` — date of creation
- **Sequence:** 3-digit zero-padded counter within the same date
- **Description:** Snake_case, verb-first (`create_`, `add_`, `alter_`, `drop_`, `seed_`)

## UP/DOWN Contract

Every migration file MUST contain both directions:

```sql
-- UP Migration
BEGIN;
-- ... DDL statements ...
COMMIT;

-- DOWN Migration (in companion file or clearly delimited)
BEGIN;
-- ... reverse DDL statements ...
COMMIT;
```

**Rules:**
- UP and DOWN must be inverse operations
- DOWN must be tested independently in CI
- DOWN must leave the database in the exact state before UP
- If DOWN is impossible (destructive data change), document explicitly and require manual approval

## Idempotent Patterns

All DDL should use idempotent syntax where PostgreSQL supports it:

```sql
-- Tables
CREATE TABLE IF NOT EXISTS public.profiles (...);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Functions (always OR REPLACE)
CREATE OR REPLACE FUNCTION public.get_profile(p_user_id uuid)
RETURNS jsonb LANGUAGE plpgsql AS $$ ... $$;

-- Types (check existence first)
DO $$ BEGIN
  CREATE TYPE public.status_enum AS ENUM ('active', 'inactive', 'suspended');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Columns (check existence)
DO $$ BEGIN
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio text;
END $$;
```

## Dependency Ordering

PostgreSQL objects have a strict dependency graph. Migrations MUST follow this order:

### UP Order (Creation)

| Priority | Object Type | Rationale |
|----------|-------------|-----------|
| 1 | Extensions | Other objects may depend on extension types |
| 2 | Custom Types / Domains | Tables reference these in column definitions |
| 3 | Tables (structure only) | No FK constraints yet — just columns and PKs |
| 4 | Foreign Key Constraints | All referenced tables now exist |
| 5 | Indexes | Tables and columns exist for indexing |
| 6 | Functions / Procedures | May reference tables and types |
| 7 | Triggers | Reference both tables and functions |
| 8 | Views / Materialized Views | Depend on tables, functions, types |
| 9 | RLS Policies | Tables must exist; functions for policies must exist |
| 10 | Grants / Permissions | All objects exist for granting access |
| 11 | Data Seeds | Schema is complete; seed reference data |

### DOWN Order (Destruction)

Reverse the UP order exactly: Seeds, Grants, RLS, Views, Triggers, Functions, Indexes, FKs, Tables, Types, Extensions.

```sql
-- DOWN: always reverse order
DROP POLICY IF EXISTS "users_select_own" ON public.profiles;
DROP TRIGGER IF EXISTS trg_updated_at ON public.profiles;
DROP FUNCTION IF EXISTS public.get_profile(uuid);
DROP INDEX IF EXISTS idx_profiles_user_id;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS fk_profiles_user_id;
DROP TABLE IF EXISTS public.profiles;
DROP TYPE IF EXISTS public.status_enum;
```

## Handling Complex Scenarios

### Renaming Columns (Non-Destructive)

```sql
-- UP: Add new, copy data, drop old (across 3 migrations)
-- Migration 1: Add new column
ALTER TABLE public.profiles ADD COLUMN display_name text;
UPDATE public.profiles SET display_name = name;

-- Migration 2: Application deploys reading both columns
-- Migration 3: Drop old column
ALTER TABLE public.profiles DROP COLUMN name;
```

### Type Changes

```sql
-- NEVER use implicit cast. Always explicit:
ALTER TABLE public.orders
  ALTER COLUMN amount TYPE numeric(12,2)
  USING amount::numeric(12,2);
```

### Circular FK Dependencies

```sql
-- UP: Create both tables without FKs, then add FKs separately
CREATE TABLE public.teams (...);
CREATE TABLE public.users (...);
ALTER TABLE public.teams ADD CONSTRAINT fk_teams_lead FOREIGN KEY (lead_id) REFERENCES public.users(id);
ALTER TABLE public.users ADD CONSTRAINT fk_users_team FOREIGN KEY (team_id) REFERENCES public.teams(id);

-- DOWN: Drop FKs first, then tables
ALTER TABLE public.users DROP CONSTRAINT fk_users_team;
ALTER TABLE public.teams DROP CONSTRAINT fk_teams_lead;
DROP TABLE public.users;
DROP TABLE public.teams;
```

## Supabase-Specific Considerations

- Migrations live in `supabase/migrations/` with timestamp naming
- Use `supabase db diff` to generate migration drafts — always review before committing
- RLS policies are migration objects — never applied via Dashboard only
- `supabase db push` applies pending migrations — test with `--dry-run` first
- Auth schema (`auth.*`) is managed by Supabase — never write migrations against it

---

## Key Principle

> "Schema versioning is not optional tooling — it is the source of truth for your database state."
> — Dimitri Fontaine
