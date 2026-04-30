# Playbook: Gestão de Multifranqueados

> **Squad:** squad-franchising-avend (Avend Franquias)
> **Tipo:** Crescimento e Operações Multi-Unidade
> **Agentes:** @franchise-growth, @franchise-financial, @franchise-operations
> **Versão:** 1.0
> **Última atualização:** 2026-03-13

---

## 1. Objetivo

Framework para identificar, qualificar, apoiar e gerenciar operadores multi-unidade (multifranqueados) na rede Avend. O multifranqueado é o motor de crescimento acelerado — um operador que já conhece o modelo e pode escalar com menor custo de suporte por unidade.

---

## 2. Definições

| Termo | Definição |
|-------|-----------|
| **Monofranqueado** | Operador com 1 unidade/contrato |
| **Multifranqueado** | Operador com 2-5 unidades/contratos |
| **Master operador** | Operador com 6+ unidades (tratamento diferenciado) |
| **Unidade** | Conjunto de máquinas operado sob 1 contrato/território |
| **Cluster** | Agrupamento geográfico de unidades do mesmo operador |

---

## 3. Por que Multifranqueados Importam

### 3.1 Vantagens para a Rede

| Vantagem | Impacto |
|----------|---------|
| Crescimento acelerado | Expansão com menor custo de recrutamento |
| Operador experiente | Menor curva de aprendizado, menos suporte |
| Economia de escala | Compras consolidadas, logística otimizada |
| Cobertura territorial | Preenchimento mais rápido de mercados |
| Retenção | Multifranqueados têm menor taxa de saída |
| Benchmarking interno | Comparação entre unidades do mesmo operador |

### 3.2 Riscos para a Rede

| Risco | Mitigação |
|-------|-----------|
| Concentração excessiva | Limite de % da rede por operador (max 15%) |
| Poder de barganha | Manter diversidade de operadores |
| Despadronização | Auditorias regulares em todas as unidades |
| Conflito ampliado | Plano de contingência se multifranqueado sair |
| Canibalização | Planejamento territorial rigoroso |
| Operação diluída | Exigir estrutura operacional proporcional |

### 3.3 Benchmarks ABF — Multifranqueados

| Métrica | Média ABF | Meta Avend |
|---------|-----------|-----------|
| % da rede operada por multifranqueados | 30-40% | 25-35% |
| Unidades por multifranqueado (média) | 3-4 | 3-5 |
| Taxa de sucesso multi-unidade | 85% | > 90% |
| Tempo entre 1ª e 2ª unidade | 12-18 meses | 6-12 meses |

---

## 4. Critérios de Qualificação para Multi-Unidade

### 4.1 Pré-requisitos Obrigatórios

| Critério | Threshold | Verificação |
|----------|-----------|-------------|
| Tempo mínimo na rede | 6 meses operando | Data de contrato |
| Performance da unidade atual | Score >= 70/100 | Scorecard de performance |
| Royalties em dia | 100% nos últimos 6 meses | Financeiro |
| Conformidade operacional | >= 80% na última auditoria | Relatório de auditoria |
| Capital disponível | R$ 50.000 por unidade adicional | Comprovação financeira |
| Capacidade operacional | Plano de gestão multi-unidade | Apresentação ao comitê |
| NPS positivo | > 40 | Pesquisa de satisfação |

### 4.2 Critérios Desejáveis

| Critério | Peso | Descrição |
|----------|------|-----------|
| Crescimento de faturamento | ALTO | Unidade atual crescendo consistentemente |
| Interesse proativo | MÉDIO | Franqueado solicita expansão (não induzido) |
| Estrutura de gestão | ALTO | Já tem ou planeja contratar gestor operacional |
| Experiência multi-negócio | MÉDIO | Já geriu mais de 1 operação simultaneamente |
| Mercado disponível | ALTO | Território com demanda não atendida |
| Capacidade de investimento | ALTO | Capital folga além do mínimo |

### 4.3 Decision Tree de Qualificação

```
Franqueado solicita/é convidado para multi-unidade:
│
├── Tempo na rede >= 6 meses?
│   ├── NÃO → AGUARDAR (reavaliar em 3 meses)
│   └── SIM ↓
│
├── Score de performance >= 70?
│   ├── NÃO → DESENVOLVER (plano de melhoria + reavaliar em 3 meses)
│   └── SIM ↓
│
├── Royalties 100% em dia?
│   ├── NÃO → REGULARIZAR primeiro
│   └── SIM ↓
│
├── Capital suficiente comprovado?
│   ├── NÃO → PLANEJAR financiamento ou aguardar
│   └── SIM ↓
│
├── Plano de gestão multi-unidade apresentado?
│   ├── NÃO → ORIENTAR a preparar plano
│   └── SIM ↓
│
├── Território disponível?
│   ├── NÃO → FILA DE ESPERA ou outro território
│   └── SIM ↓
│
└── APROVADO — Prosseguir com expansão
```

### 4.4 Comitê de Aprovação Multi-Unidade

**Participantes:**
- Diretor de operações (decisor final)
- @franchise-growth (relator)
- @franchise-financial (parecer financeiro)
- @franchise-operations (parecer operacional)

**Pauta:**
1. Performance do franqueado
2. Plano de gestão multi-unidade
3. Viabilidade do território
4. Condições comerciais propostas
5. Riscos e mitigações
6. Decisão: APROVADO / CONDICIONAL / NEGADO

---

## 5. Estratégia de Alocação de Território

### 5.1 Princípios de Territorialidade

| Princípio | Descrição |
|-----------|-----------|
| Contiguidade | Territórios do mesmo operador devem ser próximos |
| Não-canibalização | Distância mínima entre máquinas do mesmo operador |
| Complementaridade | Diferentes tipos de ponto no cluster |
| Escalabilidade | Território deve permitir crescimento futuro |
| Sustentabilidade | Cada unidade deve ser viável isoladamente |

### 5.2 Modelo de Alocação

```
Unidade 1 (existente):
├── Raio de operação: [X] km
├── Tipos de ponto: [lista]
└── Faturamento mensal: R$ [valor]

Unidade 2 (proposta):
├── Distância da Unidade 1: >= [Y] km (evitar canibalização)
├── OU tipo de ponto complementar (ex: corporativo vs. educação)
├── TAM estimado: R$ [valor/mês]
└── Sinergia logística: [SIM/NÃO]

Unidade 3+ (futuras):
├── Priorizar preenchimento do cluster
├── Depois expandir para clusters adjacentes
└── Respeitar limite de concentração (max 15% da rede)
```

### 5.3 Mapa de Cluster

```
Cluster ideal (3-5 unidades):

     [U1] ──── 5-10km ──── [U2]
       \                    /
        \                  /
     5-10km            5-10km
          \              /
           \            /
            [U3]───[U4]
              \
            5-10km
                \
                [U5]

Logística: 1 rota de reposição atende todo o cluster
Manutenção: 1 técnico cobre todo o cluster
Gestão: 1 gestor supervisiona todo o cluster
```

### 5.4 Regras de Exclusividade Multi-Unidade

| Regra | Descrição |
|-------|-----------|
| Exclusividade por contrato | Cada unidade tem seu contrato e território |
| Direito de primeira recusa | Multifranqueado tem prioridade em territórios adjacentes |
| Prazo para exercer | 30 dias para manifestar interesse em novo território |
| Perda de prioridade | Se desempenho cair abaixo de 60/100 em qualquer unidade |
| Limite de concentração | Máximo 15% das unidades da rede |

---

## 6. Estruturas de Desconto e Condições Especiais

### 6.1 Tabela de Descontos por Volume

| Unidades | Taxa de Franquia | Royalty | Fundo Marketing |
|----------|-----------------|---------|-----------------|
| 1 (padrão) | R$ 15.000 (100%) | 5% | 2% |
| 2 | R$ 12.750 (85%) | 5% | 2% |
| 3 | R$ 11.250 (75%) | 4.5% | 2% |
| 4-5 | R$ 10.500 (70%) | 4.5% | 1.5% |
| 6-10 (master) | R$ 9.000 (60%) | 4% | 1.5% |
| 10+ | Negociação especial | Negociável | Negociável |

### 6.2 Condições de Pagamento

| Volume | Condição Padrão | Condição Multi |
|--------|----------------|----------------|
| Taxa de franquia | À vista ou 3x | Até 6x (2ª unidade+) |
| Equipamentos | À vista ou 12x | Até 18x com taxa preferencial |
| Capital de giro | Por conta do franqueado | Linha de crédito facilitada |

### 6.3 Benefícios Adicionais

| Benefício | A partir de | Descrição |
|-----------|-------------|-----------|
| Treinamento avançado | 2 unidades | Módulo de gestão multi-unidade |
| Suporte dedicado | 3 unidades | Consultor de campo exclusivo |
| Comitê consultivo | 5 unidades | Participação em decisões estratégicas |
| Co-marketing | 3 unidades | Verba adicional proporcional |
| Prioridade em lançamentos | 2 unidades | Testar novos produtos/equipamentos primeiro |
| Encontro de multifranqueados | 3 unidades | Networking exclusivo |

### 6.4 ROI Comparativo

```
Cenário: Franqueado com 1 vs. 3 vs. 5 unidades

1 UNIDADE:
├── Investimento total: R$ 50.000
├── Faturamento mensal: R$ 12.000
├── Custos fixos: R$ 3.500
├── Custos variáveis (COGS + royalty + marketing): R$ 5.400
├── Lucro líquido mensal: R$ 3.100
├── Break-even: ~16 meses
└── ROI anual: ~74%

3 UNIDADES (com descontos):
├── Investimento total: R$ 130.000 (vs. R$ 150.000 sem desconto)
├── Faturamento mensal: R$ 36.000
├── Custos fixos: R$ 8.500 (economia de escala)
├── Custos variáveis: R$ 15.300 (royalty menor)
├── Lucro líquido mensal: R$ 12.200
├── Break-even: ~11 meses
└── ROI anual: ~113%

5 UNIDADES (com descontos):
├── Investimento total: R$ 200.000 (vs. R$ 250.000 sem desconto)
├── Faturamento mensal: R$ 60.000
├── Custos fixos: R$ 12.000 (economia de escala)
├── Custos variáveis: R$ 24.600 (royalty menor)
├── Lucro líquido mensal: R$ 23.400
├── Break-even: ~9 meses
└── ROI anual: ~140%
```

---

## 7. Oversight Operacional Multi-Unidade

### 7.1 Estrutura de Gestão Exigida

| Unidades | Estrutura Mínima | Recomendação |
|----------|-----------------|--------------|
| 1-2 | Franqueado hands-on | Pode acumular funções |
| 3-4 | + 1 auxiliar operacional | Reposição + manutenção básica |
| 5-7 | + 1 gestor operacional | Franqueado vira gestor, não operador |
| 8-10 | + equipe completa | Gestor + 2 operacionais + técnico |
| 10+ | Estrutura gerencial | Gerente geral + supervisores |

### 7.2 Métricas de Acompanhamento Multi-Unidade

| Métrica | Frequência | Alerta Se |
|---------|-----------|-----------|
| Faturamento por unidade | Semanal | Variação > 20% entre unidades |
| Margem por unidade | Mensal | Qualquer unidade < 35% |
| Uptime de máquinas | Diário | Qualquer unidade < 85% |
| Taxa de reposição | Semanal | Atraso > 24h em qualquer unidade |
| NPS por unidade | Trimestral | Qualquer unidade < 20 |
| Score consolidado | Mensal | Score < 70 |
| Royalties | Mensal | Qualquer unidade atrasada |

### 7.3 Dashboard do Multifranqueado

```
DASHBOARD MULTI-UNIDADE — [NOME DO OPERADOR]

Unidades ativas: [N]
Score consolidado: [X]/100

| Unidade | Faturamento | Margem | Uptime | Score | Status |
|---------|------------|--------|--------|-------|--------|
| U001    | R$ 12.500  | 48%    | 95%    | 82    | OK     |
| U002    | R$ 10.800  | 44%    | 91%    | 75    | OK     |
| U003    | R$ 8.200   | 38%    | 82%    | 58    | ALERTA |

Consolidado: R$ 31.500 | 43% | 89% | 72 |

Tendência 3 meses: ↑ Faturamento (+8%) | → Margem | ↓ Uptime U003

Ações requeridas:
- [ ] U003: Investigar queda de uptime
- [ ] U003: Score abaixo de 60 — ativar plano de ação
```

### 7.4 Auditoria Multi-Unidade

| Tipo | Frequência | Escopo |
|------|-----------|--------|
| Financeira | Mensal | DRE consolidado + por unidade |
| Operacional | Trimestral | Visita a todas as unidades (rotativa) |
| De marca | Semestral | Conformidade visual e de padrão |
| Completa | Anual | Todas as dimensões + plano estratégico |

### 7.5 Regra de Performance Mínima

```
Qualquer unidade com Score < 50 por 2 meses consecutivos:
│
├── Ativar plano de ação (ver playbook franqueado-em-crise)
├── Notificar o multifranqueado formalmente
└── Bloquear abertura de novas unidades até regularização

Se 50%+ das unidades com Score < 60:
│
├── Reunião de emergência com o operador
├── Plano de reestruturação completo
├── Considerar redução do portfólio
└── Rever condições especiais
```

---

## 8. Programa de Desenvolvimento de Multifranqueados

### 8.1 Identificação de Candidatos (Proativo)

```
Monitoramento contínuo da rede:
│
├── Score >= 80 por 6+ meses?
│   └── Candidato potencial — iniciar conversa exploratória
│
├── Franqueado menciona interesse em crescer?
│   └── Avaliar prontidão — direcionar para critérios
│
├── Território adjacente disponível?
│   └── Verificar se franqueado mais próximo tem interesse/qualificação
│
└── Meta de multifranqueados não atingida?
    └── Campanha ativa de desenvolvimento
```

### 8.2 Programa de Mentoria

| Fase | Duração | Conteúdo |
|------|---------|----------|
| Preparação | 1 mês | Gestão multi-unidade, finanças, delegação |
| Transição | 2 meses | Acompanhamento da 2ª unidade com mentor |
| Consolidação | 3 meses | Otimização de cluster, eficiência |
| Autonomia | Contínuo | Check-in mensal, benchmark com peers |

### 8.3 Treinamento Específico Multi-Unidade

| Módulo | Horas | Conteúdo |
|--------|-------|----------|
| Gestão de múltiplos pontos | 4h | Rotinas, priorização, delegação |
| Financeiro consolidado | 4h | DRE multi-unidade, fluxo de caixa cluster |
| Gestão de pessoas | 3h | Contratação, treinamento, supervisão |
| Logística de cluster | 2h | Rotas, estoque centralizado, compras |
| Liderança operacional | 3h | Do operador ao gestor |
| **Total** | **16h** | |

---

## 9. Contratos e Aspectos Jurídicos

### 9.1 Modelo Contratual

| Opção | Quando Usar | Prós | Contras |
|-------|-------------|------|---------|
| Contrato individual por unidade | Padrão | Flexibilidade, proteção | Mais burocracia |
| Contrato master multi-unidade | 5+ unidades | Simplificação | Risco concentrado |
| Aditivo de expansão | 2ª unidade | Rápido | Vincula ao contrato original |

**Recomendação Avend:** Contrato individual por unidade (padrão) até 5 unidades. A partir de 6, avaliar contrato master com cláusulas de proteção.

### 9.2 Cláusulas Específicas para Multifranqueados

| Cláusula | Descrição |
|----------|-----------|
| Performance mínima por unidade | Cada unidade deve manter score mínimo individualmente |
| Cross-default | Inadimplência em 1 unidade pode afetar todas |
| Estrutura operacional | Obrigação de manter gestão proporcional ao volume |
| Limite de concentração | Máximo de unidades (absoluto e % da rede) |
| Direito de primeira recusa | Para territórios adjacentes |
| Recompra | Direito da franqueadora de recomprar em caso de saída |

### 9.3 Cuidados Jurídicos

- [ ] Cada unidade deve ter CNPJ próprio (ou ser filial do mesmo CNPJ)
- [ ] COF deve refletir condições especiais de multi-unidade
- [ ] Desconto em taxa de franquia deve estar formalizado
- [ ] Cláusula de cross-default deve ser clara e proporcional
- [ ] Regime tributário deve ser avaliado para o conjunto (Simples pode estourar)
- [ ] Garantias devem ser proporcionais ao volume

---

## 10. Riscos Específicos e Contingência

### 10.1 Cenário: Multifranqueado Quer Sair

```
Multifranqueado comunica intenção de saída:
│
├── Quer sair de TODAS as unidades?
│   ├── Negociar transferência do portfólio completo
│   ├── Buscar comprador único (ideal) ou fragmentar
│   └── Prazo de transição: 90-180 dias
│
├── Quer reduzir portfólio (fechar algumas)?
│   ├── Avaliar quais unidades são mais viáveis
│   ├── Buscar comprador para unidades a serem transferidas
│   └── Ajustar condições (perda de desconto multi-unidade)
│
└── Quer transferir para terceiro?
    ├── Avaliar comprador potencial
    ├── Direito de primeira recusa da franqueadora
    └── Processar transferência conforme contrato
```

### 10.2 Cenário: Performance Cai com Crescimento

```
Multifranqueado cresceu mas performance caiu:
│
├── Causa: falta de estrutura operacional
│   ├── Exigir contratação de gestor/auxiliar
│   ├── Oferecer treinamento de gestão
│   └── Bloquear novas unidades até estabilizar
│
├── Causa: diluição de atenção
│   ├── Revisar rotinas e prioridades
│   ├── Implementar dashboard de gestão
│   └── Definir KPIs semanais claros
│
├── Causa: mercado/externo
│   ├── Avaliar ponto por ponto
│   ├── Considerar relocação de unidades fracas
│   └── Ajustar projeções
│
└── Causa: financeira
    ├── Auditoria financeira completa
    ├── Reestruturar se viável
    └── Considerar redução de portfólio
```

### 10.3 Contingência: Multifranqueado Representa > 15% da Rede

```
Concentração detectada:
│
├── Bloquear aprovação de novas unidades
├── Acelerar recrutamento de novos franqueados
├── Plano de desconcentração (12-24 meses)
│   ├── Não renovar territórios de baixa performance
│   └── Direcionar novos territórios para outros operadores
└── Monitorar risco de dependência
```

---

## 11. Métricas do Playbook

| Métrica | Meta |
|---------|------|
| % da rede operada por multifranqueados | 25-35% |
| Taxa de sucesso de 2ª unidade | > 90% |
| Tempo médio entre 1ª e 2ª unidade | 6-12 meses |
| NPS de multifranqueados | > 50 |
| Concentração máxima por operador | < 15% |
| Score médio de multifranqueados vs. rede | >= 5 pontos acima |
| Multifranqueados no comitê consultivo | 100% (elegíveis) |

---

## 12. Referências

- ABF — Pesquisa de Multi-Unidade no Franchising Brasileiro
- IFA — Multi-Unit Franchisee Study (benchmark internacional)
- Lei 13.966/2019 — Art. 2º (territorialidade e exclusividade)
- Unit Economics Avend (ver `data/unit-economics-avend.yaml`)
- Fee Benchmarks (ver `data/franchise-fee-benchmarks.yaml`)

---

*Playbook mantido por @franchise-growth, @franchise-financial, @franchise-operations*
*Revisão obrigatória: semestral ou ao atingir 10 multifranqueados na rede*
