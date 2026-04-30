# Pre-Deployment Performance Checklist

> Verificacoes de performance obrigatorias antes de deploy em producao
> Severidade: CRITICAL = bloqueia deploy | HIGH = requer justificativa | MEDIUM = recomendado

---

## 1. Build & Bundle (Frontend)

### CRITICAL
- [ ] Bundle principal < 200KB gzipped
- [ ] Total JavaScript < 400KB gzipped
- [ ] Total CSS < 100KB gzipped
- [ ] Nenhuma dependencia duplicada no bundle
- [ ] Tree-shaking funcionando (no dead code)

### HIGH
- [ ] Code splitting implementado para rotas
- [ ] Imagens otimizadas (WebP/AVIF com fallback)
- [ ] Fontes com font-display: swap ou optional
- [ ] Source maps gerados (nao incluidos no deploy)
- [ ] Assets com content hash no filename

### MEDIUM
- [ ] Bundle analyzer executado e revisado
- [ ] Nenhuma dependencia com vulnerabilidade critica
- [ ] Polyfills limitados ao necessario

---

## 2. API & Backend

### CRITICAL
- [ ] p95 response time < 500ms para hot paths
- [ ] Nenhum N+1 query em hot paths
- [ ] Pagination em todas as listas (max 100 items)
- [ ] Rate limiting configurado
- [ ] Connection pool dimensionado

### HIGH
- [ ] Nenhum SELECT * em queries de API
- [ ] Serialization otimizada (campos necessarios)
- [ ] Compression habilitada (Brotli/Gzip)
- [ ] Health check endpoint funcional
- [ ] Error handling nao expoe stack traces

### MEDIUM
- [ ] Response caching configurado onde aplicavel
- [ ] Request validation no entry point
- [ ] Logging estruturado sem dados sensiveis

---

## 3. Database

### CRITICAL
- [ ] Nenhum sequential scan em tabelas > 10K rows em hot paths
- [ ] Migrations testadas em ambiente com dados reais
- [ ] Rollback script preparado para cada migration
- [ ] Indices novos criados com CONCURRENTLY

### HIGH
- [ ] EXPLAIN ANALYZE executado para queries novas/modificadas
- [ ] Connection pool max < max_connections do DB
- [ ] Nenhuma query com execution time > 1s
- [ ] Foreign keys com indices

### MEDIUM
- [ ] Indices nao utilizados identificados
- [ ] Vacuum/analyze recente nas tabelas afetadas
- [ ] Schema changes sao backward compatible

---

## 4. Caching

### CRITICAL
- [ ] Cache-Control headers corretos para assets
- [ ] Assets hasheados com immutable cache
- [ ] Nenhum cache de dados sensiveis sem encriptacao

### HIGH
- [ ] Cache invalidation testada para cenarios de escrita
- [ ] Redis/Cache hit rate > 80%
- [ ] TTLs definidos para todos os cache keys
- [ ] CDN configurado e testado

### MEDIUM
- [ ] Cache warming script preparado
- [ ] Eviction policy configurada (allkeys-lru recomendado)

---

## 5. Infraestrutura

### CRITICAL
- [ ] Auto-scaling configurado e testado
- [ ] Rollback procedure documentado e testado
- [ ] Health checks (liveness + readiness) configurados
- [ ] Secrets nao hardcoded no codigo

### HIGH
- [ ] CPU headroom > 30% em estado normal
- [ ] Memory headroom > 20% em estado normal
- [ ] Disk space headroom > 20%
- [ ] Monitoring e alertas ativos

### MEDIUM
- [ ] Blue-green ou canary deployment configurado
- [ ] Log rotation configurado
- [ ] Backup recente verificado

---

## 6. Resiliencia

### CRITICAL
- [ ] Timeouts configurados em todas as chamadas externas
- [ ] Circuit breakers em dependencias criticas
- [ ] Graceful shutdown implementado

### HIGH
- [ ] Retry com exponential backoff (max 3)
- [ ] Fallback definido para servicos criticos
- [ ] Bulkhead/isolation entre componentes

### MEDIUM
- [ ] Chaos testing executado (opcional)
- [ ] Runbook de incidentes atualizado

---

## 7. Observabilidade

### CRITICAL
- [ ] Metricas de negocio instrumentadas
- [ ] Alertas de producao configurados
- [ ] Distributed tracing ativo

### HIGH
- [ ] Dashboard de performance atualizado
- [ ] SLO/SLI definidos e monitorados
- [ ] Log aggregation funcionando

### MEDIUM
- [ ] Custom metrics para novos features
- [ ] Error tracking (Sentry/similar) configurado

---

## Resultado

| Categoria | Critical | High | Medium | Status |
|-----------|----------|------|--------|--------|
| Build & Bundle | _/5 | _/5 | _/3 | |
| API & Backend | _/5 | _/5 | _/3 | |
| Database | _/4 | _/4 | _/3 | |
| Caching | _/3 | _/4 | _/2 | |
| Infraestrutura | _/4 | _/4 | _/3 | |
| Resiliencia | _/3 | _/3 | _/2 | |
| Observabilidade | _/3 | _/3 | _/2 | |

**Deploy aprovado:** [ ] Sim  [ ] Nao
**Aprovador:** {{approver}}
**Data:** {{date}}

---

*Squad FastSystem — Pre-Deployment Performance Checklist v1.0.0*
