# Playbook: Preparação para Competição — Timeline de 16 Semanas

## Propósito

Este playbook define a timeline completa de preparação para competição de fisiculturismo/bodybuilding, desde 16 semanas pré-show até o reverse diet pós-competição. Cobre todas as fases, decisões semanais, condições de veto para proteger a saúde do atleta e protocolos específicos para peak week e show day.

---

## Triggers — Quando Usar Este Playbook

- Atleta confirmou inscrição em competição com 16+ semanas de antecedência
- Atleta quer avaliar viabilidade de competir (usar Fase 0 apenas)
- Atleta em offseason precisa de timeline para decidir quando iniciar prep
- Coach precisa estruturar primeira prep de um atleta

---

## Pré-requisitos

- [ ] Atleta com mínimo de 2 anos de treino consistente
- [ ] Percentual de gordura estimado: homens < 18%, mulheres < 25% (ponto de partida)
- [ ] Massa muscular suficiente para a categoria escolhida
- [ ] Exames de sangue recentes (< 3 meses): hemograma, hormônios, lipídios, glicemia
- [ ] Avaliação psicológica informal: motivação, suporte social, histórico com restrição
- [ ] Fotos baseline em pose de competição (frente, costas, lateral, mais musculares)
- [ ] Compromisso total confirmado por escrito (expectativas claras)
- [ ] Sem histórico de transtorno alimentar ativo (VETO ABSOLUTO se presente)

---

## Agents Envolvidos

| Agent | Papel no Playbook | Fases Principais |
|-------|-------------------|------------------|
| `prep-master` | Coordenação geral da prep, decisões semanais, check-ins | Todas |
| `nutrition-scientist` | Protocolo nutricional, ajustes calóricos, peak week nutrition | 1-5 |
| `periodization-architect` | Periodização de treino, cardio, deload | 1-4 |
| `elite-coach` | Posing, apresentação, estratégia de palco, mentoria | 3-5 |

---

## Árvore de Decisão — Fase 0: Viabilidade

```
AVALIAR viabilidade da prep
│
├─ IF gordura corporal muito alta para 16 semanas
│   ├─ Calcular: (BF atual - BF alvo) / 16 = taxa semanal necessária
│   ├─ IF taxa > 0.7% BF/semana → NÃO VIÁVEL em 16 semanas
│   ├─ OPÇÃO: Iniciar mini-cut antes e começar prep depois
│   └─ OPÇÃO: Competir em data posterior
│
├─ IF massa muscular insuficiente para categoria
│   ├─ Feedback honesto ao atleta
│   ├─ OPÇÃO: Competir em categoria mais leve
│   ├─ OPÇÃO: Mais 6-12 meses de offseason
│   └─ NUNCA iniciar prep sabendo que vai perder por falta de tamanho
│
├─ IF primeiro prep do atleta
│   ├─ Adicionar 2-4 semanas de buffer (iniciar com 18-20 semanas)
│   ├─ Ser mais conservador em todas as fases
│   └─ Maior foco em educação e posing desde o início
│
├─ IF saúde mental questionável
│   ├─ Conversa séria sobre os desafios da prep
│   ├─ Se histórico de TCA → VETO ABSOLUTO
│   ├─ Se momento de vida muito estressante → RECOMENDAR adiar
│   └─ Documentar que o atleta foi informado dos riscos
│
└─ IF tudo OK
    └─ APROVAR início da prep → Prosseguir para Fase 1
```

---

## Execução Semana a Semana

### FASE 1 — Semanas 16-13 (Setup Phase)

**Foco:** Estabelecer deficit inicial, adaptar rotina, baseline de dados

**Responsável:** `prep-master` + `nutrition-scientist`

#### Protocolo Nutricional — Semanas 16-13

```
DEFICIT INICIAL
│
├─ Calcular manutenção real (média de peso das últimas 2 semanas de offseason)
├─ Implementar deficit de 15-20% (conservador)
├─ Proteína: 2.2-2.8g/kg de peso corporal
├─ Gordura: não menos que 0.7g/kg
├─ Carboidrato: restante das calorias
├─ Refeeds: 1x/semana no dia de treino mais pesado (+15-20% calorias, via carbs)
│
└─ META: Perder 0.5-0.8% do peso corporal por semana
```

#### Protocolo de Treino — Semanas 16-13

```
TREINO FASE 1
│
├─ Manter o programa de offseason (ou similar)
├─ Volume: Manutenção ou leve redução (MAV → MEV gradual ao longo da prep)
├─ Intensidade: Manter cargas o máximo possível
├─ Cardio: Mínimo necessário (2-3x/semana, 20-30min, LISS)
│
└─ REGRA: Nunca adicionar cardio E reduzir calorias na mesma semana
```

#### Check-in Semanal — Decision Tree

```
A CADA SEMANA, avaliar:
│
├─ IF perda de peso dentro do alvo (0.5-0.8%/semana)
│   └─ MANTER tudo igual — não mexer no que está funcionando
│
├─ IF perda > 1%/semana
│   ├─ ALERTA: Muito rápido
│   ├─ IF semana 1-2 → Pode ser perda de água, monitorar
│   ├─ IF semana 3+ → Reduzir deficit (adicionar 100-150 kcal)
│   └─ Monitorar sinais de perda muscular
│
├─ IF perda < 0.3%/semana por 2 semanas consecutivas
│   ├─ OPÇÃO A: Reduzir calorias em 100-150 kcal
│   ├─ OPÇÃO B: Adicionar 1-2 sessões de cardio (20min)
│   └─ ESCOLHER apenas UMA opção, nunca ambas simultaneamente
│
└─ IF peso subiu
    ├─ IF acompanhado de retenção (sódio, ciclo, stress) → Ignorar, esperar
    ├─ IF 2+ semanas subindo → Investigar compliance
    └─ IF compliance OK → Reavaliar cálculo de manutenção
```

---

### FASE 2 — Semanas 12-9 (Deep Cut Phase)

**Foco:** Aprofundar deficit progressivamente, manter massa muscular, iniciar posing

#### Protocolo Nutricional — Semanas 12-9

```
AJUSTES FASE 2
│
├─ Deficit acumulado: 20-30% abaixo da manutenção original
├─ Ajustes SOMENTE se progresso estagnou (ver decision tree)
├─ Refeeds: Manter 1x/semana (aumentar para 2x se sinais de fadiga severa)
├─ Proteína: Manter ou aumentar levemente (até 3.0g/kg)
├─ Gordura: Nunca abaixo de 0.5g/kg (saúde hormonal)
│
├─ IF sinais de adaptação metabólica severa
│   ├─ Considerar diet break de 5-7 dias (calorias em manutenção)
│   ├─ NÃO é atraso, é investimento em sustentabilidade
│   └─ Retomar deficit após diet break
│
└─ META: Continuar 0.5-0.7%/semana de perda
```

#### Protocolo de Treino — Semanas 12-9

```
TREINO FASE 2
│
├─ Volume: Reduzir 10-20% vs Fase 1 (priorizar estímulo sobre volume)
├─ Intensidade: Manter cargas pesadas nos compostos
├─ Cardio: Ajustar conforme necessidade (max 4x/semana, 30-40min)
├─ Deload na semana 12 ou 10 (conforme fadiga acumulada)
│
├─ IF força caindo > 10% nos lifts principais
│   ├─ ALERTA: Possível perda muscular
│   ├─ Reavaliar deficit (está agressivo demais?)
│   ├─ Reavaliar recovery (sono, stress)
│   └─ Considerar reduzir volume em vez de carga
│
└─ INICIAR prática de posing 2x/semana com elite-coach
```

#### Posing — Início (Semana 12)

**Responsável:** `elite-coach`

1. Avaliar poses obrigatórias da categoria
2. Identificar pontos fortes para destacar
3. Identificar pontos fracos para minimizar
4. Estabelecer rotina de prática: 2x/semana, 15-20 minutos
5. Gravar vídeos para feedback

---

### FASE 3 — Semanas 8-5 (Refinement Phase)

**Foco:** Detalhamento, condicionamento final, ajustes finos, posing intensificado

#### Protocolo Nutricional — Semanas 8-5

```
AJUSTES FASE 3
│
├─ Deficit pode chegar a 30-40% abaixo da manutenção original
├─ Carboidratos no mínimo necessário para performance no treino
├─ Refeeds: 1-2x/semana conforme resposta individual
├─ Suplementação de apoio:
│   ├─ Multivitamínico (compensar menor variedade alimentar)
│   ├─ Omega-3 (se gordura muito restrita)
│   ├─ Creatina (manter, não parar durante prep)
│   ├─ Cafeína (com moderação, tolerância se ajusta)
│   └─ Eletrólitos (se cardio alto ou clima quente)
│
├─ IF fome incontrolável + irritabilidade severa
│   ├─ Implementar refeed estratégico
│   ├─ Ajustar composição das refeições (mais volume, menos densidade)
│   └─ Verificar se gordura não está muito baixa (< 0.5g/kg)
│
└─ CHECKPOINT semana 8: Está no shape para chegar pronto?
    ├─ IF sim → Manter ritmo atual
    ├─ IF não → Avaliar se a data é viável
    └─ IF muito longe → Conversa honesta sobre expectativas/desistir
```

#### Monitoramento de Saúde — Obrigatório

```
CHECKLIST DE SAÚDE FASE 3
│
├─ Exames de sangue (repetir na semana 8):
│   ├─ Hemograma completo
│   ├─ TSH, T3, T4 livre
│   ├─ Testosterona total e livre (homens)
│   ├─ Estradiol, progesterona (mulheres)
│   ├─ Cortisol
│   └─ Glicemia de jejum
│
├─ AVALIAR resultados:
│   ├─ IF hormônios em queda significativa MAS dentro do aceitável
│   │   └─ Documentar, monitorar, continuar
│   ├─ IF hormônios fora da faixa segura
│   │   └─ VETO: Parar prep ou suavizar significativamente
│   └─ IF hemograma com alterações
│       └─ Consulta médica obrigatória antes de continuar
│
├─ MULHERES — Ciclo menstrual:
│   ├─ IF menstruação normal → OK
│   ├─ IF irregular → ALERTA, monitorar de perto
│   └─ IF amenorréia → VETO PARCIAL: Aumentar calorias imediatamente
│
└─ AMBOS — Saúde mental:
    ├─ IF isolamento social crescente → Conversa de suporte
    ├─ IF pensamentos obsessivos sobre comida → ALERTA ALTO
    ├─ IF relação com comida deteriorando → Avaliar parar prep
    └─ IF ansiedade/depressão severa → VETO: Saúde > competição
```

---

### FASE 4 — Semanas 4-2 (Final Push)

**Foco:** Últimos ajustes, preparação mental, ensaio de peak week

#### Protocolo Nutricional — Semanas 4-2

```
FASE FINAL
│
├─ Calorias no ponto mais baixo da prep
├─ NÃO fazer ajustes drásticos — pequenos refinamentos apenas
├─ Refeeds mantidos para sustentar treinos e sanidade
├─ Começar a planejar peak week com detalhes
│
├─ IF condicionamento quase pronto na semana 4
│   ├─ Reduzir ritmo de perda (coast to the show)
│   ├─ Ligeiro aumento de calorias para manter fullness
│   └─ Foco em apresentação e posing
│
├─ IF ainda falta condicionamento na semana 4
│   ├─ Aceitar que não vai chegar 100%
│   ├─ NÃO fazer crash diet de última hora
│   ├─ Apresentar o melhor shape possível
│   └─ Usar como experiência para próxima prep
│
└─ IF atleta está ahead of schedule
    ├─ EXCELENTE posição
    ├─ Refeed mais generoso (1-2 dias/semana)
    ├─ Manter massa muscular ao máximo
    └─ Ensaiar peak week protocol
```

#### Posing Intensificado — Semanas 4-2

**Responsável:** `elite-coach`

1. Prática diária de posing (20-30 minutos)
2. Ensaio de rotina completa com música (se free posing)
3. Prática com roupas de competição
4. Sessão de fotos em poses para avaliar ângulos e ajustes
5. Feedback detalhado sobre cada pose obrigatória
6. Trabalhar expressão facial e presença de palco
7. Simular condições de competição (luzes, público, tempo)

---

### FASE 5 — Peak Week (Semana Final)

**Foco:** Manipulação final para apresentação no palco

**Responsável:** `prep-master` + `nutrition-scientist` (coordenação diária)

#### Protocolo de Peak Week

```
IMPORTANTE: Peak week NÃO resolve uma prep ruim.
O objetivo é OTIMIZAR o que já está construído, não transformar.

DIA 7 (domingo antes do show):
├─ Treino full body leve (pump, não fadiga)
├─ Carboidratos moderados
├─ Água: Normal (3-4L)
├─ Sódio: Normal
└─ Último treino pesado de depletion (se usar protocolo de carb load)

DIA 6 (segunda):
├─ IF usando protocolo de depletion/load:
│   ├─ Carboidratos baixos (0.5-1g/kg)
│   ├─ Treino de depleção (alto rep, baixo peso)
│   └─ Água: Normal
├─ IF usando protocolo conservador (RECOMENDADO para primeira prep):
│   ├─ Carboidratos moderados (manter constante)
│   └─ Sem manipulação drástica
└─ Sódio: Normal

DIA 5 (terça):
├─ Depletion: Carbs ainda baixos, treino leve ou off
├─ Conservador: Manter constante
├─ Água: Normal
└─ Sódio: Normal

DIA 4 (quarta):
├─ INÍCIO DO CARB LOAD (se usar protocolo):
│   ├─ Carbs: 3-5g/kg (distribuir ao longo do dia)
│   ├─ Fontes: Arroz branco, batata, pão branco (fácil digestão)
│   ├─ Gordura: Mínima
│   └─ Proteína: Manter
├─ Conservador: Leve aumento de carbs
├─ Água: Normal
└─ Sódio: Começar a reduzir levemente

DIA 3 (quinta):
├─ Carb load: Continuar 3-5g/kg
├─ Avaliar visual: Músculos enchendo?
│   ├─ IF sim, bom visual → Manter
│   ├─ IF flat demais → Aumentar carbs levemente
│   └─ IF spilling (retendo água subcutânea) → Reduzir carbs
├─ Água: Começar a reduzir para 2-3L
└─ Sódio: Baixo

DIA 2 (sexta — véspera):
├─ Carbs: Moderados (ajustar conforme visual)
├─ Refeições pequenas e frequentes
├─ Água: 1-1.5L (sips throughout the day)
├─ Sódio: Mínimo
├─ Prática final de posing
├─ Preparar tudo: roupa, bronzeamento, maquiagem, comida do backstage
└─ DORMIR CEDO

DIA 1 (sábado — SHOW DAY):
├─ Café da manhã: Refeição testada antes (carbs + proteína moderados)
├─ Água: Sips apenas
├─ Backstage: Snacks preparados (rice cakes, mel, banana, chocolate)
├─ 30 min antes do palco: Pump up (bandas elásticas, flexões, curls)
├─ Snack pré-palco: Carboidrato rápido + mel ou doce
├─ NO PALCO: Dar tudo
└─ PÓS-SHOW: Refeição celebratória (controlada, não binge)
```

#### Decision Tree — Visual Check Durante Peak Week

```
VISUAL CHECK diário (fotos na mesma luz, mesmo horário)
│
├─ IF músculos cheios + pele fina + vascularização visível
│   └─ PERFEITO — Manter protocolo, não mudar NADA
│
├─ IF flat (músculos vazios, sem volume)
│   ├─ Aumentar carboidratos (+50-100g)
│   ├─ Garantir hidratação adequada
│   └─ NÃO PANIQUEAR — flat na quinta pode ser cheio no sábado
│
├─ IF spilling (retendo água, perdendo definição)
│   ├─ Reduzir carboidratos levemente
│   ├─ Aumentar proteína temporariamente
│   ├─ Caminhada leve (20-30min) para drenar
│   └─ NÃO cortar água drasticamente
│
└─ IF incerto (não sabe avaliar)
    ├─ Manter protocolo conservador
    ├─ Enviar fotos para prep-master IMEDIATAMENTE
    └─ NUNCA fazer ajustes radicais sem orientação
```

---

### FASE 6 — Pós-Competição e Reverse Diet

**Foco:** Transição segura, saúde hormonal, prevenção de binge, rebuild

**Responsável:** `prep-master` + `nutrition-scientist`

#### Protocolo de Reverse Diet

```
SEMANA 1 PÓS-SHOW:
├─ Aumentar calorias para manutenção estimada (+500-800 kcal vs final de prep)
├─ NÃO voltar direto para calorias de offseason
├─ Proteína: Manter alta (2.0-2.4g/kg)
├─ Gordura: Aumentar significativamente (saúde hormonal)
├─ Carboidrato: Aumento gradual
├─ Treino: Volume baixo, intensidade moderada
└─ Cardio: Reduzir para 2x/semana, depois eliminar

SEMANAS 2-4:
├─ Aumentar 100-200 kcal por semana
├─ Peso vai subir — ISSO É NORMAL E ESPERADO
├─ Explicar ao atleta: glicogênio, água, conteúdo intestinal
├─ Foco: Estabilizar metabolismo, não em composição corporal
└─ Monitorar saúde mental (período vulnerável para TCA)

SEMANAS 5-8:
├─ Continuar aumentando até manutenção real
├─ Reintroduzir variedade alimentar gradualmente
├─ Retomar volume de treino progressivamente
├─ Exames de sangue de controle (semana 8)
└─ Avaliar próximo ciclo (offseason ou próxima competição)

ALERTA MÁXIMO: Binge eating pós-show
├─ É a consequência mais comum e perigosa do pós-competição
├─ IF atleta relata episódios de compulsão
│   ├─ NÃO julgar
│   ├─ Aumentar calorias mais rapidamente
│   ├─ Remover qualquer restrição alimentar
│   └─ ENCAMINHAR para acompanhamento psicológico se persistir
└─ Prevenção: Reverse diet planejado + expectativas claras + suporte
```

---

## Caminhos de Escalação

| Situação | Escalar Para | Ação |
|----------|-------------|------|
| Exames de sangue fora da faixa | Médico/endocrinologista | Avaliação + possível pausa na prep |
| Amenorréia | Ginecologista + nutricionista clínico | Aumentar calorias, reavaliar prep |
| Transtorno alimentar emergindo | Psicólogo especializado | Prioridade sobre competição |
| Lesão durante prep | `injury-manager` | Ativar playbook crise-lesao-mid-prep.md |
| Atleta quer desistir | `elite-coach` + `mindset-coach` | Avaliar motivos, apoiar decisão |
| Performance de palco ruim | `elite-coach` | Intensificar posing, coaching mental |

---

## Red Flags e Condições de Veto

### VETO TOTAL — Parar Prep Imediatamente

- [ ] Desmaio durante treino ou cardio
- [ ] Pensamentos suicidas ou autolesivos
- [ ] Amenorréia por 3+ meses (mulheres)
- [ ] Frequência cardíaca de repouso < 40 bpm (sem ser atleta cardio)
- [ ] Perda de cabelo severa + fadiga extrema + intolerância ao frio (tireóide)
- [ ] Lesão que impossibilita treino por > 2 semanas
- [ ] Transtorno alimentar ativo (binge-purge, restrição severa)

### VETO PARCIAL — Suavizar Prep, Reavaliar Continuidade

- [ ] Perda de força > 20% nos lifts principais
- [ ] Libido completamente ausente por 4+ semanas
- [ ] Insônia severa por 2+ semanas consecutivas
- [ ] Humor depressivo persistente
- [ ] Relações pessoais deteriorando significativamente
- [ ] Menstruação irregular por 2+ ciclos (mulheres)

### ALERTAS — Monitorar Intensivamente

- [ ] Fome constante classificada como "insuportável"
- [ ] Irritabilidade afetando trabalho/relacionamentos
- [ ] Pensamentos obsessivos sobre comida
- [ ] Isolamento social voluntário
- [ ] Dificuldade de concentração no trabalho/estudo

---

## Checklist de Output

### Ao final de cada semana de prep:
- [ ] Check-in completo registrado (peso, fotos, medidas, feedback)
- [ ] Decision tree aplicada (manter/ajustar/escalar)
- [ ] Ajustes documentados com justificativa
- [ ] Saúde mental avaliada informalmente

### Checkpoints críticos:
- [ ] Semana 16: Prep iniciada, baseline documentada, exames OK
- [ ] Semana 12: Posing iniciado, primeiro check de progresso
- [ ] Semana 8: Exames de sangue repetidos, checkpoint de viabilidade
- [ ] Semana 4: Posing intensificado, peak week planejada
- [ ] Semana 1: Peak week executada, show day preparado
- [ ] Pós-show: Reverse diet iniciado, saúde mental monitorada

---

## Templates

### Template: Check-in Semanal de Prep

```
📊 PREP CHECK-IN — Semana [X] de 16

Atleta: _______________
Data: _______________
Semanas restantes: [X]

PESO (média semanal): _____ kg
VARIAÇÃO vs semana anterior: _____ kg
VARIAÇÃO TOTAL desde início: _____ kg

CIRCUNFERÊNCIAS:
- Cintura: _____ cm
- Braço: _____ cm
- Coxa: _____ cm

TREINO:
- Sessões realizadas: ___/___
- Força mantida? ⬜ Sim ⬜ Parcial ⬜ Não
- RPE médio: ___/10
- Cardio realizado: ___x/semana, ___min

NUTRIÇÃO:
- Calorias médias: _____ kcal
- Adesão: _____%
- Fome (1-10): ___
- Refeeds realizados: ___x

RECOVERY:
- Sono (horas): ___h | Qualidade: ___/10
- Energia: ___/10
- Stress: ___/10
- Humor: ___/10
- Libido: ___/10

FOTOS: ⬜ Frente relaxado ⬜ Costas relaxado ⬜ Lateral
        ⬜ Frente contraído ⬜ Costas contraído ⬜ Most muscular

OBSERVAÇÕES DO ATLETA:
_________________________________

DECISÃO DO COACH: ⬜ Manter ⬜ Ajustar ⬜ Escalar
AJUSTES: _________________________________
```

### Template: Plano de Peak Week

```
# PEAK WEEK PLAN — [NOME DO ATLETA]

Show: [NOME DA COMPETIÇÃO]
Data: [DATA]
Categoria: [CATEGORIA]
Horário estimado no palco: [HORÁRIO]

## Protocolo Selecionado: [CONSERVADOR / DEPLETION-LOAD]

| Dia | Carbs (g) | Proteína (g) | Gordura (g) | Água (L) | Sódio | Treino |
|-----|-----------|-------------|-------------|----------|-------|--------|
| Dom (7) | [X] | [X] | [X] | [X] | Normal | Full body leve |
| Seg (6) | [X] | [X] | [X] | [X] | Normal | [Depletion/Off] |
| Ter (5) | [X] | [X] | [X] | [X] | Normal | Off |
| Qua (4) | [X] | [X] | [X] | [X] | Reduzir | Posing only |
| Qui (3) | [X] | [X] | [X] | [X] | Baixo | Posing only |
| Sex (2) | [X] | [X] | [X] | [X] | Mínimo | Posing final |
| Sáb (1) | [X] | [X] | [X] | Sips | Mínimo | Pump up |

## Comida Backstage
- [ ] [ITEM 1 — quantidade]
- [ ] [ITEM 2 — quantidade]
- [ ] [ITEM 3 — quantidade]
- [ ] Mel/doce para pré-palco
- [ ] Água (sips controlados)

## Checklist Show Day
- [ ] Bronzeamento aplicado
- [ ] Roupa de competição
- [ ] Número de competidor
- [ ] Bandas elásticas para pump up
- [ ] Toalha + glaze/óleo
- [ ] Comida backstage empacotada
- [ ] Música para free posing (se aplicável, USB + backup)
- [ ] Documento com poses obrigatórias anotadas
```

---

## Notas Finais

- Peak week NÃO salva uma prep ruim. Se o shape não está pronto na semana 4, aceite e apresente o melhor possível.
- O pós-competição é TÃO IMPORTANTE quanto a prep. Reverse diet mal feito causa mais danos que a prep inteira.
- A saúde do atleta SEMPRE vem antes do troféu. Um coach que coloca resultado acima da saúde não é um bom coach.
- Primeira prep deve ser conservadora. É uma experiência de aprendizado. A segunda será muito melhor.
- Documente TUDO. Dados desta prep são ouro para a próxima.
