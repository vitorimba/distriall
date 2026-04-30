# Playbook: Expansão para Novo Estado

> **Squad:** squad-franchising-avend (Avend Franquias)
> **Tipo:** Crescimento e Expansão
> **Agentes:** @franchise-growth, @franchise-legal, @franchise-master-br
> **Versão:** 1.0
> **Última atualização:** 2026-03-13

---

## 1. Objetivo

Guia completo para expandir a rede Avend Franquias para um novo estado brasileiro, cobrindo desde a avaliação de viabilidade até a inauguração da primeira unidade no estado, com roadmap de 6 meses.

---

## 2. Visão Geral do Processo

```
Fase 1: Avaliação de Mercado (Mês 1)
│
├── Fase 2: Análise Regulatória (Mês 1-2)
│
├── Fase 3: Setup Logístico (Mês 2-3)
│
├── Fase 4: Recrutamento de Franqueados (Mês 2-4)
│
├── Fase 5: Adaptação de COF e Contratos (Mês 3-4)
│
├── Fase 6: Implantação e Go-Live (Mês 5-6)
│
└── Fase 7: Monitoramento Pós-Lançamento (Mês 6+)
```

---

## 3. Fase 1 — Avaliação de Viabilidade de Mercado

### 3.1 Critérios de Avaliação por Estado

| Critério | Peso | Como Medir |
|----------|------|------------|
| PIB per capita | 20% | IBGE — mínimo R$ 25.000/ano |
| Densidade urbana | 15% | IBGE — cidades 100k+ habitantes |
| Penetração de vending | 15% | ABVA — máquinas per capita |
| Custo logístico estimado | 15% | Distância do CD, frete médio |
| Concorrência local | 10% | Mapeamento de players regionais |
| Ambiente regulatório | 10% | Complexidade (ver seção 4) |
| Potencial de pontos | 10% | Shoppings, empresas, hospitais, universidades |
| Presença de fornecedores | 5% | Insumos e manutenção local |

### 3.2 Scoring Model

```
Score Total = Σ (Nota_critério × Peso_critério)

Nota por critério: 1 a 5

Resultado:
├── Score >= 4.0 → GO — Prioridade alta
├── Score 3.0-3.9 → CONDICIONAL — Requer mitigações
├── Score 2.0-2.9 → HOLD — Reavaliar em 6 meses
└── Score < 2.0 → NO-GO — Não viável no momento
```

### 3.3 Análise de Mercado — Checklist

- [ ] Levantar dados demográficos do estado (IBGE)
- [ ] Mapear cidades-alvo (população, PIB, perfil de consumo)
- [ ] Identificar concorrentes diretos e indiretos
- [ ] Mapear pontos de alto tráfego (shoppings, corporativo, saúde, educação)
- [ ] Estimar TAM (Total Addressable Market) estadual
- [ ] Consultar ABVA sobre penetração de vending no estado
- [ ] Entrevistar 3-5 empresários locais (validação qualitativa)
- [ ] Documentar análise em `docs/expansion/[UF]-market-analysis.md`

### 3.4 Análise de Concorrência

| Dado | Fonte | O que Buscar |
|------|-------|-------------|
| Players de vending | ABVA, Google Maps | Quantos, onde, que tipo |
| Marcas de franquia | ABF, Portal do Franchising | Redes em vending/autoatendimento |
| Preços praticados | Pesquisa de campo | Posicionamento de preço |
| Tecnologia | Observação direta | Telemetria, pagamento digital |
| Cobertura geográfica | Mapeamento | Gaps de mercado |

### 3.5 Top 10 Estados — Ranking Estratégico Avend

| Prioridade | Estado | Justificativa |
|------------|--------|---------------|
| 1 | SP | Maior mercado, infraestrutura completa |
| 2 | MG | PIB forte, custo operacional menor |
| 3 | RJ | Mercado grande, atenção regulatória |
| 4 | PR | Alta renda per capita, organizado |
| 5 | SC | Indicadores sociais altos, mercado receptivo |
| 6 | RS | Mercado maduro, logística desafiadora |
| 7 | DF | Renda alta, mercado corporativo forte |
| 8 | GO | Crescimento acelerado, baixa competição |
| 9 | BA | Maior mercado NE, hubs urbanos fortes |
| 10 | PE | Hub NE, mercado em expansão |

---

## 4. Fase 2 — Análise Regulatória por Estado

### 4.1 ANVISA — Requisitos Nacionais (Base)

Todas as unidades devem atender:
- RDC 216/2004 — Boas Práticas para Serviços de Alimentação
- RDC 275/2002 — POP e Manual de Boas Práticas
- Registro/isenção de produtos conforme categoria
- Rotulagem conforme RDC 429/2020

### 4.2 Vigilância Sanitária — Variações Estaduais

| Estado | Órgão | Complexidade | Observações |
|--------|-------|-------------|-------------|
| SP | CVS/SP | 3/5 | Portaria CVS 5/2013, mais exigente que nacional |
| RJ | SUVISA/RJ | 3/5 | Atenção a requisitos municipais do Rio |
| MG | SES/MG | 2/5 | Alinhado com ANVISA, menos burocracia |
| PR | SESA/PR | 2/5 | Processo digital, razoavelmente ágil |
| SC | DIVE/SC | 2/5 | Fiscalização rigorosa mas previsível |
| RS | CEVS/RS | 3/5 | Exigências adicionais em equipamentos |
| BA | DIVISA/BA | 3/5 | Processo mais lento, atenção a prazos |
| PE | APEVISA/PE | 3/5 | Melhorando digitalização |
| CE | NUVIS/CE | 2/5 | Relativamente simples |
| DF | DIVISA/DF | 4/5 | Regulamentação própria, muito específica |
| GO | SES/GO | 2/5 | Processo simples, mercado menos regulado |

### 4.3 ICMS — Implicações Fiscais

**Regime tributário para vending machines:**

| Situação | Tratamento ICMS | Atenção |
|----------|----------------|---------|
| Venda direta ao consumidor | ICMS sobre venda | Alíquota varia por estado (17-20%) |
| Transferência entre unidades | ICMS-ST pode aplicar | Verificar protocolo ICMS do estado |
| Compra de insumos interestadual | DIFAL pode incidir | Calcular impacto no custo |
| Simples Nacional | Regime simplificado | Limite de faturamento R$ 4.8M/ano |

**Alíquotas ICMS internas (referência):**

| Estado | Alíquota interna | Observação |
|--------|-----------------|------------|
| SP | 18% | Pode ter redução para alimentos |
| RJ | 20% | FECP adicional |
| MG | 18% | |
| PR | 19% | |
| SC | 17% | |
| RS | 17% | |
| BA | 20.5% | FECOP adicional |
| PE | 20.5% | FECOP adicional |
| DF | 18% | |
| GO | 17% | |

### 4.4 Alvará e Licenças

**Documentação necessária por unidade:**

- [ ] CNPJ (filial ou do franqueado)
- [ ] Inscrição Estadual
- [ ] Inscrição Municipal
- [ ] Alvará de Funcionamento
- [ ] Licença Sanitária (Vigilância Sanitária)
- [ ] Auto de Vistoria do Corpo de Bombeiros (AVCB) — se ponto fixo
- [ ] Cadastro no CRN (se manipulação de alimentos)
- [ ] Licença ambiental (se aplicável)

**Variações por tipo de ponto:**

| Tipo de Ponto | Licenças Adicionais |
|---------------|-------------------|
| Shopping center | Regimento interno do shopping |
| Empresa privada | Contrato com empresa + CIPA |
| Hospital | ANVISA hospitalar + CCIH |
| Universidade pública | Licitação / chamamento público |
| Espaço público | Concessão municipal |

### 4.5 Checklist Regulatório para Novo Estado

- [ ] Identificar órgão de vigilância sanitária estadual
- [ ] Levantar legislação sanitária estadual específica
- [ ] Consultar contador local sobre regime tributário
- [ ] Mapear alíquotas ICMS aplicáveis
- [ ] Verificar necessidade de Inscrição Estadual
- [ ] Consultar requisitos de alvará nas cidades-alvo
- [ ] Identificar advogado/consultoria local
- [ ] Documentar em `docs/expansion/[UF]-regulatory.md`

---

## 5. Fase 3 — Setup Logístico

### 5.1 Cadeia de Fornecimento

**Categorias de fornecedores necessários:**

| Categoria | Criticidade | Local vs. Nacional |
|-----------|------------|-------------------|
| Produtos para vending (snacks, bebidas) | ALTA | Preferencialmente nacional + local |
| Peças de manutenção | ALTA | Nacional (estoque local) |
| Técnico de manutenção | ALTA | LOCAL obrigatório |
| Logística de reposição | ALTA | LOCAL |
| Embalagens personalizadas | MÉDIA | Nacional |
| Material de marketing | MÉDIA | Nacional + impressão local |
| Limpeza e higienização | BAIXA | LOCAL |

### 5.2 Modelo Logístico por Distância do CD Principal

```
Distância do CD:
│
├── < 300 km → Atendimento direto do CD existente
│   └── Custo frete: R$ 0.80-1.20/km (lotação)
│
├── 300-800 km → Hub regional intermediário
│   ├── Mini-estoque em operador logístico
│   └── Custo frete: R$ 1.20-2.00/km
│
├── 800-1500 km → CD regional necessário
│   ├── Parceria com operador logístico local
│   ├── Estoque mínimo: 15 dias
│   └── Custo frete: R$ 2.00-3.50/km
│
└── > 1500 km → Fornecedor local obrigatório
    ├── Homologar fornecedores regionais
    ├── Transferência de know-how
    └── Custo: avaliar caso a caso
```

### 5.3 Rede de Manutenção

**Requisitos mínimos para operar em novo estado:**

- [ ] 1 técnico credenciado por cluster de 20 máquinas
- [ ] Estoque de peças sobressalentes (15 dias)
- [ ] SLA de atendimento: 24h em capitais, 48h no interior
- [ ] Contrato com assistência técnica local (backup)
- [ ] Treinamento técnico remoto + presencial

**Decision tree para manutenção:**

```
Quantidade de máquinas no estado:
├── 1-10 → Terceiro credenciado
├── 11-30 → Técnico dedicado part-time + terceiro backup
├── 31-50 → Técnico dedicado full-time
└── 50+ → Equipe técnica local (2+ pessoas)
```

### 5.4 Checklist Setup Logístico

- [ ] Mapear fornecedores locais (mínimo 2 por categoria crítica)
- [ ] Homologar fornecedores (qualidade, prazo, preço)
- [ ] Definir modelo logístico (direto / hub / CD regional)
- [ ] Contratar ou credenciar técnico de manutenção
- [ ] Definir estoque mínimo de peças
- [ ] Estabelecer SLAs de atendimento
- [ ] Negociar fretes e condições de entrega
- [ ] Testar cadeia logística com operação piloto

---

## 6. Fase 4 — Recrutamento de Franqueados por Região

### 6.1 Perfil Ideal do Franqueado Avend

| Critério | Mínimo | Ideal |
|----------|--------|-------|
| Capital disponível | R$ 50.000 | R$ 80.000+ |
| Experiência empreendedora | Desejável | Comprovada |
| Residência | No estado-alvo | Na cidade-alvo |
| Disponibilidade | Meio período | Dedicação exclusiva |
| Perfil técnico | Básico | Intermediário |
| Score de crédito | > 600 | > 700 |

### 6.2 Estratégia de Recrutamento por Região

| Região | Canais Principais | Abordagem |
|--------|-------------------|-----------|
| Sudeste (SP, RJ, MG, ES) | LinkedIn, eventos ABF, mídia digital | Premium, destaque ROI |
| Sul (PR, SC, RS) | Feiras regionais, associações comerciais | Técnico, números detalhados |
| Centro-Oeste (DF, GO, MS, MT) | Redes sociais, portais de franquia | Oportunidade de mercado novo |
| Nordeste (BA, PE, CE, etc.) | Influencers locais, WhatsApp, eventos | Acessibilidade, suporte intensivo |
| Norte (AM, PA, etc.) | Digital, parcerias institucionais | Pioneirismo, exclusividade |

### 6.3 Funil de Recrutamento

```
Etapa 1: Atração
├── Portal de franquias (ABF, Guia Franquias)
├── Google Ads segmentado por estado
├── Redes sociais (Instagram, LinkedIn)
├── Feiras e eventos regionais
└── Indicação da rede existente

Etapa 2: Qualificação (Lead → MQL)
├── Formulário de interesse
├── Verificação de capital mínimo
├── Verificação de localização
└── Score automatizado

Etapa 3: Apresentação (MQL → SQL)
├── Webinar/apresentação online
├── Envio de material detalhado
├── Q&A com equipe comercial
└── Visita a unidade modelo (se possível)

Etapa 4: Avaliação (SQL → Aprovado)
├── Entrevista de perfil
├── Análise financeira detalhada
├── Consulta SPC/Serasa
├── Avaliação comportamental
└── Comitê de aprovação

Etapa 5: Fechamento (Aprovado → Franqueado)
├── Entrega da COF (10+ dias antes)
├── Período de reflexão legal
├── Assinatura do contrato
├── Pagamento da taxa de franquia
└── Onboarding
```

### 6.4 Metas de Recrutamento para Novo Estado

| Mês | Meta Leads | Meta MQL | Meta SQL | Meta Fechamento |
|-----|-----------|----------|----------|-----------------|
| 1 | 50 | 15 | 5 | 0 |
| 2 | 80 | 25 | 10 | 1-2 |
| 3 | 100 | 30 | 12 | 2-3 |
| 4 | 80 | 25 | 10 | 2-3 |
| 5 | 60 | 20 | 8 | 1-2 |
| 6 | 50 | 15 | 5 | 1-2 |

**Meta ano 1:** 8-15 unidades no novo estado

### 6.5 Checklist Recrutamento

- [ ] Definir cidades-alvo prioritárias (máx. 3 para início)
- [ ] Ativar campanha digital segmentada
- [ ] Cadastrar em portais de franquia regionais
- [ ] Preparar material de apresentação adaptado ao estado
- [ ] Treinar equipe comercial sobre mercado local
- [ ] Definir comitê de aprovação para o estado
- [ ] Estabelecer parceria com corretor/consultor local

---

## 7. Fase 5 — Adaptação de COF e Contratos

### 7.1 COF — Circular de Oferta de Franquia

**Itens que requerem adaptação por estado:**

| Item COF (Lei 13.966/2019) | Adaptação Necessária |
|----------------------------|---------------------|
| Território | Definição de área de exclusividade no estado |
| Investimento total | Ajustar custos regionais (aluguel, logística) |
| Taxa de franquia | Avaliar diferenciação regional |
| Royalties | Manter padrão (salvo exceção estratégica) |
| Fornecedores homologados | Incluir fornecedores locais |
| Obrigações do franqueado | Adaptar requisitos regulatórios locais |
| Demonstrações financeiras | Atualizar DRE e balanço da franqueadora |
| Lista de franqueados | Atualizar com rede vigente |
| Litígios | Atualizar se houver novos |

### 7.2 Contrato de Franquia — Ajustes

- [ ] Revisar cláusula de território (definição estadual)
- [ ] Verificar foro competente (pode mudar)
- [ ] Adaptar obrigações operacionais a regulação local
- [ ] Revisar cláusula de fornecedores (incluir locais)
- [ ] Ajustar cronograma de implantação
- [ ] Validar com advogado especializado no estado

### 7.3 Prazo Legal

```
Entrega COF → 10 dias corridos mínimo → Assinatura
                                         │
                                         └── Qualquer assinatura antes
                                             dos 10 dias = NULA
```

### 7.4 Checklist COF/Contrato

- [ ] Atualizar COF com dados do novo estado
- [ ] Revisar território e exclusividade
- [ ] Adaptar estimativa de investimento
- [ ] Incluir fornecedores locais homologados
- [ ] Validar juridicamente (advogado do estado)
- [ ] Preparar versão final para registro

---

## 8. Fase 6 — Implantação e Go-Live

### 8.1 Cronograma de Implantação (Primeira Unidade)

| Semana | Atividade | Responsável |
|--------|-----------|-------------|
| S1 | Contrato assinado, onboarding iniciado | @franchise-growth |
| S1-S2 | Treinamento do franqueado (remoto + presencial) | @franchise-operations |
| S2-S3 | Negociação e fechamento de pontos | Franqueado + suporte |
| S3-S4 | Entrega e instalação de equipamentos | Logística + técnico |
| S4 | Configuração de sistemas (telemetria, pagamento) | @franchise-operations |
| S4-S5 | Carga inicial de produtos | Franqueado + logística |
| S5 | Testes e ajustes | @franchise-field-ops |
| S5-S6 | Soft opening | Franqueado |
| S6 | Inauguração oficial | @franchise-growth + marketing |

### 8.2 Treinamento Adaptado por Estado

**Módulos de treinamento com adaptação regional:**

| Módulo | Horas | Adaptação Regional |
|--------|-------|-------------------|
| Operação de máquinas | 8h | Nenhuma |
| Gestão financeira | 4h | Regime tributário local |
| Reposição e logística | 4h | Fornecedores e rotas locais |
| Manutenção básica | 4h | Contatos técnicos locais |
| Marketing local | 2h | Cultura e mídia regional |
| Regulatório | 2h | VISA local, alvará, ICMS |
| Sistemas e telemetria | 2h | Nenhuma |
| **Total** | **26h** | |

### 8.3 Checklist Go-Live

- [ ] Franqueado treinado e certificado
- [ ] Equipamentos entregues e instalados
- [ ] Pontos contratados e liberados
- [ ] Alvará e licenças obtidos
- [ ] Sistemas configurados e testados
- [ ] Estoque inicial carregado
- [ ] Técnico local de suporte definido
- [ ] Campanha de inauguração preparada
- [ ] Contato de emergência 24h estabelecido

---

## 9. Fase 7 — Monitoramento Pós-Lançamento

### 9.1 Acompanhamento Intensivo (Primeiros 90 dias)

| Período | Frequência | Formato | Responsável |
|---------|-----------|---------|-------------|
| Semana 1-2 | Diário | WhatsApp/telefone | @franchise-field-ops |
| Semana 3-4 | 3x/semana | WhatsApp + videocall | @franchise-field-ops |
| Mês 2 | 2x/semana | Call + relatório | @franchise-field-ops |
| Mês 3 | Semanal | Call + visita (se viável) | @franchise-field-ops |

### 9.2 KPIs de Lançamento

| KPI | Meta Mês 1 | Meta Mês 3 | Meta Mês 6 |
|-----|-----------|-----------|-----------|
| Faturamento vs. projeção | > 60% | > 80% | > 100% |
| Máquinas ativas | 100% | 100% | 100% |
| Taxa de reposição no prazo | > 80% | > 90% | > 95% |
| NPS franqueado | > 50 | > 40 | > 40 |
| Break-even atingido | Não esperado | Possível | Esperado |

### 9.3 Decision Tree Pós-Lançamento

```
Resultado 90 dias:
│
├── SUCESSO (KPIs > 80% das metas)
│   ├── Documentar caso de sucesso
│   ├── Usar como referência para próximos franqueados
│   └── Iniciar recrutamento acelerado no estado
│
├── PARCIAL (KPIs 50-80% das metas)
│   ├── Identificar gargalos
│   ├── Plano de ajuste 30 dias
│   └── Reavaliar em 30 dias
│
└── INSUFICIENTE (KPIs < 50% das metas)
    ├── Diagnóstico profundo
    ├── Ativar playbook franqueado-em-crise
    └── Reavaliar viabilidade do estado
```

---

## 10. Roadmap Consolidado — 6 Meses

| Mês | Marcos Principais | Responsável |
|-----|-------------------|-------------|
| 1 | Estudo de mercado completo + Análise regulatória iniciada | @franchise-growth |
| 2 | Regulatório concluído + Setup logístico iniciado + Recrutamento ativo | @franchise-legal + @franchise-growth |
| 3 | Fornecedores homologados + COF adaptada + Primeiros candidatos qualificados | @franchise-growth + @franchise-legal |
| 4 | Primeiro franqueado aprovado + Contrato assinado | @franchise-growth |
| 5 | Implantação da primeira unidade | @franchise-operations |
| 6 | Go-live + Monitoramento intensivo | @franchise-field-ops |

---

## 11. Orçamento Estimado de Expansão por Estado

| Item | Estimativa |
|------|-----------|
| Estudo de mercado | R$ 5.000-15.000 |
| Consultoria regulatória | R$ 3.000-8.000 |
| Adaptação de COF/contrato | R$ 5.000-10.000 |
| Marketing de recrutamento | R$ 10.000-30.000 |
| Viagens e visitas | R$ 5.000-15.000 |
| Homologação de fornecedores | R$ 2.000-5.000 |
| Treinamento (primeira turma) | R$ 3.000-8.000 |
| Contingência (15%) | R$ 5.000-14.000 |
| **Total estimado** | **R$ 38.000-105.000** |

---

## 12. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|-------------|---------|-----------|
| Regulação mais restritiva que o esperado | Média | Alto | Análise regulatória profunda na Fase 2 |
| Falta de fornecedores locais | Baixa | Alto | Mapear antes de comprometer expansão |
| Recrutamento lento | Média | Médio | Diversificar canais, ajustar perfil |
| Primeiro franqueado falhar | Baixa | Alto | Seleção rigorosa, suporte intensivo |
| Custos acima do orçamento | Média | Médio | Contingência de 15% + revisão mensal |
| Concorrente local forte | Baixa | Médio | Diferenciação por tecnologia e marca |

---

## 13. Referências

- Lei 13.966/2019 (Lei de Franquias)
- ABF — Desempenho do Franchising Brasileiro (último relatório)
- ABVA — Associação Brasileira de Vendas Automáticas
- IBGE — Dados demográficos e econômicos por estado
- CONFAZ — Convênios ICMS vigentes

---

*Playbook mantido por @franchise-growth, @franchise-legal, @franchise-master-br*
*Revisão obrigatória: a cada nova expansão estadual*
