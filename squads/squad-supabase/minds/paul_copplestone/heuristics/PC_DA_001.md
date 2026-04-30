# PC_DA_001 — Composable Layer Analysis

**Expert:** Paul Copplestone
**Type:** Heuristic
**Domain:** Supabase Project Diagnostics
**Squad:** squad-supabase

---

## Purpose

A layer-by-layer diagnostic framework for Supabase projects. Each Supabase service is a composable layer built on top of Postgres. Diagnose bottom-up: if the foundation is broken, the layers above will fail regardless of their own health.

---

## Diagnostic Order: Always Bottom-Up

```
Layer 1: Database (Postgres)     ← Foundation. Diagnose FIRST.
Layer 2: Auth (GoTrue)           ← Depends on auth schema in Postgres.
Layer 3: Storage                 ← Depends on storage schema + Auth for policies.
Layer 4: Edge Functions (Deno)   ← Depends on DB client, Auth tokens.
Layer 5: Realtime                ← Depends on WAL, publication config, RLS.
```

**Rule:** Never debug Layer 5 before confirming Layers 1-4 are healthy.

---

## Layer 1: Database (Postgres)

**This is the substrate. Everything else is built on it.**

### Health Indicators

| Check | How | Healthy | Unhealthy |
|-------|-----|---------|-----------|
| Connection pool | `SELECT count(*) FROM pg_stat_activity` | < 80% of `max_connections` | > 90% or connection errors |
| Long-running queries | `SELECT * FROM pg_stat_activity WHERE state = 'active' AND duration > interval '30s'` | None | Queries stuck for minutes |
| Migration state | `supabase migration list` | All applied, no drift | Pending or failed migrations |
| Schema integrity | Check foreign keys, constraints | All constraints valid | Orphaned rows, missing FKs |
| Extensions loaded | `SELECT * FROM pg_extension` | Required extensions present | Missing pgvector, pg_graphql, etc. |
| Table bloat | `pg_stat_user_tables` — dead tuples | autovacuum keeping up | dead_tuple ratio > 20% |

### Common Issues

- Connection exhaustion: application not using pooler (use `supavisor` / port 6543)
- Missing indexes on foreign keys causing slow cascading deletes
- Large tables without partitioning strategy

---

## Layer 2: Auth (GoTrue)

**Auth is a Postgres schema (`auth.*`) managed by GoTrue.**

### Health Indicators

| Check | How | Healthy | Unhealthy |
|-------|-----|---------|-----------|
| Users table | `SELECT count(*) FROM auth.users` | Rows exist, no corruption | Orphaned identities |
| JWT configuration | Dashboard → Auth Settings | Secret configured, expiry reasonable | Default secret, expired tokens |
| Providers | Dashboard → Auth Providers | Enabled providers functional | OAuth callback errors |
| RLS on auth tables | Check `auth.users` policies | Default policies intact | Custom policies breaking auth flow |
| Rate limits | Auth logs | Normal request rate | Spike in failed attempts |

### Common Issues

- Custom RLS policies on `auth.users` blocking GoTrue internal operations
- Email templates not configured causing silent signup failures
- JWT expiry too short causing excessive token refresh load

---

## Layer 3: Storage

**Storage metadata lives in `storage.objects` and `storage.buckets`. Files live in S3-compatible backend.**

### Health Indicators

| Check | How | Healthy | Unhealthy |
|-------|-----|---------|-----------|
| Buckets configured | `SELECT * FROM storage.buckets` | Buckets exist with correct public/private settings | Missing buckets, wrong visibility |
| Storage policies | Check RLS on `storage.objects` | Policies match auth requirements | No policies (open access) or overly restrictive |
| File access | Test upload/download via client | 200 responses | 403 (policy), 413 (size limit), 500 (backend) |
| Orphaned objects | Objects in DB but not in S3 | Consistent | Metadata/file mismatch |

### Common Issues

- Missing RLS policies on `storage.objects` allowing unauthorized access
- File size limits not configured in bucket settings
- CORS not configured for client-side uploads

---

## Layer 4: Edge Functions (Deno)

**Serverless functions running on Deno runtime. Connect to Postgres via `supabase-js` or direct connection.**

### Health Indicators

| Check | How | Healthy | Unhealthy |
|-------|-----|---------|-----------|
| Deployment status | `supabase functions list` | All functions deployed | Failed deployments |
| Secrets | `supabase secrets list` | Required env vars present | Missing DATABASE_URL or API keys |
| Response times | Function logs | < 500ms cold start | > 2s or timeouts |
| Error rate | Dashboard → Edge Functions → Logs | < 1% error rate | Repeated 500s |

### Common Issues

- Using direct database connection instead of PostgREST client (bypasses RLS)
- Missing CORS headers in function responses
- Large dependencies increasing cold start time

---

## Layer 5: Realtime

**Listens to PostgreSQL WAL (Write-Ahead Log) and broadcasts changes via WebSocket.**

### Health Indicators

| Check | How | Healthy | Unhealthy |
|-------|-----|---------|-----------|
| Publication config | `SELECT * FROM pg_publication` | `supabase_realtime` publication exists with correct tables | Missing publication or tables |
| RLS on subscribed tables | Check policies | Policies filter correctly per user | No RLS = broadcasting all data to all clients |
| Channel connections | Realtime logs | Stable connections | Frequent disconnects, channel limit exceeded |
| WAL size | `SELECT pg_current_wal_lsn()` over time | Growing steadily | WAL accumulation (replication slot lag) |

### Common Issues

- Tables not added to the `supabase_realtime` publication
- RLS not enabled on tables with Realtime subscriptions (data leaks)
- Too many channels open per client exhausting server resources

---

## Diagnostic Summary Template

```markdown
## Supabase Health Report — [Project Name]

| Layer | Status | Issues |
|-------|--------|--------|
| Database | OK / WARN / FAIL | ... |
| Auth | OK / WARN / FAIL | ... |
| Storage | OK / WARN / FAIL | ... |
| Edge Functions | OK / WARN / FAIL | ... |
| Realtime | OK / WARN / FAIL | ... |

**Root Cause:** (always at the lowest unhealthy layer)
**Recommended Action:** ...
```

---

> "Debug bottom-up. If Postgres is unhealthy, nothing above it will work correctly — no matter how well configured."
> — Paul Copplestone philosophy
