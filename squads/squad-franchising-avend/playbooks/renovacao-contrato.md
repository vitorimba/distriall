# Playbook: Renovação de Contrato e Retenção

> **Squad:** squad-franchising-avend (Avend Franquias)
> **Tipo:** Retenção e Gestão Contratual
> **Agentes:** @franchise-legal, @franchise-relationship
> **Versão:** 1.0
> **Última atualização:** 2026-03-13

---

## 1. Objetivo

Protocolo para gestão do ciclo de renovação contratual de franqueados Avend, desde o planejamento 12 meses antes do vencimento até a assinatura do novo contrato ou condução do não-renovação de forma profissional e legal.

---

## 2. Timeline Completa — 12 Meses Pré-Renovação

```
Mês -12: Identificação e planejamento
│
├── Mês -10: Análise de performance histórica
│
├── Mês -8: Pesquisa de satisfação do franqueado
│
├── Mês -6: Decisão interna (renovar/renegociar/não-renovar)
│
├── Mês -5: Comunicação formal ao franqueado
│
├── Mês -4: Início das negociações (se renegociação)
│
├── Mês -3: Elaboração de nova COF e contrato
│
├── Mês -2: Entrega de COF (prazo legal 10 dias)
│
├── Mês -1: Assinatura do novo contrato
│
└── Mês 0: Início do novo período contratual
```

---

## 3. Fase 1 — Identificação e Planejamento (Mês -12)

### 3.1 Dashboard de Vencimentos

Manter dashboard atualizado com:

| Campo | Descrição |
|-------|-----------|
| ID do franqueado | Identificador único |
| Nome/Razão Social | Dados cadastrais |
| Data de assinatura original | Início do contrato |
| Data de vencimento | Fim do contrato vigente |
| Prazo contratual | Duração (tipicamente 5 anos) |
| Renovação automática? | Sim/Não (conforme contrato) |
| Status | Planejado / Em análise / Em negociação / Renovado / Não-renovado |

### 3.2 Gatilho de Início

```
Trigger: Data atual = Data de vencimento - 12 meses
│
├── @franchise-relationship: Notificação interna
├── @franchise-legal: Revisão do contrato vigente
└── @franchise-financial: Solicitação de relatório de performance
```

### 3.3 Checklist Mês -12

- [ ] Identificar todos os contratos vencendo nos próximos 12 meses
- [ ] Criar dossiê individual de cada franqueado
- [ ] Verificar cláusula de renovação no contrato original
- [ ] Verificar se há renovação automática ou necessidade de novo contrato
- [ ] Definir responsável pelo processo de cada franqueado
- [ ] Agendar marcos no calendário

---

## 4. Fase 2 — Análise de Performance (Mês -10)

### 4.1 Critérios de Avaliação do Franqueado

| Categoria | Peso | Indicadores |
|-----------|------|------------|
| Performance Financeira | 30% | Faturamento vs. meta, crescimento, margem |
| Operacional | 25% | Uptime máquinas, taxa reposição, manutenção |
| Conformidade | 20% | Royalties em dia, padrão de marca, regulatório |
| Relacionamento | 15% | NPS, participação, comunicação |
| Potencial | 10% | Capacidade de expansão, engajamento |

### 4.2 Scorecard de Renovação

```
Score de Renovação (0-100):

├── 80-100: TOP PERFORMER
│   ├── Renovação prioritária
│   ├── Condições preferenciais
│   └── Incentivo para multi-unidade
│
├── 60-79: BOM
│   ├── Renovação padrão
│   ├── Manter condições
│   └── Plano de desenvolvimento
│
├── 40-59: REGULAR
│   ├── Renovação condicional
│   ├── Renegociação necessária
│   └── Plano de melhoria obrigatório
│
├── 20-39: INSATISFATÓRIO
│   ├── Renovação sob análise
│   ├── Exigir plano de recuperação
│   └── Considerar não-renovação
│
└── 0-19: CRÍTICO
    ├── Não-renovação recomendada
    ├── Avaliar rescisão antecipada
    └── Ativar playbook franqueado-em-crise
```

### 4.3 Relatório de Performance — Template

```
RELATÓRIO DE PERFORMANCE PARA RENOVAÇÃO

Franqueado: [NOME]
Unidade(s): [CÓDIGO(S)]
Período avaliado: [DATA INÍCIO] a [DATA FIM]

1. FINANCEIRO (Score: _/30)
   - Faturamento médio mensal: R$ ___
   - Crescimento anual: ___%
   - Margem bruta média: ___%
   - Royalties em dia: __ de __ meses
   - Inadimplência total: R$ ___

2. OPERACIONAL (Score: _/25)
   - Uptime médio máquinas: ___%
   - Taxa de reposição no prazo: ___%
   - Chamados de manutenção: __ / mês
   - Qualidade de produto: __ reclamações
   - Conformidade operacional: ___%

3. CONFORMIDADE (Score: _/20)
   - Uso de marca: Conforme / Não conforme
   - Padrão visual: Conforme / Não conforme
   - Regulatório: Em dia / Pendências
   - Treinamentos: __ de __ participados
   - Auditorias: __ de __ aprovadas

4. RELACIONAMENTO (Score: _/15)
   - NPS do franqueado: __
   - Participação em eventos: __ de __
   - Tempo de resposta médio: __ horas
   - Contribuição à rede: Alta / Média / Baixa
   - Conflitos registrados: __

5. POTENCIAL (Score: _/10)
   - Interesse em multi-unidade: Sim / Não
   - Capacidade financeira para crescer: Sim / Não
   - Mercado local: Saturado / Em crescimento
   - Fit com direção estratégica: Alto / Médio / Baixo

SCORE TOTAL: __/100
RECOMENDAÇÃO: [TOP PERFORMER / BOM / REGULAR / INSATISFATÓRIO / CRÍTICO]
```

### 4.4 Checklist Mês -10

- [ ] Gerar relatório de performance completo
- [ ] Calcular scorecard de renovação
- [ ] Comparar com benchmarks da rede
- [ ] Identificar pontos de melhoria
- [ ] Documentar histórico de ocorrências
- [ ] Preparar parecer preliminar

---

## 5. Fase 3 — Pesquisa de Satisfação (Mês -8)

### 5.1 Pesquisa com o Franqueado

**Dimensões avaliadas:**

| Dimensão | Perguntas-chave |
|----------|----------------|
| Suporte operacional | Qualidade do suporte? Tempo de resposta? |
| Retorno financeiro | Expectativa vs. realidade? ROI satisfatório? |
| Marca e marketing | Força da marca? Materiais adequados? |
| Tecnologia | Sistemas funcionam bem? Inovação? |
| Relacionamento | Se sente ouvido? Confiança na franqueadora? |
| Futuro | Pretende renovar? Interesse em expandir? |

### 5.2 Pesquisa com Ponto Hospedeiro

| Dimensão | Perguntas-chave |
|----------|----------------|
| Satisfação geral | Satisfeito com o serviço? |
| Manutenção | Equipamentos bem mantidos? |
| Abastecimento | Máquinas abastecidas regularmente? |
| Problemas | Houve problemas? Foram resolvidos? |
| Renovação | Deseja manter o equipamento? |

### 5.3 Checklist Mês -8

- [ ] Aplicar pesquisa de satisfação ao franqueado
- [ ] Aplicar pesquisa aos pontos hospedeiros
- [ ] Consolidar resultados
- [ ] Identificar gaps e oportunidades
- [ ] Incluir feedback no dossiê de renovação

---

## 6. Fase 4 — Decisão Interna (Mês -6)

### 6.1 Comitê de Renovação

**Participantes:**
- Diretor de operações
- @franchise-relationship (relator)
- @franchise-financial (parecer financeiro)
- @franchise-legal (parecer jurídico)

**Pauta:**
1. Apresentação do scorecard
2. Feedback do franqueado
3. Análise de mercado local
4. Recomendação da equipe
5. Decisão

### 6.2 Decision Tree de Renovação

```
Score >= 80 (TOP PERFORMER)?
├── SIM → RENOVAR com benefícios
│   ├── Desconto em taxa de renovação
│   ├── Prioridade em novos territórios
│   ├── Condições especiais multi-unidade
│   └── Prazo estendido (se desejado)
│
├── Score 60-79 (BOM)?
│   └── RENOVAR padrão
│       ├── Manter condições atuais
│       ├── Propor plano de desenvolvimento
│       └── Meta de evolução para próximo ciclo
│
├── Score 40-59 (REGULAR)?
│   └── RENEGOCIAR
│       ├── Condições mais estritas
│       ├── Plano de melhoria obrigatório
│       ├── Prazo menor (2-3 anos vs. 5)
│       └── Revisão anual de performance
│
├── Score 20-39 (INSATISFATÓRIO)?
│   └── AVALIAR CASO A CASO
│       ├── Causas são reversíveis?
│       │   ├── SIM → Última chance (prazo curto + metas)
│       │   └── NÃO → NÃO-RENOVAR
│       └── Existe candidato melhor para o território?
│           ├── SIM → NÃO-RENOVAR
│           └── NÃO → Renovação condicional curta
│
└── Score < 20 (CRÍTICO)?
    └── NÃO-RENOVAR
        ├── Preparar transição
        ├── Proteger pontos e marca
        └── Recrutar substituto
```

### 6.3 Checklist Mês -6

- [ ] Realizar comitê de renovação
- [ ] Registrar decisão e justificativa
- [ ] Definir condições propostas (se renovação)
- [ ] Definir timeline de comunicação
- [ ] Preparar argumentação para negociação
- [ ] Aprovar orçamento de incentivos (se aplicável)

---

## 7. Fase 5 — Comunicação ao Franqueado (Mês -5)

### 7.1 Cenário: Renovação Padrão ou com Benefícios

```
Comunicação: Reunião presencial ou videoconferência

Agenda:
1. Agradecimento pela parceria
2. Apresentação da análise de performance (positiva)
3. Proposta de renovação
4. Condições do novo contrato
5. Benefícios (se TOP PERFORMER)
6. Timeline para assinatura
7. Próximos passos
```

### 7.2 Cenário: Renegociação

```
Comunicação: Reunião presencial obrigatória

Agenda:
1. Contextualização
2. Apresentação da análise de performance (áreas de melhoria)
3. Proposta de renovação condicional
4. Condições ajustadas
5. Plano de melhoria obrigatório
6. Prazos e metas
7. Próximos passos
```

### 7.3 Cenário: Não-Renovação

```
Comunicação: Reunião presencial obrigatória + carta formal

Agenda:
1. Contextualização respeitosa
2. Motivação da decisão (fatos, não julgamentos)
3. Referência às tentativas de recuperação anteriores
4. Timeline de encerramento
5. Direitos e obrigações de ambas as partes
6. Suporte na transição
7. Entrega de carta formal
```

### 7.4 Prazo Legal de Comunicação

**Lei 13.966/2019 — Atenção:**

A lei não define prazo mínimo específico para aviso de não-renovação, mas:
- O contrato de franquia DEVE prever as condições de renovação
- A boa-fé contratual exige aviso com antecedência razoável
- **Recomendação:** mínimo 180 dias (6 meses) antes do vencimento
- Verificar SEMPRE o que o contrato específico prevê

### 7.5 Checklist Mês -5

- [ ] Agendar reunião com franqueado
- [ ] Preparar apresentação de performance
- [ ] Preparar proposta formal (renovação ou não)
- [ ] Ter carta formal preparada (se não-renovação)
- [ ] Alinhar posição internamente antes da reunião
- [ ] Documentar resultado da reunião

---

## 8. Frameworks de Renegociação

### 8.1 Ajuste de Royalties

| Cenário | Ajuste Possível | Condição |
|---------|----------------|----------|
| Top performer expandindo | Redução de 0.5-1% | Multi-unidade (3+) |
| Mercado em crise (comprovada) | Redução temporária (6 meses) | Plano de recuperação |
| Franqueado regular | Manter padrão | N/A |
| Franqueado com histórico de atraso | Manter ou aumentar + garantia | Plano de regularização |

### 8.2 Ajuste de Território

| Cenário | Ajuste | Justificativa |
|---------|--------|---------------|
| Território subutilizado | Reduzir exclusividade | Abrir para novo franqueado |
| Território saturado | Expandir ou compensar | Limitar canibalização |
| Top performer | Direito de primeira recusa em novas áreas | Incentivo à expansão |
| Franqueado regular | Manter | Sem alteração |

### 8.3 Ajuste de Exclusividade

```
Exclusividade atual:
├── Territorial (raio ou CEPs)
│   ├── Manter → Performance OK
│   ├── Reduzir → Subutilização comprovada
│   └── Expandir → Top performer + demanda
│
├── De produto (mix exclusivo)
│   ├── Manter → Padrão
│   └── Flexibilizar → Se não impacta marca
│
└── De canal (apenas vending)
    ├── Manter → Padrão
    └── Expandir → Permitir micro-market (evolução)
```

### 8.4 Prazo Contratual

| Perfil | Prazo Recomendado | Justificativa |
|--------|-------------------|---------------|
| Top performer | 5 anos | Confiança e estabilidade |
| Bom | 5 anos | Padrão da rede |
| Regular | 3 anos | Revisão mais frequente |
| Condicional | 2 anos | Prazo curto para avaliação |

---

## 9. Incentivos de Retenção para Top Performers

### 9.1 Pacote de Incentivos

| Incentivo | Critério | Valor Estimado |
|-----------|----------|----------------|
| Desconto na taxa de renovação | Score >= 80 | 20-50% de desconto |
| Prioridade em novos territórios | Score >= 80 + interesse | Direito de primeira recusa |
| Upgrade de equipamento | Score >= 70 + 3+ anos | Equipamento novo com condição especial |
| Treinamento avançado | Score >= 70 | Acesso a programa premium |
| Participação em comitê consultivo | Score >= 90 | Voz ativa na estratégia |
| Co-marketing local | Score >= 60 | Verba de marketing adicional |
| Redução de royalty temporária | Multi-unidade + expansão | 0.5-1% por 6 meses |

### 9.2 ROI dos Incentivos

```
Custo de reter franqueado bom:
├── Desconto taxa renovação: R$ 5.000-15.000
├── Upgrade equipamento: R$ 10.000-20.000
└── Total: R$ 15.000-35.000

Custo de perder e substituir:
├── Recrutamento novo franqueado: R$ 10.000-30.000
├── Tempo sem operação no território: R$ 20.000-50.000 (receita perdida)
├── Treinamento completo: R$ 5.000-10.000
├── Risco de insucesso do novo: 20-30%
└── Total: R$ 35.000-90.000+

Conclusão: SEMPRE mais barato reter um franqueado bom
```

---

## 10. Processo de Não-Renovação

### 10.1 Motivos Legítimos para Não-Renovação

| Motivo | Documentação Necessária |
|--------|------------------------|
| Performance consistentemente abaixo do mínimo | Relatórios, planos de ação, resultados |
| Violações contratuais recorrentes | Notificações formais, evidências |
| Inadimplência crônica | Histórico financeiro |
| Dano à marca | Registros, reclamações, fotos |
| Inviabilidade do território | Estudo de mercado atualizado |
| Mudança estratégica da rede | Justificativa empresarial |

### 10.2 Processo de Não-Renovação

```
Decisão de Não-Renovar (Mês -6)
│
├── Mês -5: Comunicação formal ao franqueado
│   ├── Reunião presencial
│   ├── Carta formal com justificativa
│   └── Prazo para manifestação (15 dias)
│
├── Mês -5 a -4: Período de manifestação
│   ├── Franqueado aceita → Plano de transição
│   ├── Franqueado contesta → Mediação
│   └── Franqueado ignora → Seguir processo
│
├── Mês -4 a -2: Transição
│   ├── Plano de retirada de equipamentos
│   ├── Comunicação a pontos hospedeiros
│   ├── Recrutamento de substituto (se aplicável)
│   ├── Transferência de pontos
│   └── Acertos financeiros
│
├── Mês -1: Encerramento
│   ├── Remoção de identidade visual
│   ├── Desativação de sistemas
│   ├── Devolução de materiais
│   └── Assinatura de distrato
│
└── Mês 0: Pós-encerramento
    ├── Monitorar cláusula de não-competição
    ├── Ativar novo franqueado no território
    └── Documentar lessons learned
```

### 10.3 Cuidados Jurídicos

- [ ] Verificar se contrato prevê renovação automática
- [ ] Se prevê renovação automática: manifestar intenção de não-renovar ANTES do prazo
- [ ] Documentar TODOS os motivos com evidências
- [ ] Garantir que todos os deveres do franqueador foram cumpridos
- [ ] Consultar advogado antes de enviar notificação
- [ ] Manter tom profissional e respeitoso em todas as comunicações
- [ ] Oferecer alternativas razoáveis (quando possível)

---

## 11. Métricas do Playbook

| Métrica | Meta |
|---------|------|
| Taxa de renovação geral | > 85% |
| Taxa de renovação top performers | > 95% |
| Início do processo no prazo (12 meses) | 100% |
| Satisfação pós-renovação | NPS > 50 |
| Litígios decorrentes de não-renovação | < 5% |
| Tempo médio do processo | < 6 meses |

---

## 12. Templates de Comunicação

### 12.1 Carta de Intenção de Renovação

```
[PAPEL TIMBRADO AVEND]

[LOCAL], [DATA]

À [RAZÃO SOCIAL DO FRANQUEADO]
A/C Sr(a). [NOME]

Ref.: Renovação do Contrato de Franquia nº [NÚMERO]

Prezado(a) Franqueado(a),

Temos a satisfação de comunicar nosso interesse em renovar o Contrato
de Franquia firmado em [DATA], com vencimento previsto para [DATA].

Nos últimos [X] anos, sua unidade demonstrou [DESTAQUE POSITIVO],
e acreditamos no potencial de continuidade desta parceria.

Gostaríamos de agendar uma reunião para discutir as condições de
renovação. Seguem as datas sugeridas: [DATAS].

Atenciosamente,

______________________________
[NOME]
[CARGO]
Avend Franquias Ltda.
```

### 12.2 Carta de Não-Renovação

```
[PAPEL TIMBRADO AVEND]

[LOCAL], [DATA]

À [RAZÃO SOCIAL DO FRANQUEADO]
A/C Sr(a). [NOME]

Ref.: Contrato de Franquia nº [NÚMERO] — Não-Renovação

Prezado(a) Franqueado(a),

Comunicamos, com a antecedência prevista na Cláusula [X] do Contrato
de Franquia, que não exerceremos a opção de renovação do contrato
com vencimento em [DATA].

Esta decisão baseia-se em [MOTIVO RESUMIDO, sem tom acusatório].

Estamos à disposição para conduzir a transição de forma organizada
e profissional, conforme previsto contratualmente.

Solicitamos o agendamento de reunião para discutir o plano de
transição. Seguem as datas sugeridas: [DATAS].

Atenciosamente,

______________________________
[NOME]
[CARGO]
Avend Franquias Ltda.
```

---

## 13. Referências

- Lei 13.966/2019 (Lei de Franquias) — Art. 2º (COF), Art. 7º (prazo)
- Código Civil — Arts. 421-422 (boa-fé contratual)
- ABF — Guia de Boas Práticas para Renovação
- Contrato de Franquia Avend (cláusulas de renovação)
- COF Avend vigente

---

*Playbook mantido por @franchise-legal, @franchise-relationship*
*Revisão obrigatória: anual ou após mudança legislativa*
