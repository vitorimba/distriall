# Test Case: Business Diagnostic

- **ID:** FC-TC-004
- **Agent Under Test:** business-diagnostician (Pulse)
- **Category:** behavioral
- **Priority:** P1

## Objective

Validar que o business-diagnostician aplica o Business Health Score (Two-Brain/Chris Cooper) nas 5 dimensões, utiliza o Value Equation de Alex Hormozi para avaliar a oferta do coach, identifica revenue leaks com dados específicos e gera um growth roadmap priorizado com métricas de sucesso definidas.

## Preconditions

- Coach identificado no contexto com dados mínimos de negócio (número de alunos, faturamento estimado)
- Pulse ativo como agente corrente
- Nenhum business_health_report preexistente para este coach (ou diagnóstico desatualizado)

---

## Test Scenarios

### Scenario 1: Diagnóstico completo de coaching business online

**Input:**
> Pulse, faz um diagnóstico do meu negócio. Tenho 35 alunos online, cobro R$350/mês por assessoria completa, churn de uns 12% ao mês, trabalho sozinho, não tenho loja nem produto digital. Faturamento em torno de R$12.250/mês.

**Expected Behavior:**
- [ ] Pulse calcula o Business Health Score (0-100) nas 5 dimensões: Receita, Retenção, Aquisição, Operações e Produto/Oferta
- [ ] ARM calculado e avaliado: R$350/mês = score moderado (3-5 pts na dimensão receita segundo tabela interna)
- [ ] Churn de 12% identificado como ponto crítico (abaixo da faixa ideal < 5% para score máximo)
- [ ] Revenue leaks identificados com valores estimados: ausência de e-commerce, produto digital, upsell/cross-sell
- [ ] Output inclui tabela de Business Health Score com score por dimensão e score total

**Pass Criteria:**
- Business Health Score calculado e apresentado com breakdown por dimensão
- Pelo menos 3 revenue leaks identificados com estimativa de impacto em R$
- Churn apontado como gap prioritário com referência ao benchmark Two-Brain (< 5%)
- growth_recommendations lista ações priorizadas por impacto/esforço

---

### Scenario 2: Value Equation assessment da oferta

**Input:**
> Pulse, avalia minha oferta. Cobro R$350/mês por treino + dieta + check-in semanal. Meus concorrentes cobram R$200-250 pelo mesmo pacote.

**Expected Behavior:**
- [ ] Pulse aplica o Value Equation de Hormozi: Valor = (Dream Outcome x Likelihood of Success) / (Time Delay x Effort & Sacrifice)
- [ ] Avaliação de cada variável da equação com base nos dados fornecidos
- [ ] Análise de posicionamento: R$350 vs. mercado em R$200-250 — Pulse avalia se o premium é justificável ou se há gap de percepção de valor
- [ ] Output inclui recomendações específicas para aumentar percepção de valor sem necessariamente reduzir preço

**Pass Criteria:**
- Value Equation aplicada com avaliação explícita de cada variável (Dream Outcome, Likelihood, Time Delay, Effort)
- Recomendação de pelo menos 2 formas concretas de aumentar Dream Outcome ou Likelihood of Success na oferta
- Tom analítico e consultivo sem julgamento sobre o preço praticado

---

### Scenario 3: Identificação de gargalo operacional e plano de ação

**Input:**
> Pulse, meu problema é tempo. Passo 6h por dia respondendo WhatsApp, ajustando planilhas manualmente e mandando check-in. Tenho 28 alunos. Não consigo crescer.

**Expected Behavior:**
- [ ] Pulse identifica o gargalo operacional como prioridade máxima antes de qualquer recomendação de scaling
- [ ] Estimativa de horas recuperáveis com automação: benchmarks de automation-engineer (3-5h/dia)
- [ ] Dimensão Operações do Business Health Score recebe score baixo com explicação detalhada
- [ ] Roadmap proposto segue sequência correta: diagnosticar → automatizar → escalar (nunca inverso)
- [ ] Handoff para automation-engineer recomendado como primeiro passo com escopo específico

**Pass Criteria:**
- Gargalo operacional identificado como prioridade 1 antes de qualquer recomendação de crescimento
- Estimativa de horas recuperáveis com automação incluída no diagnóstico
- Roadmap em 3 fases: operações → produto → scaling
- Handoff para automation-engineer citado com escopo (check-in automático, envio de protocolos)

---

## Veto Test (must REJECT)

**Input:**
> Pulse, quero dobrar o número de alunos de 30 para 60 este mês. Me diz como fazer isso com marketing e anúncios.

**Expected:**
- [ ] Pulse REJECTS recomendação de scaling agressivo sem validação operacional
- [ ] Cita princípio operacional Two-Brain/Cooper: crescer com processos quebrados aumenta o caos, não o faturamento
- [ ] Pulse exige diagnóstico completo primeiro antes de qualquer recomendação de aquisição
- [ ] Output explica por que dobrar alunos sem infraestrutura vai resultar em churn acelerado
- [ ] Alternativa proposta: primeiro diagnóstico de capacidade operacional → automação → então considerar scaling

---

## Source References

[SOURCE: Chris Cooper / Two-Brain Business — Business Health Metrics: ARM, churn, LEG, NPS benchmarks para coaching fitness]
[SOURCE: Alex Hormozi — $100M Offers: Value Equation (Dream Outcome x Likelihood) / (Time Delay x Effort)]
[SOURCE: Alex Hormozi — $100M Leads: Scaling sequence — estabilidade operacional antes de aquisição]
[SOURCE: business-diagnostician Veto Conditions — recomendação de scaling antes de estabilidade operacional bloqueada]
