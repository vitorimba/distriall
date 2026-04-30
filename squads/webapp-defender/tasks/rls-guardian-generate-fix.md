<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: rls-guardian-generate-fix
  task_name: Generate RLS Fix
  status: active
  responsible_executor: 'rls-guardian'
  execution_type: Worker
  estimated_time: 30m
  domain: Tactical
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

<!-- SINKRA_CONTRACT:START -->
```yaml
sinkra_contract:
  Domain: Tactical
  atomic_layer: Atom
  executor: Worker
  pre_condition: "inputs e dependencias resolvidos antes de iniciar."
  post_condition: "output principal gerado e pronto para handoff."
  performance: "executar dentro do SLA, registrar erro e escalar sem falha silenciosa."
```
<!-- SINKRA_CONTRACT:END -->

---
task: generateRlsFix()
responsavel: "@rls-guardian"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: table_name
    tipo: string
    origem: User Input or audit results
    obrigatorio: true
  - campo: table_columns
    tipo: array
    origem: Schema
    obrigatorio: false
  - campo: access_pattern
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "own-data | role-based | admin-only | public-read"

Saida:
  - campo: sql_fix
    tipo: string
    destino: Console / File
    persistido: true

Checklist:
  - "[ ] Determine table structure"
  - "[ ] Ask user about access pattern (if not provided)"
  - "[ ] Generate ENABLE RLS statement"
  - "[ ] Generate SELECT policy"
  - "[ ] Generate INSERT policy"
  - "[ ] Generate UPDATE policy"
  - "[ ] Generate DELETE policy"
  - "[ ] Generate verification query"
---

# Generate RLS Fix

## Purpose

Generate complete RLS policy SQL for a specific table based on the desired access pattern.

## Access Patterns

### own-data (most common)
Users can only access their own records via `auth.uid() = user_id`.

### role-based
Access depends on user role (admin sees all, user sees own).

### admin-only
Only admin/owner roles can access.

### public-read
Anyone can read, only authenticated can write own data.

## Elicitation

```
? Table name: {table}
? Which access pattern?
  1. own-data — Users see only their own records
  2. role-based — Access depends on role (admin/user)
  3. admin-only — Only admins can access
  4. public-read — Anyone reads, auth writes own
> {choice}

? Does the table have a user_id column? (y/n)
? What column links to the user? {column_name}
```

## Output

Complete SQL migration with:
1. `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
2. `ALTER TABLE ... FORCE ROW LEVEL SECURITY`
3. Policies for all 4 operations
4. Verification query

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
