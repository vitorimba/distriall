# Task: Migrate Project

**Task ID:** migrate-project
**Version:** 1.0.0
**Executor:** migrator (Voyager)
**Type:** Hybrid (Agent executes, human approves each phase)
**Duration:** 1-4 hours
**Output:** Migration completed + validation report

---

## Purpose

Migração completa de um projeto Supabase para outro — schema, dados, auth, storage, functions, RLS, cron jobs. Segue o Migration Safety Protocol (MSP) com rollback em cada fase.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| source_connection | string | Yes | Source database connection |
| dest_connection | string | Yes | Destination database connection |
| source_ref | string | Yes | Source Supabase project ref |
| dest_ref | string | Yes | Destination Supabase project ref |
| include_storage | boolean | No | Migrate storage (default: true) |
| include_edge_functions | boolean | No | Migrate Edge Functions (default: true) |
| include_auth | boolean | No | Migrate auth.users (default: true) |

---

## Preconditions

- [ ] Pre-migration checklist completed (ALL critical items)
- [ ] Migration plan approved by user
- [ ] Backup created and verified
- [ ] Rollback scripts generated and tested
- [ ] Maintenance window confirmed

---

## Steps

### Phase 1: Pre-Flight
1. Create pg_dump backup of source
2. Verify backup integrity
3. Generate rollback scripts per phase
4. Dry-run rollback scripts
5. **CHECKPOINT: User approval to proceed**

### Phase 2: Schema Migration
1. Export types, enums from source
2. Export table definitions (no data)
3. Export constraints (except FKs)
4. Apply to destination
5. Verify schema match
6. **CHECKPOINT: Schema verified**

### Phase 3: Data Migration
1. Export auth.users (if included)
2. Import auth.users to destination
3. Export data in dependency order
4. Import data using COPY
5. Add foreign key constraints
6. Verify row counts match
7. Verify FK integrity
8. Sample data spot-check
9. **CHECKPOINT: Data verified**

### Phase 4: Logic Migration
1. Create functions
2. Create triggers
3. Enable RLS on all tables
4. Create RLS policies
5. Guardian security review
6. Create indexes (CONCURRENTLY)
7. **CHECKPOINT: Logic verified, security approved**

### Phase 5: Services Migration
1. Create storage buckets with policies
2. Transfer storage objects via API
3. Deploy Edge Functions
4. Recreate pg_cron schedules
5. Recreate database webhooks
6. Document manual secrets transfer
7. **CHECKPOINT: Services verified**

### Phase 6: Validation & Cutover
1. Full health check on destination
2. Generate migration validation report
3. Present results to user
4. **DECISION: Approve / Hold / Rollback**
5. If approved: document connection string updates
6. Mark migration complete

---

## Rollback Procedures

| Phase | Rollback Action | Automated |
|-------|----------------|-----------|
| Schema | DROP all created objects | Yes |
| Data | TRUNCATE + restore from backup | Yes |
| Logic | DROP functions/triggers/policies | Yes |
| Services | DELETE buckets, undeploy functions | Partial |
| Full | pg_restore from backup | Yes |

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| MIGRATION-PLAN.md | Markdown | Approved migration plan |
| MIGRATION-VALIDATION.md | Markdown | Post-migration validation report |
| migration-scripts/ | SQL | All migration SQL scripts |
| rollback-scripts/ | SQL | All rollback SQL scripts |

---

## Validation

- [ ] All phases completed successfully
- [ ] Row counts match source and destination
- [ ] FK integrity verified
- [ ] RLS policies active and tested
- [ ] Functions and triggers working
- [ ] Storage migrated (if included)
- [ ] Edge Functions deployed (if included)
- [ ] Health check passed on destination
- [ ] User approved cutover
