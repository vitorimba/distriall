# Task: Emitir NF-e (Nota Fiscal Eletrônica de Produtos)

## Purpose
Emitir NF-e modelo 55 para operações com produtos/mercadorias, gerando XML assinado e transmitindo à SEFAZ.

## Inputs
- Dados do emitente (CNPJ, IE, endereço, regime tributário)
- Dados do destinatário (CNPJ/CPF, IE, endereço)
- Itens da nota (descrição, NCM, CFOP, quantidade, valor unitário)
- Natureza da operação (venda, devolução, remessa, etc.)
- Certificado digital A1 válido
- Ambiente (produção/homologação)

## Steps

1. **Validar campos obrigatórios**
   - Verificar CNPJ/CPF do emitente e destinatário
   - Validar IE do emitente e destinatário (quando aplicável)
   - Confirmar endereços completos (CEP, UF, município IBGE)

2. **Classificar NCM e CFOP**
   - Executar task `classify-ncm.md` para cada item
   - Executar task `determine-cfop.md` para natureza da operação
   - Executar task `determine-cst.md` para CST/CSOSN

3. **Calcular tributos**
   - Executar task `calculate-icms.md` (ICMS próprio)
   - Executar task `calculate-icms-st.md` (se aplicável)
   - Executar task `calculate-pis-cofins.md`
   - Calcular IPI quando aplicável
   - Calcular DIFAL se operação interestadual para consumidor final

4. **Gerar XML**
   - Montar XML conforme layout MOC (Manual de Orientação do Contribuinte)
   - Incluir informações adicionais (fisco e contribuinte)
   - Gerar chave de acesso (44 dígitos)
   - Calcular dígito verificador

5. **Assinar XML**
   - Carregar certificado A1 (task `manage-certificate.md`)
   - Assinar com algoritmo SHA-256 / RSA
   - Validar assinatura antes do envio

6. **Transmitir à SEFAZ**
   - Conectar ao web service (task `connect-sefaz.md`)
   - Enviar lote (NfeAutorizacao)
   - Aguardar retorno (NfeRetAutorizacao)

7. **Tratar resposta**
   - cStat 100: Autorizada — salvar protocolo e XML completo
   - cStat 5xx: Rejeição — executar task `handle-rejection.md`
   - Timeout: Executar task `switch-contingency.md`

## Outputs
- XML da NF-e assinado e protocolado
- Número e série da NF-e
- Chave de acesso (44 dígitos)
- DANFE (representação gráfica)
- Log de transmissão com cStat e xMotivo

## Acceptance Criteria
- [ ] XML gerado conforme schema NF-e v4.00
- [ ] Assinatura digital válida (XAdES)
- [ ] Transmissão bem-sucedida com protocolo de autorização
- [ ] Chave de acesso com 44 dígitos e dígito verificador correto
- [ ] Tributos calculados conforme legislação vigente
- [ ] DANFE gerado com QR Code (quando aplicável)
