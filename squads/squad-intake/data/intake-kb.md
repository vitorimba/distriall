# Intake Knowledge Base

## Frameworks Integrados

### The Mom Test (Rob Fitzpatrick)
- **3 Regras:** Fale sobre a vida deles, pergunte sobre o passado, ouça mais
- **3 Bad Data Types:** Elogios, fluff hipotético, wishlists
- **Aplicação:** Reunião inicial, follow-up, auditoria de perguntas

### Conceptual Agreement (Alan Weiss)
- **3 Pilares:** Objectives → Measures → Value
- **Regra:** Objetivos são SEMPRE outcomes de negócio, NUNCA deliverables
- **Aplicação:** Estruturação do briefing, relatório final, proposta

### Mental Models (Indi Young)
- **Técnica:** Listening sessions (escuta profunda, não entrevista)
- **Classificação:** TASK / THINKING / FEELING / PHILOSOPHY
- **Aplicação:** Reunião de discovery, análise de motivações profundas

### Win Without Pitching (Blair Enns)
- **Princípio:** Diagnose before prescribe
- **4 Dimensões de Fit:** Budget, Scope, Culture, Timeline
- **Aplicação:** Qualificação do cliente, posicionamento como expert

### Orchestrated Onboarding (Donna Weber)
- **6 Fases:** Embark → Handoff → Kickoff → Adopt → Review → Expand
- **Regra:** O cliente sempre sabe o que esperar antes de acontecer
- **Aplicação:** Processo de intake, emails de transição, experiência

### Just Enough Research (Erika Hall)
- **Princípio:** Só pesquise o que vai mudar uma decisão
- **Formato de Insight:** FATO → IMPLICAÇÃO → AÇÃO
- **Aplicação:** Análise de briefing, detecção de gaps e vieses

## Tipos de Projeto Suportados

| Tipo | Perguntas Específicas | Foco Principal |
|------|----------------------|----------------|
| web-app | Roles, admin, volume | Fluxos de usuário |
| mobile-app | Plataformas, offline, device features | UX mobile |
| website | SEO, CMS, conversão | Conteúdo e performance |
| automation | Processos, triggers, aprovações | Eficiência operacional |
| saas | Pricing, multi-tenant, trial | Modelo de negócio |
| ecommerce | SKUs, pagamento, logística | Conversão e operação |
| custom | Aberto | Definido caso a caso |

## Fluxo Completo de Intake

```
FASE 1: Preparação
└─ Gerar roteiro (Mom Test) + email boas-vindas (Embark)

FASE 2: Reunião
└─ Conduzir discovery (Mom Test + Mental Models + Expert Diagnosis)

FASE 3: Briefing
└─ Gerar questionário personalizado (Conceptual Agreement + Humanization)

FASE 4: Análise
└─ Analisar respostas (Just Enough Research + Objective Validation)

FASE 5: Follow-up
└─ Perguntas para gaps (Mom Test)

FASE 6: Classificação
└─ Tipo, complexidade, riscos

FASE 7: Relatório & Handoff
└─ Relatório 9 pontos + handoff para squad-pm
```

## Handoffs

| De | Para | Artefato | Quando |
|----|------|---------|--------|
| squad-intake | squad-pm:discovery-session | intake-report.md | Intake completo |
| squad-intake | squad-pm:write-prd | intake-report.md | Discovery não necessário |
| squad-intake | squad-pm:project-diagnostic | intake-report.md | Classificação complexa |
