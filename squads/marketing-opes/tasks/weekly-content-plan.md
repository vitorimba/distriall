<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: weekly-content-plan
  task_name: Weekly Content Plan — OPES Marketing Arm
  status: active
  responsible_executor: '@marketing-cmo'
  execution_type: Worker
  estimated_time: 30m
  domain: Tactical
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

<!-- SINKRA_CONTRACT:START -->
```yaml
sinkra_contract:
  Domain: Tactical
  atomic_layer: Atom
  executor: Worker
  pre_condition: "inputs e dependencias resolvidos antes de iniciar."
  post_condition: "output principal gerado e pronto para handoff."
  performance: "executar dentro do SLA, registrar erro e escalar sem falha silenciosa."
```
<!-- SINKRA_CONTRACT:END -->

# Task: Weekly Content Plan — OPES Marketing Arm

**Task ID**: weekly-content-plan
**Agent**: @marketing-ideation
**Version**: 1.0.0

---

## Purpose

Planejar 7 dias de conteúdo de uma vez, populando a queue do Content Map. Executar no domingo ou segunda para ter a semana inteira mapeada.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `semana` | date | No | Data de início da semana (default: próxima segunda) |
| `foco` | string | No | Tema prioritário da semana |

---

## Workflow

### Step 1: Revisão da Semana Anterior

```
1. Verificar outputs/hubs/marketing/ — posts da semana passada
2. Identificar temas usados (evitar repetição)
3. Se metrics-weekly foi executado, incorporar insights
```

### Step 2: Geração do Plano Semanal

```
Para cada dia (seg-sex):
1. Consultar weekly_theme_rotation em platform-specs.yaml:
   - Segunda: "OPES na Prática (como funciona)"
   - Terça: "Skill Stacking (conectar experiências diversas)"
   - Quarta: "Jornada Real (bastidores, erros)"
   - Quinta: "OPES na Prática (tutorial/demonstração)"
   - Sexta: "Reflexão/Provocação (contrarian take)"
2. Mapear tema do dia → território em content-map.yaml:
   - OPES na Prática → "Build in Public" ou "Instalação Premium"
   - Skill Stacking → "Filosofia do One-Person" (sub: Skill Stacking)
   - Jornada Real → "Jornada Real"
   - Provocação → "Filosofia do One-Person" (sub: Anti-Corporativo)
3. Selecionar sub-topic do território
4. Gerar Big Idea + ângulo + tensão obrigatória (ver regras_operacionais)
5. Definir formato visual (F1-F5) por dia
6. Definir adaptação por plataforma:
   - IG: casual, 1500-2000 chars, 10-15 hashtags, emoji 1-3, CTA "Salva/Manda"
   - LI: profissional, 1800-2500 chars, 3-5 hashtags, sem emoji, CTA "Concorda?/DM"
7. Adicionar à queue
```

### Step 3: Apresentar Plano

```markdown
| Dia | Tema (rotation) | Território | Big Idea | Ângulo | Tensão | Formato | Prova |
|-----|-----------------|------------|----------|--------|--------|---------|-------|
| Seg | OPES na Prática | Build in Public | [idea] | [angle] | [tension] | F3 | [proof] |
| Ter | Skill Stacking | Filosofia One-Person | [idea] | [angle] | [tension] | F3 | [proof] |
| Qua | Jornada Real | Jornada Real | [idea] | [angle] | [tension] | F4 | [proof] |
| Qui | OPES na Prática | Instalação Premium | [idea] | [angle] | [tension] | F2 | [proof] |
| Sex | Provocação | Filosofia One-Person | [idea] | [angle] | [tension] | F1 | [proof] |

Adaptações por plataforma:
| Dia | IG chars | IG CTA | LI chars | LI CTA |
|-----|----------|--------|----------|--------|
| Seg | ~1500 | "Salva pra aplicar" | ~2000 | "Concorda?" |
| ... | ... | ... | ... | ... |
```

### Step 4: Aprovação e Salvamento

```
1. José aprova ou ajusta
2. Atualizar queue no content-map.yaml
3. Plano salvo e pronto para /daily-content
```

---

## Output

| Output | Path | Description |
|--------|------|-------------|
| Weekly Plan | `data/content-map.yaml` (queue section) | Queue atualizada com 5 ideias |

---

## Success Criteria

- [ ] 5 Big Ideas geradas (seg-sex)
- [ ] Sem repetição de temas da semana anterior
- [ ] Cada ideia tem prova disponível
- [ ] Queue atualizada no content-map.yaml
- [ ] José aprovou o plano

---

*Task v1.0.0 — Weekly Planning for OPES Marketing*
