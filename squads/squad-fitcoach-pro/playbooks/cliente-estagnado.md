# Playbook: Quebra de Plato — Cliente Estagnado

## Propósito

Este playbook define o protocolo completo de investigação e resolução de estagnação (plato) em clientes que pararam de progredir, seja em composição corporal, performance ou ambos. O foco é diferenciar plato real de plato percebido, identificar a causa raiz com precisão e aplicar a intervenção correta na dose certa.

---

## Triggers — Quando Usar Este Playbook

- Peso corporal estável por mais de 3 semanas consecutivas SEM explicação (em contexto de deficit ou superávit)
- Cargas de treino estagnadas por mais de 2 mesociclos consecutivos
- Cliente reporta frustração com falta de progresso visível
- Fotos e medidas sem mudança significativa por 4+ semanas
- Desempenho em queda progressiva sem causa aparente
- Coach identifica padrão de não-progressão nos dados de check-in

---

## Pré-requisitos

- [ ] Mínimo de 4 semanas de dados de check-in disponíveis
- [ ] Registro de treino com cargas, séries, reps e RPE
- [ ] Fotos comparativas (baseline vs atual)
- [ ] Registro alimentar dos últimos 7-14 dias
- [ ] Dados de peso diário ou semanal
- [ ] Feedback subjetivo do cliente sobre sono, stress, energia
- [ ] Histórico de alterações anteriores no plano

---

## Agents Envolvidos

| Agent | Papel no Playbook | Fase Principal |
|-------|-------------------|----------------|
| `progress-tracker` | Análise de dados, identificação de padrões, diagnóstico inicial | Fase 1-2 |
| `hypertrophy-scientist` | Análise de estímulo de treino, volume, intensidade | Fase 3 (se causa = treino) |
| `nutrition-scientist` | Análise nutricional aprofundada, ajustes metabólicos | Fase 3 (se causa = dieta) |
| `periodization-architect` | Reestruturação de periodização, deload, mudança de fase | Fase 3-4 |

---

## Árvore de Decisão Principal

### Etapa 0: É realmente um platô?

```
DADOS dos últimos 21 dias
│
├─ IF peso variou < 0.5kg MAS circunferências diminuíram
│   └─ NÃO É PLATÔ — É recomposição corporal
│       ├─ Mostrar ao cliente a diferença
│       ├─ Reforçar que escala não é único indicador
│       └─ MANTER plano atual, reavaliar em 2 semanas
│
├─ IF peso variou < 0.5kg E circunferências iguais MAS cargas subiram
│   └─ NÃO É PLATÔ — Está ganhando força/músculo e perdendo gordura
│       ├─ Parabenizar progresso
│       └─ MANTER plano atual
│
├─ IF peso variou < 0.5kg E circunferências iguais E cargas iguais
│   ├─ Duração da estagnação?
│   │   ├─ IF < 3 semanas → Monitorar mais, pode ser variação normal
│   │   ├─ IF 3-6 semanas → PLATÔ CONFIRMADO, iniciar investigação
│   │   └─ IF > 6 semanas → PLATÔ SEVERO, investigação urgente
│   └─ PROSSEGUIR para diagnóstico de causa raiz
│
├─ IF peso subindo em contexto de deficit
│   ├─ IF acompanhado de inchaço/retenção → Investigar sódio, ciclo menstrual, stress
│   ├─ IF consistente por 3+ semanas → Deficit não existe ou adaptação metabólica
│   └─ PROSSEGUIR para investigação nutricional
│
└─ IF desempenho caindo progressivamente
    ├─ IF acompanhado de fadiga, irritabilidade, sono ruim
    │   └─ SUSPEITA: Overreaching/overtraining
    └─ PROSSEGUIR para investigação de recovery
```

### Etapa 1: Diagnóstico de Causa Raiz

```
INVESTIGAR as 5 dimensões
│
├─ DIMENSÃO 1: COMPLIANCE (Adesão)
│   ├─ Adesão alimentar real < 80%?
│   ├─ Treinos perdidos > 20%?
│   ├─ Inconsistência nos horários?
│   └─ IF SIM para qualquer → CAUSA PROVÁVEL: Compliance
│
├─ DIMENSÃO 2: NUTRIÇÃO
│   ├─ Calorias reais vs planejadas (track 3 dias aleatorios)
│   ├─ Adaptação metabólica? (NEAT reduzido, termogênese)
│   ├─ Refeições não rastreadas? (molhos, óleos, petiscos)
│   └─ IF discrepância > 15% → CAUSA PROVÁVEL: Nutrição
│
├─ DIMENSÃO 3: TREINO
│   ├─ Volume total estagnou ou diminuiu?
│   ├─ Intensidade relativa (RPE) está adequada?
│   ├─ Mesmos exercícios por > 8 semanas sem variação?
│   ├─ Progressive overload parou?
│   └─ IF SIM para qualquer → CAUSA PROVÁVEL: Treino
│
├─ DIMENSÃO 4: RECOVERY
│   ├─ Sono < 6h/noite consistentemente?
│   ├─ Qualidade do sono ruim (acordar no meio da noite)?
│   ├─ Stress percebido > 7/10?
│   ├─ HRV em tendência de queda? (se disponível)
│   └─ IF SIM para qualquer → CAUSA PROVÁVEL: Recovery
│
└─ DIMENSÃO 5: FATORES EXTERNOS
    ├─ Mudança de medicação recente?
    ├─ Período de maior stress (trabalho, família)?
    ├─ Mudança de rotina significativa?
    ├─ Fase do ciclo menstrual? (para mulheres)
    └─ IF SIM para qualquer → CAUSA PROVÁVEL: Fatores Externos
```

---

## Execução Passo a Passo

### FASE 1 — Coleta Profunda de Dados (Dia 1-2)

**Responsável:** `progress-tracker`

#### Passo 1.1 — Auditoria de Dados Existentes

1. Compilar todas as pesagens dos últimos 30 dias
2. Calcular média semanal e tendência (usando média móvel de 7 dias)
3. Comparar fotos: T0 (baseline) vs T-atual vs T-intermediário
4. Compilar circunferências históricas e plotar tendência
5. Revisar log de treino: cargas, volume total, RPE médio por sessão
6. Revisar histórico de ajustes já feitos no plano

#### Passo 1.2 — Questionário de Investigação Aprofundada

Enviar ao cliente o questionário detalhado (template abaixo) cobrindo:

1. Rotina alimentar REAL dos últimos 7 dias (incluindo fins de semana)
2. Consumo de álcool (frequência e quantidade)
3. Nível de atividade fora do treino (NEAT)
4. Padrão de sono (horário, duração, qualidade, interrupções)
5. Nível de stress percebido (trabalho, relacionamento, financeiro)
6. Motivação atual (escala 1-10)
7. Sintomas físicos (fadiga, dores articulares, libido, humor)
8. Medicações ou suplementos novos
9. Mudanças na rotina diária
10. Percepção pessoal do que está causando a estagnação

#### Passo 1.3 — Tracking Preciso de 3 Dias

```
SOLICITAR ao cliente:
│
├─ Dia 1: Dia de treino típico
│   └─ Registrar TUDO que come e bebe, com fotos
│
├─ Dia 2: Dia de descanso típico
│   └─ Registrar TUDO que come e bebe, com fotos
│
└─ Dia 3: Dia de fim de semana
    └─ Registrar TUDO que come e bebe, com fotos

IMPORTANTE:
- Pedir para NÃO mudar comportamento durante o tracking
- Queremos ver a REALIDADE, não o ideal
- Fotos de refeições são mais confiáveis que registro manual
```

---

### FASE 2 — Diagnóstico (Dia 3-4)

**Responsável:** `progress-tracker`

#### Passo 2.1 — Análise Cruzada de Dados

1. Comparar calorias reportadas vs calorias reais (tracking de 3 dias):

```
DIFERENÇA entre reportado e real
│
├─ IF diferença < 10%
│   └─ Compliance alimentar OK, investigar outras causas
│
├─ IF diferença 10-25%
│   ├─ CAUSA IDENTIFICADA: Sub-reporte calórico
│   ├─ Fontes comuns: óleos de cozinha, molhos, petiscos, bebidas
│   └─ Intervenção: Educação + ajuste de estratégia
│
└─ IF diferença > 25%
    ├─ CAUSA PRINCIPAL: Deficit não existe na prática
    ├─ Reestruturar abordagem alimentar completamente
    └─ Considerar plano mais flexível mas com controle real
```

2. Analisar volume de treino efetivo:

```
VOLUME EFETIVO (séries próximas de falha)
│
├─ IF RPE médio < 6 na maioria das séries
│   └─ CAUSA: Intensidade insuficiente (junk volume)
│
├─ IF RPE médio > 9 em todas as séries
│   └─ CAUSA: Excesso de fadiga, possível overreaching
│
├─ IF volume total diminuiu vs mês anterior
│   └─ CAUSA: Regressão de estímulo
│
└─ IF volume e intensidade adequados
    └─ Causa provavelmente NÃO é treino
```

3. Avaliar score de recovery:

```
RECOVERY SCORE (somatório)
│
├─ Sono > 7h/noite: +2 pontos
├─ Sono 6-7h: +1 ponto
├─ Sono < 6h: 0 pontos
│
├─ Stress < 5/10: +2 pontos
├─ Stress 5-7/10: +1 ponto
├─ Stress > 7/10: 0 pontos
│
├─ Energia > 7/10: +2 pontos
├─ Energia 5-7/10: +1 ponto
├─ Energia < 5/10: 0 pontos
│
├─ Sem dores articulares: +2 pontos
├─ Dores leves: +1 ponto
├─ Dores significativas: 0 pontos
│
TOTAL:
├─ 7-8 pontos → Recovery EXCELENTE
├─ 5-6 pontos → Recovery ADEQUADA
├─ 3-4 pontos → Recovery COMPROMETIDA → Intervenção necessária
└─ 0-2 pontos → Recovery CRÍTICA → Prioridade absoluta
```

#### Passo 2.2 — Classificação do Platô

| Tipo | Características | Prioridade de Intervenção |
|------|----------------|--------------------------|
| Compliance | Plano está bom, execução está ruim | Comportamental primeiro |
| Nutricional | Adaptação metabólica ou calorias incorretas | Ajuste calórico/macro |
| Treino | Estímulo insuficiente ou excessivo | Ajuste de programa |
| Recovery | Sono/stress comprometendo adaptação | Lifestyle primeiro |
| Multifatorial | 2+ causas combinadas | Priorizar a maior |
| Externo | Fatores fora do controle do coach | Adaptar expectativas |

---

### FASE 3 — Intervenção Específica (Dia 4-7)

#### Rota A: Problema de Compliance

**Responsável:** `progress-tracker` + coach

1. Conversa honesta (sem julgamento) sobre a realidade da adesão
2. Identificar as TOP 3 barreiras específicas:
   - Ex: "Não consigo cozinhar durante a semana"
   - Ex: "Fim de semana sempre saio do plano"
   - Ex: "Pulo café da manhã e compenso à noite"
3. Para cada barreira, criar solução prática:

```
BARREIRA identificada
│
├─ IF falta de preparo de refeições
│   ├─ Implementar meal prep semanal (template)
│   ├─ Sugerir refeições de 5 minutos para dias corridos
│   └─ Reduzir número de refeições se necessário
│
├─ IF descontrole nos fins de semana
│   ├─ Implementar protocolo de "budget calórico semanal"
│   ├─ Permitir refeição livre planejada
│   └─ Reduzir restrição durante a semana para evitar compensação
│
├─ IF pular refeições
│   ├─ Redistribuir calorias para horários viáveis
│   ├─ Considerar intermittent fasting se compatível
│   └─ Simplificar: menos refeições, mais calóricas
│
└─ IF emocional eating / compulsão
    ├─ NÃO é escopo do coach resolver
    ├─ ENCAMINHAR para psicólogo/nutricionista comportamental
    └─ Adaptar plano para ser menos restritivo enquanto isso
```

4. Simplificar o plano ao mínimo viável que o cliente CONSIGA seguir
5. Monitorar diariamente por 2 semanas

#### Rota B: Problema Nutricional

**Responsável:** `nutrition-scientist`

1. Recalcular necessidades com dados atualizados:
   - Peso atual (não o de quando começou)
   - Nível de atividade REAL (não estimado)
   - Considerar adaptação metabólica

2. Aplicar intervenção conforme situação:

```
SITUAÇÃO NUTRICIONAL
│
├─ IF deficit prolongado (> 12 semanas contínuas)
│   ├─ INTERVENÇÃO: Diet break de 7-14 dias
│   ├─ Subir calorias para manutenção estimada
│   ├─ Manter proteína alta
│   ├─ Manter treino normalmente
│   └─ Após diet break, retomar deficit moderado
│
├─ IF calorias já muito baixas (< TMB)
│   ├─ ALERTA: Não reduzir mais
│   ├─ INTERVENÇÃO: Reverse diet gradual (+100-150 kcal/semana)
│   ├─ Aumentar NEAT (passos diários)
│   ├─ Aceitar manutenção temporária
│   └─ Quando metabolismo estabilizar, criar novo deficit
│
├─ IF macros desbalanceados
│   ├─ Priorizar proteína: ajustar para 2.0-2.4g/kg
│   ├─ Redistribuir carbs/gordura conforme preferência
│   └─ Ajustar timing peri-treino
│
└─ IF calorias reais > planejadas (sub-reporte)
    ├─ Opção 1: Educação + tracking mais preciso
    ├─ Opção 2: Mudar para abordagem por porções (sem contar calorias)
    └─ Opção 3: Plano com refeições fixas (eliminar variabilidade)
```

#### Rota C: Problema de Treino

**Responsável:** `hypertrophy-scientist` + `periodization-architect`

1. Analisar estímulo efetivo por grupo muscular:

```
ANÁLISE DE ESTÍMULO
│
├─ IF volume baixo (< 10 séries/grupo/semana)
│   ├─ Aumentar volume gradualmente (+2 séries/grupo/semana)
│   └─ Manter por 4 semanas antes de reavaliar
│
├─ IF volume alto mas sem progressão
│   ├─ Qualidade > quantidade
│   ├─ Reduzir para MAV (volume mínimo adaptativo)
│   ├─ Focar em progressive overload real
│   └─ Reintroduzir volume gradualmente
│
├─ IF mesmos exercícios > 8 semanas
│   ├─ Variação de exercícios (mesmo padrão motor, novo ângulo)
│   ├─ Variação de rep ranges
│   └─ Considerar novo mesociclo
│
├─ IF RPE consistentemente baixo
│   ├─ Cliente não está treinando pesado o suficiente
│   ├─ Implementar sets com RPE target (8-9)
│   ├─ Usar técnicas de intensidade seletivamente
│   └─ Considerar sessão de treino supervisionada (presencial ou vídeo)
│
└─ IF overreaching detectado
    ├─ INTERVENÇÃO IMEDIATA: Deload de 1 semana
    ├─ Reduzir volume em 40-50%, manter intensidade em 70%
    ├─ Após deload, retomar com volume 10% menor que antes
    └─ Implementar deload programado a cada 4-6 semanas
```

#### Rota D: Problema de Recovery

**Responsável:** `periodization-architect`

1. Priorizar intervenções de lifestyle antes de ajustar treino/dieta:

```
RECOVERY COMPROMETIDA
│
├─ IF sono < 6h/noite
│   ├─ Protocolo de higiene do sono:
│   │   ├─ Horário fixo para dormir (mesmo fins de semana)
│   │   ├─ Sem telas 1h antes de dormir
│   │   ├─ Quarto escuro e fresco
│   │   ├─ Cafeína cortada após 14h
│   │   └─ Considerar magnésio antes de dormir
│   └─ Meta: Melhorar em 0.5-1h nas próximas 2 semanas
│
├─ IF stress > 7/10
│   ├─ Reduzir volume de treino em 20-30%
│   ├─ Manter intensidade mas reduzir séries
│   ├─ Priorizar treinos que o cliente GOSTA
│   ├─ Considerar atividades de recuperação (caminhada, yoga)
│   └─ NÃO adicionar pressão nutricional
│
├─ IF fadiga crônica + dores articulares
│   ├─ DELOAD IMEDIATO (1 semana)
│   ├─ Reavaliar se calorias não estão muito baixas
│   ├─ Checar se treino não está excessivo
│   └─ IF persistir após deload → ENCAMINHAR para médico
│
└─ IF todos os indicadores ruins simultaneamente
    ├─ PAUSA ESTRATÉGICA
    ├─ 1 semana de treino leve (3x/semana, baixo volume)
    ├─ Calorias em manutenção
    ├─ Foco TOTAL em sono e stress
    └─ Reavaliar após 7-10 dias
```

#### Rota E: Multifatorial

**Responsável:** Todos os agents conforme necessidade

1. Ordenar causas por impacto estimado
2. Intervir na causa de MAIOR IMPACTO primeiro
3. NÃO mudar tudo de uma vez (impossível avaliar o que funcionou)
4. Ciclo de 2 semanas por intervenção antes de adicionar a próxima

```
PRIORIZAÇÃO MULTIFATORIAL
│
├─ Prioridade 1 (semanas 1-2): Causa de maior impacto
│   └─ Implementar UMA mudança significativa
│
├─ Prioridade 2 (semanas 3-4): Segunda causa
│   └─ Adicionar segunda mudança SE a primeira estabilizou
│
└─ Prioridade 3 (semanas 5-6): Terceira causa
    └─ Ajuste fino com base nos resultados acumulados
```

---

### FASE 4 — Monitoramento Pós-Intervenção (Semanas 1-4)

**Responsável:** `progress-tracker`

#### Passo 4.1 — Acompanhamento Intensificado

1. Check-ins 2x mais frequentes que o habitual
2. Dados obrigatórios a cada check-in:
   - Peso diário (média móvel)
   - Feedback subjetivo de energia e humor
   - Adesão ao novo plano (%)
   - Cargas de treino (se rota C aplicada)

#### Passo 4.2 — Avaliação de Resposta

```
APÓS 2 SEMANAS de intervenção
│
├─ IF progresso retomou (qualquer métrica melhorou)
│   ├─ INTERVENÇÃO CORRETA
│   ├─ Manter e refinar
│   └─ Reduzir frequência de check-in para normal
│
├─ IF melhora parcial (tendência positiva mas lenta)
│   ├─ INTERVENÇÃO NA DIREÇÃO CERTA
│   ├─ Intensificar levemente a mesma intervenção
│   └─ Dar mais 2 semanas antes de reclassificar
│
├─ IF nenhuma mudança
│   ├─ INTERVENÇÃO INCORRETA ou insuficiente
│   ├─ Reclassificar a causa raiz
│   ├─ Considerar causa secundária como primária
│   └─ Aplicar nova intervenção (diferente rota)
│
└─ IF piorou
    ├─ REVERTER intervenção imediatamente
    ├─ Voltar ao plano anterior
    ├─ Investigação mais profunda necessária
    └─ CONSIDERAR: Encaminhar para avaliação médica
```

---

## Caminhos de Escalação

| Situação | Escalar Para | Ação |
|----------|-------------|------|
| Platô > 8 semanas sem resolução | `fitcoach-chief` | Segunda opinião, reavaliação completa |
| Suspeita de problema hormonal | Endocrinologista | Solicitar exames: TSH, T3, T4, testosterona, cortisol |
| Fadiga crônica persistente | Médico | Hemograma, ferritina, vitamina D, B12 |
| Sinais de overtraining severo | `injury-manager` | Pausa obrigatória, avaliação médica |
| Cliente emocionalmente afetado | `mindset-coach` | Suporte motivacional, ajuste de expectativas |
| Transtorno alimentar suspeitado | Profissional externo | Psicólogo + nutricionista clínico |

---

## Red Flags e Condições de Veto

### VETO — Parar Intervenção e Escalar

- [ ] Perda de cabelo acelerada + fadiga extrema → Possível problema de tireóide
- [ ] Amenorréia (ausência de menstruação) por 3+ meses → RED (Relative Energy Deficiency)
- [ ] Pensamentos obsessivos sobre comida dominando o dia → Transtorno alimentar
- [ ] Lesão desenvolvida durante intensificação de treino → Parar e tratar
- [ ] Cliente verbaliza querer desistir de tudo → Priorizar saúde mental

### ALERTAS — Monitorar de Perto

- [ ] Humor consistentemente irritável → Recovery comprometida
- [ ] Libido em queda significativa → Possível deficit excessivo ou overtraining
- [ ] Performance caindo 2+ semanas consecutivas → Reclassificar urgência
- [ ] Peso oscilando > 2kg/dia → Investigar retenção/hidratação

---

## Checklist de Output

### Ao final da Fase 1 (Coleta):
- [ ] Todos os dados dos últimos 30 dias compilados
- [ ] Tracking preciso de 3 dias coletado
- [ ] Questionário de investigação preenchido pelo cliente

### Ao final da Fase 2 (Diagnóstico):
- [ ] Platô confirmado como real (não percebido)
- [ ] Causa raiz classificada (Compliance/Nutrição/Treino/Recovery/Externo/Multi)
- [ ] Score de recovery calculado
- [ ] Discrepância calórica quantificada

### Ao final da Fase 3 (Intervenção):
- [ ] Rota de intervenção selecionada e justificada
- [ ] Mudanças comunicadas ao cliente com explicação
- [ ] Novo plano (parcial ou total) entregue
- [ ] Frequência de check-in intensificada definida

### Ao final da Fase 4 (Monitoramento):
- [ ] Resposta à intervenção avaliada em 2 semanas
- [ ] Classificação: Resolvido / Melhorando / Sem efeito / Piorou
- [ ] Próximos passos definidos
- [ ] Documentação atualizada no perfil do cliente

---

## Templates

### Template: Questionário de Investigação de Platô

```
📋 INVESTIGAÇÃO DE ESTAGNAÇÃO — Responda com honestidade total

1. Nos últimos 7 dias, quantos treinos você realmente fez? ___/___

2. De 0 a 10, qual foi sua adesão alimentar REAL esta semana? ___
   (0 = não segui nada, 10 = segui 100%)

3. Você comeu algo que não registrou nos últimos 7 dias?
   ⬜ Não ⬜ Sim — O quê? _______________

4. Quantas horas você dormiu por noite em média? ___h

5. Qualidade do sono (1-10): ___

6. Nível de stress atual (1-10): ___
   Principal fonte de stress: _______________

7. Consumiu álcool nos últimos 7 dias?
   ⬜ Não ⬜ Sim — Quantidade: _______________

8. Alguma medicação nova ou mudança de dose? _______________

9. Nível de energia nos treinos (1-10): ___

10. Alguma dor ou desconforto durante os treinos? _______________

11. Nivel de motivação atual (1-10): ___

12. Na sua opinião, por que você acha que parou de progredir?
    _______________________________________________

13. Tem algo na sua vida pessoal que mudou recentemente?
    _______________________________________________
```

### Template: Relatório de Diagnóstico de Platô

```
# DIAGNÓSTICO DE PLATÔ — [NOME DO CLIENTE]

Data: [DATA]
Duração da estagnação: [X] semanas
Coach: [NOME]

## Dados Analisados
- Período: [DATA INÍCIO] a [DATA FIM]
- Peso médio semanal: [TENDÊNCIA]
- Volume de treino: [TENDÊNCIA]
- Calorias planejadas vs reais: [X] vs [Y] ([Z]% diferença)

## Classificação
- Tipo de platô: [REAL / PERCEBIDO]
- Causa raiz primária: [COMPLIANCE/NUTRIÇÃO/TREINO/RECOVERY/EXTERNO]
- Causa secundária: [SE APLICÁVEL]
- Severidade: [LEVE/MODERADO/SEVERO]

## Recovery Score: [X]/8
- Sono: [X]/2
- Stress: [X]/2
- Energia: [X]/2
- Dores: [X]/2

## Intervenção Aplicada
- Rota: [A/B/C/D/E]
- Mudanças específicas:
  1. [MUDANÇA 1]
  2. [MUDANÇA 2]
  3. [MUDANÇA 3]

## Monitoramento
- Próximo check-in intensificado: [DATA]
- Reavaliação de resposta: [DATA — 2 semanas]
- Métricas a acompanhar: [LISTA]

## Status: [EM INVESTIGAÇÃO / INTERVENÇÃO APLICADA / RESOLVIDO]
```

---

## Notas Finais

- A maioria dos platos em clientes não-avançados é causada por compliance, não por fisiologia. Investigue a realidade antes de ajustar o plano.
- Diet breaks são subutilizados. Após 12+ semanas de deficit, uma pausa planejada geralmente acelera resultados a médio prazo.
- NUNCA reduza calorias abaixo da TMB como solução para platô. Se o cliente já está muito baixo, a resposta é subir, não descer.
- Mudanças de programa de treino por si só raramente quebram platô de composição corporal. O estímulo de treino precisa ser adequado, não novo.
- O fator mais negligenciado em platôs é o stress e o sono. Nenhum plano perfeito compensa 5 horas de sono por noite.
