# Relatorio de Visita de Campo — Consultoria de Campo Avend
# Template padronizado para relatorio de visita do consultor de campo
# Squad: Franchising Avend
# Updated: 2026-03-13

> **Visita ID:** {{visita_id}}
> **Status:** {{visita_status}}

---

## 1. Metadados da Visita

| Campo | Valor |
|-------|-------|
| **Data da visita** | {{visita_data}} |
| **Horario** | {{visita_hora_inicio}} — {{visita_hora_fim}} |
| **Consultor** | {{consultor_nome}} |
| **Consultor ID** | {{consultor_id}} |
| **Franqueado** | {{franqueado_nome}} |
| **CNPJ** | {{franqueado_cnpj}} |
| **Unidade** | {{unidade_codigo}} |
| **Cidade/UF** | {{unidade_cidade}}/{{unidade_uf}} |
| **Cluster** | {{cluster_nome}} |
| **Tipo de visita** | {{tipo_visita}} |
| **Visita numero** | {{visita_numero}} (desde o inicio da operacao) |
| **Ciclo** | {{ciclo_trimestral}} (ex: Q1-2026) |

### 1.1 Tipo de Visita

| Tipo | Descricao |
|------|-----------|
| [ ] Rotina trimestral | Visita padrao do ciclo trimestral |
| [ ] Primeira visita (onboarding) | Primeira visita apos go-live |
| [ ] Follow-up | Acompanhamento de plano de acao anterior |
| [ ] Emergencial | Visita nao programada por problema critico |
| [ ] Auditoria | Visita de auditoria formal |
| [ ] Expansao | Avaliacao para novas maquinas/locais |

### 1.2 Maquinas Visitadas

| Maquina ID | Tipo | Localizacao | Status |
|-----------|------|-------------|--------|
| {{maquina_1_id}} | {{maquina_1_tipo}} | {{maquina_1_local}} | {{maquina_1_status}} |
| {{maquina_2_id}} | {{maquina_2_tipo}} | {{maquina_2_local}} | {{maquina_2_status}} |
| {{maquina_3_id}} | {{maquina_3_tipo}} | {{maquina_3_local}} | {{maquina_3_status}} |
| {{maquina_n_id}} | {{maquina_n_tipo}} | {{maquina_n_local}} | {{maquina_n_status}} |

---

## 2. Avaliacao Operacional — 6 Dimensoes

### Instrucoes de Pontuacao

| Score | Classificacao | Descricao |
|-------|--------------|-----------|
| **5** | Excelente | Supera os padroes da rede |
| **4** | Bom | Atende todos os padroes |
| **3** | Adequado | Atende padroes minimos, com pontos de melhoria |
| **2** | Insuficiente | Abaixo dos padroes, requer acao corretiva |
| **1** | Critico | Muito abaixo, risco operacional |

### 2.1 Dimensao 1: Limpeza e Higiene

| Item | Score (1-5) | Observacoes |
|------|:-----------:|-------------|
| Limpeza externa da maquina | {{limpeza_externa_score}} | {{limpeza_externa_obs}} |
| Limpeza interna da maquina | {{limpeza_interna_score}} | {{limpeza_interna_obs}} |
| Limpeza do entorno/local | {{limpeza_entorno_score}} | {{limpeza_entorno_obs}} |
| Estado das bandejas/slots | {{limpeza_bandejas_score}} | {{limpeza_bandejas_obs}} |
| Controle de pragas | {{limpeza_pragas_score}} | {{limpeza_pragas_obs}} |
| **MEDIA DIMENSAO** | **{{limpeza_media}}** | |

### 2.2 Dimensao 2: Estoque e Reposicao

| Item | Score (1-5) | Observacoes |
|------|:-----------:|-------------|
| Nivel de estoque atual | {{estoque_nivel_score}} | {{estoque_nivel_obs}} |
| Variedade do mix de produtos | {{estoque_mix_score}} | {{estoque_mix_obs}} |
| Controle de validade (FIFO) | {{estoque_validade_score}} | {{estoque_validade_obs}} |
| Frequencia de reposicao | {{estoque_frequencia_score}} | {{estoque_frequencia_obs}} |
| Registro no sistema | {{estoque_registro_score}} | {{estoque_registro_obs}} |
| Produtos homologados (compliance) | {{estoque_homologados_score}} | {{estoque_homologados_obs}} |
| **MEDIA DIMENSAO** | **{{estoque_media}}** | |

### 2.3 Dimensao 3: Equipamento e Manutencao

| Item | Score (1-5) | Observacoes |
|------|:-----------:|-------------|
| Estado geral da maquina | {{equip_estado_score}} | {{equip_estado_obs}} |
| Funcionamento do sistema de pagamento | {{equip_pagamento_score}} | {{equip_pagamento_obs}} |
| Sistema de refrigeracao (se aplicavel) | {{equip_refrigeracao_score}} | {{equip_refrigeracao_obs}} |
| Telemetria operacional | {{equip_telemetria_score}} | {{equip_telemetria_obs}} |
| Manutencao preventiva em dia | {{equip_manutencao_score}} | {{equip_manutencao_obs}} |
| Funcionamento mecanico (molas, motores) | {{equip_mecanico_score}} | {{equip_mecanico_obs}} |
| **MEDIA DIMENSAO** | **{{equip_media}}** | |

### 2.4 Dimensao 4: Localizacao e Ponto

| Item | Score (1-5) | Observacoes |
|------|:-----------:|-------------|
| Visibilidade da maquina | {{local_visibilidade_score}} | {{local_visibilidade_obs}} |
| Fluxo de pessoas no local | {{local_fluxo_score}} | {{local_fluxo_obs}} |
| Seguranca do ponto | {{local_seguranca_score}} | {{local_seguranca_obs}} |
| Acessibilidade (PcD) | {{local_acessibilidade_score}} | {{local_acessibilidade_obs}} |
| Condicoes de infraestrutura (energia, internet) | {{local_infra_score}} | {{local_infra_obs}} |
| Adequacao ao publico-alvo | {{local_publico_score}} | {{local_publico_obs}} |
| **MEDIA DIMENSAO** | **{{local_media}}** | |

### 2.5 Dimensao 5: Identidade Visual e Sinalizacao

| Item | Score (1-5) | Observacoes |
|------|:-----------:|-------------|
| Plotagem/adesivagem da maquina | {{visual_plotagem_score}} | {{visual_plotagem_obs}} |
| Estado do material visual | {{visual_estado_score}} | {{visual_estado_obs}} |
| Sinalizacao de precos | {{visual_precos_score}} | {{visual_precos_obs}} |
| Material promocional vigente | {{visual_promo_score}} | {{visual_promo_obs}} |
| Conformidade com manual de marca | {{visual_marca_score}} | {{visual_marca_obs}} |
| **MEDIA DIMENSAO** | **{{visual_media}}** | |

### 2.6 Dimensao 6: Compliance e Documentacao

| Item | Score (1-5) | Observacoes |
|------|:-----------:|-------------|
| Alvara de funcionamento | {{compliance_alvara_score}} | {{compliance_alvara_obs}} |
| Licenca sanitaria (se aplicavel) | {{compliance_sanitaria_score}} | {{compliance_sanitaria_obs}} |
| Contrato com o ponto vigente | {{compliance_contrato_score}} | {{compliance_contrato_obs}} |
| Seguro em dia | {{compliance_seguro_score}} | {{compliance_seguro_obs}} |
| Registros operacionais atualizados | {{compliance_registros_score}} | {{compliance_registros_obs}} |
| Conformidade com padroes da rede | {{compliance_rede_score}} | {{compliance_rede_obs}} |
| **MEDIA DIMENSAO** | **{{compliance_media}}** | |

### 2.7 Resumo da Avaliacao Operacional

| Dimensao | Score | Classificacao |
|----------|:-----:|--------------|
| 1. Limpeza e Higiene | {{limpeza_media}} | {{limpeza_class}} |
| 2. Estoque e Reposicao | {{estoque_media}} | {{estoque_class}} |
| 3. Equipamento e Manutencao | {{equip_media}} | {{equip_class}} |
| 4. Localizacao e Ponto | {{local_media}} | {{local_class}} |
| 5. Identidade Visual | {{visual_media}} | {{visual_class}} |
| 6. Compliance e Documentacao | {{compliance_media}} | {{compliance_class}} |
| **MEDIA GERAL** | **{{media_geral}}** | **{{media_geral_class}}** |

### 2.8 Classificacao Geral

| Faixa | Classificacao | Acao |
|-------|--------------|------|
| 4.5 - 5.0 | Excelente | Reconhecimento, caso de sucesso |
| 3.5 - 4.4 | Bom | Manter acompanhamento padrao |
| 2.5 - 3.4 | Adequado | Plano de melhoria em 30 dias |
| 1.5 - 2.4 | Insuficiente | Plano de acao urgente em 15 dias |
| 1.0 - 1.4 | Critico | Intervencao imediata, escalacao gerencial |

---

## 3. Saude Financeira

### 3.1 Faturamento

| Metrica | Valor | Target | % Atingido | Tendencia |
|---------|-------|--------|:----------:|-----------|
| Faturamento bruto (mes atual) | R$ {{fat_bruto_atual}} | R$ {{fat_bruto_target}} | {{fat_pct_atingido}}% | {{fat_tendencia}} |
| Faturamento bruto (mes anterior) | R$ {{fat_bruto_anterior}} | — | — | — |
| Faturamento bruto (3 meses media) | R$ {{fat_bruto_media_3m}} | — | — | — |
| Variacao MoM | {{fat_variacao_mom}}% | >= 0% | — | {{fat_mom_tendencia}} |
| Variacao YoY | {{fat_variacao_yoy}}% | >= 10% | — | {{fat_yoy_tendencia}} |

### 3.2 Faturamento por Maquina

| Maquina ID | Fat. Mes | Fat. Target | % Atingido | Uptime |
|-----------|----------|-------------|:----------:|--------|
| {{maq_1_id}} | R$ {{maq_1_fat}} | R$ {{maq_1_target}} | {{maq_1_pct}}% | {{maq_1_uptime}}% |
| {{maq_2_id}} | R$ {{maq_2_fat}} | R$ {{maq_2_target}} | {{maq_2_pct}}% | {{maq_2_uptime}}% |
| {{maq_3_id}} | R$ {{maq_3_fat}} | R$ {{maq_3_target}} | {{maq_3_pct}}% | {{maq_3_uptime}}% |
| {{maq_n_id}} | R$ {{maq_n_fat}} | R$ {{maq_n_target}} | {{maq_n_pct}}% | {{maq_n_uptime}}% |

### 3.3 Inadimplencia

| Item | Situacao | Valor | Vencimento |
|------|---------|-------|------------|
| Royalties | {{royalties_situacao}} | R$ {{royalties_valor_pendente}} | {{royalties_vencimento}} |
| Fundo de Marketing | {{fundo_mkt_situacao}} | R$ {{fundo_mkt_valor_pendente}} | {{fundo_mkt_vencimento}} |
| Telemetria | {{telemetria_situacao}} | R$ {{telemetria_valor_pendente}} | {{telemetria_vencimento}} |
| Outros | {{outros_situacao}} | R$ {{outros_valor_pendente}} | {{outros_vencimento}} |
| **Total inadimplente** | — | **R$ {{total_inadimplente}}** | — |

### 3.4 Indicadores Financeiros

| Indicador | Valor | Meta | Status |
|-----------|-------|------|--------|
| Margem operacional | {{margem_operacional}}% | >= {{margem_meta}}% | {{margem_status}} |
| Ticket medio | R$ {{ticket_medio}} | R$ {{ticket_meta}} | {{ticket_status}} |
| Revenue per machine | R$ {{rpm}} | R$ {{rpm_meta}} | {{rpm_status}} |
| Payback acumulado | {{payback_meses}} meses | {{payback_meta}} meses | {{payback_status}} |

---

## 4. Engajamento do Franqueado — E-Factor Quick Check

### 4.1 Indicadores de Engajamento

| Indicador | Score (1-5) | Observacoes |
|-----------|:-----------:|-------------|
| Participacao em treinamentos | {{eng_treinamento_score}} | {{eng_treinamento_obs}} |
| Participacao em eventos da rede | {{eng_eventos_score}} | {{eng_eventos_obs}} |
| Uso do portal/app (frequencia) | {{eng_portal_score}} | {{eng_portal_obs}} |
| Abertura a feedback | {{eng_feedback_score}} | {{eng_feedback_obs}} |
| Comunicacao proativa | {{eng_comunicacao_score}} | {{eng_comunicacao_obs}} |
| Cumprimento de prazos e planos | {{eng_prazos_score}} | {{eng_prazos_obs}} |
| Satisfacao declarada (1-10) | {{eng_satisfacao_score}} | {{eng_satisfacao_obs}} |
| Intencao de expansao | {{eng_expansao_score}} | {{eng_expansao_obs}} |
| **MEDIA E-FACTOR** | **{{eng_media}}** | |

### 4.2 Classificacao E-Factor

| Faixa | Classificacao | Perfil | Acao Recomendada |
|-------|--------------|--------|-----------------|
| 4.5 - 5.0 | Altamente engajado | Embaixador da rede | Programa de mentoria, case de sucesso |
| 3.5 - 4.4 | Engajado | Franqueado ativo | Manter relacionamento |
| 2.5 - 3.4 | Moderado | Participa quando convocado | Aumentar touchpoints |
| 1.5 - 2.4 | Desengajado | Baixa participacao | Intervencao do consultor, conversa franca |
| 1.0 - 1.4 | Critico | Risco de churn | Escalacao gerencial, plano de retencao |

### 4.3 Resultado E-Factor

| Campo | Valor |
|-------|-------|
| **Score E-Factor** | {{eng_media}} |
| **Classificacao** | {{eng_classificacao}} |
| **Risco de churn** | {{eng_risco_churn}} |
| **Acao recomendada** | {{eng_acao_recomendada}} |

### 4.4 Comentarios do Franqueado

> {{franqueado_comentarios}}

### 4.5 Percepcao do Consultor

> {{consultor_percepcao}}

---

## 5. Checklist Fotografico

### 5.1 Fotos Obrigatorias

| # | Foto | Tirada? | Arquivo | Observacao |
|---|------|:-------:|---------|------------|
| 1 | Maquina — visao frontal completa | [ ] | {{foto_1}} | |
| 2 | Maquina — visao lateral | [ ] | {{foto_2}} | |
| 3 | Maquina — interior (produtos) | [ ] | {{foto_3}} | |
| 4 | Maquina — tela/display | [ ] | {{foto_4}} | |
| 5 | Maquina — sistema de pagamento | [ ] | {{foto_5}} | |
| 6 | Entorno — visao geral do ponto | [ ] | {{foto_6}} | |
| 7 | Entorno — sinalizacao | [ ] | {{foto_7}} | |
| 8 | Problema identificado (se houver) | [ ] | {{foto_8}} | |

### 5.2 Fotos Adicionais (se aplicavel)

| # | Foto | Tirada? | Arquivo | Motivo |
|---|------|:-------:|---------|--------|
| 9 | {{foto_adicional_1_desc}} | [ ] | {{foto_9}} | {{foto_9_motivo}} |
| 10 | {{foto_adicional_2_desc}} | [ ] | {{foto_10}} | {{foto_10_motivo}} |
| 11 | {{foto_adicional_3_desc}} | [ ] | {{foto_11}} | {{foto_11_motivo}} |

---

## 6. Plano de Acao

### 6.1 Acoes Identificadas

| # | Acao | Prioridade | Dimensao | Responsavel | Prazo | Status |
|---|------|-----------|----------|-------------|-------|--------|
| 1 | {{acao_1_desc}} | {{acao_1_prio}} | {{acao_1_dim}} | {{acao_1_resp}} | {{acao_1_prazo}} | [ ] Pendente |
| 2 | {{acao_2_desc}} | {{acao_2_prio}} | {{acao_2_dim}} | {{acao_2_resp}} | {{acao_2_prazo}} | [ ] Pendente |
| 3 | {{acao_3_desc}} | {{acao_3_prio}} | {{acao_3_dim}} | {{acao_3_resp}} | {{acao_3_prazo}} | [ ] Pendente |
| 4 | {{acao_4_desc}} | {{acao_4_prio}} | {{acao_4_dim}} | {{acao_4_resp}} | {{acao_4_prazo}} | [ ] Pendente |
| 5 | {{acao_5_desc}} | {{acao_5_prio}} | {{acao_5_dim}} | {{acao_5_resp}} | {{acao_5_prazo}} | [ ] Pendente |
| 6 | {{acao_6_desc}} | {{acao_6_prio}} | {{acao_6_dim}} | {{acao_6_resp}} | {{acao_6_prazo}} | [ ] Pendente |
| 7 | {{acao_7_desc}} | {{acao_7_prio}} | {{acao_7_dim}} | {{acao_7_resp}} | {{acao_7_prazo}} | [ ] Pendente |
| 8 | {{acao_8_desc}} | {{acao_8_prio}} | {{acao_8_dim}} | {{acao_8_resp}} | {{acao_8_prazo}} | [ ] Pendente |

### 6.2 Prioridades

| Prioridade | Descricao | Prazo Maximo |
|-----------|-----------|-------------|
| **P1 - Critica** | Risco operacional ou legal imediato | 48 horas |
| **P2 - Alta** | Impacto significativo em performance | 7 dias |
| **P3 - Media** | Melhoria importante | 30 dias |
| **P4 - Baixa** | Melhoria desejavel | Proxima visita |

### 6.3 Acoes Pendentes de Visitas Anteriores

| # | Acao (visita anterior) | Data Original | Prazo | Status Atual |
|---|----------------------|---------------|-------|-------------|
| 1 | {{acao_anterior_1_desc}} | {{acao_anterior_1_data}} | {{acao_anterior_1_prazo}} | {{acao_anterior_1_status}} |
| 2 | {{acao_anterior_2_desc}} | {{acao_anterior_2_data}} | {{acao_anterior_2_prazo}} | {{acao_anterior_2_status}} |
| 3 | {{acao_anterior_3_desc}} | {{acao_anterior_3_data}} | {{acao_anterior_3_prazo}} | {{acao_anterior_3_status}} |

---

## 7. Follow-Up

### 7.1 Proxima Visita

| Campo | Valor |
|-------|-------|
| **Data prevista** | {{proxima_visita_data}} |
| **Tipo** | {{proxima_visita_tipo}} |
| **Foco principal** | {{proxima_visita_foco}} |
| **Acoes a verificar** | {{proxima_visita_acoes}} |

### 7.2 Agenda de Acompanhamento

| Data | Acao | Canal | Responsavel |
|------|------|-------|-------------|
| {{followup_1_data}} | {{followup_1_acao}} | {{followup_1_canal}} | {{followup_1_resp}} |
| {{followup_2_data}} | {{followup_2_acao}} | {{followup_2_canal}} | {{followup_2_resp}} |
| {{followup_3_data}} | {{followup_3_acao}} | {{followup_3_canal}} | {{followup_3_resp}} |
| {{followup_4_data}} | {{followup_4_acao}} | {{followup_4_canal}} | {{followup_4_resp}} |

---

## 8. Comparativo com Visita Anterior

### 8.1 Evolucao por Dimensao

| Dimensao | Visita Anterior | Visita Atual | Variacao | Tendencia |
|----------|:--------------:|:------------:|:--------:|-----------|
| 1. Limpeza e Higiene | {{prev_limpeza}} | {{limpeza_media}} | {{var_limpeza}} | {{tend_limpeza}} |
| 2. Estoque e Reposicao | {{prev_estoque}} | {{estoque_media}} | {{var_estoque}} | {{tend_estoque}} |
| 3. Equipamento e Manutencao | {{prev_equip}} | {{equip_media}} | {{var_equip}} | {{tend_equip}} |
| 4. Localizacao e Ponto | {{prev_local}} | {{local_media}} | {{var_local}} | {{tend_local}} |
| 5. Identidade Visual | {{prev_visual}} | {{visual_media}} | {{var_visual}} | {{tend_visual}} |
| 6. Compliance | {{prev_compliance}} | {{compliance_media}} | {{var_compliance}} | {{tend_compliance}} |
| **MEDIA GERAL** | **{{prev_media_geral}}** | **{{media_geral}}** | **{{var_media_geral}}** | **{{tend_media_geral}}** |

### 8.2 Evolucao Financeira

| Metrica | Visita Anterior | Visita Atual | Variacao |
|---------|:--------------:|:------------:|:--------:|
| Faturamento bruto | R$ {{prev_fat}} | R$ {{fat_bruto_atual}} | {{var_fat}}% |
| Ticket medio | R$ {{prev_ticket}} | R$ {{ticket_medio}} | {{var_ticket}}% |
| Uptime medio | {{prev_uptime}}% | {{uptime_medio}}% | {{var_uptime}}pp |
| E-Factor | {{prev_efactor}} | {{eng_media}} | {{var_efactor}} |

### 8.3 Evolucao das Acoes

| Status | Quantidade |
|--------|:----------:|
| Concluidas no prazo | {{acoes_concluidas_prazo}} |
| Concluidas com atraso | {{acoes_concluidas_atraso}} |
| Em andamento | {{acoes_em_andamento}} |
| Nao iniciadas | {{acoes_nao_iniciadas}} |
| Canceladas | {{acoes_canceladas}} |
| **Taxa de conclusao** | **{{taxa_conclusao_acoes}}%** |

---

## 9. Assinaturas

### 9.1 Consultor de Campo

| Campo | Valor |
|-------|-------|
| **Nome** | {{consultor_nome}} |
| **Data** | {{visita_data}} |
| **Assinatura digital** | {{consultor_assinatura}} |

### 9.2 Franqueado

| Campo | Valor |
|-------|-------|
| **Nome** | {{franqueado_nome}} |
| **Data** | {{visita_data}} |
| **Ciente do plano de acao** | [ ] Sim |
| **Assinatura digital** | {{franqueado_assinatura}} |

### 9.3 Observacoes Finais do Consultor

> {{consultor_observacoes_finais}}

---

> **Avend Franquias** — Relatorio de Visita de Campo
> Documento confidencial. Uso interno da rede Avend Franquias.
> Gerado em: {{data_geracao}} | Consultor: {{consultor_nome}}
> Versao do template: 1.0 | Atualizado: 2026-03-13
