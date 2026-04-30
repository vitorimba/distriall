# FS-T-006: Bottleneck Analysis

> Identificacao e correcao sistematica de gargalos de performance

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-006 |
| **Name** | bottleneck-analysis |
| **Agent** | performance-lead (Blaze) |
| **Execution Type** | Agent |
| **Responsible Executor** | performance-lead (Blaze) |
| **Mind** | — |
| **Priority** | Critical |
| **Estimated Duration** | 2-6 hours |
| **Dependencies** | FS-T-001 |
| **Output** | Bottleneck analysis report |

---

## Descricao

Processo sistematico de identificacao, classificacao e resolucao de gargalos de performance. Utiliza dados do diagnostico (FS-T-001) para localizar os pontos que mais limitam a performance do sistema e propoe solucoes ordenadas por impacto.

---

## Pre-Conditions

- [ ] Diagnostico do sistema executado (FS-T-001)
- [ ] Metricas de performance coletadas
- [ ] Sintomas e impacto documentados
- [ ] Acesso a profiling tools

---

## Steps

### Step 1: Mapear o Critical Path

**Objetivo:** Identificar o caminho critico da requisicao

```
Request flow mapping:
Client → CDN → Load Balancer → App Server → Cache → Database → Response

Para cada hop:
- Latencia media (ms)
- p99 latencia (ms)
- Throughput (req/s)
- Error rate (%)
```

### Step 2: Identificar Bottlenecks

**Objetivo:** Localizar onde a latencia se acumula

**Metodo: Waterfall Analysis**
```
Total response time: 1200ms
├── DNS resolution: 50ms (4%)
├── TCP connection: 30ms (2.5%)
├── TLS handshake: 80ms (6.7%)
├── Server processing: 900ms (75%) ← BOTTLENECK
│   ├── Authentication: 50ms
│   ├── Business logic: 150ms
│   ├── Database query: 650ms ← ROOT CAUSE
│   └── Serialization: 50ms
├── Transfer: 30ms (2.5%)
└── Client rendering: 110ms (9.2%)
```

**Classificacao:**
| Tipo | Indicador | Acao |
|------|-----------|------|
| CPU-bound | CPU > 80%, low IO wait | Otimizar algoritmo, horizontal scale |
| IO-bound | High IO wait, CPU < 50% | Otimizar queries, add cache |
| Memory-bound | Swap ativo, high GC | Reduzir footprint, tune GC |
| Network-bound | High latency, packet loss | CDN, connection pool, compression |
| Contention | Lock waits, queue depth | Reduce lock scope, async processing |

### Step 3: Priorizar por Impacto

**Objetivo:** Ordenar gargalos por ROI de correcao

```
Impacto = Frequencia × Latencia_adicionada × Usuarios_afetados

Prioridade:
P0 — Blocking: sistema inutilizavel
P1 — Critical: degradacao > 50% para > 50% usuarios
P2 — Major: degradacao > 30% para segmento de usuarios
P3 — Minor: degradacao perceptivel mas funcional
```

### Step 4: Propor Solucoes

**Objetivo:** Definir acao corretiva para cada gargalo

**Quick wins (< 1 dia):**
- Adicionar index faltante
- Habilitar compressao
- Configurar cache header
- Aumentar connection pool

**Medium effort (1-5 dias):**
- Reescrever query complexa
- Implementar cache layer
- Code splitting frontend
- Otimizar serialization

**Large effort (> 5 dias):**
- Redesign de schema
- Implementar CQRS
- Migrar para microservicos
- Redesign de arquitetura

### Step 5: Implementar e Validar

**Objetivo:** Aplicar correcoes e medir resultado

```
Para cada correcao:
1. Medir baseline (antes)
2. Implementar fix
3. Medir resultado (depois)
4. Calcular melhoria (%)
5. Documentar
```

### Step 6: Documentar

**Objetivo:** Relatorio completo com evidencias

Usar template: `templates/bottleneck-analysis-tmpl.md`

---

## Post-Conditions

- [ ] Critical path mapeado com latencia por hop
- [ ] Bottlenecks classificados e priorizados
- [ ] Solucoes propostas com estimativa de impacto
- [ ] Quick wins implementados e validados
- [ ] Relatorio gerado com evidencias

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-050 | Otimizacao sem evidencia de bottleneck | BLOCK |
| FS-V-051 | Fix sem validacao de melhoria | BLOCK |
| FS-V-052 | Bottleneck classificado sem metricas | WARN |

---

## Quality Gates

- [ ] Critical path documentado
- [ ] Top 3 bottlenecks identificados com evidencia
- [ ] Quick wins implementados
- [ ] Melhoria total >= 30%

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| APM tool | Distributed tracing |
| `perf` | CPU profiling |
| `EXPLAIN ANALYZE` | Query analysis |
| Chrome DevTools | Frontend profiling |

---

*Task FS-T-006 v1.0.0 — Squad FastSystem*
