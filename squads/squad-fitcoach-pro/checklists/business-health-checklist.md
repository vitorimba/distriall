# Business Health Checklist — FitCoach Squad

> **Checklist ID:** `business-health-checklist`
> **Version:** 1.0
> **Última atualização:** 2026-03-11
> **Uso:** Quality gate para diagnóstico de saúde do negócio de fitness coaching
> **Gate Type:** DIAGNOSTIC — Avalia maturidade e saúde operacional do negócio

---

## Critérios de Aprovação

| Score | Classificação | Ação |
|-------|-------------|------|
| 36-40/40 | NEGÓCIO SAUDÁVEL | Foco em otimização e escala |
| 28-35/40 | NEGÓCIO EM CRESCIMENTO | Fortalecer áreas fracas identificadas |
| 20-27/40 | NEGÓCIO EM DESENVOLVIMENTO | Plano de ação prioritário para gaps |
| 12-19/40 | NEGÓCIO EM RISCO | Intervenção urgente em múltiplas áreas |
| <12/40 | NEGÓCIO CRÍTICO | Reestruturação fundamental necessária |

---

## Seção 1: Métricas Financeiras (10 pontos)

### 1.1 ARM — Average Revenue per Member

- [ ] **ARM calculado e benchmarked** (2 pontos)
  - Fórmula: Receita Mensal Total / Número de Clientes Ativos
  - Valor atual: R$ `{{arm_value}}`
  - Benchmarks:

    | Faixa | Classificação | Contexto |
    |-------|-------------|---------|
    | < R$ 100 | Crítico | Subvalorização severa, provavelmente volume sem qualidade |
    | R$ 100-199 | Abaixo | Mercado commoditizado, precisa diferenciar |
    | R$ 200-399 | Adequado | Range saudável para personal trainer |
    | R$ 400-699 | Bom | Posicionamento premium ou serviço completo |
    | R$ 700+ | Excelente | Alto ticket, nicho especializado |

  - Análise:
    - ARM < R$ 200: Investigar precificação, volume de serviço, posicionamento
    - ARM em queda: Investigar downsell, descontos excessivos, perda de clientes premium
  - Pontuação:
    - 2 = ARM >= R$ 200 e estável ou crescente
    - 1 = ARM R$ 100-199 ou em queda
    - 0 = ARM < R$ 100 ou não calculado

### 1.2 LEG — Length of Engagement

- [ ] **LEG calculado e benchmarked** (2 pontos)
  - Fórmula: Média de meses que um cliente permanece ativo
  - Valor atual: `{{leg_value}}` meses
  - Cálculo alternativo: 1 / Churn Rate Mensal
  - Benchmarks:

    | Faixa | Classificação | Contexto |
    |-------|-------------|---------|
    | < 3 meses | Crítico | Altíssima rotatividade, falha no onboarding ou entrega |
    | 3-5 meses | Abaixo | Rotatividade alta, clientes não veem valor suficiente |
    | 6-8 meses | Adequado | Range aceitável para presencial |
    | 9-12 meses | Bom | Boa retenção, clientes satisfeitos |
    | 12+ meses | Excelente | Retenção excepcional, community forte |

  - Análise:
    - LEG < 6 meses: Investigar experiência do cliente, resultados entregues, comunicação
    - LEG caindo: Investigar mudanças recentes (preço, serviço, atendimento)
  - Pontuação:
    - 2 = LEG >= 6 meses e estável ou crescente
    - 1 = LEG 3-5 meses ou em queda
    - 0 = LEG < 3 meses ou não calculado

### 1.3 Churn Rate

- [ ] **Churn rate mensal calculado** (2 pontos)
  - Fórmula: (Clientes cancelados no mês / Clientes ativos no início do mês) × 100
  - Valor atual: `{{churn_rate}}` %
  - Benchmarks:

    | Faixa | Classificação | Impacto |
    |-------|-------------|--------|
    | < 5% | Excelente | Crescimento orgânico sólido |
    | 5-8% | Bom | Sustentável com captação moderada |
    | 8-12% | Atenção | Precisa captar muito para crescer |
    | 12-20% | Ruim | Balde furado — growth negativo provável |
    | > 20% | Crítico | Negócio insustentável, resolver retenção ANTES de captar |

  - Análise:
    - Churn > 10%: Mapear motivos de cancelamento (top 3)
    - Churn sazonal: Identificar meses de pico (Janeiro, Julho — férias)
  - Motivos mais comuns de churn no fitness:
    1. Resultados insuficientes (percepção)
    2. Financeiro (preço alto vs. percepção de valor)
    3. Falta de tempo (mudança de rotina)
    4. Relacionamento com o coach (comunicação)
    5. Lesão ou saúde
  - Pontuação:
    - 2 = Churn < 8%
    - 1 = Churn 8-15%
    - 0 = Churn > 15% ou não calculado

### 1.4 LTV e CAC

- [ ] **LTV calculado** (2 pontos)
  - Fórmula: ARM × LEG
  - Valor atual: R$ `{{ltv_value}}`
  - Benchmarks:

    | Faixa | Classificação |
    |-------|-------------|
    | < R$ 600 | Crítico |
    | R$ 600-1.500 | Abaixo |
    | R$ 1.500-4.000 | Adequado |
    | R$ 4.000-8.000 | Bom |
    | R$ 8.000+ | Excelente |

- [ ] **CAC calculado e LTV:CAC ratio avaliado** (incluído no score acima)
  - Fórmula CAC: Investimento total em marketing e vendas / Novos clientes no período
  - Valor CAC: R$ `{{cac_value}}`
  - LTV:CAC Ratio: `{{ltv_cac_ratio}}`

    | Ratio | Classificação | Ação |
    |-------|-------------|------|
    | < 1:1 | Insustentável | Cada cliente dá prejuízo |
    | 1:1 - 2:1 | Fraco | Margem muito baixa |
    | 3:1 | Saudável | Target ideal |
    | 5:1+ | Subinvestindo | Pode investir mais em aquisição |

  - Pontuação:
    - 2 = LTV > R$ 1.500 E LTV:CAC > 3:1
    - 1 = LTV R$ 600-1.500 OU LTV:CAC 1:1-3:1
    - 0 = LTV < R$ 600 OU LTV:CAC < 1:1 OU não calculado

### 1.5 NOB — Net Operating Balance

- [ ] **NOB calculado e margem avaliada** (2 pontos)
  - Fórmula: Receita Líquida - Custos Operacionais Totais
  - Receita líquida: R$ `{{net_revenue}}`
  - Custos operacionais detalhados:

    | Custo | Valor Mensal | % da Receita |
    |-------|------------|-------------|
    | Aluguel/coworking/academia | R$ `{{rent_cost}}` | `{{rent_pct}}` % |
    | Equipamentos/manutenção | R$ `{{equip_cost}}` | `{{equip_pct}}` % |
    | Marketing/Ads | R$ `{{marketing_cost}}` | `{{marketing_pct}}` % |
    | Ferramentas/Software | R$ `{{software_cost}}` | `{{software_pct}}` % |
    | Impostos (MEI/ME/Simples) | R$ `{{tax_cost}}` | `{{tax_pct}}` % |
    | Staff/Assistentes | R$ `{{staff_cost}}` | `{{staff_pct}}` % |
    | Outros | R$ `{{other_cost}}` | `{{other_pct}}` % |
    | **TOTAL CUSTOS** | **R$ `{{total_costs}}`** | **`{{total_costs_pct}}`%** |

  - NOB: R$ `{{nob_value}}`
  - Margem: `{{margin_pct}}` %

    | Margem | Classificação | Contexto |
    |--------|-------------|---------|
    | < 20% | Crítico | Custos muito altos ou receita muito baixa |
    | 20-39% | Atenção | Otimizar custos ou aumentar receita |
    | 40-59% | Saudável | Range típico de personal trainer |
    | 60-75% | Bom | Operação enxuta, boa eficiência |
    | 75%+ | Excelente | Típico de consultoria online / digital |

  - Pontuação:
    - 2 = Margem >= 40% e NOB positivo
    - 1 = Margem 20-39% ou NOB marginalmente positivo
    - 0 = Margem < 20% ou NOB negativo

---

## Seção 2: Métricas de Capacidade e Operação (8 pontos)

### 2.1 Capacidade de Clientes

- [ ] **Capacidade analisada** (2 pontos)
  - Dados:
    - Clientes ativos: `{{active_clients}}`
    - Capacidade máxima (sustentável): `{{max_capacity}}`
    - Utilização: `{{utilization}}` %
  - Análise:
    - < 50% utilização: Focar em captação
    - 50-80%: Zona de crescimento saudável
    - 80-95%: Quase cheio — preparar para escalar (semi-personal, online, assistentes)
    - > 95%: Lotado — risco de burnout, precisa escalar ou aumentar preço
  - Capacidade por modalidade:
    - Personal 1:1: max `{{max_personal}}` clientes (limite físico/temporal)
    - Semi-personal: max `{{max_semi}}` clientes
    - Online: max `{{max_online}}` clientes (escalável)
    - Grupo: max `{{max_group}}` clientes
  - Pontuação:
    - 2 = Utilização 50-90% com plano de escala
    - 1 = Utilização < 50% ou > 90% sem plano
    - 0 = Não tem clareza sobre capacidade

### 2.2 Revenue Streams

- [ ] **Fontes de receita identificadas e diversificadas** (2 pontos)
  - Fontes atuais:

    | Fonte | Receita | % Total | Status |
    |-------|---------|---------|--------|
    | `{{stream_1}}` | R$ `{{rev_1}}` | `{{pct_1}}` % | `{{status_1}}` |
    | `{{stream_2}}` | R$ `{{rev_2}}` | `{{pct_2}}` % | `{{status_2}}` |
    | `{{stream_3}}` | R$ `{{rev_3}}` | `{{pct_3}}` % | `{{status_3}}` |

  - Análise de concentração:
    - Maior fonte > 80% do total → RISCO ALTO de concentração
    - Maior fonte 60-80% → Risco moderado, buscar segunda fonte
    - Nenhuma fonte > 60% → Diversificação saudável
  - Oportunidades não exploradas:
    - [ ] Consultoria online
    - [ ] Programas em grupo
    - [ ] Infoprodutos (cursos, e-books)
    - [ ] Programa de indicação pago
    - [ ] Revenda de suplementos
    - [ ] Eventos/workshops
  - Pontuação:
    - 2 = 2+ fontes com >20% cada, ou plano de diversificação em execução
    - 1 = 1 fonte dominante (>80%) mas com plano de diversificação
    - 0 = 1 fonte dominante sem plano

### 2.3 Automação e Eficiência

- [ ] **Oportunidades de automação mapeadas** (2 pontos)
  - Processos avaliados:

    | Processo | Status Atual | Automatizável? | Ferramenta Sugerida | Economia Estimada |
    |----------|-------------|---------------|--------------------|--------------------|
    | Agendamento | `{{sched_status}}` | `{{sched_auto}}` | `{{sched_tool}}` | `{{sched_saving}}` h/sem |
    | Cobrança/Pagamento | `{{billing_status}}` | `{{billing_auto}}` | `{{billing_tool}}` | `{{billing_saving}}` h/sem |
    | Check-in semanal | `{{checkin_status}}` | `{{checkin_auto}}` | `{{checkin_tool}}` | `{{checkin_saving}}` h/sem |
    | Criação de protocolo | `{{protocol_status}}` | `{{protocol_auto}}` | `{{protocol_tool}}` | `{{protocol_saving}}` h/sem |
    | Follow-up WhatsApp | `{{followup_status}}` | `{{followup_auto}}` | `{{followup_tool}}` | `{{followup_saving}}` h/sem |
    | Conteúdo/social media | `{{content_status}}` | `{{content_auto}}` | `{{content_tool}}` | `{{content_saving}}` h/sem |

  - Pontuação:
    - 2 = 3+ processos automatizados ou em automação
    - 1 = 1-2 processos automatizados
    - 0 = Nenhum processo automatizado

### 2.4 Pricing Strategy

- [ ] **Estratégia de precificação avaliada** (2 pontos)
  - Dados:
    - Preço atual do serviço principal: R$ `{{main_price}}`
    - Preço por sessão (se personal): R$ `{{price_per_session}}`
    - Receita por hora trabalhada: R$ `{{revenue_per_hour}}`
    - Último reajuste de preço: `{{last_price_increase}}` (data)
  - Análise:
    - Receita por hora < R$ 50: Subvalorização severa
    - Receita por hora R$ 50-100: Abaixo do potencial
    - Receita por hora R$ 100-200: Adequado
    - Receita por hora R$ 200+: Premium
  - Estratégias avaliadas:
    - [ ] Tem tabela de preços estruturada?
    - [ ] Oferece pacotes (trimestral, semestral, anual)?
    - [ ] Tem diferenciação de preço por modalidade?
    - [ ] Faz reajuste anual (mínimo inflação)?
    - [ ] Tem estratégia de ancoragem (mostrar opção cara primeiro)?
    - [ ] Oferece garantia de resultado?
  - Pontuação:
    - 2 = Pricing estruturado, reajustado, com pacotes e ancoragem
    - 1 = Preço definido mas sem estratégia estruturada
    - 0 = Preço arbitrário, sem reajuste, sem pacotes

---

## Seção 3: Captação e Marketing (8 pontos)

### 3.1 Lead Generation

- [ ] **Geração de leads avaliada** (2 pontos)
  - Dados:
    - Leads/mês (média): `{{monthly_leads}}`
    - Fontes de leads:

      | Fonte | Volume | Conversão | CPL |
      |-------|--------|-----------|-----|
      | Indicação | `{{ref_vol}}` | `{{ref_conv}}` % | R$ `{{ref_cpl}}` |
      | Instagram/Social | `{{social_vol}}` | `{{social_conv}}` % | R$ `{{social_cpl}}` |
      | Google/SEO | `{{seo_vol}}` | `{{seo_conv}}` % | R$ `{{seo_cpl}}` |
      | Paid Ads | `{{ads_vol}}` | `{{ads_conv}}` % | R$ `{{ads_cpl}}` |
      | Parcerias | `{{partner_vol}}` | `{{partner_conv}}` % | R$ `{{partner_cpl}}` |
      | Walk-in/Orgânico | `{{walkin_vol}}` | `{{walkin_conv}}` % | R$ `{{walkin_cpl}}` |

  - Pontuação:
    - 2 = 2+ canais ativos gerando leads consistentes
    - 1 = 1 canal ativo ou leads inconsistentes
    - 0 = Sem estratégia de captação definida

### 3.2 Conversão

- [ ] **Taxa de conversão de leads em clientes avaliada** (2 pontos)
  - Dados:
    - Leads/mês: `{{monthly_leads}}`
    - Aulas experimentais/avaliações: `{{trial_sessions}}`
    - Novos clientes/mês: `{{new_clients}}`
    - Taxa de conversão lead → trial: `{{lead_to_trial}}` %
    - Taxa de conversão trial → cliente: `{{trial_to_client}}` %
    - Taxa geral lead → cliente: `{{overall_conversion}}` %
  - Benchmarks:
    - Lead → trial: 20-40% é bom
    - Trial → cliente: 50-70% é bom
    - Overall: 10-25% é bom
  - Pontuação:
    - 2 = Conversão geral >= 15% com funil documentado
    - 1 = Conversão geral 5-14% ou funil parcialmente documentado
    - 0 = Conversão < 5% ou não medida

### 3.3 Presença Digital

- [ ] **Presença digital avaliada** (2 pontos)
  - Canais:

    | Canal | Status | Seguidores/Alcance | Frequência de Posting | Qualidade |
    |-------|--------|-------------------|----------------------|-----------|
    | Instagram | `{{ig_status}}` | `{{ig_followers}}` | `{{ig_frequency}}` | `{{ig_quality}}` (1-10) |
    | YouTube | `{{yt_status}}` | `{{yt_subs}}` | `{{yt_frequency}}` | `{{yt_quality}}` (1-10) |
    | TikTok | `{{tt_status}}` | `{{tt_followers}}` | `{{tt_frequency}}` | `{{tt_quality}}` (1-10) |
    | Site/Blog | `{{site_status}}` | `{{site_traffic}}` | `{{site_frequency}}` | `{{site_quality}}` (1-10) |
    | Google Meu Negócio | `{{gmb_status}}` | `{{gmb_reviews}}` | — | `{{gmb_quality}}` (1-10) |

  - Pontuação:
    - 2 = 2+ canais ativos com conteúdo consistente e profissional
    - 1 = 1 canal ativo ou conteúdo inconsistente
    - 0 = Sem presença digital relevante

### 3.4 Programa de Indicação

- [ ] **Programa de indicação avaliado** (2 pontos)
  - Dados:
    - Tem programa formal de indicação? `{{referral_program}}`
    - % de clientes que vieram por indicação: `{{referral_pct}}` %
    - Incentivo oferecido: `{{referral_incentive}}`
    - Clientes por indicação/mês: `{{referral_clients}}`
  - Análise:
    - Indicação é o canal mais barato e com maior conversão
    - Todo coach deveria ter um programa formal
    - Meta: 30-50% dos novos clientes por indicação
  - Pontuação:
    - 2 = Programa formal ativo com incentivos claros
    - 1 = Indicações acontecem mas sem programa formal
    - 0 = Sem programa e poucas indicações

---

## Seção 4: Experiência do Cliente (8 pontos)

### 4.1 Onboarding

- [ ] **Processo de onboarding avaliado** (2 pontos)
  - Critérios:
    - [ ] Welcome kit estruturado
    - [ ] Primeira sessão com foco em rapport e educação (não treino pesado)
    - [ ] Expectativas alinhadas na primeira semana
    - [ ] Canal de comunicação definido
    - [ ] Próximas etapas claras
  - Pontuação:
    - 2 = Onboarding estruturado e padronizado
    - 1 = Onboarding parcial ou inconsistente
    - 0 = Sem processo de onboarding

### 4.2 Acompanhamento e Comunicação

- [ ] **Qualidade do acompanhamento avaliada** (2 pontos)
  - Critérios:
    - [ ] Check-in semanal estruturado
    - [ ] Tempo de resposta a mensagens < 4 horas (horário comercial)
    - [ ] Ajustes de protocolo baseados em dados (não feeling)
    - [ ] Feedback regular sobre progresso
    - [ ] Comunicação proativa (não apenas reativa)
  - Pontuação:
    - 2 = Acompanhamento consistente, proativo, baseado em dados
    - 1 = Acompanhamento presente mas reativo ou inconsistente
    - 0 = Pouco ou nenhum acompanhamento entre sessões

### 4.3 Resultados e Satisfação

- [ ] **Resultados entregues e satisfação medida** (2 pontos)
  - Dados:
    - % de clientes atingindo metas: `{{goal_achievement}}` %
    - NPS (Net Promoter Score): `{{nps_score}}`
    - Depoimentos/reviews positivos: `{{positive_reviews}}`
    - Reclamações nos últimos 3 meses: `{{complaints}}`
  - Pontuação:
    - 2 = >70% atingem metas E NPS > 50
    - 1 = 50-70% atingem metas OU NPS 20-50
    - 0 = <50% atingem metas OU NPS < 20 OU não mede

### 4.4 Staff/Equipe

- [ ] **Utilização de equipe/staff avaliada** (2 pontos)
  - Dados:
    - Trabalha sozinho? `{{solo}}`
    - Assistentes: `{{assistants}}`
    - Outros coaches: `{{other_coaches}}`
    - Terceirizados: `{{freelancers}}` (designer, social media, etc.)
  - Análise:
    - Solo com <20 clientes: Aceitável
    - Solo com 20-30 clientes: No limite — precisa de assistente
    - Solo com >30 clientes: Insustentável — burnout iminente
    - Com equipe: Avaliar utilização e delegação
  - Pontuação:
    - 2 = Equipe adequada à demanda OU solo dentro da capacidade com plano de escala
    - 1 = Ligeiramente sobrecarregado ou subutilizando equipe
    - 0 = Claramente sobrecarregado sem plano de solução

---

## Seção 5: Planejamento (6 pontos)

### 5.1 90-Day Action Plan

- [ ] **Plano de ação de 90 dias criado** (3 pontos)
  - Critérios:
    - [ ] Metas SMART definidas para 30/60/90 dias
    - [ ] KPIs de acompanhamento definidos
    - [ ] Responsáveis atribuídos
    - [ ] Investimento necessário calculado
    - [ ] ROI esperado estimado
  - Estrutura mínima:
    - Mês 1: Ações imediatas (quick wins)
    - Mês 2: Ações de fortalecimento
    - Mês 3: Ações de escala
  - Pontuação:
    - 3 = Plano completo com metas, KPIs e responsáveis
    - 2 = Plano parcial (metas sem KPIs ou sem responsáveis)
    - 1 = Lista de ações sem estrutura
    - 0 = Sem plano

### 5.2 Visão de Longo Prazo

- [ ] **Visão de 1-3 anos articulada** (3 pontos)
  - Critérios:
    - [ ] Meta de receita para 12 meses
    - [ ] Meta de clientes para 12 meses
    - [ ] Modelo de negócio futuro definido (escalar como? online? equipe? franquia?)
    - [ ] Gaps de conhecimento identificados (o que precisa aprender)
    - [ ] Investimentos necessários mapeados
  - Pontuação:
    - 3 = Visão clara com metas quantificadas e plano de execução
    - 2 = Visão definida mas sem metas quantificadas
    - 1 = Ideia vaga de futuro
    - 0 = Sem visão de longo prazo

---

## Seção 6: Resumo e Score Final

### Tabela de Score

| # | Seção | Item | Max | Score |
|---|-------|------|-----|-------|
| 1 | Financeiro | ARM calculado e benchmarked | 2 | `{{s1}}` |
| 2 | Financeiro | LEG calculado e benchmarked | 2 | `{{s2}}` |
| 3 | Financeiro | Churn rate avaliado | 2 | `{{s3}}` |
| 4 | Financeiro | LTV e CAC calculados | 2 | `{{s4}}` |
| 5 | Financeiro | NOB e margem avaliados | 2 | `{{s5}}` |
| 6 | Operação | Capacidade analisada | 2 | `{{s6}}` |
| 7 | Operação | Revenue streams diversificados | 2 | `{{s7}}` |
| 8 | Operação | Automação mapeada | 2 | `{{s8}}` |
| 9 | Operação | Pricing strategy avaliada | 2 | `{{s9}}` |
| 10 | Marketing | Lead generation avaliada | 2 | `{{s10}}` |
| 11 | Marketing | Conversão avaliada | 2 | `{{s11}}` |
| 12 | Marketing | Presença digital avaliada | 2 | `{{s12}}` |
| 13 | Marketing | Programa de indicação avaliado | 2 | `{{s13}}` |
| 14 | Cliente | Onboarding avaliado | 2 | `{{s14}}` |
| 15 | Cliente | Acompanhamento avaliado | 2 | `{{s15}}` |
| 16 | Cliente | Resultados e satisfação medidos | 2 | `{{s16}}` |
| 17 | Cliente | Staff/equipe avaliada | 2 | `{{s17}}` |
| 18 | Planejamento | 90-day action plan criado | 3 | `{{s18}}` |
| 19 | Planejamento | Visão de longo prazo articulada | 3 | `{{s19}}` |
| — | **TOTAL** | — | **40** | **`{{total_score}}`** |

### Resultado do Diagnóstico

| Classificação | Score | Ação Recomendada |
|-------------|-------|-----------------|
| **`{{classification}}`** | **`{{total_score}}`/40** | `{{recommended_action}}` |

### Top 3 Prioridades Identificadas

| # | Prioridade | Seção | Impacto Estimado | Urgência |
|---|-----------|-------|-----------------|---------|
| 1 | `{{priority_1}}` | `{{section_1}}` | `{{impact_1}}` | `{{urgency_1}}` |
| 2 | `{{priority_2}}` | `{{section_2}}` | `{{impact_2}}` | `{{urgency_2}}` |
| 3 | `{{priority_3}}` | `{{section_3}}` | `{{impact_3}}` | `{{urgency_3}}` |

---

### Notas do Diagnóstico

```
{{diagnostic_notes}}
```

### Assinatura

| Papel | Nome | Data |
|-------|------|------|
| Analista | `{{analyst_name}}` | `{{diagnostic_date}}` |
| Coach/Proprietário | `{{owner_name}}` | `{{acknowledgment_date}}` |

---

> **Gerado pelo FitCoach Squad — Synkra AIOX**
> Checklist: `business-health-checklist` v1.0
