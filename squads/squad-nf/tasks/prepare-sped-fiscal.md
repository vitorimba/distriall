# Task: Preparar SPED Fiscal (Método Rodrigues 7 Fases)

## Purpose
Guiar a geração do SPED Fiscal (EFD-ICMS/IPI) seguindo o método de 7 fases de Rodrigues para garantir completude e conformidade.

## Inputs
- Período de apuração (mês/ano)
- NFs emitidas e recebidas do período
- Livros fiscais (entradas, saídas, apuração ICMS, IPI)
- Inventário (se dezembro ou mudança de regime)
- Dados cadastrais da empresa

## Steps

1. **Fase 1 — Preparação dos dados cadastrais**
   - Bloco 0: Abertura e identificação
   - Registro 0000: Dados da empresa (CNPJ, IE, UF, regime)
   - Registro 0150: Cadastro de participantes (clientes/fornecedores)
   - Registro 0200: Tabela de itens (NCM, unidade, tipo)
   - Registro 0450: Tabela de informações complementares

2. **Fase 2 — Escrituração de documentos fiscais de entrada**
   - Bloco C: Documentos fiscais de mercadoria
   - Registro C100: NF-e de entrada (modelo 55)
   - Registro C170: Itens do documento de entrada
   - Registro C190: Consolidação por CFOP/CST
   - Validar: CFOP de entrada (1xxx, 2xxx, 3xxx)

3. **Fase 3 — Escrituração de documentos fiscais de saída**
   - Registro C100: NF-e de saída (modelo 55)
   - Registro C170: Itens do documento de saída
   - Registro C190: Consolidação por CFOP/CST
   - Registro C800/C860: NFC-e (modelo 65) quando aplicável
   - Validar: CFOP de saída (5xxx, 6xxx, 7xxx)

4. **Fase 4 — Apuração do ICMS**
   - Bloco E: Apuração do ICMS e IPI
   - Registro E100: Período de apuração
   - Registro E110: Apuração ICMS (débitos - créditos = saldo)
   - Registro E200: Apuração ICMS-ST
   - Registro E300: Apuração DIFAL (EC 87/2015)
   - Confrontar com GIA/DAPI quando exigido pela UF

5. **Fase 5 — Apuração do IPI (quando aplicável)**
   - Registro E500: Período de apuração IPI
   - Registro E510: Consolidação por CFOP e CST IPI
   - Registro E520: Apuração IPI

6. **Fase 6 — Inventário (quando obrigatório)**
   - Bloco H: Inventário físico
   - Registro H005: Totais do inventário
   - Registro H010: Itens do inventário (NCM, quantidade, valor)
   - Obrigatório: dezembro, mudança de regime, encerramento

7. **Fase 7 — Validação e transmissão**
   - Importar arquivo no PVA (Programa Validador e Assinador)
   - Executar validação (erros e advertências)
   - Corrigir erros impeditivos
   - Assinar com certificado digital
   - Transmitir via ReceitaNet

## Outputs
- Arquivo SPED Fiscal (.txt) conforme layout EFD-ICMS/IPI
- Relatório de validação (erros/advertências)
- Resumo da apuração (ICMS, IPI, ICMS-ST)
- Recibo de transmissão

## Acceptance Criteria
- [ ] 7 fases de Rodrigues executadas na sequência
- [ ] Blocos 0, C, E, H preenchidos conforme layout
- [ ] Apuração ICMS = total débitos - total créditos
- [ ] Inventário incluído quando obrigatório
- [ ] Validação PVA sem erros impeditivos
- [ ] Arquivo transmitido com recibo
