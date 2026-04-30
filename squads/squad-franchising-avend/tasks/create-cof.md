# Task: create-cof

```yaml
task: create-cof
id: FA-TASK-002
responsavel: "@franchise-legal + @franchise-master-br"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - business_profile_path: string - Path para perfil completo do negocio
  - financial_data_path: string - Path para dados financeiros auditados
  - franchise_model_path: string - Path para definicao do modelo de franquia
  - legal_docs_path: string - Path para documentos legais existentes (contrato social, marcas INPI)
  - franchisee_list_path: string - Path para lista de franqueados ativos (se existente)

Saida:
  - cof-avend-franquias.md: COF completa conforme Lei 13.966/2019
  - cof-checklist-compliance.md: Checklist de compliance da COF
  - cof-annexes/: Diretorio com anexos obrigatorios

Checklist:
  - Todos os 19 itens do Art. 2o da Lei 13.966/2019 presentes
  - Dados financeiros dos ultimos 2 exercicios incluidos
  - Lista completa de franqueados e ex-franqueados (ultimos 24 meses)
  - Pendencias judiciais declaradas
  - Territorio e exclusividade definidos
  - Taxas e valores detalhados com clareza
  - Prazo de entrega (10 dias antes da assinatura) documentado
  - Modelo de contrato de franquia anexado
  - Balanco e DRE auditados anexados
  - Revisao juridica recomendada antes de uso

veto_conditions:
  - Marca nao registrada no INPI (nem pedido depositado)
  - Dados financeiros inexistentes ou nao auditaveis
  - Franqueador com impedimentos legais nao declarados
  - Informacoes deliberadamente omitidas ou falsas
  - Modelo de negocio sem unidade propria comprovada

output_examples:
  - |
    ## CIRCULAR DE OFERTA DE FRANQUIA — AVEND FRANQUIAS
    **Conforme Lei 13.966 de 26 de dezembro de 2019**
    **Data de emissao: [DATA]**
    **Validade: 12 meses a partir da data de emissao**

    ### I. Historico resumido, forma societaria e nome completo do franqueador
    Avend Franquias Ltda., inscrita no CNPJ sob no [XX.XXX.XXX/0001-XX]...
```

---

## Purpose

Gerar a **Circular de Oferta de Franquia (COF)** completa e em conformidade com a **Lei 13.966/2019** (Lei de Franquias do Brasil), que substituiu a Lei 8.955/94. A COF e o documento mais importante do sistema de franquias brasileiro — e o equivalente ao Franchise Disclosure Document (FDD) americano.

A COF deve ser entregue ao candidato a franqueado com **antecedencia minima de 10 (dez) dias** antes da assinatura do contrato ou pre-contrato de franquia, ou ainda do pagamento de qualquer tipo de taxa pelo franqueado (Art. 2o, Lei 13.966/2019).

**Consequencia do descumprimento:** A nao entrega da COF no prazo legal, ou a entrega de COF com informacoes falsas, torna o contrato **anulavel** por iniciativa do franqueado, que podera exigir devolucao de todas as quantias pagas ao franqueador, a titulo de taxa de franquia e royalties, devidamente corrigidas.

**Principio fundamental:** A COF nao e um documento de marketing. E um documento de **disclosure** — transparencia total. Sua funcao e dar ao candidato todas as informacoes necessarias para tomar uma decisao informada. Qualquer tentativa de omitir, minimizar ou distorcer informacoes viola a lei e expoe o franqueador a risco legal significativo.

**Contexto Avend:** A COF da Avend Franquias deve refletir o modelo de microfranquia de vending machines: investimento de ~R$50k, operacao semi-passiva, 184 maquinas, 90 contratos de franquia, associada ABF. Deve ser atualizada anualmente e sempre que houver mudanca material nas informacoes.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `business_profile_path` | string | Sim | Perfil completo: razao social, CNPJ, endereco, historia, socios, estrutura societaria |
| `financial_data_path` | string | Sim | DRE e Balanco Patrimonial dos ultimos 2 exercicios fiscais, auditados |
| `franchise_model_path` | string | Sim | Modelo de franquia: taxas, territorio, exclusividade, obrigacoes, suporte |
| `legal_docs_path` | string | Sim | Contrato social, registro INPI, processos judiciais, contratos vigentes |
| `franchisee_list_path` | string | Condicional | Lista de franqueados ativos e inativos (ultimos 24 meses). Obrigatorio se ja existe rede |
| `operations_manual_summary` | string | Nao | Resumo do manual operacional (para referencia na COF) |
| `territory_map_path` | string | Nao | Mapa territorial com areas disponiveis e ocupadas |

---

## Preconditions

1. **Marca registrada no INPI**: Pelo menos pedido de registro depositado. Idealmente com registro concedido. Sem marca, nao ha franquia.
2. **Dados financeiros auditados**: DRE e Balanco dos ultimos 2 exercicios. Obrigatorio por lei.
3. **Modelo de franquia definido**: Taxas, territorio, obrigacoes — tudo definido antes de redigir a COF.
4. **Contrato de franquia redigido**: O modelo de contrato e anexo obrigatorio da COF.
5. **Informacoes de franqueados disponiveis**: Se ja existe rede, lista completa e obrigatoria.
6. **Assessoria juridica**: Recomenda-se fortemente que a COF seja revisada por advogado especializado em franchising antes de uso.

---

## Key Activities & Instructions

### Phase 1: Coleta e Validacao de Informacoes

**1.1 — Checklist de Informacoes Necessarias**

Antes de iniciar a redacao, coletar e validar TODAS as informacoes abaixo:

```yaml
cof_data_collection:
  franqueador:
    razao_social: ""
    cnpj: ""
    endereco_sede: ""
    data_constituicao: ""
    forma_societaria: ""
    socios:
      - nome: ""
        cpf: ""
        participacao: ""
    objeto_social: ""
    historico_resumido: ""

  marca:
    nome_marca: ""
    registro_inpi_numero: ""
    status_registro: "" # Concedido, Em analise, Depositado
    classes_nce: []
    data_concessao: ""
    data_validade: ""
    patentes: []

  rede:
    total_unidades: 0
    unidades_proprias: 0
    unidades_franqueadas: 0
    unidades_abertas_ultimo_ano: 0
    unidades_fechadas_ultimo_ano: 0
    estados_atuacao: []
    data_inicio_franquia: ""

  financeiro:
    dre_ultimo_exercicio: ""
    dre_penultimo_exercicio: ""
    balanco_ultimo_exercicio: ""
    balanco_penultimo_exercicio: ""
    auditor: ""

  taxas:
    taxa_franquia: 0
    royalties_percentual: 0
    royalties_minimo: 0
    taxa_publicidade: 0
    outras_taxas: []
    investimento_inicial_total: ""

  juridico:
    pendencias_judiciais: []
    processos_franqueados: []
    processos_trabalhistas_relevantes: []
    arbitragens: []
```

**Elicitation point:** Apresentar formulario de coleta e solicitar preenchimento completo.

**1.2 — Validacao de Pre-Requisitos Legais**

| Requisito | Status | Observacao |
|-----------|--------|-----------|
| CNPJ ativo e regular | [ ] | |
| Marca registrada INPI | [ ] | |
| Contrato social atualizado | [ ] | |
| DRE 2 exercicios | [ ] | |
| Balanco 2 exercicios | [ ] | |
| Contrato de franquia redigido | [ ] | |
| Sem impedimentos legais graves | [ ] | |

**Se qualquer requisito critico falhar, PARAR e reportar o gap com acao corretiva necessaria.**

---

### Phase 2: Redacao da COF — Os 19 Itens Obrigatorios

**Base legal:** Art. 2o da Lei 13.966/2019.

A COF DEVE conter, obrigatoriamente, os seguintes elementos:

---

#### Item I: Historico Resumido, Forma Societaria e Nome Completo

**Base legal:** Art. 2o, I — "historico resumido da empresa franqueadora, contendo sua forma societaria e nome completo ou razao social do franqueador, bem como de todas as empresas a ele ligadas, e respectivos nomes de fantasia e enderecos"

**Conteudo obrigatorio:**

```markdown
## I. HISTORICO RESUMIDO, FORMA SOCIETARIA E NOME COMPLETO DO FRANQUEADOR

### 1.1 Identificacao do Franqueador
- **Razao Social:** [Razao Social completa]
- **Nome Fantasia:** Avend Franquias
- **CNPJ:** [XX.XXX.XXX/0001-XX]
- **Inscricao Estadual:** [XX.XXX.XXX-X]
- **Endereco da Sede:** [Endereco completo]
- **Telefone:** [Telefone]
- **E-mail:** [E-mail]
- **Website:** [URL]

### 1.2 Forma Societaria
[Tipo societario: Ltda., S.A., EIRELI, etc.]
Data de constituicao: [Data]
Capital social: R$ [Valor]

### 1.3 Socios/Acionistas
| Nome Completo | CPF | Participacao (%) | Funcao |
|--------------|-----|-----------------|--------|
| Guilherme Alvares | [CPF] | [%] | [Funcao] |

### 1.4 Empresas Ligadas ao Franqueador
[Lista de empresas do grupo, coligadas, controladas]

### 1.5 Historico Resumido
[Historia da empresa desde a fundacao, marcos relevantes,
evolucao do modelo de negocio, inicio da operacao de franquia]
```

**Instrucoes especificas:**
- O historico deve ser factual, nao promocional
- Incluir TODAS as empresas ligadas (mesmo holdings)
- Se houver mudanca societaria recente, explicar
- Datas devem ser precisas

---

#### Item II: Balanco e Demonstracoes Financeiras

**Base legal:** Art. 2o, II — "balanco e demonstracoes financeiras da empresa franqueadora relativos aos 2 (dois) ultimos exercicios"

**Conteudo obrigatorio:**

```markdown
## II. BALANCO E DEMONSTRACOES FINANCEIRAS

### 2.1 Demonstracao do Resultado do Exercicio (DRE)

#### Exercicio [ANO-1]
[DRE completa]

#### Exercicio [ANO-2]
[DRE completa]

### 2.2 Balanco Patrimonial

#### Exercicio [ANO-1]
[Balanco completo]

#### Exercicio [ANO-2]
[Balanco completo]

### 2.3 Notas Explicativas
[Se houver notas relevantes]

### 2.4 Parecer do Auditor
[Nome do auditor/empresa de auditoria]
[CRC do auditor]
[Parecer resumido]
```

**Instrucoes especificas:**
- Demonstracoes devem ser auditadas (recomendado, nao obrigatorio por lei para empresas de pequeno porte)
- Se nao auditadas, declarar explicitamente
- Incluir notas explicativas relevantes
- Formato deve seguir padroes contabeis brasileiros (NBC/CPC)

---

#### Item III: Indicacao de Pendencias Judiciais

**Base legal:** Art. 2o, III — "indicacao precisa de todas as pendencias judiciais em que estejam envolvidos o franqueador, as empresas controladoras e titulares de marcas, patentes e direitos autorais relativos a operacao e os subfranqueadores, questionando especificamente o sistema da franquia ou que possam diretamente vir a impossibilitar o funcionamento da franquia"

**Conteudo obrigatorio:**

```markdown
## III. PENDENCIAS JUDICIAIS

### 3.1 Acoes Judiciais Envolvendo o Sistema de Franquia
| Processo | Vara/Tribunal | Partes | Objeto | Status | Valor |
|----------|---------------|--------|--------|--------|-------|
| [No] | [Vara] | [Autor vs. Reu] | [Objeto] | [Em andamento/Encerrado] | R$ [Valor] |

### 3.2 Acoes que Possam Impossibilitar o Funcionamento
[Declarar se existem ou nao]

### 3.3 Acoes Envolvendo Empresas Ligadas
[Lista de processos envolvendo controladores, titulares de marca]

### 3.4 Declaracao
[Se nao houver pendencias: "O Franqueador declara, sob as penas da lei,
que nao existem pendencias judiciais que questionem o sistema de franquia
ou que possam impossibilitar o funcionamento da franquia."]
```

**Instrucoes especificas:**
- TODAS as pendencias devem ser declaradas — omissao e motivo de anulacao
- Incluir processos encerrados nos ultimos 12 meses
- Processos trabalhistas so se relevantes para o sistema
- Processos de franqueados contra franqueador sao SEMPRE relevantes

---

#### Item IV: Descricao Detalhada da Franquia

**Base legal:** Art. 2o, IV — "descricao detalhada da franquia, descricao geral do negocio e das atividades que serao desempenhadas pelo franqueado"

**Conteudo obrigatorio:**

```markdown
## IV. DESCRICAO DETALHADA DA FRANQUIA

### 4.1 Conceito do Negocio
[Descricao do modelo de negocio de vending machines]
[Proposta de valor ao consumidor final]
[Proposta de valor ao franqueado]

### 4.2 Descricao da Operacao
[Como funciona a operacao dia-a-dia de uma unidade franqueada]
[Atividades do franqueado]
[Rotina operacional]

### 4.3 Produtos e Servicos
[Lista de produtos comercializados nas maquinas]
[Categorias: bebidas, snacks, alimentos, etc.]
[Fornecedores homologados]

### 4.4 Mercado-Alvo
[Publico consumidor: perfil, localizacao, comportamento]
[Pontos comerciais ideais: escritorios, hospitais, universidades]

### 4.5 Modelo de Franquia
[Tipo: microfranquia, franquia unitaria, multi-unit]
[Formato: home-based, ponto fixo, operacao movel]
[Dedicacao: integral, parcial, semi-passiva]

### 4.6 Diferenciais Competitivos
[O que torna a Avend diferente de concorrentes]
[Vantagens do modelo franqueado]
```

---

#### Item V: Perfil do Franqueado Ideal

**Base legal:** Art. 2o, V — "perfil do franqueado ideal no que se refere a experiencia anterior, nivel de escolaridade e outras caracteristicas que deve ter, obrigatoria ou preferencialmente"

**Conteudo obrigatorio:**

```markdown
## V. PERFIL DO FRANQUEADO IDEAL

### 5.1 Requisitos Obrigatorios
- Maior de 18 anos
- CPF regular
- Capacidade financeira comprovada
- Disponibilidade para treinamento inicial
- [Outros requisitos obrigatorios]

### 5.2 Requisitos Preferenciais
- Experiencia em gestao de negocio
- Formacao em [areas preferenciais]
- Residencia na regiao da franquia
- Perfil empreendedor
- [Outros requisitos preferenciais]

### 5.3 Perfil Comportamental
- Disciplina operacional
- Capacidade de seguir processos
- Orientacao a resultados
- [Outros tracos]

### 5.4 Restricoes
- [Impedimentos para ser franqueado]
- [Conflitos de interesse]
- [Clausulas de nao-concorrencia]
```

---

#### Item VI: Requisitos para Envolvimento Direto do Franqueado

**Base legal:** Art. 2o, VI — "requisitos quanto ao envolvimento direto do franqueado na operacao e na administracao do negocio"

```markdown
## VI. ENVOLVIMENTO DO FRANQUEADO NA OPERACAO

### 6.1 Dedicacao Exigida
[Tempo minimo de dedicacao: integral, parcial, horas/semana]
[Operacao pode ser delegada a gerente/operador?]

### 6.2 Atividades do Franqueado
[Lista de atividades que o franqueado deve executar pessoalmente]
[Atividades que podem ser delegadas]

### 6.3 Gestao e Administracao
[Responsabilidades administrativas do franqueado]
[Responsabilidades financeiras]
[Responsabilidades de RH (se aplicavel)]

### 6.4 Presenca Fisica
[Necessidade de presenca no local/rota]
[Frequencia de visitas as maquinas]
[Gestao remota permitida?]
```

---

#### Item VII: Especificacoes quanto ao Total de Investimento

**Base legal:** Art. 2o, VII — "especificacoes quanto ao total estimado do investimento inicial necessario a aquisicao, implantacao e entrada em operacao da franquia, bem como os valores e destinacoes do fundo de propaganda e/ou promoção, se for o caso"

```markdown
## VII. INVESTIMENTO INICIAL E TAXAS

### 7.1 Quadro Resumo de Investimento

| Item | Valor (R$) | Observacao |
|------|-----------|-----------|
| Taxa de franquia | | Pagamento unico |
| Equipamentos (maquinas) | | Qtd e especificacao |
| Estoque inicial | | Produtos para abastecimento |
| Capital de giro | | Para os primeiros X meses |
| Treinamento | | Incluso na taxa ou adicional |
| Marketing de inauguracao | | |
| Outros custos iniciais | | Detalhamento |
| **TOTAL ESTIMADO** | | |

### 7.2 Detalhamento de Taxas Recorrentes

| Taxa | Valor | Base de Calculo | Periodicidade |
|------|-------|----------------|---------------|
| Royalties | | % faturamento ou fixo | Mensal |
| Taxa de publicidade | | % faturamento ou fixo | Mensal |
| Taxa de tecnologia | | Fixo | Mensal |
| Outras taxas | | | |

### 7.3 Fundo de Propaganda
[Como funciona o fundo de propaganda]
[Percentual de contribuicao]
[Quem administra]
[Como os recursos sao aplicados]
[Prestacao de contas]

### 7.4 Condicoes de Pagamento
[Forma de pagamento da taxa de franquia]
[Financiamento disponivel?]
[Parcelamento?]

### 7.5 Estimativa de Custos Mensais de Operacao

| Item | Valor Mensal Estimado (R$) |
|------|---------------------------|
| Produtos (abastecimento) | |
| Manutencao de equipamentos | |
| Combustivel/logistica | |
| Seguro | |
| Contador | |
| Telefone/internet | |
| Outros | |
| **TOTAL** | |
```

**IMPORTANTE:** Os valores devem ser realistas e atualizados. Subestimar investimentos e uma das principais causas de conflito franqueador-franqueado e pode configurar informacao enganosa.

---

#### Item VIII: Informacoes Claras quanto a Taxas Periodicas

**Base legal:** Art. 2o, VIII — "informacoes claras quanto a taxas periodicas e outros valores a serem pagos pelo franqueado ao franqueador ou a terceiros por este indicados, detalhando as respectivas bases de calculo e o que as mesmas remuneram ou o fim a que se destinam"

```markdown
## VIII. TAXAS PERIODICAS

### 8.1 Royalties
- **Base de calculo:** [% sobre faturamento bruto / valor fixo]
- **Valor:** [R$ ou %]
- **Periodicidade:** [Mensal]
- **O que remunera:** [Uso da marca, suporte continuado, tecnologia, etc.]
- **Forma de pagamento:** [Boleto, transferencia, debito automatico]
- **Data de vencimento:** [Dia do mes]

### 8.2 Taxa de Publicidade/Marketing
- **Base de calculo:** [% sobre faturamento bruto / valor fixo]
- **Valor:** [R$ ou %]
- **Periodicidade:** [Mensal]
- **O que remunera:** [Marketing nacional, institucional, digital]
- **Prestacao de contas:** [Como o fundo e gerido e reportado]

### 8.3 Taxa de Tecnologia/Sistemas
- **Base de calculo:** [Valor fixo por maquina / por unidade]
- **Valor:** [R$]
- **Periodicidade:** [Mensal]
- **O que remunera:** [Sistema de gestao, telemetria, app]

### 8.4 Outras Taxas
[Detalhar qualquer outra taxa: treinamento adicional, certificacao, eventos]

### 8.5 Reajuste de Taxas
- **Indice de reajuste:** [IGPM, IPCA, outro]
- **Periodicidade do reajuste:** [Anual]
- **Data-base:** [Mes do reajuste]
```

---

#### Item IX: Relacao Completa de Franqueados e Ex-Franqueados

**Base legal:** Art. 2o, IX — "relacao completa de todos os franqueados, subfranqueados e subfranqueadores da rede, bem como dos que se desligaram nos ultimos 24 (vinte e quatro) meses, com nome, endereco e telefone"

```markdown
## IX. RELACAO DE FRANQUEADOS, SUBFRANQUEADOS E DESLIGADOS

### 9.1 Franqueados Ativos
| Nome/Razao Social | Endereco | Telefone | Inicio Operacao | Regiao |
|-------------------|----------|----------|-----------------|--------|
| | | | | |
[Lista completa de todos os 90 franqueados]

### 9.2 Franqueados Desligados nos Ultimos 24 Meses
| Nome/Razao Social | Endereco | Telefone | Data Desligamento | Motivo |
|-------------------|----------|----------|-------------------|--------|
| | | | | |

### 9.3 Subfranqueados (se aplicavel)
[Lista de subfranqueados, se o modelo incluir subfranqueamento]

### 9.4 Declaracao de Completude
"O Franqueador declara que a lista acima e completa e inclui todos
os franqueados ativos e desligados nos ultimos 24 meses."
```

**IMPORTANTE:** A lista DEVE ser completa. Omitir franqueados (especialmente desligados insatisfeitos) e uma das violacoes mais graves da lei. O candidato tem direito de contatar qualquer franqueado ou ex-franqueado.

---

#### Item X: Territorio e Exclusividade

**Base legal:** Art. 2o, X — "em relacao ao territorio, deve ser especificada a existencia ou nao de garantia de exclusividade ou preferencia e, caso positivo, em que condicoes"

```markdown
## X. TERRITORIO

### 10.1 Definicao de Territorio
[Como o territorio e definido: municipio, bairro, raio, CEP, micro-regiao]
[Criterios para delimitacao]

### 10.2 Exclusividade Territorial
- **Existe exclusividade?** [Sim/Nao]
- **Tipo de exclusividade:** [Exclusiva / Preferencia / Nenhuma]
- **Area de exclusividade:** [Descricao precisa]
- **Condicoes para manter exclusividade:** [Performance minima, etc.]
- **Perda de exclusividade:** [Em quais situacoes]

### 10.3 Preferencia Territorial
[Se nao ha exclusividade, ha preferencia?]
[Como funciona o direito de preferencia?]

### 10.4 Atuacao do Franqueador no Territorio
[O franqueador pode operar unidades proprias no territorio?]
[O franqueador pode conceder outras franquias no territorio?]
[Vendas online/delivery no territorio?]

### 10.5 Pontos Comerciais
[Como funciona a selecao de pontos para maquinas]
[Franqueado escolhe ou franqueador indica?]
[Exclusividade de ponto?]
[Processo de aprovacao de ponto]
```

---

#### Item XI: Obrigacoes do Franqueado

**Base legal:** Art. 2o, XI — "informacoes claras e detalhadas quanto a obrigacao do franqueado de adquirir quaisquer bens, servicos ou insumos necessarios a implantacao, operacao ou administracao de sua franquia, apenas de fornecedores indicados e aprovados pelo franqueador, oferecendo ao franqueado relacao completa desses fornecedores"

```markdown
## XI. OBRIGACOES DE AQUISICAO — FORNECEDORES

### 11.1 Fornecedores Exclusivos (obrigatorios)
| Categoria | Fornecedor | Produto/Servico | Contato |
|-----------|-----------|----------------|---------|
| Maquinas | | | |
| Produtos | | | |
| Sistemas | | | |

### 11.2 Fornecedores Homologados (lista aprovada)
| Categoria | Fornecedores Aprovados | Criterios de Homologacao |
|-----------|----------------------|------------------------|
| | | |

### 11.3 Compras Livres
[Categorias em que o franqueado pode escolher livremente]

### 11.4 Processo de Homologacao
[Como um fornecedor pode ser homologado]
[Criterios de qualidade]
[Prazo para analise]

### 11.5 Condicoes Comerciais
[O franqueador recebe rebate/bonificacao de fornecedores?]
[Se sim, como e o que remunera?]
[Precos praticados sao de mercado?]
```

---

#### Item XII: Indicacao do que e Oferecido ao Franqueado

**Base legal:** Art. 2o, XII — "indicacao do que e efetivamente oferecido ao franqueado pelo franqueador, no que se refere a: supervisao de rede, servicos de orientacao e outros prestados pelo franqueador ao franqueado"

```markdown
## XII. SUPORTE E SERVICOS DO FRANQUEADOR

### 12.1 Suporte Pre-Operacional
- Auxilio na selecao de pontos
- Projeto de instalacao de maquinas
- Treinamento inicial (carga horaria, local, conteudo)
- Acompanhamento de inauguracao

### 12.2 Suporte Operacional Continuado
- Consultoria de campo (frequencia de visitas)
- Suporte tecnico (horario, canais)
- Central de atendimento ao franqueado
- Manuais e materiais de apoio

### 12.3 Supervisao de Rede
- Auditorias periodicas
- Acompanhamento de KPIs
- Benchmarking da rede
- Programa de excelencia

### 12.4 Marketing e Publicidade
- Campanhas nacionais
- Material de marketing
- Gestao de redes sociais
- Assessoria de imprensa

### 12.5 Tecnologia e Sistemas
- Sistema de gestao
- Telemetria de maquinas
- Aplicativo/portal do franqueado
- Treinamento em sistemas

### 12.6 Treinamento Continuado
- Programas de reciclagem
- Novos produtos e tecnologias
- Convencoes e eventos
- E-learning/plataforma digital
```

---

#### Item XIII: Situacao perante o INPI

**Base legal:** Art. 2o, XIII — "situacao perante o Instituto Nacional de Propriedade Industrial — INPI das marcas ou patentes cujo uso estara sendo autorizado pelo franqueador"

```markdown
## XIII. SITUACAO PERANTE O INPI

### 13.1 Marcas Registradas

| Marca | No Processo | Classe NCL | Status | Data Concessao | Validade |
|-------|-------------|-----------|--------|----------------|----------|
| Avend Franquias | | | | | |
| [Logotipo] | | | | | |
| [Marca mista] | | | | | |

### 13.2 Patentes (se aplicavel)
| Patente | No Processo | Tipo | Status | Data Concessao | Validade |
|---------|-------------|------|--------|----------------|----------|
| | | | | | |

### 13.3 Direitos Autorais
[Software proprietario, manuais, conteudo protegido]

### 13.4 Observacoes
[Status de recursos, oposicoes, renovacoes pendentes]
[Estrategia de protecao da marca]
```

**ATENCAO:** Se a marca ainda nao foi concedida (apenas depositada ou em analise), isso DEVE ser declarado de forma clara. O candidato precisa saber o risco de operar com marca nao consolidada.

---

#### Item XIV: Situacao do Franqueado apos o Termino

**Base legal:** Art. 2o, XIV — "situacao do franqueado, apos a expiracao do contrato de franquia, em relacao a: know-how ou segredos de industria; e, implantacao de atividade concorrente da atividade do franqueador"

```markdown
## XIV. SITUACAO APOS TERMINO DO CONTRATO

### 14.1 Know-How e Segredos Empresariais
- Obrigacao de confidencialidade pos-contrato: [Sim/Nao]
- Prazo de confidencialidade: [X meses/anos apos termino]
- Devolucao de materiais: [Manuais, sistemas, senhas]
- Penalidade por violacao: [Multa, acoes judiciais]

### 14.2 Clausula de Nao-Concorrencia
- Existe clausula de nao-concorrencia? [Sim/Nao]
- Prazo: [X meses/anos apos termino]
- Abrangencia geografica: [Territorio da franquia / Municipio / Estado]
- Atividades restritas: [Operacao de vending machines / segmento]

### 14.3 Devolucao de Bens e Materiais
- Equipamentos: [Propriedade do franqueado ou devolvidos?]
- Material de identidade visual: [Retirada de plotagem, sinalizacao]
- Sistemas: [Cancelamento de acesso]
- Estoque: [Devolucao ou compra pelo franqueador?]

### 14.4 Desocupacao de Pontos
[Como funciona a transicao de pontos comerciais]
[Prazo para desinstalacao de maquinas]
```

---

#### Item XV: Modelo do Contrato-Padrao e Pre-Contrato

**Base legal:** Art. 2o, XV — "modelo do contrato-padrao e, se for o caso, tambem do pre-contrato padrao de franquia adotado pelo franqueador, com texto completo, inclusive dos respectivos anexos e prazo de validade"

```markdown
## XV. MODELO DE CONTRATO

### 15.1 Contrato de Franquia
[O modelo completo do contrato de franquia deve ser anexado a COF]
[Ver Anexo I — Modelo de Contrato de Franquia]

### 15.2 Pre-Contrato (se aplicavel)
[Modelo de pre-contrato/carta de intencoes, se utilizado]
[Ver Anexo II — Modelo de Pre-Contrato]

### 15.3 Prazo do Contrato
- Prazo inicial: [X anos]
- Renovacao: [Automatica / Mediante avaliacao]
- Condicoes de renovacao: [Performance, taxa de renovacao, etc.]

### 15.4 Principais Clausulas
[Resumo das clausulas mais relevantes — nao substitui a leitura do contrato completo]
```

---

#### Item XVI: Relacao de Franqueados que se Desligaram

**Base legal:** Art. 2o, XVI — "relacao dos franqueados que se desligaram nos ultimos 24 meses, inclusive os que tiveram seus contratos anulados, rescindidos ou nao renovados, ou que optaram por nao renova-los"

**Nota:** Este item complementa o Item IX. Aqui, o foco e nos motivos e circunstancias do desligamento.

```markdown
## XVI. FRANQUEADOS DESLIGADOS — DETALHAMENTO

### 16.1 Desligamentos nos Ultimos 24 Meses

| Franqueado | Cidade/UF | Data Desligamento | Tipo | Motivo Resumido |
|-----------|-----------|-------------------|------|-----------------|
| | | | Rescisao / Nao renovacao / Anulacao | |

### 16.2 Tipos de Desligamento
- **Rescisao pelo franqueador:** [Motivos mais comuns]
- **Rescisao pelo franqueado:** [Motivos mais comuns]
- **Nao renovacao:** [Motivos]
- **Anulacao:** [Se houve]
- **Acordo mutuo:** [Se houve]

### 16.3 Estatisticas de Retencao
- Taxa de renovacao: [%]
- Taxa de churn anual: [%]
- Tempo medio de permanencia: [anos]
```

---

#### Item XVII: Demonstracao de Resultado

**Base legal:** Art. 2o, XVII (incluido pela Lei 13.966/2019) — "demonstracao do resultado do exercicio ou balancos patrimoniais da empresa franqueadora relativos aos 2 (dois) ultimos exercicios"

**Nota:** Este item reforça o Item II. Na pratica, ja esta coberto. Manter a referencia para compliance.

```markdown
## XVII. DEMONSTRACOES FINANCEIRAS COMPLEMENTARES

[Referencia ao Item II — Balanco e Demonstracoes Financeiras]
[Se houver informacoes adicionais nao cobertas no Item II, incluir aqui]
```

---

#### Item XVIII: Indicacao de Existencia de Conselho/Associacao

**Base legal:** Art. 2o, XVIII — "indicacao da existencia ou nao de conselho ou associacao de franqueados, com as atribuicoes e composicao"

```markdown
## XVIII. CONSELHO OU ASSOCIACAO DE FRANQUEADOS

### 18.1 Existencia
- **Existe conselho de franqueados?** [Sim/Nao]
- **Existe associacao de franqueados?** [Sim/Nao]

### 18.2 Composicao e Atribuicoes (se existir)
- **Membros:** [Numero, forma de eleicao, mandato]
- **Atribuicoes:** [Consultivo / Deliberativo]
- **Frequencia de reunioes:** [Mensal / Trimestral]
- **Pauta tipica:** [Temas discutidos]

### 18.3 Canais de Representacao (se nao houver conselho formal)
[Como os franqueados se comunicam com o franqueador]
[Grupos de WhatsApp, encontros regionais, convencoes]
```

---

#### Item XIX: Informacoes sobre Sublocacao

**Base legal:** Art. 2o, XIX (novo na Lei 13.966/2019) — Possibilidade de sublocacao, caso o franqueador seja locatario do ponto

```markdown
## XIX. SUBLOCACAO DE PONTO COMERCIAL

### 19.1 Sublocacao
- **O franqueador subloca pontos comerciais?** [Sim/Nao/Nao aplicavel]
- **Condicoes de sublocacao:** [Valor, prazo, renovacao]
- **Contrato de sublocacao:** [Anexo ou referencia]

### 19.2 Observacoes sobre Pontos
[Para vending machines: como funciona a locacao/parceria com o ponto]
[Modelo de comodato vs. locacao vs. parceria comercial]
[Responsabilidade pelo ponto: franqueador ou franqueado?]
```

---

### Phase 3: Elementos Complementares da COF

**3.1 — Capa e Identificacao**

```markdown
============================================================
        CIRCULAR DE OFERTA DE FRANQUIA (COF)

              AVEND FRANQUIAS LTDA.
              CNPJ: [XX.XXX.XXX/0001-XX]

        Conforme Lei 13.966 de 26/12/2019
        (Lei de Franquias Empresariais)

        Data de emissao: [DATA]
        Validade: [DATA + 12 meses]
        Versao: [X.X]
============================================================

AVISO IMPORTANTE AO CANDIDATO A FRANQUEADO:

Esta Circular de Oferta de Franquia (COF) foi elaborada em
conformidade com a Lei 13.966/2019. Ela deve ser entregue
ao candidato a franqueado com antecedencia minima de 10
(dez) dias antes da assinatura de qualquer contrato ou
pre-contrato de franquia, ou do pagamento de qualquer taxa.

Recomendamos que o candidato:
1. Leia integralmente esta COF e seus anexos
2. Consulte um advogado antes de assinar o contrato
3. Contate franqueados e ex-franqueados listados nesta COF
4. Visite unidades franqueadas em operacao
5. Analise os demonstrativos financeiros com um contador
```

**3.2 — Termo de Recebimento**

```markdown
## TERMO DE RECEBIMENTO DA COF

Eu, [NOME COMPLETO], portador(a) do CPF [XXX.XXX.XXX-XX],
declaro ter recebido a presente Circular de Oferta de Franquia
da AVEND FRANQUIAS LTDA. nesta data, contendo [XX] paginas e
[XX] anexos.

Declaro estar ciente de que:
1. Devo ler integralmente esta COF antes de tomar qualquer decisao
2. Nenhum contrato pode ser assinado antes de 10 dias desta data
3. Nenhuma taxa pode ser cobrada antes de 10 dias desta data
4. Posso e devo contatar franqueados e ex-franqueados listados
5. Recomenda-se consultar advogado e contador antes de assinar

Local e data: _______________, ___/___/______

Assinatura do candidato: _______________________________
Nome completo: _______________________________
CPF: _______________________________

Assinatura do franqueador: _______________________________
Nome completo: _______________________________
Cargo: _______________________________
```

**3.3 — Glossario**

```markdown
## GLOSSARIO

| Termo | Definicao |
|-------|-----------|
| **COF** | Circular de Oferta de Franquia |
| **Franqueador** | Avend Franquias Ltda. |
| **Franqueado** | Pessoa fisica ou juridica que adquire a franquia |
| **Royalties** | Taxa periodica pelo uso da marca e suporte |
| **Taxa de Franquia** | Valor pago uma vez para ingressar na rede |
| **INPI** | Instituto Nacional de Propriedade Industrial |
| **ABF** | Associacao Brasileira de Franchising |
| **Lei de Franquias** | Lei 13.966/2019 |
| **Territorio** | Area geografica de atuacao do franqueado |
```

---

### Phase 4: Anexos Obrigatorios

**4.1 — Lista de Anexos**

| Anexo | Conteudo | Obrigatorio |
|-------|---------|-------------|
| Anexo I | Modelo de Contrato de Franquia | Sim |
| Anexo II | Modelo de Pre-Contrato (se usado) | Condicional |
| Anexo III | DRE e Balanco (2 exercicios) | Sim |
| Anexo IV | Lista completa de franqueados | Sim |
| Anexo V | Certificado de registro de marca (INPI) | Sim |
| Anexo VI | Contrato social consolidado | Recomendado |
| Anexo VII | Manual do franqueado (sumario) | Recomendado |
| Anexo VIII | Mapa de territorios | Recomendado |
| Anexo IX | Tabela de precos de equipamentos | Recomendado |

---

### Phase 5: Revisao e Compliance

**5.1 — Checklist de Compliance Legal**

Verificar cada item contra a Lei 13.966/2019:

| Art. 2o Item | Descricao | Presente | Pagina | Observacao |
|-------------|-----------|----------|--------|-----------|
| I | Historico, forma societaria, nome | [ ] | | |
| II | Balanco e demonstracoes (2 exercicios) | [ ] | | |
| III | Pendencias judiciais | [ ] | | |
| IV | Descricao detalhada da franquia | [ ] | | |
| V | Perfil do franqueado ideal | [ ] | | |
| VI | Envolvimento do franqueado | [ ] | | |
| VII | Investimento inicial e taxas | [ ] | | |
| VIII | Taxas periodicas detalhadas | [ ] | | |
| IX | Relacao de franqueados e desligados | [ ] | | |
| X | Territorio e exclusividade | [ ] | | |
| XI | Obrigacoes de aquisicao/fornecedores | [ ] | | |
| XII | Suporte e servicos oferecidos | [ ] | | |
| XIII | Situacao perante INPI | [ ] | | |
| XIV | Situacao apos termino (non-compete) | [ ] | | |
| XV | Modelo de contrato anexado | [ ] | | |
| XVI | Desligados nos ultimos 24 meses | [ ] | | |
| XVII | Demonstracoes financeiras | [ ] | | |
| XVIII | Conselho/associacao de franqueados | [ ] | | |
| XIX | Sublocacao de ponto | [ ] | | |

**5.2 — Revisao de Qualidade**

| Criterio | Verificacao |
|----------|-------------|
| Linguagem clara e acessivel | [ ] |
| Sem jargao juridico desnecessario | [ ] |
| Valores atualizados | [ ] |
| Dados financeiros corretos | [ ] |
| Lista de franqueados completa | [ ] |
| Contrato anexado | [ ] |
| Registro INPI documentado | [ ] |
| Informacao de territorio clara | [ ] |
| Sem promessas de ganho | [ ] |
| Sem omissoes materiais | [ ] |

**5.3 — Recomendacao de Revisao Juridica**

**IMPORTANTE:** Esta task gera um draft da COF. Antes de uso com candidatos reais, a COF DEVE ser revisada por advogado especializado em franchising. O @franchise-legal gera o conteudo com base nas melhores praticas e na lei, mas a responsabilidade legal final e do franqueador e seu assessor juridico.

---

### Phase 6: Procedimentos de Entrega

**6.1 — Protocolo de Entrega da COF**

```yaml
delivery_protocol:
  timing:
    minimum_advance: "10 dias uteis antes de qualquer assinatura ou pagamento"
    recommended_advance: "15-20 dias para permitir analise cuidadosa"
    max_validity: "12 meses a partir da emissao"

  documentation:
    - Entregar COF fisicamente ou digitalmente
    - Obter assinatura do Termo de Recebimento
    - Registrar data de entrega
    - Manter copia assinada do Termo
    - Protocolar entrega (preferencialmente com testemunhas ou AR)

  follow_up:
    - Aguardar periodo legal de 10 dias
    - Oferecer esclarecimento de duvidas
    - Nao pressionar decisao antes do prazo
    - Disponibilizar visita a unidades
    - Facilitar contato com franqueados da lista
```

**6.2 — Atualizacao da COF**

A COF deve ser atualizada:
- **Anualmente:** mesmo sem mudancas materiais
- **Imediatamente quando:** houver mudanca em taxas, territorio, modelo, socios, processos judiciais relevantes, ou qualquer informacao material
- **Versionamento:** cada versao deve ter numero, data e log de mudancas

---

## Validation

### Criterios de Qualidade da COF

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Completude legal | Todos os 19 itens do Art. 2o presentes | [ ] |
| Precisao financeira | Valores corretos e atualizados | [ ] |
| Transparencia | Sem omissoes ou distorcoes | [ ] |
| Clareza | Linguagem acessivel ao leigo | [ ] |
| Atualidade | Informacoes dos ultimos 12 meses | [ ] |
| Formatacao | Documento profissional e organizado | [ ] |
| Anexos | Todos os anexos obrigatorios presentes | [ ] |
| Termo de recebimento | Modelo incluido | [ ] |
| Versionamento | Numero de versao e data | [ ] |
| Recomendacao juridica | Aviso de revisao por advogado | [ ] |

### Checklist de Entrega

- [ ] `cof-avend-franquias.md` gerado com todos os 19 itens
- [ ] `cof-checklist-compliance.md` gerado
- [ ] Todos os itens do Art. 2o presentes e preenchidos
- [ ] Anexos obrigatorios referenciados
- [ ] Termo de recebimento incluido
- [ ] Glossario incluido
- [ ] Protocolo de entrega documentado
- [ ] Aviso de necessidade de revisao juridica incluido
- [ ] Dados financeiros dos 2 ultimos exercicios
- [ ] Lista completa de franqueados e desligados
- [ ] Elicitations realizadas para dados faltantes

---

## References

- **Lei 13.966/2019** — Lei de Franquias Empresariais do Brasil. Planalto.gov.br
- **Lei 8.955/1994** — Lei anterior de Franquias (revogada pela 13.966). Referencia historica.
- **ABF (Associacao Brasileira de Franchising).** Guia de Formatacao de Franquias. www.abf.com.br
- **Cherto, Marcelo.** "Franchising: Revolucao no Marketing." Editora McGraw-Hill.
- **Mauro, Paulo C.** "Guia do Franqueador." Editora Nobel.
- **Ribas, Filomena.** "Direito das Franquias." Editora Thomson Reuters.
- **Simao Filho, Adalberto.** "Franchising: Aspectos Juridicos e Contratuais." Editora Atlas.
- **IFA (International Franchise Association).** FDD Guidelines — referencia internacional.

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-002*
