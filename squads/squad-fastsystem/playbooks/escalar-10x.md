# Playbook: Preparar Sistema para 10x de Trafego

> **Trigger:** Crescimento esperado (lancamento, evento, crescimento organico)
> **Urgencia:** Planejada — preparar com antecedencia
> **Tempo estimado:** 1-3 semanas
> **Agentes envolvidos:** Blaze (lead), Probe, Query, Cache, Shield, Surge, Mesh

---

## Visao Geral

Este playbook prepara o sistema para suportar 10x a carga atual mantendo performance dentro dos budgets. Cobre todas as camadas: compute, database, cache, frontend, API e resiliencia.

**Premissa:** O sistema atual funciona bem na carga atual. O objetivo e garantir que continue funcionando bem com 10x.

---

## Semana 1: Assessment e Baseline

### Dia 1-2: Baseline Completo

**Capturar metricas atuais:**

```
Trafego atual:
- Peak req/s: ___
- Peak concurrent users: ___
- Daily transactions: ___
- Daily active users: ___
- Data growth/month: ___

Performance atual:
- API p95: ___ ms
- API p99: ___ ms
- Error rate: ___%
- LCP: ___ s
- TTFB: ___ ms

Recursos atuais:
- App servers: ___ x (specs)
- Database: ___ (specs, utilization %)
- Cache: ___ (specs, memory %)
- CDN: ___ (bandwidth)
```

- [ ] Baseline completo documentado
- [ ] Load test baseline executado (carga atual)

### Dia 2-3: Capacity Assessment

**Para cada componente, calcular headroom:**

```
Componente: App Server
- Capacidade atual: 200 req/s por instancia
- Instancias atuais: 3
- Capacidade total: 600 req/s
- Peak atual: 150 req/s (25% utilization)
- Target 10x: 1500 req/s
- Instancias necessarias: ceil(1500/200) + buffer = 9
- Acao: Configurar auto-scaling 2-12 instancias
```

Repetir para: Database, Cache, CDN, Message Queue, Storage.

- [ ] Capacity assessment para todos os componentes
- [ ] Gaps identificados e quantificados

### Dia 3-4: Bottleneck Prediction

**Identificar o que vai quebrar primeiro em 10x:**

```
Ranking de risco (revisar cada item):
1. Database connections (pool size suficiente?)
2. Database query performance (queries que degradam com volume?)
3. Cache memory (10x de keys cabem na memoria?)
4. API serialization (payloads grandes x 10?)
5. Disk IOPS (logs, uploads, temp files)
6. External API rate limits (nosso trafego 10x nao excede?)
7. DNS / Load balancer limits
8. Session storage
9. Background job queue capacity
10. Monitoring/logging volume
```

- [ ] Ranking de risco documentado
- [ ] Top 5 risks com plano de mitigacao

---

## Semana 2: Otimizacao e Preparacao

### Dia 5-7: Database Scaling

**Acoes tipicas para 10x:**

```
1. Query Optimization
   - Otimizar top 20 queries (FS-T-002)
   - Eliminar N+1 queries
   - Adicionar indices faltantes (FS-T-009)

2. Connection Pooling
   - Instalar/configurar PgBouncer
   - Pool size = cores * 2 + disks
   - Modo: transaction (para web apps)

3. Read Replicas
   - Adicionar 1-2 read replicas
   - Configurar routing (reads → replica, writes → primary)

4. Caching de Queries
   - Cachear resultados de queries pesadas
   - Materialized views para reports

5. Partitioning (se tabelas > 100M rows)
   - Particionar por range (date) ou hash
```

- [ ] Queries otimizadas
- [ ] Connection pooling configurado
- [ ] Read replicas adicionadas
- [ ] Caching de queries implementado

### Dia 7-8: Caching Layer

**Acoes tipicas para 10x:**

```
1. Redis Cluster
   - Migrar de single node para cluster (se > 25GB)
   - Configurar sharding

2. CDN
   - Cachear API responses publicas
   - Cachear assets com immutable headers

3. Application Cache
   - Cachear hot data (top 100 queries)
   - Cache warming pos-deploy
   - Stale-while-revalidate para UX

4. HTTP Caching
   - Cache-Control em todas as responses
   - ETag para conteudo dinamico
```

- [ ] Cache dimensionado para 10x
- [ ] CDN configurado
- [ ] Cache warming automatizado
- [ ] Hit rate > 90%

### Dia 8-9: Resilience Hardening

**Acoes tipicas para 10x:**

```
1. Circuit Breakers
   - Em todas as dependencias externas
   - Fallback definido para cada uma

2. Rate Limiting
   - Por tenant/client
   - Global rate limit como safety net

3. Auto-Scaling
   - CPU-based: scale out at 70%, scale in at 30%
   - Min: 3, Max: 12 (para 10x)
   - Scale-out speed: < 3 min

4. Load Shedding
   - Rejeitar requests quando overloaded
   - Priorizar requests criticos (checkout, auth)

5. Graceful Degradation
   - Feature flags para desabilitar features pesadas
   - Static pages como fallback
```

- [ ] Circuit breakers configurados
- [ ] Auto-scaling testado
- [ ] Rate limiting ativo
- [ ] Graceful degradation testado

### Dia 9-10: Frontend (se aplicavel)

```
1. CDN para todos os assets
2. Code splitting para reduzir initial load
3. Image optimization (WebP/AVIF)
4. Prefetching para paginas mais acessadas
5. Service Worker para cache offline
```

- [ ] Assets em CDN
- [ ] Bundle otimizado
- [ ] Web Vitals dentro do budget

---

## Semana 3: Validacao

### Dia 11-12: Load Test Progressivo

```
Ramp-up plan:
1. 1x (baseline) — 30 min — validar metricas
2. 2x — 30 min — nenhuma degradacao
3. 5x — 30 min — metricas dentro do budget
4. 8x — 30 min — metricas dentro do budget
5. 10x — 60 min — SUSTENTADO dentro do budget
6. 12x — 15 min — encontrar ponto de ruptura
```

**Criterios de sucesso:**
- p95 < budget em 10x
- Error rate < 1% em 10x
- CPU < 80% em 10x
- No OOM em 10x
- Cache hit rate > 85% em 10x

- [ ] Load test 10x passando
- [ ] Ponto de ruptura > 12x
- [ ] Todos criterios de sucesso atendidos

### Dia 12-13: Soak Test

```
- 10x de carga por 4 horas
- Verificar:
  - Memory leak (crescimento continuo)
  - Connection leak
  - Disk space (logs)
  - Performance degradation over time
```

- [ ] Soak test 4h executado
- [ ] Nenhum leak detectado
- [ ] Performance estavel ao longo do tempo

### Dia 13-14: Failover Test

```
Sob carga de 5x, simular:
1. App server node failure → auto-scale repoe?
2. Database failover → replica promovida?
3. Cache node failure → performance degrada gracefully?
4. External API failure → circuit breaker ativa?
```

- [ ] Failover tests executados
- [ ] Sistema se recupera automaticamente

### Dia 14-15: Documentacao e Runbook

```
Documentar:
1. Nova arquitetura com scaling
2. Auto-scaling policies
3. Alertas e thresholds atualizados
4. Runbook de incidentes atualizado
5. Capacity plan com projecao de custos
```

- [ ] Documentacao atualizada
- [ ] Runbook revisado
- [ ] Alertas ajustados para nova escala
- [ ] Custos projetados e aprovados

---

## Checklist Final: Ready for 10x

### Infraestrutura
- [ ] Auto-scaling configurado e testado
- [ ] Instancias dimensionadas com headroom
- [ ] CDN configurado

### Database
- [ ] Queries otimizadas
- [ ] Connection pooling ativo
- [ ] Read replicas configuradas
- [ ] Indices otimizados

### Cache
- [ ] Redis dimensionado para 10x
- [ ] Hit rate > 90%
- [ ] Cache warming automatizado

### Resiliencia
- [ ] Circuit breakers em todas dependencias
- [ ] Rate limiting ativo
- [ ] Graceful degradation testado

### Validacao
- [ ] Load test 10x passando
- [ ] Soak test 4h limpo
- [ ] Failover test passando

### Operacional
- [ ] Alertas ajustados
- [ ] Runbook atualizado
- [ ] Time treinado
- [ ] Custos aprovados

---

*Squad FastSystem — Playbook: Escalar 10x v1.0.0*
