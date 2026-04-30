# FS-T-010: API Latency Reduction

> Reducao sistematica de latencia em APIs

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-010 |
| **Name** | api-latency-reduction |
| **Agent** | api-performance (Flux) |
| **Execution Type** | Agent |
| **Responsible Executor** | api-performance (Flux) |
| **Mind** | alex_xu |
| **Priority** | High |
| **Estimated Duration** | 2-4 hours |
| **Dependencies** | FS-T-001, FS-T-006 |
| **Output** | API optimization report |

---

## Descricao

Analisa e reduz latencia de endpoints de API identificados como lentos. Cobre serialization, pagination, N+1 queries, connection pooling, response compression e caching de API. Baseado nos principios de design de sistemas de Alex Xu.

---

## Pre-Conditions

- [ ] Endpoints lentos identificados (APM, logs)
- [ ] Baseline de latencia por endpoint (p50, p95, p99)
- [ ] Acesso ao codigo fonte da API
- [ ] Distributed tracing habilitado

---

## Steps

### Step 1: Profiling de Endpoints

**Objetivo:** Decompor latencia de cada endpoint

```
Endpoint: GET /api/v1/orders
Total p95: 850ms

Breakdown:
├── Middleware: 15ms
├── Auth validation: 25ms
├── DB query (orders): 350ms ← Slow query
├── DB query (items): 200ms ← N+1
├── DB query (user): 50ms
├── Serialization: 150ms ← Large payload
├── Compression: 30ms
└── Network: 30ms
```

**Heuristica aplicada:** AX_SD_001 — "Decomponha a latencia em camadas antes de otimizar"

### Step 2: Eliminar N+1 Queries

**Objetivo:** Resolver N+1 query problems

```javascript
// RUIM: N+1 queries
const orders = await db.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
for (const order of orders) {
  order.items = await db.query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
}
// 1 + N queries

// BOM: JOIN ou IN clause
const orders = await db.query(`
  SELECT o.*, json_agg(oi.*) as items
  FROM orders o
  LEFT JOIN order_items oi ON oi.order_id = o.id
  WHERE o.user_id = $1
  GROUP BY o.id
`, [userId]);
// 1 query
```

### Step 3: Otimizar Serialization

**Objetivo:** Reduzir tempo de serialization e payload size

```
Estrategias:
1. Selecionar apenas campos necessarios (no SELECT *)
2. Sparse fieldsets (?fields=id,name,status)
3. Compressao (Brotli > Gzip)
4. Formato eficiente (MessagePack, Protobuf para internal)
5. Pagination (nunca retornar listas ilimitadas)
```

**Heuristica aplicada:** AX_SD_002 — "Retorne apenas o que o client precisa — field selection e pagination sao obrigatorios"

### Step 4: Implementar Pagination Eficiente

**Objetivo:** Paginar respostas corretamente

```javascript
// RUIM: OFFSET pagination (lento em paginas altas)
SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 10000;

// BOM: Cursor-based pagination
SELECT * FROM orders
WHERE id > $cursor
ORDER BY id
LIMIT 20;

// Response format
{
  "data": [...],
  "pagination": {
    "next_cursor": "abc123",
    "has_more": true,
    "total_count": 50000  // opcional, caro
  }
}
```

### Step 5: Connection Pooling

**Objetivo:** Otimizar pool de conexoes

```
Configuracao recomendada:
- Pool size: num_cores * 2 + num_disks
- Idle timeout: 30s
- Max lifetime: 30 min
- Connection validation: on borrow

Para PostgreSQL com PgBouncer:
- Mode: transaction (recomendado para web apps)
- Max client connections: 1000
- Default pool size: 20
- Reserve pool: 5
```

### Step 6: API Response Caching

**Objetivo:** Cachear respostas de API quando possivel

```
Estrategias:
1. HTTP caching (Cache-Control, ETag)
2. Application-level cache (Redis)
3. CDN caching (para APIs publicas)
4. Stale-while-revalidate pattern

Exemplo HTTP:
Cache-Control: public, max-age=60, stale-while-revalidate=300
ETag: "v1-abc123"
```

### Step 7: Rate Limiting e Backpressure

**Objetivo:** Proteger API de sobrecarga

```
Algoritmos:
1. Token Bucket — permite burst
2. Sliding Window — mais preciso
3. Leaky Bucket — rate constante

Headers padrao:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1609459200
Retry-After: 30
```

### Step 8: Validacao de Melhorias

**Objetivo:** Confirmar reducao de latencia

```
Para cada endpoint otimizado:
- p50 antes/depois
- p95 antes/depois
- p99 antes/depois
- Throughput antes/depois
- Payload size antes/depois
```

---

## Post-Conditions

- [ ] N+1 queries eliminadas
- [ ] Pagination implementada em todas as listas
- [ ] Serialization otimizada
- [ ] Connection pooling configurado
- [ ] Metricas antes/depois documentadas

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-090 | Lista sem pagination (> 100 items) | BLOCK |
| FS-V-091 | N+1 query em hot path | BLOCK |
| FS-V-092 | SELECT * em API endpoint | WARN |
| FS-V-093 | API sem rate limiting | WARN |
| FS-V-094 | Sem connection pooling | BLOCK |

---

## Quality Gates

- [ ] p95 latency < 500ms para todos os endpoints
- [ ] N+1 queries eliminadas
- [ ] Todas as listas com pagination
- [ ] Connection pool configurado
- [ ] Rate limiting ativo

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| APM (Datadog, NewRelic) | Distributed tracing |
| `pgbouncer` | Connection pooling |
| `redis` | Response caching |
| `k6` | Load testing endpoints |
| `autocannon` | HTTP benchmarking |

---

## Referencia

- Alex Xu, "System Design Interview", 2020
- API Design Patterns, JJ Geewax, 2021

---

*Task FS-T-010 v1.0.0 — Squad FastSystem*
