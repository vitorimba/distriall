# FastSystem Knowledge Base

> Base de conhecimento do Squad FastSystem
> Dominio: System Performance & Speed Optimization

---

## 1. Visao Geral do Dominio

Performance de sistemas e a disciplina de garantir que software opere com velocidade, eficiencia e confiabilidade otimas. Cobre todo o stack: desde o hardware e kernel ate o frontend no browser do usuario.

### Por que Performance Importa

- **Conversao:** Cada 100ms de latencia reduz conversao em 1% (Amazon)
- **SEO:** Core Web Vitals sao fator de ranking no Google
- **Retencao:** 53% dos usuarios abandonam sites que demoram > 3s (Google)
- **Custo:** Sistemas ineficientes custam mais em infraestrutura
- **Escalabilidade:** Performance otima permite escalar com menos recursos

### Pilares de Performance

1. **Latencia** — Tempo de resposta percebido pelo usuario
2. **Throughput** — Quantidade de trabalho processado por unidade de tempo
3. **Eficiencia** — Recursos consumidos por unidade de trabalho
4. **Escalabilidade** — Capacidade de manter performance sob carga crescente
5. **Resiliencia** — Capacidade de manter performance sob falhas

---

## 2. Metodologias Fundamentais

### USE Method (Brendan Gregg)

Para cada recurso do sistema (CPU, Memory, Disk, Network):
- **U**tilization — Quanto do recurso esta sendo usado?
- **S**aturation — Existe fila de trabalho esperando?
- **E**rrors — Existem erros no recurso?

Aplicacao: Diagnostico inicial de qualquer problema de performance.

### RED Method (Tom Wilkie)

Para cada servico/endpoint:
- **R**ate — Requests por segundo
- **E**rrors — Erros por segundo
- **D**uration — Distribuicao de latencia

Aplicacao: Monitoramento de microservicos.

### RAIL Model (Google)

Performance goals centrados no usuario:
- **R**esponse: < 100ms para interacoes
- **A**nimation: < 16ms por frame (60fps)
- **I**dle: Maximize idle time
- **L**oad: First meaningful paint < 1s

Aplicacao: Frontend performance budgets.

### Four Golden Signals (Google SRE)

1. **Latency** — Tempo de resposta (diferenciar sucesso vs erro)
2. **Traffic** — Demanda no sistema (req/s)
3. **Errors** — Taxa de falha
4. **Saturation** — Quao "cheio" o servico esta

Aplicacao: Monitoramento e alertas de SRE.

---

## 3. Conceitos Chave

### Latencia e Percentis

- **p50 (mediana):** Metade das requests sao mais rapidas
- **p95:** 95% das requests sao mais rapidas
- **p99:** 99% das requests sao mais rapidas
- **p99.9:** Tail latency, afeta power users

Regra: Sempre use percentis, nunca media. Media esconde outliers.

### Throughput

- **RPS (Requests Per Second):** Medida de throughput de API
- **QPS (Queries Per Second):** Medida de throughput de database
- **TPS (Transactions Per Second):** Medida de throughput transacional
- **IOPS (IO Operations Per Second):** Medida de throughput de disco

### Amdahl's Law

Speedup maximo e limitado pela fracao do trabalho que NAO pode ser paralelizada.
- Se 90% e paralelizavel → speedup maximo = 10x
- Se 50% e paralelizavel → speedup maximo = 2x

Implicacao: Identifique a parte serial antes de paralelizar.

### Little's Law

L = lambda * W
- L = numero medio de items no sistema
- lambda = taxa de chegada
- W = tempo medio no sistema

Implicacao: Para reduzir items no sistema, reduza latencia ou taxa de chegada.

### Cache Hit Rate

Hit rate = cache hits / (cache hits + cache misses) * 100

- > 95% = excelente
- 85-95% = bom
- < 85% = precisa melhorar

### Tail Latency

Latencia nos percentis altos (p99, p99.9). Causada por:
- Garbage collection
- Context switches
- Disk IO spikes
- Network jitter
- Queue buildup

Importancia: Um servico com 99% at p50=1ms pode ter p99=500ms, afetando 1% de TODOS os requests.

---

## 4. Performance por Camada

### Frontend

| Area | Metricas Chave | Ferramentas |
|------|---------------|-------------|
| Loading | LCP, FCP, TTFB, Speed Index | Lighthouse, WebPageTest |
| Interactivity | INP, TBT, Long Tasks | Chrome DevTools |
| Visual Stability | CLS | Layout Instability API |
| Bundle Size | JS/CSS size (gzipped) | Bundle Analyzer |
| Images | Format, compression, loading | ImageOptim, Squoosh |

### Backend / API

| Area | Metricas Chave | Ferramentas |
|------|---------------|-------------|
| Latency | p50, p95, p99 response time | APM, k6 |
| Throughput | req/s, concurrent users | k6, Gatling |
| Errors | Error rate, status codes | APM, logs |
| Resources | CPU, memory per request | Profiler |
| Dependencies | External call latency | Distributed tracing |

### Database

| Area | Metricas Chave | Ferramentas |
|------|---------------|-------------|
| Queries | Execution time, rows scanned | EXPLAIN ANALYZE |
| Indexes | Hit rate, unused indexes | pg_stat_user_indexes |
| Connections | Active, idle, waiting | pg_stat_activity |
| Locks | Lock waits, deadlocks | pg_locks |
| Replication | Lag, throughput | pg_stat_replication |

### Infrastructure

| Area | Metricas Chave | Ferramentas |
|------|---------------|-------------|
| CPU | Utilization, saturation, context switches | top, mpstat, perf |
| Memory | Used, cached, swap, page faults | free, vmstat |
| Disk | IOPS, throughput, latency, queue | iostat, iotop |
| Network | Bandwidth, latency, retransmissions | sar, ss, tcpdump |

---

## 5. Padroes de Otimizacao

### Database Patterns

1. **Index-based access** — Use indices ao inves de sequential scans
2. **Covering index** — Include colunas no index para evitar table lookup
3. **Partial index** — Indexe apenas subset relevante
4. **Materialized views** — Pre-compute aggregacoes pesadas
5. **Connection pooling** — Reutilize conexoes com PgBouncer
6. **Read replicas** — Separe leituras de escritas
7. **Partitioning** — Divida tabelas grandes por range/hash

### Caching Patterns

1. **Cache-aside** — App le do cache, popula no miss
2. **Write-through** — App escreve no cache e DB simultaneamente
3. **Write-behind** — App escreve no cache, DB e atualizado async
4. **Read-through** — Cache popula automaticamente no miss
5. **Refresh-ahead** — Cache refresha antes de expirar

### API Patterns

1. **Pagination** — Cursor-based para grandes conjuntos
2. **Field selection** — Sparse fieldsets para reduzir payload
3. **Batch API** — Multiplas operacoes em uma request
4. **CQRS** — Separe modelos de leitura e escrita
5. **Event-driven** — Use webhooks ao inves de polling

### Frontend Patterns

1. **Code splitting** — Carregar JavaScript sob demanda
2. **Lazy loading** — Carregar imagens/componentes quando visiveis
3. **Prefetching** — Pre-carregar proximas paginas provaveis
4. **Service worker** — Cache offline e background sync
5. **Skeleton screens** — Mostrar placeholder enquanto carrega

---

## 6. Anti-Patterns Comuns

| Anti-Pattern | Impacto | Solucao |
|-------------|---------|---------|
| N+1 queries | O(N) queries ao inves de O(1) | JOIN ou batch query |
| SELECT * | Transfere dados desnecessarios | Select campos especificos |
| No pagination | Carrega todos os registros | Cursor-based pagination |
| Sync external calls | Bloqueia thread | Async/await, queues |
| No connection pool | Overhead de conexao | PgBouncer, pool config |
| Cache without TTL | Memory leak | Sempre definir TTL |
| Retry without backoff | Amplifica falha | Exponential backoff + jitter |
| Premature optimization | Desperdicio de esforco | Measure first |
| No baseline | Impossivel medir melhoria | Capture baseline before |
| Log everything | IO overhead | Structured logging, sampling |

---

## 7. Benchmarks da Industria

### Web Performance

| Metrica | Bom | Aceitavel | Ruim |
|---------|-----|-----------|------|
| TTFB | < 200ms | < 600ms | > 600ms |
| FCP | < 1.8s | < 3.0s | > 3.0s |
| LCP | < 2.5s | < 4.0s | > 4.0s |
| INP | < 200ms | < 500ms | > 500ms |
| CLS | < 0.1 | < 0.25 | > 0.25 |

### API Performance

| Metrica | Excelente | Bom | Aceitavel | Ruim |
|---------|-----------|-----|-----------|------|
| p50 | < 50ms | < 100ms | < 200ms | > 200ms |
| p95 | < 200ms | < 500ms | < 1s | > 1s |
| p99 | < 500ms | < 1s | < 2s | > 2s |
| Error rate | < 0.01% | < 0.1% | < 1% | > 1% |

### Database Performance

| Metrica | Bom | Aceitavel | Ruim |
|---------|-----|-----------|------|
| Query p95 | < 10ms | < 50ms | > 100ms |
| Cache hit ratio | > 99% | > 95% | < 90% |
| Connection utilization | < 60% | < 80% | > 80% |
| Replication lag | < 100ms | < 1s | > 5s |

---

## 8. Ferramentas por Categoria

### Profiling
- **perf** — Linux CPU profiling
- **flamegraph** — Visualization de CPU time
- **strace/bpftrace** — System call tracing
- **Chrome DevTools** — Browser profiling

### Monitoring
- **Prometheus + Grafana** — Metricas e dashboards
- **Datadog / New Relic** — APM completo
- **Jaeger / Zipkin** — Distributed tracing
- **OpenTelemetry** — Observability framework

### Load Testing
- **k6** — Modern, scriptable load testing
- **Gatling** — High-performance load testing
- **Artillery** — Cloud-scale load testing
- **autocannon** — HTTP benchmarking

### Frontend
- **Lighthouse** — Automated web audit
- **WebPageTest** — Real browser testing
- **Bundle Analyzer** — Bundle composition
- **Bundlephobia** — Package size lookup

### Database
- **pganalyze** — PostgreSQL insights
- **pgbadger** — Log analysis
- **pg_stat_statements** — Query statistics
- **EXPLAIN ANALYZE** — Execution plan analysis

### Caching
- **Redis** — In-memory data store
- **Memcached** — Distributed cache
- **Varnish** — HTTP cache
- **Cloudflare / CloudFront** — CDN

---

## 9. Formulas Uteis

### Throughput
```
Throughput = Concurrent users / Average response time
```

### Required instances
```
Instances = Ceil(Peak RPS / RPS per instance) + buffer
```

### Cache size
```
Cache memory = Num items * Avg item size * (1 + overhead factor)
```

### Connection pool size
```
Pool size = Num cores * 2 + Num disks
```

### Bandwidth
```
Bandwidth = Avg response size * RPS * 8 (bits)
```

---

## 10. Glossario

| Termo | Definicao |
|-------|----------|
| **TTFB** | Time To First Byte — tempo ate primeiro byte da resposta |
| **FCP** | First Contentful Paint — primeiro conteudo renderizado |
| **LCP** | Largest Contentful Paint — maior elemento renderizado |
| **INP** | Interaction to Next Paint — responsividade a interacao |
| **CLS** | Cumulative Layout Shift — estabilidade visual |
| **TBT** | Total Blocking Time — tempo bloqueando main thread |
| **SLO** | Service Level Objective — target de performance |
| **SLI** | Service Level Indicator — metrica que mede o SLO |
| **SLA** | Service Level Agreement — contrato de disponibilidade |
| **DORA** | DevOps Research and Assessment — metricas de delivery |
| **MTTR** | Mean Time To Restore — tempo para restaurar servico |
| **RPS** | Requests Per Second — throughput de requisicoes |
| **QPS** | Queries Per Second — throughput de queries |
| **IOPS** | IO Operations Per Second — throughput de disco |
| **USE** | Utilization, Saturation, Errors — metodologia de diagnostico |
| **RED** | Rate, Errors, Duration — metodologia de monitoramento |

---

*Squad FastSystem Knowledge Base v1.0.0*
