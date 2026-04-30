# Playbook: Franqueado em Crise

> **Squad:** squad-franchising-avend (Avend Franquias)
> **Tipo:** Intervenção e Recuperação
> **Agentes:** @franchise-field-ops, @franchise-financial, @franchise-relationship
> **Versão:** 1.0
> **Última atualização:** 2026-03-13

---

## 1. Objetivo

Protocolo estruturado de intervenção quando uma unidade franqueada apresenta sinais de baixo desempenho operacional, financeiro ou relacional. O objetivo é identificar cedo, intervir rápido e recuperar a unidade — ou, em último caso, conduzir a rescisão de forma legal e organizada.

---

## 2. Early Warning Signals (Sinais de Alerta)

### 2.1 Indicadores Financeiros

| Sinal | Métrica | Threshold de Alerta |
|-------|---------|---------------------|
| Queda de faturamento | Receita mensal vs. média 3 meses | Queda > 15% |
| Royalties atrasados | Dias de atraso | > 5 dias úteis |
| Margem comprimida | Margem bruta | < 35% (vs. benchmark 45-55%) |
| Capital de giro negativo | Saldo operacional | Negativo por 2+ meses |
| Ticket médio em queda | Receita / transações | Queda > 10% em 30 dias |

### 2.2 Indicadores Operacionais

| Sinal | Métrica | Threshold de Alerta |
|-------|---------|---------------------|
| Máquinas paradas | % do parque inativo | > 20% por 7+ dias |
| Taxa de reposição | Frequência de abastecimento | Atraso > 48h no ciclo |
| Ruptura de estoque | % itens indisponíveis | > 15% do mix |
| Manutenção pendente | Chamados abertos | > 3 sem resolução em 72h |
| Qualidade do produto | Reclamações / 100 vendas | > 5% |

### 2.3 Indicadores de Relacionamento

| Sinal | Métrica | Threshold de Alerta |
|-------|---------|---------------------|
| NPS do franqueado | Pesquisa trimestral | < 30 (detrator) |
| Participação em treinamentos | % presença | < 50% nos últimos 3 meses |
| Comunicação | Tempo de resposta | > 48h sem retorno |
| Engajamento na rede | Participação em eventos/calls | Ausência em 2+ consecutivos |
| Reclamações de ponto | Feedback do local hospedeiro | 2+ reclamações formais |

### 2.4 Sistema de Monitoramento

```
Frequência de Checagem:
├── Diário:  Faturamento, máquinas ativas, reposição
├── Semanal: Margem, estoque, manutenção pendente
├── Mensal:  Royalties, capital de giro, ticket médio
└── Trimestral: NPS, engajamento, revisão completa
```

**Trigger automático:** Quando 2+ sinais de alerta são detectados simultaneamente, o sistema escala para classificação de severidade.

---

## 3. Classificação de Severidade (4 Níveis)

### 3.1 Matriz de Severidade

| Nível | Cor | Critério | Tempo de Resposta |
|-------|-----|----------|-------------------|
| 1 | AMARELO | 1-2 indicadores em alerta leve | 7 dias úteis |
| 2 | LARANJA | 3+ indicadores OU 1 indicador grave | 3 dias úteis |
| 3 | VERMELHO | Múltiplos graves OU financeiro crítico | 24 horas |
| 4 | CRÍTICO | Risco de encerramento iminente | Imediato |

### 3.2 Nível 1 — AMARELO (Atenção)

**Critérios de entrada:**
- Queda de faturamento entre 10-20% (1 mês)
- 1 atraso de royalty (< 15 dias)
- NPS entre 20-30
- 1-2 máquinas paradas por mais de 5 dias

**Ações:**
- [ ] @franchise-field-ops: Contato telefônico com franqueado
- [ ] @franchise-financial: Análise rápida de DRE da unidade
- [ ] Identificar causa raiz provável
- [ ] Agendar visita técnica se necessário
- [ ] Documentar no CRM do franqueado

**Responsável principal:** @franchise-relationship

### 3.3 Nível 2 — LARANJA (Intervenção Preventiva)

**Critérios de entrada:**
- Queda de faturamento > 20% (1 mês) ou > 10% (3 meses consecutivos)
- Royalties atrasados 15-30 dias
- NPS < 20
- > 30% do parque inativo
- Ruptura de estoque recorrente

**Ações:**
- [ ] @franchise-field-ops: Visita presencial em até 5 dias úteis
- [ ] @franchise-financial: Diagnóstico financeiro completo
- [ ] Elaborar Plano de Ação 30 dias
- [ ] Reunião presencial com franqueado (escuta ativa)
- [ ] Ativar suporte intensivo (check-ins semanais)
- [ ] Notificação formal interna (registro)

**Responsável principal:** @franchise-field-ops

### 3.4 Nível 3 — VERMELHO (Intervenção Crítica)

**Critérios de entrada:**
- Queda de faturamento > 40%
- Royalties atrasados > 30 dias
- Capital de giro negativo por 2+ meses
- NPS < 0 (detrator extremo)
- Múltiplas reclamações do ponto hospedeiro
- Franqueado não responde comunicações por 7+ dias

**Ações:**
- [ ] @franchise-relationship: Contato de emergência (telefone + mensagem)
- [ ] @franchise-field-ops: Visita presencial em 48h
- [ ] @franchise-financial: Auditoria financeira da unidade
- [ ] Plano de Recuperação 60 dias com metas semanais
- [ ] Notificação extrajudicial formal ao franqueado
- [ ] Revisão de contrato e cláusulas de performance
- [ ] Escalação para diretoria de operações

**Responsável principal:** @franchise-financial + @franchise-field-ops

### 3.5 Nível 4 — CRÍTICO (Risco de Encerramento)

**Critérios de entrada:**
- Unidade sem faturamento por 15+ dias
- Royalties atrasados > 60 dias
- Franqueado incontactável por 15+ dias
- Denúncia formal de ponto hospedeiro
- Violação contratual grave (submarca, produto não autorizado)
- Risco de dano à marca Avend

**Ações:**
- [ ] @franchise-relationship: Última tentativa de contato (3 canais)
- [ ] @franchise-legal (via @franchise-relationship): Notificação formal com prazo de 10 dias
- [ ] @franchise-field-ops: Visita presencial imediata
- [ ] Contingência: plano de remoção de equipamentos
- [ ] Avaliação jurídica para rescisão contratual
- [ ] Proteção de marca (redes sociais, ponto)
- [ ] Documentação completa para eventual litígio

**Responsável principal:** @franchise-relationship + jurídico

---

## 4. Protocolo de Intervenção por Nível

### 4.1 Fluxo Geral de Intervenção

```
Detecção de Alerta
│
├─→ Classificação de Severidade (1-4)
│
├─→ Nível 1 (AMARELO)
│   ├── Contato telefônico
│   ├── Análise rápida
│   └── Monitoramento semanal por 30 dias
│       ├── Melhora → Volta ao monitoramento normal
│       └── Piora → Escala para LARANJA
│
├─→ Nível 2 (LARANJA)
│   ├── Visita presencial
│   ├── Plano de Ação 30 dias
│   └── Check-in semanal
│       ├── Melhora → Rebaixa para AMARELO
│       ├── Estável → Estende plano (+30 dias)
│       └── Piora → Escala para VERMELHO
│
├─→ Nível 3 (VERMELHO)
│   ├── Intervenção de emergência
│   ├── Plano de Recuperação 60 dias
│   ├── Notificação extrajudicial
│   └── Revisão semanal com metas
│       ├── Melhora → Rebaixa para LARANJA
│       ├── Estável → Última extensão (+30 dias)
│       └── Piora → Escala para CRÍTICO
│
└─→ Nível 4 (CRÍTICO)
    ├── Última tentativa de contato
    ├── Notificação com prazo legal
    └── Decisão em 10 dias
        ├── Resposta + compromisso → Plano Último Recurso (30 dias)
        └── Sem resposta / sem melhora → Rescisão contratual
```

### 4.2 Diagnóstico de Causa Raiz

**Categorias de causa raiz para vending machines:**

| Categoria | Exemplos | Frequência Típica |
|-----------|----------|-------------------|
| Ponto/Localização | Tráfego reduziu, mudança de perfil, sazonalidade | 30% |
| Operacional | Reposição irregular, manutenção falha, mix errado | 25% |
| Financeiro | Subcapitalização, desvio de caixa, dívidas pessoais | 20% |
| Mercado | Novo concorrente, mudança de hábito, crise econômica local | 15% |
| Pessoal | Problemas de saúde, desmotivação, negócio paralelo | 10% |

**Decision tree para diagnóstico:**

```
Faturamento caiu?
├── SIM → Verificar quantidade de transações
│   ├── Transações caíram → Problema de TRÁFEGO/PONTO
│   │   ├── Ponto mudou perfil? → Avaliar relocação
│   │   ├── Sazonalidade? → Ajustar mix/projeção
│   │   └── Concorrência? → Estratégia competitiva
│   └── Transações estáveis, ticket caiu → Problema de MIX
│       ├── Mix desatualizado? → Revisar sortimento
│       └── Preços defasados? → Revisar pricing
├── NÃO, mas margem caiu → Problema de CUSTOS
│   ├── COGS subiu? → Renegociar fornecedores
│   ├── Desperdício/vencimento? → Melhorar gestão estoque
│   └── Manutenção excessiva? → Avaliar troca equipamento
└── NÃO, mas royalties atrasados → Problema FINANCEIRO PESSOAL
    ├── Fluxo de caixa? → Reestruturar pagamentos
    └── Desvio? → Intervenção séria
```

---

## 5. Planos de Recuperação (30/60/90 dias)

### 5.1 Plano 30 Dias (Nível AMARELO/LARANJA)

**Semana 1: Diagnóstico**
- [ ] Visita técnica + auditoria operacional
- [ ] Levantamento financeiro (DRE últimos 3 meses)
- [ ] Entrevista com franqueado (necessidades, desafios)
- [ ] Checklist de conformidade operacional
- [ ] Relatório de diagnóstico

**Semana 2: Plano de Ação**
- [ ] Definir 3-5 ações prioritárias
- [ ] Estabelecer KPIs semanais
- [ ] Alocar recursos de suporte (treinamento, marketing local)
- [ ] Acordo formal com franqueado (assinado)

**Semana 3: Execução**
- [ ] Implementar ações prioritárias
- [ ] Check-in midweek (quarta-feira)
- [ ] Ajustar mix de produtos se necessário
- [ ] Ativar campanha local se aplicável

**Semana 4: Avaliação**
- [ ] Medir KPIs vs. metas
- [ ] Reunião de avaliação com franqueado
- [ ] Decisão: encerrar monitoramento / estender / escalar

**Critérios de sucesso (30 dias):**
- Faturamento recuperou 50%+ da queda
- Royalties em dia
- Máquinas 90%+ ativas
- Franqueado engajado no plano

### 5.2 Plano 60 Dias (Nível LARANJA/VERMELHO)

**Mês 1: Diagnóstico Profundo + Primeiras Ações**
- Todo o plano de 30 dias acima
- MAIS:
- [ ] Auditoria de todos os pontos/máquinas
- [ ] Renegociação com pontos hospedeiros se necessário
- [ ] Avaliação de relocação de máquinas
- [ ] Suporte financeiro: renegociação de prazos

**Mês 2: Estabilização**
- [ ] Monitoramento bisemanal presencial
- [ ] Ajuste fino de operação
- [ ] Treinamento intensivo se gap operacional identificado
- [ ] Avaliação de investimento adicional necessário
- [ ] Relatório de progresso quinzenal

**Critérios de sucesso (60 dias):**
- Faturamento a 80%+ do benchmark
- Margem bruta > 40%
- Zero atraso de royalties
- NPS > 20
- Plano operacional autossustentável

### 5.3 Plano 90 Dias (Nível VERMELHO/CRÍTICO)

**Mês 1:** Igual ao Plano 60 dias — Mês 1
**Mês 2:** Igual ao Plano 60 dias — Mês 2

**Mês 3: Decisão Final**
- [ ] Avaliação completa de viabilidade da unidade
- [ ] Relatório financeiro com projeção 12 meses
- [ ] Reunião de decisão com franqueado
- [ ] Decisão tripartite:

```
Resultado do Mês 3:
├── RECUPERADO (KPIs > 80% benchmark)
│   └── Volta ao monitoramento normal
│       └── Check-in mensal por 6 meses
│
├── EM RECUPERAÇÃO (KPIs 50-80% benchmark)
│   └── Extensão excepcional (+30 dias)
│       └── Máximo 1 extensão
│
└── NÃO RECUPERADO (KPIs < 50% benchmark)
    └── Iniciar processo de rescisão
        └── Ver seção 6
```

---

## 6. Escalação para Rescisão Contratual

### 6.1 Pré-requisitos para Rescisão

Antes de iniciar rescisão, verificar que TODOS os itens abaixo estão documentados:

- [ ] Histórico completo de alertas e classificações
- [ ] Registro de todas as intervenções realizadas
- [ ] Planos de recuperação com resultados documentados
- [ ] Notificações formais enviadas (com AR ou protocolo)
- [ ] Prazo de cura concedido (mínimo conforme contrato)
- [ ] Evidência de descumprimento contratual específico
- [ ] Parecer jurídico favorável à rescisão

### 6.2 Tipos de Rescisão

| Tipo | Quando | Prazo | Consequências |
|------|--------|-------|---------------|
| Consensual | Franqueado concorda | 30-60 dias | Menos litigioso, negociação de valores |
| Por justa causa (franqueador) | Descumprimento contratual grave | Conforme contrato | Multa contratual, retenção de garantias |
| Sem justa causa (franqueador) | Interesse do franqueador | Aviso prévio contratual | Possível indenização ao franqueado |
| Por justa causa (franqueado) | Franqueador descumpriu | Conforme contrato | Franqueador pode ser responsabilizado |

### 6.3 Processo de Rescisão

```
Decisão de Rescindir
│
├── Fase 1: Notificação (Dias 1-10)
│   ├── Notificação formal via cartório (AR)
│   ├── Descrição detalhada dos motivos
│   ├── Referência às cláusulas contratuais
│   └── Prazo para manifestação do franqueado
│
├── Fase 2: Negociação (Dias 11-30)
│   ├── Tentativa de acordo consensual
│   ├── Definir: devolução de equipamentos
│   ├── Definir: saldos pendentes
│   ├── Definir: cláusula de não-competição
│   └── Definir: transição de pontos
│
├── Fase 3: Execução (Dias 31-60)
│   ├── Assinatura do distrato
│   ├── Remoção de equipamentos e identidade visual
│   ├── Desativação de sistemas e acessos
│   ├── Comunicação aos pontos hospedeiros
│   └── Acerto financeiro final
│
└── Fase 4: Pós-Rescisão (Dias 61-90)
    ├── Monitorar cláusula de não-competição
    ├── Avaliar reocupação dos pontos
    ├── Documentar lessons learned
    └── Atualizar base de dados da rede
```

### 6.4 Proteção de Marca Durante Rescisão

- [ ] Remover toda identidade visual Avend dos equipamentos
- [ ] Desativar perfis/páginas locais vinculados à marca
- [ ] Notificar pontos hospedeiros sobre mudança
- [ ] Monitorar uso indevido da marca pós-rescisão
- [ ] Acionar jurídico se uso indevido detectado

### 6.5 Lei 13.966/2019 — Pontos de Atenção

- **Art. 2º:** COF deve ter sido entregue com 10+ dias de antecedência da assinatura
- **Art. 2º, XIII:** Condições de rescisão devem estar claras na COF
- **Boa-fé contratual:** Toda intervenção deve ser documentada para demonstrar tentativa de recuperação
- **Multas:** Respeitar limites contratuais e legais de multa rescisória
- **Foro:** Respeitar cláusula de foro do contrato de franquia

---

## 7. Templates de Comunicação

### 7.1 Notificação Nível AMARELO (Informal)

```
Assunto: Acompanhamento de Performance — Unidade [CÓDIGO]

Olá [NOME],

Identificamos que sua unidade apresentou [INDICADOR] nos últimos [PERÍODO].
Gostaríamos de agendar uma conversa para entender o cenário e oferecer suporte.

Podemos conversar em [DATA/HORA]?

Estamos aqui para ajudar.

Atenciosamente,
[CONSULTOR DE CAMPO]
Avend Franquias
```

### 7.2 Notificação Nível LARANJA (Formal Interno)

```
REGISTRO INTERNO — INTERVENÇÃO PREVENTIVA

Unidade: [CÓDIGO]
Franqueado: [NOME]
Data: [DATA]
Classificação: LARANJA

Indicadores em alerta:
1. [INDICADOR 1]: [VALOR] (threshold: [THRESHOLD])
2. [INDICADOR 2]: [VALOR] (threshold: [THRESHOLD])

Ações planejadas:
1. [AÇÃO 1] — Responsável: [NOME] — Prazo: [DATA]
2. [AÇÃO 2] — Responsável: [NOME] — Prazo: [DATA]

Próxima revisão: [DATA]
```

### 7.3 Notificação Nível VERMELHO (Extrajudicial)

```
NOTIFICAÇÃO EXTRAJUDICIAL

Ao(À) Sr(a). [NOME COMPLETO]
[ENDEREÇO COMPLETO]

Ref.: Contrato de Franquia nº [NÚMERO] — Unidade [CÓDIGO]

Prezado(a) Franqueado(a),

Pela presente, notificamos V.Sa. sobre o descumprimento das seguintes
obrigações contratuais:

1. [OBRIGAÇÃO 1] — Cláusula [X] do Contrato
2. [OBRIGAÇÃO 2] — Cláusula [Y] do Contrato

Concedemos o prazo de [X] dias corridos para regularização.

O não atendimento poderá ensejar a rescisão contratual por justa causa,
nos termos da Cláusula [Z] do Contrato de Franquia.

[LOCAL], [DATA]

______________________________
[NOME]
[CARGO]
Avend Franquias Ltda.
CNPJ: [CNPJ]
```

---

## 8. Métricas de Sucesso do Playbook

| Métrica | Meta |
|---------|------|
| Taxa de detecção precoce (Nível 1-2) | > 80% dos casos |
| Taxa de recuperação (Nível 1-2) | > 70% |
| Taxa de recuperação (Nível 3) | > 40% |
| Tempo médio de intervenção | < 5 dias úteis |
| Taxa de rescisão sobre intervenções | < 15% |
| Satisfação pós-recuperação (NPS) | > 40 |

---

## 9. Checklist de Documentação por Caso

Para cada franqueado em crise, manter dossiê atualizado:

- [ ] Ficha do franqueado atualizada
- [ ] Histórico de indicadores (planilha/dashboard)
- [ ] Registro de todos os contatos (data, canal, resumo)
- [ ] Cópia das notificações enviadas (com comprovante)
- [ ] Plano de recuperação assinado pelo franqueado
- [ ] Relatórios de visita técnica
- [ ] Evidências fotográficas (se aplicável)
- [ ] Atas de reunião
- [ ] Parecer financeiro
- [ ] Parecer jurídico (se Nível 3+)

---

## 10. Referências

- Lei 13.966/2019 (Lei de Franquias)
- Código Civil — Boa-fé contratual (Art. 422)
- ABF — Manual de Boas Práticas para Gestão de Rede
- Contrato de Franquia Avend (template vigente)
- COF Avend (versão vigente)

---

*Playbook mantido por @franchise-field-ops, @franchise-financial, @franchise-relationship*
*Revisão obrigatória: semestral ou após cada caso Nível 4*
