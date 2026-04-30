# Task: Carta de Correção Eletrônica (CC-e)

## Purpose
Emitir CC-e (evento 110110) para corrigir informações textuais da NF-e, sem alterar valores ou dados fiscais.

## Inputs
- Chave de acesso da NF-e (44 dígitos)
- Texto da correção (mín. 15 caracteres)
- Sequência do evento (1 a 20)
- Certificado digital A1

## Steps

1. **Verificar elegibilidade**
   - Confirmar que a NF-e está autorizada
   - Confirmar que a NF-e NÃO está cancelada
   - Verificar quantidade de CC-e já emitidas (máximo 20 por NF)
   - Verificar prazo: até 30 dias da autorização (varia por UF)

2. **Validar escopo da correção**
   - CC-e NÃO pode alterar:
     - Valores fiscais (base cálculo, alíquotas, impostos)
     - Quantidade de mercadoria
     - Dados do emitente/destinatário que alterem identidade
     - Número, série ou data de emissão
     - Destaque de impostos inexistente no original
   - CC-e PODE corrigir:
     - CFOP (desde que não altere natureza da operação fiscal)
     - Dados adicionais
     - Endereço do destinatário
     - Razão social (correção de digitação)
     - Códigos fiscais complementares

3. **Gerar evento CC-e**
   - Tipo evento: 110110
   - Sequência: próximo número disponível (nSeqEvento)
   - Texto da correção: concatenação de todas as correções anteriores + atual
   - Montar XML conforme schema de evento

4. **Assinar evento**
   - Assinar com certificado A1 (SHA-256/RSA)

5. **Transmitir à SEFAZ**
   - Enviar via web service RecepcaoEvento
   - Aguardar retorno

6. **Tratar resposta**
   - cStat 135: CC-e registrada — salvar protocolo
   - Rejeição: Mapear erro e sugerir correção
   - Nota: CC-e é cumulativa (cada nova CC-e deve conter texto completo)

## Outputs
- XML do evento CC-e protocolado
- Protocolo do evento
- Número sequencial do evento
- Log de transmissão

## Acceptance Criteria
- [ ] Evento 110110 gerado conforme schema
- [ ] Texto com mínimo 15 caracteres
- [ ] Máximo 20 CC-e por NF-e respeitado
- [ ] Correção NÃO altera valores fiscais
- [ ] CC-e cumulativa (texto concatenado com anteriores)
- [ ] Evento registrado com sucesso na SEFAZ
