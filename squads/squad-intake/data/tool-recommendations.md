# Tool Recommendations — Squad Intake

## Ferramentas Recomendadas para Potencializar o Intake

### Tier 1: Quick Wins (alto impacto, baixo esforco)

| Ferramenta | Tipo | Uso | Impacto |
|-----------|------|-----|---------|
| **Typeform** | Form Builder SaaS | Converter briefing.md em formulario conversacional (1 pergunta por vez) | Aumenta taxa de resposta em 30-50% |
| **Jotform** | Form Builder SaaS | Templates prontos de intake, pagamento integrado | Rapidez de setup, 10k+ templates |
| **Tally** | Form Builder (free) | Alternativa gratuita ao Typeform, API simples | Zero custo, boa UX |
| **Google Forms** | Form Builder (free) | Basico mas gratuito, integracao com Sheets | Familiar para clientes |

### Tier 2: Integracao Media

| Ferramenta | Tipo | Uso | Impacto |
|-----------|------|-----|---------|
| **Formstack** | Workflow + Forms | Automacao de routing, aprovacoes, 100+ integracoes | Workflow automatizado |
| **ContentSnare** | Client Content Collection | Especializado em coletar conteudo/docs de clientes | Chasing automatico |
| **Clustdoc** | Client Onboarding | Plataforma completa de onboarding com portal do cliente | Experiencia premium |

### Tier 3: Enterprise / Especializados

| Ferramenta | Tipo | Uso | Impacto |
|-----------|------|-----|---------|
| **Orbit AI** | AI-powered Intake | Qualificacao automatica de leads com scoring | AI lead scoring |
| **IntakeQ** | Health/Wellness Intake | HIPAA-compliant, portal do cliente | Compliance |
| **HubSpot Forms** | CRM + Forms | Intake direto no CRM, nurturing automatico | Pipeline integrado |

### MCPs Disponiveis

| MCP | Uso no Intake |
|-----|--------------|
| **Apify** | Scraping do site do cliente para pre-popular briefing |
| **EXA** | Pesquisa sobre a empresa/industria antes da reuniao |
| **Context7** | Docs de frameworks usados no squad |

### Recomendacao Principal

Para o fluxo descrito (reuniao → briefing → analise):

1. **Gerar briefing em Markdown** (squad-intake faz isso)
2. **Converter para Typeform/Tally** (manual ou via API)
3. **Cliente responde** (UX conversacional, mobile-friendly)
4. **Respostas voltam** (webhook ou export)
5. **Squad analisa** (analyze-responses task)

**Quick Win Imediato:** Usar o template `briefing-form-tmpl.md` como base e copiar para Google Forms ou Tally para enviar ao cliente. Zero setup tecnico.
