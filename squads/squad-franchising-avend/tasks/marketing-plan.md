# Task: marketing-plan

```yaml
task: marketing-plan
id: FA-TASK-011
responsavel: "@franchise-growth"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - brand_guidelines_path: string - Path para manual de marca/identidade visual
  - franchise_model_path: string - Path para modelo de franquia (perfil, investimento)
  - market_analysis_path: string - Path para analise de mercado e concorrencia
  - network_data_path: string - Path para dados da rede (performance, territorios)
  - budget_info: string - Orcamento disponivel para marketing

Saida:
  - marketing-plan-avend.md: Plano de marketing completo (captacao + rede)
  - channel-strategy.md: Estrategia por canal de marketing
  - content-calendar.md: Calendario de conteudo (12 meses)

Checklist:
  - Estrategia de captacao de franqueados (lead generation)
  - Estrategia de marketing institucional (brand awareness)
  - Estrategia de suporte ao marketing dos franqueados
  - Canais digitais mapeados e priorizados
  - Canais offline mapeados (feiras ABF, eventos)
  - Funil de conversao desenhado com metricas
  - Orcamento alocado por canal
  - KPIs definidos para cada canal/campanha
  - Calendario de conteudo 12 meses
  - Guidelines para marketing local do franqueado
  - Fundo de marketing (taxa) estruturado

veto_conditions:
  - Plano sem orcamento definido
  - Marketing de captacao com promessas de ganho (viola Lei 13.966)
  - Plano que ignora marketing de suporte ao franqueado
  - Ausencia de metricas e KPIs
  - Canais sem justificativa de ROI esperado

output_examples:
  - |
    ## Marketing Plan Summary — Avend Franquias
    | Frente | Orcamento Anual | Objetivo | KPI Principal |
    |--------|----------------|---------|---------------|
    | Captacao (franqueados) | R$ 120k | 80 leads/mes | CPL < R$ 150 |
    | Institucional (marca) | R$ 80k | Brand awareness | Alcance 1M+ |
    | Suporte rede | R$ 60k | Ferramentas p/ franqueados | Utilizacao > 70% |
    **Total: R$ 260k/ano**
```

---

## Purpose

Criar o **plano de marketing completo** da Avend Franquias, cobrindo as tres frentes essenciais de marketing de uma franqueadora:

1. **Marketing de Captacao (Franchise Development):** Atrair candidatos qualificados a franqueados
2. **Marketing Institucional (Brand Building):** Fortalecer a marca Avend no mercado
3. **Marketing de Suporte a Rede (Franchisee Marketing Support):** Ferramentas e suporte para franqueados promoverem suas unidades

**Principio fundamental:** Marketing de franquia e bifrontal. Voce tem dois "clientes": o candidato a franqueado (que precisa querer comprar a franquia) e o consumidor final (que precisa querer comprar das maquinas). Negligenciar qualquer frente enfraquece o todo.

**Contexto Avend:** Microfranquia de vending machines, ~R$50k investimento. O candidato tipico busca renda complementar, e atraido por modelos de baixo investimento e operacao semi-passiva. O consumidor final e o frequentador de escritorios, hospitais, universidades — busca conveniencia e rapidez. O fundo de marketing (taxa cobrada dos franqueados) financia parte das acoes.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `brand_guidelines_path` | string | Sim | Manual de marca, identidade visual, tom de voz |
| `franchise_model_path` | string | Sim | Perfil do franqueado, investimento, beneficios |
| `market_analysis_path` | string | Nao | Mercado, concorrencia, tendencias |
| `network_data_path` | string | Nao | Performance da rede, territorios disponiveis |
| `budget_info` | string | Sim | Orcamento total disponivel para marketing |
| `current_marketing_data` | string | Nao | Campanhas anteriores, resultados, aprendizados |

---

## Preconditions

1. **Modelo de franquia definido**: Perfil, investimento, beneficios — para comunicar na captacao.
2. **COF pronta**: Necessaria para candidatos que avancam no funil.
3. **Identidade visual**: Logotipo, cores, tipografia — para materiais de marketing.
4. **Orcamento definido**: Pelo menos estimativa de budget anual.
5. **Territorios disponiveis**: Para direcionar captacao para regioes prioritarias.

---

## Key Activities & Instructions

### Frente 1: Marketing de Captacao de Franqueados

**1.1 — Funil de Captacao**

```
FUNIL DE CAPTACAO — AVEND FRANQUIAS
============================================================
TOPO (Awareness):
- Candidato descobre que Avend tem franquias
- Canais: Google, redes sociais, ABF, feiras, PR
- Meta: X impressoes/mes
- KPI: Alcance, impressoes

MEIO (Consideration):
- Candidato pesquisa, compara, avalia
- Canais: Site, landing page, conteudo, webinars
- Meta: X visitantes/mes
- KPI: Visitas, tempo no site, downloads

FUNDO (Decision):
- Candidato preenche formulario, demonstra interesse
- Canais: Formulario, WhatsApp, call, evento
- Meta: X leads/mes
- KPI: Leads, CPL, taxa de qualificacao

POS-FUNIL (Conversion):
- Lead qualificado passa para screening
- Canais: CRM, email, telefone, Discovery Day
- Meta: X franqueados/trimestre
- KPI: Conversao lead→franqueado, CAC
============================================================
```

**1.2 — Canais de Captacao**

**Canais Digitais:**

| Canal | Investimento Mensal | Objetivo | KPI | CPL Esperado |
|-------|-------------------|---------|-----|-------------|
| Google Ads (Search) | R$ | Leads qualificados | CPL, conversao | R$ |
| Google Ads (Display) | R$ | Awareness | Impressoes, cliques | R$ |
| Meta Ads (Instagram/Facebook) | R$ | Leads + awareness | CPL, alcance | R$ |
| LinkedIn Ads | R$ | Perfil executivo | CPL, qualidade | R$ |
| YouTube Ads | R$ | Branding + educacao | Views, leads | R$ |
| SEO / Conteudo Organico | R$ | Trafico organico | Visitas, leads | R$ |
| Email Marketing | R$ | Nurturing de leads | Open rate, conversao | R$ |

**Canais Offline:**

| Canal | Investimento | Objetivo | KPI |
|-------|-------------|---------|-----|
| ABF Franchising Expo | R$ | Leads + branding | Leads na feira, conversao |
| Feiras regionais | R$ | Leads regionais | Leads, custo por lead |
| PR / Imprensa | R$ | Credibilidade | Clippings, alcance |
| Eventos de empreendedorismo | R$ | Awareness | Leads, networking |
| Indicacao de franqueados | R$ 0 | Leads qualificados | Leads indicados, conversao |

**1.3 — Messaging para Captacao**

```yaml
messaging_framework:
  headline_principal: "Franquia de Vending Machines a partir de R$ 50k"
  subheadline: "Renda semi-passiva com a maior rede de vending do Brasil"

  proposta_valor:
    para_investidor:
      - "Investimento acessivel a partir de R$ 50k"
      - "Operacao semi-passiva: 10-20h/semana"
      - "Payback estimado em XX meses"
      - "Suporte completo do franqueador"
      - "Tecnologia de telemetria para gestao remota"
    para_empreendedor:
      - "Seja dono do seu negocio sem sair do emprego"
      - "Mercado em crescimento (vending +15% ao ano)"
      - "184 maquinas operando, modelo comprovado"
      - "Treinamento completo em 5 dias"
      - "Associada ABF"

  diferenciais:
    - "Maior rede de franquias de vending do Brasil"
    - "Tecnologia de telemetria para gestao remota"
    - "Suporte completo: treinamento + consultoria de campo"
    - "Modelo validado com 90+ franqueados"
    - "Associada ABF com selo de qualidade"

  cta_principal: "Preencha o formulario e receba informacoes completas"
  cta_secundario: "Agende uma conversa com nosso time de expansao"

  ATENCAO_LEGAL: >
    NUNCA fazer promessa de ganho ou rentabilidade garantida
    no material de marketing. Isso viola a Lei 13.966/2019
    e o Codigo de Etica da ABF. Usar sempre "estimado",
    "projetado", "resultado pode variar".
```

**1.4 — Landing Page e Site**

Elementos essenciais da landing page de captacao:

```yaml
landing_page:
  hero:
    - Headline principal
    - Imagem profissional (maquinas Avend em ponto real)
    - CTA primario (formulario)

  social_proof:
    - Numero de franqueados (90+)
    - Numero de maquinas (184+)
    - Associacao ABF
    - Depoimentos de franqueados

  modelo:
    - Investimento inicial
    - Perfil ideal do franqueado
    - Beneficios do modelo
    - Diferenciais

  processo:
    - Como funciona o processo de franquia
    - Steps: Interesse → Qualificacao → Entrevista → COF → Contrato

  formulario:
    - Nome, email, telefone, cidade
    - Capital disponivel (faixa)
    - Como conheceu a Avend
    - CTA claro

  compliance:
    - "Este material e informativo e nao constitui promessa de ganho"
    - Link para politica de privacidade (LGPD)
```

---

### Frente 2: Marketing Institucional

**2.1 — Estrategia de Brand Building**

```yaml
brand_strategy:
  posicionamento: "Maior e mais confiavel rede de franquias de vending machines do Brasil"

  pilares_de_conteudo:
    - pilar: "Empreendedorismo acessivel"
      tema: "Como empreender com vending machines"
      formato: "Artigos, videos, posts"
      frequencia: "2x/semana"

    - pilar: "Mercado de vending"
      tema: "Tendencias, dados, oportunidades"
      formato: "Infograficos, reports, webinars"
      frequencia: "1x/semana"

    - pilar: "Cases da rede"
      tema: "Historias de franqueados de sucesso"
      formato: "Videos, entrevistas, posts"
      frequencia: "1x/semana"

    - pilar: "Bastidores"
      tema: "Dia-a-dia da operacao, eventos, treinamentos"
      formato: "Stories, reels, posts"
      frequencia: "3x/semana"

  tom_de_voz:
    - Profissional mas acessivel
    - Educativo (ensina sobre vending e franquias)
    - Transparente (mostra a realidade, nao so o glamour)
    - Inspirador (historias reais de franqueados)
```

**2.2 — Presenca Digital**

| Canal | Objetivo | Conteudo | Frequencia | Responsavel |
|-------|---------|---------|-----------|-------------|
| Instagram | Awareness + leads | Reels, carrossei, stories | Diario | Franqueador |
| LinkedIn | Credibilidade + perfil executivo | Artigos, cases, dados | 3x/semana | Franqueador |
| YouTube | Educacao + SEO | Videos longos, tutoriais | 1x/semana | Franqueador |
| TikTok | Alcance jovem | Reels curtos, bastidores | 3x/semana | Franqueador |
| Blog/SEO | Trafico organico | Artigos otimizados | 2x/semana | Franqueador |
| Newsletter | Nurturing | Conteudo curado | Quinzenal | Franqueador |

**2.3 — PR e Imprensa**

```yaml
pr_strategy:
  assessoria:
    frequencia: "Mensal"
    temas_pautaveis:
      - Resultados da rede (crescimento, novos franqueados)
      - Tendencias do mercado de vending
      - Historias de franqueados
      - Eventos (ABF Expo, convencao)
      - Inovacoes (novos produtos, tecnologia)

  veiculos_alvo:
    tier_1: ["Exame", "Valor Economico", "InfoMoney", "Estadao PME"]
    tier_2: ["Pequenas Empresas Grandes Negocios", "Franchising Brasil"]
    tier_3: ["Portais regionais", "Blogs de empreendedorismo"]

  eventos_para_participar:
    - ABF Franchising Expo (SP) — Obrigatorio
    - ABF Franchising Week (Regional)
    - Eventos SEBRAE
    - Feiras de empreendedorismo regionais
```

---

### Frente 3: Marketing de Suporte a Rede

**3.1 — Kit de Marketing para Franqueados**

```yaml
franchisee_marketing_kit:
  materiais_fisicos:
    - Adesivos de maquina padronizados
    - Banner/display para eventos do ponto
    - Cartao de visita do franqueado
    - Folder institucional
    - Uniformes padronizados

  materiais_digitais:
    - Templates para redes sociais (Canva/editaveis)
    - Banco de imagens oficial
    - Videos institucionais para compartilhar
    - Textos-base para posts
    - Assinatura de email padronizada

  ferramentas:
    - Portal do franqueado com materiais para download
    - Calendario de conteudo sugerido
    - Guidelines de uso da marca em redes sociais
    - Modelos de proposta para novos pontos
```

**3.2 — Guidelines de Marketing Local**

O que o franqueado PODE fazer:
- Publicar nas redes sociais seguindo templates
- Fazer acoes promocionais aprovadas pelo franqueador
- Distribuir material institucional em pontos
- Participar de eventos locais representando a marca

O que o franqueado NAO PODE fazer:
- Criar material com a marca fora dos padroes
- Fazer promessas de precos nao autorizados
- Alterar identidade visual das maquinas
- Criar canais oficiais da marca sem aprovacao
- Fazer publicidade comparativa com concorrentes

**3.3 — Gestao do Fundo de Marketing**

```yaml
marketing_fund:
  contribuicao: "X% do faturamento bruto de cada franqueado"
  gestao: "Franqueador com prestacao de contas trimestral"

  alocacao:
    marketing_digital: 40%
    eventos_feiras: 20%
    pr_assessoria: 15%
    materiais_rede: 15%
    pesquisa_inovacao: 10%

  governanca:
    prestacao_contas: "Relatorio trimestral para franqueados"
    comite_marketing: "Franqueador + 2-3 representantes de franqueados"
    transparencia: "Extrato detalhado de gastos disponivel no portal"
```

---

### Phase 4: Calendario e Metricas

**4.1 — Calendario Anual de Marketing**

| Mes | Captacao | Institucional | Rede | Evento |
|-----|---------|--------------|------|--------|
| Jan | Campanha "Novo ano, novo negocio" | Tendencias do ano | Kit Q1 | |
| Fev | Leads regionais | Cases de sucesso | Webinar rede | |
| Mar | Push ABF Expo | PR pre-evento | Material feira | ABF semana |
| Abr | Campanha pos-feira | Conteudo educativo | Treinamento mkt | |
| Mai | Multi-unit expansion | Dia do trabalho/empreendedor | | |
| Jun | Campanha inverno (vending quente) | Dados mercado ABF | Kit Q2 | ABF Expo |
| Jul | Follow-up feira | Cases franqueados | Webinar rede | |
| Ago | Campanha empreendedorismo | Conteudo tecnico | | SEBRAE |
| Set | Push Q4 | Institucional | Kit Q3 | |
| Out | Campanha Black Friday | Conteudo de tendencias | | |
| Nov | Black Friday leads | PR resultados anuais | Convencao rede | Convencao |
| Dez | Campanha planejamento 2027 | Review do ano | Kit Q4 | |

**4.2 — Dashboard de Metricas**

```
METRICAS DE MARKETING — AVEND FRANQUIAS
============================================================

CAPTACAO (Mensal)
| KPI | Meta | Real | Status |
|-----|------|------|--------|
| Leads totais | | | |
| Leads qualificados | | | |
| CPL medio | R$ | R$ | |
| Conversao lead→franqueado | __% | __% | |
| CAC (Custo Aquisicao Franqueado) | R$ | R$ | |
| Novos franqueados | | | |

INSTITUCIONAL (Mensal)
| KPI | Meta | Real | Status |
|-----|------|------|--------|
| Alcance redes sociais | | | |
| Seguidores (total) | | | |
| Engajamento medio | __% | __% | |
| Visitas ao site | | | |
| Clippings de imprensa | | | |

REDE (Trimestral)
| KPI | Meta | Real | Status |
|-----|------|------|--------|
| Utilizacao kit marketing | __% | __% | |
| Franqueados ativos em social | __% | __% | |
| Satisfacao com suporte marketing | __/10 | __/10 | |

ROI (Trimestral)
| Canal | Investimento | Leads | Conversoes | ROI |
|-------|-------------|-------|-----------|-----|
| Google Ads | R$ | | | X:1 |
| Meta Ads | R$ | | | X:1 |
| LinkedIn | R$ | | | X:1 |
| Feiras | R$ | | | X:1 |
| Indicacao | R$ 0 | | | inf |
| **TOTAL** | R$ | | | X:1 |
============================================================
```

---

## Validation

### Criterios de Qualidade do Plano

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| 3 frentes | Captacao + institucional + rede | [ ] |
| Orcamento | Alocacao por canal definida | [ ] |
| Metricas | KPIs para cada frente/canal | [ ] |
| Compliance | Sem promessa de ganho (Lei 13.966) | [ ] |
| Calendario | 12 meses de planejamento | [ ] |
| Guidelines | Regras de marketing para franqueados | [ ] |
| Fundo de marketing | Gestao e transparencia definidas | [ ] |
| ROI | Expectativa de retorno por canal | [ ] |
| Digital first | Canais digitais priorizados | [ ] |
| Mensuravel | Funil com metricas em cada estagio | [ ] |

### Checklist de Entrega

- [ ] `marketing-plan-avend.md` gerado
- [ ] `channel-strategy.md` gerado
- [ ] `content-calendar.md` gerado
- [ ] Funil de captacao desenhado com metricas
- [ ] Canais priorizados com orcamento
- [ ] Messaging framework de captacao
- [ ] Estrategia de brand building
- [ ] Kit de marketing para franqueados
- [ ] Guidelines de marketing local
- [ ] Gestao do fundo de marketing estruturada
- [ ] Dashboard de metricas definido
- [ ] Calendario 12 meses

---

## References

- **ABF.** "Manual de Marketing para Franquias." Associacao Brasileira de Franchising.
- **Siebert, Mark.** "Franchise Your Business." — Franchise lead generation.
- **Nathan, Greg.** "The Franchise E-Factor." — Marketing como fator de satisfacao.
- **Lei 13.966/2019.** Restricoes a promessas de ganho em material publicitario.
- **Codigo de Etica ABF.** Praticas publicitarias para franquias.
- **Kotler, Philip.** "Marketing Management." — Frameworks de marketing.
- **Cialdini, Robert.** "Influence." — Principios de persuasao etica.

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-011*
