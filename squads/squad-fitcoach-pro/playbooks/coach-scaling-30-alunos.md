# Playbook: Escalar de 10 para 30 Clientes

## Propósito

Este playbook define o processo completo para um coach escalar sua operação de 10 para 30 clientes de forma sustentável, sem perder qualidade de atendimento. Cobre diagnóstico de capacidade atual, sistemas de automação necessários, estratégias de pricing, modelo de serviço e os marcos críticos de cada fase de crescimento.

---

## Triggers — Quando Usar Este Playbook

- Coach com 8-12 clientes ativos querendo crescer de forma estruturada
- Coach sobrecarregado com 15+ clientes sem sistemas adequados
- Coach migrando de presencial para online (ou adicionando online ao presencial)
- Coach que perdeu clientes por falta de organização e quer reconstruir com estrutura
- Coach planejando largar emprego CLT para viver 100% de consultoria fitness

---

## Pré-requisitos

- [ ] Mínimo de 6 meses de experiência como coach com clientes pagantes
- [ ] Pelo menos 3 casos de sucesso documentados (antes/depois com dados)
- [ ] Competência técnica validada (treino + nutrição no mínimo)
- [ ] Disponibilidade para investir em ferramentas e sistemas
- [ ] Disposição para mudar processos e abandonar métodos que não escalam
- [ ] Clareza sobre modelo de negócio desejado (online, presencial, híbrido)
- [ ] Situação financeira que permita 2-3 meses de transição

---

## Agents Envolvidos

| Agent | Papel no Playbook | Fase Principal |
|-------|-------------------|----------------|
| `business-diagnostician` | Análise da operação atual, gargalos, capacidade | Fase 1 |
| `gym-scaler` | Estratégia de escala, processos, sistemas | Fase 2-3 |
| `automation-engineer` | Implementação de automações, workflows, tech stack | Fase 3 |
| `ecommerce-manager` | Pricing, oferta, funil de vendas, posicionamento | Fase 4 |

---

## Árvore de Decisão — Modelo de Serviço

```
QUAL MODELO o coach quer/pode operar?
│
├─ IF 100% PRESENCIAL
│   ├─ Limite natural: ~20-25 clientes (depende de horários disponíveis)
│   ├─ Gargalo principal: Horas no dia
│   ├─ Scaling via: Preço premium + grupo pequeno + horários otimizados
│   ├─ Teto de faturamento: Limitado pelo tempo disponível
│   └─ Recomendação: Adicionar componente online para escalar além de 20
│
├─ IF 100% ONLINE
│   ├─ Limite realista: 30-50 clientes (com sistemas bons)
│   ├─ Gargalo principal: Check-ins e personalização
│   ├─ Scaling via: Automação + templates + batch processing
│   ├─ Teto de faturamento: Alto (sem limite geográfico)
│   └─ Recomendação: Modelo ideal para escalar a 30+
│
├─ IF HÍBRIDO (presencial + online)
│   ├─ Limite realista: 25-35 clientes total
│   ├─ Gargalo principal: Complexidade operacional
│   ├─ Scaling via: Presencial premium (poucos) + Online escalável (muitos)
│   ├─ Teto de faturamento: Muito alto (premium + volume)
│   └─ Recomendação: Melhor dos dois mundos se bem organizado
│
└─ IF GRUPO (aulas, bootcamps, programas em grupo)
    ├─ Limite realista: 50-100+ clientes
    ├─ Gargalo principal: Individualização vs escala
    ├─ Scaling via: Programas padronizados + tiers de personalização
    └─ Recomendação: Diferente deste playbook (requer playbook específico)
```

---

## Execução Passo a Passo

### FASE 1 — Diagnóstico da Operação Atual (Semana 1-2)

**Responsável:** `business-diagnostician`

#### Passo 1.1 — Mapeamento de Tempo

1. O coach deve registrar TUDO que faz em 1 semana típica:

```
CATEGORIAS DE TEMPO:
│
├─ ENTREGA (tempo direto com cliente)
│   ├─ Treinos presenciais: ___h/semana
│   ├─ Check-ins/feedbacks: ___h/semana
│   ├─ Montagem de planos: ___h/semana
│   ├─ Ajustes de treino/dieta: ___h/semana
│   └─ Comunicação individual: ___h/semana
│
├─ ADMINISTRATIVO
│   ├─ Cobrança/pagamentos: ___h/semana
│   ├─ Agendamentos: ___h/semana
│   ├─ Organização de planilhas: ___h/semana
│   └─ Relatórios: ___h/semana
│
├─ AQUISIÇÃO (marketing e vendas)
│   ├─ Criação de conteúdo: ___h/semana
│   ├─ Redes sociais: ___h/semana
│   ├─ Prospecção ativa: ___h/semana
│   └─ Calls de venda: ___h/semana
│
├─ DESENVOLVIMENTO PESSOAL
│   ├─ Estudo/cursos: ___h/semana
│   └─ Networking: ___h/semana
│
└─ TOTAL DISPONÍVEL: ___h/semana
    └─ CAPACIDADE OCIOSA: Total - (Entrega + Admin + Aquisição + Dev)
```

2. Calcular tempo médio por cliente:

```
TEMPO POR CLIENTE = Horas de entrega / Número de clientes ativos

├─ IF > 3h/semana/cliente
│   ├─ OPERAÇÃO ARTESANAL — Não escala além de 15 clientes
│   └─ Prioridade: Reduzir para < 2h/semana/cliente
│
├─ IF 1.5-3h/semana/cliente
│   ├─ OPERAÇÃO SEMI-ESTRUTURADA — Escala até 20-25
│   └─ Prioridade: Sistematizar para < 1.5h
│
├─ IF 0.5-1.5h/semana/cliente
│   ├─ OPERAÇÃO EFICIENTE — Escala até 30-40
│   └─ Prioridade: Otimizar automações
│
└─ IF < 0.5h/semana/cliente
    ├─ ATENÇÃO: Pode estar sub-atendendo
    └─ Verificar qualidade e satisfação dos clientes
```

#### Passo 1.2 — Análise de Gargalos

```
IDENTIFICAR os TOP 3 gargalos:
│
├─ GARGALO: Montagem de planos individualizada demais
│   ├─ Tempo gasto: ___h por plano novo
│   ├─ Solução: Templates por perfil + personalização modular
│   └─ Economia estimada: ___h/semana
│
├─ GARGALO: Check-ins feitos um a um sem estrutura
│   ├─ Tempo gasto: ___h/semana total
│   ├─ Solução: Formulário padronizado + batch processing
│   └─ Economia estimada: ___h/semana
│
├─ GARGALO: Comunicação desestruturada (WhatsApp caótico)
│   ├─ Tempo gasto: ___h/semana respondendo mensagens avulsas
│   ├─ Solução: Horários definidos + FAQ + chatbot básico
│   └─ Economia estimada: ___h/semana
│
├─ GARGALO: Cobrança manual
│   ├─ Tempo gasto: ___h/mês
│   ├─ Solução: Plataforma de pagamento recorrente
│   └─ Economia estimada: ___h/mês
│
├─ GARGALO: Criação de conteúdo consome muito tempo
│   ├─ Tempo gasto: ___h/semana
│   ├─ Solução: Batch content + templates + reaproveitamento
│   └─ Economia estimada: ___h/semana
│
└─ GARGALO: Tudo na cabeça do coach (zero documentação)
    ├─ Risco: Não pode tirar férias, não pode delegar
    ├─ Solução: Documentar processos, criar SOPs
    └─ Investimento: 10-15h uma vez para criar, economia contínua
```

#### Passo 1.3 — Análise Financeira Atual

```
FINANCEIRO ATUAL:
│
├─ Receita mensal total: R$ ___________
├─ Número de clientes ativos: ___
├─ Ticket médio mensal: R$ ___________
├─ Custos fixos mensais: R$ ___________
├─ Lucro líquido: R$ ___________
├─ Receita por hora trabalhada: R$ ___________
│
├─ IF receita/hora < R$50
│   ├─ PROBLEMA DE PRICING ou eficiência
│   └─ Prioridade: Ajustar preço ANTES de escalar
│
├─ IF churn mensal > 15%
│   ├─ PROBLEMA DE RETENÇÃO
│   └─ Prioridade: Resolver retenção antes de escalar
│       (não adianta encher balde furado)
│
└─ IF margem líquida < 50%
    ├─ Custos altos demais para o modelo
    └─ Revisar estrutura de custos antes de escalar
```

---

### FASE 2 — Redesign de Operação (Semana 3-4)

**Responsável:** `gym-scaler`

#### Passo 2.1 — Definição de Tiers de Serviço

```
CRIAR ESTRUTURA DE TIERS:
│
├─ TIER 1 — PREMIUM (5-8 clientes max)
│   ├─ Preço: R$ [ALTO] /mês
│   ├─ Inclui: Check-in semanal por call, treino 100% personalizado
│   ├─ Tempo por cliente: ~2h/semana
│   ├─ Perfil: Atletas, competidores, executivos
│   └─ Margem: Muito alta
│
├─ TIER 2 — STANDARD (15-20 clientes)
│   ├─ Preço: R$ [MÉDIO] /mês
│   ├─ Inclui: Check-in semanal por formulário + feedback escrito
│   ├─ Treino: Semi-personalizado (template + ajustes)
│   ├─ Tempo por cliente: ~1h/semana
│   └─ Margem: Alta
│
└─ TIER 3 — ESSENCIAL (10-15 clientes)
    ├─ Preço: R$ [ACESSÍVEL] /mês
    ├─ Inclui: Check-in quinzenal, treino template por perfil
    ├─ Suporte: Grupo de WhatsApp/Telegram compartilhado
    ├─ Tempo por cliente: ~20min/semana
    └─ Margem: Moderada (volume compensa)
```

#### Passo 2.2 — Criação de Templates Base

1. Templates de treino por perfil (mínimo 6):

| Template | Perfil | Frequência | Split |
|----------|--------|------------|-------|
| INI-FB-3 | Iniciante Full Body | 3x/semana | Full Body |
| INT-UL-4 | Intermediário Upper/Lower | 4x/semana | Upper/Lower |
| INT-PPL-5 | Intermediário PPL | 5x/semana | Push/Pull/Legs |
| AVA-PPL-6 | Avançado PPL | 6x/semana | PPL 2x |
| AVA-SPEC | Avançado Específico | 5-6x/semana | Por objetivo |
| REHAB-3 | Reabilitação | 3x/semana | Adaptado |

2. Templates de dieta por objetivo (mínimo 4):

| Template | Objetivo | Abordagem |
|----------|----------|-----------|
| NUT-CUT | Emagrecimento | Deficit + macros por faixa |
| NUT-BULK | Hipertrofia | Superávit + macros por faixa |
| NUT-MAINT | Manutenção | Manutenção + educação |
| NUT-FLEX | Flexível | Macros livres + orientações |

3. Templates de check-in:
   - Check-in semanal padrão (formulário)
   - Check-in quinzenal (formulário reduzido)
   - Check-in de fotos e medidas (mensal)

4. Templates de comunicação:
   - Boas-vindas por tier
   - Entrega de plano
   - Ajuste semanal
   - Feedback de progresso
   - Mensagens motivacionais (banco de 20+)

#### Passo 2.3 — Definição de Processos (SOPs)

```
PROCESSOS ESSENCIAIS para 30 clientes:
│
├─ SOP 01: Onboarding de novo cliente
│   ├─ Trigger: Pagamento confirmado
│   ├─ Steps: 8 passos padronizados
│   └─ Tempo total: 2-3h por cliente
│
├─ SOP 02: Check-in semanal (batch processing)
│   ├─ Trigger: Formulários recebidos (dia X)
│   ├─ Steps: Revisar dados → Decidir ajuste → Enviar feedback
│   ├─ Batch: Processar todos os check-ins em 2-3 blocos semanais
│   └─ Tempo total: 15-30min por cliente
│
├─ SOP 03: Ajuste de plano mensal
│   ├─ Trigger: Final de mesociclo (4 semanas)
│   ├─ Steps: Analisar progresso → Ajustar treino/dieta → Comunicar
│   └─ Tempo: 30-45min por cliente
│
├─ SOP 04: Renovação/Churn prevention
│   ├─ Trigger: 7 dias antes do vencimento
│   ├─ Steps: Review de resultados → Oferta de continuidade
│   └─ Automação: Sequência de emails/mensagens
│
└─ SOP 05: Offboarding
    ├─ Trigger: Cliente cancela ou não renova
    ├─ Steps: Pesquisa de satisfação → Oferta de retorno → Arquivo
    └─ Automação: Follow-up em 30/60/90 dias
```

---

### FASE 3 — Implementação de Sistemas (Semana 5-8)

**Responsável:** `automation-engineer`

#### Passo 3.1 — Tech Stack Recomendada

```
FERRAMENTAS por categoria:
│
├─ GESTÃO DE CLIENTES (escolher 1)
│   ├─ Opção A: App de coaching (TrueCoach, TrainHeroic, Everfit)
│   ├─ Opção B: Notion/Airtable (DIY, mais flexível)
│   └─ Opção C: Planilha Google avançada (custo zero, menos escalável)
│
├─ PAGAMENTOS (escolher 1)
│   ├─ Opção A: Stripe/Pagar.me (recorrente automático)
│   ├─ Opção B: Hotmart/Kiwify (se vender programas)
│   └─ Opção C: Asaas (brasileiro, fácil, Pix recorrente)
│
├─ COMUNICAÇÃO
│   ├─ WhatsApp Business (obrigatório no Brasil)
│   ├─ Listas de transmissão (por tier ou por grupo)
│   └─ Automação: Chatbot simples para FAQ
│
├─ CHECK-INS
│   ├─ Google Forms ou Typeform (gratuito/barato)
│   ├─ Integração com planilha automática
│   └─ Notificação quando formulário é enviado
│
├─ CONTEÚDO
│   ├─ Canva (templates visuais)
│   ├─ CapCut (edição de vídeo simples)
│   └─ Banco de exercícios com vídeos gravados
│
└─ AUTOMAÇÃO
    ├─ Make/Zapier (conectar ferramentas)
    ├─ Automações essenciais:
    │   ├─ Novo pagamento → Criar pasta → Enviar boas-vindas
    │   ├─ Formulário enviado → Notificar coach → Atualizar planilha
    │   ├─ Check-in atrasado → Lembrete automático para cliente
    │   ├─ Renovação próxima → Sequência de retenção
    │   └─ Aniversário/marco → Mensagem personalizada
    └─ Investimento: R$50-200/mês (se paga com 1 cliente a mais)
```

#### Passo 3.2 — Implementação Gradual

```
CRONOGRAMA DE IMPLEMENTAÇÃO:
│
├─ SEMANA 5: Pagamento recorrente + Formulário de check-in
│   ├─ Migrar clientes atuais para pagamento automático
│   ├─ Criar formulário padrão de check-in
│   └─ Testar com 3 clientes antes de expandir
│
├─ SEMANA 6: Templates de treino + Batch processing
│   ├─ Criar os 6 templates base de treino
│   ├─ Implementar dia fixo de processamento de check-ins
│   └─ Criar banco de exercícios com substituições
│
├─ SEMANA 7: Automações básicas
│   ├─ Configurar lembrete de check-in automático
│   ├─ Configurar onboarding automatizado (parcialmente)
│   └─ Testar fluxo completo com cliente fictício
│
└─ SEMANA 8: Otimização + Documentação
    ├─ Documentar todos os SOPs finais
    ├─ Criar manual do coach (para si mesmo)
    ├─ Ajustar o que não funcionou
    └─ PREPARAR para aquisição de novos clientes
```

#### Passo 3.3 — Batch Processing Protocol

```
COMO PROCESSAR CHECK-INS EM LOTE:
│
├─ PREPARAÇÃO (10 min)
│   ├─ Abrir todos os formulários recebidos
│   ├─ Ordenar por tier (Premium primeiro, depois Standard, depois Essencial)
│   └─ Preparar template de resposta com blocos modulares
│
├─ PROCESSAMENTO (15-30 min por cliente)
│   ├─ Ler dados do check-in
│   ├─ Comparar com semana anterior (dashboard ou planilha)
│   ├─ Decidir: Manter / Ajustar treino / Ajustar dieta / Escalar
│   ├─ Montar feedback usando blocos modulares:
│   │   ├─ Bloco 1: Reconhecimento do esforço
│   │   ├─ Bloco 2: Análise dos dados
│   │   ├─ Bloco 3: Ajustes (se houver)
│   │   └─ Bloco 4: Orientação para próxima semana
│   └─ Enviar feedback personalizado
│
├─ FINALIZAÇÃO (10 min)
│   ├─ Atualizar dashboard com dados da semana
│   ├─ Marcar clientes que não enviaram check-in
│   └─ Disparar lembrete para quem não enviou
│
└─ TEMPO TOTAL ESTIMADO para 30 clientes:
    ├─ 5 Premium × 30 min = 2.5h
    ├─ 15 Standard × 20 min = 5h
    ├─ 10 Essencial × 10 min = 1.7h
    └─ TOTAL: ~9-10h/semana em check-ins
```

---

### FASE 4 — Aquisição e Pricing (Semana 9-16)

**Responsável:** `ecommerce-manager`

#### Passo 4.1 — Estratégia de Pricing

```
DEFINIÇÃO DE PREÇO por tier:
│
├─ MÉTODO 1: Baseado em valor de mercado
│   ├─ Pesquisar 10 coaches similares na sua região/nicho
│   ├─ Identificar faixa de preço do mercado
│   ├─ Posicionar-se conforme diferencial
│   └─ Regra: Nunca seja o mais barato (compete por preço = corrida para o fundo)
│
├─ MÉTODO 2: Baseado em custo + margem
│   ├─ Calcular custo por hora do coach
│   ├─ Multiplicar pelo tempo por cliente/mês
│   ├─ Adicionar margem de 100-200%
│   └─ Ajustar para competitividade
│
├─ MÉTODO 3: Baseado em resultado (RECOMENDADO)
│   ├─ Quanto vale para o cliente alcançar o objetivo?
│   ├─ Quanto ele gastaria em alternativas (academia, suplementos, dietas)?
│   ├─ Precificar como investimento, não como custo
│   └─ Mostrar ROI: "R$X/mês por resultados que valem R$Y para você"
│
└─ EXEMPLO de pricing para mercado brasileiro (2024-2025):
    ├─ PREMIUM: R$500-1.500/mês
    ├─ STANDARD: R$250-500/mês
    └─ ESSENCIAL: R$150-300/mês
```

#### Passo 4.2 — Funil de Aquisição

```
FUNIL DE AQUISIÇÃO:
│
├─ TOPO (Awareness): Conteúdo educativo
│   ├─ Instagram: 3-5 posts/semana (educativo + resultado de clientes)
│   ├─ Reels/TikTok: 2-3 vídeos curtos/semana (dicas práticas)
│   ├─ Stories: Diários (rotina, bastidores, mini-dicas)
│   └─ Meta: 50-100 novos seguidores qualificados/mês
│
├─ MEIO (Consideração): Prova social + autoridade
│   ├─ Transformações de clientes (antes/depois com permissão)
│   ├─ Depoimentos em vídeo
│   ├─ Conteúdo aprofundado (carrosséis, lives, podcasts)
│   └─ Meta: 10-20 leads qualificados/mês (DMs, comentários, perguntas)
│
├─ FUNDO (Conversão): Oferta + call
│   ├─ Call de diagnóstico gratuita (15-20 min)
│   ├─ Apresentar tier adequado ao perfil
│   ├─ Oferta com bônus de entrada (ex: avaliação gratuita, e-book)
│   └─ Meta: Converter 30-50% dos leads em clientes
│
└─ PÓS-VENDA (Retenção + Indicação)
    ├─ Programa de indicação: Cliente indica → desconto para ambos
    ├─ Reviews e depoimentos após 3 meses
    └─ Upgrade de tier quando mostrar comprometimento
```

#### Passo 4.3 — Estratégia de Crescimento Gradual

```
CRESCIMENTO SUSTENTÁVEL:
│
├─ MÊS 1-2: Validar sistemas com clientes atuais (10)
│   ├─ Migrar todos para novos processos
│   ├─ Coletar feedback e ajustar
│   └─ NÃO adicionar novos clientes ainda
│
├─ MÊS 3: Adicionar 3-5 clientes (total: 13-15)
│   ├─ Usar onboarding padronizado
│   ├─ Verificar se o tempo está dentro do planejado
│   └─ Ajustar processos se necessário
│
├─ MÊS 4-5: Adicionar 5-7 clientes (total: 18-22)
│   ├─ Batch processing deve estar fluindo
│   ├─ Automações devem estar funcionando
│   └─ Se stress > 7/10 → PAUSAR crescimento, otimizar
│
├─ MÊS 6-8: Adicionar 5-8 clientes (total: 25-30)
│   ├─ Operação deve estar suave
│   ├─ Churn deve estar < 10%/mês
│   └─ Receita deve estar crescendo proporcionalmente
│
└─ CHECKPOINT ao atingir 30:
    ├─ Avaliar: Qualidade de atendimento mantida?
    ├─ Avaliar: Saúde mental do coach OK?
    ├─ Avaliar: Churn rate aceitável?
    ├─ IF tudo OK → Decidir: Manter 30 ou escalar mais?
    └─ IF problemas → Estabilizar antes de crescer
```

---

## Caminhos de Escalação

| Situação | Escalar Para | Ação |
|----------|-------------|------|
| Coach sobrecarregado antes de 30 clientes | `business-diagnostician` | Reanalisar processos e gargalos |
| Churn > 15%/mês durante crescimento | `retention-engineer` | Ativar playbook retencao-cliente-em-risco.md |
| Dificuldade técnica com ferramentas | `automation-engineer` | Suporte de implementação |
| Precificação inadequada (muito barato/caro) | `ecommerce-manager` | Reanalisar mercado e reposicionar |
| Coach com burnout | `fitcoach-chief` | Pausa no crescimento, reavaliar modelo |
| Demanda maior que capacidade | `gym-scaler` | Avaliar contratação de assistente ou waitlist |

---

## Red Flags e Condições de Veto

### VETO — Parar Crescimento Imediatamente

- [ ] Coach dormindo < 6h/noite por causa do trabalho
- [ ] Churn rate > 20% por 2 meses consecutivos
- [ ] Reclamações de qualidade de 3+ clientes no mesmo mês
- [ ] Coach não consegue responder clientes em < 48h
- [ ] Burnout diagnosticado ou sintomas claros

### VETO PARCIAL — Pausar Crescimento e Estabilizar

- [ ] Tempo por cliente acima do planejado por tier
- [ ] Automações falhando e gerando retrabalho
- [ ] Coach sem tempo para criar conteúdo/marketing
- [ ] Processos não documentados gerando inconsistência
- [ ] Margem líquida diminuindo conforme cresce (custo > receita nova)

### ALERTAS — Monitorar

- [ ] Fila de espera crescendo mas coach não abre vagas → Pode ser medo de escalar
- [ ] Todos os clientes no tier mais barato → Problema de posicionamento
- [ ] Coach fazendo tudo manual apesar de ter ferramentas → Resistência à mudança
- [ ] Sem casos de sucesso para mostrar → Investir em documentação

---

## Checklist de Output

### Ao final da Fase 1:
- [ ] Mapeamento de tempo completo realizado
- [ ] Top 3 gargalos identificados e quantificados
- [ ] Análise financeira concluída
- [ ] Decisão de modelo (online/presencial/híbrido) tomada
- [ ] Meta de crescimento realista definida

### Ao final da Fase 2:
- [ ] Tiers de serviço definidos com pricing
- [ ] 6+ templates de treino criados
- [ ] 4+ templates de dieta criados
- [ ] Templates de check-in padronizados
- [ ] SOPs documentados para processos-chave

### Ao final da Fase 3:
- [ ] Tech stack selecionado e implementado
- [ ] Pagamento recorrente ativo
- [ ] Formulário de check-in funcionando
- [ ] Automações básicas operacionais
- [ ] Batch processing testado e validado

### Ao final da Fase 4:
- [ ] Pricing final definido e comunicado
- [ ] Funil de aquisição ativo
- [ ] Primeiros novos clientes adquiridos via funil
- [ ] Dashboard de métricas operando
- [ ] Meta de 30 clientes com timeline realista

---

## Templates

### Template: Dashboard de Métricas Semanais

```
📊 DASHBOARD SEMANAL — Coach [NOME]

Semana: [DATA]

CLIENTES:
├─ Ativos total: ___
├─ Premium: ___ | Standard: ___ | Essencial: ___
├─ Novos esta semana: ___
├─ Cancelamentos esta semana: ___
└─ Churn rate mensal: ___%

TEMPO:
├─ Horas trabalhadas total: ___h
├─ Horas em entrega (clientes): ___h
├─ Horas em admin: ___h
├─ Horas em marketing: ___h
└─ Tempo médio por cliente: ___min

FINANCEIRO:
├─ Receita mensal projetada: R$ _______
├─ Ticket médio: R$ _______
├─ Receita por hora: R$ _______
└─ Custos fixos: R$ _______

SATISFAÇÃO:
├─ NPS do mês: ___
├─ Check-ins atrasados: ___ clientes
├─ Reclamações: ___
└─ Indicações recebidas: ___

STATUS: ⬜ Saudável ⬜ Atenção ⬜ Crítico
NEXT: ⬜ Crescer ⬜ Estabilizar ⬜ Otimizar
```

### Template: Oferta por Tier

```
# CONSULTORIA FITNESS — [NOME DO COACH]

## 🏆 PLANO PREMIUM — R$ [X]/mês
Para quem quer resultado máximo com acompanhamento intensivo.

✅ Treino 100% personalizado e ajustado semanalmente
✅ Plano alimentar completo e flexível
✅ Check-in semanal por videochamada (30 min)
✅ Suporte via WhatsApp com resposta em até 12h
✅ Ajustes ilimitados de treino e dieta
✅ Relatório mensal de progresso com análise detalhada
✅ Avaliação física completa mensal

## ⭐ PLANO STANDARD — R$ [X]/mês
Para quem quer consistência com orientação profissional.

✅ Treino personalizado ajustado mensalmente
✅ Orientação alimentar com macros
✅ Check-in semanal por formulário com feedback escrito
✅ Suporte via WhatsApp com resposta em até 24h
✅ Ajustes quinzenais de treino e dieta
✅ Fotos comparativas mensais

## 💪 PLANO ESSENCIAL — R$ [X]/mês
Para quem quer começar com base sólida e direcionamento.

✅ Treino por perfil com personalização básica
✅ Guia alimentar com orientações práticas
✅ Check-in quinzenal por formulário
✅ Suporte via grupo exclusivo
✅ Ajustes mensais
✅ Acesso a conteúdo educativo exclusivo

---
📩 Agende sua call gratuita de diagnóstico: [LINK]
```

---

## Notas Finais

- Escalar não é apenas ter mais clientes. É ter SISTEMAS que permitem atender mais clientes sem perder qualidade.
- O gargalo principal nunca é técnico. É o coach não aceitar que precisa largar o controle total e padronizar.
- Preço baixo demais atrai clientes que não valorizam o serviço e dão mais trabalho.
- Meça TUDO. O que não é medido não pode ser melhorado. Dashboard semanal é obrigatório.
- Crescimento sustentável > crescimento rápido. 30 clientes felizes > 50 clientes insatisfeitos.
- Seu tempo é o recurso mais escasso. Cada hora gasta em tarefa repetitiva é uma hora roubada de atividade de alto valor.
