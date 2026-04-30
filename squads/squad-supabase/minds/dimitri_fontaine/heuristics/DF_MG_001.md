# DF_MG_001 — Migration Safety Protocol (MSP)

**Expert:** Dimitri Fontaine
**Domain:** PostgreSQL Migration Safety
**Type:** Heuristic — 7-Phase Migration Methodology
**Severity:** NON-NEGOTIABLE for production migrations

---

## Purpose

Every database migration — whether schema change, data migration, or platform move — follows this 7-phase protocol. Skipping phases is the primary cause of migration failures. Each phase has explicit inputs, outputs, and abort criteria.

---

## Phase 1: Assessment

**Objective:** Understand what exists before changing anything.

- **Inputs:** Source database connection, application schema documentation (if any)
- **Actions:** Inventory all objects (tables, views, functions, triggers, extensions, RLS policies). Measure data volumes per table. Map FK dependency graph. Identify custom types and domains.
- **Outputs:** `assessment.json` — object inventory, row counts, constraint map, extension list
- **Abort if:** Source database is unreachable or schema cannot be fully introspected

## Phase 2: Planning

**Objective:** Define the migration graph with ordering and timing estimates.

- **Inputs:** `assessment.json`, target schema definition, cutover window requirement
- **Actions:** Build dependency-ordered migration sequence. Identify breaking changes. Define rollback strategy per step. Estimate execution time from staging benchmarks. Decide online vs. offline strategy.
- **Outputs:** `migration-plan.yaml` — ordered steps, estimated durations, rollback procedures
- **Abort if:** Estimated cutover exceeds allowed window with no online alternative

## Phase 3: Staging

**Objective:** Execute the full migration on a production-mirror environment.

- **Inputs:** `migration-plan.yaml`, staging environment with production-equivalent data
- **Actions:** Run all migration steps. Measure actual timings. Test rollback for each step. Validate data integrity post-migration. Run application smoke tests against migrated staging.
- **Outputs:** `staging-report.md` — actual timings, issues found, rollback test results
- **Abort if:** Any rollback fails. Data integrity check fails. Timing exceeds 80% of cutover window.

## Phase 4: Pre-flight

**Objective:** Final validation before production execution.

- **Inputs:** `staging-report.md`, production access credentials, monitoring dashboards
- **Actions:** Verify production matches staging topology. Confirm backup is current (< 1 hour). Validate all team members are available. Set up real-time monitoring. Confirm rollback credentials and procedures. Lock deployment pipeline.
- **Outputs:** `preflight-checklist.md` — all items checked, team sign-offs
- **Abort if:** Backup is stale. Team member unavailable. Monitoring not operational.

## Phase 5: Execution

**Objective:** Apply the migration to production.

- **Inputs:** `migration-plan.yaml`, `preflight-checklist.md` (all green)
- **Actions:** Apply migrations in dependency order within a transaction where possible. Use `SET statement_timeout` for safety. Monitor replication lag. Log every step with timestamps. Compare row counts at each checkpoint.
- **Outputs:** `execution-log.md` — timestamped step results, row count validations
- **Abort if:** Any step fails. Row count mismatch > 0. Replication lag exceeds threshold.

## Phase 6: Validation

**Objective:** Prove the migration succeeded with data integrity.

- **Inputs:** `execution-log.md`, validation queries
- **Actions:** Re-enable all constraints (if deferred). Run FK validation: `SELECT count(*) FROM child WHERE fk NOT IN (SELECT pk FROM parent)` for every FK. Verify indexes are valid and not in `pg_index.indisvalid = false`. Run application integration tests. Compare checksums for critical tables.
- **Outputs:** `validation-report.md` — constraint status, FK integrity, index health, test results
- **Abort if:** Any FK violation found. Any invalid index. Application tests fail.

## Phase 7: Cutover

**Objective:** Finalize the migration and clean up.

- **Inputs:** `validation-report.md` (all green)
- **Actions:** Update connection strings. Remove old schema artifacts (after grace period). Archive migration logs. Update documentation. Remove temporary replication slots. Notify stakeholders.
- **Outputs:** `cutover-complete.md` — final status, connection details, archive locations
- **Abort if:** Application health checks fail post-cutover. Revert to pre-migration state.

---

## Abort Protocol

When any phase triggers an abort:

1. **STOP** — Do not proceed to the next phase
2. **ASSESS** — Document the failure with full context
3. **ROLLBACK** — Execute the rollback procedure for the current phase
4. **REPORT** — Notify stakeholders with timeline for resolution
5. **FIX** — Address the root cause, not the symptom
6. **RESTART** — Re-enter the protocol from the phase that failed

---

## Key Principle

> "A migration that cannot be rolled back is not a migration — it is a gamble."
> — Dimitri Fontaine
