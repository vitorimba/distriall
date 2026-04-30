---
suite: squad-franchising-avend
version: 1.0.0
total_tests: 50
agents_covered: 10
tests_per_agent: 5
---

# Smoke Test Suite — Squad Franchising Avend

## Overview

50 smoke tests covering all 10 mind-based agents. Each test validates that the agent responds with correct domain knowledge, appropriate voice, and framework adherence.

---

## 1. @franchise-strategist (Mark Siebert)

### ST-1.1: Franchisability Assessment Request
- **Input:** "Tenho uma rede de acai com 3 lojas proprias, faturamento medio R$80k/mes por unidade, margem de 25%. Devo franquear?"
- **Expected Behavior:** Agent applies the 12 Criteria for Franchisability. Asks probing questions about replicability, documentation status, and competitive landscape. Does NOT give a yes/no answer without data.
- **Pass Criteria:** (1) References at least 4 of the 12 Criteria explicitly, (2) requests missing data before rendering verdict, (3) uses analytical tone consistent with Siebert voice.

### ST-1.2: Low Franchise Fee Challenge
- **Input:** "Estou pensando em cobrar R$15.000 de taxa de franquia para ser competitivo."
- **Expected Behavior:** Challenges the low fee. Explains that franchise fees must cover development costs and support infrastructure. References financial model implications.
- **Pass Criteria:** (1) Flags the fee as potentially too low, (2) explains fee-support relationship, (3) suggests financial modeling approach.

### ST-1.3: Franchise Without Manual
- **Input:** "Quero comecar a vender franquias mes que vem, mas ainda nao tenho manual de operacoes."
- **Expected Behavior:** Blocks the launch. States operations manual is a prerequisite, not a post-launch deliverable. References franchise readiness requirements.
- **Pass Criteria:** (1) Explicitly blocks franchise sales without manual, (2) explains why manual is prerequisite, (3) suggests proper sequencing.

### ST-1.4: Territory Strategy
- **Input:** "Como devo definir os territorios para minha franquia de pet shop?"
- **Expected Behavior:** Mandates market analysis with demographic overlays. Discusses population density, competition mapping, and territory size methodology.
- **Pass Criteria:** (1) Recommends data-driven territory definition, (2) mentions demographic analysis, (3) warns against arbitrary territory drawing.

### ST-1.5: Competitor Saturation
- **Input:** "Ja existem 5 redes de franquia no meu segmento. Ainda vale a pena franquear?"
- **Expected Behavior:** Assesses differentiation depth. Asks what makes the business unique. References competitive moat analysis.
- **Pass Criteria:** (1) Doesn't dismiss or blindly encourage, (2) focuses on differentiation assessment, (3) may suggest niche pivot if differentiation is weak.

---

## 2. @systems-architect (Michael Gerber)

### ST-2.1: Founder Dependency
- **Input:** "Meus clientes so vem por causa de mim. Como franquear?"
- **Expected Behavior:** Diagnoses as Technician trap. Prescribes Franchise Prototype exercise. Emphasizes building systems that remove founder dependency.
- **Pass Criteria:** (1) Uses E-Myth language (Technician, Entrepreneur, Manager), (2) recommends Franchise Prototype, (3) addresses "work ON not IN" principle.

### ST-2.2: Inconsistent Quality
- **Input:** "A qualidade das minhas lojas varia muito entre turnos e unidades."
- **Expected Behavior:** Identifies as orchestration failure. Prescribes documentation, checklists, and quality control systems.
- **Pass Criteria:** (1) References Innovation-Quantification-Orchestration cycle, (2) recommends systems-based solution over people-based, (3) uses Gerber's systems philosophy.

### ST-2.3: Scaling Question
- **Input:** "Quero abrir 20 unidades nos proximos 2 anos. Por onde comeco?"
- **Expected Behavior:** Starts with Franchise Prototype — can the business run without the owner? Tests replicability by someone of average skill.
- **Pass Criteria:** (1) Doesn't jump to expansion tactics, (2) starts with systemization assessment, (3) references Franchise Prototype criteria.

### ST-2.4: Hiring as Solution
- **Input:** "Preciso contratar pessoas melhores para resolver meus problemas operacionais."
- **Expected Behavior:** Challenges the premise. Quotes "build extraordinary systems for ordinary people." Redirects to systems improvement.
- **Pass Criteria:** (1) Challenges people-as-solution assumption, (2) recommends systems improvement, (3) uses Gerber's signature framing.

### ST-2.5: Business Development Process
- **Input:** "Meu negocio funciona bem, mas nao sei como transformar em franquia."
- **Expected Behavior:** Walks through the Business Development Process. Starts with Primary Aim and Strategic Objective.
- **Pass Criteria:** (1) References BDP steps, (2) starts with strategic questions before tactical, (3) frames business as a product being built.

---

## 3. @franchise-legal-br (Marcelo Cherto)

### ST-3.1: COF Requirements
- **Input:** "O que precisa ter na COF da minha franquia?"
- **Expected Behavior:** Lists the 23 mandatory items of the COF under Lei 13.966/2019. Emphasizes 10-day delivery requirement.
- **Pass Criteria:** (1) References Lei 13.966, (2) mentions key COF items, (3) explains delivery timeline requirement.

### ST-3.2: Foreign Brand Entry
- **Input:** "Uma marca americana quer franquear no Brasil. O que precisa fazer?"
- **Expected Behavior:** Requires full localization: FDD-to-COF conversion, INPI registration, local financial modeling, cultural adaptation.
- **Pass Criteria:** (1) Mentions COF adaptation, (2) requires INPI trademark, (3) addresses cultural/market localization.

### ST-3.3: Skipping COF Detail
- **Input:** "A COF pode ser simples, so com informacoes basicas?"
- **Expected Behavior:** Blocks. Explains inadequate COF is grounds for contract annulment. Educates on legal consequences.
- **Pass Criteria:** (1) Explicitly refuses simplification, (2) cites legal consequences, (3) references specific Lei 13.966 provisions.

### ST-3.4: Territory in Brazil
- **Input:** "Como funciona territorio exclusivo em franquias no Brasil?"
- **Expected Behavior:** Discusses territorial rights under Brazilian law, regional economic disparities, and COF disclosure requirements for territory.
- **Pass Criteria:** (1) Addresses Brazilian territorial complexity, (2) references legal framework, (3) considers regional disparities.

### ST-3.5: Franchise Renewal
- **Input:** "O contrato de franquia esta vencendo. Quais sao as regras?"
- **Expected Behavior:** Applies Lei 13.966 provisions on renewal rights, notice periods, and post-termination restrictions.
- **Pass Criteria:** (1) References Lei 13.966 renewal provisions, (2) discusses notice periods, (3) addresses non-compete post-termination.

---

## 4. @franchise-operations (Michael Seid)

### ST-4.1: Support Infrastructure Design
- **Input:** "Como montar a estrutura de suporte para minha rede de franquias?"
- **Expected Behavior:** Applies MSA Development Model. Structures support across phases. Warns against growing faster than support capacity.
- **Pass Criteria:** (1) References MSA model phases, (2) addresses support infrastructure components, (3) warns about growth-support balance.

### ST-4.2: Multi-Unit Operator
- **Input:** "Um franqueado quer abrir 5 unidades. Como gerenciar isso?"
- **Expected Behavior:** Treats multi-unit as fundamentally different model. Recommends distinct agreements, adjusted royalties, dedicated support.
- **Pass Criteria:** (1) Distinguishes multi-unit from single-unit, (2) recommends specific structures, (3) addresses operational complexity.

### ST-4.3: Compliance Drop
- **Input:** "A auditoria mostrou que so 70% das unidades estao em compliance."
- **Expected Behavior:** Escalates to remediation. Diagnoses root cause: training, system design, or franchisee attitude.
- **Pass Criteria:** (1) Treats 70% as below threshold (85%), (2) differentiates root causes, (3) prescribes targeted interventions.

### ST-4.4: Operations Manual Structure
- **Input:** "Como estruturar o manual de operacoes da franquia?"
- **Expected Behavior:** Recommends modular format with independently updatable sections. Lists core modules.
- **Pass Criteria:** (1) Recommends modular structure, (2) lists key modules, (3) emphasizes updatability.

### ST-4.5: Growth Exceeding Capacity
- **Input:** "Estamos vendendo franquias mais rapido do que conseguimos suportar."
- **Expected Behavior:** Recommends pausing new sales. States this is the #1 cause of franchise system failure.
- **Pass Criteria:** (1) Advises pausing sales, (2) frames as critical risk, (3) prioritizes infrastructure catch-up.

---

## 5. @field-operations-br (Adir Ribeiro)

### ST-5.1: Field Consulting Setup
- **Input:** "Preciso montar um programa de consultoria de campo para 40 unidades."
- **Expected Behavior:** Applies 4 Pillars. Recommends structured program with standardized visit scripts and digital reporting.
- **Pass Criteria:** (1) References 4 Pillars, (2) recommends structured visit methodology, (3) addresses scale for 40 units.

### ST-5.2: Declining Franchisee Performance
- **Input:** "Uma unidade que ia bem comecou a cair nos ultimos 3 meses."
- **Expected Behavior:** Diagnoses through 4 Pillars sequentially. Notes most issues are multi-pillar.
- **Pass Criteria:** (1) Uses 4-pillar diagnostic, (2) investigates multiple dimensions, (3) recommends field visit.

### ST-5.3: New Unit Opening Support
- **Input:** "Vamos inaugurar 3 unidades no proximo mes. Qual o suporte ideal?"
- **Expected Behavior:** Deploys intensive support protocol: daily contact week 1, tapering to standard cadence.
- **Pass Criteria:** (1) Describes intensive opening support, (2) specifies tapering schedule, (3) addresses 3-unit simultaneous challenge.

### ST-5.4: Regional Compliance Variation
- **Input:** "As unidades do Nordeste tem compliance muito menor que as do Sudeste."
- **Expected Behavior:** Analyzes field consultant effectiveness by region. Identifies inconsistent support as likely cause.
- **Pass Criteria:** (1) Points to field consultant performance as variable, (2) doesn't blame franchisees first, (3) recommends regional analysis.

### ST-5.5: Low Franchisee Engagement
- **Input:** "Os franqueados nao participam das reunioes e ignoram comunicados."
- **Expected Behavior:** Investigates communication direction. Recommends bi-directional channels and advisory councils.
- **Pass Criteria:** (1) Diagnoses top-down communication issue, (2) recommends bi-directional channels, (3) suggests advisory councils.

---

## 6. @franchise-sales (Joe Mathews)

### ST-6.1: Early-Stage Sales Strategy
- **Input:** "Tenho 8 unidades e quero acelerar as vendas de franquia."
- **Expected Behavior:** Recommends founder-led sales at this stage. Too early for brokers or automated funnels.
- **Pass Criteria:** (1) Identifies as early lifecycle stage, (2) recommends founder-led sales, (3) defers broker strategy.

### ST-6.2: Sales Stall Diagnosis
- **Input:** "Estamos travados em 35 unidades ha 2 anos. Nao conseguimos vender mais."
- **Expected Behavior:** Diagnoses Sales Tipping Point barriers. Checks validation, economics, and support infrastructure.
- **Pass Criteria:** (1) References Sales Tipping Point, (2) investigates specific barriers, (3) doesn't assume marketing is the problem.

### ST-6.3: Discovery Day Conversion
- **Input:** "So 30% dos candidatos que vem ao Discovery Day fecham contrato."
- **Expected Behavior:** Audits the Discovery Day experience. Identifies misalignment between sales process expectations and DD reality.
- **Pass Criteria:** (1) Identifies 30% as below benchmark, (2) audits the experience design, (3) checks expectation alignment.

### ST-6.4: Broker Network Decision
- **Input:** "Devo usar corretores de franquias para vender?"
- **Expected Behavior:** Evaluates cost-benefit. Brokers justified only when internal capacity maxed and brand validation strong.
- **Pass Criteria:** (1) Provides cost analysis (commission range), (2) sets prerequisites for broker use, (3) considers alternatives.

### ST-6.5: Franchise Sales Process Design
- **Input:** "Nao temos um processo de vendas estruturado para franquias."
- **Expected Behavior:** Builds structured pipeline from Lead Capture through Award with clear stages and timelines.
- **Pass Criteria:** (1) Defines pipeline stages, (2) sets timeline expectations, (3) includes qualification criteria.

---

## 7. @franchise-lifecycle-br (Ana Vecchi)

### ST-7.1: Lifecycle Diagnosis
- **Input:** "Minha rede tem 8 anos e 80 unidades. As vendas same-store estao caindo."
- **Expected Behavior:** Maps to maturity/potential decline stage. Checks same-store sales trend duration. Alerts to lifecycle risk.
- **Pass Criteria:** (1) Identifies lifecycle stage, (2) uses same-store sales as diagnostic, (3) recommends reinvention assessment.

### ST-7.2: Network Reinvention
- **Input:** "Precisamos reinventar a rede mas nao sabemos por onde comecar."
- **Expected Behavior:** Applies Reinvention Roadmap: Diagnostic → Vision → Design → Pilot → Rollout → Stabilization.
- **Pass Criteria:** (1) Provides structured reinvention approach, (2) includes franchisee involvement, (3) emphasizes piloting before rollout.

### ST-7.3: High Franchisee Churn
- **Input:** "Estamos perdendo 15% dos franqueados por ano."
- **Expected Behavior:** Diagnoses as lifecycle stage mismatch. 15% exceeds 10% threshold. Investigates root causes.
- **Pass Criteria:** (1) Flags 15% as above threshold, (2) investigates structural causes, (3) connects to lifecycle stage.

### ST-7.4: Multi-Format Expansion
- **Input:** "Queremos lancar formato quiosque alem das lojas tradicionais."
- **Expected Behavior:** Assesses cannibalization risk and channel conflict. Requires territory and economics analysis.
- **Pass Criteria:** (1) Addresses cannibalization, (2) requires economic modeling per format, (3) considers territory impact.

### ST-7.5: Growth Deceleration
- **Input:** "Nosso ritmo de abertura de novas unidades caiu pela metade este ano."
- **Expected Behavior:** Differentiates natural maturation from premature stagnation. Checks market, competition, and internal factors.
- **Pass Criteria:** (1) Distinguishes healthy vs. unhealthy deceleration, (2) checks multiple factors, (3) maps to lifecycle stage.

---

## 8. @franchise-relationships (Greg Nathan)

### ST-8.1: Franchisee Questioning Fees
- **Input:** "Meus franqueados estao reclamando que os royalties sao altos demais."
- **Expected Behavior:** Identifies as "Fee" stage behavior. Recommends proactive ROI demonstration and transparent reporting.
- **Pass Criteria:** (1) References "Fee" stage, (2) recommends value demonstration, (3) doesn't dismiss franchisee concerns.

### ST-8.2: Franchisee Wanting Independence
- **Input:** "Um franqueado de 3 anos quer fazer marketing proprio e mudar o cardapio."
- **Expected Behavior:** Identifies as "Me" stage. Channels energy into constructive autonomy — local marketing within guidelines, advisory council.
- **Pass Criteria:** (1) References "Me" stage, (2) suggests constructive channels, (3) balances autonomy with standards.

### ST-8.3: Network Satisfaction Assessment
- **Input:** "Como medir a satisfacao dos meus franqueados?"
- **Expected Behavior:** Deploys ACE Survey (Alignment, Communication, Engagement). Distinguishes from simple satisfaction surveys.
- **Pass Criteria:** (1) Recommends ACE framework, (2) explains three dimensions, (3) differentiates from basic satisfaction.

### ST-8.4: Franchise Conflict
- **Input:** "Tenho um conflito serio com um franqueado que ameaca processo judicial."
- **Expected Behavior:** Recommends graduated dispute resolution. Most conflicts should resolve before legal stage.
- **Pass Criteria:** (1) Proposes graduated intervention, (2) prioritizes mediation, (3) addresses underlying relationship issue.

### ST-8.5: Advisory Council Issues
- **Input:** "O conselho de franqueados nao funciona. As reunioes sao improdutivas."
- **Expected Behavior:** Diagnoses structural vs. relational dysfunction. Restructures mandate, membership, or trust-building.
- **Pass Criteria:** (1) Distinguishes structural from relational issues, (2) proposes specific fixes, (3) references council best practices.

---

## 9. @franchise-legal (Andrew Sherman)

### ST-9.1: Franchise vs. License
- **Input:** "Nao sei se devo franquear ou licenciar meu modelo de negocio."
- **Expected Behavior:** Applies decision framework. Explains legal implications of each — franchising triggers FTC regulation.
- **Pass Criteria:** (1) Explains key legal differences, (2) identifies regulatory implications, (3) helps determine correct model.

### ST-9.2: Earnings Claims
- **Input:** "Posso dizer aos candidatos quanto meus franqueados faturam?"
- **Expected Behavior:** Mandates Item 19 compliance. Any financial representation outside FDD creates legal liability.
- **Pass Criteria:** (1) References Item 19, (2) warns about verbal/informal claims, (3) explains legal exposure.

### ST-9.3: IP Protection
- **Input:** "Como proteger minha marca e know-how ao franquear?"
- **Expected Behavior:** Recommends layered IP strategy: trademarks, trade dress, trade secrets, copyrights.
- **Pass Criteria:** (1) Covers multiple IP types, (2) recommends federal trademark registration, (3) addresses trade secret protection.

### ST-9.4: International Expansion
- **Input:** "Quero expandir minha franquia para Portugal e EUA."
- **Expected Behavior:** Assesses jurisdiction-specific requirements for each country. Recommends local counsel and IP registration in-country.
- **Pass Criteria:** (1) Addresses different legal requirements per country, (2) recommends local counsel, (3) discusses structure options.

### ST-9.5: Data Ownership in Franchise
- **Input:** "Os dados dos clientes sao do franqueador ou do franqueado?"
- **Expected Behavior:** Addresses data ownership in franchise agreement. References LGPD/GDPR. Treats data as contested franchise asset.
- **Pass Criteria:** (1) Identifies data as contested asset, (2) recommends contractual clarity, (3) references privacy laws.

---

## 10. @franchise-manuals (Penny Hopkinson)

### ST-10.1: Manual from Scratch
- **Input:** "Preciso criar o manual de operacoes da minha franquia do zero."
- **Expected Behavior:** Applies Manual Magic 3-Step: Capture → Structure → Validate. Starts with knowledge capture from operations.
- **Pass Criteria:** (1) References 3-Step process, (2) starts with Capture phase, (3) emphasizes validation with real users.

### ST-10.2: Manual Not Being Used
- **Input:** "Meus franqueados nao usam o manual de operacoes."
- **Expected Behavior:** Diagnoses usability issues. Recommends visual redesign, digital format, searchability, and role-specific views.
- **Pass Criteria:** (1) Doesn't blame franchisees, (2) focuses on manual usability, (3) recommends practical improvements.

### ST-10.3: Paper to Digital Conversion
- **Input:** "Quero digitalizar nosso manual que hoje e em PDF."
- **Expected Behavior:** Warns against simple PDF approach. Recommends redesign for digital: searchable, hyperlinked, video, mobile-friendly.
- **Pass Criteria:** (1) Advises against PDF-only approach, (2) recommends digital-native features, (3) addresses mobile access.

### ST-10.4: Manual Update Process
- **Input:** "Nosso manual nao e atualizado ha 2 anos."
- **Expected Behavior:** Implements quarterly review cycle with version control. Every section gets "last reviewed" date.
- **Pass Criteria:** (1) Recommends regular review cycle, (2) introduces version control, (3) establishes update process.

### ST-10.5: Large Manual Problem
- **Input:** "Nosso manual tem 500 paginas e ninguem consegue encontrar nada."
- **Expected Behavior:** Restructures into modular components. Creates role-specific views. Adds navigation and search.
- **Pass Criteria:** (1) Recommends modular restructuring, (2) suggests role-based filtering, (3) addresses findability.
