# Checklist: Emission Quality

> Verificacao de qualidade para emissao de NF-e.
> Executar antes e apos cada emissao.

---

## Pre-Emissao

### Dados do Emitente
- [ ] CNPJ valido e ativo na Receita Federal
- [ ] Inscricao Estadual ativa na SEFAZ do estado
- [ ] Endereco completo (logradouro, numero, bairro, cidade, UF, CEP)
- [ ] CRT correto (1=Simples, 2=Excesso sublimite, 3=Regime Normal)
- [ ] Certificado digital A1 valido e nao expirado

### Dados do Destinatario
- [ ] CNPJ/CPF valido
- [ ] Razao Social/Nome conforme cadastro na Receita
- [ ] Inscricao Estadual (se contribuinte ICMS)
- [ ] Indicador de IE do destinatario correto (1=Contribuinte, 2=Isento, 9=Nao contribuinte)
- [ ] Endereco completo com codigo IBGE do municipio

### Classificacao Fiscal
- [ ] NCM valido e atualizado (8 digitos, verificar tabela TIPI vigente)
- [ ] CFOP compativel com a operacao (entrada/saida, interna/interestadual/exterior)
- [ ] CST/CSOSN compativel com o regime tributario do emitente
- [ ] CEST preenchido quando obrigatorio (Substituicao Tributaria)
- [ ] Natureza da operacao condizente com CFOP

### Calculo de Impostos
- [ ] Base de calculo ICMS correta (inclui frete, seguro, outras despesas)
- [ ] Aliquota ICMS correta para UF origem/destino
- [ ] ICMS-ST calculado quando aplicavel (MVA atualizada)
- [ ] IPI calculado conforme NCM/TIPI (se aplicavel)
- [ ] PIS/COFINS com CST e aliquota corretos para o regime
- [ ] Total da NF = Produtos + Frete + Seguro + Outros - Desconto + IPI + ICMS-ST

### Dados do Produto
- [ ] Descricao clara e detalhada (sem abreviacoes ambiguas)
- [ ] Unidade de medida padronizada (UN, KG, CX, PC, etc.)
- [ ] Valor unitario com precisao adequada (4 casas decimais)
- [ ] Quantidade tributavel preenchida
- [ ] Codigo EAN/GTIN valido (ou SEM GTIN)

### Transporte
- [ ] Modalidade de frete correta (0=Emit, 1=Dest, 2=Terceiro, 9=Sem)
- [ ] Dados da transportadora preenchidos (se frete 0, 1 ou 2)
- [ ] Volumes, peso liquido e bruto informados

### Pagamento
- [ ] Forma de pagamento correta (01=Dinheiro, 03=Cartao, 15=Boleto, etc.)
- [ ] Valor do pagamento = Total da NF

---

## Pos-Emissao

### Autorizacao SEFAZ
- [ ] Protocolo de autorizacao recebido e armazenado
- [ ] Chave de acesso (44 digitos) validada
- [ ] Status retornado = 100 (Autorizado o uso da NF-e)
- [ ] Nenhum alerta/observacao no retorno

### DANFE
- [ ] DANFE gerado em PDF
- [ ] QR Code legivel (NFC-e)
- [ ] Codigo de barras da chave de acesso legivel
- [ ] Dados do DANFE conferem com XML

### Armazenamento
- [ ] XML autorizado armazenado em local seguro
- [ ] XML deve ser mantido por 5 anos (obrigacao legal)
- [ ] Backup do XML em storage redundante
- [ ] DANFE armazenado junto ao XML

### Comunicacao
- [ ] XML/DANFE enviado ao destinatario por email
- [ ] Registro atualizado no ERP/sistema interno
- [ ] Webhook de confirmacao disparado (se integrado)

### Registro Contabil
- [ ] Nota registrada no livro fiscal eletronico
- [ ] Impostos destacados corretamente para apuracao
- [ ] Credito de ICMS registrado (se entrada com direito a credito)

---

## Tratamento de Rejeicao

Se a NF-e foi rejeitada:

- [ ] Codigo de rejeicao identificado (consultar `data/rejection-codes.yaml`)
- [ ] Causa raiz documentada
- [ ] Correcao aplicada
- [ ] Re-emissao realizada com sucesso
- [ ] Rejeicao registrada no log para analise futura

---

*Checklist mantido pelo squad-nf*
