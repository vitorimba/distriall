# FS-T-009: Database Indexing

> Design de estrategia de indices para otimizacao de queries

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-009 |
| **Name** | database-indexing |
| **Agent** | database-optimizer (Query) |
| **Execution Type** | Agent |
| **Responsible Executor** | database-optimizer (Query) |
| **Mind** | markus_winand |
| **Priority** | High |
| **Estimated Duration** | 2-4 hours |
| **Dependencies** | FS-T-002 (recomendado) |
| **Output** | Index strategy document + migration scripts |

---

## Descricao

Projeta uma estrategia de indexacao completa baseada em workload analysis. Cobre composite indexes, covering indexes, partial indexes, expression indexes e index maintenance. Segue a filosofia de Markus Winand: "The right index can make a query 1000x faster."

---

## Pre-Conditions

- [ ] Queries mais executadas identificadas (pg_stat_statements)
- [ ] Schema atual documentado
- [ ] Indices existentes catalogados
- [ ] Workload profile (read/write ratio)
- [ ] Ambiente com dados representativos

---

## Steps

### Step 1: Workload Analysis

**Objetivo:** Entender quais queries dominam o workload

```sql
-- Top queries por tempo total
SELECT queryid, query, calls, total_exec_time,
       mean_exec_time, rows,
       shared_blks_hit, shared_blks_read
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 30;

-- Read vs Write ratio
SELECT
  SUM(CASE WHEN query ~* '^select' THEN calls ELSE 0 END) as reads,
  SUM(CASE WHEN query ~* '^(insert|update|delete)' THEN calls ELSE 0 END) as writes,
  ROUND(
    SUM(CASE WHEN query ~* '^select' THEN calls ELSE 0 END)::numeric /
    NULLIF(SUM(calls), 0) * 100, 2
  ) as read_pct
FROM pg_stat_statements;
```

### Step 2: Audit de Indices Existentes

**Objetivo:** Identificar indices inuteis e gaps

```sql
-- Indices nao utilizados
SELECT s.schemaname, s.relname AS table, s.indexrelname AS index,
       s.idx_scan AS scans,
       pg_size_pretty(pg_relation_size(s.indexrelid)) AS size
FROM pg_stat_user_indexes s
JOIN pg_index i ON s.indexrelid = i.indexrelid
WHERE s.idx_scan = 0
AND NOT i.indisunique
ORDER BY pg_relation_size(s.indexrelid) DESC;

-- Indices duplicados
SELECT a.indrelid::regclass AS table,
       a.indexrelid::regclass AS index_a,
       b.indexrelid::regclass AS index_b
FROM pg_index a
JOIN pg_index b ON a.indrelid = b.indrelid
  AND a.indexrelid < b.indexrelid
  AND a.indkey::text = LEFT(b.indkey::text, LENGTH(a.indkey::text));

-- Missing indexes (sequential scans em tabelas grandes)
SELECT schemaname, relname, seq_scan, seq_tup_read,
       idx_scan, n_live_tup
FROM pg_stat_user_tables
WHERE seq_scan > 0
AND n_live_tup > 10000
ORDER BY seq_tup_read DESC
LIMIT 20;
```

### Step 3: Design de Composite Indexes

**Objetivo:** Projetar indices compostos eficientes

```
Regra de ordenacao de colunas:
1. Equality conditions (WHERE col = value)
2. Range conditions (WHERE col > value)
3. ORDER BY / GROUP BY columns

Exemplo:
Query: SELECT * FROM orders
       WHERE user_id = 123
       AND status = 'active'
       AND created_at > '2024-01-01'
       ORDER BY created_at DESC;

Index: CREATE INDEX idx_orders_user_status_date
       ON orders (user_id, status, created_at DESC);
```

### Step 4: Covering Indexes (INCLUDE)

**Objetivo:** Eliminar table lookups com covering indexes

```sql
-- Query que precisa de poucas colunas
SELECT id, total, status FROM orders WHERE user_id = 123;

-- Covering index (PostgreSQL 11+)
CREATE INDEX idx_orders_user_covering
ON orders (user_id) INCLUDE (id, total, status);
-- Index-only scan: sem ir na tabela
```

### Step 5: Partial Indexes

**Objetivo:** Reduzir tamanho de indices com filtros

```sql
-- Apenas pedidos ativos (90% das queries)
CREATE INDEX idx_orders_active
ON orders (user_id, created_at)
WHERE status IN ('active', 'pending');

-- Apenas usuarios nao deletados
CREATE INDEX idx_users_active
ON users (email)
WHERE deleted_at IS NULL;
```

### Step 6: Expression Indexes

**Objetivo:** Indexar expressoes usadas em queries

```sql
-- Case-insensitive search
CREATE INDEX idx_users_email_lower
ON users (lower(email));

-- JSONB field
CREATE INDEX idx_settings_theme
ON user_settings ((settings->>'theme'));

-- Date truncation
CREATE INDEX idx_events_date
ON events (date_trunc('day', created_at));
```

### Step 7: Impacto em Writes

**Objetivo:** Avaliar custo de indices em operacoes de escrita

```
Cada index adiciona overhead a:
- INSERT: ~10-20% por index
- UPDATE (coluna indexada): ~10-20% por index
- DELETE: cleanup necessario

Regras:
- Tabelas write-heavy: < 5 indices
- Tabelas read-heavy: ok ter mais indices
- Indices nao utilizados: REMOVER sempre
- Reindex periodico para bloat
```

### Step 8: Migration Scripts e Rollout

**Objetivo:** Criar scripts de migracao seguros

```sql
-- Criar index sem bloquear tabela
CREATE INDEX CONCURRENTLY idx_orders_user_status
ON orders (user_id, status);

-- Verificar progresso
SELECT * FROM pg_stat_progress_create_index;

-- Remover indices inuteis
DROP INDEX CONCURRENTLY idx_old_unused;

-- Reindex para reduzir bloat
REINDEX INDEX CONCURRENTLY idx_orders_user_status;
```

---

## Post-Conditions

- [ ] Workload analysis documentada
- [ ] Indices inuteis identificados para remocao
- [ ] Novos indices projetados com justificativa
- [ ] Migration scripts criados (CONCURRENTLY)
- [ ] Impacto em writes documentado

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-080 | Index criado sem analise de workload | BLOCK |
| FS-V-081 | CREATE INDEX sem CONCURRENTLY em producao | BLOCK |
| FS-V-082 | > 8 indices em tabela write-heavy | WARN |
| FS-V-083 | Index duplicado | BLOCK |
| FS-V-084 | Remocao de index sem verificar uso | BLOCK |

---

## Quality Gates

- [ ] Todas sequential scans em tabelas > 10K rows eliminadas
- [ ] Indices nao utilizados removidos
- [ ] Covering indexes para top 5 queries
- [ ] Migration com CONCURRENTLY
- [ ] Impacto em writes < 15% degradacao

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| `pg_stat_statements` | Query workload |
| `pg_stat_user_indexes` | Index usage |
| `EXPLAIN ANALYZE` | Plan verification |
| `pganalyze` | Automated recommendations |
| `dexter` | Automatic index suggestions |

---

## Referencia

- Markus Winand, "SQL Performance Explained", 2012
- Use The Index, Luke: https://use-the-index-luke.com/

---

*Task FS-T-009 v1.0.0 — Squad FastSystem*
