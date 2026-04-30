# Task: Emitir NFC-e (Nota Fiscal de Consumidor Eletrônica)

## Purpose
Emitir NFC-e modelo 65 para vendas ao consumidor final presencial, com DANFE simplificado e QR Code.

## Inputs
- Dados do emitente (CNPJ, IE, endereço)
- Dados do consumidor (CPF opcional, sem IE)
- Itens vendidos (descrição, NCM, CFOP, quantidade, valor)
- Forma de pagamento (dinheiro, cartão, PIX, etc.)
- CSC (Código de Segurança do Contribuinte)
- Token ID do CSC
- Certificado digital A1

## Steps

1. **Validar campos obrigatórios**
   - Verificar dados do emitente
   - CPF do consumidor opcional (obrigatório acima de R$ 200 em alguns estados)
   - Validar itens e valores

2. **Classificar e calcular tributos**
   - NCM e CFOP (geralmente 5102 - venda mercadoria)
   - Executar task `calculate-icms.md` (operação interna)
   - Executar task `calculate-pis-cofins.md`
   - Calcular valor aproximado de tributos (Lei 12.741/2012 - De Olho no Imposto)

3. **Gerar XML NFC-e**
   - Montar XML modelo 65 conforme MOC
   - Gerar chave de acesso (44 dígitos)
   - Incluir grupo de pagamento (tag pag)
   - Gerar QR Code com CSC (URL + chave + digest)
   - Incluir link de consulta por chave

4. **Assinar XML**
   - Assinar com certificado A1 (SHA-256/RSA)
   - Validar assinatura

5. **Transmitir à SEFAZ**
   - Enviar via web service NfeAutorizacao
   - NFC-e usa transmissão síncrona (resposta imediata)

6. **Tratar resposta**
   - cStat 100: Salvar protocolo, gerar DANFE NFC-e
   - Rejeição: Executar task `handle-rejection.md`
   - Offline: Ativar contingência offline (task `switch-contingency.md`)

7. **Gerar DANFE NFC-e**
   - Layout simplificado (cupom fiscal)
   - QR Code obrigatório
   - Informações do consumidor (quando informado)
   - Tributos aproximados (Lei da Transparência)

## Outputs
- XML da NFC-e assinado e protocolado
- DANFE NFC-e (formato cupom com QR Code)
- Chave de acesso
- Log de transmissão

## Acceptance Criteria
- [ ] XML modelo 65 conforme schema NFC-e v4.00
- [ ] QR Code gerado corretamente com CSC
- [ ] Transmissão síncrona com resposta imediata
- [ ] DANFE NFC-e em formato cupom com QR Code
- [ ] Tributos aproximados informados (Lei 12.741)
- [ ] Contingência offline disponível quando SEFAZ indisponível
