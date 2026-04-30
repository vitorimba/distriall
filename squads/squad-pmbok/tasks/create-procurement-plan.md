# Task: Criar Plano de Gerenciamento das Aquisições

## Metadata
- **id**: create-procurement-plan
- **agent**: procurement-manager
- **elicit**: true
- **version**: 1.0.0

## Description
Desenvolve o Plano de Gerenciamento das Aquisições, definindo o que o projeto precisa adquirir externamente, a análise make-or-buy (fazer internamente ou contratar), os tipos de contrato mais adequados e o processo de seleção de fornecedores. Aquisições bem planejadas reduzem riscos de dependência externa, garantem cumprimento de prazos e protegem o projeto de disputas contratuais. Estudantes aprendem a realizar análise make-or-buy, a escolher entre tipos de contrato (Preço Fixo, Custo Reembolsável, T&M) e a estruturar critérios de seleção de fornecedores.

## Inputs
- Escopo do projeto e WBS (para identificar o que pode ser terceirizado)
- Restrições de orçamento e prazo
- Capacidade interna disponível (o que a equipe pode ou não fazer)
- Política de aquisições da organização
- Lista preliminar de itens a adquirir
- Cronograma do projeto (para definir prazos de contratação)

## Elicitation

1. **O que o projeto precisará adquirir externamente?** Liste itens, serviços, licenças ou recursos que não podem ser fornecidos pela equipe interna. (ex: "Serviço de design UX", "Licença de software X", "Servidor cloud", "Consultoria em segurança", "Desenvolvimento do módulo de pagamento")
2. **Para cada item listado, qual é a justificativa para não fazer internamente?** (ex: "Não temos expertise em segurança de pagamentos", "Seria mais barato terceirizar", "O prazo não permite desenvolver internamente")
3. **A organização tem política de aquisições ou fornecedores homologados?** Se sim, quais são as regras? (ex: "Licitação obrigatória acima de R$ 50.000", "Apenas fornecedores certificados ISO 27001")
4. **Qual é o orçamento disponível para aquisições?** (valor total ou por item)
5. **Quais são os prazos críticos para cada aquisição?** Quando cada contrato precisa estar assinado e o serviço/produto entregue?
6. **Para cada item a adquirir, qual tipo de contrato você prefere?**
   - (A) Preço Fixo (Fixed Price/FFP) — preço fechado, risco do fornecedor
   - (B) Custo Reembolsável (Cost Plus) — reembolsa custos + fee, risco da organização
   - (C) Tempo e Material (T&M) — paga por hora + material, risco compartilhado
   - (D) Não sei — pode sugerir
7. **Quais critérios são mais importantes para selecionar fornecedores?** (ex: preço, experiência, prazo, referências, certificações, suporte local, idioma)
8. **Há fornecedores já pré-aprovados ou preferidos?** Se sim, por quê?
9. **Como serão gerenciadas as entregas dos fornecedores?** Quem será o ponto de contato técnico e comercial da organização?
10. **Quais riscos estão associados às aquisições planejadas?** (ex: "Único fornecedor no mercado", "Dependência de importação", "Fornecedor pode subcontratar")
11. **O projeto tem alguma exigência de confidencialidade ou NDA para os fornecedores?**

## Process

1. **Listar todos os itens de aquisição** — Consolidar tudo que precisa ser comprado ou contratado externamente.
2. **Realizar análise Make-or-Buy** — Para cada item, comparar: custo de fazer internamente × custo de comprar/contratar; tempo disponível × prazo necessário; risco técnico de fazer × risco de dependência externa.
3. **Classificar resultado** — Categorizar cada item como: Make (fazer) / Buy (comprar) / Lease (alugar/assinar) / Hybrid.
4. **Selecionar tipos de contrato** — Para cada item "Buy", recomendar e justificar o tipo de contrato mais adequado.
5. **Definir critérios de seleção de fornecedores** — Criar critérios ponderados para avaliação e ranking de fornecedores.
6. **Criar matriz de avaliação de fornecedores** — Template para pontuar candidatos objetivamente.
7. **Definir processo de aquisição** — Descrever o fluxo: necessidade → aprovação → RFP/RFQ → avaliação → contrato → entrega → encerramento.
8. **Mapear riscos de aquisição** — Identificar riscos específicos das contratações planejadas.
9. **Criar cronograma de aquisições** — Datas-chave para cada contratação integradas ao cronograma do projeto.
10. **Montar o plano completo** — Consolidar análise make-or-buy, tipos de contrato, critérios, processo e cronograma.

## Output

```
# PLANO DE GERENCIAMENTO DAS AQUISIÇÕES
## {Nome do Projeto}

**Versão:** 1.0 | **Data:** {data} | **Responsável:** {GP ou Procurement Manager}

---

## 1. ANÁLISE MAKE-OR-BUY

| # | Item / Serviço                    | Categoria    | Custo Interno Est. | Custo Externo Est. | Decisão | Justificativa                                    |
|---|-----------------------------------|--------------|--------------------|--------------------|---------|--------------------------------------------------|
| 1 | {ex: Design UX/UI}                | Serviço      | R$ {valor} (4 sem) | R$ {valor}         | BUY     | Sem expertise interna; fornecedor entrega em 2 sem|
| 2 | {ex: Servidor Cloud AWS}          | Infraestrutura| N/A               | R$ {valor}/mês     | BUY/LEASE| Sem infraestrutura própria; custo menor          |
| 3 | {ex: Módulo de relatórios}        | Software     | R$ {valor} (6 sem) | R$ {valor}         | MAKE    | Equipe tem capacidade; controle total necessário |
| 4 | {ex: Consultoria em segurança}    | Serviço      | N/A (sem expertise)| R$ {valor}        | BUY     | Competência crítica indisponível internamente    |
| N | {item}                            | {categoria}  | R$ {valor}         | R$ {valor}         | {decisão}| {justificativa}                                |

**Resumo Make-or-Buy:**
- Total para fazer internamente (Make): {N itens}
- Total para adquirir externamente (Buy/Lease): {N itens}
- Valor total de aquisições: **R$ {valor}** ({X}% do orçamento total)

---

## 2. PLANO DE AQUISIÇÕES POR ITEM

| # | Item / Serviço              | Tipo de Contrato | Valor Estimado | Prazo Contratação | Prazo Entrega  | Risco Principal         |
|---|-----------------------------|------------------|----------------|-------------------|----------------|-------------------------|
| 1 | {item}                      | Preço Fixo (FFP) | R$ {valor}     | {data}            | {data}         | {ex: Único fornecedor}  |
| 2 | {item}                      | T&M              | R$ {valor}/h   | {data}            | {data}         | {ex: Escopo indefinido} |
| 3 | {item}                      | Custo + Taxa Fixa| R$ {valor}+    | {data}            | {data}         | {ex: Overrun de custos} |

---

## 3. TIPOS DE CONTRATO — GUIA DE REFERÊNCIA

| Tipo                          | Sigla  | Risco para Comprador | Risco para Fornecedor | Quando Usar                              |
|-------------------------------|--------|----------------------|-----------------------|------------------------------------------|
| Preço Fixo Firme              | FFP    | Baixo                | Alto                  | Escopo bem definido e estável            |
| Preço Fixo + Incentivo        | FPIF   | Médio-Baixo          | Médio                 | Escopo definido, incentivar desempenho   |
| Custo + Taxa Fixa             | CPFF   | Alto                 | Baixo                 | Escopo incerto, P&D, inovação            |
| Custo + Taxa por Incentivo    | CPIF   | Médio-Alto           | Médio                 | Escopo incerto + incentivo ao fornecedor |
| Tempo e Material              | T&M    | Médio                | Médio                 | Escopo indefinido, consultoria, manutenção|

**Contratos escolhidos para este projeto:** {lista com justificativa}

---

## 4. CRITÉRIOS DE SELEÇÃO DE FORNECEDORES

| Critério                            | Peso | Como avaliar                                      |
|-------------------------------------|------|---------------------------------------------------|
| Preço / Custo total                 | {X}% | Comparação de propostas (menor preço pontuação máx)|
| Experiência e referências           | {X}% | Projetos similares entregues (nº e escala)        |
| Prazo de entrega                    | {X}% | Aderência ao cronograma do projeto                |
| Qualificação técnica da equipe      | {X}% | CVs, certificações, testes técnicos               |
| Conformidade legal / Compliance     | {X}% | Certidões, ISO, LGPD, CNPJ ativo                  |
| Suporte pós-entrega                 | {X}% | SLA de suporte, garantia, manutenção              |
| {Critério específico}               | {X}% | {como avaliar}                                    |
| **TOTAL**                           | 100% |                                                   |

**Pontuação mínima para aprovação:** {X} pontos de {total máximo}

---

## 5. PROCESSO DE AQUISIÇÃO (Fluxo)

```
1. PLANEJAR
   └── Identificar necessidade → Aprovação Make-or-Buy → Preparar documentação

2. CONDUZIR AQUISIÇÕES
   ├── Elaborar RFP (Request for Proposal) ou RFQ (Request for Quotation)
   ├── Publicar/Enviar para fornecedores
   ├── Receber e avaliar propostas (Matriz de seleção)
   ├── Negociar termos e condições
   └── Assinar contrato

3. CONTROLAR AQUISIÇÕES
   ├── Monitorar entregas vs. contrato (KPIs definidos)
   ├── Gerenciar mudanças contratuais (Aditivos)
   ├── Resolver disputas conforme cláusula de resolução
   └── Emitir pagamentos conforme marcos contratuais

4. ENCERRAR AQUISIÇÕES
   ├── Inspecionar e aceitar entrega final
   ├── Emitir Termo de Aceite
   ├── Arquivar documentação contratual
   └── Registrar lições aprendidas com o fornecedor
```

---

## 6. CRONOGRAMA DE AQUISIÇÕES

| Item / Contrato              | RFP/RFQ    | Recebimento Propostas | Seleção    | Assinatura  | Entrega     |
|------------------------------|------------|-----------------------|------------|-------------|-------------|
| {item 1}                     | {data}     | {data}                | {data}     | {data}      | {data}      |
| {item 2}                     | {data}     | {data}                | {data}     | {data}      | {data}      |
| {item N}                     | {data}     | {data}                | {data}     | {data}      | {data}      |

---

## 7. RISCOS DE AQUISIÇÕES

| ID   | Risco                                     | Impacto            | Estratégia de Resposta                          |
|------|-------------------------------------------|--------------------|-------------------------------------------------|
| RA01 | Fornecedor único para {item crítico}       | Alta dependência   | Identificar fornecedor alternativo como backup  |
| RA02 | Escopo mal definido em contrato T&M        | Custo acima budget | Definir teto máximo (NTE) no contrato           |
| RA03 | Fornecedor não cumpre prazo               | Atraso no projeto  | Incluir cláusula de multa e plano de contingência|
| RA04 | {risco específico}                        | {impacto}          | {resposta}                                      |

---

## 8. CLÁUSULAS CONTRATUAIS RECOMENDADAS

Para todos os contratos deste projeto, incluir:
- [ ] Declaração de trabalho (SOW) detalhada com critérios de aceitação
- [ ] Marcos de pagamento vinculados a entregas verificáveis
- [ ] Cláusula de confidencialidade (NDA)
- [ ] Cláusula de proteção de dados (LGPD/GDPR, se aplicável)
- [ ] Cláusula de multa por atraso ({X}% ao dia, máximo {Y}%)
- [ ] Cláusula de rescisão por conveniência (com aviso de {N} dias)
- [ ] Cláusula de resolução de disputas (mediação → arbitragem → judicial)
- [ ] Garantia e suporte pós-entrega ({N} meses mínimo)
- [ ] Propriedade intelectual (quem detém os direitos sobre o entregável)
```

## PMBOK Reference
- **Grupo de Processos:** Planejamento (Planning Process Group)
- **Área de Conhecimento:** Gerenciamento das Aquisições do Projeto (Project Procurement Management)
- **Processos PMBOK:**
  - 12.1 — Planejar o Gerenciamento das Aquisições (Plan Procurement Management)
  - 12.2 — Conduzir as Aquisições (referência para execução)
  - 12.3 — Controlar as Aquisições (referência para monitoramento)
- **Documentos-chave:** Statement of Work (SOW), RFP (Request for Proposal), RFQ (Request for Quotation), Bid Documents
- **Decisão central:** Análise Make-or-Buy determina o que será desenvolvido internamente versus adquirido externamente
