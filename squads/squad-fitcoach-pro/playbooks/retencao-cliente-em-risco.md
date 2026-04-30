# Playbook: Retenção de Cliente em Risco de Abandono

## Propósito

Este playbook define o protocolo completo para identificar, investigar e reconquistar clientes que demonstram sinais de abandono iminente. O foco é detectar problemas precocemente, entender a causa raiz real (que raramente é a declarada) e aplicar estratégias de reengajamento específicas para cada tipo de situação, preservando a relação e maximizando o lifetime value do cliente.

---

## Triggers — Quando Usar Este Playbook

- Cliente reduziu frequência de check-ins por 2+ semanas consecutivas
- Respostas aos feedbacks ficaram curtas ou genéricas ("ok", "tudo certo")
- Cliente não está seguindo o plano mas não reporta dificuldades
- Cancelamento de sessões presenciais sem reagendamento
- Pagamento atrasado sem aviso prévio
- Cliente pediu para "pausar" o serviço
- Redução abrupta na comunicação (era ativo, ficou silencioso)
- Cliente verbalizou insatisfação ou comparou com outros serviços
- Indicadores automáticos: 3+ dias sem registrar treino, check-in atrasado

---

## Pré-requisitos

- [ ] Histórico completo do cliente disponível (tempo de serviço, resultados, comunicação)
- [ ] Dados de check-in dos últimos 30 dias
- [ ] Registro de resultados alcançados desde o início
- [ ] Histórico de pagamentos e eventuais atrasos
- [ ] Avaliação de satisfação mais recente (se existir)
- [ ] Conhecimento do contexto pessoal do cliente (trabalho, família, rotina)
- [ ] Templates de comunicação de reengajamento preparados

---

## Agents Envolvidos

| Agent | Papel no Playbook | Fase Principal |
|-------|-------------------|----------------|
| `retention-engineer` | Detecção de sinais, análise de risco, estratégia de retenção | Fase 1-3 |
| `gamification-designer` | Estratégias de engajamento, desafios, marcos, recompensas | Fase 3 |
| `mindset-coach` | Suporte motivacional, reconexão com objetivo, ressignificação | Fase 3-4 |
| `fitcoach-chief` | Decisões estratégicas, casos complexos, última instância | Fase 4-5 |

---

## Árvore de Decisão — Classificação de Risco

```
AVALIAR SINAIS DE ALERTA:
│
├─ NÍVEL VERDE — Risco Baixo (Prevenção)
│   ├─ Sinais: Leve redução de entusiasmo, 1 check-in atrasado
│   ├─ Ação: Monitorar + toque preventivo
│   └─ Urgência: Abordar na próxima interação regular
│
├─ NÍVEL AMARELO — Risco Moderado (Atenção)
│   ├─ Sinais: 2+ semanas de engagement reduzido, respostas curtas,
│   │   não segue plano mas não reclama, pagamento OK
│   ├─ Ação: Investigação ativa (Fase 2 completa)
│   └─ Urgência: Abordar dentro de 48h
│
├─ NÍVEL LARANJA — Risco Alto (Intervenção)
│   ├─ Sinais: Não faz check-in há 3+ semanas, respostas monossilábicas,
│   │   desculpas frequentes, pediu para "ver se continua"
│   ├─ Ação: Intervenção direta + oferta de valor (Fase 3)
│   └─ Urgência: Abordar HOJE
│
└─ NÍVEL VERMELHO — Risco Crítico (Resgate)
    ├─ Sinais: Pediu cancelamento, sumiu completamente, pagamento atrasado,
    │   verbalizou querer sair
    ├─ Ação: Protocolo de resgate (Fase 4)
    └─ Urgência: IMEDIATO
```

---

## Execução Passo a Passo

### FASE 1 — Detecção e Monitoramento (Contínuo)

**Responsável:** `retention-engineer`

#### Passo 1.1 — Sistema de Early Warning

```
INDICADORES AUTOMÁTICOS DE RISCO:
│
├─ ENGAGEMENT (monitorar semanalmente):
│   ├─ Frequência de check-ins vs esperado
│   │   ├─ 100-80% → VERDE
│   │   ├─ 79-50% → AMARELO
│   │   ├─ 49-20% → LARANJA
│   │   └─ < 20% → VERMELHO
│   │
│   ├─ Tamanho médio das respostas aos feedbacks
│   │   ├─ > 50 palavras → Engajado
│   │   ├─ 10-50 palavras → Normal
│   │   ├─ < 10 palavras → ALERTA
│   │   └─ Apenas "ok"/"tudo certo" → ALERTA ALTO
│   │
│   └─ Tempo de resposta às mensagens do coach
│       ├─ < 12h → Engajado
│       ├─ 12-48h → Normal
│       ├─ 48h-1 semana → ALERTA
│       └─ > 1 semana → ALERTA ALTO
│
├─ ADESÃO (monitorar semanalmente):
│   ├─ Treinos realizados vs planejados
│   ├─ Adesão alimentar reportada
│   ├─ Pesagens realizadas vs esperadas
│   └─ TENDÊNCIA importa mais que valor absoluto
│       └─ Queda de 20%+ em 2 semanas → ALERTA
│
├─ RESULTADOS (monitorar mensalmente):
│   ├─ Progresso em direção ao objetivo
│   ├─ Comparação de fotos mês a mês
│   └─ IF estagnado por 4+ semanas → Risco aumentado
│       (usar playbook cliente-estagnado.md EM CONJUNTO)
│
└─ FINANCEIRO (monitorar mensalmente):
    ├─ Pagamento em dia
    ├─ Pedido de desconto ou pausa
    └─ Qualquer sinal financeiro → Abordar com sensibilidade
```

#### Passo 1.2 — Score de Retenção

```
CALCULAR SCORE DE RETENÇÃO (mensal):
│
├─ Engagement (0-25 pontos):
│   ├─ Check-ins em dia: 10 pontos
│   ├─ Respostas detalhadas: 8 pontos
│   ├─ Inicia conversas por conta própria: 5 pontos
│   └─ Pergunta sobre o plano/progresso: 2 pontos
│
├─ Adesão (0-25 pontos):
│   ├─ Treinos > 80%: 10 pontos
│   ├─ Dieta > 80%: 8 pontos
│   ├─ Registra dados consistentemente: 5 pontos
│   └─ Envia fotos no prazo: 2 pontos
│
├─ Resultados (0-25 pontos):
│   ├─ Progresso visível: 10 pontos
│   ├─ Metas intermediárias atingidas: 8 pontos
│   ├─ Cliente reconhece progresso: 5 pontos
│   └─ Feedback positivo espontâneo: 2 pontos
│
├─ Satisfação (0-25 pontos):
│   ├─ NPS >= 9: 10 pontos
│   ├─ Indicou alguém: 8 pontos
│   ├─ Renovou sem hesitar: 5 pontos
│   └─ Elogia o serviço publicamente: 2 pontos
│
└─ SCORE TOTAL:
    ├─ 80-100: PROMOTOR — Risco mínimo, potencial embaixador
    ├─ 60-79: SATISFEITO — Risco baixo, manutenção
    ├─ 40-59: NEUTRO — Risco moderado, precisa de atenção
    ├─ 20-39: INSATISFEITO — Risco alto, intervenção necessária
    └─ 0-19: DETRATOR — Risco crítico, resgate imediato
```

---

### FASE 2 — Investigação de Causa Raiz (24-72h)

**Responsável:** `retention-engineer`

#### Passo 2.1 — As 6 Categorias de Abandono

```
IDENTIFICAR CAUSA RAIZ (geralmente é MIX de fatores):
│
├─ CATEGORIA 1: RESULTADOS INSUFICIENTES
│   ├─ Sinais: "Não estou vendo diferença", compara com outros
│   ├─ Causa real: Expectativa desalinhada OU plano ineficaz
│   ├─ Frequência: ~30% dos casos
│   └─ Prognóstico de retenção: BOM (se resolver a causa)
│
├─ CATEGORIA 2: FINANCEIRA
│   ├─ Sinais: Pede desconto, atrasa pagamento, menciona gastos
│   ├─ Causa real: Prioridade financeira mudou OU não vê ROI suficiente
│   ├─ Frequência: ~25% dos casos
│   └─ Prognóstico de retenção: MODERADO
│
├─ CATEGORIA 3: MOTIVACIONAL
│   ├─ Sinais: "Perdi a motivação", "não tenho vontade", preguiça
│   ├─ Causa real: Objetivo não é genuíno OU rotina insustentável
│   ├─ Frequência: ~20% dos casos
│   └─ Prognóstico de retenção: VARIÁVEL (depende da causa real)
│
├─ CATEGORIA 4: VIDA PESSOAL
│   ├─ Sinais: Mudança de emprego, bebê, divórcio, mudança de cidade
│   ├─ Causa real: Prioridades legítimas mudaram
│   ├─ Frequência: ~15% dos casos
│   └─ Prognóstico de retenção: BAIXO a curto prazo, BOM a longo
│
├─ CATEGORIA 5: RELACIONAMENTO COM O COACH
│   ├─ Sinais: Menos comunicação mas treina sozinho, compara com outros coaches
│   ├─ Causa real: Sente que não precisa mais OU insatisfeito com atendimento
│   ├─ Frequência: ~7% dos casos
│   └─ Prognóstico de retenção: DIFÍCIL (confiança abalada)
│
└─ CATEGORIA 6: PROBLEMA DE SAÚDE
    ├─ Sinais: Lesão, doença, problema hormonal, fadiga crônica
    ├─ Causa real: Corpo não permite continuar como antes
    ├─ Frequência: ~3% dos casos
    └─ Prognóstico de retenção: BOM (se adaptar o serviço)
```

#### Passo 2.2 — Conversa de Investigação

```
ABORDAGEM PARA DESCOBRIR A CAUSA REAL:
│
├─ REGRA DE OURO: A primeira razão dada NUNCA é a razão real
│   ├─ "Estou sem tempo" = Não é prioridade (por quê?)
│   ├─ "Está caro" = Não vejo valor suficiente (por quê?)
│   ├─ "Perdi a motivação" = Algo está errado (o quê?)
│   └─ Usar técnica dos "5 porquês" para chegar na raiz
│
├─ FORMATO DA CONVERSA:
│   ├─ NÃO iniciar com "percebi que você está sumindo"
│   ├─ INICIAR com algo positivo: "Estava revisando seus dados e..."
│   ├─ Perguntar como REALMENTE está (tom genuíno, não protocolado)
│   ├─ Ouvir mais do que falar (regra 80/20)
│   └─ Não oferecer solução imediata — primeiro entender
│
├─ PERGUNTAS-CHAVE (usar 3-4, não todas):
│   ├─ "Como você está se sentindo em relação ao processo?"
│   ├─ "O que está sendo mais difícil pra você nesse momento?"
│   ├─ "Se pudesse mudar UMA coisa no seu acompanhamento, o que seria?"
│   ├─ "Numa escala de 1-10, o quanto o treino/dieta está encaixando na sua rotina?"
│   ├─ "Você sente que está progredindo? Por quê sim/não?"
│   └─ "Tem algo acontecendo na sua vida que está impactando?"
│
└─ DOCUMENTAR:
    ├─ Causa declarada (o que o cliente disse)
    ├─ Causa suspeita (o que você acha que é de verdade)
    ├─ Tom emocional da conversa
    └─ Nível de abertura do cliente (falou abertamente ou ficou na defensiva?)
```

#### Passo 2.3 — Análise de Dados do Cliente

```
ANTES DA CONVERSA, revisar:
│
├─ RESULTADOS OBJETIVOS:
│   ├─ Progresso desde o início (peso, fotos, medidas, cargas)
│   ├─ Progresso nos últimos 30 dias vs 30 dias anteriores
│   └─ Velocidade de progresso vs expectativa do cliente
│
├─ HISTÓRICO DE ENGAGEMENT:
│   ├─ Quando começou a queda? (data aproximada)
│   ├─ Houve evento gatilho? (mudança de plano, feedback, vida pessoal)
│   ├─ Padrão sazonal? (sempre cai nesta época do ano?)
│   └─ Comparar engagement atual vs primeiros meses
│
├─ HISTÓRICO DE COMUNICAÇÃO:
│   ├─ Tom das últimas 10 mensagens do cliente
│   ├─ Perguntas/reclamações não respondidas ou mal respondidas
│   ├─ Últimas vezes que coach tomou iniciativa de contato
│   └─ Último feedback positivo dado pelo coach
│
└─ PERFIL DE RENOVAÇÃO:
    ├─ Quanto tempo falta para próxima renovação?
    ├─ Quantas renovações já fez?
    ├─ Historicamente renova facilmente ou hesita?
    └─ Já teve pausas anteriores?
```

---

### FASE 3 — Estratégia de Reengajamento (Dia 3-14)

**Responsável:** Varia conforme a causa identificada

#### Estratégia por Categoria

##### Categoria 1: Resultados Insuficientes

**Responsável:** `retention-engineer` + coach

```
PROTOCOLO — FALTA DE RESULTADOS:
│
├─ PASSO 1: Mostrar progresso que o cliente não está vendo
│   ├─ Compilar fotos before/after em comparativo lado a lado
│   ├─ Mostrar evolução de cargas no treino (gráfico se possível)
│   ├─ Comparar medidas do início vs agora
│   └─ IF o progresso realmente existe mas cliente não percebe:
│       └─ Problema de PERCEPÇÃO → Educação + marcos visíveis
│
├─ PASSO 2: Se realmente não há progresso
│   ├─ Reconhecer honestamente que precisa ajustar
│   ├─ Ativar playbook cliente-estagnado.md
│   ├─ Apresentar plano de ação com timeline clara
│   └─ "Vamos fazer X diferente pelas próximas 4 semanas e reavaliar"
│
├─ PASSO 3: Realinhar expectativas
│   ├─ O objetivo original ainda é o mesmo?
│   ├─ O prazo era realista?
│   ├─ Há obstáculos que não foram considerados no início?
│   └─ Redefinir metas intermediárias mais tangíveis
│
└─ PASSO 4: Criar "quick wins"
    ├─ Identificar algo que pode melhorar RÁPIDO (1-2 semanas)
    ├─ Exemplo: Treino que o cliente GOSTA + resultado visível
    ├─ Exemplo: Ajuste alimentar que reduz inchaço rapidamente
    └─ O objetivo é restaurar a CONFIANÇA no processo
```

##### Categoria 2: Financeira

**Responsável:** `retention-engineer`

```
PROTOCOLO — DIFICULDADE FINANCEIRA:
│
├─ PASSO 1: Avaliar a situação com empatia (zero julgamento)
│   ├─ IF temporária (1-2 meses)
│   │   ├─ Oferecer pausa com manutenção do plano (sem suporte ativo)
│   │   ├─ Reduzir para tier mais acessível temporariamente
│   │   └─ "Volta quando puder, seu plano fica pronto"
│   │
│   ├─ IF prolongada (3+ meses ou indefinida)
│   │   ├─ Oferecer downgrade para tier mais acessível permanentemente
│   │   ├─ Oferecer plano trimestral com desconto
│   │   └─ Se nada funcionar, encerrar com porta aberta
│   │
│   └─ IF o problema real é VALOR PERCEBIDO (não financeiro de verdade)
│       ├─ Trabalhar a percepção de valor (mostrar ROI)
│       ├─ "Quanto você gastaria em nutricionista + personal separados?"
│       └─ Reforçar resultados obtidos
│
├─ OPÇÕES DE RETENÇÃO FINANCEIRA:
│   ├─ Desconto por fidelidade (5-15% para quem está há 6+ meses)
│   ├─ Plano anual com desconto significativo (20-30%)
│   ├─ Downgrade de tier (Premium → Standard → Essencial)
│   ├─ Pagamento trimestral com desconto (10%)
│   └─ Indicação = desconto (cliente indica 1 → 10% off para ambos)
│
└─ NUNCA:
    ├─ Dar desconto sem justificativa (desvaloriza o serviço)
    ├─ Negociar preço por desespero (transmite insegurança)
    └─ Fazer gratuito "para não perder" (cria dependência)
```

##### Categoria 3: Motivacional

**Responsável:** `mindset-coach` + `gamification-designer`

```
PROTOCOLO — DESMOTIVAÇÃO:
│
├─ PASSO 1: Reconectar com o PORQUÊ original
│   ├─ "Lembra quando você começou? O que te trouxe aqui?"
│   ├─ Revisar objetivo inicial — ainda faz sentido?
│   ├─ Se o objetivo mudou → Redefinir sem julgamento
│   └─ Se o objetivo é o mesmo mas perdeu urgência → Reativar urgência
│
├─ PASSO 2: Simplificar radicalmente
│   ├─ Reduzir de 5 treinos para 3
│   ├─ Trocar dieta rígida por orientações simples
│   ├─ Foco em HÁBITO, não em otimização
│   └─ "O que é o MÍNIMO que você consegue fazer de forma consistente?"
│
├─ PASSO 3: Gamificação (`gamification-designer`)
│   ├─ Desafio de 21 dias com metas diárias simples
│   ├─ Sistema de pontos por consistência (não por resultado)
│   ├─ Marcos de celebração: 7 dias → 14 dias → 21 dias
│   ├─ Streak rewards: Sequência de X dias sem falhar
│   └─ Social accountability: Grupo de desafio com outros clientes
│
├─ PASSO 4: Variedade e novidade
│   ├─ Mudar exercícios para algo que o cliente acha DIVERTIDO
│   ├─ Sugerir atividade complementar (esporte, dança, artes marciais)
│   ├─ Novo desafio de performance (ex: primeira barra fixa, correr 5km)
│   └─ Mudar o ambiente (treinar ao ar livre, academia diferente)
│
└─ PASSO 5: Redefinir sucesso
    ├─ Trocar métricas de vaidade por métricas de processo
    ├─ "Sucesso esta semana = treinar 3x, independente de peso"
    ├─ Celebrar consistência, não resultado
    └─ Perspective shift: "Você já faz mais que 80% da população"
```

##### Categoria 4: Vida Pessoal

**Responsável:** `retention-engineer`

```
PROTOCOLO — MUDANÇA DE VIDA:
│
├─ PASSO 1: Reconhecer e validar
│   ├─ "Faz total sentido que isso está impactando sua rotina"
│   ├─ NÃO minimizar ("mas dá pra encaixar") — respeitar o momento
│   └─ Demonstrar que se importa com a pessoa, não só com o cliente
│
├─ PASSO 2: Adaptar o serviço à nova realidade
│   ├─ Treino de 60min → 30min
│   ├─ 5x/semana → 2-3x/semana
│   ├─ Check-in semanal → Quinzenal
│   ├─ Plano detalhado → Orientações gerais
│   └─ META: Mínimo viável para MANTER resultados
│
├─ PASSO 3: Oferecer flexibilidade
│   ├─ Pausa de 30-60 dias (sem cobrança, com plano de retorno)
│   ├─ Tier temporário mais leve
│   ├─ Reagendamento livre de sessões
│   └─ "Quando as coisas acalmarem, retomamos de onde paramos"
│
└─ PASSO 4: Manter o vínculo durante a pausa
    ├─ Mensagem quinzenal (não sobre treino, sobre a pessoa)
    ├─ Conteúdo relevante para a situação (ex: treinos rápidos para pais ocupados)
    ├─ Porta SEMPRE aberta, sem pressão
    └─ Follow-up programado: 30/60/90 dias
```

##### Categoria 5: Relacionamento com o Coach

**Responsável:** `fitcoach-chief` + `retention-engineer`

```
PROTOCOLO — PROBLEMA DE RELACIONAMENTO:
│
├─ PASSO 1: Autoavaliação honesta (coach)
│   ├─ Estou respondendo rápido o suficiente?
│   ├─ Meus feedbacks são genéricos ou personalizados?
│   ├─ Estou dando atenção real ou tratando como "mais um"?
│   ├─ Houve algum incidente que possa ter gerado frustração?
│   └─ Estou entregando o que prometi na venda?
│
├─ PASSO 2: Pedir feedback direto
│   ├─ "Quero melhorar seu acompanhamento. O que posso fazer diferente?"
│   ├─ NÃO ficar defensivo com a resposta
│   ├─ Anotar TUDO e demonstrar que vai agir
│   └─ Follow-up em 1 semana mostrando mudanças concretas
│
├─ PASSO 3: Elevar o nível de serviço temporariamente
│   ├─ Check-in extra (sem cobrar)
│   ├─ Feedback mais detalhado por 2-4 semanas
│   ├─ Antecipar necessidades antes do cliente pedir
│   └─ Demonstrar valor através de AÇÃO, não promessa
│
└─ PASSO 4: Se irreversível
    ├─ Oferecer transição para outro coach (se tiver)
    ├─ Encerrar profissionalmente com relatório completo
    ├─ Pedir feedback final anônimo (aprendizado)
    └─ NÃO levar para o pessoal — nem todo match funciona
```

##### Categoria 6: Problema de Saúde

**Responsável:** `retention-engineer` + `injury-manager`

```
PROTOCOLO — PROBLEMA DE SAÚDE:
│
├─ PASSO 1: Priorizar saúde acima de tudo
│   ├─ "Sua saúde vem primeiro. Vamos adaptar tudo que for necessário"
│   ├─ Solicitar informações médicas/restrições
│   └─ Coordenar com profissionais de saúde
│
├─ PASSO 2: Adaptar serviço
│   ├─ Se lesão → Ativar playbook crise-lesao-mid-prep.md (adaptar)
│   ├─ Se doença → Pausar e retomar quando liberado
│   ├─ Se problema hormonal → Ajustar expectativas de resultado
│   └─ Se fadiga crônica → Simplificar drasticamente
│
└─ PASSO 3: Manter vínculo durante recuperação
    ├─ Contato regular sobre saúde (não sobre treino)
    ├─ Suporte emocional genuíno
    └─ Plano de retorno pronto para quando for possível
```

---

### FASE 4 — Protocolo de Resgate (Para Nível Vermelho)

**Responsável:** `fitcoach-chief`

#### Passo 4.1 — Contato Urgente

```
QUANDO CLIENTE PEDE CANCELAMENTO OU SUMIU:
│
├─ AÇÃO 1: Contato pessoal (não automação)
│   ├─ Ligação ou áudio pessoal (NÃO texto genérico)
│   ├─ Tom: Genuíno, não desesperado
│   ├─ "Ei [NOME], estava pensando em você. Tudo bem?"
│   └─ Se não responder: 1 follow-up em 48h, depois respeitar
│
├─ AÇÃO 2: Oferta de salvação (usar com moderação)
│   ├─ Opção A: 1 mês grátis para "recomeçar" (alto valor percebido)
│   ├─ Opção B: Sessão presencial gratuita (reconexão pessoal)
│   ├─ Opção C: Mudança completa de abordagem (plano novo, fresh start)
│   ├─ Opção D: Downgrade significativo com possibilidade de upgrade
│   └─ ESCOLHER apenas 1 opção, não oferecer todas
│
├─ AÇÃO 3: Se o cliente confirmar saída
│   ├─ NÃO implorar ou insistir excessivamente
│   ├─ Agradecer genuinamente pelo tempo juntos
│   ├─ Entregar relatório final com resultados e recomendações
│   ├─ Deixar porta aberta: "Se quiser voltar, é só me procurar"
│   └─ Pedir feedback (formulário simples, 3 perguntas)
│
└─ AÇÃO 4: Follow-up pós-saída
    ├─ 30 dias: Mensagem casual (não sobre treino)
    ├─ 60 dias: Compartilhar conteúdo relevante
    ├─ 90 dias: Oferta de retorno com condição especial
    └─ 6 meses: Último contato, depois respeitar o espaço
```

#### Passo 4.2 — Análise Post-Mortem

```
QUANDO PERDER O CLIENTE, analisar:
│
├─ CAUSA RAIZ FINAL: [CATEGORIA 1-6]
├─ SINAIS que deveriam ter sido detectados antes: ___
├─ EM QUE MOMENTO a queda começou: ___
├─ O QUE poderia ter sido feito diferente: ___
├─ APRENDIZADO para próximos clientes: ___
│
└─ PADRÃO RECORRENTE?
    ├─ IF mesmo tipo de cliente saindo pelo mesmo motivo
    │   └─ PROBLEMA SISTÊMICO → Ajustar processo, não apenas reação
    ├─ IF churn concentrado em tier específico
    │   └─ PROBLEMA DE OFERTA → Reavaliar o que aquele tier entrega
    └─ IF churn concentrado em período específico (3 meses, 6 meses)
        └─ PROBLEMA DE CICLO → Criar marco/renovação de objetivo nesse período
```

---

### FASE 5 — Prevenção Sistêmica (Contínuo)

**Responsável:** `retention-engineer` + `gamification-designer`

#### Passo 5.1 — Marcos de Celebração Programados

```
MARCOS AUTOMÁTICOS (para TODOS os clientes, não apenas os em risco):
│
├─ SEMANA 1: "Primeira semana completa! Isso é enorme."
├─ MÊS 1: Review de progresso + celebração de consistência
├─ MÊS 3: Comparativo completo before/after + realinhamento de metas
├─ MÊS 6: "Meio ano juntos! Veja onde você estava e onde está."
├─ MÊS 12: Celebração de 1 ano + planejamento do próximo ciclo
│
├─ MARCOS DE PERFORMANCE:
│   ├─ Primeiro PR (personal record) → Celebrar publicamente (com permissão)
│   ├─ Primeiro kg perdido/ganho → Reconhecer
│   ├─ Primeiro mês com 100% de adesão → Recompensa
│   └─ Streak de check-ins → Gamificação
│
└─ MARCOS PESSOAIS:
    ├─ Aniversário do cliente → Mensagem personalizada
    ├─ Conquistas de vida (promoção, casamento) → Reconhecer
    └─ Datas difíceis (se compartilhou) → Mostrar empatia
```

#### Passo 5.2 — NPS Trimestral

```
PESQUISA DE SATISFAÇÃO (a cada 3 meses):
│
├─ Pergunta 1: "De 0 a 10, qual a probabilidade de recomendar
│   meu serviço para um amigo?" → NPS score
│
├─ Pergunta 2: "O que eu poderia fazer para tornar seu
│   acompanhamento ainda melhor?" → Feedback qualitativo
│
├─ Pergunta 3: "Qual o principal resultado que você alcançou
│   nos últimos 3 meses?" → Percepção de valor
│
├─ AÇÃO BASEADA NO NPS:
│   ├─ 9-10 (Promotor): Pedir indicação + depoimento
│   ├─ 7-8 (Neutro): Investigar o que falta para virar 9-10
│   ├─ 0-6 (Detrator): Ativar este playbook IMEDIATAMENTE
│   └─ Meta: NPS > 70
│
└─ FREQUÊNCIA:
    ├─ Trimestral para todos os clientes
    ├─ Mensal para clientes em risco (Nível Amarelo+)
    └─ Após qualquer mudança significativa de plano
```

#### Passo 5.3 — Programa de Indicação Estruturado

```
PROGRAMA DE INDICAÇÃO:
│
├─ INCENTIVO PARA QUEM INDICA:
│   ├─ 1 indicação que fecha: 10% de desconto no próximo mês
│   ├─ 2 indicações: 20% de desconto
│   ├─ 3 indicações: 1 mês grátis
│   └─ 5+ indicações: Status VIP (benefício exclusivo)
│
├─ INCENTIVO PARA O INDICADO:
│   ├─ Primeira semana de avaliação gratuita
│   ├─ Desconto de 10% no primeiro mês
│   └─ Onboarding prioritário
│
├─ QUANDO PEDIR INDICAÇÃO:
│   ├─ Após marco de resultado positivo
│   ├─ Quando NPS >= 9
│   ├─ Após depoimento espontâneo positivo
│   └─ NUNCA quando cliente está insatisfeito ou em risco
│
└─ COMO PEDIR:
    ├─ "[NOME], seus resultados estão incríveis. Você conhece alguém
    │   que gostaria de ter resultados parecidos?"
    └─ Tornar fácil: Link direto, mensagem pronta para encaminhar
```

---

## Caminhos de Escalação

| Situação | Escalar Para | Ação |
|----------|-------------|------|
| Cliente insatisfeito com o coach especificamente | `fitcoach-chief` | Mediação ou troca de coach |
| Padrão de churn alto (> 15%/mês) | `business-diagnostician` | Análise sistêmica do negócio |
| Cliente com problema emocional sério | Psicólogo/terapeuta | Encaminhamento profissional |
| Cliente difamando o serviço publicamente | `fitcoach-chief` | Gestão de crise de reputação |
| Disputa financeira/reembolso | Advogado/contrato | Resolver formalmente |
| Múltiplos clientes saindo pelo mesmo motivo | `gym-scaler` | Reestruturar oferta/processo |

---

## Red Flags e Condições de Veto

### VETO — NÃO Insistir na Retenção

- [ ] Cliente pediu explicitamente para parar de ser contactado
- [ ] Relação tornou-se hostil ou tóxica
- [ ] Cliente está usando o serviço para validar comportamento prejudicial à saúde
- [ ] Disputa legal ou ameaça de processo
- [ ] Cliente difamando publicamente mesmo após resolução tentada

### VETO PARCIAL — Reter Apenas com Condições

- [ ] Cliente quer continuar mas pede serviço gratuito → Oferecer tier mínimo, não grátis
- [ ] Cliente quer continuar mas não segue nada → Conversa de alinhamento obrigatória
- [ ] Cliente quer trocar de coach dentro do mesmo serviço → Avaliar viabilidade

### ALERTAS — Monitorar de Perto

- [ ] Cliente que volta após pausa → Risco de segunda saída é 3x maior
- [ ] Cliente que ficou apenas pelo desconto → Monitorar engagement real
- [ ] Cliente que nunca reclama mas nunca elogia → Pode ser o próximo a sair

---

## Checklist de Output

### Ao final da Fase 1 (Detecção):
- [ ] Score de retenção calculado
- [ ] Nível de risco classificado (Verde/Amarelo/Laranja/Vermelho)
- [ ] Indicadores de alerta identificados
- [ ] Timeline da queda de engagement mapeada

### Ao final da Fase 2 (Investigação):
- [ ] Causa raiz identificada (Categoria 1-6)
- [ ] Conversa de investigação realizada
- [ ] Dados históricos do cliente revisados
- [ ] Estratégia de reengajamento selecionada

### Ao final da Fase 3 (Reengajamento):
- [ ] Ações de reengajamento executadas
- [ ] Resposta do cliente documentada
- [ ] Ajustes implementados (se aplicável)
- [ ] Follow-up agendado

### Ao final da Fase 4 (Resgate/Conclusão):
- [ ] Cliente retido OU saída processada profissionalmente
- [ ] Post-mortem realizado
- [ ] Aprendizados documentados
- [ ] Follow-up pós-saída programado (se saiu)

---

## Templates

### Template: Mensagem de Reengajamento (Tom Casual)

```
Fala, [NOME]! Tudo bem?

Estava revisando seus dados e percebi que faz um tempinho
que não nos falamos direito. Queria saber como você está —
não só em relação ao treino, mas como você está de verdade.

Sei que às vezes a rotina aperta e fica difícil manter tudo
em dia. Se estiver passando por isso, posso te ajudar a
simplificar as coisas.

Me conta: como tá a vida? 😊

[NOME DO COACH]
```

### Template: Pesquisa de Satisfação Rápida

```
📋 FEEDBACK RÁPIDO — 2 minutos

Oi [NOME]! Quero garantir que seu acompanhamento está
sendo o melhor possível. Pode responder 3 perguntas rápidas?

1. De 0 a 10, qual a chance de você recomendar meu serviço
   para um amigo? ___

2. O que posso fazer para melhorar seu acompanhamento?
   _______________________________________________

3. Qual foi seu principal resultado nos últimos 3 meses?
   _______________________________________________

Obrigado! Seu feedback me ajuda a ser um coach melhor. 🙏
```

### Template: Relatório de Saída (Entregue ao Cliente)

```
# RELATÓRIO FINAL — [NOME DO CLIENTE]

Período: [DATA INÍCIO] a [DATA FIM]
Duração total: [X] meses
Coach: [NOME]

## Sua Jornada em Números
- Peso inicial: [X] kg → Peso final: [X] kg
- Treinos realizados: [X] sessões
- Check-ins completados: [X]
- Melhor conquista: [DESCRIÇÃO]

## Seus Resultados
[RESUMO DOS PRINCIPAIS RESULTADOS ALCANÇADOS]

## Recomendações Para Seguir Sozinho(a)
1. [RECOMENDAÇÃO DE TREINO]
2. [RECOMENDAÇÃO DE NUTRIÇÃO]
3. [RECOMENDAÇÃO DE HÁBITOS]

## Seu Plano Atual
[ÚLTIMO TREINO E DIETA — para que possa continuar por conta]

## Porta Aberta
Se quiser voltar em qualquer momento, é só me procurar.
Será um prazer continuar de onde paramos.

Sucesso na sua jornada! 💪

[NOME DO COACH]
[CONTATO]
```

---

## Notas Finais

- Retenção começa no onboarding. Um cliente bem integrado no início tem 3x mais chance de ficar 12+ meses.
- A primeira razão declarada para sair NUNCA é a razão real. Sempre cave mais fundo com empatia.
- Desconto por desespero desvaloriza o serviço. Ofereça VALOR adicional, não preço menor.
- Um cliente que sai bem tratado volta. Um cliente que sai maltratado nunca mais volta E fala mal.
- Meça NPS trimestralmente. É o indicador mais confiável de retenção futura.
- Churn zero não existe e não deveria ser a meta. A meta é churn < 8%/mês e alta satisfação de quem fica.
- Invista 5x mais tempo em prevenção do que em resgate. É mais barato e mais eficaz.
