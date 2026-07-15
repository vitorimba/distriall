<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: fs-caching-strategy
  task_name: Caching Strategy
  status: active
  responsible_executor: '@caching-specialist'
  execution_type: Agent
  estimated_time: 2-4h
  domain: Operational
  input:
  - Consultar a secao de inputs no corpo da task
  output:
  - Consultar a secao de outputs no corpo da task
  action_items:
  - Analise de padroes de acesso (hot/warm/cold data, read/write ratio)
  - Design multi-layer (browser, CDN, API gateway, application, database, OS)
  - Politicas de invalidacao (TTL, event-driven, write-through, cache-aside)
  - Configuracao de HTTP caching (Cache-Control, ETag, immutable)
  - Redis/application cache design (key-value, hash, sorted set, eviction)
  - Cache warming strategies (startup, predictive, background, cascade)
  - Metricas e monitoramento (hit rate, eviction rate, latency, alertas)
  - Documentacao da estrategia completa
  acceptance_criteria:
  - Hit rate projetado > 85%
  - Invalidacao testada para todos os cenarios de escrita
  - Consistencia eventual documentada e aceita pelo PO
  - Thundering herd mitigado
  - Memory budget definido
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

# FS-T-004: Caching Strategy

> Design de estrategia de caching multi-camada para otimizacao de performance

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-004 |
| **Name** | caching-strategy |
| **Agent** | caching-specialist (Cache) |
| **Execution Type** | Agent |
| **Responsible Executor** | caching-specialist (Cache) |
| **Mind** | steve_souders |
| **Priority** | High |
| **Estimated Duration** | 2-4 hours |
| **Dependencies** | FS-T-001 (recomendado) |
| **Output** | Caching strategy document |

---

## Descricao

Projeta uma estrategia de caching multi-camada cobrindo browser cache, CDN, application cache (Redis/Memcached), query cache e OS page cache. Define politicas de invalidacao, TTLs, e cache warming strategies.

Segue a filosofia de Steve Souders: "The fastest HTTP request is the one not made."

---

## Pre-Conditions

- [ ] Arquitetura do sistema documentada
- [ ] Hot paths identificados (endpoints mais acessados)
- [ ] Padroes de acesso documentados (read/write ratio)
- [ ] Requisitos de consistencia definidos
- [ ] Infraestrutura de cache disponivel (Redis, CDN)

---

## Steps

### Step 1: Analise de Padroes de Acesso

**Objetivo:** Entender como os dados sao acessados

```
Classificacao de dados:
1. Hot data (> 100 req/s) — cache agressivo
2. Warm data (10-100 req/s) — cache moderado
3. Cold data (< 10 req/s) — cache opcional
4. Real-time data — nao cachear (precos, estoque)
```

**Metricas a coletar:**
- Read/Write ratio por endpoint
- Frequencia de acesso por recurso
- Tolerancia a stale data (seconds, minutes, hours)
- Tamanho medio de resposta

### Step 2: Design Multi-Layer

**Objetivo:** Definir cache em cada camada

```
Camadas (de mais perto a mais longe do usuario):

1. Browser Cache (Cache-Control, ETag)
   └─ Assets estaticos, API responses imutaveis

2. CDN / Edge Cache (Cloudflare, CloudFront)
   └─ Conteudo estatico, API responses publicas

3. API Gateway Cache (Nginx, Kong)
   └─ Response cache por rota, rate limiting

4. Application Cache (Redis, Memcached)
   └─ Session, computed data, aggregations

5. Database Cache (Query cache, Connection pool)
   └─ Prepared statements, materialized views

6. OS Page Cache
   └─ File system cache (automatico)
```

**Heuristica aplicada:** SS_WP_001 — "Cache no nivel mais proximo do usuario que a consistencia permitir"

### Step 3: Politicas de Invalidacao

**Objetivo:** Definir como e quando invalidar cache

```
Estrategias de invalidacao:

1. TTL-based (Time To Live)
   - Simples, previsivel
   - Risco de stale data
   - Bom para: catalogo, configuracoes

2. Event-driven (Pub/Sub)
   - Invalidacao imediata
   - Complexidade maior
   - Bom para: precos, inventario

3. Write-through
   - Cache atualizado junto com DB
   - Sem stale data
   - Bom para: perfil de usuario, preferencias

4. Write-behind (Write-back)
   - Cache atualizado primeiro, DB async
   - Risco de perda de dados
   - Bom para: contadores, analytics

5. Cache-aside (Lazy loading)
   - Cache populado no primeiro acesso
   - Cold start problem
   - Bom para: dados acessados esporadicamente
```

### Step 4: Configuracao de HTTP Caching

**Objetivo:** Configurar headers de cache HTTP

```
# Assets estaticos (imutaveis com hash)
Cache-Control: public, max-age=31536000, immutable
# bundle.a1b2c3.js, styles.x7y8z9.css

# HTML pages
Cache-Control: no-cache
# Sempre revalida, mas pode usar ETag

# API responses (publicas, tolerantes a stale)
Cache-Control: public, max-age=60, s-maxage=300
# s-maxage para CDN, max-age para browser

# API responses (privadas)
Cache-Control: private, max-age=0, must-revalidate
ETag: "abc123"

# Nunca cachear
Cache-Control: no-store
# Dados sensiveis, tokens
```

**Heuristica aplicada:** SS_WP_002 — "Assets com hash no filename devem ter Cache-Control: immutable"

### Step 5: Redis/Application Cache Design

**Objetivo:** Projetar estrategia de cache em Redis

```
Padroes de uso:

1. Simple key-value
   SET user:123:profile '{"name":"..."}' EX 3600

2. Hash (objetos parciais)
   HSET user:123 name "Felipe" email "f@x.com"
   HGET user:123 name

3. Sorted Set (rankings, feeds)
   ZADD leaderboard 1000 "user:123"
   ZREVRANGE leaderboard 0 9

4. Lista (filas, recent items)
   LPUSH recent:user:123 "item:456"
   LTRIM recent:user:123 0 49

Politicas de eviction:
- allkeys-lru: evict least recently used (recomendado)
- volatile-lru: evict LRU com TTL
- allkeys-lfu: evict least frequently used
- noeviction: retorna erro quando cheio
```

### Step 6: Cache Warming

**Objetivo:** Pre-popular cache para evitar cold starts

```
Estrategias de warming:

1. Startup warming
   - Popular top 100 hot keys no deploy
   - Script automatico pos-deploy

2. Predictive warming
   - Baseado em padroes historicos
   - Aquecer antes de picos conhecidos

3. Background warming
   - Job periodico refresh top keys
   - Evita thundering herd

4. Cascade warming
   - Popular camadas em ordem (DB → App → CDN)
   - Coordenar TTLs
```

### Step 7: Metricas e Monitoramento

**Objetivo:** Definir observabilidade do cache

```
Metricas essenciais:
- Hit rate (target: > 90%)
- Miss rate
- Eviction rate
- Memory usage
- Latency (get/set operations)
- TTL distribution

Alertas:
- Hit rate < 80% = investigar
- Eviction rate spike = memoria insuficiente
- Latency > 5ms = problema de rede/config
```

### Step 8: Documentacao da Estrategia

**Objetivo:** Documentar decisoes de caching

Usar template: `templates/caching-strategy-tmpl.md`

---

## Post-Conditions

- [ ] Estrategia multi-camada documentada
- [ ] Politicas de invalidacao definidas por tipo de dado
- [ ] HTTP headers configurados
- [ ] Redis patterns definidos
- [ ] Metricas e alertas configurados
- [ ] Cache warming strategy definida

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-030 | Cache de dados sensiveis sem encriptacao | BLOCK |
| FS-V-031 | TTL > 24h sem invalidacao event-driven | WARN |
| FS-V-032 | Cache sem metricas de hit rate | BLOCK |
| FS-V-033 | Real-time data com cache TTL > 5s | BLOCK |
| FS-V-034 | Cache sem politica de eviction definida | WARN |

---

## Quality Gates

- [ ] Hit rate projetado > 85%
- [ ] Invalidacao testada para todos os cenarios de escrita
- [ ] Consistencia eventual documentada e aceita pelo PO
- [ ] Thundering herd mitigado
- [ ] Memory budget definido

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| `Redis` | Application cache |
| `Cloudflare/CloudFront` | CDN/Edge cache |
| `Varnish` | HTTP cache |
| `redis-cli INFO` | Cache metrics |
| `curl -I` | HTTP header inspection |

---

## Referencia

- Steve Souders, "High Performance Web Sites", 2007
- Redis documentation: https://redis.io/docs/
- HTTP Caching: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching

---

*Task FS-T-004 v1.0.0 — Squad FastSystem*
