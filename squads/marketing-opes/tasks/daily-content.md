<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: daily-content
  task_name: Daily Content — OPES Marketing Arm
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

# Task: Daily Content — OPES Marketing Arm

**Task ID**: daily-content
**Agent**: @marketing-ideation → @marketing-cmo → @marketing-production → @marketing-designer → @marketing-distribution → @auto-publish
**Version**: 3.0.0

---

## Purpose

Gerar E PUBLICAR conteúdo diário para Instagram + LinkedIn do José. Pipeline end-to-end: ideação → produção → distribuição → publicação automática via API.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tema` | string | No | Tema específico (se não fornecido, segue calendário semanal) |
| `angulo` | string | No | Ângulo preferido (confessional/tutorial/provocação) |
| `contexto` | string | No | Algo que aconteceu hoje que pode virar conteúdo |
| `auto` | boolean | No | Se true, pula escolha de ângulo e auto-seleciona |

---

## Workflow

### Step 1: Carregar Contexto

```
1. Ler data/content-map.yaml (mapa de conteúdo)
2. Ler data/platform-specs.yaml (specs das plataformas)
3. Verificar dia da semana → tema do calendário
4. Verificar queue → próxima ideia programada
```

### Step 2: Ideação (@marketing-ideation)

```
1. Consultar Content Map para tema do dia
2. Gerar Big Idea + 3 ângulos
3. Se `auto: true` → selecionar ângulo mais forte
4. Se `auto: false` → apresentar 3 ângulos para José escolher
```

**Output:** Big Idea + ângulo selecionado + prova disponível

### Step 2.5: QA Gate — CMO Validation (@marketing-cmo) ⛔

```
GATE OBRIGATÓRIO — Nenhum conteúdo avança sem passar.

1. @cmo recebe Big Idea + ângulo selecionado
2. Aplica 3 filtros:
   a. SVA: "Para quem ESPECIFICAMENTE é isso?"
      → Se vago → DEVOLVER para @ideation com direção
   b. Purple Cow: "Alguém compartilharia sem ser pedido?"
      → Se score < 4/5 → DEVOLVER com motivo
   c. Permission: "Constrói confiança ou interrompe?"
      → Se interrompe → VETAR
3. Resultado:
   ✅ APROVADO → Avança para Produção com nota do CMO
   🔄 REESCREVER → Volta para @ideation (máx 2 loops)
   ❌ VETADO → Para. Registra motivo. Puxa próxima da queue.
```

**Output:** Big Idea aprovada + nota CMO + Purple Cow score

> ⚠️ Se a ideia for vetada 2x seguidas, @cmo deve fornecer
> direção explícita para @ideation antes do terceiro loop.

### Step 3: Produção (@marketing-production)

```
1. Receber Big Idea + ângulo
2. Escrever post na voz do José
3. Executar checklist de qualidade:
   - Hook ≤10 palavras
   - Começa com cena real
   - Zero blacklist LLM
   - Prova real incluída
   - Conexão nexialista
   - Voz autêntica José
4. Se falhar em qualquer item → reescrever
```

**Output:** Post completo validado

### Step 3.5: Direção Visual (@marketing-designer)

```
1. Receber Big Idea + post completo + ângulo
2. Executar Decision Tree → definir formato visual:
   - Sequência (passo-a-passo, lista)? → CARROSSEL (5-10 slides)
   - Contraste forte (antes/depois)? → IMAGEM ÚNICA (split)
   - Confessional/pessoal? → TEXTO PURO
   - Dúvida? → TEXTO PURO (seguro > medíocre)
3. Se CARROSSEL:
   a. Distribuir conteúdo por slide (1 ideia por slide)
   b. Escrever texto de cada slide (max 15 palavras)
   c. Gerar prompt Gemini para background
4. Se IMAGEM ÚNICA:
   a. Definir composição (split, centered, overlay)
   b. Gerar prompt Gemini seguindo brand guide
5. Se TEXTO PURO:
   a. Registrar decisão + motivo
6. Gerar Visual Brief (IG + LinkedIn) seguindo brand-guide.yaml
7. Verificar: Brand guide respeitada? Legível em mobile? WCAG AA?
```

**Output:** Visual Brief completo (formato + specs + prompts por plataforma)

> ⚠️ Regra cardinal: Remarkable ou sem imagem. Visual medíocre é pior que texto puro.

### Step 4: Distribuição (@marketing-distribution)

```
1. Receber post validado + Visual Brief de @designer
2. Adaptar texto para Instagram (≤2200 chars, casual, 10-15 hashtags)
3. Adaptar texto para LinkedIn (≤3000 chars, profissional, 3-5 hashtags)
4. Incorporar Visual Brief nas versões finais
5. Verificar que são DIFERENTES (não copy-paste)
6. Incluir CTA adequado em cada
```

**Output:** 2 versões prontas para postar

### Step 5: Salvar Output

```
1. Formatar output usando template daily-content-output.md
2. Salvar em outputs/hubs/marketing/YYYY-MM-DD.md
```

### Step 5.5: Geração de Imagem (integrada no publish.py)

```
A geração de imagem é AUTOMÁTICA dentro do publish.py (Step 6).
NÃO é um step manual separado. O fluxo real é:

1. Se formato = CARROSSEL:
   a. @designer gera prompts Gemini para cada slide no Visual Brief
   b. Slides são gerados e salvos em outputs/hubs/marketing/YYYY-MM-DD-carousel/
   c. publish.py faz upload de cada slide e publica como carousel

2. Se formato = IMAGEM ÚNICA:
   a. @designer gera 1 prompt Gemini no Visual Brief
   b. publish.py verifica se outputs/hubs/marketing/YYYY-MM-DD-cover.png existe:
      → SIM: usa a imagem existente
      → NÃO: gera via Nano Banana Pro (gemini-3-pro-image-preview) automaticamente
   c. Imagem é uploaded para catbox.moe e publicada

3. Se formato = TEXTO PURO:
   a. Pular geração de imagem
   b. Registrar motivo no output do dia

Tecnologia: publish.py → generate_image_gemini() (linha 119)
API: generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview
Aspect ratio: 9:16 (IG portrait) | Fallback prompt genérico se Visual Brief não tiver prompt
Credencial: google.api_key em ~/.config/aios/credentials.yaml

Pre-flight: publish.py valida se gemini_key existe ANTES de tentar.
Se ausente → AVISO (não bloqueia) → publica sem imagem.
```

**Output:** Imagem gerada automaticamente pelo publish.py (se aplicável)

> ⚠️ Para gerar imagens ANTES do publish (ex: revisão manual), rode:
> `python3 scripts/publish.py YYYY-MM-DD --dry-run` — gera imagem sem publicar.

### Step 6: Publicação Automática (publish.py)

```
AUTOMÁTICO — Sem intervenção manual.

1. Executar: python3 scripts/publish.py [YYYY-MM-DD]
2. O script:
   a. Posta no LinkedIn via /v2/ugcPosts (texto)
   b. Upload da imagem para hosting temporário
   c. Posta no Instagram via Content Publishing API (imagem + caption)
   d. Envia confirmação via WhatsApp (UazAPI)
3. Registra no output do dia:
   - LinkedIn share ID
   - Instagram media ID
   - Horários de publicação

APIs utilizadas:
  - Meta Graph API (instagram_content_publish) — token expira ~60 dias
  - LinkedIn /v2/ugcPosts (w_member_social) — token expira ~60 dias
  - UazAPI (WhatsApp) — notificação de confirmação

Credenciais: ~/.config/aios/credentials.yaml
Script: .aios-core/expansion-packs/marketing-opes/scripts/publish.py
```

**Output:** Posts publicados + IDs registrados em `outputs/hubs/marketing/YYYY-MM-DD.md`

### Step 7: QA Gate — Pós-Publicação ⛔

```
GATE OBRIGATÓRIO — Fecha o loop de dados.

Após publicação automática:

1. Verificar se posts estão visíveis:
   - IG: https://instagram.com/josecarlosamorim.ai
   - LI: https://linkedin.com/in/josecarlosamorim
2. Registrar no output do dia:
   - [x] IG postado — ID: ___
   - [x] LinkedIn postado — ID: ___
3. Se ERRO em alguma plataforma → registrar e tentar novamente
4. Se José quiser alterar → registrar alteração para @metrics

Fonte de dados: retorno da API (automático) + input manual (se alteração).
```

**Output:** Status de publicação confirmado em `outputs/hubs/marketing/YYYY-MM-DD.md`

> ⚠️ Sem este registro, @metrics opera cego.
> O relatório semanal EXIGE esses dados para calcular os 3 KPIs.

---

## Output

| Output | Path | Description |
|--------|------|-------------|
| Daily Content | `outputs/hubs/marketing/YYYY-MM-DD.md` | Post do dia (IG + LinkedIn) |

---

## Elicitation

```yaml
elicit: conditional
points:
  - step: 2
    condition: "auto != true"
    question: "Qual ângulo você prefere?"
    type: choice
    options:
      - "1. [Ângulo Confessional]"
      - "2. [Ângulo Tutorial]"
      - "3. [Ângulo Provocação]"
  - step: 1
    condition: "contexto provided"
    question: null
    note: "Se José forneceu contexto do dia, priorizar sobre queue"
```

---

## Exemplo de Uso

### Modo Automático (sem interação)
```
/daily-content auto=true
```
→ Gera conteúdo do dia automaticamente, sem perguntas.

### Modo Interativo
```
/daily-content
```
→ Apresenta 3 ângulos, José escolhe, gera conteúdo.

### Com Contexto do Dia
```
/daily-content contexto="Hoje meu advisory board de IA me disse que estou sendo coadjuvante na minha própria história"
```
→ Usa o contexto como matéria-prima da ideação.

---

## Success Criteria

- [ ] CMO aprovou Big Idea antes da produção (Gate 2.5)
- [ ] Purple Cow score ≥ 4/5
- [ ] Post do dia gerado para Instagram E LinkedIn
- [ ] Posts são DIFERENTES entre plataformas
- [ ] Voz autêntica do José (passa no checklist)
- [ ] Zero expressões da blacklist LLM
- [ ] Dentro dos limites de caracteres
- [ ] Visual Brief gerado por @designer (ou "texto puro" justificado)
- [ ] Visual coerente com Big Idea e brand guide
- [ ] CTA adequado em cada plataforma
- [ ] Salvo em outputs/hubs/marketing/
- [ ] Imagem gerada via Nano Banana Pro (ou texto puro justificado)
- [ ] Publicado no LinkedIn via API (share ID registrado)
- [ ] Publicado no Instagram via API (media ID registrado)
- [ ] Confirmação enviada via WhatsApp
- [ ] Status de publicação confirmado (Gate 7)

---

## Infraestrutura de Publicação

| Plataforma | API | Endpoint | Token Expira |
|------------|-----|----------|--------------|
| LinkedIn | /v2/ugcPosts | api.linkedin.com | ~60 dias (renovar manual) |
| Instagram | Content Publishing | graph.facebook.com/v21.0 | Page token = permanente |
| WhatsApp | UazAPI | jcarlosamorimppt.uazapi.com | N/A |
| Imagens | Nano Banana Pro | generativelanguage.googleapis.com | API key (permanente) |
| Hosting | catbox.moe | catbox.moe/user/api.php | N/A (free, no auth) |

**Script:** `.aios-core/expansion-packs/marketing-opes/scripts/publish.py`
**Credenciais:** `~/.config/aios/credentials.yaml`

---

*Task v3.0.0 — OPES Marketing Arm Daily Pipeline (End-to-End)*
*Ideação → CMO → Produção → Designer → Distribuição → Publicação Automática*
