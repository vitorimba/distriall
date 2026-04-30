<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: consult-board
  task_name: Consultar o Board
  status: active
  responsible_executor: '@board-orchestrator'
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

# Task: Consultar o Board

**Task ID**: consult-board
**Agent**: @board-orchestrator
**Version**: 1.0.0

---

## Purpose

Submeter uma questão estratégica ao Advisory Board completo e receber recomendação unificada com perspectivas dos 3 conselheiros + decisão do Agente Chefe.

---

## Inputs

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `question` | string | Yes | Questão estratégica a ser consultada | "Devo aceitar parceria com X por 30%?" |
| `context` | string | No | Contexto adicional relevante | "Ele tem 50k seguidores e fatura R$20k/mês" |
| `type` | enum | No | Tipo de decisão | `deal`, `strategy`, `priority`, `positioning`, `pricing`, `general` |
| `urgency` | enum | No | Urgência | `today`, `this_week`, `this_month` |

---

## Workflow

### Step 0: Pre-Flight — Input Obrigatório ⛔

```
GATE BLOQUEANTE — Board NÃO roda sem isso.

VERIFICAR antes de qualquer coisa:
1. `question` está preenchido?
   → NÃO: PARAR. Perguntar: "Qual é a questão que você quer submeter ao board?"
   → SIM: continuar
2. `question` tem contexto suficiente para os conselheiros analisarem?
   → Mínimo: 1 frase descrevendo a situação + 1 dado concreto (número, valor, prazo)
   → NÃO: Perguntar: "Me dá mais contexto: números, valores envolvidos, prazo, histórico."
   → SIM: continuar
3. Se `type` não foi fornecido, inferir do conteúdo da questão:
   → Menção a parceria/sociedade → type: deal
   → Menção a preço/valor → type: pricing
   → Menção a prioridade/foco → type: priority
   → Menção a direção/futuro → type: strategy
   → Outros → type: general

REGRA: NUNCA prosseguir para Step 1 sem question + contexto mínimo.
"O que não tem dados não deveria ter opinião." — PV
```

### Step 1: Enquadrar a Questão

```markdown
CLASSIFICAR (com dados do Step 0):
1. Tipo de decisão (deal/strategy/priority/positioning/pricing/general)
2. Urgência (today/this_week/this_month)
3. Qual conselheiro tem mais peso nesta questão
4. Que dados estão disponíveis vs faltando
```

**Se dados AINDA insuficientes após Step 0:** Perguntar ao José itens específicos que faltam antes de consultar o board.

### Step 2: Carregar Contexto das Minds

Para cada conselheiro, carregar (em ordem de prioridade):
1. System prompt de `outputs/minds/{slug}/system_prompts/` (se existir)
2. Frameworks de `data/decision-frameworks.yaml`
3. Definição do agente em `agents/board-orchestrator.md`

### Step 3: Canalizar Conselheiros

Executar sequencialmente:

**Naval Ravikant:**
- Filtrar questão pela lente de leverage e equity
- Pergunta-chave: "Isso escala sem presença?"
- Output: Diagnóstico + Recomendação + Veredicto

**Alex Hormozi:**
- Filtrar questão pela lente de monetização e unit economics
- Pergunta-chave: "Qual é a matemática?"
- Output: Diagnóstico + Recomendação + Veredicto

**Peter Thiel:**
- Filtrar questão pela lente de monopólio e contrarian thinking
- Pergunta-chave: "Está competindo ou criando?"
- Output: Diagnóstico + Recomendação + Veredicto

### Step 4: Análise de Convergência

```markdown
| Aspecto | Naval | Hormozi | Thiel | Consenso |
|---------|-------|---------|-------|----------|

Identificar:
- Acordo forte (2+ concordam)
- Divergência (e por quê)
- Ponto cego (o que nenhum cobriu)
```

### Step 5: Decisão do Agente Chefe (Elon Musk)

Com as 3 perspectivas + convergência, Elon:
1. Aplica first principles
2. Remove complexidade
3. Entrega decisão + ação imediata + deadline

### Step 6: Salvar Sessão

Salvar em `docs/logs/YYYY-MM-DD_board-session.md` usando template de `templates/board-session-report.md`.

---

## Output

| Output | Path | Description |
|--------|------|-------------|
| Board Session Report | `docs/logs/YYYY-MM-DD_board-{tipo}.md` | Relatório completo da sessão |

---

## Elicitation

```yaml
elicit: true
points:
  - step: 1
    question: "Qual é a questão que você quer submeter ao board?"
    type: free_text
  - step: 1
    question: "Tem contexto adicional? (números, dados, histórico)"
    type: free_text
    required: false
```

---

## Success Criteria

- [ ] Todos os 3 conselheiros emitiram perspectiva autêntica
- [ ] Tabela de convergência preenchida
- [ ] Agente Chefe entregou decisão clara com ação + deadline
- [ ] Sessão salva em docs/logs/
- [ ] José sabe exatamente o que fazer HOJE

---

*Task v1.0.0 - Created: 2026-01-31*
