# Playbook: Onboarding Completo de Novo Cliente

## Propósito

Este playbook define o processo completo de onboarding de um novo cliente, desde o primeiro contato até o final da primeira semana de acompanhamento. O objetivo é garantir uma experiência estruturada, segura e personalizada que maximize a retenção e estabeleça as bases para resultados consistentes.

---

## Triggers — Quando Usar Este Playbook

- Novo cliente fechou contrato/pagamento confirmado
- Cliente retornando após pausa superior a 6 meses (tratar como novo)
- Migração de cliente de outro coach (adaptar fases 1-2, manter fases 3-5)
- Cliente que mudou radicalmente de objetivo (ex: saúde geral → competição)

---

## Pré-requisitos

- [ ] Contrato assinado e pagamento confirmado
- [ ] Acesso ao sistema de gestão de clientes configurado
- [ ] Template de anamnese atualizado (versão mais recente)
- [ ] Agenda com slots disponíveis para avaliação física
- [ ] Kit de boas-vindas digital preparado (PDF ou link)
- [ ] Canal de comunicação definido (WhatsApp Business, app, email)
- [ ] Formulário de termos de responsabilidade enviado e assinado

---

## Agents Envolvidos

| Agent | Papel no Playbook | Fase Principal |
|-------|-------------------|----------------|
| `intake-analyst` | Coleta e análise de dados iniciais, anamnese, classificação de risco | Fase 1-2 |
| `training-builder` | Montagem do programa de treino inicial | Fase 3 |
| `diet-builder` | Montagem do plano alimentar inicial | Fase 3 |
| `automation-engineer` | Configuração de automações de check-in e lembretes | Fase 4-5 |

---

## Árvore de Decisão Principal

### Classificação do Nível do Cliente

```
INÍCIO: Avaliar experiência de treino
│
├─ IF tempo de treino < 6 meses OU nunca treinou
│   └─ CLASSIFICAR como INICIANTE
│       ├─ Programa: Full Body 3x/semana
│       ├─ Foco: Aprendizado motor, hábito, adesão
│       ├─ Progressão: Semanal por volume (séries)
│       └─ Check-in: Diário na primeira semana
│
├─ IF tempo de treino 6 meses a 2 anos COM consistência
│   └─ CLASSIFICAR como INTERMEDIÁRIO
│       ├─ Programa: Upper/Lower ou Push/Pull/Legs
│       ├─ Foco: Progressão de carga, periodização básica
│       ├─ Progressão: Semanal por carga ou volume
│       └─ Check-in: 3x/semana na primeira semana
│
└─ IF tempo de treino > 2 anos COM progressão documentada
    └─ CLASSIFICAR como AVANÇADO
        ├─ Programa: Baseado no histórico e objetivo específico
        ├─ Foco: Otimização, periodização avançada
        ├─ Progressão: Conforme mesociclo planejado
        └─ Check-in: 2x/semana na primeira semana
```

### Decisão de Objetivo Primário

```
OBJETIVO declarado pelo cliente
│
├─ IF emagrecimento / perda de gordura
│   ├─ Prioridade: Déficit calórico moderado + treino de força
│   ├─ Métrica principal: Peso + circunferências + fotos
│   └─ Frequência de pesagem: Diária (média semanal)
│
├─ IF ganho de massa muscular / hipertrofia
│   ├─ Prioridade: Superávit calórico controlado + treino progressivo
│   ├─ Métrica principal: Carga no treino + circunferências + fotos
│   └─ Frequência de pesagem: 3x/semana
│
├─ IF saúde geral / qualidade de vida
│   ├─ Prioridade: Consistência + hábitos sustentáveis
│   ├─ Métrica principal: Adesão ao plano + bem-estar subjetivo
│   └─ Frequência de pesagem: Semanal
│
├─ IF performance / competição
│   ├─ Redirecionar para playbook: prep-competicao-16-semanas.md
│   └─ Adaptar onboarding para timeline competitiva
│
└─ IF reabilitação / pós-lesão
    ├─ OBRIGATÓRIO: Liberação médica por escrito
    ├─ Prioridade: Segurança + mobilidade + fortalecimento gradual
    └─ Coordenação com fisioterapeuta (se aplicável)
```

---

## Execução Passo a Passo

### FASE 1 — Primeiro Contato (Dia 0)

**Responsável:** `intake-analyst`
**Duração:** 30-60 minutos
**Formato:** Videochamada ou presencial

#### Passo 1.1 — Boas-vindas e Expectativas

1. Enviar mensagem de boas-vindas padronizada (template abaixo)
2. Agendar call de intake dentro de 24h após confirmação de pagamento
3. Enviar formulário de anamnese ANTES da call (cliente preenche com antecedência)
4. Preparar pasta do cliente no sistema de gestão

#### Passo 1.2 — Call de Intake

1. Revisar anamnese preenchida antes da call
2. Confirmar dados e aprofundar pontos críticos:
   - Histórico de lesões (detalhamento)
   - Medicamentos em uso (verificar interações com exercício)
   - Rotina diária real (acordar, trabalho, sono, refeições)
   - Experiências anteriores com dieta e treino
   - O que funcionou e o que não funcionou no passado
3. Definir objetivo SMART junto com o cliente:
   - Specific: O que exatamente quer alcançar?
   - Measurable: Como vamos medir progresso?
   - Achievable: É realista no prazo proposto?
   - Relevant: Conectado com motivação real do cliente?
   - Time-bound: Qual o prazo desejado?
4. Alinhar expectativas de comunicação:
   - Frequência de check-ins
   - Tempo de resposta esperado (ambos os lados)
   - Canal principal e canal de emergência
5. Documentar tudo no perfil do cliente

#### Passo 1.3 — Classificação de Risco

```
AVALIAR respostas da anamnese
│
├─ IF PAR-Q positivo (qualquer SIM)
│   ├─ OBRIGATÓRIO: Solicitar liberação médica
│   ├─ NÃO iniciar treino até receber liberação
│   └─ Documentar restrições médicas no perfil
│
├─ IF IMC > 35 OU < 17
│   ├─ RECOMENDADO: Avaliação médica prévia
│   ├─ Adaptar intensidade inicial para muito baixa
│   └─ Monitoramento mais frequente na primeira semana
│
├─ IF histórico de transtorno alimentar
│   ├─ OBRIGATÓRIO: Abordagem não-restritiva
│   ├─ NÃO fornecer plano com contagem calórica rígida
│   ├─ Foco em hábitos e relação saudável com comida
│   └─ CONSIDERAR: Encaminhamento para nutricionista clínico
│
├─ IF idade > 60 anos
│   ├─ Solicitar exames recentes (ergométrico, check-up)
│   ├─ Adaptar programa para segurança articular
│   └─ Progressão mais conservadora
│
└─ IF nenhum red flag
    └─ Prosseguir para Fase 2 normalmente
```

---

### FASE 2 — Avaliação Física (Dia 1-2)

**Responsável:** `intake-analyst`
**Duração:** 45-60 minutos
**Formato:** Presencial (ideal) ou guiado por vídeo

#### Passo 2.1 — Coleta de Dados Antropométricos

1. Peso corporal (manhã, em jejum, após ir ao banheiro)
2. Altura
3. Circunferências (protocolo de 7 pontos):
   - Pescoço
   - Peitoral (na linha dos mamilos)
   - Braço relaxado (ponto médio entre ombro e cotovelo)
   - Cintura (na cicatriz umbilical)
   - Quadril (ponto mais largo)
   - Coxa (ponto médio entre virilha e joelho)
   - Panturrilha (ponto mais largo)
4. Fotos padronizadas (frente, costas, lateral direita, lateral esquerda):
   - Mesma iluminação
   - Mesma distância
   - Mesma roupa (preferencialmente mínima)
   - Postura neutra, relaxado

#### Passo 2.2 — Avaliação de Movimento

1. Overhead Squat Assessment (mobilidade geral)
2. Single Leg Balance (estabilidade)
3. Push-up Assessment (força relativa upper body)
4. Active Straight Leg Raise (mobilidade posterior)
5. Shoulder Mobility (alcance posterior)

```
RESULTADO da avaliação de movimento
│
├─ IF limitações significativas de mobilidade
│   ├─ Incluir trabalho de mobilidade no aquecimento (10-15 min)
│   ├─ Adaptar exercícios para ROM disponível
│   └─ Reavaliar em 4 semanas
│
├─ IF assimetrias laterais evidentes
│   ├─ Priorizar exercícios unilaterais
│   ├─ Investigar histórico de lesão no lado afetado
│   └─ Documentar para acompanhamento
│
└─ IF avaliação dentro do esperado
    └─ Programação padrão para o nível classificado
```

#### Passo 2.3 — Estimativa de Capacidade Atual

Para INICIANTES:
- Teste de repetições máximas em exercícios básicos com carga leve
- Foco em técnica, não em carga
- Registrar RPE subjetivo

Para INTERMEDIÁRIOS:
- Estimativa de 1RM via teste de 5RM nos principais lifts
- Avaliação de volume tolerado (séries/sessão histórico)
- Registro de exercícios que domina com boa técnica

Para AVANÇADOS:
- Revisão de planilha de treino anterior
- Teste de 3RM ou 1RM conforme objetivo
- Análise de pontos fracos relativos

---

### FASE 3 — Montagem do Plano (Dia 2-3)

**Responsável:** `training-builder` + `diet-builder`
**Duração:** 2-4 horas de trabalho interno

#### Passo 3.1 — Programa de Treino (`training-builder`)

1. Selecionar template base conforme classificação:

   | Nível | Split | Frequência | Volume Total Semanal |
   |-------|-------|------------|---------------------|
   | Iniciante | Full Body | 3x/semana | 10-14 séries/grupo |
   | Intermediário | Upper/Lower | 4x/semana | 14-18 séries/grupo |
   | Avançado | PPL ou Específico | 5-6x/semana | 16-22 séries/grupo |

2. Personalizar exercícios baseado na avaliação:
   - Substituir exercícios incompatíveis com limitações
   - Incluir mobilidade específica no aquecimento
   - Ajustar exercícios unilaterais se assimetrias identificadas

3. Definir parâmetros de progressão:
   - Critério de aumento de carga (ex: completou todas as reps com RPE < 8)
   - Incremento mínimo sugerido
   - Quando solicitar vídeo para verificação de técnica

4. Formatar e disponibilizar no app/planilha do cliente

#### Passo 3.2 — Plano Alimentar (`diet-builder`)

1. Calcular necessidade calórica:
   - TMB via fórmula de Mifflin-St Jeor
   - Multiplicar pelo fator de atividade
   - Aplicar ajuste conforme objetivo (déficit/superávit/manutenção)

2. Distribuir macronutrientes:

   | Objetivo | Proteína | Carboidrato | Gordura |
   |----------|----------|-------------|---------|
   | Emagrecimento | 2.0-2.4g/kg | Restante | 0.8-1.0g/kg |
   | Hipertrofia | 1.8-2.2g/kg | Restante | 0.8-1.0g/kg |
   | Saúde geral | 1.6-2.0g/kg | Restante | 0.8-1.2g/kg |

3. Montar plano conforme preferência do cliente:
   - Opção A: Plano com refeições sugeridas (flexível)
   - Opção B: Macros livres com orientações
   - Opção C: Híbrido (refeições base + flexibilidade)

4. Incluir orientações de hidratação:
   - Mínimo: 35ml/kg de peso corporal
   - Ajuste para clima quente ou treino intenso

5. Documentar restrições alimentares, alergias, preferências

#### Passo 3.3 — Revisão Cruzada

```
training-builder E diet-builder revisam juntos
│
├─ IF treino em jejum solicitado
│   ├─ Ajustar timing de refeições pré/pós treino
│   └─ Garantir refeição pós-treino dentro de 2h
│
├─ IF volume de treino alto + déficit calórico agressivo
│   ├─ ALERTA: Risco de overreaching
│   ├─ Reduzir volume ou suavizar déficit
│   └─ Documentar decisão e justificativa
│
└─ IF tudo alinhado
    └─ Aprovar e enviar para o cliente
```

---

### FASE 4 — Entrega e Orientação (Dia 3-4)

**Responsável:** `intake-analyst` + `automation-engineer`
**Duração:** 30-45 minutos com o cliente

#### Passo 4.1 — Call de Entrega do Plano

1. Apresentar o programa de treino:
   - Explicar a lógica por trás da escolha de exercícios
   - Demonstrar como registrar treinos
   - Definir como enviar vídeos para correção técnica
   - Esclarecer progressão esperada

2. Apresentar o plano alimentar:
   - Explicar calorias e macros de forma simplificada
   - Mostrar como usar o app de tracking (se aplicável)
   - Discutir flexibilidade e substituições permitidas
   - Abordar situações sociais (restaurantes, eventos)

3. Alinhar protocolo de check-in:
   - Dias e horários de envio de dados
   - O que reportar: peso, fotos, medidas, feedback subjetivo
   - Como reportar dificuldades ou problemas
   - Tempo de resposta esperado do coach

4. Confirmar que o cliente tem todas as informações necessárias

#### Passo 4.2 — Configuração de Automações (`automation-engineer`)

1. Configurar lembretes automáticos:
   - Lembrete de treino (30min antes do horário habitual)
   - Lembrete de check-in (dia definido, manhã)
   - Lembrete de pesagem (se aplicável)
   - Lembrete de hidratação (opcional)

2. Configurar alertas para o coach:
   - Cliente não fez check-in por 48h
   - Cliente reportou dor ou desconforto
   - Cliente não registrou treino por 3 dias consecutivos

3. Preparar sequência de mensagens da primeira semana:
   - Dia 1: "Como foi o primeiro treino?"
   - Dia 3: "Como está a adaptação à alimentação?"
   - Dia 5: "Alguma dificuldade até agora?"
   - Dia 7: "Resumo da primeira semana — vamos revisar juntos?"

---

### FASE 5 — Primeira Semana de Acompanhamento (Dia 4-10)

**Responsável:** Todos os agents em monitoramento
**Formato:** Assíncrono com touchpoints programados

#### Passo 5.1 — Monitoramento Diário

```
PARA CADA DIA da primeira semana:
│
├─ VERIFICAR se cliente registrou treino
│   ├─ IF sim → Revisar, dar feedback positivo e correções
│   └─ IF não → Enviar mensagem de acompanhamento (não cobrar)
│
├─ VERIFICAR feedback alimentar
│   ├─ IF reportou dificuldade → Ajustar dentro de 24h
│   └─ IF sem feedback → Perguntar proativamente
│
├─ VERIFICAR sinais de alerta
│   ├─ IF dor durante exercício → Parar, substituir, investigar
│   ├─ IF sintomas digestivos → Ajustar dieta imediatamente
│   └─ IF frustração/desânimo → Conversa de suporte
│
└─ REGISTRAR observações no perfil do cliente
```

#### Passo 5.2 — Micro-ajustes Permitidos na Semana 1

| Situação | Ajuste Permitido | Ajuste NÃO Permitido |
|----------|-----------------|---------------------|
| Exercício causa dor | Substituir por alternativa | Remover grupo muscular |
| Refeição inviável | Trocar por equivalente | Mudar macros totais |
| Volume muito alto | Reduzir 1-2 séries | Mudar split inteiro |
| Fome excessiva | Redistribuir refeições | Aumentar calorias >10% |
| Exercício muito fácil | Aumentar carga gradual | Pular para avançado |

#### Passo 5.3 — Review de Final de Semana 1

1. Coletar dados completos:
   - Média de peso da semana
   - Feedback de cada treino realizado
   - Adesão alimentar (% de conformidade)
   - Qualidade de sono (escala 1-10)
   - Nível de energia (escala 1-10)
   - Dores ou desconfortos reportados

2. Análise de adesão:

```
ADESÃO na semana 1
│
├─ IF > 80% de conformidade (treino + dieta)
│   ├─ CLASSIFICAR: Excelente aderência
│   ├─ Reforço positivo
│   └─ Manter plano, ajustes mínimos
│
├─ IF 50-80% de conformidade
│   ├─ CLASSIFICAR: Adaptação em andamento
│   ├─ Identificar barreiras específicas
│   ├─ Ajustar 1-2 pontos mais difíceis
│   └─ NÃO mudar tudo de uma vez
│
├─ IF < 50% de conformidade
│   ├─ CLASSIFICAR: Necessita intervenção
│   ├─ Call de alinhamento OBRIGATÓRIA
│   ├─ Simplificar plano drasticamente
│   ├─ Reduzir para 2 treinos/semana + dieta simplificada
│   └─ Foco: Criar o HÁBITO, não otimizar
│
└─ IF 0% de conformidade (não fez nada)
    ├─ ALERTA VERMELHO
    ├─ Call imediata para entender situação
    ├─ Avaliar se timing é inadequado
    └─ IF motivo legítimo → Reprogramar início
    └─ IF falta de comprometimento → Conversa franca sobre expectativas
```

3. Documentar conclusões e plano para semana 2

---

## Caminhos de Escalação

| Situação | Escalar Para | Ação |
|----------|-------------|------|
| Red flag médico identificado na anamnese | Profissional de saúde externo | Pausar início, solicitar liberação |
| Suspeita de transtorno alimentar | Nutricionista clínico + psicólogo | Adaptar abordagem, NÃO diagnosticar |
| Cliente insatisfeito com plano entregue | Senior coach / `fitcoach-chief` | Revisar plano com segunda opinião |
| Cliente não responde por 72h+ | `retention-engineer` | Ativar protocolo de reengajamento |
| Lesão reportada na semana 1 | `injury-manager` | Ativar playbook: crise-lesao-mid-prep.md (adaptar) |

---

## Red Flags e Condições de Veto

### VETO TOTAL — NÃO iniciar treino

- [ ] PAR-Q positivo sem liberação médica
- [ ] Gravidez sem liberação obstétrica
- [ ] Lesão aguda não tratada (dor intensa, inchaço)
- [ ] Cirurgia recente (< 6 semanas) sem liberação
- [ ] Pressão arterial > 180/110 mmHg reportada

### VETO PARCIAL — Iniciar com restrições

- [ ] Histórico de lesão crônica → Adaptar exercícios, evitar movimentos gatilho
- [ ] Uso de medicação que altera FC → Não usar FC como parâmetro de intensidade
- [ ] IMC > 40 → Priorizar exercícios de baixo impacto articular
- [ ] Idade > 65 sem exames recentes → Volume e intensidade conservadores

### ALERTAS — Documentar e monitorar

- [ ] Expectativa de perder >1kg/semana de forma consistente
- [ ] Histórico de dietas muito restritivas (< 1000 kcal)
- [ ] Viagem ou evento importante nas primeiras 2 semanas
- [ ] Mais de 3 tentativas anteriores sem sucesso → Investigar padrão

---

## Checklist de Output

### Ao final da Fase 1:
- [ ] Anamnese completa preenchida e arquivada
- [ ] Classificação de nível definida (Iniciante/Intermediário/Avançado)
- [ ] Objetivo SMART documentado
- [ ] Red flags identificados e documentados
- [ ] Avaliação física agendada

### Ao final da Fase 2:
- [ ] Dados antropométricos coletados e registrados
- [ ] Fotos baseline tiradas e arquivadas
- [ ] Avaliação de movimento concluída
- [ ] Limitações e assimetrias documentadas

### Ao final da Fase 3:
- [ ] Programa de treino montado e revisado
- [ ] Plano alimentar montado e revisado
- [ ] Revisão cruzada treino/dieta aprovada
- [ ] Materiais formatados para entrega

### Ao final da Fase 4:
- [ ] Call de entrega realizada
- [ ] Cliente entendeu treino, dieta e protocolo de check-in
- [ ] Automações configuradas e testadas
- [ ] Sequência de mensagens da semana 1 ativa

### Ao final da Fase 5:
- [ ] Dados da semana 1 coletados e analisados
- [ ] Review de final de semana realizada
- [ ] Ajustes para semana 2 definidos
- [ ] Perfil do cliente atualizado com todas as observações
- [ ] Cliente informado sobre próximos passos

---

## Templates

### Template: Mensagem de Boas-vindas

```
Olá, [NOME]! 🎉

Seja muito bem-vindo(a) ao programa! Estou muito feliz em começar essa jornada com você.

Nos próximos dias, vamos passar por algumas etapas importantes:

1️⃣ Anamnese completa (você já vai receber o formulário)
2️⃣ Nossa call de intake para nos conhecermos melhor
3️⃣ Avaliação física (fotos, medidas, testes de movimento)
4️⃣ Entrega do seu plano personalizado
5️⃣ Primeira semana com acompanhamento intensivo

Pra começar, preciso que você preencha o formulário de anamnese que vou enviar agora. Preencha com calma e honestidade — quanto mais informação, melhor será o seu plano.

Qualquer dúvida, estou aqui! 💪

[NOME DO COACH]
```

### Template: Formulário de Check-in Semanal

```
📊 CHECK-IN SEMANAL — Semana [X]

Nome: _______________
Data: _______________

PESO (média da semana): _____ kg
SONO (média): _____h/noite | Qualidade: ⬜1 ⬜2 ⬜3 ⬜4 ⬜5
ENERGIA (média): ⬜1 ⬜2 ⬜3 ⬜4 ⬜5
FOME (média): ⬜1 ⬜2 ⬜3 ⬜4 ⬜5
STRESS (média): ⬜1 ⬜2 ⬜3 ⬜4 ⬜5

TREINOS REALIZADOS: ___/___
ADESÃO ALIMENTAR: ____%

DESTAQUES DA SEMANA:
_________________________________

DIFICULDADES DA SEMANA:
_________________________________

DORES/DESCONFORTOS:
_________________________________

FOTOS: ⬜ Frente ⬜ Costas ⬜ Lateral D ⬜ Lateral E
MEDIDAS: ⬜ Enviadas ⬜ Não coletei
```

### Template: Relatório de Onboarding (Interno)

```
# RELATÓRIO DE ONBOARDING — [NOME DO CLIENTE]

Data de início: [DATA]
Coach responsável: [COACH]

## Perfil
- Nível: [INICIANTE/INTERMEDIÁRIO/AVANÇADO]
- Objetivo: [OBJETIVO SMART]
- Red flags: [LISTA OU "Nenhum identificado"]

## Avaliação Inicial
- Peso: [X] kg | Altura: [X] cm
- Limitações: [LISTA]
- Observações de movimento: [NOTAS]

## Plano Entregue
- Split de treino: [TIPO] [FREQ]x/semana
- Calorias: [X] kcal | P: [X]g C: [X]g G: [X]g
- Abordagem alimentar: [PLANO/MACROS/HÍBRIDO]

## Semana 1 — Resultado
- Adesão treino: [X]%
- Adesão dieta: [X]%
- Classificação: [EXCELENTE/EM ANDAMENTO/NECESSITA INTERVENÇÃO]
- Ajustes realizados: [LISTA]

## Próximos Passos
- [AÇÃO 1]
- [AÇÃO 2]
- [AÇÃO 3]

## Status: [ONBOARDING COMPLETO / EM ACOMPANHAMENTO]
```

---

## Notas Finais

- A primeira semana define o tom do relacionamento coach-cliente. Priorize COMUNICAÇÃO acima de tudo.
- Não tente otimizar demais no início. Um plano que o cliente SEGUE é infinitamente melhor que um plano perfeito que ele abandona.
- Documente tudo. Dados da semana 1 são baseline para toda avaliação futura.
- Se o cliente não engajou na semana 1, o problema provavelmente é de PROCESSO, não de plano. Simplifique.
