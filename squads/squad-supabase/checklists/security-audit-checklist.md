# Security Audit Checklist

**Checklist ID:** security-audit
**Version:** 1.0.0
**Gate:** QG-004 (Security Review)
**Agent:** guardian (Shield)
**Blocking:** Yes — security failures block all operations

---

## Row Level Security (RLS)

- [ ] **CRITICAL** RLS enabled on ALL public tables
- [ ] **CRITICAL** No public table without at least one policy
- [ ] SELECT policies use proper `auth.uid()` or `auth.jwt()` checks
- [ ] INSERT policies include WITH CHECK clause
- [ ] UPDATE policies have both USING and WITH CHECK
- [ ] DELETE policies are restrictive (not overly broad)
- [ ] Policies use LEAKPROOF functions only (for index performance)
- [ ] No `USING (true)` on tables with sensitive data
- [ ] Permissive vs Restrictive policies correctly combined
- [ ] Policies tested with anon, authenticated, and service_role

## Roles & Permissions

- [ ] **CRITICAL** `anon` role has minimal permissions
- [ ] **CRITICAL** `service_role` key NOT exposed in client code
- [ ] `authenticated` role permissions are appropriate
- [ ] Custom roles properly scoped
- [ ] No role has SUPERUSER privileges (except postgres)
- [ ] GRANT statements follow least privilege principle
- [ ] No `GRANT ALL` on public schema tables

## Functions & Triggers

- [ ] **CRITICAL** SECURITY DEFINER functions justified and documented
- [ ] SECURITY INVOKER preferred where possible
- [ ] Functions validate input parameters
- [ ] No SQL injection in dynamic SQL (use `format()` or `quote_literal()`)
- [ ] Trigger functions don't bypass RLS unintentionally
- [ ] No `SET search_path` vulnerabilities

## API & Keys

- [ ] **CRITICAL** `anon` key only in client-side code
- [ ] **CRITICAL** `service_role` key only in server-side code
- [ ] API rate limiting configured
- [ ] CORS settings appropriate (not `*` in production)
- [ ] JWT expiration configured
- [ ] Custom claims validated in RLS policies

## Storage Security

- [ ] Storage buckets have appropriate policies
- [ ] Public buckets intentional and documented
- [ ] File upload size limits configured
- [ ] File type restrictions in place
- [ ] No sensitive files in public buckets

## Edge Functions Security

- [ ] Environment secrets properly stored (not hardcoded)
- [ ] Input validation on all Edge Function parameters
- [ ] CORS headers properly set
- [ ] Authentication verified in protected functions
- [ ] Error messages don't leak internal details

## Realtime Security

- [ ] Realtime subscriptions respect RLS policies
- [ ] No sensitive tables exposed to Realtime without RLS
- [ ] Broadcast channels properly authenticated
- [ ] Presence channels scoped appropriately

## Data Protection

- [ ] Sensitive data columns identified and documented
- [ ] PII (Personally Identifiable Information) protected
- [ ] Encryption at rest enabled (Supabase default)
- [ ] SSL/TLS enforced for connections
- [ ] Audit logging enabled for sensitive operations

---

## Scoring

| Category | Items | Critical |
|----------|-------|----------|
| RLS | 10 | 2 |
| Roles & Permissions | 7 | 2 |
| Functions & Triggers | 6 | 1 |
| API & Keys | 6 | 2 |
| Storage | 5 | 0 |
| Edge Functions | 5 | 0 |
| Realtime | 4 | 0 |
| Data Protection | 5 | 0 |
| **Total** | **48** | **7** |

**Pass criteria:** ALL 7 critical items + at least 75% of total
**Fail criteria:** ANY critical item unchecked = BLOCK
**Severity levels:**
- Critical unchecked → BLOCK (cannot proceed)
- Non-critical unchecked → WARNING (document and plan fix)
