# Perfil do Candidato a Franqueado — {{nome_candidato}}
# Template de relatorio de qualificacao
# Squad: Avend Franquias
# Updated: 2026-03-13

> **Data da avaliacao:** {{data_avaliacao}}
> **Avaliador:** {{nome_avaliador}}
> **Status:** {{status_decisao}}
> **Territorio pretendido:** {{territorio_pretendido}}

---

## 1. Dados Pessoais

| Campo | Informacao |
|-------|-----------|
| Nome completo | {{nome_completo}} |
| CPF | {{cpf}} |
| Data de nascimento | {{data_nascimento}} |
| Estado civil | {{estado_civil}} |
| Endereco | {{endereco}} |
| Cidade/UF | {{cidade_uf}} |
| Telefone | {{telefone}} |
| Email | {{email}} |
| Profissao atual | {{profissao}} |
| Formacao | {{formacao}} |

---

## 2. Scoring de Qualificacao

### 2.1 Resumo dos Scores

| Eixo | Score | Max | % |
|------|-------|-----|---|
| Financeiro | {{score_financeiro}} | 30 | {{pct_financeiro}}% |
| Comportamental | {{score_comportamental}} | 30 | {{pct_comportamental}}% |
| Geografico | {{score_geografico}} | 20 | {{pct_geografico}}% |
| Disponibilidade | {{score_disponibilidade}} | 20 | {{pct_disponibilidade}}% |
| **TOTAL** | **{{score_total}}** | **100** | **{{pct_total}}%** |

### 2.2 Classificacao

**{{classificacao}}** — {{descricao_classificacao}}

```
[==========] 100%  Excelente (>=80)
[========  ]  80%  Bom (70-79)
[======    ]  60%  Aceitavel (60-69)
[====      ]  40%  Marginal (50-59)
[==        ]  20%  Insuficiente (<50)

Score do candidato: [{{barra_visual}}] {{pct_total}}%
```

---

## 3. Analise Financeira

### 3.1 Patrimonio Declarado

| Item | Valor |
|------|-------|
| Imoveis | R$ {{patrimonio_imoveis}} |
| Veiculos | R$ {{patrimonio_veiculos}} |
| Investimentos financeiros | R$ {{patrimonio_investimentos}} |
| Poupanca/conta corrente | R$ {{patrimonio_poupanca}} |
| Outros | R$ {{patrimonio_outros}} |
| **Total declarado** | **R$ {{patrimonio_total}}** |

### 3.2 Capital Disponivel para Investimento

| Fonte | Valor | % do Total |
|-------|-------|------------|
| Capital proprio | R$ {{capital_proprio}} | {{pct_capital_proprio}}% |
| Financiamento | R$ {{capital_financiamento}} | {{pct_financiamento}}% |
| Outros | R$ {{capital_outros}} | {{pct_outros}}% |
| **Total** | **R$ {{capital_total}}** | **100%** |

### 3.3 Adequacao ao Investimento

| Parametro | Valor | Status |
|-----------|-------|--------|
| Investimento total necessario | R$ {{investimento_necessario}} | — |
| Capital disponivel | R$ {{capital_total}} | {{status_capital}} |
| Capital de giro (3 meses) | R$ {{capital_giro_necessario}} | {{status_giro}} |
| Reserva pessoal (6 meses) | R$ {{reserva_necessaria}} | {{status_reserva}} |

### 3.4 Saude Financeira

- Restritivos SPC/Serasa: {{status_restritivos}}
- Score de credito: {{score_credito}}
- Experiencia com gestao financeira: {{experiencia_financeira}}

**Parecer financeiro:** {{parecer_financeiro}}

---

## 4. Analise Comportamental

### 4.1 Scores por Dimensao

| Dimensao | Score | Max | Observacao |
|----------|-------|-----|------------|
| Perfil Empreendedor | {{score_empreendedor}} | 5 | {{obs_empreendedor}} |
| Tolerancia a Risco | {{score_risco}} | 5 | {{obs_risco}} |
| Autonomia vs Padrao | {{score_padrao}} | 5 | {{obs_padrao}} |
| Alinhamento Cultural | {{score_cultural}} | 5 | {{obs_cultural}} |
| Habilidades Relacionamento | {{score_relacionamento}} | 5 | {{obs_relacionamento}} |
| Motivacao e Visao | {{score_motivacao}} | 5 | {{obs_motivacao}} |

### 4.2 Experiencia Profissional Relevante

{{experiencia_profissional}}

### 4.3 Experiencia com Franquias

{{experiencia_franquias}}

### 4.4 Impressoes da Entrevista

{{impressoes_entrevista}}

**Parecer comportamental:** {{parecer_comportamental}}

---

## 5. Analise Geografica

### 5.1 Territorio Pretendido

| Parametro | Detalhe |
|-----------|---------|
| Cidade/Regiao | {{territorio_cidade}} |
| Populacao | {{territorio_populacao}} |
| PIB per capita | R$ {{territorio_pib}} |
| Disponibilidade | {{territorio_disponivel}} |
| Concorrencia local | {{territorio_concorrencia}} |

### 5.2 Potencial de Mercado

| Indicador | Valor |
|-----------|-------|
| Pontos potenciais mapeados | {{pontos_potenciais}} |
| Estimativa de maquinas (12 meses) | {{estimativa_maquinas}} |
| Faturamento potencial/mes | R$ {{faturamento_potencial}} |
| Distancia do centro de distribuicao | {{distancia_cd}} km |

### 5.3 Mapa de Pontos Potenciais

| # | Local | Tipo | Fluxo Estimado | Potencial |
|---|-------|------|----------------|-----------|
| 1 | {{ponto_1}} | {{tipo_1}} | {{fluxo_1}} | {{potencial_1}} |
| 2 | {{ponto_2}} | {{tipo_2}} | {{fluxo_2}} | {{potencial_2}} |
| 3 | {{ponto_3}} | {{tipo_3}} | {{fluxo_3}} | {{potencial_3}} |

**Parecer geografico:** {{parecer_geografico}}

---

## 6. Analise de Disponibilidade

| Criterio | Detalhe | Score |
|----------|---------|-------|
| Tipo de dedicacao | {{tipo_dedicacao}} | {{score_dedicacao}} |
| Residencia | {{distancia_residencia}} | {{score_residencia}} |
| Prazo para inicio | {{prazo_inicio}} | {{score_prazo}} |
| Conflitos de interesse | {{conflitos}} | {{status_conflitos}} |

**Parecer disponibilidade:** {{parecer_disponibilidade}}

---

## 7. Referencias

### 7.1 Referencias Checadas

| # | Nome | Relacao | Contato | Resultado |
|---|------|---------|---------|-----------|
| 1 | {{ref_1_nome}} | {{ref_1_relacao}} | {{ref_1_contato}} | {{ref_1_resultado}} |
| 2 | {{ref_2_nome}} | {{ref_2_relacao}} | {{ref_2_contato}} | {{ref_2_resultado}} |
| 3 | {{ref_3_nome}} | {{ref_3_relacao}} | {{ref_3_contato}} | {{ref_3_resultado}} |

---

## 8. Veto Conditions

| # | Condicao | Status |
|---|----------|--------|
| 1 | Restritivos ativos SPC/Serasa | {{veto_restritivos}} |
| 2 | Capital insuficiente | {{veto_capital}} |
| 3 | Conflito de interesse | {{veto_conflito}} |
| 4 | Resistencia a padroes da rede | {{veto_padrao}} |
| 5 | Territorio indisponivel | {{veto_territorio}} |
| 6 | Historico negativo com franquias | {{veto_historico}} |

**Algum veto ativo?** {{veto_ativo}}

---

## 9. Decisao Final

### Recomendacao

**{{decisao_final}}**

{{justificativa_decisao}}

### Condicoes (se condicional)

{{condicoes_aprovacao}}

### Proximos Passos

1. {{proximo_passo_1}}
2. {{proximo_passo_2}}
3. {{proximo_passo_3}}

---

**Avaliador:** {{nome_avaliador}} — Data: {{data_avaliacao}}
**Aprovador:** {{nome_aprovador}} — Data: {{data_aprovacao}}

---

*Avend Franquias — Squad Franchising v1.0.0-pro*
