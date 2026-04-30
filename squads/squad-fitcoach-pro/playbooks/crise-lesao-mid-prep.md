# Playbook: Crise de Lesão Durante Preparação de Competição

## Propósito

Este playbook define o protocolo completo para lidar com lesões que ocorrem durante uma preparação de competição. A prioridade absoluta é a saúde do atleta, seguida pela preservação máxima possível do trabalho já realizado na prep. Cobre desde a avaliação inicial de severidade até a decisão de continuar, pausar ou desistir da competição, incluindo adaptações de treino e dieta para cada cenário.

---

## Triggers — Quando Usar Este Playbook

- Atleta em prep reporta dor aguda durante treino
- Lesão traumática durante sessão de treino (queda, acidente com carga)
- Dor crônica que piora progressivamente durante a prep
- Lesão fora do treino (acidente, queda, esporte recreativo)
- Médico/fisioterapeuta recomenda pausa ou restrição durante prep ativa
- Atleta esconde dor e coach identifica compensação no movimento

---

## Pré-requisitos

- [ ] Atleta em preparação de competição ativa (qualquer fase)
- [ ] Dados de prep atualizados (semana atual, shape atual, data do show)
- [ ] Contato de médico/fisioterapeuta de confiança disponível
- [ ] Histórico de lesões do atleta documentado
- [ ] Plano de treino e dieta atuais acessíveis para modificação
- [ ] Timeline da competição clara (quantas semanas restam)

---

## Agents Envolvidos

| Agent | Papel no Playbook | Fase Principal |
|-------|-------------------|----------------|
| `injury-manager` | Avaliação inicial, classificação de severidade, coordenação médica | Fase 1-2 |
| `prep-master` | Decisão estratégica sobre continuidade da prep | Fase 2-3 |
| `biomechanics-coach` | Adaptação de exercícios, padrões de movimento alternativos | Fase 3 |
| `periodization-architect` | Reestruturação do programa de treino adaptado | Fase 3-4 |

---

## Árvore de Decisão — Severidade da Lesão

```
AVALIAÇÃO INICIAL (nas primeiras 24h)
│
├─ GRAU 1 — LEVE
│   ├─ Definição: Dor localizada sem limitação funcional significativa
│   ├─ Exemplos: Contratura muscular leve, tendinite inicial, dor articular pontual
│   ├─ Sinais: Dor < 4/10, pode treinar com adaptação, sem inchaço
│   ├─ Prognóstico: Resolução em 3-10 dias com manejo adequado
│   └─ DECISÃO: Continuar prep com adaptações → ROTA A
│
├─ GRAU 2 — MODERADA
│   ├─ Definição: Dor significativa com limitação funcional parcial
│   ├─ Exemplos: Distensão muscular grau I-II, tendinopatia estabelecida,
│   │   entorse leve, dor lombar aguda moderada
│   ├─ Sinais: Dor 5-7/10, treino parcial possível, inchaço leve/moderado
│   ├─ Prognóstico: 2-6 semanas para resolução
│   └─ DECISÃO: Avaliar timeline → ROTA B (depende de semanas restantes)
│
├─ GRAU 3 — GRAVE
│   ├─ Definição: Dor intensa com limitação funcional severa
│   ├─ Exemplos: Distensão muscular grau II-III, ruptura parcial de tendão,
│   │   hérnia de disco aguda, fratura por stress, lesão ligamentar
│   ├─ Sinais: Dor > 7/10, impossível treinar a região, inchaço significativo
│   ├─ Prognóstico: 6+ semanas, possível necessidade cirúrgica
│   └─ DECISÃO: Desistir da competição → ROTA C
│
└─ EMERGÊNCIA
    ├─ Definição: Risco imediato à saúde
    ├─ Exemplos: Fratura exposta, luxação, perda de consciência,
    │   dor torácica, rabdomiólise suspeitada
    ├─ AÇÃO: Emergência médica IMEDIATA (SAMU 192)
    └─ Prep é IRRELEVANTE neste momento
```

---

## Execução Passo a Passo

### FASE 1 — Avaliação Imediata (Primeiras 24h)

**Responsável:** `injury-manager`

#### Passo 1.1 — Triagem Inicial

```
PROTOCOLO DE TRIAGEM:
│
├─ QUANDO a lesão ocorreu? _______________
├─ COMO ocorreu? (mecanismo da lesão)
│   ├─ Trauma direto (impacto, queda)
│   ├─ Sobrecarga aguda (carga excessiva, movimento brusco)
│   ├─ Sobrecarga crônica (acúmulo gradual)
│   └─ Espontâneo (sem evento identificável)
│
├─ ONDE exatamente dói? (pedir para apontar com 1 dedo)
├─ INTENSIDADE da dor (0-10): ___
├─ TIPO da dor:
│   ├─ Aguda/pontada
│   ├─ Queimação
│   ├─ Latejante
│   ├─ Peso/pressão
│   └─ Dormência/formigamento → RED FLAG
│
├─ O QUE piora a dor? _______________
├─ O QUE alivia? _______________
│
├─ SINAIS OBJETIVOS:
│   ├─ Inchaço? ⬜ Não ⬜ Leve ⬜ Moderado ⬜ Severo
│   ├─ Hematoma? ⬜ Não ⬜ Sim
│   ├─ Perda de amplitude de movimento? ⬜ Não ⬜ Parcial ⬜ Total
│   ├─ Instabilidade articular? ⬜ Não ⬜ Sim → RED FLAG
│   └─ Deformidade visível? ⬜ Não ⬜ Sim → EMERGÊNCIA
│
└─ CLASSIFICAR GRAU: ⬜ 1-Leve ⬜ 2-Moderada ⬜ 3-Grave ⬜ Emergência
```

#### Passo 1.2 — Protocolo PRICE Imediato (Graus 1-2)

1. **P**roteção: Parar atividade que causa dor imediatamente
2. **R**epouso relativo: Evitar movimentos que reproduzem a dor
3. **I**ce (Gelo): 15-20 min a cada 2h nas primeiras 48h
4. **C**ompressão: Bandagem elástica se houver inchaço
5. **E**levação: Manter região elevada quando possível

#### Passo 1.3 — Decisão Médica

```
NECESSIDADE DE AVALIAÇÃO MÉDICA:
│
├─ OBRIGATÓRIO (agendar em 24-48h):
│   ├─ Qualquer lesão Grau 2 ou superior
│   ├─ Inchaço significativo
│   ├─ Dor que não melhora com PRICE em 48h
│   ├─ Suspeita de lesão estrutural (estalo, sensação de ruptura)
│   ├─ Dormência ou formigamento
│   └─ Perda de força significativa na região
│
├─ RECOMENDADO (agendar em 1 semana):
│   ├─ Lesão Grau 1 que não resolve em 7 dias
│   ├─ Dor recorrente no mesmo local
│   └─ Atleta tem histórico de lesão na mesma região
│
└─ PODE MONITORAR:
    ├─ Dor muscular pós-treino que se resolve em 48-72h
    ├─ Desconforto leve que não piora durante exercício
    └─ Dor < 3/10 que melhora com aquecimento
```

---

### FASE 2 — Decisão Estratégica (24-72h)

**Responsável:** `prep-master` + `injury-manager`

#### Passo 2.1 — Análise de Contexto da Prep

```
AVALIAR POSIÇÃO NA PREP:
│
├─ SEMANAS RESTANTES para o show: ___
│
├─ IF > 8 semanas restantes
│   ├─ MARGEM ALTA para recuperação
│   ├─ Lesão Grau 1: Continuar com certeza (ROTA A)
│   ├─ Lesão Grau 2: Provavelmente viável (ROTA B)
│   └─ Lesão Grau 3: Avaliar caso a caso (ROTA B ou C)
│
├─ IF 4-8 semanas restantes
│   ├─ MARGEM MODERADA
│   ├─ Lesão Grau 1: Continuar (ROTA A)
│   ├─ Lesão Grau 2: Risco alto, avaliar prognóstico médico (ROTA B)
│   └─ Lesão Grau 3: Desistir (ROTA C)
│
├─ IF 2-4 semanas restantes
│   ├─ MARGEM MÍNIMA
│   ├─ Lesão Grau 1: Continuar com cautela extrema (ROTA A)
│   ├─ Lesão Grau 2: Provavelmente desistir (ROTA C)
│   └─ Lesão Grau 3: Desistir com certeza (ROTA C)
│
└─ IF < 2 semanas (incluindo peak week)
    ├─ MARGEM ZERO
    ├─ Lesão Grau 1: Continuar APENAS se não afeta posing/apresentação
    ├─ Lesão Grau 2+: Desistir (ROTA C)
    └─ REGRA: Não subir no palco com dor que afete apresentação
```

#### Passo 2.2 — Análise de Impacto na Preparação

```
IMPACTO DA LESÃO:
│
├─ REGIÃO AFETADA vs PONTOS FRACOS DO ATLETA
│   ├─ IF lesão em grupo muscular que é ponto forte
│   │   ├─ Impacto visual: MODERADO (tem base)
│   │   └─ Perda aceitável: 2-3 semanas sem treinar não destrói o shape
│   │
│   └─ IF lesão em grupo muscular que é ponto fraco
│       ├─ Impacto visual: ALTO (já era deficiente)
│       └─ Considerar impacto na colocação competitiva
│
├─ REGIÃO AFETADA vs POSING
│   ├─ IF afeta poses obrigatórias (ex: ombro em front double biceps)
│   │   └─ Impacto ALTO na apresentação
│   │
│   └─ IF não afeta poses (ex: panturrilha em categoria men's physique)
│       └─ Impacto BAIXO na apresentação
│
└─ REGIÃO AFETADA vs CARDIO
    ├─ IF afeta capacidade de fazer cardio (ex: lesão no joelho)
    │   ├─ Buscar alternativa: bike, remo, upper body cardio
    │   └─ Se nenhuma alternativa → Ajustar deficit via dieta
    │
    └─ IF não afeta cardio
        └─ Manter protocolo cardio normalmente
```

---

### FASE 3 — Execução da Rota Selecionada

#### ROTA A — Continuar Prep com Adaptações (Grau 1)

**Responsável:** `biomechanics-coach` + `periodization-architect`

##### Passo A.1 — Adaptação Imediata do Treino

```
PROTOCOLO DE ADAPTAÇÃO — LESÃO LEVE:
│
├─ DIA 1-3 (Fase Aguda):
│   ├─ REMOVER todos os exercícios que causam dor na região
│   ├─ MANTER treino normal para outras regiões
│   ├─ Se dia de treino da região afetada → Substituir por treino de outra região
│   └─ Aplicar PRICE após cada sessão
│
├─ DIA 4-7 (Fase de Retorno Gradual):
│   ├─ TESTAR exercícios alternativos para a região (sem dor)
│   ├─ Começar com 50% da carga habitual
│   ├─ Se 0 dor → Progredir para 70%
│   ├─ Se dor leve (< 3/10) → Manter 50%, reavaliar em 2 dias
│   └─ Se dor > 3/10 → Voltar ao protocolo de dia 1-3
│
└─ DIA 8+ (Retorno Completo):
    ├─ Progredir carga gradualmente até peso habitual
    ├─ Monitorar dor em TODAS as séries
    ├─ Se dor retornar → Substituir exercício permanentemente
    └─ Documentar: Quais exercícios são seguros, quais não são
```

##### Passo A.2 — Substituições de Exercícios por Região

```
BIBLIOTECA DE SUBSTITUIÇÕES:
│
├─ OMBRO
│   ├─ Desenvolvimento → Elevação lateral (se impingement)
│   ├─ Supino inclinado → Supino reto ou declinado
│   ├─ Remada alta → Face pull ou posterior com cabos
│   └─ Dips → Pushdowns com corda
│
├─ JOELHO
│   ├─ Agachamento → Leg press 45° (ROM controlado)
│   ├─ Leg extension → Agachamento isométrico (wall sit)
│   ├─ Avanço → Step up (baixa amplitude)
│   └─ Corrida → Bike ou elíptico
│
├─ LOMBAR
│   ├─ Deadlift → Hip thrust
│   ├─ Remada curvada → Remada com apoio no peito
│   ├─ Agachamento livre → Leg press ou hack squat
│   └─ Good morning → Hiperextensão com ROM reduzido
│
├─ PUNHO/COTOVELO
│   ├─ Rosca direta → Rosca martelo ou rosca Scott (cabo)
│   ├─ Supino com barra → Supino com halteres (rotação neutra)
│   ├─ Remada com barra → Remada no cabo ou máquina
│   └─ Desenvolvimento → Máquina shoulder press
│
└─ QUADRIL
    ├─ Agachamento profundo → Agachamento parcial ou box squat
    ├─ Avanço → Cadeira adutora/abdutora
    ├─ Stiff → RDL com ROM controlado
    └─ Corrida → Bike reclinada ou natação
```

##### Passo A.3 — Ajustes Nutricionais para Lesão Leve

```
NUTRIÇÃO — LESÃO LEVE:
│
├─ IF volume de treino reduziu < 20%
│   └─ MANTER calorias e macros iguais
│
├─ IF volume de treino reduziu 20-40%
│   ├─ Reduzir calorias em 100-200 kcal (via carboidrato)
│   ├─ Manter proteína alta (pode até aumentar para 2.5-3.0g/kg)
│   └─ Manter gordura estável
│
└─ SUPLEMENTAÇÃO DE APOIO:
    ├─ Colágeno: 10-15g/dia (suporte articular)
    ├─ Omega-3: 3-5g/dia (anti-inflamatório)
    ├─ Vitamina C: 500-1000mg/dia (síntese de colágeno)
    └─ Creatina: Manter 5g/dia (neuroproteção + recuperação)
```

---

#### ROTA B — Prep em Risco, Avaliar Continuidade (Grau 2)

**Responsável:** `prep-master` + `injury-manager`

##### Passo B.1 — Reunião de Decisão (72h após lesão)

```
DECISION MEETING — Participantes: Coach + Atleta (+ Médico/Fisio se possível)
│
├─ APRESENTAR dados:
│   ├─ Diagnóstico médico/fisio (se disponível)
│   ├─ Prognóstico de recuperação (tempo estimado)
│   ├─ Semanas restantes para o show
│   ├─ Shape atual vs shape necessário
│   └─ Exercícios que podem/não podem ser feitos
│
├─ CENÁRIOS:
│   ├─ CENÁRIO 1: Continuar prep com treino muito adaptado
│   │   ├─ Prós: Mantém momentum, não perde inscrição
│   │   ├─ Contras: Risco de piorar lesão, shape possivelmente inferior
│   │   └─ Viável se: Prognóstico < semanas restantes e treino alternativo existe
│   │
│   ├─ CENÁRIO 2: Pausar prep, reabilitar, competir em data posterior
│   │   ├─ Prós: Recuperação completa, prep melhor na próxima
│   │   ├─ Contras: Perda de inscrição, frustração emocional
│   │   └─ Viável se: Outra competição disponível em 8-16 semanas
│   │
│   └─ CENÁRIO 3: Desistir completamente desta temporada
│       ├─ Prós: Foco total na saúde, volta mais forte
│       ├─ Contras: Impacto emocional, perda de investimento na prep
│       └─ Viável se: Lesão grave ou saúde mental comprometida
│
└─ DECISÃO FINAL: ⬜ Cenário 1 ⬜ Cenário 2 ⬜ Cenário 3
    └─ DOCUMENTAR justificativa e aceite do atleta
```

##### Passo B.2 — Adaptação Profunda do Treino (se Cenário 1)

```
REESTRUTURAÇÃO PARA LESÃO MODERADA:
│
├─ REGIÃO AFETADA:
│   ├─ Semana 1-2: ZERO treino direto na região
│   ├─ Fisioterapia: 2-3x/semana (OBRIGATÓRIO)
│   ├─ Semana 3+: Reintroduzir gradualmente conforme liberação do fisio
│   └─ Exercícios permitidos APENAS os que o fisio liberou
│
├─ REGIÕES NÃO AFETADAS:
│   ├─ Treinar normalmente (manter estímulo e shape)
│   ├─ Pode até aumentar frequência de regiões não afetadas
│   ├─ Exemplo: Lesão no ombro → Treinar pernas 3x/semana em vez de 2x
│   └─ Compensar perda de gasto calórico com cardio adaptado
│
├─ CARDIO:
│   ├─ Adaptar modalidade conforme região afetada
│   ├─ Se lesão em membro inferior → Upper body ergometer, remo adaptado
│   ├─ Se lesão em membro superior → Bike, caminhada, elíptico
│   └─ Manter gasto calórico total similar
│
└─ VOLUME TOTAL:
    ├─ Aceitar redução de 30-50% temporariamente
    ├─ Focar em MANTER massa muscular, não em progredir
    └─ Cada sessão que consegue fazer é um ganho
```

##### Passo B.3 — Ajustes Nutricionais para Lesão Moderada

```
NUTRIÇÃO — LESÃO MODERADA:
│
├─ PROTEÍNA: Aumentar para 2.5-3.0g/kg (suportar recuperação)
├─ CALORIAS: Reavaliar conforme gasto calórico real
│   ├─ IF gasto diminuiu muito (menos treino + menos cardio)
│   │   ├─ Ajustar deficit via dieta (reduzir carbs moderadamente)
│   │   └─ NÃO criar deficit excessivo (prejudica cicatrização)
│   │
│   └─ IF gasto manteve-se similar (cardio adaptado funciona)
│       └─ Manter calorias similares
│
├─ GORDURA: Manter ou aumentar levemente (hormônios + anti-inflamatório)
├─ MICRONUTRIENTES DE RECUPERAÇÃO:
│   ├─ Vitamina A: 5000 UI/dia (reparo tecidual)
│   ├─ Vitamina C: 1000-2000mg/dia (colágeno)
│   ├─ Zinco: 15-30mg/dia (imunidade + cicatrização)
│   ├─ Colágeno hidrolisado: 15-20g/dia
│   └─ Omega-3: 4-6g/dia (anti-inflamatório)
│
└─ REGRA: A recuperação da lesão é MAIS IMPORTANTE que a velocidade da perda de gordura
```

---

#### ROTA C — Desistir da Competição (Grau 3 ou Decisão Estratégica)

**Responsável:** `prep-master`

##### Passo C.1 — Comunicação e Suporte Emocional

```
PROTOCOLO DE DESISTÊNCIA:
│
├─ CONVERSA COM O ATLETA:
│   ├─ Reconhecer o esforço e trabalho investido na prep
│   ├─ Explicar que desistir é decisão INTELIGENTE, não fraqueza
│   ├─ Mostrar casos de atletas que voltaram mais fortes após desistir
│   ├─ NÃO minimizar a frustração (é legítima e esperada)
│   └─ Dar espaço para processar emocionalmente
│
├─ AÇÕES PRÁTICAS:
│   ├─ Cancelar inscrição (verificar reembolso)
│   ├─ Informar federação se necessário
│   ├─ Ajustar expectativas para próxima temporada
│   └─ Definir próximos passos claros (não deixar em limbo)
│
└─ MONITORAR NAS SEMANAS SEGUINTES:
    ├─ Risco de binge eating por frustração → Suporte nutricional
    ├─ Risco de treinar por raiva e piorar lesão → Limitar intensidade
    ├─ Risco de depressão/desmotivação → Check-ins mais frequentes
    └─ IF necessário → Encaminhar para suporte psicológico
```

##### Passo C.2 — Transição para Reabilitação + Reverse Diet

```
TRANSIÇÃO PÓS-DESISTÊNCIA:
│
├─ SEMANA 1:
│   ├─ Iniciar reverse diet imediato (não precisa esperar)
│   ├─ Aumentar calorias 300-500 kcal (manutenção estimada)
│   ├─ Foco total na reabilitação da lesão
│   └─ Treino: Apenas o que o fisio/médico permitir
│
├─ SEMANAS 2-4:
│   ├─ Continuar reverse diet (+100-200 kcal/semana)
│   ├─ Fisioterapia ativa
│   ├─ Retorno gradual ao treino conforme liberação
│   └─ Peso vai subir — NORMAL e esperado
│
├─ SEMANAS 5-8:
│   ├─ Estabilizar calorias em manutenção real
│   ├─ Retorno progressivo ao treino normal
│   ├─ Avaliar quando iniciar nova fase de treino pesado
│   └─ Exames de sangue de controle (saúde pós-prep)
│
└─ SEMANAS 9+:
    ├─ Offseason saudável
    ├─ Planejar próxima competição com timeline adequada
    ├─ Documentar aprendizados desta prep para a próxima
    └─ Trabalhar pontos fracos identificados
```

---

### FASE 4 — Acompanhamento de Recuperação (Contínuo)

**Responsável:** `injury-manager` + `periodization-architect`

#### Passo 4.1 — Monitoramento da Reabilitação

```
CHECK-IN DE LESÃO (a cada 3-5 dias):
│
├─ Dor atual (0-10): ___
├─ Tendência: ⬜ Melhorando ⬜ Estável ⬜ Piorando
├─ Amplitude de movimento: ⬜ Aumentando ⬜ Igual ⬜ Diminuindo
├─ Exercícios testados com sucesso: _______________
├─ Exercícios que ainda causam dor: _______________
├─ Fisioterapia realizada: ⬜ Sim (___x) ⬜ Não
│
├─ IF melhorando conforme esperado
│   └─ Continuar protocolo, progredir gradualmente
│
├─ IF estagnado por 2+ semanas
│   ├─ Reavaliar diagnóstico
│   ├─ Considerar exame de imagem
│   └─ Ajustar abordagem fisioterapêutica
│
└─ IF piorando
    ├─ PARAR toda atividade na região
    ├─ Retorno médico obrigatório
    └─ Possível necessidade de exame avançado (RM, US)
```

#### Passo 4.2 — Critérios de Retorno ao Treino Normal

```
CRITÉRIOS PARA RETORNO (TODOS devem ser atendidos):
│
├─ [ ] Dor < 2/10 durante atividades diárias por 5+ dias consecutivos
├─ [ ] Amplitude de movimento > 90% do normal
├─ [ ] Força > 80% do lado não afetado (se unilateral)
├─ [ ] Exercícios básicos da região sem dor com carga moderada
├─ [ ] Liberação do fisioterapeuta/médico (se lesão Grau 2+)
├─ [ ] Sem recorrência de dor após sessão de teste
│
└─ RETORNO GRADUAL:
    ├─ Semana 1: 50% do volume e 60% da carga habitual
    ├─ Semana 2: 70% do volume e 75% da carga
    ├─ Semana 3: 85% do volume e 85% da carga
    └─ Semana 4: 100% — Monitorar por mais 2 semanas
```

---

## Caminhos de Escalação

| Situação | Escalar Para | Ação |
|----------|-------------|------|
| Lesão não diagnosticada apesar de dor persistente | Médico ortopedista | Exame de imagem obrigatório |
| Atleta quer continuar contra recomendação médica | `fitcoach-chief` | Intervenção, possível recusa de serviço |
| Impacto emocional severo pela desistência | Psicólogo esportivo | Encaminhamento profissional |
| Lesão recorrente no mesmo local | Fisioterapeuta especializado | Avaliação biomecânica completa |
| Suspeita de uso de substâncias para "acelerar" recuperação | `fitcoach-chief` | Conversa séria, possíveis consequências legais |
| Lesão durante peak week | `prep-master` + `elite-coach` | Decisão imediata sobre subir ou não no palco |

---

## Red Flags e Condições de Veto

### VETO TOTAL — NÃO Continuar Prep Sob Nenhuma Circunstância

- [ ] Fratura confirmada por exame de imagem
- [ ] Ruptura total de tendão ou ligamento
- [ ] Hérnia de disco com sintomas neurológicos (formigamento, fraqueza, irradiação)
- [ ] Médico expressamente proibiu atividade física
- [ ] Atleta escondendo dor e treinando (quebra de confiança + risco)
- [ ] Lesão piorou APÓS adaptação de treino

### VETO PARCIAL — Continuar Apenas com Restrições Severas

- [ ] Dor > 5/10 em qualquer exercício → Remover exercício imediatamente
- [ ] Inchaço que não reduz em 72h → Avaliação médica obrigatória
- [ ] Compensação de movimento visível → Corrigir ou parar
- [ ] Uso de anti-inflamatórios para "aguentar treinar" → PROIBIDO mascarar dor
- [ ] Atleta emocionalmentedesesperado tentando forçar → Coach deve ser a voz da razão

### ALERTAS — Situações que Requerem Atenção Extra

- [ ] Lesão leve que não melhora em 10 dias → Pode ser mais grave que parece
- [ ] Atleta desenvolvendo medo de certos exercícios → Normal, abordar gradualmente
- [ ] Performance caindo em regiões não afetadas → Impacto psicológico
- [ ] Múltiplas "pequenas lesões" em sequência → Possível overtraining sistêmico

---

## Checklist de Output

### Nas primeiras 24h:
- [ ] Triagem inicial completa
- [ ] Grau de severidade classificado (1/2/3/Emergência)
- [ ] PRICE iniciado (se aplicável)
- [ ] Decisão sobre necessidade de avaliação médica
- [ ] Treino do dia seguinte adaptado ou cancelado

### Em 72h:
- [ ] Diagnóstico médico/fisio obtido (se Grau 2+)
- [ ] Rota selecionada (A/B/C)
- [ ] Decisão sobre continuidade da prep documentada
- [ ] Treino completamente reestruturado (se continuar)
- [ ] Dieta ajustada conforme novo gasto calórico
- [ ] Atleta informado e de acordo com o plano

### Em 2 semanas:
- [ ] Evolução da lesão documentada
- [ ] Resposta ao treino adaptado avaliada
- [ ] Impacto no shape avaliado (fotos comparativas)
- [ ] Reavaliação da decisão (manter rota ou mudar)
- [ ] Fisioterapia em andamento (se aplicável)

---

## Templates

### Template: Comunicação com Médico/Fisioterapeuta

```
Prezado(a) Dr(a). [NOME],

Sou coach do atleta [NOME DO ATLETA], que está em preparação para
competição de fisiculturismo com data marcada para [DATA DO SHOW]
([X] semanas restantes).

O atleta apresentou [DESCRIÇÃO DA LESÃO] em [DATA], durante
[CONTEXTO — treino de qual exercício, acidente, etc.].

Informações relevantes:
- Dor atual: [X]/10
- Localização: [ESPECÍFICA]
- Sinais observados: [INCHAÇO/HEMATOMA/LIMITAÇÃO]
- Treino atual: [FREQUÊNCIA E INTENSIDADE]
- Dieta atual: [CALORIAS] kcal, deficit de [X]%

Gostaria de saber:
1. Diagnóstico e prognóstico estimado
2. Quais atividades físicas estão liberadas/proibidas
3. Protocolo de reabilitação recomendado
4. Prazo estimado para retorno total
5. Alguma restrição nutricional específica

Agradeço a atenção e fico disponível para mais informações.

[NOME DO COACH]
[CONTATO]
```

### Template: Registro de Decisão de Prep

```
# DECISÃO DE PREP — LESÃO [NOME DO ATLETA]

Data da lesão: [DATA]
Data da decisão: [DATA]
Semanas para o show: [X]

## Lesão
- Tipo: [DESCRIÇÃO]
- Grau: [1/2/3]
- Região: [ESPECÍFICA]
- Diagnóstico médico: [SE DISPONÍVEL]
- Prognóstico: [TEMPO ESTIMADO]

## Decisão
- Rota selecionada: [A/B/C]
  ⬜ A: Continuar com adaptações
  ⬜ B: Avaliar continuidade (risco)
  ⬜ C: Desistir da competição

## Justificativa
[EXPLICAÇÃO DETALHADA]

## Aceite do Atleta
⬜ Atleta concorda com a decisão
⬜ Atleta discorda mas aceita a recomendação
⬜ Atleta discorda e quer opinião adicional

## Plano de Ação
1. [AÇÃO 1 — PRAZO]
2. [AÇÃO 2 — PRAZO]
3. [AÇÃO 3 — PRAZO]

## Próxima Reavaliação: [DATA]

Assinado: [COACH] | Ciente: [ATLETA]
```

---

## Notas Finais

- Nenhum troféu vale uma lesão crônica. A carreira competitiva de um atleta pode durar 10-20 anos; uma lesão mal cuidada pode acabar com ela em minutos.
- O atleta em prep tem julgamento comprometido (deficit calórico + stress + investimento emocional). O coach precisa ser a voz da razão.
- Anti-inflamatórios para mascarar dor e continuar treinando é uma receita para desastre. Se precisa de remédio para treinar, NÃO deveria treinar aquela região.
- Documentar TUDO. Se o atleta decidir contra a recomendação do coach, registrar por escrito.
- A prep pode ser refeita. O corpo do atleta, não.
