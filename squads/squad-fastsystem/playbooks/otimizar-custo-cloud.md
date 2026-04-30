# Playbook: Reduzir Custo Cloud Sem Perder Performance

> **Trigger:** Custo de infraestrutura cloud acima do orcamento
> **Urgencia:** Media — planejamento necessario
> **Tempo estimado:** 1-2 semanas
> **Agentes envolvidos:** Blaze (lead), Probe, Pipe, Query

---

## Visao Geral

Reduzir custos de cloud mantendo performance dentro dos budgets. O foco e eliminar desperdicio, right-size recursos e otimizar arquitetura para eficiencia.

**Principio:** Primeiro otimize a aplicacao (free), depois otimize a infraestrutura (savings).

---

## Fase 1: Analise de Custos (Dia 1-2)

### 1.1 Cost Breakdown

```
Mapear custos por categoria:
| Categoria | Custo Mensal | % do Total | Trend |
|-----------|-------------|------------|-------|
| Compute (EC2/ECS) | $X | X% | ↑/↓/→ |
| Database (RDS) | $X | X% | ↑/↓/→ |
| Cache (ElastiCache) | $X | X% | ↑/↓/→ |
| Storage (S3/EBS) | $X | X% | ↑/↓/→ |
| Network (Transfer) | $X | X% | ↑/↓/→ |
| CDN (CloudFront) | $X | X% | ↑/↓/→ |
| Monitoring | $X | X% | ↑/↓/→ |
| Other | $X | X% | ↑/↓/→ |
| **Total** | **$X** | **100%** | |
```

- [ ] Cost breakdown completo
- [ ] Top 3 categorias de custo identificadas

### 1.2 Utilization Analysis

```
Para cada recurso, medir utilizacao real:
| Recurso | Provisionado | Utilizado | Idle % | Savings Potencial |
|---------|-------------|----------|--------|-------------------|
| App server 1 | 4 vCPU | 1.2 avg | 70% | Right-size |
| App server 2 | 4 vCPU | 0.8 avg | 80% | Consolidar |
| RDS instance | 8 vCPU | 2.1 avg | 74% | Right-size |
| Redis | 16GB | 4.2GB | 74% | Right-size |
```

- [ ] Utilizacao medida para todos os recursos
- [ ] Recursos ociosos identificados

---

## Fase 2: Quick Wins (Dia 2-4)

### 2.1 Right-Sizing

```
Acoes:
1. Reduzir instancias over-provisioned
   - CPU avg < 30% → reduce 1 tier
   - Memory avg < 40% → reduce 1 tier
   - Validar com load test antes

2. Eliminar recursos nao utilizados
   - Instancias paradas
   - EBS volumes detached
   - Elastic IPs nao associados
   - Snapshots antigos
   - Load balancers sem targets
```

**Savings estimado:** 20-40%

- [ ] Instancias right-sized
- [ ] Recursos orfaos removidos
- [ ] Performance validada pos-resize

### 2.2 Reserved Instances / Savings Plans

```
Para workloads estaveis:
- Reserved Instances: 30-70% savings vs on-demand
- Savings Plans: Mais flexivel, 20-50% savings
- Spot Instances: 60-90% savings para workloads tolerantes

Recomendacao:
- Baseline load → Reserved/Savings Plan
- Spiky load → On-demand com auto-scaling
- Background jobs → Spot instances
```

- [ ] Savings plan avaliado
- [ ] Reserved instances para workloads estaveis

### 2.3 Storage Optimization

```
Acoes:
1. S3 Lifecycle policies
   - Mover para Infrequent Access apos 30 dias
   - Mover para Glacier apos 90 dias
   - Deletar apos 365 dias

2. EBS optimization
   - gp3 ao inves de gp2 (20% mais barato)
   - Deletar snapshots > 90 dias
   - Right-size volumes

3. Log management
   - Retention policy (30 dias em hot, 90 em cold)
   - Compressao de logs
   - Sampling de logs verbose
```

- [ ] S3 lifecycle policies configuradas
- [ ] EBS volumes otimizados
- [ ] Log retention definida

---

## Fase 3: Otimizacoes de Aplicacao (Dia 4-8)

### 3.1 Query Optimization (impacta custo de DB)

```
Database e frequentemente o maior custo.
Otimizar queries reduz:
- CPU usage → permite right-size
- IOPS → reduz custo de storage
- Read replicas necessarias
```

- [ ] Top 10 queries otimizadas
- [ ] Indices desnecessarios removidos (reduz storage + write cost)
- [ ] Connection pooling otimizado

### 3.2 Caching (reduz load no backend e DB)

```
Cada cache hit e um request que NAO vai ao backend/DB.
Hit rate 90% = 10x menos carga nos recursos caros.

Acoes:
1. Cachear responses de API frequentes
2. CDN para assets (reduz transfer cost)
3. Redis para queries pesadas
```

- [ ] Caching implementado/otimizado
- [ ] CDN cobrindo assets e API publicas
- [ ] Hit rate > 85%

### 3.3 Auto-Scaling Tuning

```
Over-provisioning e o desperdicio mais comum.

Ajustar:
- Scale-in agressivo (cool-down curto)
- Min instances = real minimum needed
- Schedule-based scaling para patterns conhecidos
- Target tracking ao inves de step scaling
```

- [ ] Auto-scaling policies otimizadas
- [ ] Scale-in mais agressivo
- [ ] Min instances reduzido se possivel

---

## Fase 4: Otimizacoes de Arquitetura (Dia 8-12)

### 4.1 Serverless para Workloads Esporadicos

```
Workloads que rodam < 20% do tempo sao candidatos a serverless:
- Webhooks → Lambda
- Image processing → Lambda
- Scheduled jobs → Lambda + EventBridge
- API endpoints low-traffic → Lambda + API Gateway

Cuidado: Serverless e mais caro em alto throughput constante.
```

### 4.2 CDN Optimization

```
Mover processamento para edge:
- Static site generation ao inves de SSR
- Edge functions para personalizacao leve
- CDN caching para API responses

Savings: Reduz compute e network transfer
```

### 4.3 Multi-Region Optimization

```
Se multi-region:
- Avaliar se todas as regioes sao necessarias
- Consolidar regioes com pouco trafego
- Cross-region replication: necessaria ou nice-to-have?
```

---

## Fase 5: Monitoramento de Custos (Ongoing)

### 5.1 Alertas de Custo

```yaml
alerts:
  - name: "Daily cost spike"
    condition: "daily_cost > 1.3 * avg_daily_cost"
    action: "Notify #finance-alerts"

  - name: "Monthly forecast exceeded"
    condition: "monthly_forecast > budget * 1.1"
    action: "Notify #management"

  - name: "Resource utilization low"
    condition: "cpu_avg < 20% for 7 days"
    action: "Right-size recommendation"
```

### 5.2 Cost Dashboard

```
Panels:
1. Cost by service (pie chart)
2. Daily cost trend (line chart)
3. Cost per user/transaction (KPI)
4. Forecast vs budget (gauge)
5. Right-sizing opportunities (table)
6. Reserved vs on-demand usage (stacked bar)
```

---

## Resumo de Savings Tipicos

| Acao | Savings Estimado | Esforco | Risco |
|------|-----------------|---------|-------|
| Right-sizing | 20-40% | Low | Low |
| Reserved/Savings Plans | 30-60% | Low | Low |
| Storage lifecycle | 10-30% | Low | Low |
| Query optimization | 10-30% (DB cost) | Medium | Low |
| Caching | 20-50% (compute cost) | Medium | Low |
| Auto-scaling tuning | 10-20% | Low | Low |
| Serverless migration | 30-70% (para workloads fit) | High | Medium |
| Eliminate waste | 5-15% | Low | None |

---

## Checklist Final

- [ ] Cost breakdown documentado
- [ ] Recursos ociosos eliminados
- [ ] Instancias right-sized
- [ ] Savings plans avaliados
- [ ] Storage lifecycle policies ativas
- [ ] Queries otimizadas
- [ ] Caching eficiente
- [ ] Auto-scaling otimizado
- [ ] Alertas de custo configurados
- [ ] Dashboard de custos criado
- [ ] Performance validada (sem regressao)
- [ ] Savings mensal documentado

---

*Squad FastSystem — Playbook: Otimizar Custo Cloud v1.0.0*
