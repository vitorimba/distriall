<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: fs-load-testing
  task_name: Load Testing
  status: active
  responsible_executor: '@scalability-designer'
  execution_type: Agent
  estimated_time: 4-8h
  domain: Operational
  input:
  - Consultar a secao de inputs no corpo da task
  output:
  - Consultar a secao de outputs no corpo da task
  action_items:
  - Definir cenarios de carga e modelo de peak load
  - Criar scripts k6 para cenarios priorizados
  - Executar load test padrao com monitoring
  - Executar stress test para encontrar ponto de ruptura
  - Executar soak test para validar estabilidade
  - Consolidar e interpretar resultados
  - Documentar conclusoes e recomendacoes
  acceptance_criteria:
  - p95 response time < performance budget
  - Error rate < 1% em load normal
  - Ponto de ruptura > 2x carga normal
  - Sistema se recupera em < 5 min apos stress
  - Nenhum memory leak detectado em soak test
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

# FS-T-005: Load Testing

> Planejamento e execucao de testes de carga, stress e soak

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-005 |
| **Name** | load-testing |
| **Agent** | load-tester (Surge) |
| **Execution Type** | Agent |
| **Responsible Executor** | load-tester (Surge) |
| **Mind** | — |
| **Priority** | High |
| **Estimated Duration** | 4-8 hours |
| **Dependencies** | FS-T-001 (baseline) |
| **Output** | Load test report + scripts |

---

## Descricao

Planeja e executa testes de carga para validar capacidade do sistema, identificar pontos de ruptura e garantir que performance budgets sao respeitados sob carga. Cobre load tests, stress tests e soak tests com ferramentas como k6, Gatling ou Artillery.

---

## Pre-Conditions

- [ ] Baseline de performance documentado
- [ ] Ambiente de teste isolado (nao producao)
- [ ] Cenarios de uso priorizados (user journeys)
- [ ] Performance budget definido (p95, p99 targets)
- [ ] Ferramentas de load testing instaladas
- [ ] Monitoring ativo durante testes

---

## Steps

### Step 1: Definir Cenarios de Carga

**Objetivo:** Mapear user journeys para scripts de teste

```
Cenarios tipicos (priorizar por impacto):

1. Login → Dashboard (autenticacao + query pesada)
2. Busca → Resultado → Detalhe (read-heavy)
3. Checkout flow (write-heavy, transacional)
4. Upload de arquivo (IO-heavy)
5. API publica (alto throughput)
```

**Modelo de carga:**
```
Peak load = Normal * Spike factor

Exemplo:
- Normal: 100 req/s
- Spike factor: 3x (eventos, promos)
- Peak: 300 req/s
- Load test target: 500 req/s (margem)
```

### Step 2: Criar Scripts k6

**Objetivo:** Implementar cenarios como scripts executaveis

```javascript
// k6 load test script
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const loginDuration = new Trend('login_duration');

export const options = {
  stages: [
    { duration: '2m', target: 50 },   // ramp up
    { duration: '5m', target: 50 },   // sustain
    { duration: '2m', target: 100 },  // ramp up
    { duration: '5m', target: 100 },  // sustain
    { duration: '2m', target: 200 },  // peak
    { duration: '5m', target: 200 },  // sustain peak
    { duration: '3m', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    errors: ['rate<0.01'],
    login_duration: ['p(95)<300'],
  },
};

export default function () {
  // Login
  const loginStart = Date.now();
  const loginRes = http.post('https://api.example.com/auth/login', JSON.stringify({
    email: `user${__VU}@test.com`,
    password: 'testpass',
  }), { headers: { 'Content-Type': 'application/json' } });

  loginDuration.add(Date.now() - loginStart);

  check(loginRes, {
    'login status 200': (r) => r.status === 200,
    'login has token': (r) => JSON.parse(r.body).token !== undefined,
  }) || errorRate.add(1);

  const token = JSON.parse(loginRes.body).token;

  // Dashboard
  const dashRes = http.get('https://api.example.com/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });

  check(dashRes, {
    'dashboard status 200': (r) => r.status === 200,
    'dashboard < 500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);

  sleep(1);
}
```

### Step 3: Executar Load Test

**Objetivo:** Executar teste de carga padrao

```bash
# Load test basico
k6 run --out json=results.json load-test.js

# Com dashboard
k6 run --out influxdb=http://localhost:8086/k6 load-test.js

# Cloud execution
k6 cloud load-test.js
```

**Monitorar durante o teste:**
- CPU/Memory do servidor (Grafana)
- Database connections e query time
- Error rate e response codes
- Queue depth (se aplicavel)

### Step 4: Executar Stress Test

**Objetivo:** Encontrar ponto de ruptura

```javascript
export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 400 },
    { duration: '5m', target: 400 },
    { duration: '2m', target: 800 },  // stress
    { duration: '5m', target: 800 },
    { duration: '5m', target: 0 },
  ],
};
```

**O que observar:**
- Em qual VU count o sistema degrada?
- Error rate comeca a subir em qual ponto?
- O sistema se recupera apos a carga cair?
- Quais recursos saturam primeiro?

### Step 5: Executar Soak Test

**Objetivo:** Validar estabilidade ao longo do tempo

```javascript
export const options = {
  stages: [
    { duration: '5m', target: 100 },   // ramp up
    { duration: '4h', target: 100 },   // sustain for 4 hours
    { duration: '5m', target: 0 },     // ramp down
  ],
};
```

**O que observar:**
- Memory leaks (consumo crescente)
- Connection leaks (connections nao liberadas)
- Disk space (logs, temp files)
- Performance degradation ao longo do tempo

### Step 6: Analise de Resultados

**Objetivo:** Consolidar e interpretar resultados

```
Metricas chave:
- Throughput (req/s) vs Latency (p50, p95, p99)
- Error rate por status code
- Saturation point (VUs vs Response time)
- Resource utilization at peak
- Recovery time after peak
```

**Template de resultado:**
```markdown
## Load Test Results

### Summary
- Peak VUs: 200
- Max throughput: 450 req/s
- p95 at peak: 380ms (budget: 500ms) ✓
- p99 at peak: 720ms (budget: 1000ms) ✓
- Error rate: 0.3% (budget: 1%) ✓
- Saturation point: ~350 VUs

### Bottlenecks Identified
1. Database connection pool (maxed at 250 VUs)
2. Redis latency spike at 300 VUs
3. CPU saturation on app server at 400 VUs
```

### Step 7: Relatorio e Recomendacoes

**Objetivo:** Documentar conclusoes e acoes

---

## Post-Conditions

- [ ] Load test executado com resultados documentados
- [ ] Stress test executado, ponto de ruptura identificado
- [ ] Soak test executado (minimo 2h)
- [ ] Bottlenecks identificados e classificados
- [ ] Scripts de teste versionados no repositorio
- [ ] Performance budgets validados ou ajustados

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-040 | Load test em ambiente de producao | BLOCK |
| FS-V-041 | Teste sem monitoring ativo | BLOCK |
| FS-V-042 | Resultados sem baseline comparativo | WARN |
| FS-V-043 | Stress test sem ponto de ruptura identificado | WARN |
| FS-V-044 | Soak test < 2 horas | WARN |

---

## Quality Gates

- [ ] p95 response time < performance budget
- [ ] Error rate < 1% em load normal
- [ ] Ponto de ruptura > 2x carga normal
- [ ] Sistema se recupera em < 5 min apos stress
- [ ] Nenhum memory leak detectado em soak test

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| `k6` | Load test scripts e execucao |
| `Gatling` | Load testing alternativo |
| `Artillery` | Cloud-scale testing |
| `Grafana` | Visualization during tests |
| `InfluxDB` | Time series storage |

---

*Task FS-T-005 v1.0.0 — Squad FastSystem*
