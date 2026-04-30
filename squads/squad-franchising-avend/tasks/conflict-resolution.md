# Task: conflict-resolution

```yaml
task: conflict-resolution
id: FA-TASK-012
responsavel: "@franchise-relationship (primary) + @franchise-legal (escalation)"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - conflict_report_path: string - Path para relatorio ou registro do conflito
  - franchise_contract_path: string - Path para contrato de franquia das partes envolvidas
  - communication_log_path: string - Path para historico de comunicacoes entre as partes (opcional)
  - e_factor_data_path: string - Path para dados de E-Factor dos franqueados envolvidos (opcional)
  - network_context_path: string - Path para contexto da rede (outros conflitos, padroes recorrentes)

Saida:
  - conflict-diagnosis-report.md: Diagnostico completo do conflito com classificacao e fase E-Factor
  - resolution-plan.md: Plano de resolucao com etapas, responsaveis e prazos
  - prevention-recommendations.md: Recomendacoes de prevencao para evitar recorrencia

Checklist:
  - Conflito classificado por tipo (operacional, financeiro, territorial, marca, legal)
  - Fase do E-Factor identificada para cada parte envolvida
  - Severidade do conflito avaliada (baixa, media, alta, critica)
  - Historico do relacionamento franqueador-franqueado revisado
  - Contrato de franquia analisado para clausulas relevantes
  - Compliance com Lei 13.966/2019 verificada no contexto do conflito
  - Protocolo de escalacao determinado (informal, mediacao, arbitragem, judicial)
  - Plano de resolucao com timeline e responsaveis definido
  - Analise de impacto na rede realizada
  - Framework de prevencao aplicado com sinais de alerta precoce
  - Mediacao ABF considerada quando aplicavel
  - Documentacao completa para eventual escalacao juridica

veto_conditions:
  - Resolucao sem ouvir ambas as partes (franqueador E franqueado)
  - Diagnostico sem analisar o contrato de franquia vigente
  - Escalacao judicial sem tentar mediacao/arbitragem primeiro (Art. 7o, Lei 13.966/2019)
  - Recomendacao que viole direitos contratuais de qualquer parte
  - Resolucao sem classificacao formal do tipo e severidade do conflito
  - Intervencao sem avaliar impacto na rede como um todo
  - Desconsiderar o estagio do E-Factor no diagnostico relacional

output_examples:
  - |
    ## Diagnostico de Conflito — FA-CONF-2026-003
    | Dimensao | Avaliacao |
    |----------|-----------|
    | Tipo | FINANCEIRO — Questionamento de royalties |
    | Severidade | ALTA |
    | Fase E-Factor | Fee (Taxas) — 14 meses de rede |
    | Franqueado(s) | #047 — Regiao Sul |
    | Historico | 2 chamados anteriores sobre custos |
    | Escalacao | Nivel 2 — Mediacao Interna |
    **Recomendacao: Sessao de realinhamento de valor + revisao de performance financeira**
  - |
    ## Plano de Resolucao — FA-CONF-2026-007
    | Etapa | Acao | Responsavel | Prazo | Status |
    |-------|------|-------------|-------|--------|
    | 1 | Escuta ativa — franqueado | @franchise-relationship | D+2 | [ ] |
    | 2 | Escuta ativa — franqueador | @franchise-relationship | D+3 | [ ] |
    | 3 | Analise contratual | @franchise-legal | D+5 | [ ] |
    | 4 | Mediacao conjunta | @franchise-relationship | D+10 | [ ] |
    | 5 | Acordo formalizado | @franchise-legal | D+15 | [ ] |
    | 6 | Follow-up 30 dias | @franchise-relationship | D+45 | [ ] |
    **Protocolo: Mediacao Interna | Prazo total: 45 dias | Risco de escalacao: MEDIO**
```

---

## Purpose

Diagnosticar e resolver conflitos entre franqueador e franqueados na rede Avend, utilizando a **metodologia E-Factor de Greg Nathan** como framework relacional principal, complementada por analise contratual, classificacao estruturada e protocolos de escalacao alinhados ao contexto juridico brasileiro.

**O conflito em franquias e inevitavel — a questao e como gerencia-lo.** A relacao franqueador-franqueado e inerentemente tensionada: o franqueador quer padronizacao e controle; o franqueado quer autonomia e retorno. Greg Nathan demonstrou que essa tensao segue padroes previsiveis (as 7 fases do relacionamento) e que o E-Factor (Emotional Factor) e o maior preditor de conflitos e churn na rede.

**Greg Nathan e o Franchise Relationships Institute:** Nathan, psicologo e consultor australiano, fundou o Franchise Relationships Institute (FRI) e e reconhecido mundialmente como a maior autoridade em relacionamento franqueador-franqueado. Sua pesquisa de mais de 30 anos demonstra que:

1. **O maior custo da rede nao e operacional — e relacional.** Conflitos mal geridos geram churn, litigios, dano reputacional e perda de know-how.
2. **Conflitos sao previsiveis.** As fases do E-Factor mapeiam quando e por que os conflitos surgem.
3. **Prevencao e mais barata que resolucao.** Para cada R$1 investido em prevencao, economiza-se R$10-50 em resolucao.

**Contexto brasileiro:** A Lei 13.966/2019 (Lei de Franquias) estabelece mecanismos especificos de resolucao de disputas, incluindo clausula arbitral (Art. 7o). A ABF (Associacao Brasileira de Franchising) oferece servicos de mediacao. O sistema judicial brasileiro e lento e custoso, tornando metodos alternativos de resolucao (ADR) essenciais.

**Contexto Avend:** Com 90 contratos de franquia e operacao de vending machines em escala nacional, a Avend enfrenta uma multiplicidade de pontos potenciais de conflito: territorios, taxas, suporte, fornecedores, padroes operacionais. A gestao proativa de conflitos e fator critico para a saude e crescimento sustentavel da rede.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `conflict_report_path` | string | Sim | Registro formal ou informal do conflito (reclamacao, chamado, relato) |
| `franchise_contract_path` | string | Sim | Contrato de franquia das partes envolvidas |
| `communication_log_path` | string | Recomendado | Historico de e-mails, mensagens, atas de reuniao entre as partes |
| `e_factor_data_path` | string | Recomendado | Dados de E-Factor dos franqueados envolvidos (survey, score) |
| `network_context_path` | string | Nao | Historico de conflitos da rede, padroes recorrentes |
| `field_reports_path` | string | Nao | Relatorios de consultores de campo sobre os franqueados envolvidos |
| `financial_data_path` | string | Nao | Performance financeira dos franqueados envolvidos |
| `cof_path` | string | Nao | COF vigente (para verificacao de compliance) |

---

## Preconditions

1. **Conflito registrado formalmente**: Deve existir registro escrito do conflito, mesmo que informal.
2. **Contrato de franquia acessivel**: O contrato vigente entre as partes deve estar disponivel.
3. **Disponibilidade das partes**: Ambas as partes devem estar disponiveis para serem ouvidas.
4. **Dados do E-Factor**: Idealmente, dados de satisfacao do franqueado envolvido ja coletados.
5. **Neutralidade do mediador**: O agente deve atuar como terceiro imparcial, nao como representante do franqueador.
6. **Confidencialidade**: Todas as informacoes do processo de resolucao sao confidenciais.

---

## Key Activities & Instructions

### Phase 1: Triagem e Classificacao do Conflito

**1.1 — Registro Inicial do Conflito**

```yaml
conflict_record:
  id: "FA-CONF-{ANO}-{SEQ}"
  data_registro: ""
  data_ocorrencia: ""
  registrado_por: ""  # Franqueador / Franqueado / Consultor de campo / Terceiro

  partes:
    franqueador:
      representante: ""
      cargo: ""
    franqueado:
      id: ""
      nome: ""
      regiao: ""
      data_ingresso: ""
      tempo_rede_meses: 0
      num_maquinas: 0

  descricao_conflito: ""
  historico_anterior: []  # Conflitos anteriores entre as mesmas partes
  urgencia_percebida: ""  # Baixa / Media / Alta / Critica
  impacto_operacional: ""  # Descricao do impacto na operacao
```

**1.2 — Matriz de Classificacao de Conflitos**

| Tipo | Descricao | Exemplos | Frequencia Tipica | Severidade Base |
|------|-----------|----------|-------------------|----------------|
| **OPERACIONAL** | Padronizacao, processos, qualidade | Nao seguir manual, mix de produtos, horarios, abastecimento, manutencao | Alta (40-50%) | MEDIA |
| **FINANCEIRO** | Taxas, royalties, performance, ROI | Questionamento de royalties, inadimplencia, ROI insatisfatorio, fundo de marketing | Alta (25-35%) | ALTA |
| **TERRITORIAL** | Exclusividade, concorrencia entre franqueados | Sobreposicao de territorios, canibalismo, novos pontos em area existente | Media (10-15%) | ALTA |
| **MARCA** | Uso da marca, comunicacao, reputacao | Uso indevido da marca, comunicacao nao autorizada, dano reputacional, imagem | Baixa (5-10%) | ALTA |
| **LEGAL** | Contratual, regulatorio, rescisao | Descumprimento contratual, rescisao antecipada, transferencia, renovacao, litigio | Baixa (5-10%) | CRITICA |

**1.3 — Avaliacao de Severidade**

```
MATRIZ DE SEVERIDADE DO CONFLITO
============================================================
| Fator | Peso | 1 (Baixo) | 2 (Medio) | 3 (Alto) | 4 (Critico) |
|-------|------|-----------|-----------|----------|-------------|
| Impacto financeiro | 25% | < R$5k | R$5-20k | R$20-100k | > R$100k |
| Risco juridico | 25% | Nenhum | Potencial | Provavel | Iminente |
| Impacto na rede | 20% | Isolado | 2-5 fran. | 6-20 fran. | Rede toda |
| Risco reputacional | 15% | Nenhum | Interno | Midia local | Midia nacional |
| Urgencia temporal | 15% | Meses | Semanas | Dias | Horas |

SCORE DE SEVERIDADE: ___/4.0

CLASSIFICACAO:
| Score | Severidade | SLA de Resposta | Escalacao |
|-------|-----------|-----------------|-----------|
| 1.0-1.5 | BAIXA | 15 dias | Nivel 1 — Consultor de campo |
| 1.6-2.5 | MEDIA | 7 dias | Nivel 2 — Gerencia de rede |
| 2.6-3.5 | ALTA | 48 horas | Nivel 3 — Diretoria + Juridico |
| 3.6-4.0 | CRITICA | 24 horas | Nivel 4 — CEO + Juridico externo |
============================================================
```

**1.4 — Subclassificacao por Natureza**

```yaml
conflict_subclassification:
  operacional:
    - padronizacao_processos: "Franqueado nao segue SOP"
    - mix_produtos: "Franqueado quer mudar mix"
    - fornecedores: "Uso de fornecedores nao homologados"
    - manutencao: "Qualidade de manutencao de maquinas"
    - abastecimento: "Frequencia ou qualidade de abastecimento"
    - tecnologia: "Recusa em usar sistema de gestao"
    - horarios: "Operacao fora do padrao"

  financeiro:
    - royalties: "Questionamento do valor ou base de calculo"
    - inadimplencia: "Atraso ou recusa de pagamento"
    - fundo_marketing: "Uso ou valor do fundo de propaganda"
    - roi_insatisfatorio: "Retorno abaixo da expectativa"
    - custos_ocultos: "Custos nao previstos na COF"
    - renegociacao: "Pedido de revisao de condicoes financeiras"

  territorial:
    - sobreposicao: "Territorios nao respeitados"
    - canibalismo: "Novo ponto afeta franqueado existente"
    - exclusividade: "Interpretacao divergente de exclusividade"
    - expansao: "Franqueado quer expandir para area de outro"

  marca:
    - uso_indevido: "Uso da marca fora dos padroes"
    - comunicacao: "Material de divulgacao nao autorizado"
    - reputacao: "Acao do franqueado que danifica a marca"
    - redes_sociais: "Publicacoes inadequadas em nome da marca"

  legal:
    - rescisao: "Uma das partes quer rescindir"
    - transferencia: "Cessao de direitos a terceiros"
    - renovacao: "Divergencia sobre renovacao contratual"
    - descumprimento: "Violacao de clausula contratual"
    - vinculo_empregaticio: "Alegacao de subordinacao (Art. 1o)"
```

**Elicitation point:** Solicitar ao usuario os dados do conflito para classificacao. Se ja existem, preencher automaticamente.

---

### Phase 2: Diagnostico Relacional (E-Factor de Greg Nathan)

**2.1 — As 7 Fases do Relacionamento Franqueador-Franqueado**

Greg Nathan identificou 7 fases previsiveis no ciclo de vida do relacionamento:

| Fase | Nome | Emocao Dominante | Tempo Tipico | Conflitos Tipicos |
|------|------|------------------|-------------|-------------------|
| **1** | **Glee** (Entusiasmo) | Euforia, gratidao | 0-6 meses | Raros — lua de mel |
| **2** | **Fee** (Taxas) | Questionamento, duvida | 6-18 meses | Royalties, valor percebido, custos |
| **3** | **Me** (Independencia) | Autoconfianca, arrogancia | 12-24 meses | "Sei fazer melhor sozinho", padronizacao |
| **4** | **Free** (Liberdade) | Frustracao, revolta | 18-36 meses | Regras, autonomia, desejo de sair |
| **5** | **See** (Visao) | Reflexao, maturidade | 24-48 meses | Geralmente reduzidos — reconhecimento |
| **6** | **We** (Parceria) | Colaboracao, respeito | 36+ meses | Estrategicos — contribuicao positiva |
| **7** | **Flee** (Saida) | Desengajamento total | Qualquer fase | Rescisao, abandono, litigio |

**IMPORTANTE:** A fase "Flee" pode ocorrer a partir de qualquer fase, especialmente se conflitos nas fases 2-4 nao forem tratados adequadamente. E a fase terminal onde o franqueado ja decidiu sair.

**2.2 — Diagnostico da Fase E-Factor do Franqueado**

```yaml
e_factor_diagnostic:
  franqueado_id: ""
  tempo_rede_meses: 0

  indicadores_glee:  # Score 0-10
    - entusiasmo_com_marca: 0
    - gratidao_pelo_suporte: 0
    - aceita_orientacoes_sem_questionar: 0

  indicadores_fee:  # Score 0-10
    - questiona_valor_royalties: 0
    - compara_custos_com_concorrentes: 0
    - reclama_de_taxas_periodicamente: 0

  indicadores_me:  # Score 0-10
    - acredita_saber_mais_que_franqueador: 0
    - quer_personalizar_operacao: 0
    - ignora_orientacoes_do_consultor: 0

  indicadores_free:  # Score 0-10
    - desrespeita_padroes_abertamente: 0
    - ameaca_sair_da_rede: 0
    - organiza_outros_franqueados_contra: 0

  indicadores_see:  # Score 0-10
    - reconhece_valor_do_sistema: 0
    - busca_dialogo_construtivo: 0
    - aceita_feedback_com_maturidade: 0

  indicadores_we:  # Score 0-10
    - contribui_ativamente_para_rede: 0
    - mentora_novos_franqueados: 0
    - propoe_melhorias_colaborativamente: 0

  indicadores_flee:  # Score 0-10
    - desengajamento_total: 0
    - busca_assessoria_juridica: 0
    - para_de_pagar_royalties: 0

  fase_predominante: ""
  fase_secundaria: ""
  risco_de_flee: ""  # Baixo / Medio / Alto / Iminente
  e_factor_score: 0  # Score global 0-10
```

**2.3 — Mapa de Conflitos por Fase do E-Factor**

```
MAPA CONFLITO x E-FACTOR
============================================================
| Fase | Conflito Tipico | Intervencao Recomendada |
|------|----------------|------------------------|
| Glee | Expectativas irreais | Gestao de expectativas, realismo |
| Fee | "Royalties sao caros" | Demonstrar ROI, valor agregado |
| Me | "Sei fazer melhor" | Reconhecer expertise, incluir |
| Free | "Quero sair" | Escuta profunda, renegociacao |
| See | Divergencias estrategicas | Dialogo aberto, comite consultivo |
| We | Contribuicoes ignoradas | Valorizar, programa de mentoria |
| Flee | Litigio iminente | Mediacao urgente, juridico |
============================================================

PRINCIPIO NATHAN: "Nao trate o sintoma — trate a fase."
Um franqueado na fase Fee que reclama de royalties NAO precisa de
desconto. Precisa de DEMONSTRACAO DE VALOR. O conflito e emocional
antes de ser racional.
============================================================
```

**2.4 — Analise de Contexto Relacional**

```yaml
relational_context:
  historico_de_interacoes:
    total_interacoes_12m: 0
    interacoes_positivas: 0
    interacoes_negativas: 0
    ratio_positivo_negativo: 0  # Ideal: > 5:1 (Gottman Ratio)

  qualidade_comunicacao:
    frequencia: ""  # Semanal / Quinzenal / Mensal / Esporadica
    canais: []  # E-mail / WhatsApp / Presencial / Sistema
    iniciativa: ""  # Franqueador / Franqueado / Mutua
    tom_predominante: ""  # Colaborativo / Formal / Tenso / Hostil

  consultor_de_campo:
    frequencia_visitas: ""
    qualidade_relacao: ""  # Boa / Regular / Ruim
    ultima_visita: ""
    issues_reportados: []

  confianca:
    franqueado_confia_franqueador: ""  # Alta / Media / Baixa / Quebrada
    franqueador_confia_franqueado: ""  # Alta / Media / Baixa / Quebrada
    eventos_que_quebraram_confianca: []
```

**2.5 — E-Factor e a Dinamica do Conflito**

```
DINAMICA DO E-FACTOR NO CONFLITO
============================================================
Greg Nathan observou que conflitos tem uma "espiral emocional":

ESPIRAL DESCENDENTE (se mal gerido):
  Fase atual → Frustracao → Desconfianca → Confronto → Flee

  Fee → "Nao vale o que pago" → "Eles so querem meu dinheiro"
       → Inadimplencia → Notificacao → Litigio

  Me → "Sei fazer melhor" → "Eles nao me respeitam"
      → Desobediencia → Penalidade → Ruptura

  Free → "Quero sair" → "Vou prejudicar a rede"
       → Sabotagem → Rescisao conflituosa → Judicial

ESPIRAL ASCENDENTE (se bem gerido):
  Conflito → Escuta → Compreensao → Acordo → Fortalecimento

  Fee → Ouvir → Demonstrar valor → Plano de ROI → See
  Me → Reconhecer → Incluir → Piloto controlado → We
  Free → Empatia → Renegociar → Novo acordo → See

OBJETIVO: Transformar TODA espiral descendente em ascendente.
============================================================
```

---

### Phase 3: Analise Contratual e Legal

**3.1 — Verificacao de Clausulas Relevantes ao Conflito**

| Clausula | Presente no Contrato | Aplicavel ao Conflito | Posicao Franqueador | Posicao Franqueado |
|----------|---------------------|----------------------|--------------------|--------------------|
| Obrigacoes do franqueador | [ ] | [ ] | | |
| Obrigacoes do franqueado | [ ] | [ ] | | |
| Territorio e exclusividade | [ ] | [ ] | | |
| Taxas e royalties | [ ] | [ ] | | |
| Padroes operacionais | [ ] | [ ] | | |
| Fornecedores homologados | [ ] | [ ] | | |
| Rescisao e penalidades | [ ] | [ ] | | |
| Nao-concorrencia | [ ] | [ ] | | |
| Propriedade intelectual | [ ] | [ ] | | |
| Resolucao de disputas | [ ] | [ ] | | |
| Arbitragem (Art. 7o) | [ ] | [ ] | | |
| Transferencia (Art. 6o) | [ ] | [ ] | | |

**3.2 — Compliance com Lei 13.966/2019 no Contexto do Conflito**

```
VERIFICACAO DE COMPLIANCE — CONTEXTO DO CONFLITO
============================================================
| Item | Questao | Status |
|------|---------|--------|
| Art. 1o | Relacao e de franquia, nao emprego? | [ ] |
| Art. 1o, par. 1o | Sem vinculo empregaticio configurado? | [ ] |
| Art. 2o | COF foi entregue com 10 dias de antecedencia? | [ ] |
| Art. 2o | Informacoes da COF sao veridicas? | [ ] |
| Art. 3o | Contrato e compativel com a COF? | [ ] |
| Art. 4o | Prazo contratual esta sendo respeitado? | [ ] |
| Art. 5o | Sublocacao (se aplicavel) esta regular? | [ ] |
| Art. 6o | Transferencia foi tratada conforme contrato? | [ ] |
| Art. 7o | Clausula arbitral esta prevista? | [ ] |

RISCOS LEGAIS IDENTIFICADOS:
- [ ] Risco de anulacao do contrato (Art. 2o, par. 1o — COF viciada)
- [ ] Risco de vinculo empregaticio (Art. 1o, par. 1o — subordinacao)
- [ ] Risco de indenizacao (descumprimento contratual)
- [ ] Risco de dano moral coletivo (impacto na rede)
- [ ] Risco de rescisao unilateral sem justa causa
============================================================
```

**3.3 — Analise de Precedentes**

```yaml
precedent_analysis:
  conflitos_similares_na_rede:
    total: 0
    resolucoes_anteriores: []
    taxa_sucesso: 0  # % resolvidos sem escalacao judicial
    tempo_medio_resolucao: ""

  jurisprudencia_relevante:
    - caso: ""
      tribunal: ""
      decisao: ""
      aplicabilidade: ""

  padroes_identificados:
    - padrao: ""
      frequencia: ""
      causa_raiz: ""
      acao_preventiva: ""
```

**3.4 — Root Cause Analysis**

```yaml
root_cause_analysis:
  sintomas_visiveis:
    - ""  # O que esta sendo reclamado/demandado

  causas_intermediarias:
    - ""  # Por que o sintoma esta ocorrendo

  causa_raiz:
    - ""  # A raiz verdadeira do problema

  framework: "5 Whys"
  # Porque #1: O franqueado esta reclamando de royalties
  # Porque #2: O faturamento esta abaixo do esperado
  # Porque #3: Os pontos comerciais selecionados nao tem fluxo suficiente
  # Porque #4: O processo de selecao de pontos nao teve criterios rigorosos
  # Porque #5: O treinamento de selecao de pontos foi insuficiente
  # ROOT CAUSE: Gap no treinamento de selecao de pontos

  tipo_causa_raiz: ""  # Sistemica / Pontual / Estrutural / Interpessoal
  recorrencia: ""  # Primeira vez / Recorrente / Cronico
  afeta_outros: ""  # So este franqueado / Grupo / Rede toda
```

---

### Phase 4: Protocolo de Escalacao

**4.1 — Escalacao Progressiva (Informal → Mediacao → Arbitragem → Judicial)**

```
PROTOCOLO DE ESCALACAO — 4 NIVEIS
============================================================

NIVEL 1 — RESOLUCAO INFORMAL (70% dos conflitos)
  Responsavel: @franchise-relationship / Consultor de campo
  Prazo: 7-15 dias
  Ferramentas:
    - Escuta ativa de ambas as partes
    - Reuniao de realinhamento (presencial ou video)
    - Feedback construtivo baseado em dados
    - Compromisso verbal registrado em ata
  Criterio de sucesso: Acordo verbal, partes satisfeitas
  Custo estimado: R$ 0 - R$ 2.000 (tempo interno)
  Se falhar: Escalar para Nivel 2

NIVEL 2 — MEDIACAO INTERNA (20% dos conflitos)
  Responsavel: @franchise-relationship + Gerencia de rede
  Prazo: 15-30 dias
  Ferramentas:
    - Mediacao estruturada (sessao conjunta facilitada)
    - Analise contratual detalhada (@franchise-legal)
    - Proposta formal de resolucao por escrito
    - Acordo escrito assinado pelas partes
  Criterio de sucesso: Acordo escrito formalizado
  Custo estimado: R$ 2.000 - R$ 10.000
  Se falhar: Escalar para Nivel 3

NIVEL 3 — MEDIACAO/ARBITRAGEM EXTERNA (8% dos conflitos)
  Responsavel: @franchise-legal + Mediador/Arbitro externo
  Prazo: 30-90 dias
  Ferramentas:
    - Mediacao ABF (Camara de Mediacao e Arbitragem)
    - Arbitragem conforme clausula contratual (Art. 7o, Lei 13.966)
    - Perito tecnico (se necessario)
    - Parecer juridico externo
  Criterio de sucesso: Sentenca arbitral ou acordo mediado
  Custo estimado: R$ 10.000 - R$ 50.000
  Se falhar: Escalar para Nivel 4

NIVEL 4 — JUDICIAL (2% dos conflitos)
  Responsavel: @franchise-legal + Escritorio de advocacia externo
  Prazo: 6-36 meses (realidade brasileira)
  Ferramentas:
    - Acao judicial (civel, trabalhista, ou ambas)
    - Medidas cautelares/tutela de urgencia (se necessario)
    - Defesa em acoes movidas pelo franqueado
    - Negociacao paralela para acordo judicial
  Criterio de sucesso: Sentenca favoravel ou acordo judicial
  Custo estimado: R$ 50.000 - R$ 500.000+
  ATENCAO: Custo elevado, desgaste reputacional, impacto na rede

============================================================
PRINCIPIO FUNDAMENTAL: SEMPRE tentar o nivel inferior antes de
escalar. A escalacao precipitada DESTRÓI a relacao
irreversivelmente. Cada nivel resolvido antes economiza 5-10x
em custo e preserva o relacionamento.
============================================================
```

**4.2 — Criterios de Escalacao**

```yaml
escalation_criteria:
  nivel_1_para_2:
    - "Tentativa informal falhou apos 15 dias"
    - "Franqueado recusa dialogo informal"
    - "Conflito envolve questao contratual complexa"
    - "Severidade ALTA desde a triagem"

  nivel_2_para_3:
    - "Mediacao interna falhou apos 30 dias"
    - "Partes nao chegam a acordo apesar de boa-fe"
    - "Questao juridica requer interpretacao externa"
    - "Franqueado contratou advogado"
    - "Severidade CRITICA"

  nivel_3_para_4:
    - "Mediacao ABF falhou"
    - "Arbitragem nao e possivel (sem clausula)"
    - "Medida cautelar necessaria"
    - "Ameaca iminente a operacao ou marca"
    - "Franqueado ajuizou acao"

  sinais_de_alerta_para_escalacao_imediata:
    - "Ameaca de exposicao na midia"
    - "Contato com Procon ou orgaos reguladores"
    - "Mobilizacao coletiva de franqueados"
    - "Dano patrimonial a maquinas ou marca"
    - "Ameaca fisica ou assedio"
```

---

### Phase 5: Plano de Resolucao Estruturado

**5.1 — Template de Plano de Resolucao**

```yaml
resolution_plan:
  conflict_id: ""
  tipo: ""
  severidade: ""
  nivel_escalacao: ""  # 1, 2, 3 ou 4
  fase_e_factor: ""

  etapas:
    - id: 1
      acao: "Escuta ativa — lado do franqueado"
      descricao: "Reuniao individual para ouvir perspectiva completa, sem julgamento"
      responsavel: "@franchise-relationship"
      prazo: "D+2"
      tecnica: "Escuta ativa, perguntas abertas, validacao emocional"
      output: "Registro da perspectiva do franqueado"

    - id: 2
      acao: "Escuta ativa — lado do franqueador"
      descricao: "Reuniao individual para ouvir perspectiva do franqueador"
      responsavel: "@franchise-relationship"
      prazo: "D+3"
      tecnica: "Escuta ativa, identificacao de interesses vs. posicoes"
      output: "Registro da perspectiva do franqueador"

    - id: 3
      acao: "Analise contratual e factual"
      descricao: "Revisao do contrato, dados e evidencias relevantes"
      responsavel: "@franchise-legal"
      prazo: "D+5"
      tecnica: "Analise juridica, compliance check, precedentes"
      output: "Parecer contratual sobre o conflito"

    - id: 4
      acao: "Diagnostico E-Factor"
      descricao: "Identificar fase do E-Factor e fatores emocionais subjacentes"
      responsavel: "@franchise-relationship"
      prazo: "D+5"
      tecnica: "Framework E-Factor de Greg Nathan"
      output: "Diagnostico relacional completo"

    - id: 5
      acao: "Proposta de resolucao"
      descricao: "Elaborar proposta que enderece tanto os aspectos racionais quanto emocionais"
      responsavel: "@franchise-relationship + @franchise-legal"
      prazo: "D+7"
      tecnica: "Negociacao baseada em interesses (Harvard Method)"
      output: "Proposta formal de resolucao"

    - id: 6
      acao: "Sessao de mediacao conjunta"
      descricao: "Reuniao com ambas as partes para apresentar proposta e negociar"
      responsavel: "@franchise-relationship"
      prazo: "D+10"
      tecnica: "Mediacao, facilitacao, busca de acordo ganha-ganha"
      output: "Acordo ou identificacao de impasse"

    - id: 7
      acao: "Formalizacao do acordo"
      descricao: "Documentar acordo alcancado com compromissos e prazos"
      responsavel: "@franchise-legal"
      prazo: "D+12"
      tecnica: "Termo de acordo formal"
      output: "Acordo assinado pelas partes"

    - id: 8
      acao: "Follow-up e monitoramento"
      descricao: "Acompanhar cumprimento do acordo e saude do relacionamento"
      responsavel: "@franchise-relationship"
      prazo: "D+30, D+60, D+90"
      tecnica: "Check-ins periodicos, E-Factor monitoring"
      output: "Relatorios de follow-up"
```

**5.2 — Tecnicas de Resolucao por Tipo de Conflito**

| Tipo de Conflito | Tecnica Principal | Tecnica Complementar | Agente |
|-----------------|-------------------|---------------------|--------|
| **OPERACIONAL** | Reuniao de realinhamento + plano de compliance | Treinamento de reforco, visita de campo intensiva | @franchise-relationship |
| **FINANCEIRO** | Demonstracao de ROI + analise comparativa de rede | Revisao de performance, plano de crescimento, benchmarking | @franchise-relationship |
| **TERRITORIAL** | Analise de dados georreferenciados + mediacao | Revisao contratual, ajuste de territorio, compensacao | @franchise-legal |
| **MARCA** | Notificacao formal + orientacao detalhada | Treinamento de branding, guidelines atualizados | @franchise-relationship |
| **LEGAL** | Mediacao estruturada + parecer juridico formal | Arbitragem ABF, negociacao assistida | @franchise-legal |

**5.3 — Tecnicas de Resolucao por Fase do E-Factor**

```
INTERVENCOES POR FASE DO E-FACTOR
============================================================

GLEE (Entusiasmo) — Conflitos raros
  Causa: Expectativas irreais criadas na venda
  Intervencao:
    - Gestao de expectativas realista
    - Realinhar promessas vs. realidade
    - Reforcar suporte nos primeiros meses
    - Checklist de "o que esperar nos primeiros 90 dias"
  Risco se ignorar: Decepcao precoce, salto para Fee

FEE (Taxas) — Conflitos financeiros
  Causa: Franqueado nao percebe valor das taxas
  Intervencao:
    - Demonstracao concreta de valor (ROI detalhado)
    - Transparencia no uso do fundo de marketing
    - Benchmarking com mercado (mostrar que taxa e justa)
    - Calcular quanto custaria operar sem a rede
    - Apresentar case de franqueados de sucesso
  Risco se ignorar: Inadimplencia, questionamento crescente, Me

ME (Independencia) — Conflitos operacionais
  Causa: Franqueado quer fazer diferente
  Intervencao:
    - Reconhecer competencia e experiencia do franqueado
    - Incluir em comites consultivos e grupos de trabalho
    - Permitir customizacoes controladas (programa piloto)
    - Mostrar dados de franqueados que seguem o padrao vs. nao
    - Programa de "intraempreendedorismo" na rede
  Risco se ignorar: Desobediencia sistematica, mau exemplo, Free

FREE (Liberdade) — Conflitos graves
  Causa: Frustracao acumulada, desejo de autonomia total
  Intervencao:
    - Escuta profunda e empatica (sessao dedicada)
    - Reconhecer erros do franqueador (se houver)
    - Renegociacao contratual se justificado
    - Programa de recuperacao do relacionamento
    - Preparar para saida ordenada (se irrecuperavel)
  Risco se ignorar: Litigio, contaminacao da rede, churn

SEE (Visao) — Conflitos estrategicos
  Causa: Franqueado maduro quer influenciar estrategia
  Intervencao:
    - Participacao em conselho consultivo
    - Programa de mentoria (mentor de novos franqueados)
    - Reconhecimento formal e publico
    - Dialogo estrategico aberto e regular
  Risco se ignorar: Perder um aliado valioso, regressao

WE (Parceria) — Conflitos construtivos
  Causa: Divergencia sobre direcao estrategica
  Intervencao:
    - Tratamento como parceiro estrategico de fato
    - Inclusao em decisoes-chave da rede
    - Co-criacao de solucoes e inovacoes
    - Programa de multi-unit ou expansao
  Risco se ignorar: Regressao para fases anteriores

FLEE (Saida) — Conflito terminal
  Causa: Decisao ja tomada de sair da rede
  Intervencao:
    - Mediacao para saida ordenada e respeitosa
    - Minimizar litigio e exposicao
    - Proteger interesses da rede e dos outros franqueados
    - Documentar lessons learned para prevencao futura
    - Oferecer opcao de transferencia a terceiro
  Risco se ignorar: Litigio longo, custoso e publico

============================================================
```

**5.4 — Framework de Negociacao (Harvard Method)**

Baseado nos principios de Fisher & Ury ("Getting to Yes"):

```
FRAMEWORK DE NEGOCIACAO — 4 PRINCIPIOS
============================================================

1. SEPARE AS PESSOAS DO PROBLEMA
   - Ataque o problema, nao a pessoa
   - Reconheca emocoes como legitimas
   - Permita que as partes "desabafem"
   - Nao tome partido

2. FOQUE EM INTERESSES, NAO EM POSICOES
   - Posicao: "Quero reduzir royalties de 8% para 5%"
   - Interesse: "Preciso melhorar minha rentabilidade"
   - Pergunte: "O que voce realmente precisa?"
   - O acordo esta nos interesses, nao nas posicoes

3. GERE OPCOES DE GANHO MUTUO
   - Brainstorm de solucoes criativas
   - "E se...?" antes de "Nao!"
   - Expandir o bolo antes de dividir
   - Trocar concessoes de valores diferentes

4. USE CRITERIOS OBJETIVOS
   - Dados da rede (benchmark anonimizado)
   - Contrato (o que foi acordado)
   - Lei (o que a lei determina)
   - Mercado (praticas do setor — ABF)

BATNA (Best Alternative To Negotiated Agreement):
  - Do franqueado: O que ele faz se nao houver acordo?
  - Do franqueador: O que a empresa faz se nao houver acordo?
  - Quanto mais forte o BATNA, mais poder na negociacao
  - NUNCA aceite um acordo pior que seu BATNA

============================================================
```

---

### Phase 6: Mediacao ABF e Mecanismos Brasileiros

**6.1 — Mediacao via ABF**

A Associacao Brasileira de Franchising oferece servicos de mediacao e arbitragem especificos para o setor:

```
MEDIACAO ABF — PROTOCOLO
============================================================
QUANDO USAR:
  - Conflito Nivel 3 (mediacao externa)
  - Ambas as partes concordam com mediacao
  - Franqueador e associado ABF (ou aceita a camara)

PROCESSO:
  1. Solicitacao formal a ABF (formulario + documentos)
  2. Selecao de mediador neutro (lista ABF de especialistas)
  3. Pre-mediacao (sessoes individuais com mediador)
  4. Sessao(oes) de mediacao conjunta (1 a 3 sessoes)
  5. Acordo (se alcancado) — forca de titulo executivo
  6. Se nao houver acordo — encaminhamento para arbitragem

CUSTOS TIPICOS:
  - Taxa de administracao: R$ 2.000 - R$ 5.000
  - Honorarios do mediador: R$ 300-500/hora
  - Sessoes tipicas: 2-4 sessoes de 2-3 horas
  - Custo total medio: R$ 5.000 - R$ 15.000
  - Tempo medio: 30-60 dias

VANTAGENS vs. JUDICIAL:
  - 10x mais rapido
  - 5x mais barato
  - Confidencial (nao e publico)
  - Preserva relacionamento
  - Partes constroem a solucao (nao e imposta)
  - Taxa de sucesso: ~70%
============================================================
```

**6.2 — Arbitragem (Art. 7o, Lei 13.966/2019)**

```yaml
arbitragem_protocol:
  base_legal: "Art. 7o, Lei 13.966/2019 — permite clausula arbitral em contratos de franquia"
  lei_complementar: "Lei 9.307/1996 (Lei de Arbitragem) atualizada pela Lei 13.129/2015"

  requisitos:
    - clausula_arbitral_no_contrato: true  # Clausula compromissoria
    - ou_compromisso_arbitral: true  # Acordo posterior
    - capacidade_civil_das_partes: true
    - direitos_patrimoniais_disponiveis: true

  camaras_recomendadas:
    - nome: "Camara de Mediacao e Arbitragem da ABF"
      especialidade: "Franchising"
      sede: "Sao Paulo"
    - nome: "Camara de Comercio Brasil-Canada (CCBC)"
      especialidade: "Comercial geral"
      sede: "Sao Paulo"
    - nome: "Camara de Mediacao e Arbitragem FIESP/CIESP"
      especialidade: "Comercial e industrial"
      sede: "Sao Paulo"
    - nome: "Camaras regionais ABF"
      especialidade: "Franchising regional"
      sede: "Diversas"

  vantagens:
    - "Sentenca tem forca de titulo executivo judicial (Art. 31, Lei 9.307)"
    - "Processo confidencial"
    - "Arbitros especializados em franchising"
    - "Prazo tipico: 6-12 meses (vs. 2-5 anos judicial)"
    - "Irrecorribilidade em regra (celeridade)"

  desvantagens:
    - "Custo mais alto que mediacao (R$ 20.000 - R$ 100.000+)"
    - "Irrecorribilidade da sentenca (risco se desfavoravel)"
    - "Necessita clausula compromissoria previa ou compromisso arbitral"
    - "Nao serve para medidas cautelares (precisa do judiciario)"
```

**6.3 — Lei 13.140/2015 (Lei de Mediacao)**

```
MEDIACAO — MARCO LEGAL BRASILEIRO
============================================================
A Lei 13.140/2015 regulamenta a mediacao como meio de solucao
de controversias. Pontos relevantes para franquias:

- Art. 2o: Principios — imparcialidade, isonomia, oralidade,
  informalidade, autonomia da vontade, busca do consenso,
  confidencialidade, boa-fe.

- Art. 20: Acordo de mediacao constitui titulo executivo
  extrajudicial (se assinado pelas partes e advogados).

- Art. 22: Audiencia de mediacao pode ser designada pelo
  juiz antes da contestacao (mediacao judicial).

- Art. 26: As partes deverao ser assistidas por advogados.

IMPLICACAO PARA AVEND:
  Incluir clausula de mediacao como etapa PRE-arbitragem
  no contrato de franquia. Isso garante que o caminho
  completo seja: mediacao → arbitragem → judicial.
============================================================
```

**6.4 — Clausula de Resolucao de Disputas Recomendada**

```
CLAUSULA MODELO — RESOLUCAO DE DISPUTAS
============================================================
"Art. XX — Resolucao de Conflitos

XX.1 — As partes comprometem-se a resolver qualquer controversia
decorrente deste contrato, preferencialmente, pela seguinte ordem:

  a) Negociacao direta entre as partes, no prazo de 15 (quinze)
     dias contados da comunicacao formal do conflito;
  b) Mediacao, conforme Regulamento da Camara de Mediacao da ABF,
     no prazo de 30 (trinta) dias apos o insucesso da negociacao;
  c) Arbitragem, conforme Regulamento da Camara de Arbitragem
     da ABF, se a mediacao restar infrutifera.

XX.2 — A arbitragem sera conduzida por arbitro unico, na cidade
de [CIDADE], em lingua portuguesa, aplicando-se a legislacao
brasileira.

XX.3 — Fica ressalvado o direito de qualquer parte de recorrer
ao Poder Judiciario para medidas cautelares ou de urgencia,
conforme Art. 22-A da Lei 9.307/1996.

XX.4 — Os custos da mediacao e arbitragem serao divididos
igualmente entre as partes, salvo decisao diversa do arbitro."
============================================================
```

---

### Phase 7: Analise de Impacto na Rede

**7.1 — Impacto do Conflito na Rede**

```yaml
network_impact_assessment:
  impacto_direto:
    franqueados_diretamente_afetados: 0
    operacao_impactada: ""  # Sim / Nao / Parcialmente
    receita_em_risco: 0  # R$ (royalties + faturamento do franqueado)
    maquinas_em_risco: 0

  impacto_indireto:
    risco_de_contaminacao: ""  # Baixo / Medio / Alto
    franqueados_potencialmente_influenciados: 0
    grupos_de_whatsapp_atingidos: ""  # Sim / Nao
    historico_de_mobilizacao: ""  # Ja houve mobilizacao coletiva?
    franqueados_na_mesma_fase_efactor: 0  # Quantos estao na mesma fase

  impacto_reputacional:
    exposicao_publica: ""  # Nenhuma / Redes sociais / Midia / Reclame Aqui
    risco_para_venda_novas_franquias: ""  # Baixo / Medio / Alto
    impacto_no_selo_ABF: ""  # Nenhum / Risco
    avaliacoes_online: ""  # Impacto em Google, Reclame Aqui

  cenarios:
    melhor_caso:
      descricao: ""
      probabilidade: ""
      custo: 0
    caso_provavel:
      descricao: ""
      probabilidade: ""
      custo: 0
    pior_caso:
      descricao: ""
      probabilidade: ""
      custo: 0
```

**7.2 — Efeito Domino**

```
ANALISE DE EFEITO DOMINO
============================================================
Um conflito mal resolvido NUNCA e isolado em uma rede de franquias.

MECANISMOS DE CONTAMINACAO:
  1. Comunicacao entre franqueados (WhatsApp, eventos, regionais)
  2. Precedente ("se ele conseguiu, eu tambem quero")
  3. Percepcao de injustica ("o franqueador nao e justo")
  4. Mobilizacao coletiva ("vamos nos unir contra")
  5. Midia social e Reclame Aqui (exposicao publica)
  6. Consultores de campo como vetores (inadvertidamente)

FORMULA DO CUSTO REAL:
  Custo real = Custo direto x Fator de contaminacao
  Onde:
    Fator de contaminacao (rede saudavel, E-Factor > 7) = 1.5x
    Fator de contaminacao (rede tensionada, E-Factor 5-7) = 3-5x
    Fator de contaminacao (rede em crise, E-Factor < 5) = 10x+

IMPLICACAO:
  Resolver um conflito de R$ 10.000 rapidamente custa R$ 10.000.
  Deixar escalar em rede tensionada: R$ 30.000 - R$ 50.000.
  Deixar escalar em rede em crise: R$ 100.000+.

PRECEDENTES (cuidado especial):
  Cada resolucao de conflito cria um PRECEDENTE na rede.
  Franqueados conversam. Se o franqueado A conseguiu
  reducao de royalties, o franqueado B vai pedir tambem.
  Resolva de forma que o precedente seja saudavel.
============================================================
```

---

### Phase 8: Framework de Prevencao (Early Warning System)

**8.1 — Sinais de Alerta Precoce**

```
SISTEMA DE ALERTA PRECOCE — EARLY WARNING
============================================================

SINAIS FINANCEIROS (dados objetivos — sistema de gestao)
  [ ] Atraso em royalties > 15 dias
  [ ] Queda de faturamento > 20% em 3 meses consecutivos
  [ ] Inadimplencia recorrente (2+ meses no ultimo ano)
  [ ] Questionamento formal sobre base de calculo de taxas
  [ ] Solicitacao de renegociacao financeira
  [ ] Aumento subito de chamados sobre custos

SINAIS OPERACIONAIS (dados objetivos — auditorias e sistema)
  [ ] Queda no score de compliance < 70%
  [ ] Recusa em participar de treinamentos (2+ consecutivos)
  [ ] Nao uso do sistema de gestao (< 50% das funcionalidades)
  [ ] Nao atendimento a auditorias ou visitas de campo
  [ ] Fornecedores nao homologados identificados
  [ ] Alteracao nao autorizada de produtos ou processos

SINAIS RELACIONAIS (dados qualitativos — consultores de campo)
  [ ] Reducao de frequencia de comunicacao (sem resposta 2+ semanas)
  [ ] Tom de comunicacao hostil, sarcastico ou frio
  [ ] Cancelamento repetido de reunioes/visitas agendadas
  [ ] Reclamacoes recorrentes no suporte (3+ no mesmo tema)
  [ ] Comentarios negativos em grupos de franqueados
  [ ] Falta em eventos da rede (2+ consecutivos)

SINAIS DE DESENGAJAMENTO (dados comportamentais — alto risco)
  [ ] Nao participacao em eventos obrigatorios
  [ ] Nao resposta a comunicados formais
  [ ] Consulta a advogado trabalhista ou civel (se identificado)
  [ ] Busca por informacoes de concorrentes ou franquias rivais
  [ ] Tentativa de venda da franquia sem comunicar
  [ ] Contato com Procon ou orgaos de defesa do consumidor

SCORING DE RISCO:
  0-2 sinais: VERDE — Monitorar no ciclo normal
  3-5 sinais: AMARELO — Contato proativo em 7 dias
  6-8 sinais: LARANJA — Intervencao em 48 horas
  9-12 sinais: VERMELHO — Intervencao imediata, Nivel 2+
  13+ sinais: CRITICO — Acionar diretoria + juridico

============================================================
```

**8.2 — Programa de Prevencao de Conflitos**

```
PROGRAMA DE PREVENCAO — 4 PILARES, 16 ACOES
============================================================

PILAR 1: COMUNICACAO (reduzir ruido, aumentar transparencia)
  1. Reuniao mensal franqueador-franqueados (rede toda, video)
  2. Newsletter semanal com resultados, novidades, cases
  3. Canal direto franqueado → diretoria (ouvidoria interna)
  4. Transparencia total no uso do fundo de marketing

PILAR 2: RELACIONAMENTO (fortalecer vinculo emocional)
  5. Programa de visitas de campo estruturado (mensal por franqueado)
  6. Eventos presenciais trimestrais (regionais) + anual (nacional)
  7. Comite consultivo de franqueados (eleito, representativo)
  8. Programa de reconhecimento publico (franqueados destaque)

PILAR 3: GESTAO DO E-FACTOR (prevencao dirigida por fase)
  9. Onboarding estruturado de 90 dias (reduzir decepcao pos-Glee)
  10. Demonstracao trimestral de valor/ROI (prevenir fase Fee)
  11. Programa de inclusao para franqueados maduros (prevenir Me/Free)
  12. Pesquisa de satisfacao semestral (E-Factor survey completo)

PILAR 4: ESTRUTURA (mecanismos formais de prevencao)
  13. Politica formal de resolucao de conflitos (publicada)
  14. Treinamento de consultores de campo em mediacao basica
  15. Base de dados de conflitos e resolucoes (knowledge base)
  16. Revisao contratual anual (atualizar clausulas problematicas)

============================================================
```

**8.3 — Playbooks de Prevencao por Momento Critico**

| Momento | Risco | Playbook |
|---------|-------|----------|
| **Primeiros 90 dias** | Decepcao pos-venda | Onboarding intensivo, check-ins semanais, gestao de expectativas |
| **6-12 meses** | Entrada na fase Fee | Reuniao de ROI, transparencia de custos, benchmarking com rede |
| **12-24 meses** | Fase Me, desejo de autonomia | Incluir em comites, reconhecer expertise, customizacao controlada |
| **Renovacao contratual** | Reavaliacao da relacao | Dialogo aberto 6 meses antes, pesquisa de satisfacao, plano de renovacao |
| **Crise na rede** | Mobilizacao coletiva | Comunicacao imediata, transparencia total, reuniao extraordinaria |
| **Mudanca de regras/taxas** | Resistencia a mudanca | Comunicar com 60+ dias de antecedencia, justificar com dados, fase de transicao |
| **Novo franqueado no territorio** | Conflito territorial | Analise de impacto previa, comunicacao transparente ao existente, dados de mercado |
| **Aumento de taxas** | Conflito financeiro generalizado | Justificativa detalhada, fase de transicao, demonstracao de valor adicional |
| **Troca de consultor de campo** | Ruptura de vinculo | Transicao acompanhada, apresentacao formal, periodo de co-atendimento |
| **Franqueado underperforming** | Frustracao acumulada | Plano de recuperacao proativo ANTES do franqueado reclamar |

**8.4 — Metricas de Prevencao**

```
METRICAS DE PREVENCAO — KPIs
============================================================
| Metrica | Target | Frequencia | Responsavel |
|---------|--------|------------|-------------|
| NPS da rede | > 7.0 | Semestral | @franchise-relationship |
| E-Factor medio | > 7.0 | Semestral | @franchise-relationship |
| Taxa conflitos/franqueado | < 0.5/ano | Trimestral | @franchise-relationship |
| % conflitos Nivel 1 | > 70% | Trimestral | @franchise-relationship |
| % conflitos Nivel 3+ | < 10% | Trimestral | @franchise-legal |
| Tempo medio resolucao | < 15 dias | Trimestral | @franchise-relationship |
| Taxa de recorrencia | < 10% | Anual | @franchise-relationship |
| Churn por conflito | < 2% | Anual | @franchise-relationship |
| Custo medio resolucao | < R$ 5.000 | Anual | @franchise-legal |
| Satisfacao pos-resolucao | > 7.0 | Por caso | @franchise-relationship |
============================================================
```

---

### Phase 9: Documentacao e Lessons Learned

**9.1 — Registro de Resolucao**

```yaml
resolution_record:
  conflict_id: ""
  data_abertura: ""
  data_resolucao: ""
  dias_para_resolver: 0

  classificacao:
    tipo: ""
    severidade: ""
    nivel_escalacao_maximo: ""
    fase_e_factor: ""

  resolucao:
    metodo: ""  # Informal / Mediacao interna / Mediacao ABF / Arbitragem / Judicial
    resultado: ""  # Acordo / Sentenca / Desistencia / Rescisao ordenada
    satisfacao_franqueado: 0  # 1-10
    satisfacao_franqueador: 0  # 1-10
    custo_total: 0  # R$ (incluindo horas internas)

  follow_up:
    acordo_sendo_cumprido_30d: ""  # Sim / Parcialmente / Nao
    acordo_sendo_cumprido_90d: ""  # Sim / Parcialmente / Nao
    relacionamento_pos_resolucao: ""  # Melhorou / Estavel / Piorou
    risco_de_recorrencia: ""  # Baixo / Medio / Alto
    fase_efactor_pos_resolucao: ""  # Para onde o franqueado migrou

  lessons_learned:
    o_que_funcionou: []
    o_que_nao_funcionou: []
    o_que_faremos_diferente: []

  acoes_preventivas_implementadas:
    - acao: ""
      responsavel: ""
      prazo: ""
      status: ""
```

**9.2 — Dashboard de Conflitos da Rede**

```
DASHBOARD DE CONFLITOS — REDE AVEND
============================================================
Periodo: [DATA INICIO] a [DATA FIM]

RESUMO EXECUTIVO
| Metrica | Valor | Target | Status |
|---------|-------|--------|--------|
| Conflitos abertos | N | < 5 | |
| Conflitos resolvidos (periodo) | N | | |
| Tempo medio de resolucao | __ dias | < 15 | |
| % resolvidos Nivel 1 | __% | > 70% | |
| % resolvidos Nivel 2 | __% | < 20% | |
| % escalados Nivel 3+ | __% | < 10% | |
| Taxa de recorrencia | __% | < 10% | |
| Custo total de resolucao | R$ ___ | | |
| Satisfacao media pos-resolucao | __/10 | > 7.0 | |

POR TIPO DE CONFLITO
| Tipo | Qtd | % | Tendencia (vs. periodo anterior) |
|------|-----|---|----------------------------------|
| Operacional | N | __% | |
| Financeiro | N | __% | |
| Territorial | N | __% | |
| Marca | N | __% | |
| Legal | N | __% | |

POR FASE E-FACTOR
| Fase | Qtd | % | Alerta |
|------|-----|---|--------|
| Glee | N | __% | |
| Fee | N | __% | Se > 40%: proposta de valor |
| Me | N | __% | Se > 25%: inclusao |
| Free | N | __% | Se > 10%: CRITICO |
| See | N | __% | |
| We | N | __% | |
| Flee | N | __% | Qualquer: intervencao urgente |

TOP 5 CAUSAS RAIZ RECORRENTES
| # | Causa Raiz | Frequencia | Acao Preventiva |
|---|-----------|-----------|-----------------|
| 1 | | N casos | |
| 2 | | N casos | |
| 3 | | N casos | |
| 4 | | N casos | |
| 5 | | N casos | |

EARLY WARNINGS ATIVOS
| Franqueado | Sinais | Score Risco | Acao Recomendada |
|-----------|--------|-------------|-----------------|
| | | | |

============================================================
```

**9.3 — Knowledge Base de Conflitos**

```yaml
knowledge_base_entry:
  caso_id: ""
  tipo: ""
  resumo_anonimizado: ""
  causa_raiz: ""
  resolucao_aplicada: ""
  resultado: ""
  tempo_resolucao: ""
  custo: ""
  lessons_learned: ""
  tags: []  # Para busca futura
  aplicavel_a: ""  # Tipos de situacao onde este case e relevante
```

---

## Validation

### Criterios de Qualidade da Resolucao

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Imparcialidade | Ambas as partes ouvidas e consideradas | [ ] |
| Classificacao | Conflito classificado por tipo e severidade | [ ] |
| E-Factor | Fase do E-Factor diagnosticada e considerada na intervencao | [ ] |
| Contratual | Clausulas relevantes analisadas pelo @franchise-legal | [ ] |
| Legal | Compliance com Lei 13.966/2019 verificada | [ ] |
| Escalacao | Protocolo de escalacao respeitado (nivel inferior primeiro) | [ ] |
| Root cause | Causa raiz identificada (nao apenas sintomas) | [ ] |
| Acordo | Resolucao formalizada por escrito com compromissos | [ ] |
| Follow-up | Monitoramento pos-resolucao agendado (30/60/90d) | [ ] |
| Rede | Impacto na rede avaliado (efeito domino, precedente) | [ ] |
| Prevencao | Acoes preventivas identificadas para evitar recorrencia | [ ] |
| Documentacao | Registro completo para knowledge base | [ ] |
| Confidencialidade | Informacoes do processo mantidas confidenciais | [ ] |
| Satisfacao | Ambas as partes consideram a resolucao justa | [ ] |

### Checklist de Entrega

- [ ] `conflict-diagnosis-report.md` gerado com classificacao e diagnostico E-Factor
- [ ] `resolution-plan.md` gerado com etapas, responsaveis e prazos
- [ ] `prevention-recommendations.md` gerado com acoes preventivas
- [ ] Conflito classificado por tipo (operacional/financeiro/territorial/marca/legal)
- [ ] Severidade avaliada com score estruturado (4 fatores ponderados)
- [ ] Fase do E-Factor identificada para cada parte envolvida
- [ ] Contrato de franquia analisado para clausulas relevantes
- [ ] Compliance com Lei 13.966/2019 verificada no contexto do conflito
- [ ] Root cause analysis realizada (5 Whys ou equivalente)
- [ ] Protocolo de escalacao determinado e justificado
- [ ] Ambas as partes ouvidas (veto condition #1)
- [ ] Impacto na rede avaliado (efeito domino e precedente)
- [ ] Plano de follow-up definido (30/60/90 dias)
- [ ] Lessons learned documentadas na knowledge base
- [ ] Early warning signals atualizados com base no caso
- [ ] Metricas de prevencao revisadas

---

## References

- **Nathan, Greg.** "The Franchise E-Factor: Understanding and Improving the All-Important Franchise Relationship." Franchise Relationships Institute, 2008.
- **Nathan, Greg.** "Profitable Partnerships: Improve Your Franchise Relationships and Change Your Life." Franchise Relationships Institute, 2000.
- **Nathan, Greg.** "The Multi-Unit Franchise Model." FRI, 2015.
- **Nathan, Greg.** "The Franchisor's Guide to Improving Field Visits." FRI, 2012.
- **Franchise Relationships Institute.** www.franchiserelationships.com
- **Lei 13.966/2019** — Lei de Franquias Empresariais (Art. 1o a 9o).
- **Lei 13.140/2015** — Lei de Mediacao.
- **Lei 9.307/1996** — Lei de Arbitragem (atualizada pela Lei 13.129/2015).
- **ABF — Associacao Brasileira de Franchising.** Camara de Mediacao e Arbitragem. Codigo de Etica.
- **Fisher, Roger & Ury, William.** "Getting to Yes: Negotiating Agreement Without Giving In." Penguin, 1981. — Negociacao baseada em interesses (Harvard Method).
- **Gottman, John.** "The Seven Principles for Making Marriage Work." — Ratio 5:1 positivo/negativo aplicado a relacionamentos de franquia.
- **Voss, Chris.** "Never Split the Difference." — Tecnicas avancadas de negociacao.
- **Ribas, Filomena.** "Direito das Franquias." Thomson Reuters. — Aspectos juridicos de conflitos em franquias.
- **Simao Filho, Adalberto.** "Franchising: Aspectos Juridicos e Contratuais."
- **Siebert, Mark.** "Franchise Your Business." — Conflict management in franchise networks.
- **Bradach, Jeffrey.** "Franchise Organizations." Harvard Business School Press. — Network dynamics.
- **Codigo de Defesa do Consumidor (Lei 8.078/1990)** — Aplicavel em relacoes com consumidores finais.
- **LGPD (Lei 13.709/2018)** — Tratamento de dados no processo de resolucao.

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-012*
