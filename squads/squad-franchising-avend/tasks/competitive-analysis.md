# Task: competitive-analysis

```yaml
task: competitive-analysis
id: FA-TASK-014
responsavel: "@franchise-growth + @franchising-chief"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - market_segment: string - Segmento de mercado (default: "vending machines Brazil")
  - competitor_data_path: string - Path para base de dados competitivos (data/vending-competitors.yaml)
  - avend_data_path: string - Path para dados internos da Avend (financeiros, operacionais)
  - territory_focus: string - Foco territorial da analise (nacional, regional, municipal)
  - analysis_depth: string - Profundidade: "quick" (2-3h), "standard" (1-2 dias), "deep" (3-5 dias)

Saida:
  - competitive-analysis-report.md: Relatorio completo de analise competitiva
  - positioning-matrix.md: Matriz de posicionamento com recomendacoes
  - strategic-recommendations.md: Recomendacoes estrategicas priorizadas
  - competitor-profiles-updated.yaml: Perfis de concorrentes atualizados

Checklist:
  - Mapeamento de concorrentes diretos atualizado
  - Mapeamento de concorrentes indiretos atualizado
  - Porter's 5 Forces aplicado ao segmento
  - Matriz de posicionamento construida
  - SWOT atualizada com dados mais recentes
  - Gap analysis concluida
  - Recomendacoes estrategicas priorizadas
  - Fontes de dados documentadas
  - Apresentacao executiva preparada
  - Dados de concorrentes verificados (fontes primarias)

veto_conditions:
  - Analise baseada exclusivamente em dados secundarios sem verificacao
  - Recomendacoes estrategicas sem fundamentacao em dados
  - Omissao de concorrentes com mais de 30 unidades
  - SWOT sem atualizacao nos ultimos 90 dias
  - Analise que ignora concorrentes indiretos relevantes

output_examples:
  - |
    ## Competitive Analysis — Q1 2026
    | Concorrente | Investimento | Unidades | Threat Level | Trend |
    |-------------|-------------|----------|--------------|-------|
    | Vendmini | R$25k-R$45k | ~100 | ALTO | Crescendo |
    | Kube Vending | R$35k-R$75k | ~55 | ALTO | Estavel |
    | Baggio | R$45k-R$85k | ~80 | MEDIO | Crescendo |
    | Let's Vend | R$50k-R$120k | ~65 | MEDIO | Estavel |
    **Posicao Avend: LIDER em numero de contratos, CHALLENGER em investimento**
    **Recomendacao: Criar modelo entry-level R$30k para competir com Vendmini**
```

---

## Purpose

Realizar analise competitiva completa e estruturada do mercado de franquias de vending machines no Brasil, posicionando a Avend Franquias em relacao aos concorrentes diretos e indiretos, identificando gaps de mercado, ameacas emergentes e oportunidades estrategicas.

A analise competitiva e fundamental para orientar decisoes de precificacao, posicionamento, expansao territorial e desenvolvimento de novos modelos de franquia. No mercado brasileiro de vending, que ainda esta em fase de crescimento e consolidacao, entender o landscape competitivo e vantagem competitiva direta.

**Contexto de mercado:** O setor de vending machines no Brasil movimenta aproximadamente R$2-3 bilhoes/ano (estimativa ABVA), com penetracao muito inferior a mercados maduros como EUA (~R$130bi), Japao (~R$90bi) e Europa (~R$80bi). Isso significa que o mercado tem espaco para crescer 5-10x, mas tambem que novos entrantes estao acelerando.

**Frequencia recomendada:** Analise completa a cada trimestre, com updates mensais de monitoring.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `market_segment` | string | Sim | Segmento de mercado para analise |
| `competitor_data_path` | string | Sim | Path para `data/vending-competitors.yaml` |
| `avend_data_path` | string | Sim | Dados internos: faturamento, unidades, KPIs |
| `territory_focus` | string | Nao | Foco territorial (default: nacional) |
| `analysis_depth` | string | Nao | "quick", "standard" (default), "deep" |
| `previous_analysis_path` | string | Nao | Analise anterior para comparacao |
| `industry_reports` | string | Nao | Relatorios setoriais ABF, ABVA |

---

## Step 1: Market Mapping — Mapeamento de Mercado

### 1.1 Identificacao de Concorrentes

**Executor:** @franchise-growth

**Objetivo:** Atualizar mapeamento completo de concorrentes diretos e indiretos no mercado brasileiro de franquias de vending machines.

**Fontes de dados primarias:**
- Portal ABF (listagem oficial de franquias)
- Sites especializados: Guia Franquias, Franquias.com.br, Sua Franquia
- LinkedIn (paginas empresariais dos concorrentes)
- Reclame Aqui (reputacao e volume de reclamacoes)
- Registro de marcas INPI
- Econodata (dados empresariais)

**Fontes secundarias:**
- Google Trends (volume de busca por marca)
- Instagram/TikTok (presenca digital e engajamento)
- Feiras de franquia (stands e materiais)
- Grupos de WhatsApp/Telegram de franqueados

**Classificacao de concorrentes:**

| Tipo | Definicao | Criterio |
|------|-----------|----------|
| **Direto A** | Franquia de vending machines com investimento similar | Investimento R$30k-R$80k, modelo franquia |
| **Direto B** | Franquia de vending com investimento diferente | Vending mas faixa de investimento distinta |
| **Indireto A** | Modelos de autosservico nao-vending | Micromarket, honest market, self-checkout |
| **Indireto B** | Microfranquias de baixo investimento (outros segmentos) | Competem pela atencao do mesmo investidor |
| **Substituto** | Alternativas ao modelo de franquia | Operadores independentes, cooperativas |

**Deliverable:** Lista atualizada de concorrentes com classificacao, dados basicos e threat level.

### 1.2 Coleta de Dados Competitivos

**Executor:** @franchise-growth

**Para cada concorrente direto, coletar:**

| Dado | Fonte | Frequencia |
|------|-------|-----------|
| Investimento total | Site oficial, portal ABF | Trimestral |
| Taxa de franquia | Site oficial, COF (se acessivel) | Trimestral |
| Royalties | Site oficial, franqueados | Trimestral |
| Numero de unidades | ABF, site oficial, LinkedIn | Trimestral |
| Faturamento medio estimado | Franqueados, ABF | Semestral |
| Satisfacao de franqueados | Reclame Aqui, reviews | Mensal |
| Tecnologia utilizada | Site oficial, demonstracoes | Semestral |
| Modelo de operacao | Site oficial, franqueados | Semestral |
| Regiao de atuacao | Site oficial, mapa de unidades | Trimestral |
| Diferenciais declarados | Site oficial, materiais | Trimestral |
| Reclamacoes/litigios | Reclame Aqui, TJ | Trimestral |
| Presenca digital | Instagram, Google, TikTok | Mensal |

**Metodos de coleta etica:**
- Informacoes publicas apenas (nunca espionagem ou engano)
- Mystery shopping em eventos publicos (feiras ABF)
- Analise de materiais publicos disponíveis
- Conversas com franqueados em contextos publicos
- Monitoramento de midia e redes sociais

---

## Step 2: Competitor Profiling — Perfil Detalhado dos Concorrentes

### 2.1 Perfil Estrategico por Concorrente

**Executor:** @franchise-growth

**Para cada concorrente direto (tipo A e B), elaborar:**

**a) Modelo de Negocio Canvas Simplificado:**
- Proposta de valor principal
- Segmento de clientes (franqueados e consumidores)
- Canais de aquisicao de franqueados
- Fontes de receita (taxa, royalties, insumos, equipamentos)
- Recursos-chave (tecnologia, equipe, marca)
- Atividades-chave (suporte, logistica, marketing)

**b) Analise Financeira Comparativa:**
- Investimento total (faixa)
- Composicao do investimento (taxa vs equipamento vs capital de giro)
- Modelo de royalties (fixo vs percentual)
- Payback estimado
- Faturamento medio por unidade
- Margem estimada do franqueado

**c) Analise de Reputacao:**
- Score Reclame Aqui (se disponivel)
- Reviews de franqueados (positivos e negativos)
- Presenca em rankings ABF
- Mencoes em midia especializada
- Litigios publicos

**d) Analise de Capacidade:**
- Equipe estimada da franqueadora
- Capacidade de suporte (franqueados por consultor)
- Infraestrutura tecnologica
- Capacidade de expansao (velocity de novas unidades)

### 2.2 Benchmark Competitivo

**Executor:** @franchise-growth

**Construir tabela comparativa normalizada:**

| Dimensao | Peso | Metrica | Avend | Comp1 | Comp2 | CompN |
|----------|------|---------|-------|-------|-------|-------|
| Acessibilidade | 15% | Investimento minimo | ? | ? | ? | ? |
| Retorno | 20% | Payback estimado | ? | ? | ? | ? |
| Suporte | 20% | Score de suporte | ? | ? | ? | ? |
| Tecnologia | 15% | Score tecnologico | ? | ? | ? | ? |
| Escala | 10% | Numero de unidades | ? | ? | ? | ? |
| Reputacao | 10% | Score Reclame Aqui | ? | ? | ? | ? |
| Inovacao | 10% | Novos modelos/ano | ? | ? | ? | ? |

**Scoring: 1-10 por dimensao, ponderado pelo peso.**

---

## Step 3: Positioning Matrix — Matriz de Posicionamento

### 3.1 Mapa Perceptual

**Executor:** @franchise-growth

**Construir mapas perceptuais bidimensionais:**

**Mapa 1: Investimento vs Suporte**
- Eixo X: Investimento total (R$20k → R$150k)
- Eixo Y: Nivel de suporte (basico → premium)
- Posicionar todos os concorrentes + Avend

**Mapa 2: Tecnologia vs Escala**
- Eixo X: Sofisticacao tecnologica (basica → avancada)
- Eixo Y: Escala da rede (pequena → grande)
- Posicionar todos os concorrentes + Avend

**Mapa 3: Preco do Consumidor vs Diversificacao**
- Eixo X: Ticket medio do consumidor final
- Eixo Y: Diversificacao de produtos/formatos
- Posicionar todos os concorrentes + Avend

### 3.2 Estrategia de Posicionamento Recomendada

**Executor:** @franchising-chief

**Definir posicionamento-alvo da Avend em cada dimensao:**

| Dimensao | Posicao Atual | Posicao Desejada | Gap | Acao Necessaria |
|----------|--------------|-----------------|-----|-----------------|
| Investimento | Meio | Meio (com opcao entry) | Criar modelo economico | Novo modelo R$30k |
| Suporte | Acima da media | Lider | Pequeno | Melhorar SLAs |
| Tecnologia | Acima da media | Lider | Medio | Investir em IA/dados |
| Escala | Lider | Lider (dobrar) | Grande | Acelerar expansao |
| Reputacao | Boa | Excelente | Pequeno | Programa NPS |

---

## Step 4: Gap Analysis — Analise de Gaps

### 4.1 Gaps Competitivos (Avend vs Concorrentes)

**Executor:** @franchise-growth

**Identificar gaps onde a Avend esta atras:**

| Gap | Concorrente Referencia | Impacto | Dificuldade de Fechar | Prioridade |
|-----|----------------------|---------|----------------------|-----------|
| Investimento minimo mais alto | Vendmini (R$25k) | Alto — perde candidatos sensiveis a preco | Media | P1 |
| Presenca regional limitada | Baggio (forte no Sul) | Medio — mercado aberto no Sul | Alta | P2 |
| Modelo de micromarket | Let's Vend | Medio — evolucao do vending | Alta | P3 |
| ... | ... | ... | ... | ... |

### 4.2 Gaps de Mercado (oportunidades nao exploradas)

**Executor:** @franchise-growth + @franchising-chief

**Avaliar cada gap de mercado identificado:**

| Gap de Mercado | Tamanho Estimado | Fit com Avend | Investimento Necessario | Timeline | Prioridade |
|----------------|-----------------|---------------|------------------------|----------|-----------|
| Vending em condominios | Alto | Alto | R$50k-R$100k (piloto) | 6 meses | P1 |
| Cafe premium | Alto | Medio | R$200k-R$500k (maquinas) | 12 meses | P2 |
| Cidades medias | Alto | Alto | R$30k-R$80k (marketing) | 3 meses | P1 |
| ... | ... | ... | ... | ... | ... |

---

## Step 5: Porter's 5 Forces — Framework Aplicado

### 5.1 Analise Detalhada por Forca

**Executor:** @franchise-growth

**Para cada uma das 5 forcas, detalhar:**

#### Forca 1: Rivalidade entre Concorrentes Existentes

**Intensidade: Media-Alta**

**Fatores que aumentam rivalidade:**
- Crescimento do numero de franquias de vending (+30% em 2 anos)
- Modelos de negocio cada vez mais similares
- Competicao por pontos comerciais de qualidade
- Guerra de precos no investimento inicial
- Baixa diferenciacao percebida pelo candidato a franqueado

**Fatores que diminuem rivalidade:**
- Mercado ainda em crescimento (nao e soma zero)
- Diferenciacao possivel por tecnologia e suporte
- Segmentos diferentes (saude, conveniencia, cafe)
- Concentracao geografica permite coexistencia

**Implicacao para Avend:** Investir em diferenciacao por tecnologia e suporte, nao entrar em guerra de precos.

#### Forca 2: Ameaca de Novos Entrantes

**Intensidade: Alta**

**Barreiras de entrada existentes:**
- Capital minimo para formatar franquia: R$100k-R$300k (baixo)
- Know-how operacional: adquirivel em 6-12 meses
- Relacionamento com fornecedores de maquinas: acessivel
- Regulamentacao (COF, Lei 13.966): burocratica mas nao impeditiva
- Marca e reputacao: leva anos para construir

**Barreiras que a Avend pode criar:**
- Dados e inteligencia de mercado (vantagem de incumbente)
- Tecnologia proprietaria de telemetria
- Rede de franqueados como barreira (efeito rede)
- Parcerias exclusivas com pontos comerciais
- Selo ABF e reputacao consolidada

**Implicacao para Avend:** Acelerar criacao de barreiras baseadas em dados e tecnologia.

#### Forca 3: Ameaca de Produtos Substitutos

**Intensidade: Media**

**Substitutos identificados:**
| Substituto | Quando Ameaca | Resposta Avend |
|-----------|---------------|---------------|
| Delivery apps (iFood) | Para conveniencia planejada | Enfatizar impulso e imediatismo |
| Micromarkets | Em ambientes corporativos | Desenvolver modelo de micromarket |
| Lojas de conveniencia | Em areas com alta presenca | Competir por pontos sem loja proximo |
| Operadores independentes | Para investidores sem capital para franquia | Demonstrar valor do suporte e marca |
| Compra online | Para produtos nao-alimenticios | Focar em alimentos e impulso |

**Implicacao para Avend:** O vending compete com conveniencia, nao com varejo. Manter posicionamento em impulso e 24h.

#### Forca 4: Poder de Barganha dos Fornecedores

**Intensidade: Baixa-Media**

**Fornecedores criticos:**
| Fornecedor | Poder | Motivo | Mitigacao |
|-----------|-------|--------|-----------|
| Fabricantes de maquinas (China) | Medio | Poucos fabricantes de qualidade | Diversificar fornecedores |
| Fabricantes de maquinas (Brasil) | Baixo | Varios fabricantes nacionais | Compra por volume da rede |
| Distribuidores de alimentos | Baixo | Muitos fornecedores | Negociar contratos da rede |
| Processadores de pagamento | Baixo | Mercado competitivo | Negociar taxas por volume |
| Tecnologia (telemetria) | Baixo | Proprietario da Avend | Manter desenvolvimento interno |

**Implicacao para Avend:** Usar escala da rede para negociar melhores condicoes. Manter tecnologia proprietaria.

#### Forca 5: Poder de Barganha dos Compradores (Candidatos a Franqueado)

**Intensidade: Media (crescendo)**

**Fatores que aumentam poder do candidato:**
- Mais opcoes de franquias de vending disponiveis
- Informacao facilmente acessivel (comparativos online)
- Candidatos cada vez mais sofisticados (pesquisam antes)
- Baixo custo de troca (pode migrar para outro franqueador)

**Fatores que diminuem poder do candidato:**
- Marca Avend tem mais track record
- Relatorios de satisfacao de franqueados (social proof)
- Investimento ja realizado (lock-in pos-adesao)
- Modelo comprovado com dados reais

**Implicacao para Avend:** Investir em transparencia, satisfacao de franqueados existentes e diferenciacao real.

---

## Step 6: Strategic Recommendations — Recomendacoes Estrategicas

### 6.1 Recomendacoes Priorizadas

**Executor:** @franchising-chief

**Framework de priorizacao: Impacto x Viabilidade x Urgencia**

| # | Recomendacao | Impacto | Viabilidade | Urgencia | Score | Responsavel |
|---|-------------|---------|-------------|----------|-------|-------------|
| 1 | Criar modelo entry-level (~R$30k) | Alto | Alta | Alta | 9.0 | franchise-strategist |
| 2 | Expandir para cidades medias | Alto | Alta | Media | 8.5 | market-analyst |
| 3 | Programa de multi-franqueados | Alto | Alta | Media | 8.0 | franchise-growth |
| 4 | Melhoria de NPS e reputacao | Medio | Alta | Alta | 7.5 | relationship-manager |
| 5 | Desenvolver modelo de micromarket | Alto | Media | Baixa | 7.0 | franchise-strategist |
| 6 | Vending em condominios | Medio | Alta | Media | 7.0 | market-analyst |
| 7 | Parcerias com grandes empresas | Alto | Media | Media | 6.5 | franchise-growth |
| 8 | IA para otimizacao de mix/preco | Alto | Baixa | Baixa | 6.0 | tech-systems |

### 6.2 Quick Wins (implementar em 30 dias)

**Executor:** @franchise-growth

| Quick Win | Custo | Impacto Esperado |
|-----------|-------|-----------------|
| Atualizar materiais de venda com comparativo competitivo | R$0 | Melhor conversao de candidatos |
| Criar FAQ "Por que Avend vs concorrentes" | R$0 | Objecoes de vendas antecipadas |
| Monitorar Reclame Aqui dos concorrentes semanalmente | R$0 | Intelligence continua |
| Coletar depoimentos de franqueados satisfeitos | R$0 | Social proof para marketing |
| Publicar case studies de franqueados de sucesso | R$500 | Atracao de candidatos qualificados |

### 6.3 Iniciativas Estrategicas (implementar em 6-12 meses)

**Executor:** @franchising-chief

| Iniciativa | Investimento | ROI Esperado | Timeline |
|-----------|-------------|-------------|----------|
| Modelo entry-level R$30k (2 maquinas) | R$50k (formatacao) | +40% leads qualificados | 3-6 meses |
| Expansao cidades medias (10 novas cidades) | R$80k (marketing) | +25 novos franqueados/ano | 6-12 meses |
| Programa multi-franqueados | R$20k (sistema) | +30% receita de royalties | 3 meses |
| Modelo micromarket piloto | R$200k | Novo segmento de mercado | 9-12 meses |

---

## Step 7: Monitoring Plan — Plano de Monitoramento Continuo

### 7.1 Dashboard de Monitoramento Competitivo

**Executor:** @franchise-growth

**Metricas a monitorar mensalmente:**

| Metrica | Fonte | Frequencia | Alerta Se |
|---------|-------|-----------|-----------|
| Novas franquias de vending no portal ABF | Portal ABF | Mensal | Novo entrante com investimento < R$35k |
| Score Reclame Aqui dos concorrentes | Reclame Aqui | Mensal | Concorrente ultrapassa Avend |
| Volume de busca "franquia vending" | Google Trends | Mensal | Queda > 20% no volume |
| Novos contratos dos concorrentes | LinkedIn, sites | Trimestral | Concorrente cresce > 50% ao ano |
| Precos/investimento dos concorrentes | Sites oficiais | Trimestral | Concorrente reduz investimento > 20% |
| Presenca em feiras e eventos | Calendário ABF | Por evento | Concorrente novo em feira Tier 1 |
| Inovacao (novos modelos/produtos) | Sites, redes | Mensal | Concorrente lanca modelo disruptivo |

### 7.2 Triggers de Reavaliacao Estrategica

| Trigger | Acao |
|---------|------|
| Novo concorrente com investimento < R$25k | Reavaliar pricing e modelo entry-level |
| Concorrente ultrapassa Avend em unidades | Reavaliar estrategia de expansao |
| Fusao/aquisicao no segmento | Analise de impacto imediata |
| Novo modelo de negocio (ex: micromarket franquia) | Avaliar entrada no segmento |
| Mudanca regulatoria (Lei de franquias, tributaria) | Analise de compliance e impacto |

---

## Veto Conditions — Detalhamento

| # | Condicao de Veto | Severidade | Acao Requerida |
|---|-----------------|-----------|---------------|
| V1 | Analise sem dados primarios verificados | Alta | Coletar dados de pelo menos 3 fontes primarias |
| V2 | Recomendacoes sem fundamentacao em dados | Alta | Associar cada recomendacao a dados especificos |
| V3 | Omissao de concorrentes com 30+ unidades | Alta | Incluir todos os concorrentes de escala relevante |
| V4 | SWOT sem atualizacao em 90+ dias | Media | Atualizar SWOT com dados correntes |
| V5 | Ignorar concorrentes indiretos relevantes | Media | Incluir no minimo micromarkets e operadores independentes |
| V6 | Porter's 5 Forces sem aplicacao ao mercado brasileiro | Media | Contextualizar para realidade brasileira |
| V7 | Recomendacoes estrategicas sem priorizacao | Media | Priorizar por Impacto x Viabilidade x Urgencia |

---

## Dependencies

| Dependency | Tipo | Descricao |
|-----------|------|-----------|
| `data/vending-competitors.yaml` | Dados | Base de dados competitivos da rede |
| `tasks/expansion-plan.md` | Task | Plano de expansao territorial |
| `tasks/financial-model.md` | Task | Modelagem financeira para novos modelos |
| `workflows/franchise-launch.yaml` | Workflow | Lancamento de novos modelos de franquia |
| `tasks/marketing-plan.md` | Task | Plano de marketing para posicionamento |

---

## Execution Modes

| Mode | Quando Usar | Duracao | Output |
|------|------------|---------|--------|
| **Quick** | Update mensal de monitoramento | 2-3 horas | Dashboard atualizado |
| **Standard** | Analise trimestral completa | 1-2 dias | Relatorio + recomendacoes |
| **Deep** | Entrada de novo concorrente ou reavaliacao estrategica | 3-5 dias | Analise completa + apresentacao executiva |

---

## Quality Gates

| Gate | Criterio | Responsavel |
|------|---------|-------------|
| G1 — Completude de Dados | >= 80% dos campos coletados para concorrentes diretos | @franchise-growth |
| G2 — Validacao de Fontes | >= 3 fontes primarias por concorrente direto | @franchise-growth |
| G3 — Review Estrategico | Recomendacoes revisadas por @franchising-chief | @franchising-chief |
| G4 — Acionabilidade | Cada recomendacao tem responsavel, timeline e investimento | @franchise-growth |
| G5 — Aprovacao Final | Relatorio aprovado para distribuicao | @franchising-chief |
