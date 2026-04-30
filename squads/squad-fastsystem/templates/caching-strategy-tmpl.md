# Caching Strategy Document

> **Sistema:** {{system_name}}
> **Data:** {{date}}
> **Autor:** {{agent_name}}

---

## Overview

**Objetivo:** {{objective}}
**Read/Write ratio:** {{read_write_ratio}}
**Requisitos de consistencia:** {{consistency_requirements}}
**Target hit rate:** {{target_hit_rate}}

---

## Padroes de Acesso

### Hot Data (> {{hot_threshold}} req/s)

| Recurso | Frequencia | Tamanho | TTL Recomendado | Estrategia |
|---------|-----------|---------|-----------------|------------|
| {{resource_1}} | {{freq}} | {{size}} | {{ttl}} | {{strategy}} |

### Warm Data ({{warm_range}} req/s)

| Recurso | Frequencia | Tamanho | TTL Recomendado | Estrategia |
|---------|-----------|---------|-----------------|------------|
| {{resource_2}} | {{freq}} | {{size}} | {{ttl}} | {{strategy}} |

### Cold Data (< {{cold_threshold}} req/s)

| Recurso | Frequencia | Tamanho | Cache? | Justificativa |
|---------|-----------|---------|--------|---------------|
| {{resource_3}} | {{freq}} | {{size}} | {{cache_yn}} | {{justification}} |

---

## Arquitetura Multi-Layer

```
{{cache_architecture_diagram}}
```

### Layer 1: Browser Cache

| Asset Type | Cache-Control | ETag | Notas |
|-----------|--------------|------|-------|
| JS bundles (hashed) | `public, max-age=31536000, immutable` | No | Hash no filename |
| CSS (hashed) | `public, max-age=31536000, immutable` | No | Hash no filename |
| HTML | `no-cache` | Yes | Sempre revalidar |
| Imagens (hashed) | `public, max-age=31536000, immutable` | No | WebP com fallback |
| API responses | {{api_cache_control}} | {{api_etag}} | {{api_notes}} |

### Layer 2: CDN / Edge

| Tipo | Configuracao | TTL | Purge Strategy |
|------|-------------|-----|----------------|
| Assets estaticos | Cache all | 1 year | Deploy-triggered |
| API publicas | {{cdn_api_config}} | {{cdn_api_ttl}} | {{cdn_purge}} |
| Imagens | Cache all + transform | 1 year | On-demand |

### Layer 3: Application Cache (Redis)

| Key Pattern | Value Type | TTL | Eviction | Invalidacao |
|------------|-----------|-----|----------|-------------|
| `user:{id}:profile` | Hash | 1h | LRU | Write-through |
| `session:{token}` | String | 24h | Volatile-TTL | TTL-based |
| {{key_pattern}} | {{type}} | {{ttl}} | {{eviction}} | {{invalidation}} |

**Redis Configuration:**
```yaml
maxmemory: {{max_memory}}
maxmemory-policy: {{eviction_policy}}
cluster-enabled: {{cluster}}
replica-count: {{replicas}}
```

### Layer 4: Database Cache

| Tipo | Configuracao | Notas |
|------|-------------|-------|
| Query cache | {{query_cache}} | {{notes}} |
| Prepared statements | {{prep_stmt}} | {{notes}} |
| Materialized views | {{mat_views}} | {{refresh_interval}} |
| Connection pool | {{pool_config}} | {{notes}} |

---

## Invalidacao Strategy

### Por Tipo de Dado

| Dado | Trigger | Metodo | Latencia Max |
|------|---------|--------|-------------|
| {{data_1}} | {{trigger}} | {{method}} | {{max_latency}} |

### Padroes Utilizados

- [ ] TTL-based: {{ttl_based_usage}}
- [ ] Event-driven (Pub/Sub): {{event_driven_usage}}
- [ ] Write-through: {{write_through_usage}}
- [ ] Write-behind: {{write_behind_usage}}
- [ ] Cache-aside: {{cache_aside_usage}}

### Thundering Herd Prevention

| Estrategia | Implementado | Configuracao |
|-----------|-------------|-------------|
| Stale-while-revalidate | {{swr}} | {{swr_config}} |
| Lock/Mutex on miss | {{lock}} | {{lock_config}} |
| Probabilistic early expiry | {{pee}} | {{pee_config}} |

---

## Cache Warming

| Estrategia | Quando | Keys | Tempo |
|-----------|--------|------|-------|
| Startup warming | Deploy | Top 100 hot keys | {{time}} |
| Predictive warming | Pre-peak | {{pred_keys}} | {{time}} |
| Background refresh | Periodic | {{bg_keys}} | {{interval}} |

---

## Monitoramento

### Metricas

| Metrica | Target | Alerta |
|---------|--------|--------|
| Hit rate | > {{target_hit_rate}} | < {{alert_hit_rate}} |
| Miss rate | < {{target_miss_rate}} | > {{alert_miss_rate}} |
| Eviction rate | Stable | Spike > {{eviction_threshold}} |
| Memory usage | < {{mem_target}} | > {{mem_alert}} |
| Latency (get) | < {{get_latency}} | > {{get_alert}} |
| Latency (set) | < {{set_latency}} | > {{set_alert}} |

### Dashboard

```
Panels:
1. Cache hit rate (time series)
2. Memory usage (gauge)
3. Eviction rate (time series)
4. Latency distribution (histogram)
5. Top missed keys (table)
6. Key distribution (pie chart)
```

---

## Riscos e Mitigacoes

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|--------------|---------|-----------|
| Stale data served | {{prob}} | {{impact}} | {{mitigation}} |
| Cache avalanche | {{prob}} | {{impact}} | {{mitigation}} |
| Hot key problem | {{prob}} | {{impact}} | {{mitigation}} |
| Memory exhaustion | {{prob}} | {{impact}} | {{mitigation}} |

---

## Estimativa de Impacto

| Metrica | Antes | Depois (estimado) | Melhoria |
|---------|-------|-------------------|----------|
| p95 response time | {{before}} | {{after}} | {{improvement}} |
| Database load | {{before}} | {{after}} | {{improvement}} |
| Throughput | {{before}} | {{after}} | {{improvement}} |
| Custo infra | {{before}} | {{after}} | {{improvement}} |

---

*Gerado por Squad FastSystem — {{date}}*
