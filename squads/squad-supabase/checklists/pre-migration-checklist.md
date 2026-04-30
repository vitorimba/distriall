# Pre-Migration Checklist

**Checklist ID:** pre-migration
**Version:** 1.0.0
**Gate:** QG-006 (Rollback & Recovery)
**Agent:** migrator (Voyager)
**Blocking:** Yes — migration CANNOT proceed without all critical items checked

---

## Source Project Assessment

- [ ] **CRITICAL** Source project URL and ref documented
- [ ] **CRITICAL** Admin access to source project confirmed
- [ ] Schema fully mapped (tables, columns, types, constraints)
- [ ] Row counts documented per table
- [ ] Total database size documented
- [ ] Custom types and enums listed
- [ ] Foreign key dependency graph generated
- [ ] Functions and triggers inventoried
- [ ] RLS policies documented
- [ ] Extensions list captured (with versions)
- [ ] pg_cron jobs documented
- [ ] Database webhooks documented
- [ ] Edge Functions list and source code accessible
- [ ] Storage buckets and total size documented
- [ ] Auth users count documented
- [ ] Secrets/environment variables list (names only, not values)

## Destination Project Setup

- [ ] **CRITICAL** Destination project created and accessible
- [ ] **CRITICAL** Admin access to destination confirmed
- [ ] Destination is clean OR existing state documented
- [ ] Same Supabase plan tier (or higher) than source
- [ ] Required extensions enabled on destination
- [ ] Region selected (same as source recommended for speed)

## Backup & Recovery

- [ ] **CRITICAL** Full pg_dump backup of source created
- [ ] **CRITICAL** Backup file verified (pg_restore --list)
- [ ] **CRITICAL** Rollback scripts generated for each phase
- [ ] **CRITICAL** Rollback scripts dry-run tested
- [ ] PITR availability confirmed (Pro plan+)
- [ ] Backup stored in separate location (not just source project)
- [ ] Recovery time estimate documented and communicated

## Security Pre-Check

- [ ] RLS policies exportable and compatible with destination
- [ ] Role differences between source/destination documented
- [ ] Service role key for destination secured
- [ ] API key rotation plan (if needed)
- [ ] No secrets hardcoded in functions or policies

## Downtime & Communication

- [ ] Maintenance window agreed with stakeholders
- [ ] Application downtime plan (if applicable)
- [ ] Connection string update plan documented
- [ ] Client notification (if user-facing downtime)
- [ ] Monitoring setup for post-migration

## Migration Scripts

- [ ] Schema migration script generated and reviewed
- [ ] Data migration script generated (dependency-ordered)
- [ ] Auth users migration script (special handling)
- [ ] Functions migration script
- [ ] Triggers migration script
- [ ] RLS policies migration script
- [ ] Index creation script (run last)
- [ ] Storage migration plan (API-based)
- [ ] Edge Functions deployment plan

---

## Scoring

| Category | Items | Critical |
|----------|-------|----------|
| Source Assessment | 16 | 2 |
| Destination Setup | 6 | 2 |
| Backup & Recovery | 7 | 4 |
| Security | 5 | 0 |
| Downtime | 5 | 0 |
| Migration Scripts | 9 | 0 |
| **Total** | **48** | **8** |

**Pass criteria:** ALL 8 critical items + at least 80% of total items checked
**Block criteria:** ANY critical item unchecked
