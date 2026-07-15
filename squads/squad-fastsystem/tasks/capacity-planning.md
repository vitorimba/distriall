<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: fs-capacity-planning
  task_name: Capacity Planning
  status: active
  responsible_executor: '@fastsystem-chief'
  execution_type: Agent
  estimated_time: 3-5h
  domain: Operational
  input:
  - Consultar a secao de inputs no corpo da task
  output:
  - Consultar a secao de outputs no corpo da task
  action_items:
  - Inventario de recursos atuais (compute, DB, cache, CDN)
  - Projecao de demanda (growth rate, sazonalidade, margem de seguranca)
  - Modelagem de capacidade (mapear demanda para recursos)
  - Definir scaling strategy por componente
  - Cost projection (atual, 6 meses, 12 meses)
  - Configurar alertas e thresholds proativos
  - Documentacao do capacity planning
  acceptance_criteria:
  - Todos componentes com headroom > 30%
  - Auto-scaling configurado para compute
  - Cost projection aprovada por management
  - Alertas proativos configurados
  - Scaling plan testado (load test)
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

# FS-T-011: Capacity Planning

> Estimativa e planejamento de capacidade para crescimento futuro

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-011 |
| **Name** | capacity-planning |
| **Agent** | performance-lead (Blaze) |
| **Execution Type** | Agent |
| **Responsible Executor** | performance-lead (Blaze) |
| **Mind** | — |
| **Priority** | Medium |
| **Estimated Duration** | 3-5 hours |
| **Dependencies** | FS-T-001, FS-T-005 |
| **Output** | Capacity planning document |

---

## Descricao

Estima a capacidade atual do sistema e planeja recursos necessarios para crescimento futuro. Cobre compute, storage, network e servicos dependentes. Define thresholds para scaling triggers e projeta custos.

---

## Pre-Conditions

- [ ] Metricas atuais de utilizacao disponiiveis
- [ ] Projecao de crescimento do negocio (users, transactions)
- [ ] Resultados de load tests (FS-T-005)
- [ ] Arquitetura do sistema documentada
- [ ] Historico de utilizacao (minimo 30 dias)

---

## Steps

### Step 1: Inventario de Recursos Atuais

**Objetivo:** Catalogar recursos e utilizacao atual

```
Para cada componente:
| Componente | Tipo | Specs | Utilizacao Atual | Capacidade Max |
|------------|------|-------|------------------|----------------|
| App Server | EC2 c5.xlarge | 4 vCPU, 8GB RAM | CPU 35%, RAM 60% | ~200 req/s |
| Database | RDS r5.2xlarge | 8 vCPU, 64GB RAM | CPU 25%, Conn 40% | ~1000 QPS |
| Cache | ElastiCache r5.large | 2 vCPU, 16GB | Mem 45%, CPU 15% | ~50K ops/s |
| CDN | CloudFront | — | 2TB/month | Unlimited |
```

### Step 2: Projecao de Demanda

**Objetivo:** Projetar demanda futura

```
Modelo de projecao:
1. Growth rate do negocio (MAU, transactions)
2. Sazonalidade (picos mensais, anuais)
3. Eventos especiais (lancamentos, promos)
4. Margem de seguranca (20-50%)

Exemplo:
- MAU atual: 100K
- Growth rate: 15% MoM
- Em 6 meses: ~230K MAU
- Em 12 meses: ~535K MAU
- Peak multiplier: 3x normal
- Target capacity: 535K * 3 = 1.6M MAU equivalent
```

### Step 3: Modelagem de Capacidade

**Objetivo:** Mapear demanda para recursos

```
Capacity model:
- 1 app server: 200 req/s sustained
- Current peak: 150 req/s
- Projected peak (12m): 800 req/s
- Servers needed: ceil(800 / 200) + 1 buffer = 5 servers

Database:
- Current QPS: 400
- Projected QPS: 2000
- Read replicas needed: ceil(2000 / 1000) = 2
- Write scaling: vertical (16 vCPU) or sharding
```

### Step 4: Scaling Strategy

**Objetivo:** Definir como escalar cada componente

```
Estrategias por camada:

1. Compute: Horizontal (auto-scaling groups)
   - Scale-out trigger: CPU > 70% for 5 min
   - Scale-in trigger: CPU < 30% for 15 min
   - Min/Max instances: 2/10

2. Database: Read replicas + Vertical
   - Read replicas for read-heavy workloads
   - Vertical scaling for write-heavy
   - Sharding for > 1TB or > 5K write QPS

3. Cache: Cluster mode
   - Redis cluster for > 25GB
   - Sharding for hot key distribution

4. Storage: Auto-scaling
   - S3 for objects (infinite scale)
   - EBS auto-expand for DB volumes
```

### Step 5: Cost Projection

**Objetivo:** Estimar custos futuros

```
| Componente | Atual/mes | 6 meses | 12 meses |
|------------|-----------|---------|----------|
| Compute | $500 | $1,200 | $2,500 |
| Database | $800 | $1,500 | $3,000 |
| Cache | $200 | $400 | $600 |
| CDN | $100 | $250 | $500 |
| Storage | $50 | $120 | $250 |
| **Total** | **$1,650** | **$3,470** | **$6,850** |
```

### Step 6: Alertas e Thresholds

**Objetivo:** Definir alertas proativos

```yaml
alerts:
  - name: "CPU High"
    condition: "cpu_avg > 70% for 10min"
    action: "auto-scale out"

  - name: "Memory Critical"
    condition: "memory_used > 85%"
    action: "page on-call, investigate leak"

  - name: "DB Connections High"
    condition: "active_connections > 80% of max"
    action: "increase pool, add read replica"

  - name: "Disk Space Warning"
    condition: "disk_used > 80%"
    action: "cleanup logs, expand volume"

  - name: "Capacity Threshold"
    condition: "any resource > 70% sustained"
    action: "create capacity ticket"
```

### Step 7: Documentacao

**Objetivo:** Documento de capacity planning

Usar template: `templates/capacity-planning-tmpl.md`

---

## Post-Conditions

- [ ] Inventario de recursos atualizado
- [ ] Projecao de demanda para 6 e 12 meses
- [ ] Scaling strategy definida por componente
- [ ] Custos projetados e aprovados
- [ ] Alertas de capacidade configurados

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-100 | Capacity planning sem dados de utilizacao atual | BLOCK |
| FS-V-101 | Projecao sem margem de seguranca (>= 20%) | WARN |
| FS-V-102 | Scaling manual sem automacao planejada | WARN |
| FS-V-103 | Sem alertas de capacidade proativos | BLOCK |

---

## Quality Gates

- [ ] Todos componentes com headroom > 30%
- [ ] Auto-scaling configurado para compute
- [ ] Cost projection aprovada por management
- [ ] Alertas proativos configurados
- [ ] Scaling plan testado (load test)

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| CloudWatch / Prometheus | Metricas historicas |
| AWS Cost Explorer | Cost projection |
| k6 | Load test validation |
| Grafana | Capacity dashboards |

---

*Task FS-T-011 v1.0.0 — Squad FastSystem*
