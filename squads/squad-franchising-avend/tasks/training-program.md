# Task: training-program

```yaml
task: training-program
id: FA-TASK-007
responsavel: "@franchise-training"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - operations_manual_path: string - Path para manual de operacoes
  - franchise_model_path: string - Path para modelo de franquia
  - competency_framework_path: string - Path para framework de competencias (opcional)
  - existing_training_materials: string - Materiais de treinamento existentes (opcional)

Saida:
  - training-program-avend.md: Programa de treinamento completo (universidade da franquia)
  - training-curriculum.md: Curriculo detalhado modulo a modulo
  - assessment-framework.md: Framework de avaliacao e certificacao

Checklist:
  - Programa de treinamento inicial (pre-inauguracao) definido
  - Programa de treinamento continuado definido
  - Modulos temerticos com objetivos de aprendizagem claros
  - Metodologia de ensino definida (presencial, EAD, hibrido)
  - Framework de avaliacao e certificacao
  - Material didatico especificado
  - Cronograma do treinamento inicial
  - Programa de reciclagem e atualizacao
  - Treinamento de multiplicadores
  - KPIs de efetividade do treinamento
  - Compliance com regulamentacoes (seguranca alimentar)

veto_conditions:
  - Treinamento sem componente pratico (apenas teorico)
  - Ausencia de modulo sobre seguranca alimentar (ANVISA)
  - Programa sem avaliacao de aprendizagem
  - Treinamento inicial sem acompanhamento pos-inauguracao
  - Conteudo desalinhado com manual de operacoes

output_examples:
  - |
    ## Universidade Avend — Programa de Treinamento
    ### Modulo 1: Fundamentos (8h)
    - Historia e cultura Avend
    - Modelo de negocio e unit economics
    - Obrigacoes do franqueado
    ### Modulo 2: Operacao (16h)
    - Abastecimento (teoria + pratica)
    - Manutencao basica
    - Gestao de pontos
    **Carga horaria total: 48h (5 dias)**
```

---

## Purpose

Desenhar o **programa de treinamento completo** (Universidade da Franquia) para franqueados Avend, cobrindo desde o treinamento inicial ate a educacao continuada. O programa deve garantir que todo franqueado tenha as competencias necessarias para operar com excelencia, seguindo os padroes da rede.

**Principio fundamental:** O treinamento e o mecanismo de transferencia de know-how do franqueador para o franqueado. Se o treinamento falha, a padronizacao falha, a qualidade cai e a rede sofre. Um franqueado bem treinado e um franqueado mais satisfeito, mais produtivo e menos propenso a conflitos.

**Contexto Avend:** O treinamento deve cobrir: operacao de vending machines (abastecimento, manutencao basica), gestao de pontos comerciais, seguranca alimentar (ANVISA/RDC 216), gestao financeira basica, uso de sistemas (telemetria, dashboard), e marketing local. O perfil do franqueado Avend e diverso — o programa deve funcionar para alguem sem experiencia previa em vending.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `operations_manual_path` | string | Sim | Manual de operacoes (base do conteudo tecnico) |
| `franchise_model_path` | string | Sim | Modelo de franquia: obrigacoes, padronizacao, suporte |
| `competency_framework_path` | string | Nao | Framework de competencias definido |
| `existing_training_materials` | string | Nao | Materiais ja existentes para reaproveitar |
| `regulatory_requirements` | string | Nao | Requisitos de treinamento regulatorio (ANVISA) |
| `network_feedback` | string | Nao | Feedback de franqueados sobre gaps de treinamento |

---

## Preconditions

1. **Manual de operacoes**: A task `operations-manual` (FA-TASK-004) deve estar concluida.
2. **Modelo de franquia definido**: Obrigacoes, padronizacao, escopo de atuacao.
3. **Perfil do franqueado**: Definido para calibrar nivel e linguagem do treinamento.
4. **Infraestrutura minima**: Local para treinamento presencial ou plataforma EAD.
5. **Equipe de treinamento**: Pelo menos 1 pessoa responsavel pelo programa.

---

## Key Activities & Instructions

### Phase 1: Design do Framework de Competencias

**1.1 — Competencias do Franqueado Avend**

Mapear todas as competencias necessarias:

```yaml
competency_framework:
  tecnicas:
    - id: CT-001
      nome: "Operacao de maquinas de vending"
      nivel: "Essencial"
      descricao: "Abastecer, limpar e realizar manutencao basica"
      modulo: "Operacao"

    - id: CT-002
      nome: "Manutencao preventiva e troubleshooting"
      nivel: "Essencial"
      descricao: "Diagnosticar e resolver problemas basicos de equipamento"
      modulo: "Manutencao"

    - id: CT-003
      nome: "Seguranca alimentar e higiene"
      nivel: "Obrigatorio (regulatorio)"
      descricao: "Boas praticas ANVISA/RDC 216, controle de temperatura"
      modulo: "Compliance"

    - id: CT-004
      nome: "Uso de sistemas (telemetria, dashboard)"
      nivel: "Essencial"
      descricao: "Monitorar maquinas, gerar relatorios, usar app"
      modulo: "Tecnologia"

    - id: CT-005
      nome: "Gestao de estoque e mix"
      nivel: "Importante"
      descricao: "Planograma, controle PVPS, pedidos a fornecedores"
      modulo: "Operacao"

  gestao:
    - id: CG-001
      nome: "Gestao financeira basica"
      nivel: "Essencial"
      descricao: "Fluxo de caixa, DRE simplificada, controles"
      modulo: "Financeiro"

    - id: CG-002
      nome: "Gestao de pontos comerciais"
      nivel: "Essencial"
      descricao: "Prospectar, negociar, manter relacionamento"
      modulo: "Comercial"

    - id: CG-003
      nome: "Gestao de pessoas"
      nivel: "Condicional"
      descricao: "Para franqueados com auxiliares operacionais"
      modulo: "Gestao"

  comportamentais:
    - id: CC-001
      nome: "Disciplina operacional"
      nivel: "Essencial"
      descricao: "Seguir processos, manter rotina, cumprir checklists"
      modulo: "Cultura"

    - id: CC-002
      nome: "Relacionamento interpessoal"
      nivel: "Importante"
      descricao: "Negociacao com pontos, atendimento, rede de franqueados"
      modulo: "Comercial"

    - id: CC-003
      nome: "Resolucao de problemas"
      nivel: "Importante"
      descricao: "Lidar com imprevistos, troubleshooting, escalar quando necessario"
      modulo: "Operacao"
```

---

### Phase 2: Programa de Treinamento Inicial

**2.1 — Estrutura Geral**

```yaml
initial_training:
  nome: "Programa de Formacao de Franqueados Avend"
  duracao_total: "40-48 horas (5 dias)"
  formato: "Presencial (hibrido para modulos teoricos)"
  local: "Sede Avend + Unidade escola"
  pre_requisitos:
    - Contrato de franquia assinado
    - COF recebida e prazo legal cumprido
    - Investimento inicial quitado/confirmado
  certificacao: "Certificado de Conclusao (obrigatorio para inaugurar)"
```

**2.2 — Curriculo Detalhado**

**DIA 1: Fundamentos e Cultura (8h)**

```
MODULO 1: BEM-VINDO A REDE AVEND (2h)
- Objetivo: Integrar o franqueado a cultura e historia da Avend
- Conteudo:
  * Historia da Avend e do fundador Guilherme Alvares
  * Missao, visao e valores
  * A marca Avend: o que ela representa
  * O mercado de vending no Brasil e no mundo
  * O que significa ser franqueado (direitos e deveres)
- Atividade: Dinamica de integracao com outros franqueados
- Avaliacao: Nenhuma (modulo de integracao)

MODULO 2: O MODELO DE NEGOCIO (3h)
- Objetivo: Entender o modelo economico e como ganhar dinheiro
- Conteudo:
  * Unit economics: como cada maquina gera lucro
  * Investimento, custos, receitas e margens
  * Royalties e taxas: para que servem
  * DRE do franqueado: leitura e interpretacao
  * Payback e ROI: o que esperar
  * Cenarios: pessimista, realista, otimista
- Atividade: Exercicio pratico com DRE simulada
- Avaliacao: Quiz (10 questoes)

MODULO 3: SUAS OBRIGACOES E DIREITOS (3h)
- Objetivo: Entender claramente as regras do jogo
- Conteudo:
  * Contrato de franquia: clausulas-chave
  * O que o franqueador oferece (suporte, marca, tecnologia)
  * O que o franqueado deve fazer (operacao, padroes, reporting)
  * Padronizacao: por que e nao-negociavel
  * Canais de comunicacao com o franqueador
  * Resolucao de duvidas e problemas
- Atividade: Estudo de caso — franqueado que seguiu vs. nao seguiu padroes
- Avaliacao: Quiz (10 questoes)
```

**DIA 2: Operacao — Teoria + Pratica (8h)**

```
MODULO 4: OPERACAO DE VENDING MACHINES (4h)
- Objetivo: Dominar a operacao diaria de vending machines
- Conteudo:
  * Tipos de maquinas da rede Avend
  * Anatomia da maquina (componentes, funcoes)
  * SOP-001: Abastecimento passo-a-passo
  * Planograma: o que e, como seguir
  * Monitoramento via telemetria
  * Coleta de valores e conferencia
  * Rotina diaria completa
- Atividade: Pratica de abastecimento em maquina real (unidade escola)
- Avaliacao: Pratica avaliada (checklist de competencia)

MODULO 5: MANUTENCAO BASICA (4h)
- Objetivo: Realizar manutencao preventiva e resolver problemas comuns
- Conteudo:
  * SOP-002: Manutencao preventiva (cronograma e checklist)
  * Troubleshooting: 10 problemas mais comuns e solucoes
  * Quando chamar assistencia tecnica (o que NAO fazer)
  * Cuidados com o equipamento
  * Gestao de pecas de reposicao
  * Registro de manutencao no sistema
- Atividade: Pratica — identificar e resolver 3 problemas simulados
- Avaliacao: Pratica avaliada (checklist de competencia)
```

**DIA 3: Gestao Comercial e Pontos (8h)**

```
MODULO 6: GESTAO DE PONTOS COMERCIAIS (4h)
- Objetivo: Dominar a selecao, negociacao e gestao de pontos
- Conteudo:
  * SOP-003: Gestao de pontos
  * Criterios de selecao de ponto (fluxo, perfil, infraestrutura)
  * Como abordar um responsavel de ponto
  * Negociacao: modelo de parceria, termos, contrato
  * Relacionamento continuo com o ponto
  * Avaliacao de performance do ponto (30/60/90 dias)
  * Quando trocar de ponto
- Atividade: Roleplay — negociacao com responsavel de ponto
- Avaliacao: Roleplay avaliado (checklist)

MODULO 7: PRODUTOS E ESTOQUE (2h)
- Objetivo: Gerenciar mix, estoque e fornecedores
- Conteudo:
  * Categorias de produtos na rede Avend
  * Planograma: como escolher o mix certo para cada ponto
  * Fornecedores homologados: como pedir, prazos, precos
  * Controle de estoque no deposito
  * PVPS (Primeiro que Vence, Primeiro que Sai)
  * Gestao de perdas e shelf life
- Atividade: Montar planograma para 3 tipos de ponto
- Avaliacao: Exercicio pratico

MODULO 8: MARKETING LOCAL (2h)
- Objetivo: Usar a marca e comunicar no ponto de venda
- Conteudo:
  * Identidade visual Avend: regras de uso
  * Material de comunicacao no ponto
  * Acoes promocionais permitidas
  * Redes sociais: o que pode e nao pode
  * Como gerar demanda no ponto
- Atividade: Criar mini-plano de marketing para seu territorio
- Avaliacao: Exercicio pratico
```

**DIA 4: Financeiro, Tecnologia e Compliance (8h)**

```
MODULO 9: GESTAO FINANCEIRA (3h)
- Objetivo: Controlar as financas da operacao
- Conteudo:
  * SOP-005: Controles financeiros
  * Fluxo de caixa: como fazer e manter
  * DRE mensal: como preencher e interpretar
  * Pagamento de royalties e taxas (prazos, forma)
  * Notas fiscais e obrigacoes tributarias (Simples Nacional)
  * Relatorio mensal ao franqueador
  * Reserva de reinvestimento
- Atividade: Preencher DRE com dados simulados
- Avaliacao: Exercicio pratico + quiz

MODULO 10: TECNOLOGIA E SISTEMAS (2h)
- Objetivo: Usar os sistemas da rede com proficiencia
- Conteudo:
  * Dashboard do franqueado: navegacao e funcoes
  * Telemetria: como monitorar maquinas remotamente
  * Alertas e notificacoes: o que cada um significa
  * App do franqueado: funcoes e uso diario
  * Sistemas de pagamento: configuracao e troubleshooting
  * Suporte tecnico: como solicitar
- Atividade: Hands-on nos sistemas (com dados de treinamento)
- Avaliacao: Exercicio pratico no sistema

MODULO 11: SEGURANCA ALIMENTAR E COMPLIANCE (3h)
- Objetivo: Operar em conformidade com regulamentacao sanitaria
- Conteudo:
  * ANVISA/RDC 216: o que se aplica a vending
  * Boas praticas de manipulacao de alimentos
  * Controle de temperatura (maquinas refrigeradas)
  * Registro de temperaturas (log obrigatorio)
  * Validade de produtos: verificacao e retirada
  * Higienizacao de equipamentos
  * O que fazer em caso de fiscalizacao sanitaria
  * Documentacao obrigatoria no ponto
- Atividade: Pratica de checklist sanitario em maquina real
- Avaliacao: Prova teorica + pratica avaliada (OBRIGATORIO APROVACAO)
```

**DIA 5: Integracao Final e Certificacao (8h)**

```
MODULO 12: EMERGENCIAS E CONTINGENCIAS (2h)
- Objetivo: Saber agir em situacoes de emergencia
- Conteudo:
  * SOP-006: Procedimentos de emergencia
  * Maquina vandalizada/roubada
  * Produto contaminado ou reclamacao grave
  * Problema eletrico ou hidraulico
  * Procedimento com seguradora
  * Quando e como escalar para o franqueador
- Atividade: Simulacao de cenario de emergencia
- Avaliacao: Roleplay avaliado

MODULO 13: RELACAO COM A REDE (2h)
- Objetivo: Maximizar o valor de ser parte da rede
- Conteudo:
  * Canais de comunicacao: como e quando usar cada um
  * Convencoes e eventos da rede
  * Benchmarking: como aprender com outros franqueados
  * Programa de excelencia: como pontuar
  * Feedback e sugestoes: como contribuir
  * Consultor de campo: como funciona a parceria
- Atividade: Dinamica de grupo — trocar experiencias

MODULO 14: PROVA FINAL E CERTIFICACAO (4h)
- Prova teorica: 40 questoes (minimo 70% para aprovacao)
- Prova pratica: Abastecimento + manutencao + checklist sanitario
- Plano de acao: Franqueado apresenta plano para primeiros 30 dias
- Entrega de certificado
- Agendamento de inauguracao com acompanhamento
```

---

### Phase 3: Programa de Treinamento Continuado

**3.1 — Educacao Continuada Anual**

```yaml
continuing_education:
  webinars_mensais:
    formato: "Online, 1h"
    frequencia: "1x/mes"
    temas_rotativos:
      - Novos produtos e tendencias
      - Boas praticas operacionais
      - Gestao financeira avancada
      - Cases de sucesso da rede
      - Atualizacoes de sistemas
      - Compliance e regulamentacao

  workshops_trimestrais:
    formato: "Presencial ou hibrido, 4h"
    frequencia: "1x/trimestre"
    temas:
      - Q1: Planejamento anual e metas
      - Q2: Operacao e produtividade
      - Q3: Comercial e novos pontos
      - Q4: Resultados e reconhecimento

  convencao_anual:
    formato: "Presencial, 2 dias"
    frequencia: "1x/ano"
    conteudo:
      - Resultados da rede e tendencias
      - Estrategia para proximo ano
      - Treinamentos avancados
      - Networking entre franqueados
      - Premiacao dos melhores

  reciclagem_obrigatoria:
    frequencia: "Anual"
    modulos_obrigatorios:
      - Seguranca alimentar (renovacao ANVISA)
      - Atualizacao de sistemas
      - Novas regras da rede
    carga_horaria: "8h/ano"
```

---

### Phase 4: Framework de Avaliacao

**4.1 — Avaliacao do Treinamento Inicial**

| Avaliacao | Tipo | Peso | Minimo Aprovacao |
|-----------|------|------|-----------------|
| Modulo 2 - Quiz | Teorico | 10% | 70% |
| Modulo 3 - Quiz | Teorico | 10% | 70% |
| Modulo 4 - Pratica | Pratico | 15% | 80% |
| Modulo 5 - Pratica | Pratico | 10% | 70% |
| Modulo 6 - Roleplay | Pratico | 10% | 70% |
| Modulo 11 - Compliance | Teorico+Pratico | 15% | 80% (obrigatorio) |
| Prova Final - Teorica | Teorico | 15% | 70% |
| Prova Final - Pratica | Pratico | 15% | 80% |

**Regra de aprovacao:** Score ponderado >= 75% E Modulo 11 (Compliance) >= 80%.

**Se reprovado:** Reforco nos modulos deficientes + nova avaliacao em 7 dias. Maximo 2 tentativas. Se reprovar na 2a, reavaliar contrato.

**4.2 — KPIs de Efetividade do Treinamento**

| KPI | Formula | Target |
|-----|---------|--------|
| Taxa de aprovacao | Aprovados / Total | > 90% |
| NPS do treinamento | Pesquisa pos-treinamento | > 8/10 |
| Tempo ate autonomia | Dias ate operar sem supervisao | < 30 dias |
| Performance pos-treinamento | Faturamento mes 3 vs. meta | > 70% da meta |
| Incidentes operacionais | Nos primeiros 90 dias | < 3 por franqueado |
| Compliance em auditoria | Score 1a auditoria | > 80% |
| Retencao de conhecimento | Teste 90 dias apos treinamento | > 70% |

---

## Validation

### Criterios de Qualidade do Programa

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Cobertura | Todas as competencias mapeadas e treinadas | [ ] |
| Pratica | Componente pratico em modulos operacionais | [ ] |
| Compliance | Modulo de seguranca alimentar obrigatorio | [ ] |
| Avaliacao | Framework de avaliacao completo | [ ] |
| Continuidade | Programa de educacao continuada definido | [ ] |
| Materiais | Especificacao de materiais didaticos | [ ] |
| Alinhamento | Conteudo alinhado ao manual de operacoes | [ ] |
| Cronograma | Cronograma realista e detalhado | [ ] |
| Feedback | Mecanismo de feedback e melhoria | [ ] |
| Metricas | KPIs de efetividade definidos | [ ] |

### Checklist de Entrega

- [ ] `training-program-avend.md` gerado
- [ ] `training-curriculum.md` gerado
- [ ] `assessment-framework.md` gerado
- [ ] Framework de competencias mapeado
- [ ] Curriculo do treinamento inicial (5 dias, 14 modulos)
- [ ] Programa de educacao continuada definido
- [ ] Framework de avaliacao e certificacao
- [ ] KPIs de efetividade definidos
- [ ] Programa de reciclagem obrigatoria
- [ ] Modulo de seguranca alimentar detalhado

---

## References

- **Hopkinson, Penny.** "Manual Magic." — Treinamento como extensao do manual.
- **ABF.** "Guia de Treinamento para Redes de Franquias."
- **ANVISA — RDC 216/2004.** Treinamento obrigatorio em boas praticas.
- **Siebert, Mark.** "Franchise Your Business." — Training program design.
- **Kirkpatrick, Donald.** "Evaluating Training Programs: The Four Levels." — Framework de avaliacao.
- **Bloom, Benjamin.** Taxonomia de Bloom — niveis de aprendizagem.
- **Nathan, Greg.** "The Franchise E-Factor." — Treinamento como fator de satisfacao.

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-007*
