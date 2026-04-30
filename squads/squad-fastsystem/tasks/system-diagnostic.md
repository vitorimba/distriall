# FS-T-001: System Diagnostic

> Diagnostico completo do sistema usando USE method (Utilization, Saturation, Errors)

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-001 |
| **Name** | system-diagnostic |
| **Agent** | system-profiler (Probe) |
| **Execution Type** | Agent |
| **Responsible Executor** | system-profiler (Probe) |
| **Mind** | brendan_gregg |
| **Priority** | Critical |
| **Estimated Duration** | 2-4 hours |
| **Dependencies** | None |
| **Output** | `performance-audit-report.md` |

---

## Descricao

Executa um diagnostico completo do sistema usando a metodologia USE (Utilization, Saturation, Errors) de Brendan Gregg. Analisa CPU, memoria, disco, rede e aplicacao para identificar gargalos e problemas de performance.

Este e o ponto de partida padrao para qualquer investigacao de performance. Antes de otimizar qualquer coisa, precisamos entender o estado atual do sistema.

---

## Pre-Conditions

- [ ] Acesso ao sistema alvo (SSH, logs, metricas)
- [ ] Ferramentas de profiling disponiveis (perf, top, vmstat, iostat)
- [ ] Baseline de performance documentado (se existir)
- [ ] Janela de tempo definida para analise
- [ ] Stakeholders informados sobre possivel impacto de profiling

---

## Steps

### Step 1: Coleta de Contexto

**Objetivo:** Entender o sistema antes de medir

```
Perguntas obrigatorias:
1. Qual e o sintoma reportado? (lento, erro, timeout)
2. Quando comecou? (deploy, pico de trafego, mudanca de config)
3. Qual e o impacto? (usuarios afetados, revenue impact)
4. O que mudou recentemente? (deploy, migration, config change)
5. Existe baseline documentado?
```

**Output:** Contexto documentado com respostas

### Step 2: USE Method — CPU

**Objetivo:** Avaliar utilizacao, saturacao e erros de CPU

```bash
# Utilization
top -b -n 1 | head -20
mpstat -P ALL 1 5
sar -u 1 10

# Saturation
vmstat 1 10
cat /proc/loadavg
uptime

# Errors
dmesg | grep -i "cpu\|mce\|error"
journalctl -p err --since "1 hour ago"
```

**Analise:**
- Utilizacao > 80% sustentado = problema
- Load average > num_cpus = saturado
- Context switches elevados = possivel lock contention

**Heuristica aplicada:** BG_USE_001 — "Para cada recurso, verifique Utilization, Saturation e Errors nessa ordem"

### Step 3: USE Method — Memoria

**Objetivo:** Avaliar uso de memoria, swap e leaks

```bash
# Utilization
free -h
cat /proc/meminfo
vmstat -s

# Saturation
vmstat 1 10  # check si/so columns
sar -W 1 10  # swap activity

# Errors
dmesg | grep -i "oom\|memory\|kill"
journalctl | grep -i "out of memory"
```

**Analise:**
- Swap ativo = memoria insuficiente
- OOM kills = critico, precisa de acao imediata
- Cache/buffer alto sem swap = normal e saudavel

### Step 4: USE Method — Disco/IO

**Objetivo:** Avaliar throughput, IOPS e latencia de disco

```bash
# Utilization
iostat -xz 1 10
df -h
du -sh /var/log/*

# Saturation
iostat -xz 1 10  # await, avgqu-sz columns

# Errors
smartctl -a /dev/sda
dmesg | grep -i "i/o error\|disk"
```

**Analise:**
- await > 10ms em SSD = problema
- %util > 80% sustentado = gargalo de IO
- avgqu-sz > 1 sustentado = fila de IO

### Step 5: USE Method — Rede

**Objetivo:** Avaliar bandwidth, latencia e erros de rede

```bash
# Utilization
sar -n DEV 1 10
ip -s link
ss -s

# Saturation
netstat -s | grep -i "overflow\|drop"
ss -tlnp  # check recv-q/send-q

# Errors
ip -s link | grep -i "error\|drop"
netstat -s | grep -i "retrans"
```

**Analise:**
- Retransmissions > 1% = problema de rede
- Drops/overflows = buffer undersized
- TIME_WAIT excessivo = connection pooling necessario

### Step 6: Profiling de Aplicacao

**Objetivo:** Identificar hot paths na aplicacao

```bash
# CPU profiling (perf)
perf record -g -p <PID> -- sleep 30
perf report

# Flame graph
perf script | stackcollapse-perf.pl | flamegraph.pl > flamegraph.svg

# Node.js specific
node --prof app.js
node --prof-process isolate-*.log

# Java specific
jstack <PID>
jstat -gc <PID> 1000 10
```

**Analise:**
- Flame graphs revelam onde o CPU gasta tempo
- Wide frames = hot paths para otimizar
- Plateau patterns = lock contention

### Step 7: Analise de Logs

**Objetivo:** Correlacionar metricas com eventos

```bash
# Slow queries
grep "slow query" /var/log/postgresql/*.log
grep "duration:" /var/log/postgresql/*.log | sort -t: -k2 -rn | head -20

# Application errors
grep -c "ERROR\|WARN\|FATAL" /var/log/app/*.log
grep "timeout\|connection refused" /var/log/app/*.log

# System events
journalctl --since "2 hours ago" -p warning
```

### Step 8: Sintese e Relatorio

**Objetivo:** Consolidar achados em relatorio acionavel

Usar template: `templates/performance-audit-report-tmpl.md`

**Conteudo obrigatorio:**
1. Executive Summary (3 linhas)
2. Metodologia aplicada (USE method)
3. Achados por recurso (CPU, Mem, Disk, Net, App)
4. Classificacao de severidade (P0-P3)
5. Recomendacoes priorizadas
6. Metricas baseline capturadas
7. Proximos passos

---

## Post-Conditions

- [ ] Relatorio de diagnostico gerado
- [ ] Gargalos identificados e classificados por severidade
- [ ] Baseline de performance documentado
- [ ] Recomendacoes priorizadas com estimativa de impacto
- [ ] Metricas coletadas armazenadas para comparacao futura

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-001 | Otimizacao iniciada sem baseline documentado | BLOCK |
| FS-V-002 | Profiling em producao sem janela aprovada | BLOCK |
| FS-V-003 | Diagnostico sem USE method completo | WARN |
| FS-V-004 | Relatorio sem classificacao de severidade | BLOCK |
| FS-V-005 | Recomendacoes sem estimativa de impacto | WARN |

---

## Quality Gates

- [ ] USE method aplicado para todos os 4 recursos (CPU, Mem, Disk, Net)
- [ ] Flame graph gerado para aplicacao
- [ ] Baseline quantitativo documentado (p50, p95, p99)
- [ ] Pelo menos 3 recomendacoes priorizadas
- [ ] Relatorio revisado por performance-lead

---

## Metricas de Sucesso

| Metrica | Target |
|---------|--------|
| Cobertura USE method | 100% dos recursos |
| Gargalos identificados | >= 1 com evidencia |
| Tempo de diagnostico | < 4 horas |
| Acuracidade do diagnostico | Confirmado por fix subsequente |

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| `perf` | CPU profiling, flame graphs |
| `vmstat` | Virtual memory statistics |
| `iostat` | IO statistics |
| `sar` | System activity reporter |
| `ss` | Socket statistics |
| `top/htop` | Process monitoring |
| `dmesg` | Kernel messages |
| `flamegraph.pl` | Flame graph generation |

---

## Referencia

- Brendan Gregg, "Systems Performance", 2020 — Chapter 2: Methodology
- USE Method: https://www.brendangregg.com/usemethod.html
- Linux Performance Analysis in 60s: https://netflixtechblog.com/linux-performance-analysis-in-60-000-milliseconds-accc10403c55

---

*Task FS-T-001 v1.0.0 — Squad FastSystem*
