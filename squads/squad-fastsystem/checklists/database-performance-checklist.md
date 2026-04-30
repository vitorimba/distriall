# Database Performance Checklist

> Checklist de otimizacao de banco de dados
> Aplicar antes de releases e durante auditorias de performance

---

## 1. Query Performance

### CRITICAL
- [ ] pg_stat_statements habilitado e revisado
- [ ] Top 10 queries por tempo total otimizadas
- [ ] Nenhum Seq Scan em tabelas > 10K rows em hot paths
- [ ] Nenhuma query com execution time > 1s em hot paths
- [ ] N+1 queries eliminadas

### HIGH
- [ ] EXPLAIN ANALYZE executado para queries criticas
- [ ] Queries com JOIN otimizadas (join order, join type)
- [ ] Subqueries correlacionadas convertidas para JOIN
- [ ] COUNT(*) substituido por EXISTS onde apropriado
- [ ] LIKE '%pattern' evitado (usar full-text search)

### MEDIUM
- [ ] Prepared statements utilizados
- [ ] Query plan cache efetivo
- [ ] Statistics atualizadas (ANALYZE recente)

---

## 2. Indexacao

### CRITICAL
- [ ] Todas as foreign keys com indices
- [ ] Indices compostos com ordem correta (equality → range → sort)
- [ ] Nenhum indice duplicado
- [ ] Nenhum indice nao utilizado (idx_scan = 0)

### HIGH
- [ ] Covering indexes para top 5 queries (INCLUDE)
- [ ] Partial indexes para queries com WHERE frequente
- [ ] Expression indexes para funcoes em WHERE
- [ ] Indices criados com CONCURRENTLY em producao
- [ ] Index bloat verificado e reindexado se necessario

### MEDIUM
- [ ] Total de indices por tabela razoavel (< 8 para write-heavy)
- [ ] Index size monitorado
- [ ] GIN/GiST para JSONB e full-text quando aplicavel

---

## 3. Schema Design

### CRITICAL
- [ ] Tipos de dados corretos (nao usar TEXT para tudo)
- [ ] NOT NULL constraints onde aplicavel
- [ ] Primary keys definidas em todas as tabelas
- [ ] Foreign keys com ON DELETE definido

### HIGH
- [ ] Normalizacao adequada (3NF minimo)
- [ ] Desnormalizacao justificada e documentada
- [ ] Partitioning para tabelas > 100M rows
- [ ] ENUM types para valores fixos

### MEDIUM
- [ ] Naming convention consistente
- [ ] Comments em tabelas e colunas criticas
- [ ] Default values definidos onde aplicavel

---

## 4. Connection Management

### CRITICAL
- [ ] Connection pooler (PgBouncer) configurado
- [ ] Pool size adequado: cores * 2 + disks
- [ ] max_connections nao excedido
- [ ] Idle connections com timeout

### HIGH
- [ ] Transaction mode no pooler (para web apps)
- [ ] Connection validation habilitada
- [ ] Connection lifetime max configurado
- [ ] Monitoring de connections ativas

### MEDIUM
- [ ] Statement timeout configurado (30s max)
- [ ] Lock timeout configurado
- [ ] Idle in transaction timeout configurado

---

## 5. Configuracao do PostgreSQL

### CRITICAL
- [ ] shared_buffers = 25% da RAM
- [ ] effective_cache_size = 75% da RAM
- [ ] work_mem ajustado para workload
- [ ] random_page_cost = 1.1 para SSD

### HIGH
- [ ] wal_buffers = 64MB
- [ ] checkpoint_completion_target = 0.9
- [ ] max_wal_size adequado
- [ ] log_min_duration_statement configurado

### MEDIUM
- [ ] default_statistics_target = 100+
- [ ] maintenance_work_mem = 1GB+
- [ ] huge_pages habilitado (se disponivel)

---

## 6. Monitoramento

### CRITICAL
- [ ] Slow query log ativo
- [ ] Metricas de conexoes monitoradas
- [ ] Disk space com alerta
- [ ] Replication lag monitorado (se aplicavel)

### HIGH
- [ ] Dashboard de database performance
- [ ] Cache hit ratio monitorado (> 99%)
- [ ] Transaction rate monitorado
- [ ] Dead tuples / bloat monitorado

### MEDIUM
- [ ] pgbadger configurado para log analysis
- [ ] Backup monitoring ativo
- [ ] Vacuum stats monitorados

---

## 7. Migrations

### CRITICAL
- [ ] Migrations testadas com volume de dados real
- [ ] Rollback script preparado
- [ ] CREATE INDEX CONCURRENTLY para producao
- [ ] ALTER TABLE sem lock exclusivo quando possivel

### HIGH
- [ ] Schema changes backward compatible
- [ ] Data migrations separadas de schema migrations
- [ ] Tempo estimado de migration documentado

---

## Resultado

| Categoria | Critical OK | High OK | Medium OK |
|-----------|------------|---------|-----------|
| Query Performance | _/5 | _/5 | _/3 |
| Indexacao | _/4 | _/5 | _/3 |
| Schema Design | _/4 | _/4 | _/3 |
| Connection Mgmt | _/4 | _/4 | _/3 |
| PostgreSQL Config | _/4 | _/3 | _/3 |
| Monitoramento | _/4 | _/4 | _/3 |
| Migrations | _/3 | _/3 | — |

---

*Squad FastSystem — Database Performance Checklist v1.0.0*
