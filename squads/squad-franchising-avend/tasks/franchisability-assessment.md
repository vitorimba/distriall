# Task: franchisability-assessment

```yaml
task: franchisability-assessment
id: FA-TASK-001
responsavel: "@franchise-assessor"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - business_profile: string - Perfil do negocio candidato a formatacao como franquia
  - financial_data_path: string - Path para dados financeiros da operacao propria
  - operations_docs_path: string - Path para documentos operacionais existentes
  - market_research_path: string - Path para pesquisa de mercado (opcional)
  - founder_interview: string - Transcricao ou resumo de entrevista com fundador

Saida:
  - franchisability-assessment-report.md: Relatorio completo de avaliacao de franqueabilidade
  - franchisability-scorecard.md: Scorecard com pontuacao em cada criterio
  - action-plan-franchise-readiness.md: Plano de acao para atingir franchise-readiness

Checklist:
  - 12 criterios de Mark Siebert avaliados e pontuados
  - Analise de replicabilidade do modelo operacional
  - Analise de viabilidade financeira para franqueado
  - Avaliacao de vantagem competitiva sustentavel
  - Analise de adequacao ao mercado brasileiro de franquias
  - Analise de compliance com Lei 13.966/2019
  - Scorecard consolidado com nota final GO/NO-GO
  - Plano de acao com gaps identificados e prazos
  - Benchmarking com franquias similares (ABF)
  - Analise de riscos de formatacao

veto_conditions:
  - Negocio sem unidade propria operando (piloto obrigatorio)
  - Ausencia de dados financeiros de pelo menos 12 meses
  - Fundador sem disponibilidade para entrevista de profundidade
  - Modelo de negocio com margem insuficiente para sustentar royalties
  - Violacao de principios legais basicos (Lei 13.966/2019)

output_examples:
  - |
    ## Scorecard de Franqueabilidade — Avend Franquias
    | Criterio Siebert | Nota (1-10) | Status |
    |------------------|-------------|--------|
    | Credibilidade    | 8           | PASS   |
    | Replicabilidade  | 9           | PASS   |
    | Rentabilidade    | 7           | PASS   |
    **Score Final: 7.8/10 — GO (Recomendado para formatacao)**
```

---

## Purpose

Avaliar se um negocio esta pronto para ser formatado como franquia, utilizando os **12 criterios de Mark Siebert** ("Franchise Your Business") como framework principal, adaptados ao contexto brasileiro de franquias e ao mercado especifico de vending machines da Avend Franquias.

A avaliacao de franqueabilidade (franchisability assessment) e o primeiro gate critico no processo de formatacao. Um negocio que avanca sem passar por esta avaliacao corre risco de:
- Formatar um modelo que nao se replica
- Atrair franqueados para um modelo economicamente inviavel
- Violar a Lei 13.966/2019 por falta de transparencia
- Destruir a marca ao escalar um modelo com falhas estruturais

**Principio fundamental:** Nem todo negocio de sucesso e um bom candidato a franquia. O sucesso como operador proprio e condicao necessaria, mas nao suficiente. A franqueabilidade exige replicabilidade, transferibilidade de conhecimento, margens suficientes para o ecossistema e vantagem competitiva sustentavel.

**Contexto Avend:** A Avend Franquias opera no segmento de microfranquias de vending machines, um modelo de baixo investimento (~R$50k), operacao semi-passiva, com 184 maquinas e 90 contratos de franquia. A avaliacao deve considerar as especificidades deste modelo: operacao tecnica simplificada, dependencia de pontos comerciais (localizacao), mix de produtos, e manutencao de equipamentos.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `business_profile` | string | Sim | Descricao detalhada do negocio: modelo, historia, diferenciais, mercado-alvo, numeros atuais (unidades, faturamento, funcionarios) |
| `financial_data_path` | string | Sim | Path para dados financeiros: DRE dos ultimos 12-24 meses, margens, custos fixos/variaveis, investimento inicial, payback |
| `operations_docs_path` | string | Nao | Path para documentacao operacional existente: manuais, SOPs, checklists, fluxogramas |
| `market_research_path` | string | Nao | Path para pesquisa de mercado: tamanho do mercado, concorrencia, tendencias, TAM/SAM/SOM |
| `founder_interview` | string | Sim | Transcricao ou resumo da entrevista com fundador sobre visao, motivacao para franquear, expectativas, comprometimento |
| `competitor_analysis` | string | Nao | Analise de concorrentes diretos e indiretos, incluindo outras franquias no segmento |
| `abf_data` | string | Nao | Dados da ABF sobre o segmento: performance do setor, benchmarks, ranking |

---

## Preconditions

1. **Unidade propria operando**: O negocio DEVE ter pelo menos uma unidade propria operando com sucesso por no minimo 12 meses. Sem piloto comprovado, a avaliacao nao pode prosseguir.
2. **Dados financeiros disponiveis**: DRE, balanco, fluxo de caixa — pelo menos 12 meses de historico. Sem dados financeiros, nao ha como avaliar viabilidade para franqueado.
3. **Fundador disponivel**: O fundador/proprietario deve estar disponivel para entrevista de profundidade sobre o negocio, motivacoes e visao.
4. **Modelo de negocio estabilizado**: O modelo nao pode estar em fase de pivotar ou mudanca radical. Deve haver estabilidade operacional.
5. **Informacoes basicas do mercado**: Minimo entendimento do mercado-alvo, concorrencia e posicionamento.
6. **Conformidade legal basica**: Empresa regularizada (CNPJ ativo, sem impedimentos legais criticos).

---

## Key Activities & Instructions

### Phase 1: Coleta e Organizacao de Dados

**Objetivo:** Reunir todas as informacoes necessarias para a avaliacao sistematica dos 12 criterios de Siebert.

**1.1 — Intake do Negocio**

Coletar e organizar as seguintes informacoes:

```yaml
business_intake:
  company:
    name: "Avend Franquias"
    cnpj: ""
    founding_year: ""
    segment: "Vending Machines / Microfranquias"
    legal_entity: ""
    abf_member: true/false

  operations:
    total_units: 0
    company_owned: 0
    franchised: 0
    total_machines: 0
    geographic_coverage: []
    employees_total: 0

  financials:
    annual_revenue: 0
    gross_margin: 0
    net_margin: 0
    initial_investment_range: ""
    average_payback_months: 0
    royalty_model: ""

  founder:
    name: "Guilherme Alvares"
    background: ""
    motivation_to_franchise: ""
    availability: ""
    franchise_knowledge_level: ""
```

**1.2 — Validacao de Pre-Requisitos**

Antes de prosseguir, validar que todos os pre-requisitos estao atendidos:

| Pre-Requisito | Status | Evidencia |
|---------------|--------|-----------|
| Unidade propria operando 12+ meses | [ ] | |
| DRE disponivel (12+ meses) | [ ] | |
| Fundador disponivel para entrevista | [ ] | |
| Modelo de negocio estabilizado | [ ] | |
| Empresa regularizada | [ ] | |

**Se algum pre-requisito critico nao for atendido, PARAR a avaliacao e reportar gap com recomendacao de acao.**

**Elicitation point:** Apresentar formulario de intake e solicitar preenchimento pelo fundador.

---

### Phase 2: Avaliacao pelos 12 Criterios de Mark Siebert

**Framework:** Mark Siebert, "Franchise Your Business: The Guide to Employing the Greatest Growth Strategy Ever" (2016).

Os 12 criterios de Siebert sao o padrao-ouro global para avaliacao de franqueabilidade. Cada criterio deve ser avaliado numa escala de 1-10, com justificativa detalhada e evidencias.

**Escala de pontuacao:**
- 1-3: Fraco — Gap significativo, requer trabalho substancial
- 4-5: Abaixo da media — Precisa de melhorias antes de formatar
- 6-7: Adequado — Atende requisitos minimos, pode prosseguir com ajustes
- 8-9: Forte — Bom posicionamento, vantagem competitiva
- 10: Excepcional — Referencia no criterio

---

#### Criterio 1: Credibilidade (Credibility)

**Pergunta central:** O mercado e os candidatos a franqueados acreditarao nesta marca e neste franqueador?

**Fatores de avaliacao:**

```
1.1 Historia da marca
    - Anos de operacao
    - Trajetoria de crescimento
    - Marcos relevantes
    - Premiacoes/reconhecimentos

1.2 Presenca de mercado
    - Numero de unidades
    - Cobertura geografica
    - Reconhecimento da marca
    - Presenca digital (site, redes sociais, imprensa)

1.3 Credenciais do fundador
    - Background profissional
    - Experiencia no setor
    - Reputacao no mercado
    - Network relevante

1.4 Associacoes e selos
    - Membro ABF
    - Certificacoes de qualidade
    - Premio selo de excelencia ABF
    - Participacao em feiras (ABF Franchising Expo)

1.5 Prova social
    - Depoimentos de franqueados existentes
    - Cases de sucesso documentados
    - Cobertura de imprensa
    - Presenca em rankings do setor
```

**Contexto Avend:** Para vending machines, a credibilidade vem de: numero de maquinas instaladas (184), volume de contratos (90), filiacao ABF, e historico do fundador Guilherme Alvares no segmento.

**Benchmark ABF:** Franquias com selo de excelencia ABF pontuam 8+ neste criterio. Microfranquias geralmente precisam compensar menor tempo de mercado com dados de performance solidos.

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 2: Replicabilidade (Replicability)

**Pergunta central:** O modelo de negocio pode ser replicado com sucesso por pessoas que nao sao os fundadores?

**Fatores de avaliacao:**

```
2.1 Simplicidade operacional
    - Numero de processos-chave
    - Complexidade de cada processo
    - Necessidade de habilidades especializadas
    - Dependencia do fundador

2.2 Sistematizacao
    - Processos documentados (SOPs)
    - Manuais existentes
    - Checklists operacionais
    - Sistemas de gestao (ERP, CRM)

2.3 Padronizacao
    - Identidade visual consistente
    - Processos padronizados entre unidades
    - Qualidade uniforme de entrega
    - Experiencia do cliente consistente

2.4 Tecnologia de suporte
    - Sistemas de gestao proprietarios ou comerciais
    - Automacao de processos
    - Monitoramento remoto
    - Telemetria de maquinas

2.5 Independencia do fundador
    - Operacao funciona sem o fundador?
    - Decisoes delegadas?
    - Equipe treinada para operar autonomamente?
    - Know-how codificado (nao tacito)?
```

**Contexto Avend:** Vending machines tem alta replicabilidade inerente: operacao padronizada, tecnologia embarcada, processos de abastecimento e manutencao sistematizaveis. O desafio esta na selecao de pontos comerciais e na gestao do mix de produtos.

**Red flags para replicabilidade:**
- Modelo depende do carisma/rede do fundador para funcionar
- Know-how critico existe apenas na cabeca do fundador
- Cada unidade opera de forma diferente
- Qualidade varia significativamente entre unidades

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 3: Rentabilidade do Franqueado (Franchisee Profitability)

**Pergunta central:** O franqueado consegue ter um retorno atrativo apos pagar todas as taxas e custos?

**Este e o criterio mais critico. Um franqueado insatisfeito financeiramente destroi a rede.**

**Fatores de avaliacao:**

```
3.1 Unit economics do franqueado
    - Investimento inicial total (taxa + equipamentos + capital de giro)
    - Faturamento medio mensal
    - Custos fixos mensais
    - Custos variaveis mensais
    - Margem operacional liquida
    - Payback em meses

3.2 Analise de taxas
    - Taxa de franquia
    - Royalties (% ou fixo)
    - Taxa de publicidade/marketing
    - Outras taxas (tecnologia, suporte, etc.)
    - Peso total das taxas sobre faturamento

3.3 Comparativo com alternativas
    - ROI vs. investimentos financeiros tradicionais
    - ROI vs. emprego CLT (custo de oportunidade)
    - ROI vs. outras franquias do segmento
    - ROI vs. negocio proprio sem franquia

3.4 Cenarios financeiros
    - Cenario pessimista (operacao abaixo da media)
    - Cenario realista (operacao na media da rede)
    - Cenario otimista (operacao acima da media)
    - Ponto de equilibrio (breakeven)

3.5 Historico de performance da rede
    - % de franqueados acima do breakeven
    - Tempo medio para breakeven
    - Taxa de mortalidade de unidades
    - Dispersao de faturamento na rede (desvio padrao)
```

**Contexto Avend:** O modelo de ~R$50k de investimento e microfranquia. O criterio-chave e se o faturamento por maquina gera margem suficiente apos royalties, custos de produtos (abastecimento), manutencao e aluguel de ponto.

**Benchmark mercado brasileiro:**
- Microfranquias (ate R$105k conforme ABF): payback esperado 12-24 meses
- Margem liquida minima aceitavel para franqueado: 15-20%
- Taxa de mortalidade aceitavel: < 5% nos primeiros 3 anos

**Veto condition:** Se a analise mostrar que mais de 30% dos franqueados NAO atingem breakeven em 24 meses, o criterio e FAIL e a avaliacao deve recomendar revisao do modelo economico antes de continuar.

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 4: Vantagem Competitiva (Competitive Advantage)

**Pergunta central:** O que impede um concorrente de copiar este modelo?

**Fatores de avaliacao:**

```
4.1 Barreiras de entrada
    - Propriedade intelectual (marcas registradas INPI)
    - Tecnologia proprietaria
    - Contratos de exclusividade
    - Economia de escala
    - Network effects

4.2 Diferenciais competitivos
    - O que a marca faz melhor que os concorrentes?
    - O que e unico no modelo?
    - Qual e o "motivo de compra" do franqueado?
    - O que impede a substituicao?

4.3 Posicionamento de mercado
    - Market share
    - Brand awareness
    - First-mover advantage
    - Nichos dominados

4.4 Moat (fosso competitivo)
    - Custo de troca para o franqueado
    - Custo de troca para o consumidor final
    - Relacoes exclusivas com fornecedores
    - Base instalada de maquinas/pontos
```

**Contexto Avend:** No mercado de vending machines brasileiro, a vantagem competitiva pode vir de: rede de pontos comerciais exclusivos, tecnologia de telemetria, relacionamento com fornecedores de produtos, marca reconhecida, e know-how de selecao de ponto.

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 5: Adequacao ao Modelo de Franquia (Franchise Model Fit)

**Pergunta central:** O modelo de negocio se beneficia genuinamente do sistema de franquias ou seria melhor como filial/licenciamento?

**Fatores de avaliacao:**

```
5.1 Motivacao para franquear
    - Expansao rapida com capital de terceiros?
    - Operacao descentralizada exige gestao local?
    - Conhecimento local e relevante para o negocio?
    - Motivacao do operador importa para o resultado?

5.2 Alternativas ao franchising
    - Expansao com capital proprio (filiais)
    - Licenciamento simples
    - Modelo de distribuidores
    - Modelo de representantes comerciais
    - Joint ventures

5.3 Fit com o formato franquia
    - O operador local agrega valor?
    - A marca se beneficia de padronizacao nacional?
    - Existe ganho de escala com rede?
    - O suporte ao franqueado e viavel e escalavel?

5.4 Modelo de franquia ideal
    - Franquia unitaria vs. master franquia vs. area development
    - Microfranquia vs. franquia tradicional
    - Home-based vs. ponto comercial vs. operacao movel
    - Conversao vs. greenfield
```

**Contexto Avend:** Vending machines e um modelo classico de microfranquia: baixo investimento, operacao semi-passiva, que se beneficia de gestao local (abastecimento, manutencao, relacionamento com ponto). O franqueado agrega valor pela presenca local.

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 6: Estabilidade Financeira do Franqueador (Franchisor Financial Stability)

**Pergunta central:** O franqueador tem recursos financeiros para suportar a rede durante o crescimento?

**Fatores de avaliacao:**

```
6.1 Saude financeira atual
    - Faturamento anual
    - Margem liquida
    - Endividamento
    - Reserva de caixa
    - Fluxo de caixa operacional

6.2 Capacidade de investimento
    - Capital disponivel para estrutura de franqueador
    - Capacidade de financiar treinamento e suporte
    - Orcamento para marketing institucional
    - Orcamento para tecnologia e sistemas

6.3 Modelo de receita do franqueador
    - Receita de taxas de franquia
    - Receita de royalties recorrentes
    - Receita de fornecimento/revenda
    - Outras receitas (consultoria, eventos, etc.)
    - Breakeven do franqueador (quantas unidades?)

6.4 Projecao de sustentabilidade
    - A operacao de franqueador e lucrativa com X unidades?
    - Quanto tempo ate o breakeven do franqueador?
    - Existe risco de descapitalizacao durante crescimento?
```

**Contexto Avend:** Com ~R$20M de faturamento e 90 contratos, a Avend ja tem escala. A questao e se a estrutura de suporte (equipe, tecnologia, logistica) esta dimensionada para o ritmo de expansao planejado.

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 7: Mercado-Alvo Amplo (Broad Market Appeal)

**Pergunta central:** Existe demanda suficiente para suportar uma rede de franquias em escala?

**Fatores de avaliacao:**

```
7.1 Tamanho do mercado
    - TAM (Total Addressable Market)
    - SAM (Serviceable Available Market)
    - SOM (Serviceable Obtainable Market)
    - CAGR do segmento

7.2 Tendencias de mercado
    - O mercado esta crescendo ou retraindo?
    - Mudancas de comportamento do consumidor
    - Regulamentacao favoravel/desfavoravel
    - Impacto de tecnologia

7.3 Cobertura geografica potencial
    - Quantos territorios/cidades podem absorver franquias?
    - Existe demanda em diferentes regioes do Brasil?
    - Restricoes geograficas (clima, logistica, cultura)
    - Densidade populacional minima necessaria

7.4 Pool de candidatos a franqueados
    - Perfil do franqueado ideal existe em volume?
    - O investimento e acessivel para o publico-alvo?
    - Existe interesse no segmento?
    - Competicao por candidatos com outras franquias
```

**Contexto Avend:** Vending machines tem mercado amplo no Brasil: presenca em escritorios, hospitais, universidades, condominios, academias, shopping centers. O investimento de ~R$50k e acessivel. O mercado brasileiro de vending e estimado em R$2.5B+ e cresce ~15% ao ano.

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 8: Facilidade de Aprendizado (Ease of Learning)

**Pergunta central:** Um franqueado consegue aprender a operar o negocio em tempo razoavel?

**Fatores de avaliacao:**

```
8.1 Curva de aprendizado
    - Tempo ate operacao autonoma
    - Complexidade das habilidades necessarias
    - Necessidade de formacao previa
    - Tempo de treinamento inicial

8.2 Transferibilidade de conhecimento
    - Know-how pode ser codificado em manuais?
    - Existe componente tacito significativo?
    - Treinamento pode ser padronizado?
    - Suporte remoto e possivel?

8.3 Perfil do operador
    - Qual o nivel de escolaridade minimo?
    - Experiencia previa necessaria no setor?
    - Habilidades tecnicas requeridas?
    - Habilidades de gestao requeridas?

8.4 Suporte pos-treinamento
    - Existe mentoria pos-inauguracao?
    - Suporte tecnico disponivel?
    - Material de consulta rapida?
    - Comunidade de franqueados para troca?
```

**Contexto Avend:** Operacao de vending machines tem curva de aprendizado favoravel: abastecimento, manutencao basica, gestao de ponto. Nao requer formacao tecnica avancada. O desafio pode estar na gestao do negocio como um todo (financeiro, reinvestimento, expansao).

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 9: Adaptabilidade a Mudancas (Adaptability)

**Pergunta central:** O modelo consegue se adaptar a mudancas de mercado, tecnologia e regulamentacao?

**Fatores de avaliacao:**

```
9.1 Resiliencia do modelo
    - Desempenho em crises (COVID, recessao)
    - Dependencia de um unico produto/servico
    - Flexibilidade de mix
    - Sazonalidade

9.2 Capacidade de inovacao
    - Historico de inovacao/atualizacao
    - Investimento em P&D
    - Agilidade para mudar
    - Abertura a experimentacao

9.3 Ameacas externas
    - Disrrupcao tecnologica
    - Mudancas regulatorias
    - Novos entrantes no mercado
    - Mudancas de habito do consumidor

9.4 Atualizacao da rede
    - Facilidade de implementar mudancas em toda rede
    - Custo de atualizacao por unidade
    - Resistencia de franqueados a mudancas
    - Ciclo de vida de equipamentos
```

**Contexto Avend:** Vending machines tem boa adaptabilidade: mix de produtos pode mudar, tecnologia de pagamento evolui (PIX, NFC), novas localizacoes surgem. Riscos: mudancas em regulamentacao sanitaria (ANVISA), evolucao para micro-markets, self-checkout.

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 10: Potencial de Crescimento (Growth Potential)

**Pergunta central:** O modelo pode crescer significativamente nos proximos 5-10 anos?

**Fatores de avaliacao:**

```
10.1 Runway de crescimento
    - Quantas unidades a rede pode atingir?
    - Meta de unidades em 1, 3, 5 anos
    - Limite de saturacao de mercado
    - Capacidade de expansao geografica

10.2 Escalabilidade da estrutura
    - Estrutura de suporte escala linearmente ou sub-linearmente?
    - Tecnologia suporta crescimento?
    - Equipe esta preparada para escala?
    - Supply chain suporta crescimento?

10.3 Modelos de expansao
    - Franquia unitaria
    - Multi-unit (multiplas unidades por franqueado)
    - Area development (territorios exclusivos)
    - Master franchise (sub-franqueadores)
    - Conversao de operadores independentes

10.4 Visao do fundador
    - O fundador quer crescer ate onde?
    - Existe estrategia de exit?
    - O fundador esta disposto a delegar?
    - Visao de longo prazo para a marca
```

**Contexto Avend:** Com 184 maquinas e 90 contratos, a Avend tem espaco significativo para crescimento. O mercado brasileiro de vending tem penetracao baixa comparado a paises desenvolvidos (Japao: 1 maquina/23 pessoas; Brasil: 1/600+).

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 11: Relacionamento Franqueador-Franqueado (Franchisor-Franchisee Relationship)

**Pergunta central:** O franqueador tem a mentalidade e as estruturas para construir relacionamentos saudaveis com franqueados?

**Fatores de avaliacao:**

```
11.1 Mentalidade do franqueador
    - Visao de parceria vs. extracao
    - Foco no sucesso do franqueado
    - Transparencia na comunicacao
    - Abertura a feedback

11.2 Estruturas de suporte
    - Canais de comunicacao (helpdesk, WhatsApp, portal)
    - Frequencia de contato proativo
    - Consultoria de campo
    - Eventos da rede (convenções, treinamentos)

11.3 Governanca da rede
    - Conselho de franqueados
    - Comites tematicos
    - Processo de resolucao de conflitos
    - Transparencia financeira

11.4 Historico de relacionamento
    - Satisfacao dos franqueados atuais
    - Taxa de renovacao de contratos
    - Processos judiciais (franqueados vs. franqueador)
    - NPS da rede
```

**Contexto Avend:** O E-Factor de Greg Nathan e referencia para medir saude do relacionamento. A Avend deve demonstrar que prioriza o sucesso do franqueado (Franchise Relationship Institute principles).

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

#### Criterio 12: Conformidade Legal e Regulatoria (Legal & Regulatory Compliance)

**Pergunta central:** O negocio esta em conformidade com toda legislacao aplicavel ao franchising no Brasil?

**Fatores de avaliacao:**

```
12.1 Lei 13.966/2019 (Lei de Franquias)
    - Conhecimento da lei pelo franqueador
    - COF (Circular de Oferta de Franquia) existente e atualizado?
    - Prazo de entrega da COF (10 dias antes da assinatura)
    - Conteudo obrigatorio da COF (19 itens do Art. 2o)

12.2 Contratos
    - Contrato de franquia existente?
    - Revisado por advogado especializado?
    - Clausulas equilibradas (nao leoninas)?
    - Pre-contrato/LOI usado corretamente?

12.3 Propriedade intelectual
    - Marca registrada no INPI?
    - Status do registro (concedido, em analise, deferido)
    - Know-how protegido por clausulas de confidencialidade?
    - Patentes (se aplicavel)

12.4 Regulamentacao setorial
    - ANVISA (alimentos em vending machines)
    - Vigilancia sanitaria local
    - Alvaras e licencas necessarias
    - Normas tecnicas de equipamentos

12.5 Compliance ABF
    - Selo de excelencia ABF
    - Codigo de etica ABF
    - Participacao em programas ABF
    - Reporting para ABF
```

**Contexto Avend:** Lei 13.966/2019 substituiu a Lei 8.955/94 e trouxe mudancas significativas: possibilidade de sublocacao, arbitragem obrigatoria (se prevista em contrato), e ampliacao do conteudo da COF. Para vending machines, a regulamentacao sanitaria (ANVISA/RDC 216) tambem e critica.

**Pontuacao e justificativa:**
```
Nota: ___/10
Justificativa: ___
Evidencias: ___
Gaps identificados: ___
Recomendacoes: ___
```

---

### Phase 3: Consolidacao do Scorecard

**3.1 — Scorecard Completo**

Consolidar todas as notas em um scorecard visual:

```
============================================================
  SCORECARD DE FRANQUEABILIDADE — [NOME DA EMPRESA]
  Framework: Mark Siebert's 12 Criteria
  Data: [DATA]
  Avaliador: @franchise-assessor
============================================================

| #  | Criterio                        | Nota | Peso | Ponderado |
|----|--------------------------------|------|------|-----------|
| 1  | Credibilidade                  | _/10 | 1.0  | ___       |
| 2  | Replicabilidade                | _/10 | 1.5  | ___       |
| 3  | Rentabilidade do Franqueado    | _/10 | 2.0  | ___       |
| 4  | Vantagem Competitiva           | _/10 | 1.0  | ___       |
| 5  | Adequacao ao Modelo Franquia   | _/10 | 1.0  | ___       |
| 6  | Estabilidade Financeira Fqr    | _/10 | 1.5  | ___       |
| 7  | Mercado-Alvo Amplo             | _/10 | 1.0  | ___       |
| 8  | Facilidade de Aprendizado      | _/10 | 1.0  | ___       |
| 9  | Adaptabilidade a Mudancas      | _/10 | 0.5  | ___       |
| 10 | Potencial de Crescimento       | _/10 | 1.0  | ___       |
| 11 | Relac. Franqueador-Franqueado  | _/10 | 1.0  | ___       |
| 12 | Conformidade Legal             | _/10 | 1.5  | ___       |
|    |                                |      |      |           |
|    | **SCORE PONDERADO FINAL**      |      |      | ___/10    |

============================================================
  VEREDICTO: [ GO | CONDITIONAL GO | NO-GO ]
============================================================
```

**3.2 — Criterios de Decisao**

| Score Ponderado | Veredicto | Acao |
|-----------------|-----------|------|
| >= 7.0 | **GO** | Prosseguir com formatacao. Monitorar criterios < 7. |
| 5.5 - 6.9 | **CONDITIONAL GO** | Prosseguir com plano de acao para gaps. Reavaliar em 3-6 meses. |
| < 5.5 | **NO-GO** | Nao recomendar formatacao neste momento. Plano de acao intensivo. |

**Criterios de veto (NO-GO automatico independente do score):**
- Criterio 3 (Rentabilidade do Franqueado) < 5: franqueado nao lucra
- Criterio 12 (Conformidade Legal) < 5: risco legal inaceitavel
- Criterio 2 (Replicabilidade) < 4: modelo nao se replica
- Qualquer criterio = 1: falha critica nao sanavel no curto prazo

---

### Phase 4: Analise de Gaps e Plano de Acao

**4.1 — Mapeamento de Gaps**

Para cada criterio com nota < 7, detalhar:

```yaml
gap_analysis:
  criterio: ""
  nota_atual: 0
  nota_alvo: 7
  gaps:
    - descricao: ""
      severidade: "CRITICO | ALTO | MEDIO | BAIXO"
      impacto: ""
      acao_corretiva: ""
      responsavel: ""
      prazo: ""
      investimento_estimado: ""
```

**4.2 — Plano de Acao Priorizado**

Organizar acoes por prioridade usando matriz Impacto x Esforco:

| Prioridade | Gap | Acao | Responsavel | Prazo | Investimento |
|------------|-----|------|-------------|-------|-------------|
| P0 - Urgente | | | | | |
| P1 - Alta | | | | | |
| P2 - Media | | | | | |
| P3 - Baixa | | | | | |

**4.3 — Timeline de Franchise-Readiness**

```
Mes 1-2:  Acoes P0 (impeditivas)
Mes 3-4:  Acoes P1 (criticas)
Mes 5-6:  Acoes P2 (importantes)
Mes 7-9:  Acoes P3 (desejáveis)
Mes 10:   Re-avaliacao completa
Mes 11-12: Formatacao final e lancamento
```

---

### Phase 5: Benchmarking e Contextualizacao

**5.1 — Benchmarking ABF**

Comparar com benchmarks do setor de franquias brasileiro:

| Indicador | Avend | Media Segmento | Top 10% | Fonte |
|-----------|-------|----------------|---------|-------|
| Investimento inicial | ~R$50k | | | ABF |
| Payback medio | | | | ABF |
| Faturamento medio mensal | | | | ABF |
| Taxa de mortalidade | | | | ABF |
| Satisfacao franqueados | | | | ABF |
| Crescimento da rede (unidades) | | | | ABF |

**5.2 — Benchmarking Concorrentes**

| Indicador | Avend | Concorrente 1 | Concorrente 2 | Concorrente 3 |
|-----------|-------|---------------|---------------|---------------|
| Unidades | 90 | | | |
| Investimento | ~R$50k | | | |
| Maquinas | 184 | | | |
| Modelo | Microfranquia | | | |

**5.3 — Analise SWOT para Franchising**

```
FORCAS (Strengths)         | FRAQUEZAS (Weaknesses)
- ___                      | - ___
- ___                      | - ___
                           |
OPORTUNIDADES (Opportunities) | AMEACAS (Threats)
- ___                      | - ___
- ___                      | - ___
```

---

### Phase 6: Relatorio Final e Recomendacoes

**6.1 — Estrutura do Relatorio**

O relatorio final (`franchisability-assessment-report.md`) deve conter:

1. **Executive Summary** (1 pagina)
   - Veredicto (GO/CONDITIONAL GO/NO-GO)
   - Score final
   - Top 3 forcas
   - Top 3 gaps criticos
   - Recomendacao resumida

2. **Perfil do Negocio** (2-3 paginas)
   - Descricao da empresa
   - Modelo de negocio
   - Numeros-chave
   - Historico

3. **Avaliacao Detalhada** (8-12 paginas)
   - Os 12 criterios detalhados com notas, justificativas e evidencias
   - Scorecard visual

4. **Analise de Gaps** (3-4 paginas)
   - Gaps mapeados
   - Plano de acao priorizado
   - Timeline de readiness

5. **Benchmarking** (2-3 paginas)
   - Comparativo ABF
   - Comparativo concorrentes
   - SWOT

6. **Recomendacoes Estrategicas** (2-3 paginas)
   - Proximo passos imediatos
   - Modelo de franquia recomendado
   - Estrategia de lancamento
   - Riscos e mitigacoes

7. **Anexos**
   - Metodologia detalhada
   - Fontes e referencias
   - Dados brutos

**6.2 — Recomendacoes Especificas por Veredicto**

**Se GO:**
- Proximo passo: Iniciar formatacao (COF, manuais, programa de treinamento)
- Timeline sugerida
- Investimento necessario para formatacao
- Equipe necessaria

**Se CONDITIONAL GO:**
- Gaps que devem ser resolvidos antes de continuar
- Prazo para resolucao
- Responsaveis
- Criterios de re-avaliacao

**Se NO-GO:**
- Razoes detalhadas
- O que precisaria mudar para viabilizar
- Alternativas ao franchising (licenciamento, distribuidores, etc.)
- Prazo estimado para re-avaliacao

---

## Validation

### Criterios de Qualidade do Assessment

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Completude | Todos os 12 criterios avaliados | [ ] |
| Evidencias | Cada nota tem evidencia factual | [ ] |
| Coerencia | Notas coerentes entre criterios | [ ] |
| Contextualizacao | Adaptado ao contexto brasileiro | [ ] |
| Actionability | Plano de acao concreto e executavel | [ ] |
| Benchmarking | Comparacao com mercado relevante | [ ] |
| Compliance | Lei 13.966/2019 considerada | [ ] |
| Transparencia | Premissas explicitadas | [ ] |
| Imparcialidade | Avaliacao objetiva, sem vies | [ ] |
| Formatacao | Relatorio estruturado e legivel | [ ] |

### Checklist de Entrega

- [ ] `franchisability-assessment-report.md` gerado
- [ ] `franchisability-scorecard.md` gerado
- [ ] `action-plan-franchise-readiness.md` gerado
- [ ] Todos os 12 criterios avaliados e pontuados
- [ ] Veredicto final emitido (GO/CONDITIONAL GO/NO-GO)
- [ ] Plano de acao com prazos e responsaveis
- [ ] Benchmarking ABF e concorrentes incluido
- [ ] SWOT para franchising realizado
- [ ] Executive summary claro e conciso
- [ ] Elicitations com fundador realizadas

---

## References

- **Siebert, Mark.** "Franchise Your Business: The Guide to Employing the Greatest Growth Strategy Ever." Entrepreneur Press, 2016.
- **Nathan, Greg.** "The Franchise E-Factor." Franchise Relationships Institute, 2008.
- **ABF (Associacao Brasileira de Franchising).** Relatorio de Desempenho do Franchising. www.abf.com.br
- **Lei 13.966/2019** — Lei de Franquias do Brasil. Planalto.gov.br
- **Ribas, Filomena.** "Como Transformar Seu Negocio em Franquia." Editora Senac, 2019.
- **Cherto, Marcelo; Rizzo, Marcus.** "Franchising na Pratica." Editora Senac Sao Paulo.
- **Hopkinson, Penny.** "Manual Magic: How to Create the Business Manual That Your Franchisees Will Actually Use."

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-001*
