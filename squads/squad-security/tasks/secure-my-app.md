---
name: Secure My App (Vibe Coder Edition)
description: Simplified security guide for people building apps with AI tools like Lovable, Supabase, Claude, ChatGPT
executor: security-chief → manico → van-der-stock → cavoukian
elicit: true
mode: interactive
---

# Task: Secure My App (Vibe Coder Edition)

## Purpose

Guia de seguranca simplificado para "vibe coders" — pessoas que constroem apps usando ferramentas como Lovable, Bolt, Cursor, Supabase, Vercel, sem necessariamente ter background tecnico profundo em seguranca. Foco em acoes praticas e imediatas.

## Inputs

| Input | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `app_description` | SIM | O que o app faz, quem usa |
| `tech_stack` | SIM | Ferramentas usadas (Lovable, Supabase, Vercel, etc.) |
| `data_collected` | SIM | Que dados o app coleta dos usuarios |
| `auth_method` | NAO | Como usuarios fazem login (email, social, magic link) |
| `has_payments` | NAO | O app processa pagamentos? |
| `is_live` | NAO | O app ja esta em producao? |
| `user_count` | NAO | Numero estimado de usuarios |

## Steps

### Phase 1: Quick Threat Assessment

**Executor:** security-chief (simplified @shostack approach)

1. **Entender o que voce construiu**
   - O que o app faz?
   - Quem sao os usuarios?
   - Que dados voce coleta? (emails, nomes, CPF, pagamentos)
   - Onde os dados ficam? (Supabase, Firebase, banco proprio)
   - Quem pode acessar o que?

2. **Identificar riscos rapidos**
   - Alguem pode ver dados de outro usuario? (BOLA/IDOR)
   - Alguem pode fazer algo que nao deveria? (autorizacao)
   - Os dados estao protegidos no banco? (RLS)
   - O app esta exposto na internet sem protecao? (WAF/CDN)

**Checkpoint:** Riscos principais identificados

### Phase 2: Secure Coding Quick Fixes

**Executor:** @manico (Jim Manico)

3. **Autenticacao (quem e voce?)**
   - [ ] Use Supabase Auth ou Auth0 — nunca implemente auth do zero
   - [ ] Habilite email confirmation
   - [ ] Implemente rate limiting no login (max 5 tentativas)
   - [ ] Use senha forte (minimo 8 caracteres, complexidade)
   - [ ] Se possivel, habilite MFA (multi-factor authentication)

4. **Autorizacao (o que voce pode fazer?)**
   - [ ] Autenticacao != Autorizacao (sao coisas diferentes!)
   - [ ] Implemente RBAC (Role-Based Access Control)
   - [ ] Verifique permissoes no SERVIDOR, nunca so no frontend
   - [ ] Cada endpoint da API deve verificar: "este usuario pode fazer isso?"

5. **RLS no Supabase (ESSENCIAL)**
   - [ ] Habilite RLS em TODAS as tabelas
   - [ ] Crie policies para SELECT, INSERT, UPDATE, DELETE
   - [ ] Teste: "usuario A consegue ver dados do usuario B?"
   - [ ] Nunca use `service_role` key no frontend
   - [ ] A `anon` key e publica — ela SERA exposta

6. **Input Validation**
   - [ ] Valide TODOS os inputs no servidor
   - [ ] Nunca confie no que vem do frontend
   - [ ] Use Zod ou Joi para validacao de schemas
   - [ ] Sanitize HTML para prevenir XSS

7. **Secrets & Keys**
   - [ ] NUNCA coloque API keys no codigo frontend
   - [ ] Use variaveis de ambiente (.env)
   - [ ] O .env esta no .gitignore?
   - [ ] Supabase: so a anon key vai pro frontend

**Checkpoint:** Quick fixes aplicados

### Phase 3: ASVS Simplified Check

**Executor:** @van-der-stock (Andrew van der Stock)

8. **Verificacao simplificada OWASP ASVS Level 1**
   - [ ] Sessoes expiram apos inatividade?
   - [ ] HTTPS em todo lugar? (nao so login)
   - [ ] Headers de seguranca configurados? (CSP, X-Frame-Options, HSTS)
   - [ ] CORS configurado corretamente? (nao usar `*`)
   - [ ] Erros nao vazam informacoes internas?
   - [ ] Uploads validam tipo e tamanho?
   - [ ] SQL queries usam parametros? (nunca concatenar strings)

**Checkpoint:** ASVS L1 basico verificado

### Phase 4: API Security Basics

**Executor:** @ball (Corey Ball) — simplified

9. **Proteja suas APIs**
   - [ ] Toda rota da API requer autenticacao?
   - [ ] Rate limiting implementado? (ex: 100 req/min)
   - [ ] Paginacao em endpoints que retornam listas?
   - [ ] Nao retorne dados demais (select so o necessario)
   - [ ] Valide TODOS os parametros da API
   - [ ] Use HTTPS para todas as chamadas

**Checkpoint:** API basica protegida

### Phase 5: Privacy & LGPD Basics

**Executor:** @cavoukian (Ann Cavoukian) — simplified

10. **LGPD para vibe coders**
    - [ ] Tem politica de privacidade? (obrigatorio por lei!)
    - [ ] Pede consentimento para coletar dados?
    - [ ] Coleta so o necessario? (minimizacao de dados)
    - [ ] O usuario pode deletar sua conta e dados?
    - [ ] Dados armazenados com criptografia?
    - [ ] Tem procedimento para vazamento de dados?

11. **Cookies e Tracking**
    - [ ] Banner de cookies implementado? (se usa cookies)
    - [ ] Google Analytics com consentimento?
    - [ ] Nao compartilha dados sem base legal?

**Checkpoint:** LGPD basica atendida

### Phase 6: Infrastructure Protection

**Executor:** security-chief

12. **Cloudflare / WAF**
    - [ ] Coloque Cloudflare (ou similar) na frente do app
    - [ ] Habilite protecao DDoS
    - [ ] Configure WAF rules basicas
    - [ ] Habilite bot management

13. **Deploy seguro**
    - [ ] Vercel/Netlify: review build logs (nao vazar secrets)
    - [ ] Supabase: dashboard com 2FA
    - [ ] Monitore erros (Sentry ou similar)
    - [ ] Faca backups regulares do banco

**Checkpoint:** Infraestrutura basica protegida

### Phase 7: Generate Security Checklist

**Executor:** security-chief

14. Gerar checklist personalizado para o app
15. Priorizar por risco e facilidade de implementacao
16. Incluir links para documentacao relevante
17. Criar plano de acao com prazos

## Checkpoints

| # | Checkpoint | Criterio |
|---|-----------|----------|
| 1 | Riscos identificados | Top 5 riscos do app |
| 2 | Quick fixes | Itens criticos corrigidos |
| 3 | ASVS L1 | Verificacao basica feita |
| 4 | API protegida | Endpoints basicos seguros |
| 5 | LGPD basica | Minimos legais atendidos |
| 6 | Infra protegida | CDN/WAF configurado |
| 7 | Checklist | Plano de acao entregue |

## Veto Conditions

- **ESCALATE** se dados pessoais sensiveis (CPF, saude) sem NENHUMA protecao
- **ESCALATE** se RLS desabilitado em producao com usuarios reais
- **ESCALATE** se service_role key exposta no frontend
- **WARN** se app em producao sem HTTPS
- **WARN** se sem politica de privacidade com usuarios ativos

## Output

**Security Checklist for Vibe Coders** contendo:

1. Score de seguranca do app (A/B/C/D/F)
2. Top 5 riscos com explicacao simples
3. Checklist de acoes (ordenado por prioridade)
4. Links para tutoriais e documentacao
5. Plano de acao com prazos sugeridos

## Output Example

```markdown
# Security Checklist — MeuApp.com

**Score:** D (Precisa de atencao urgente)
**Stack:** Lovable + Supabase + Vercel

## Top 5 Riscos (em linguagem simples)

1. **RLS desligado** — Qualquer pessoa com a URL do Supabase
   pode ler TODOS os dados do seu banco. E serio.
   → Acao: Habilitar RLS em todas tabelas [30 min]

2. **Sem verificacao de autorizacao** — Um usuario pode ver/editar
   dados de outro usuario mudando o ID na URL.
   → Acao: Adicionar policies de RLS por user_id [1 hora]

3. **Sem politica de privacidade** — Voce esta ilegal pela LGPD.
   → Acao: Criar politica de privacidade [1 hora]

4. **API sem rate limiting** — Um bot pode fazer milhoes de requests.
   → Acao: Configurar rate limiting na API [2 horas]

5. **Sem Cloudflare** — Seu app esta exposto diretamente a internet.
   → Acao: Configurar Cloudflare free [30 min]

## Checklist de Acoes
| Prioridade | Acao | Tempo | Status |
|-----------|------|-------|--------|
| URGENTE | Habilitar RLS | 30 min | [ ] |
| URGENTE | Criar RLS policies | 1h | [ ] |
| ALTO | Politica de privacidade | 1h | [ ] |
| ALTO | Rate limiting | 2h | [ ] |
| MEDIO | Cloudflare | 30 min | [ ] |
| MEDIO | Headers de seguranca | 1h | [ ] |
| BAIXO | MFA no dashboard | 15 min | [ ] |
```

## Outputs

- **quick-risk-assessment** — Riscos prioritarios identificados (BOLA, RLS, autorizacao, exposicao)
- **security-checklist** — Lista de acoes praticas por categoria (auth, RLS, inputs, secrets, LGPD)
- **remediation-guide** — Guia simplificado de correcoes com exemplos de codigo
