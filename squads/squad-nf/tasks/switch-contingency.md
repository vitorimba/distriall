# Task: Alternar para Modo de Contingência

## Purpose
Detectar indisponibilidade da SEFAZ e alternar para modo de contingência (SVC, EPEC, FS-DA) garantindo continuidade das operações fiscais.

## Inputs
- Resultado da tentativa de transmissão (timeout/erro)
- UF do emitente
- Modelo (55=NF-e, 65=NFC-e)
- Motivo da contingência
- Data/hora de início da contingência

## Steps

1. **Detectar necessidade de contingência**
   - Timeout na transmissão (> 60 segundos sem resposta)
   - NfeStatusServico retornando erro ou indisponível
   - Rejeição 108/109 (serviço paralisado temporariamente)
   - Falha de rede/DNS para endpoints SEFAZ

2. **Selecionar modalidade de contingência**
   - **SVC-AN** (SEFAZ Virtual de Contingência — Ambiente Nacional):
     - Para UFs autorizadoras próprias (SP, MG, RS, BA, PR, GO, MT, MS, PE)
     - Troca endpoint para SVC-AN
   - **SVC-RS** (SEFAZ Virtual de Contingência — RS):
     - Para UFs que usam SVAN normalmente
     - Troca endpoint para SVC-RS
   - **EPEC** (Evento Prévio de Emissão em Contingência):
     - Registra evento na SEFAZ AN antes de gerar NF completa
     - Dados mínimos: emitente, destinatário, valor, ICMS
   - **FS-DA** (Formulário de Segurança):
     - Último recurso, impressão em formulário especial
     - Para NFC-e: contingência offline

3. **Ativar contingência no XML**
   - Alterar tpEmis (tipo de emissão):
     - 1: Normal
     - 2: FS-IA (não mais usado)
     - 3: SCAN (descontinuado)
     - 5: FS-DA
     - 6: SVC-AN
     - 7: SVC-RS
     - 9: Contingência offline NFC-e
   - Incluir dhCont (data/hora de entrada em contingência)
   - Incluir xJust (justificativa da contingência)

4. **Transmitir em contingência**
   - Gerar novo XML com tpEmis alterado
   - Reassinar XML (chave de acesso muda com tpEmis)
   - Transmitir ao web service de contingência
   - EPEC: enviar evento prévio primeiro, depois NF completa quando SEFAZ voltar

5. **Monitorar retorno da SEFAZ**
   - Consultar NfeStatusServico periodicamente
   - Quando SEFAZ voltar: transmitir NFs pendentes
   - EPEC: enviar NF completa vinculada ao evento prévio
   - Prazo: até 168 horas (7 dias) para regularizar NFs em contingência

6. **Encerrar contingência**
   - Confirmar SEFAZ operacional
   - Transmitir todas NFs pendentes
   - Voltar tpEmis para 1 (normal)
   - Registrar período de contingência

## Outputs
- Modalidade de contingência ativada
- NFs emitidas em contingência (com tpEmis alterado)
- Log de período de contingência
- NFs pendentes de regularização
- Status de retorno da SEFAZ

## Acceptance Criteria
- [ ] Indisponibilidade detectada automaticamente
- [ ] Modalidade correta selecionada para a UF
- [ ] tpEmis alterado no XML com dhCont e xJust
- [ ] Chave de acesso recalculada com novo tpEmis
- [ ] NFs em contingência transmitidas com sucesso
- [ ] Regularização executada quando SEFAZ retorna
