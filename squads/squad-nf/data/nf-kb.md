# NF-e Knowledge Base

> Base de conhecimento para operacoes com Nota Fiscal Eletronica no Brasil.

---

## 1. Tipos de Documentos Fiscais Eletronicos

| Modelo | Sigla | Descricao | Uso |
|--------|-------|-----------|-----|
| 55 | NF-e | Nota Fiscal Eletronica | Venda de mercadorias (B2B e B2C com entrega) |
| 65 | NFC-e | Nota Fiscal de Consumidor Eletronica | Venda presencial ao consumidor final |
| 57 | CT-e | Conhecimento de Transporte Eletronico | Prestacao de servico de transporte |
| — | NFS-e | Nota Fiscal de Servico Eletronica | Prestacao de servicos (municipal) |
| 58 | MDF-e | Manifesto Eletronico de Documentos Fiscais | Transporte interestadual/intermunicipal |

---

## 2. Regimes Tributarios

### MEI (Microempreendedor Individual)
- Faturamento: ate R$ 81.000/ano
- Imposto: DAS fixo mensal (~R$ 70-80)
- NF-e: obrigatoria apenas para venda a PJ
- CRT: 4 (MEI)

### Simples Nacional
- Faturamento: ate R$ 4.800.000/ano
- Imposto: DAS unificado (aliquota progressiva por Anexo)
- Anexos: I (Comercio), II (Industria), III (Servicos), IV (Servicos especificos), V (Servicos tecnicos)
- CSOSN: 101, 102, 103, 201, 202, 203, 300, 400, 500, 900
- CRT: 1

### Lucro Presumido
- Faturamento: ate R$ 78.000.000/ano
- Base IRPJ/CSLL: presuncao sobre faturamento (8% comercio, 32% servicos)
- PIS/COFINS: cumulativo (0,65% + 3,00%)
- CST ICMS: tabela completa (00-90)
- CRT: 3

### Lucro Real
- Sem limite de faturamento (obrigatorio acima de R$ 78M)
- IRPJ/CSLL sobre lucro liquido real
- PIS/COFINS: nao-cumulativo (1,65% + 7,60%) com creditos
- CST ICMS: tabela completa (00-90)
- CRT: 3

---

## 3. Impostos na NF-e

| Imposto | Incidencia | Competencia | Destaques |
|---------|-----------|-------------|-----------|
| ICMS | Circulacao de mercadorias | Estadual | Aliquotas variam por UF e operacao |
| ICMS-ST | Substituicao tributaria | Estadual | MVA sobre preco, recolhimento antecipado |
| IPI | Produtos industrializados | Federal | Aliquota por NCM (tabela TIPI) |
| PIS | Faturamento | Federal | Cumulativo ou nao-cumulativo |
| COFINS | Faturamento | Federal | Cumulativo ou nao-cumulativo |
| ISS | Servicos | Municipal | 2% a 5%, conforme municipio |
| DIFAL | Diferencial de aliquota | Estadual | Interestadual para consumidor final |

---

## 4. Conceitos-Chave

### Chave de Acesso (44 digitos)
Identificador unico da NF-e composto por: UF + AAMM + CNPJ + Modelo + Serie + Numero + tpEmis + cNF + DV

### CFOP (Codigo Fiscal de Operacoes e Prestacoes)
Classifica a natureza da operacao. 4 digitos: 1o digito indica tipo:
- 1/2/3 = Entradas (interna/interestadual/exterior)
- 5/6/7 = Saidas (interna/interestadual/exterior)

### CST (Codigo de Situacao Tributaria)
Classifica a tributacao do ICMS. 3 digitos: Origem (1 dig) + Tributacao (2 dig).
- Usado por empresas no Lucro Presumido e Real (CRT=3)

### CSOSN (Codigo de Situacao da Operacao do Simples Nacional)
Equivalente ao CST para empresas do Simples Nacional (CRT=1).

### NCM (Nomenclatura Comum do Mercosul)
Classificacao de mercadorias. 8 digitos. Determina aliquota IPI e tratamento ICMS.

### CEST (Codigo Especificador da Substituicao Tributaria)
Identifica mercadorias sujeitas a ST. 7 digitos. Obrigatorio quando ha ST.

---

## 5. Operacoes Comuns

### Emissao de NF-e
1. Montar dados (emit, dest, itens, impostos)
2. Classificar operacao (CFOP, CST/CSOSN, NCM)
3. Calcular impostos
4. Gerar XML conforme layout 4.0
5. Assinar digitalmente (certificado A1/A3)
6. Transmitir a SEFAZ
7. Receber protocolo de autorizacao
8. Gerar DANFE

### Cancelamento
- Prazo: ate 24 horas apos autorizacao (varia por UF)
- Justificativa minima: 15 caracteres
- Apos prazo: usar NF-e de estorno/devolucao

### Carta de Correcao (CC-e)
- Prazo: ate 30 dias apos autorizacao
- Nao pode alterar: valores, impostos, dados que alterem calculo
- Pode corrigir: dados cadastrais, CFOP (sem alterar valor), descricao
- Maximo: 20 CC-e por NF-e

### Inutilizacao
- Quando: numeracao pulada (falha de sistema)
- Deve ser feita ate o 10o dia do mes seguinte
- Evita lacuna na sequencia numerica

### Devolucao
- NF-e de devolucao referencia a NF-e original
- CFOP de devolucao correspondente ao CFOP original
- Impostos destacados = impostos da NF original

---

## 6. Contingencia

| Modo | Quando Usar | Descricao |
|------|------------|-----------|
| EPEC | SEFAZ indisponivel | Evento Previo de Emissao em Contingencia |
| SVC-AN | SEFAZ da UF offline | Sefaz Virtual de Contingencia (Ambiente Nacional) |
| SVC-RS | SEFAZ da UF offline | Sefaz Virtual de Contingencia (RS) |
| FS-DA | Sem internet | Formulario de Seguranca (papel, raro) |

---

## 7. Providers NF-e (APIs)

| Provider | Site | Modelo |
|----------|------|--------|
| Focus NFe | focusnfe.com.br | API REST, por NF emitida |
| NFe.io | nfe.io | API REST, planos mensais |
| eNotas | enotas.com.br | API REST, planos por volume |
| WebmaniaBR | webmaniabr.com | API REST + plugins WooCommerce |
| SEFAZ Direta | — | Webservice SOAP (complexo, sem intermediario) |

---

## 8. FAQ

**P: Preciso de certificado digital para emitir NF-e?**
R: Sim. Certificado A1 (arquivo .pfx, valido 1 ano) ou A3 (cartao/token, valido 3 anos).

**P: Qual a diferenca entre NF-e e NFC-e?**
R: NF-e (modelo 55) e para operacoes B2B ou B2C com entrega. NFC-e (modelo 65) e para venda presencial ao consumidor.

**P: MEI precisa emitir NF-e?**
R: Obrigatorio apenas em vendas para Pessoa Juridica. Dispensado para vendas a Pessoa Fisica.

**P: Quanto tempo devo guardar os XMLs?**
R: 5 anos (obrigacao legal conforme CTN Art. 173/174).

**P: O que acontece se a SEFAZ rejeitar minha NF-e?**
R: A NF-e NAO e valida. Corrija o erro indicado pelo codigo de rejeicao e retransmita. Nao ha custo por rejeicao.

**P: Posso alterar uma NF-e autorizada?**
R: Nao diretamente. Use CC-e para correcoes menores, ou NF-e complementar/de estorno para ajustes de valor.

**P: O que e DIFAL?**
R: Diferencial de Aliquota. Cobrado em vendas interestaduais para consumidor final nao contribuinte. Partilhado entre UF origem e destino.

---

## 9. Referencias

- Portal Nacional NF-e: https://www.nfe.fazenda.gov.br
- Manual de Integracao v4.0: https://www.nfe.fazenda.gov.br/portal/listaConteudo.aspx?tipoConteudo=33ol5hhSYZk=
- BrasilAPI (NCM, CNPJ): https://brasilapi.com.br
- IBGE Municipios: https://servicodados.ibge.gov.br/api/v1/localidades/municipios
- Tabela TIPI: https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias/tipi

---

*Knowledge base mantida pelo squad-nf*
