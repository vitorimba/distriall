# Task: network-diagnostic

```yaml
task: network-diagnostic
id: FA-TASK-008
responsavel: "@franchise-relationship + @franchise-field-ops"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - network_data_path: string - Path para dados da rede (KPIs, performance por franqueado)
  - franchisee_survey_path: string - Path para pesquisa de satisfacao de franqueados (opcional)
  - financial_data_path: string - Path para dados financeiros da rede
  - field_reports_path: string - Path para relatorios de consultores de campo (opcional)

Saida:
  - network-diagnostic-report.md: Relatorio completo de diagnostico da rede
  - e-factor-assessment.md: Avaliacao do E-Factor (Greg Nathan)
  - action-plan-network-health.md: Plano de acao para melhorias na rede

Checklist:
  - E-Factor avaliado em todas as dimensoes
  - KPIs operacionais coletados e analisados
  - Performance financeira da rede mapeada (media, mediana, quartis)
  - Satisfacao de franqueados medida (NPS ou equivalente)
  - Analise de churn e retencao
  - Health score por franqueado calculado
  - Clusters de performance identificados
  - Root cause analysis para franqueados underperforming
  - Benchmarking com setor (ABF)
  - Plano de acao priorizado por cluster

veto_conditions:
  - Dados insuficientes (menos de 50% dos franqueados com dados)
  - Diagnostico sem contato direto com franqueados (apenas dados)
  - Analise sem segmentacao (tratar rede como monolitica)
  - Recomendacoes genericas sem root cause analysis
  - Ausencia de dados financeiros minimos

output_examples:
  - |
    ## Network Health Score — Avend Franquias
    | Dimensao | Score | Status |
    |----------|-------|--------|
    | E-Factor (Satisfacao) | 7.2/10 | SAUDAVEL |
    | Performance Financeira | 6.8/10 | ATENCAO |
    | Compliance Operacional | 8.1/10 | SAUDAVEL |
    | Retencao | 7.5/10 | SAUDAVEL |
    **Health Score Global: 7.4/10 — SAUDAVEL com pontos de atencao**
```

---

## Purpose

Realizar o **diagnostico completo da saude da rede** de franquias Avend, utilizando o **E-Factor** de Greg Nathan como framework principal para avaliar o relacionamento franqueador-franqueado, complementado por KPIs operacionais e financeiros. O diagnostico identifica areas de forca e fraqueza, franqueados em risco, e gera um plano de acao para melhoria continua.

**O E-Factor (Greg Nathan):** O E-Factor (Emotional Factor) mede a saude emocional do relacionamento franqueador-franqueado. Nathan, fundador do Franchise Relationships Institute, identificou que o maior preditor de sucesso de uma rede nao e o modelo financeiro, mas a qualidade do relacionamento. O E-Factor passa por fases previsiveis:

1. **Glee (Entusiasmo):** Inicio, lua de mel, tudo e maravilhoso
2. **Fee (Taxas):** Franqueado comeca a questionar o valor das taxas
3. **Me (Independencia):** "Eu sei fazer melhor sozinho"
4. **Free (Liberdade):** Desejo de sair da rede ou ignorar regras
5. **See (Maturidade):** Reconhecimento do valor mutuo, parceria real
6. **We (Parceria):** Relacao madura, colaborativa, ganha-ganha

**Contexto Avend:** Com 90 contratos de franquia, a rede tem massa critica para analise estatistica. O diagnostico deve identificar em qual fase do E-Factor cada franqueado se encontra, medir KPIs operacionais e financeiros, e criar clusters de performance para acoes direcionadas.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `network_data_path` | string | Sim | KPIs por franqueado: faturamento, maquinas, tempo de rede |
| `franchisee_survey_path` | string | Recomendado | Pesquisa de satisfacao, NPS, feedback qualitativo |
| `financial_data_path` | string | Sim | Performance financeira: faturamento, margens, royalties |
| `field_reports_path` | string | Nao | Relatorios de visitas de consultores de campo |
| `churn_data` | string | Nao | Dados de desligamentos e motivos |
| `support_tickets` | string | Nao | Volume e tipo de chamados de suporte |

---

## Preconditions

1. **Dados de pelo menos 50% da rede**: Dados suficientes para analise representativa.
2. **Historico de pelo menos 6 meses**: Para identificar tendencias.
3. **Cooperacao dos franqueados**: Para pesquisa de satisfacao (se aplicavel).
4. **Acesso a dados financeiros**: Faturamento, royalties, compliance.
5. **Relatorios de campo**: Informacoes qualitativas dos consultores.

---

## Key Activities & Instructions

### Phase 1: Coleta de Dados

**1.1 — Dados Quantitativos (por franqueado)**

```yaml
franchisee_data:
  identificacao:
    id: ""
    nome: ""
    regiao: ""
    data_ingresso: ""
    tempo_rede_meses: 0
    num_maquinas: 0

  financeiro:
    faturamento_mensal_medio: 0
    faturamento_por_maquina: 0
    tendencia_faturamento: "" # Crescente / Estavel / Decrescente
    royalties_em_dia: true/false
    inadimplencia_dias: 0

  operacional:
    compliance_auditoria: 0  # Score ultima auditoria (0-100)
    frequencia_abastecimento: 0
    tempo_medio_resolucao_problemas: 0
    uso_sistema: "" # Alto / Medio / Baixo
    participacao_treinamentos: 0  # % dos treinamentos oferecidos

  suporte:
    chamados_abertos: 0
    chamados_mes_anterior: 0
    tipo_chamados_predominante: ""
    satisfacao_suporte: 0

  engajamento:
    participacao_eventos: 0
    resposta_comunicados: "" # Rapida / Lenta / Nao responde
    contribuicao_para_rede: "" # Ativa / Passiva / Negativa
```

**1.2 — Pesquisa de Satisfacao (E-Factor Survey)**

Pesquisa estruturada para medir o E-Factor:

```yaml
e_factor_survey:
  comunicacao:
    - "O franqueador me mantem bem informado sobre a rede" # 1-10
    - "Sinto que posso expressar minha opiniao livremente" # 1-10
    - "A comunicacao do franqueador e clara e frequente" # 1-10

  suporte:
    - "O suporte tecnico atende minhas necessidades" # 1-10
    - "O consultor de campo agrega valor a minha operacao" # 1-10
    - "O treinamento que recebi me preparou adequadamente" # 1-10

  valor_percebido:
    - "Os royalties que pago sao justos pelo que recebo" # 1-10
    - "A marca Avend me da vantagem competitiva" # 1-10
    - "Os sistemas e tecnologia me ajudam a gerenciar melhor" # 1-10

  confianca:
    - "Confio que o franqueador toma decisoes pensando nos franqueados" # 1-10
    - "As regras e padroes da rede fazem sentido" # 1-10
    - "Me sinto parte de algo maior" # 1-10

  satisfacao_geral:
    - "De 0 a 10, qual a probabilidade de recomendar a Avend?" # NPS
    - "Se pudesse voltar no tempo, faria a franquia novamente?" # Sim/Nao/Talvez
    - "Pretende renovar o contrato?" # Sim/Nao/Indeciso

  aberta:
    - "O que o franqueador faz muito bem?"
    - "O que precisa melhorar urgentemente?"
    - "Qual sua maior frustracao?"
    - "Qual sugestao voce daria?"
```

**Elicitation point:** Definir se a pesquisa sera aplicada agora ou se ja existem dados. Se existem, coletar. Se nao, recomendar aplicacao.

---

### Phase 2: Analise do E-Factor

**2.1 — Classificacao por Fase do E-Factor**

Para cada franqueado, identificar a fase predominante:

| Fase | Indicadores | Tempo Tipico | % Esperado |
|------|-------------|-------------|-----------|
| **Glee** | Entusiasmo alto, score > 8, pouca critica | 0-6 meses | 15-20% |
| **Fee** | Questiona valor dos royalties, score 6-7 | 6-18 meses | 20-25% |
| **Me** | Quer fazer diferente, score 5-6 | 12-24 meses | 15-20% |
| **Free** | Desengajado, score < 5, risco de churn | 18-36 meses | 5-10% |
| **See** | Reconhece valor, score 7-8, maduro | 24-48 meses | 15-20% |
| **We** | Parceria real, score > 8, contribui | 36+ meses | 10-15% |

**2.2 — Mapa do E-Factor da Rede**

```
DISTRIBUICAO DO E-FACTOR — REDE AVEND
============================================================
| Fase | Franqueados | % da Rede | Score Medio |
|------|------------|-----------|-------------|
| Glee | N | ___% | ___/10 |
| Fee | N | ___% | ___/10 |
| Me | N | ___% | ___/10 |
| Free | N | ___% | ___/10 |
| See | N | ___% | ___/10 |
| We | N | ___% | ___/10 |

ALERTAS:
- Free > 15%: RISCO CRITICO de churn
- Fee > 30%: ATENCAO, necessario reforcar proposta de valor
- See + We < 25%: Rede imatura, acelerar desenvolvimento

E-FACTOR SCORE GLOBAL: ___/10
============================================================
```

**2.3 — Analise de Correlacoes**

| Correlacao | Hipotese | Verificar |
|-----------|---------|-----------|
| E-Factor vs. Faturamento | Franqueados satisfeitos faturam mais | Correlacao positiva? |
| E-Factor vs. Compliance | Franqueados satisfeitos seguem mais regras | Correlacao positiva? |
| E-Factor vs. Tempo de rede | Satisfacao muda com o tempo | Curva em U? |
| E-Factor vs. Num maquinas | Mais maquinas = mais/menos satisfeito | Linear? |
| Churn vs. E-Factor | Franqueados em Free churnam mais | Correlacao forte? |

---

### Phase 3: KPIs Operacionais

**3.1 — Dashboard de KPIs da Rede**

```
KPIs OPERACIONAIS — REDE AVEND
============================================================

PERFORMANCE FINANCEIRA
| KPI | Media | Mediana | P25 | P75 | Desvio |
|-----|-------|---------|-----|-----|--------|
| Faturamento/franqueado | | | | | |
| Faturamento/maquina | | | | | |
| Margem operacional | | | | | |
| Royalties em dia (%) | | | | | |

PERFORMANCE OPERACIONAL
| KPI | Media | Mediana | P25 | P75 | Target |
|-----|-------|---------|-----|-----|--------|
| Compliance auditoria | | | | | > 85% |
| Uso do sistema | | | | | > 80% |
| Participacao treinamentos | | | | | > 70% |
| Tempo resolucao problemas | | | | | < 24h |

SAUDE DA REDE
| KPI | Valor | Target | Status |
|-----|-------|--------|--------|
| NPS franqueados | | > 7 | |
| Taxa de churn anual | | < 8% | |
| Taxa de renovacao | | > 85% | |
| Crescimento da rede | | > 15% | |
| Franqueados inadimplentes | | < 10% | |
============================================================
```

**3.2 — Segmentacao por Performance (Clusters)**

Segmentar franqueados em clusters:

```yaml
clusters:
  estrelas:
    criterio: "Top 20% em faturamento + compliance > 90% + E-Factor > 8"
    percentual: "~15-20%"
    acoes:
      - Reconhecimento publico
      - Programa de mentoria (mentor de novos)
      - Incentivo para multi-unit
      - Participacao em comite consultivo

  solidos:
    criterio: "Faturamento na media + compliance > 80% + E-Factor 6-8"
    percentual: "~40-50%"
    acoes:
      - Programa de melhoria continua
      - Treinamentos avancados
      - Desafios de performance

  atencao:
    criterio: "Faturamento abaixo media ou compliance < 80% ou E-Factor 4-6"
    percentual: "~20-25%"
    acoes:
      - Plano de acao individualizado
      - Consultoria de campo intensificada
      - Treinamento de reforco
      - Monitoramento semanal

  risco:
    criterio: "Faturamento bottom 10% ou compliance < 60% ou E-Factor < 4"
    percentual: "~5-10%"
    acoes:
      - Intervencao imediata
      - Reuniao presencial com franqueador
      - Plano de recuperacao com prazo
      - Avaliar continuidade
```

---

### Phase 4: Root Cause Analysis

**4.1 — Para Franqueados Underperforming**

```yaml
root_cause_template:
  franqueado: ""
  cluster: "atencao / risco"
  sintomas:
    - faturamento_abaixo: true/false
    - compliance_baixa: true/false
    - e_factor_baixo: true/false
    - inadimplente: true/false

  causas_potenciais:
    localizacao:
      - "Pontos comerciais inadequados"
      - "Regiao com demanda insuficiente"
    operacional:
      - "Abastecimento irregular"
      - "Manutencao deficiente"
      - "Mix de produtos inadequado"
    financeiro:
      - "Subcapitalizacao"
      - "Custos acima do padrao"
    pessoal:
      - "Dedicacao insuficiente"
      - "Perfil inadequado (identificado tardiamente)"
      - "Problemas pessoais afetando operacao"
    suporte:
      - "Treinamento insuficiente"
      - "Suporte inadequado do franqueador"
      - "Tecnologia com falhas"

  causa_raiz_identificada: ""
  acao_corretiva: ""
  prazo: ""
  responsavel: ""
```

**4.2 — Analise de Churn**

```
ANALISE DE CHURN — ULTIMOS 24 MESES
============================================================
| Metrica | Valor |
|---------|-------|
| Franqueados desligados | N |
| Taxa de churn | __% |
| Tempo medio antes do churn | __ meses |
| E-Factor medio antes do churn | __/10 |
| Motivo #1 | |
| Motivo #2 | |
| Motivo #3 | |
| Custo estimado por churn | R$ ___ |

PERFIL DO CHURN:
- Tempo na rede: __ meses (media)
- Fase E-Factor: Predominantemente "Free"
- Faturamento: Abaixo da media por __ meses antes
- Sinais de alerta: [Lista]
============================================================
```

---

### Phase 5: Health Score Consolidado

**5.1 — Network Health Score**

```
============================================================
  NETWORK HEALTH SCORE — AVEND FRANQUIAS
  Data: [DATA]
  Rede: [N] franqueados | [N] maquinas
============================================================

| Dimensao | Peso | Score | Ponderado |
|----------|------|-------|-----------|
| E-Factor (Satisfacao) | 30% | ___/10 | ___ |
| Performance Financeira | 25% | ___/10 | ___ |
| Compliance Operacional | 20% | ___/10 | ___ |
| Retencao e Crescimento | 15% | ___/10 | ___ |
| Engajamento | 10% | ___/10 | ___ |
|----------|------|-------|-----------|
| **HEALTH SCORE GLOBAL** | | | **___/10** |

CLASSIFICACAO:
| Score | Status | Acao |
|-------|--------|------|
| >= 8.0 | EXCELENTE | Manter e expandir |
| 7.0-7.9 | SAUDAVEL | Melhorias pontuais |
| 6.0-6.9 | ATENCAO | Plano de acao prioritario |
| 5.0-5.9 | RISCO | Intervencao imediata |
| < 5.0 | CRITICO | Pausar expansao, focar na rede |

============================================================
```

---

### Phase 6: Plano de Acao

**6.1 — Acoes por Prioridade**

```
PLANO DE ACAO — REDE AVEND
============================================================

P0 — URGENTE (Proximos 30 dias)
| Acao | Responsavel | Prazo | Franqueados | KPI Alvo |
|------|-------------|-------|------------|----------|
| | | | | |

P1 — ALTA (Proximos 90 dias)
| Acao | Responsavel | Prazo | Franqueados | KPI Alvo |
|------|-------------|-------|------------|----------|
| | | | | |

P2 — MEDIA (Proximo semestre)
| Acao | Responsavel | Prazo | Franqueados | KPI Alvo |
|------|-------------|-------|------------|----------|
| | | | | |

P3 — CONTINUA (Monitoramento)
| Acao | Responsavel | Frequencia | KPI Alvo |
|------|-------------|-----------|----------|
| | | | |

============================================================
```

**6.2 — Acoes por Cluster**

| Cluster | Acao Principal | Frequencia de Acompanhamento | Meta |
|---------|---------------|------------------------------|------|
| Estrelas | Reconhecimento + mentoria | Mensal | Manter e replicar |
| Solidos | Desenvolvimento + desafios | Mensal | Elevar para Estrelas |
| Atencao | Plano individual + suporte intensivo | Semanal | Elevar para Solidos |
| Risco | Intervencao + decisao de continuidade | Diario/Semanal | Recuperar ou desligar |

---

## Validation

### Criterios de Qualidade do Diagnostico

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Dados suficientes | >= 50% da rede com dados | [ ] |
| E-Factor avaliado | Todas as dimensoes medidas | [ ] |
| Segmentacao | Clusters identificados | [ ] |
| Root cause | Analise causal para underperformers | [ ] |
| Health score | Score consolidado calculado | [ ] |
| Benchmarking | Comparacao com setor ABF | [ ] |
| Plano de acao | Acoes priorizadas e com responsaveis | [ ] |
| Tendencias | Analise temporal (nao apenas snapshot) | [ ] |
| Qualitativo | Dados de pesquisa + dados quantitativos | [ ] |
| Actionable | Recomendacoes concretas e executaveis | [ ] |

### Checklist de Entrega

- [ ] `network-diagnostic-report.md` gerado
- [ ] `e-factor-assessment.md` gerado
- [ ] `action-plan-network-health.md` gerado
- [ ] E-Factor mapeado por franqueado e consolidado
- [ ] KPIs operacionais coletados e analisados
- [ ] Clusters de performance identificados
- [ ] Root cause analysis para franqueados em risco
- [ ] Health score global calculado
- [ ] Plano de acao priorizado
- [ ] Benchmarking com setor ABF incluido

---

## References

- **Nathan, Greg.** "The Franchise E-Factor: Understanding and Improving the All-Important Franchise Relationship." Franchise Relationships Institute, 2008.
- **Nathan, Greg.** "Profitable Partnerships." Franchise Relationships Institute, 2000.
- **Nathan, Greg.** "The Franchisor's Guide to Field Visits." FRI, 2012.
- **Franchise Relationships Institute.** www.franchiserelationships.com
- **ABF.** Pesquisa de Satisfacao do Franchising.
- **Siebert, Mark.** "Franchise Your Business." — Network health metrics.
- **Bradach, Jeffrey.** "Franchise Organizations." — Network management.

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-008*
