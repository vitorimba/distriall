# Caching Checklist

> Checklist de configuracao e validacao de cache
> Aplicar ao implementar ou auditar estrategia de caching

---

## 1. HTTP Caching

### CRITICAL
- [ ] Assets com hash no filename: `Cache-Control: immutable, max-age=31536000`
- [ ] HTML pages: `Cache-Control: no-cache` com ETag
- [ ] Dados sensiveis: `Cache-Control: no-store`
- [ ] Compressao habilitada (Brotli preferencial, Gzip fallback)

### HIGH
- [ ] API responses publicas com `s-maxage` para CDN
- [ ] API responses privadas com `private, must-revalidate`
- [ ] ETag implementado para conteudo dinamico
- [ ] Vary headers corretos (Accept-Encoding, Authorization)

### MEDIUM
- [ ] Stale-while-revalidate para conteudo tolerante a stale
- [ ] Stale-if-error para fallback em falhas de origem
- [ ] Cache debug headers em staging (`X-Cache-Status`)

---

## 2. CDN / Edge Cache

### CRITICAL
- [ ] CDN configurado para assets estaticos
- [ ] Purge/invalidation testado e funcional
- [ ] Origin shield configurado (se aplicavel)

### HIGH
- [ ] Cache key inclui query params relevantes
- [ ] Bypass de cache para requests autenticados
- [ ] CORS headers corretos com cache
- [ ] WAF nao interfere com caching

### MEDIUM
- [ ] Edge functions para personalizacao (se necessario)
- [ ] Metricas de CDN hit rate monitoradas
- [ ] Multi-region CDN configurado

---

## 3. Application Cache (Redis)

### CRITICAL
- [ ] Eviction policy definida (allkeys-lru recomendado)
- [ ] Memory limit configurado
- [ ] TTL definido para TODAS as keys
- [ ] Nenhuma key sem TTL (exceto config permanente)

### HIGH
- [ ] Key naming convention definida e consistente
- [ ] Serialization eficiente (MessagePack > JSON)
- [ ] Connection pooling configurado
- [ ] Cluster mode para > 25GB
- [ ] Persistence (RDB/AOF) adequada ao caso de uso

### MEDIUM
- [ ] Pipeline/multi para operacoes em lote
- [ ] Pub/Sub para invalidacao event-driven
- [ ] Lua scripts para operacoes atomicas
- [ ] Slow log monitorado

---

## 4. Invalidacao

### CRITICAL
- [ ] Estrategia de invalidacao definida por tipo de dado
- [ ] Write operations invalidam cache correspondente
- [ ] Nenhum stale data > TTL maximo aceitavel
- [ ] Thundering herd prevenido (lock/stale-while-revalidate)

### HIGH
- [ ] Event-driven invalidation para dados criticos
- [ ] Cache invalidation testada para cenarios de escrita
- [ ] Invalidation em cascata controlada
- [ ] Cache key inclui version/tenant se multi-tenant

### MEDIUM
- [ ] Invalidation logging para debug
- [ ] Manual invalidation tool disponivel
- [ ] Invalidation metricas monitoradas

---

## 5. Cache Warming

### CRITICAL
- [ ] Warming strategy definida para cold start
- [ ] Top N hot keys aquecidos no deploy

### HIGH
- [ ] Background warming para keys com TTL proximo
- [ ] Warming script automatizado
- [ ] Predictive warming antes de picos conhecidos

### MEDIUM
- [ ] Warming metricas (tempo, keys aquecidas)
- [ ] Warming nao sobrecarrega origem

---

## 6. Monitoramento

### CRITICAL
- [ ] Hit rate monitorado (target > 85%)
- [ ] Memory usage monitorado
- [ ] Alerta para hit rate < 80%
- [ ] Alerta para memory > 85%

### HIGH
- [ ] Eviction rate monitorado
- [ ] Latency de operacoes monitorada (< 5ms)
- [ ] Top missed keys visivel
- [ ] Connection count monitorado

### MEDIUM
- [ ] Key distribution visivel
- [ ] TTL distribution analisada
- [ ] Slow operations alertadas

---

## Resultado

| Categoria | Critical | High | Medium | Status |
|-----------|----------|------|--------|--------|
| HTTP Caching | _/4 | _/4 | _/3 | |
| CDN/Edge | _/3 | _/4 | _/3 | |
| Application Cache | _/4 | _/5 | _/4 | |
| Invalidacao | _/4 | _/4 | _/3 | |
| Cache Warming | _/2 | _/3 | _/2 | |
| Monitoramento | _/4 | _/4 | _/3 | |

---

*Squad FastSystem — Caching Checklist v1.0.0*
