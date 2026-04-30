# Task: expansion-plan

```yaml
task: expansion-plan
id: FA-TASK-006
responsavel: "@franchise-growth + @franchise-lifecycle"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - current_network_data: string - Dados atuais da rede (unidades, territorios, performance)
  - market_analysis_path: string - Analise de mercado e oportunidades geograficas
  - financial_model_path: string - Modelo financeiro para projecoes de expansao
  - franchisor_capacity: string - Capacidade do franqueador (equipe, capital, suporte)

Saida:
  - expansion-plan-avend.md: Plano de expansao geografica completo
  - territory-map.md: Mapeamento de territorios prioritarios
  - expansion-timeline.md: Cronograma de expansao (12-36 meses)

Checklist:
  - Analise de mercado enderecavel (TAM/SAM/SOM) por regiao
  - Territorios prioritarios mapeados e classificados
  - Criterios de selecao de territorio definidos
  - Modelo de expansao escolhido (organico, multi-unit, area development)
  - Capacidade de suporte avaliada (quantas unidades novas/trimestre)
  - Projecao financeira de expansao (investimento necessario)
  - Riscos de expansao mapeados e mitigados
  - Timeline realista com marcos e gates
  - Estrategia de captacao de franqueados por regiao
  - Infraestrutura necessaria para suportar crescimento

veto_conditions:
  - Rede atual com taxa de mortalidade > 10% (resolver antes de expandir)
  - NPS de franqueados < 6 (resolver satisfacao antes de expandir)
  - Franqueador sem capital ou equipe para suportar novas unidades
  - Modelo financeiro nao validado (expandir modelo nao comprovado)
  - Mercado-alvo sem demanda comprovada

output_examples:
  - |
    ## Plano de Expansao — Avend Franquias 2026-2028
    | Fase | Periodo | Novas Unidades | Regiao Foco | Investimento |
    |------|---------|---------------|-------------|-------------|
    | 1 | Q1-Q2 2026 | 15 | SP Interior | R$ 150k |
    | 2 | Q3-Q4 2026 | 20 | RJ + MG | R$ 250k |
    | 3 | 2027 | 40 | Sul + Nordeste | R$ 500k |
    **Meta: 90 → 165 franqueados em 24 meses (+83%)**
```

---

## Purpose

Criar o **plano de expansao geografica** da Avend Franquias, definindo onde, quando e como crescer a rede de franquias de vending machines no Brasil. O plano equilibra ambicao de crescimento com capacidade de suporte — expandir mais rapido do que a capacidade de suportar e a receita para o fracasso de uma rede.

**Principio fundamental (Mark Siebert):** "A franquia que cresce mais rapido nao e a que abre mais unidades, mas a que abre as unidades certas, nos lugares certos, com as pessoas certas." Crescimento desordenado mata redes de franquia.

**Contexto Avend:** Com 184 maquinas e 90 contratos, a Avend tem base solida para expansao. O mercado brasileiro de vending machines tem penetracao muito baixa comparada a mercados maduros (Japao: 1 maquina/23 pessoas; EUA: 1/35; Brasil: 1/600+), o que representa oportunidade enorme de crescimento.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `current_network_data` | string | Sim | Rede atual: unidades, localizacao, performance, cobertura |
| `market_analysis_path` | string | Sim | TAM/SAM/SOM, demograficos, potencial por regiao |
| `financial_model_path` | string | Sim | Unit economics, capacidade de investimento, ROI por regiao |
| `franchisor_capacity` | string | Sim | Equipe, capital, infraestrutura de suporte |
| `competitor_map` | string | Nao | Presenca de concorrentes por regiao |
| `abf_data` | string | Nao | Dados ABF sobre crescimento do setor por regiao |

---

## Preconditions

1. **Rede saudavel**: Taxa de mortalidade < 10%, NPS franqueados > 6.
2. **Modelo validado**: Unit economics comprovado em pelo menos 12 meses de operacao real.
3. **Capacidade de suporte**: Franqueador tem equipe e processos para atender novas unidades.
4. **Capital disponivel**: Recursos para investir em expansao (marketing, equipe, infraestrutura).
5. **Modelo financeiro atualizado**: Projecoes financeiras confiaveis.

---

## Key Activities & Instructions

### Phase 1: Diagnostico da Rede Atual

**1.1 — Mapa da Rede Atual**

```yaml
current_network:
  total_franchisees: 90
  total_machines: 184
  geographic_coverage:
    states: []
    cities: []
    concentration_map: {} # Cidade: numero de franqueados

  performance:
    average_revenue_per_franchisee: 0
    median_revenue_per_franchisee: 0
    churn_rate_annual: 0
    nps_franchisees: 0
    average_machines_per_franchisee: 0

  capacity:
    support_team_size: 0
    max_franchisees_per_consultant: 0
    current_utilization: "" # % da capacidade de suporte
```

**1.2 — Avaliacao de Prontidao para Expansao**

| Criterio | Requisito | Atual | Status |
|----------|-----------|-------|--------|
| Taxa de mortalidade | < 10% | ___% | |
| NPS franqueados | > 6 | ___ | |
| Satisfacao geral | > 70% satisfeitos | ___% | |
| Processos documentados | Manual completo | | |
| Equipe de suporte | Capacidade > 120% | | |
| Capital disponivel | > R$ Xk para expansao | | |
| Modelo financeiro | Validado 12+ meses | | |
| COF atualizada | Vigente | | |
| Treinamento estruturado | Programa completo | | |

**Veto gate:** Se mais de 3 criterios falharem, PARAR e recomendar resolver gaps antes de expandir.

---

### Phase 2: Analise de Mercado e Territorios

**2.1 — TAM/SAM/SOM Nacional**

```yaml
market_sizing:
  tam: # Total Addressable Market
    descricao: "Total de pontos potenciais para vending no Brasil"
    calculo: "Escritorios + hospitais + universidades + condominios + ..."
    valor: 0
    fonte: ""

  sam: # Serviceable Available Market
    descricao: "Pontos que a Avend pode servir (perfil, geografia, infraestrutura)"
    calculo: ""
    valor: 0

  som: # Serviceable Obtainable Market
    descricao: "Pontos que a Avend pode conquistar em 3-5 anos"
    calculo: ""
    valor: 0
    meta_market_share: ""
```

**2.2 — Scoring de Territorios**

Criar um scoring model para priorizar territorios:

| Criterio | Peso | Escala (1-10) | Descricao |
|----------|------|---------------|-----------|
| Populacao/densidade | 15% | | Massa critica de consumidores |
| PIB per capita | 15% | | Poder de compra |
| Pontos potenciais | 20% | | Escritorios, hospitais, universidades |
| Concorrencia | 15% | | Menor concorrencia = maior score |
| Logistica | 10% | | Acesso a fornecedores, facilidade operacional |
| Pool de franqueados | 10% | | Candidatos potenciais na regiao |
| Infraestrutura Avend | 10% | | Proximidade de consultores, suporte |
| Regulamentacao local | 5% | | Facilidade regulatoria |

**2.3 — Ranking de Territorios**

```
RANKING DE TERRITORIOS — TOP 20
============================================================
| # | Territorio | Score | Pop. | PIB/cap | Pontos | Concorr. |
|---|-----------|-------|------|---------|--------|----------|
| 1 | | /100 | | | | |
| 2 | | /100 | | | | |
| ... | | | | | | |
| 20 | | /100 | | | | |
============================================================
```

**2.4 — Analise de Concorrencia por Territorio**

| Territorio | Concorrentes | Maquinas Estimadas | Saturacao | Oportunidade |
|-----------|-------------|-------------------|-----------|-------------|
| | | | Baixa/Media/Alta | Alta/Media/Baixa |

---

### Phase 3: Estrategia de Expansao

**3.1 — Modelo de Expansao**

| Modelo | Descricao | Quando Usar | Para Avend |
|--------|-----------|-------------|-----------|
| **Organico** | 1 franqueado por vez, territorios adjacentes | Inicio, controle maximo | Fase 1 |
| **Multi-Unit** | Franqueados existentes abrem mais unidades | Rede madura, franqueados satisfeitos | Fase 2 |
| **Area Development** | Franqueado com direito de desenvolver regiao inteira | Expansao para regioes distantes | Fase 3 |
| **Master Franchise** | Sub-franqueador responsavel por estado/regiao | Escala nacional rapida | Futuro |
| **Conversao** | Converter operadores independentes em franqueados | Mercado com operadores estabelecidos | Oportunistico |

**3.2 — Ondas de Expansao**

```
ESTRATEGIA DE ONDAS
============================================================

ONDA 1 (Meses 1-6): CONSOLIDACAO E ADJACENCIAS
- Foco: Cidades proximas a base atual
- Modelo: Organico + Multi-Unit
- Meta: +15 franqueados
- Investimento: R$ ___
- Equipe necessaria: ___
- Justificativa: Menor risco, suporte facilitado

ONDA 2 (Meses 7-12): CAPITAIS ESTRATEGICAS
- Foco: Capitais com maior potencial
- Modelo: Organico + Area Development piloto
- Meta: +20 franqueados
- Investimento: R$ ___
- Equipe necessaria: ___
- Justificativa: Ganho de escala e visibilidade

ONDA 3 (Meses 13-24): EXPANSAO REGIONAL
- Foco: Novas regioes do Brasil
- Modelo: Area Development + Multi-Unit
- Meta: +40 franqueados
- Investimento: R$ ___
- Equipe necessaria: ___
- Justificativa: Cobertura nacional, economia de escala

ONDA 4 (Meses 25-36): ESCALA NACIONAL
- Foco: Todas as regioes viáveis
- Modelo: Todos os modelos combinados
- Meta: +50 franqueados
- Investimento: R$ ___
- Equipe necessaria: ___
============================================================
```

**3.3 — Infraestrutura de Suporte para Crescimento**

| Faixa (franqueados) | Consultores | Central Atend. | Sistemas | Investimento |
|---------------------|------------|----------------|---------|-------------|
| 90-120 | N | | | R$ |
| 120-150 | N | | | R$ |
| 150-200 | N | | | R$ |
| 200+ | N | | | R$ |

---

### Phase 4: Timeline e Marcos

**4.1 — Cronograma Detalhado**

```
TIMELINE DE EXPANSAO — 36 MESES
============================================================
Q1/2026:
  - [ ] Validar modelo financeiro atualizado
  - [ ] Contratar +X consultores de campo
  - [ ] Lancar campanha de captacao (regioes Onda 1)
  - [ ] Meta: +5 novos franqueados

Q2/2026:
  - [ ] Programa multi-unit para franqueados top 10
  - [ ] Expandir para +2 cidades adjacentes
  - [ ] Meta: +10 novos franqueados
  - [ ] Gate: NPS > 7, mortalidade < 8%

Q3/2026:
  - [ ] Iniciar Onda 2 (capitais)
  - [ ] Contratar equipe regional
  - [ ] Meta: +10 novos franqueados

Q4/2026:
  - [ ] Consolidar Onda 2
  - [ ] Piloto Area Development (1 regiao)
  - [ ] Meta: +10 novos franqueados
  - [ ] Gate: 130+ franqueados, NPS > 7

[... Q1-Q4 2027, Q1-Q4 2028 ...]
============================================================
```

**4.2 — Gates de Expansao**

Cada onda so avanca se os gates forem atingidos:

| Gate | Metrica | Limiar | Consequencia se falhar |
|------|---------|--------|----------------------|
| G1 | NPS Franqueados | > 7 | Pausar expansao, resolver satisfacao |
| G2 | Taxa mortalidade | < 10% | Pausar, analisar causas de churn |
| G3 | Capacidade suporte | > 110% | Contratar antes de abrir |
| G4 | Performance novos | > 70% do target em 6 meses | Revisar treinamento/selecao |
| G5 | Capital disponivel | Positivo | Ajustar ritmo de expansao |

---

### Phase 5: Captacao de Franqueados

**5.1 — Estrategia de Captacao por Canal**

| Canal | Investimento | CPL Esperado | Conversao | Franqueados/Ano |
|-------|-------------|-------------|-----------|----------------|
| Portal ABF | R$ | R$ | % | |
| Google Ads | R$ | R$ | % | |
| Redes sociais | R$ | R$ | % | |
| Feiras (ABF Expo) | R$ | R$ | % | |
| Indicacao rede | R$ 0 | R$ 0 | Alto | |
| Parcerias | R$ | R$ | % | |

**5.2 — Meta de Pipeline**

Para atingir a meta de expansao, o pipeline deve ser:

```
Meta: +X franqueados/trimestre
Taxa conversao funil: ~10-15%
Necessidade de leads: X * (1/0.12) = ~Y leads/trimestre
Distribuicao por canal: [...]
```

---

### Phase 6: Riscos e Mitigacao

**6.1 — Riscos de Expansao**

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|-------------|---------|-----------|
| Expansao mais rapida que suporte | Alta | Critico | Gates de capacidade |
| Selecao inadequada de franqueados | Media | Alto | Processo de screening rigoroso |
| Territorios sem demanda suficiente | Media | Alto | Scoring de territorios |
| Competicao intensa em novas regioes | Media | Medio | Pesquisa previa, diferenciais |
| Capital insuficiente | Baixa | Critico | Projecao financeira conservadora |
| Regulamentacao desfavoravel | Baixa | Alto | Monitoramento regulatorio |
| Qualidade da rede cai com crescimento | Media | Critico | Auditorias, programa excelencia |

---

## Validation

### Criterios de Qualidade do Plano

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Baseado em dados | Analise de mercado com dados reais | [ ] |
| Priorizado | Territorios ranqueados por potencial | [ ] |
| Realista | Capacidade de suporte considerada | [ ] |
| Faseado | Ondas com gates de aprovacao | [ ] |
| Financeiro | Investimento e ROI projetados | [ ] |
| Riscos | Riscos mapeados com mitigacao | [ ] |
| Timeline | Cronograma detalhado com marcos | [ ] |
| Captacao | Estrategia de captacao definida | [ ] |
| Infraestrutura | Necessidades de suporte projetadas | [ ] |
| Compliance | Lei 13.966/2019 considerada | [ ] |

### Checklist de Entrega

- [ ] `expansion-plan-avend.md` gerado
- [ ] `territory-map.md` gerado
- [ ] `expansion-timeline.md` gerado
- [ ] TAM/SAM/SOM calculado
- [ ] Territorios priorizados com scoring
- [ ] Ondas de expansao definidas
- [ ] Gates de aprovacao para cada onda
- [ ] Estrategia de captacao por canal
- [ ] Riscos mapeados e mitigados
- [ ] Projecao de infraestrutura de suporte

---

## References

- **Siebert, Mark.** "Franchise Your Business." — Strategic expansion planning.
- **ABF.** Guia de Expansao de Redes de Franquias.
- **ABVA.** Dados do mercado de vending automatico no Brasil.
- **Nathan, Greg.** "The Franchise E-Factor." — Saude da rede como prerequisito.
- **Bradach, Jeffrey.** "Franchise Organizations." — Franchise growth models.
- **IBGE.** Dados demograficos e economicos por municipio.
- **Lei 13.966/2019.** Implicacoes legais de expansao territorial.

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-006*
