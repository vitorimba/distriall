# Task: Monitorar Certificados Digitais

## Purpose
Monitorar proativamente a validade dos certificados digitais A1, alertando sobre vencimentos próximos para evitar interrupção na emissão de NFs.

## Inputs
- Certificados digitais cadastrados no sistema
- Configuração de alertas (dias de antecedência)
- Canais de notificação (email, Slack, webhook)
- Responsáveis pela renovação

## Steps

1. **Inventariar certificados ativos**
   - Listar todos certificados A1 cadastrados
   - Para cada certificado extrair:
     - CNPJ vinculado
     - AC emissora (Autoridade Certificadora)
     - Data de emissão (notBefore)
     - Data de expiração (notAfter)
     - Dias restantes
     - Titular (razão social)

2. **Classificar status de cada certificado**
   - **OK** (verde): > 90 dias para expirar
   - **Atenção** (amarelo): 60-90 dias — planejar renovação
   - **Alerta** (laranja): 30-60 dias — iniciar renovação
   - **Urgente** (vermelho): 15-30 dias — renovação imediata
   - **Crítico**: < 15 dias — risco de parada operacional
   - **Expirado**: certificado inválido, operações bloqueadas

3. **Configurar alertas automáticos**
   - 90 dias: email informativo ao responsável
   - 60 dias: email + notificação no sistema
   - 30 dias: email + Slack/Teams + alerta no dashboard
   - 15 dias: notificação diária a todos os responsáveis
   - 7 dias: notificação urgente + escalação para gestor
   - Expirado: bloqueio de emissão + alerta crítico

4. **Verificar validade periodicamente**
   - Execução diária (cron job)
   - Verificar CRL/OCSP para revogação
   - Validar cadeia de certificação (ICP-Brasil)
   - Testar assinatura com NfeStatusServico

5. **Gerar relatório de status**
   - Dashboard com todos certificados e status
   - Histórico de renovações
   - Previsão de próximos vencimentos
   - Custos de renovação (quando rastreado)

6. **Documentar processo de renovação**
   - AC emissora e contato
   - Prazo de emissão do novo certificado
   - Procedimento de importação no sistema
   - Checklist pós-renovação (testar emissão)

## Outputs
- Dashboard de status dos certificados
- Alertas automáticos configurados
- Relatório de validade atualizado
- Processo de renovação documentado
- Log de verificações periódicas

## Acceptance Criteria
- [ ] Todos certificados inventariados com data de expiração
- [ ] Classificação por status (verde/amarelo/laranja/vermelho)
- [ ] Alertas automáticos configurados em 5 níveis
- [ ] Verificação diária de validade executando
- [ ] Dashboard acessível com status atualizado
- [ ] Processo de renovação documentado
