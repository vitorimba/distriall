<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: fs-query-optimization
  task_name: Query Optimization
  status: active
  responsible_executor: '@database-optimizer'
  execution_type: Agent
  estimated_time: 1-3h
  domain: Operational
  input:
  - Consultar a secao de inputs no corpo da task
  output:
  - Consultar a secao de outputs no corpo da task
  action_items:
  - Identificacao de queries problematicas (slow query log, pg_stat_statements)
  - Analise de execution plan com EXPLAIN ANALYZE
  - Analise de indices existentes e identificacao de gaps
  - Reescrita de queries para melhor performance
  - Design de novos indices (compostos, covering, partial)
  - Otimizacao de parametros do banco (work_mem, random_page_cost)
  - Validacao de melhorias com metricas antes/depois
  - Documentacao de todas as mudancas
  acceptance_criteria:
  - EXPLAIN ANALYZE executado para todas as queries alvo
  - Melhoria >= 30% em execution time
  - Nenhum Seq Scan em tabelas > 10K rows em hot paths
  - Indices nao utilizados identificados e removidos
  - Documentacao de antes/depois completa
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

# FS-T-002: Query Optimization

> Otimizacao de queries SQL com analise de execution plans, indexacao e reescrita

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-002 |
| **Name** | query-optimization |
| **Agent** | database-optimizer (Query) |
| **Execution Type** | Agent |
| **Responsible Executor** | database-optimizer (Query) |
| **Mind** | markus_winand |
| **Priority** | High |
| **Estimated Duration** | 1-3 hours |
| **Dependencies** | FS-T-001 (recomendado) |
| **Output** | Queries otimizadas + documentacao de mudancas |

---

## Descricao

Analisa e otimiza queries SQL que foram identificadas como lentas ou ineficientes. Utiliza EXPLAIN ANALYZE para entender execution plans, identifica missing indexes, reescreve queries para melhor performance e valida melhorias com metricas.

Segue a filosofia de Markus Winand: "Indexing is not about adding indexes, it's about understanding how the database uses them."

---

## Pre-Conditions

- [ ] Queries lentas identificadas (slow query log, APM, diagnostico)
- [ ] Acesso ao banco de dados com permissao de EXPLAIN
- [ ] Volume de dados representativo (nao usar DB vazio)
- [ ] Baseline de tempo de execucao documentado
- [ ] Schema atual documentado ou acessivel

---

## Steps

### Step 1: Identificacao de Queries Problematicas

**Objetivo:** Listar e priorizar queries que precisam de otimizacao

```sql
-- PostgreSQL: Top queries por tempo total
SELECT query, calls, total_exec_time, mean_exec_time,
       rows, shared_blks_hit, shared_blks_read
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;

-- Queries com mais de 100ms de media
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
WHERE mean_exec_time > 100
ORDER BY total_exec_time DESC;

-- Slow query log
-- postgresql.conf: log_min_duration_statement = 100
```

**Criterios de priorizacao:**
1. Frequencia x Tempo medio = Impacto total
2. Queries em hot paths (checkout, login, feed)
3. Queries com full table scan em tabelas grandes

### Step 2: Analise de Execution Plan

**Objetivo:** Entender como o banco executa cada query

```sql
-- EXPLAIN com detalhes completos
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT ... ;

-- EXPLAIN em formato JSON para ferramentas
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT ... ;
```

**O que procurar no plan:**
- `Seq Scan` em tabelas > 10K rows = precisa de index
- `Nested Loop` com tabela grande no inner = precisa de hash/merge join
- `Sort` sem index = precisa de index com ORDER BY
- `Hash Join` com high bucket count = memoria insuficiente para work_mem
- `Bitmap Heap Scan` com muitas recheck = index nao seletivo

**Heuristica aplicada:** MW_SQL_001 — "Analise o execution plan ANTES de adicionar qualquer indice"

### Step 3: Analise de Indices Existentes

**Objetivo:** Avaliar indices atuais e identificar gaps

```sql
-- Indices existentes
SELECT schemaname, tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Uso dos indices
SELECT schemaname, relname, indexrelname,
       idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;

-- Indices nao utilizados
SELECT indexrelid::regclass AS index,
       relid::regclass AS table,
       idx_scan AS scans
FROM pg_stat_user_indexes
WHERE idx_scan = 0
AND indexrelid NOT IN (
    SELECT indexrelid FROM pg_constraint
    WHERE contype IN ('p', 'u')
);

-- Tamanho dos indices
SELECT pg_size_pretty(pg_indexes_size('table_name'));
```

### Step 4: Reescrita de Queries

**Objetivo:** Reescrever queries para melhor performance

**Padroes comuns de otimizacao:**

```sql
-- RUIM: SELECT *
SELECT * FROM orders WHERE user_id = 123;
-- BOM: Selecionar apenas colunas necessarias
SELECT id, status, total FROM orders WHERE user_id = 123;

-- RUIM: Subquery correlacionada
SELECT u.name, (SELECT COUNT(*) FROM orders WHERE user_id = u.id)
FROM users u;
-- BOM: JOIN
SELECT u.name, COUNT(o.id)
FROM users u LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.name;

-- RUIM: OR em colunas diferentes
SELECT * FROM products WHERE name = 'X' OR category = 'Y';
-- BOM: UNION ALL
SELECT * FROM products WHERE name = 'X'
UNION ALL
SELECT * FROM products WHERE category = 'Y' AND name != 'X';

-- RUIM: LIKE com wildcard no inicio
SELECT * FROM users WHERE email LIKE '%@gmail.com';
-- BOM: Reverse index ou full-text search
CREATE INDEX idx_email_reverse ON users (reverse(email));

-- RUIM: COUNT(*) para existencia
SELECT COUNT(*) FROM orders WHERE user_id = 123;
-- BOM: EXISTS
SELECT EXISTS(SELECT 1 FROM orders WHERE user_id = 123);
```

### Step 5: Design de Novos Indices

**Objetivo:** Criar indices otimizados para as queries reescritas

```sql
-- Index composto (ordem importa!)
-- Regra: Equality first, Range last, ORDER BY in between
CREATE INDEX idx_orders_user_status_date
ON orders (user_id, status, created_at DESC);

-- Covering index (evita table lookup)
CREATE INDEX idx_orders_covering
ON orders (user_id) INCLUDE (status, total, created_at);

-- Partial index (reduz tamanho)
CREATE INDEX idx_orders_active
ON orders (user_id, created_at)
WHERE status = 'active';

-- Expression index
CREATE INDEX idx_users_email_lower
ON users (lower(email));
```

**Heuristica aplicada:** MW_SQL_002 — "Um indice composto bem projetado substitui multiplos indices simples"

### Step 6: Otimizacao de Parametros

**Objetivo:** Ajustar parametros do banco para melhor performance

```sql
-- work_mem: memoria para sorts e hash joins
SET work_mem = '256MB';  -- testar por sessao antes de global

-- effective_cache_size: hint para planner
SET effective_cache_size = '4GB';

-- random_page_cost: ajustar para SSD
SET random_page_cost = 1.1;  -- default 4.0 e para HDD

-- Verificar configuracao atual
SHOW ALL;
```

### Step 7: Validacao de Melhorias

**Objetivo:** Confirmar que as otimizacoes melhoraram performance

```sql
-- Re-executar EXPLAIN ANALYZE
EXPLAIN (ANALYZE, BUFFERS) SELECT ... ;

-- Comparar metricas antes/depois
-- Documentar: execution time, rows scanned, buffers hit/read
```

**Criterios de aceitacao:**
- Execution time reduzido em >= 50%
- Seq Scans eliminados em tabelas > 10K rows
- Buffer hits ratio > 95%

### Step 8: Documentacao

**Objetivo:** Documentar todas as mudancas para rastreabilidade

```markdown
## Query Optimization Report

### Query: [nome/descricao]
- **Antes:** [execution time, plan summary]
- **Depois:** [execution time, plan summary]
- **Melhoria:** [percentual]
- **Mudancas:** [indices criados, query reescrita, params ajustados]
- **Risco:** [impacto em writes, espaco em disco]
```

---

## Post-Conditions

- [ ] Todas as queries identificadas foram analisadas
- [ ] Execution plans documentados (antes e depois)
- [ ] Indices criados com justificativa
- [ ] Queries reescritas com testes
- [ ] Metricas de melhoria documentadas
- [ ] Impacto em writes avaliado (indices novos)

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-010 | Index criado sem EXPLAIN ANALYZE previo | BLOCK |
| FS-V-011 | Query reescrita sem validacao de resultado | BLOCK |
| FS-V-012 | Otimizacao sem baseline documentado | BLOCK |
| FS-V-013 | Index em tabela de alta escrita sem analise de impacto | WARN |
| FS-V-014 | Mudanca de parametro global sem teste isolado | BLOCK |

---

## Quality Gates

- [ ] EXPLAIN ANALYZE executado para todas as queries alvo
- [ ] Melhoria >= 30% em execution time
- [ ] Nenhum Seq Scan em tabelas > 10K rows em hot paths
- [ ] Indices nao utilizados identificados e removidos
- [ ] Documentacao de antes/depois completa

---

## Metricas de Sucesso

| Metrica | Target |
|---------|--------|
| Reducao de execution time | >= 50% |
| Buffer hit ratio | > 95% |
| Seq Scans eliminados | 100% em hot paths |
| Indices criados | Justificados com EXPLAIN |
| Impacto em writes | < 10% degradacao |

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| `EXPLAIN ANALYZE` | Execution plan analysis |
| `pg_stat_statements` | Query statistics |
| `pg_stat_user_indexes` | Index usage stats |
| `pgbadger` | Log analysis |
| `pganalyze` | Automated insights |
| `auto_explain` | Automatic plan logging |

---

## Referencia

- Markus Winand, "SQL Performance Explained", 2012
- Use The Index, Luke: https://use-the-index-luke.com/
- PostgreSQL EXPLAIN documentation

---

*Task FS-T-002 v1.0.0 — Squad FastSystem*
