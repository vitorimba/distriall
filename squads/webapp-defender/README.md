# WebApp Defender v2.1

> Squad defensivo completo de seguranca para aplicacoes web.
> Auditoria passiva + OWASP Top 10 recon + threat hunting + hardening + resposta a incidentes.
> **ZERO testes intrusivos.**

---

## Sobre

O **WebApp Defender** e um squad de seguranca defensiva para o [AIOS](https://github.com/SynkraAI/aios-core) (AI Orchestrated System). Ele encontra vulnerabilidades em aplicacoes web de forma **100% passiva** — analisando configuracoes, codigo, policies e logs — e gera codigo de correcao pronto para aplicar.

A v2.1 adiciona **10 agentes especialistas**, um para cada categoria do OWASP Top 10 (2021), e um workflow de recon completo que passa por todos eles.

### Historico de versoes

| Versao | O que mudou |
|--------|-------------|
| **v2.1** | +10 agentes OWASP Top 10, +1 workflow `*owasp-recon`, 22 agentes total |
| v2.0 | Unificou WebApp Defender + Blue Team em um unico squad |
| v1.0 | Squads separados: WebApp Defender (app-layer) e Blue Team (hunting/hardening) |

### Construido a partir de dados reais

| Metrica | Valor |
|---------|-------|
| Vulnerabilidades analisadas | 41 |
| Severidade CRITICAL | 9 |
| Severidade HIGH | 15 |
| Severidade MEDIUM | 13 |
| Pessoas com PII exposta | 280+ |
| Apps auditadas | 3 (Supabase + Vercel) |

Frameworks de referencia: OWASP Top 10 (2021), NIST CSF, CIS Controls, NIST 800-53, MITRE ATT&CK, CVSS 3.1, LGPD.

---

## Instalacao

### Pre-requisitos

- **AIOS Core** >= 2.1.0
- **Claude Code** com acesso ao projeto

### Setup

1. Copie (ou extraia) a pasta `webapp-defender/` para o diretorio `squads/` do seu projeto AIOS:

```
seu-projeto/
└── squads/
    └── webapp-defender/   <-- cole aqui
```

2. Pronto. O AIOS detecta o squad automaticamente.

Para verificar: abra o Claude Code no diretorio do projeto e digite `@shield *help`. Se o agente responder, esta funcionando.

---

## Quick Start

### 1. OWASP Top 10 Full Recon (~2-4h)

```
@shield *owasp-recon target=https://app.example.com
```

Pipeline completo: discovery -> 10 agentes OWASP em paralelo -> correlacao de findings -> remediacao -> relatorio. Cobre todas as 10 categorias do OWASP Top 10.

Com source code e SQL para analise profunda:

```
@shield *owasp-recon target=https://app.example.com source_code=./src sql_dump=./supabase/migrations
```

Modo rapido (top 5 categorias, ~1-2h):

```
@shield *owasp-recon target=https://app.example.com scope=quick
```

Categorias especificas:

```
@shield *owasp-recon target=https://app.example.com scope=focused categories=[A01,A03,A07]
```

Retest (compara com relatorio anterior):

```
@shield *owasp-recon target=https://app.example.com previous_report=./reports/owasp-recon-2026-03-25.md
```

### 2. Auditoria rapida (~10 min)

```
@shield *quick-check
```

Verifica headers HTTP, CORS e exposicao de OpenAPI. Retorna um resumo com quick wins.

### 3. Auditoria focada em RLS (~30-60 min)

```
@shield *rls-audit
```

Audita todas as tabelas e RPCs do Supabase. Ideal se voce usa Supabase e quer garantir que RLS esta correto.

### 4. Auditoria completa (~1-3h)

```
@shield *audit
```

Pipeline completo: inventario -> scan passivo -> revisao profunda -> compliance LGPD -> remediacao -> relatorio.

---

## Arquitetura

```
@shield (Orchestrador)
|
|-- Tier 1: MINDS (Especialistas)
|   |-- @rls-guardian          -> RLS & Access Control
|   |-- @config-sentinel       -> Configuracoes de seguranca
|   |-- @auth-inspector        -> Autenticacao & autorizacao
|   |-- @compliance-advisor    -> LGPD & privacidade
|
|-- Tier 2: TOOLS (Operacionais passivos)
|   |-- @header-analyzer       -> Analisa headers HTTP
|   |-- @schema-reviewer       -> Analisa exposicao de schema
|   |-- @policy-validator      -> Valida RLS policies em SQL
|   |-- @fix-generator         -> Gera codigo de correcao
|
|-- Tier 3: BLUE TEAM (Hunting, Hardening, Code Review)
|   |-- @sentinel              -> Threat hunting & log analysis
|   |-- @watchdog              -> Security posture & incident response
|   |-- @code-guardian         -> OWASP code review & secrets detection
|
|-- Tier 4: OWASP TOP 10 (Especialistas por categoria)
    |-- @owasp-a01-access-warden    -> A01: Broken Access Control
    |-- @owasp-a02-crypto-auditor   -> A02: Cryptographic Failures
    |-- @owasp-a03-injection-scanner-> A03: Injection
    |-- @owasp-a04-design-reviewer  -> A04: Insecure Design
    |-- @owasp-a05-misconfig-hunter -> A05: Security Misconfiguration
    |-- @owasp-a06-dependency-tracker-> A06: Vulnerable & Outdated Components
    |-- @owasp-a07-identity-auditor -> A07: Identification & Auth Failures
    |-- @owasp-a08-integrity-checker-> A08: Software & Data Integrity Failures
    |-- @owasp-a09-log-auditor      -> A09: Logging & Monitoring Failures
    |-- @owasp-a10-ssrf-detective   -> A10: Server-Side Request Forgery
```

**22 agentes** organizados em 5 camadas. Cada agente tem escopo claro e pode ser usado individualmente ou via orchestrador.

---

## Agentes OWASP Top 10 (Tier 4)

Cada agente cobre uma categoria do OWASP Top 10 (2021). Todos operam de forma **100% passiva** — analise de codigo, configs, schemas e documentacao. Zero exploits, zero payloads, zero requests intrusivos.

| Agente | OWASP | Foco | CWEs |
|--------|-------|------|------|
| **@owasp-a01-access-warden** | A01: Broken Access Control | RLS, IDOR, RBAC, CORS, forced browsing, privilege escalation | CWE-200, 284, 285, 352, 639, 862, 863 |
| **@owasp-a02-crypto-auditor** | A02: Cryptographic Failures | Secrets hardcoded, hashing fraco, TLS, PII sem criptografia, key management | CWE-259, 312, 319, 326, 327, 328, 330 |
| **@owasp-a03-injection-scanner** | A03: Injection | SQLi, XSS, CMDi, SSTI, path traversal via taint analysis | CWE-78, 79, 89, 94, 917 |
| **@owasp-a04-design-reviewer** | A04: Insecure Design | Threat modeling, business logic abuse, trust boundaries, anti-automation | CWE-209, 256, 501, 522, 841 |
| **@owasp-a05-misconfig-hunter** | A05: Security Misconfiguration | Defaults perigosos, headers, XXE, debug, OpenAPI exposure | CWE-16, 611, 1004, 1032 |
| **@owasp-a06-dependency-tracker** | A06: Vulnerable Components | CVEs em deps, outdated, unmaintained, license, supply chain | CWE-1104 |
| **@owasp-a07-identity-auditor** | A07: Auth Failures | Senhas fracas, session fixation, MFA gaps, brute force, credential stuffing | CWE-255, 287, 307, 384, 613, 798 |
| **@owasp-a08-integrity-checker** | A08: Integrity Failures | CI/CD injection, deserialization, SRI, code signing, webhooks | CWE-345, 426, 494, 502, 829 |
| **@owasp-a09-log-auditor** | A09: Logging Failures | Eventos missing, log injection, PII em logs, alerting gaps | CWE-117, 223, 532, 778 |
| **@owasp-a10-ssrf-detective** | A10: SSRF | URL fetching, cloud metadata, DNS rebinding, webhooks, open redirect | CWE-918 |

### Comandos por agente OWASP

Todos seguem o mesmo padrao:

```
@owasp-a01-access-warden *help        # Listar comandos
@owasp-a01-access-warden *audit-access # Audit completo da categoria
@owasp-a01-access-warden *generate-fix # Gerar fix pra finding especifico
```

Cada agente tem comandos especificos da sua categoria. Use `*help` para ver a lista completa.

---

## Todos os Agentes e Comandos (Tiers 0-3)

### Tier 0: Orchestrador

#### @shield — Defense Coordinator

O ponto de entrada principal. Coordena os demais agentes, prioriza findings e gera roadmaps.

| Comando | O que faz |
|---------|-----------|
| `@shield *owasp-recon` | OWASP Top 10 full passive recon (todas ou categorias selecionadas) |
| `@shield *audit` | Auditoria passiva completa |
| `@shield *quick-check` | Check rapido: headers, CORS, OpenAPI |
| `@shield *rls-audit` | Auditoria focada em RLS |
| `@shield *triage` | Priorizar findings por severidade |
| `@shield *roadmap` | Gerar roadmap de remediacao com estimativas |
| `@shield *report` | Gerar relatorio consolidado |
| `@shield *fix {finding}` | Gerar codigo de correcao para um finding |
| `@shield *status` | Status da auditoria atual |

---

### Tier 1: Minds (Especialistas)

#### @rls-guardian — RLS & Access Control

Especialista em Row Level Security do Supabase. Cobre a causa raiz de 60%+ dos findings CRITICAL.

| Comando | O que faz |
|---------|-----------|
| `@rls-guardian *audit-rls` | Auditoria completa de RLS a partir de SQL dump ou migrations |
| `@rls-guardian *check-tables` | Verificar quais tabelas tem RLS habilitado/desabilitado |
| `@rls-guardian *check-rpcs` | Validar auth checks em funcoes RPC |
| `@rls-guardian *generate-fix` | Gerar SQL de correcao para tabela especifica |
| `@rls-guardian *patterns` | Mostrar patterns comuns de vulnerabilidades RLS |

#### @config-sentinel — Security Configuration

Especialista em misconfiguracoes: CORS, headers, OpenAPI, PostgREST hints.

| Comando | O que faz |
|---------|-----------|
| `@config-sentinel *audit-cors` | Verificar configuracao CORS |
| `@config-sentinel *audit-headers` | Analisar security headers HTTP |
| `@config-sentinel *audit-openapi` | Verificar exposicao de OpenAPI/schema |
| `@config-sentinel *audit-hints` | Verificar PostgREST hints |
| `@config-sentinel *audit-all` | Rodar todos os checks de configuracao |
| `@config-sentinel *baseline` | Comparar contra baseline de seguranca |

#### @auth-inspector — Authentication & Authorization

Especialista em fluxos de autenticacao, rate limiting, JWT e RBAC.

| Comando | O que faz |
|---------|-----------|
| `@auth-inspector *review-auth` | Revisao completa do fluxo de autenticacao |
| `@auth-inspector *check-rate-limit` | Verificar rate limiting |
| `@auth-inspector *check-signup` | Auditar configuracao de signup/registro |
| `@auth-inspector *check-passwords` | Revisar politica de senhas |
| `@auth-inspector *check-jwt` | Analisar configuracao JWT |
| `@auth-inspector *check-rbac` | Revisar controle de acesso baseado em roles |

#### @compliance-advisor — LGPD & Privacy

Especialista em conformidade com a LGPD e protecao de dados pessoais.

| Comando | O que faz |
|---------|-----------|
| `@compliance-advisor *scan-pii` | Identificar PII exposta em tabelas/APIs |
| `@compliance-advisor *check-lgpd` | Avaliacao de conformidade LGPD |
| `@compliance-advisor *check-consent` | Verificar mecanismos de consentimento |
| `@compliance-advisor *assess-breach` | Avaliar se incidente requer notificacao ANPD |
| `@compliance-advisor *anpd-report` | Gerar rascunho de notificacao para ANPD |
| `@compliance-advisor *data-map` | Mapear fluxos de dados pessoais |

---

### Tier 2: Tools (Operacionais)

#### @header-analyzer — HTTP Headers

| Comando | O que faz |
|---------|-----------|
| `@header-analyzer *analyze` | Analisar headers de seguranca de uma URL |
| `@header-analyzer *compare` | Comparar headers contra baseline |
| `@header-analyzer *fix` | Gerar configuracao de correcao |

#### @schema-reviewer — Schema Exposure

| Comando | O que faz |
|---------|-----------|
| `@schema-reviewer *analyze` | Analisar OpenAPI schema exposto |
| `@schema-reviewer *check-exposure` | Verificar o que esta exposto publicamente |
| `@schema-reviewer *fix` | Gerar fix para reduzir exposicao |

#### @policy-validator — RLS Policy Validation

| Comando | O que faz |
|---------|-----------|
| `@policy-validator *validate` | Validar policies RLS em SQL |
| `@policy-validator *check-coverage` | Verificar cobertura de policies por tabela |
| `@policy-validator *detect-gaps` | Detectar gaps nas policies |

#### @fix-generator — Remediation Code

| Comando | O que faz |
|---------|-----------|
| `@fix-generator *fix-sql {finding}` | Gerar SQL fix (RLS, auth checks) |
| `@fix-generator *fix-vercel {finding}` | Gerar vercel.json fix (headers, CORS) |
| `@fix-generator *fix-supabase {finding}` | Gerar fix de config Supabase |
| `@fix-generator *fix-cors {dominios}` | Gerar config de restricao CORS |
| `@fix-generator *fix-all {findings}` | Gerar todos os fixes de uma vez |

---

### Tier 3: Blue Team

#### @sentinel — Threat Hunting & Log Analysis

Especialista em deteccao de ameacas, analise de logs e criacao de regras de deteccao.

| Comando | O que faz |
|---------|-----------|
| `@sentinel *hunt` | Iniciar sessao de threat hunting |
| `@sentinel *logs` | Analisar logs em busca de anomalias |
| `@sentinel *triage` | Triagem de alerta ou indicador |
| `@sentinel *baseline` | Estabelecer baseline de comportamento normal |
| `@sentinel *detect` | Criar regra de deteccao (Sigma/YARA) |
| `@sentinel *investigate` | Investigar indicador suspeito |
| `@sentinel *ioc-check` | Verificar indicadores de comprometimento |
| `@sentinel *report` | Gerar relatorio de investigacao |

**Frameworks:** MITRE ATT&CK, Sigma rules, YARA, threat intelligence.

#### @watchdog — Security Posture & Incident Response

Especialista em avaliacao de postura, hardening e planejamento de resposta a incidentes.

| Comando | O que faz |
|---------|-----------|
| `@watchdog *posture` | Avaliar postura de seguranca geral |
| `@watchdog *hardening` | Recomendacoes de hardening |
| `@watchdog *ir-plan` | Criar plano de resposta a incidentes |
| `@watchdog *nist` | Avaliar contra NIST Cybersecurity Framework |
| `@watchdog *cis` | Verificar CIS Controls basicos |
| `@watchdog *backup` | Avaliar estrategia de backup |
| `@watchdog *access` | Revisar controles de acesso |
| `@watchdog *compliance` | Verificar compliance basico |

**Frameworks:** NIST CSF, NIST SP 800-61, CIS Controls.

#### @code-guardian — OWASP Code Review & Secrets Detection

Especialista em revisao de codigo com foco em seguranca, deteccao de secrets e auditoria de dependencias.

| Comando | O que faz |
|---------|-----------|
| `@code-guardian *review` | Code review de seguranca |
| `@code-guardian *owasp` | Verificar contra OWASP Top 10 |
| `@code-guardian *secrets` | Buscar secrets expostos no codigo |
| `@code-guardian *deps` | Auditar dependencias vulneraveis |
| `@code-guardian *fix` | Mostrar como corrigir uma vulnerabilidade |
| `@code-guardian *checklist` | Checklist de seguranca para codigo |
| `@code-guardian *hardening` | Recomendacoes de hardening para o app |
| `@code-guardian *headers` | Verificar security headers HTTP |

**Frameworks:** OWASP Top 10 (2021), OWASP ASVS, CWE.

---

## Workflows

### 1. OWASP Full Recon (`@shield *owasp-recon`)

Pipeline completo de reconnaissance passiva cobrindo OWASP Top 10:

```
Phase 0: Intake & Discovery
    └─ Fingerprint stack, enumerar superficie de ataque
         │
    ┌────┴────────────┬────────────────┐
    ▼                 ▼                ▼
Phase 1            Phase 2          Phase 3
Wave 1 (parallel)  Wave 2 (parallel) Wave 3 (parallel)
A01: Access        A04: Design       A07: Identity
A02: Crypto        A05: Misconfig    A08: Integrity
A03: Injection     A06: Dependencies A09: Logging
                                     A10: SSRF
    └────┬────────────┴────────────────┘
         ▼
Phase 4: Cross-Reference & Correlation
    └─ Deduplica findings, detecta attack chains e padroes sistemicos
         ▼
Phase 5: Remediation Planning
    └─ Prioriza por risco, gera fix code, monta roadmap por sprints
         ▼
Phase 6: Report Generation
    └─ Relatorio completo + JSON + arquivos de fix separados
```

**Parametros:**

| Parametro | Obrigatorio | Default | Descricao |
|-----------|-------------|---------|-----------|
| `target` | Sim | — | URL do alvo |
| `source_code` | Nao | null | Path pro source code (habilita analise estatica profunda) |
| `sql_dump` | Nao | null | Path pra migrations/SQL dump (habilita auditoria de RLS, RPCs, schema) |
| `supabase_project_id` | Nao | null | ID do projeto Supabase |
| `scope` | Nao | full | `full` (10 categorias), `quick` (top 5), `focused` (escolhe quais) |
| `categories` | Nao | todas | Lista de categorias quando scope=focused |
| `previous_report` | Nao | null | Relatorio anterior para modo retest (delta comparison) |
| `report_lang` | Nao | pt-br | Idioma do relatorio: `pt-br` ou `en` |
| `report_path` | Nao | ./reports | Diretorio de output |

**Scope presets:**

| Scope | Categorias | Tempo estimado |
|-------|-----------|----------------|
| `full` | A01, A02, A03, A04, A05, A06, A07, A08, A09, A10 | 2-4h |
| `quick` | A01, A02, A03, A05, A07 | 1-2h |
| `focused` | Selecionadas pelo usuario | Variavel |

**Output:**
- Relatorio Markdown com sumario executivo, heatmap OWASP, findings detalhados, attack chains e roadmap
- Findings em JSON para integracao com outras ferramentas
- Fix files separados (SQL, config, code patches)

Tempo estimado: 2-4 horas (full), 1-2 horas (quick).

### 2. Full Audit (`@shield *audit`)

Pipeline completo de auditoria (agentes Tier 1 e 2):

```
Inventario -> Scan Passivo -> Revisao Profunda -> Compliance LGPD -> Remediacao -> Relatorio
```

Tempo estimado: 1-3 horas.

### 3. RLS Audit (`@shield *rls-audit`)

Focado em Supabase:

```
Enumerar Tabelas -> Validar Policies -> Coverage Matrix -> Gerar Fixes SQL
```

Usa `@rls-guardian` e `@policy-validator`. Tempo estimado: 30-60 minutos.

### 4. Quick Check (`@shield *quick-check`)

Check rapido:

```
Headers HTTP -> CORS -> OpenAPI -> Resumo com Quick Wins
```

Usa `@header-analyzer` e `@config-sentinel`. Tempo estimado: ~10 minutos.

---

## Checklists Incluidas

| Checklist | Arquivo | Cobre |
|-----------|---------|-------|
| **Supabase Security Baseline** | `supabase-security-baseline.md` | RLS, RPCs, auth config, API exposure |
| **Vercel Security Config** | `vercel-security-config.md` | Headers, CORS, env vars, deployment settings |
| **LGPD Compliance** | `lgpd-compliance.md` | Artigos 6, 7, 11, 18, 46, 48 da LGPD |
| **Pre-Deploy Security Gate** | `pre-deploy-security.md` | Checklist obrigatorio antes de deploy |
| **Security Baseline** | `security-baseline.md` | Baseline geral: OS, rede, app, contas, backup |

---

## Top 10 Vulnerabilidades Cobertas

Patterns extraidos de auditorias reais:

| # | Pattern | OWASP | Frequencia |
|---|---------|-------|-----------|
| 1 | RLS desabilitado em tabelas com PII | A01 | 100% das apps |
| 2 | RPCs sem verificacao de autorizacao | A01 | 67% das apps |
| 3 | CORS wildcard (`*`) | A05 | 100% das apps |
| 4 | OpenAPI schema exposto publicamente | A05 | 67% das apps |
| 5 | Signup aberto com auto-confirm | A07 | 67% das apps |
| 6 | Zero rate limiting em auth | A07 | 67% das apps |
| 7 | Security headers ausentes | A05 | 100% das apps |
| 8 | PII vazando em rankings/views publicas | A01 | 67% das apps |
| 9 | Policies de escrita incompletas (INSERT/UPDATE) | A01 | 67% das apps |
| 10 | PostgREST hints habilitados | A05 | 67% das apps |

---

## Stack Alvo

Otimizado para apps construidas com:

| Tecnologia | Camada |
|-----------|--------|
| **Supabase** | Auth, Database, PostgREST, Realtime |
| **Vercel** | Hosting, Edge Functions, Middleware |
| **React / Next.js** | Frontend SPA |
| **PostgreSQL** | RLS, Functions, Policies |

Os agentes OWASP Top 10 (Tier 4) e Blue Team (Tier 3) se aplicam a **qualquer stack web**.

---

## Conteudo do Squad

| Componente | Qtd | Detalhes |
|-----------|-----|---------|
| Agents | 22 | 1 orchestrador + 4 minds + 4 tools + 3 blue team + 10 OWASP Top 10 |
| Tasks | 38 | Cobrindo agentes dos Tiers 0-3 |
| Workflows | 4 | owasp-full-recon, full-audit, rls-audit, quick-check |
| Checklists | 5 | supabase, vercel, lgpd, pre-deploy, security-baseline |
| Vulnerability Patterns | 10 | Extraidos de auditorias reais |
| Templates | 1 | Relatorio de auditoria padronizado |

---

## Exemplos de Uso

### OWASP recon completo em uma app

```
@shield *owasp-recon target=https://app.example.com
```

### OWASP recon com source code (analise profunda)

```
@shield *owasp-recon target=https://app.example.com source_code=./src sql_dump=./supabase/migrations
```

### OWASP recon rapido (top 5 categorias)

```
@shield *owasp-recon target=https://app.example.com scope=quick
```

### OWASP recon focado (categorias especificas)

```
@shield *owasp-recon target=https://app.example.com scope=focused categories=[A01,A03,A10]
```

### Retest (comparar com relatorio anterior)

```
@shield *owasp-recon target=https://app.example.com previous_report=./reports/owasp-recon-2026-03-25.md
```

### Auditar uma app Supabase rapidamente

```
@shield *quick-check

# Forneca a URL da aplicacao quando solicitado
# Em ~10 min voce tera um resumo com os problemas mais urgentes
```

### Verificar se todas as tabelas tem RLS

```
@rls-guardian *check-tables

# Passe o SQL dump ou migrations
# O agente lista cada tabela e seu status de RLS
```

### Gerar fix de CORS para dominios especificos

```
@fix-generator *fix-cors meuapp.com,staging.meuapp.com

# Gera a config pronta para vercel.json ou Supabase
```

### Iniciar threat hunting nos logs

```
@sentinel *hunt

# O agente guia voce pelo ciclo:
# Hipotese -> Coletar Dados -> Analisar -> Concluir -> Documentar
```

### Avaliar postura de seguranca com NIST

```
@watchdog *nist

# Avaliacao contra as 5 funcoes do NIST CSF:
# Identify -> Protect -> Detect -> Respond -> Recover
```

### Buscar secrets no codigo

```
@code-guardian *secrets

# Varre o codebase procurando API keys, passwords, tokens hardcoded
```

### Verificar compliance LGPD

```
@compliance-advisor *check-lgpd

# Avaliacao contra artigos da LGPD
# Identifica PII exposta e gaps de conformidade
```

### Usar um agente OWASP diretamente

```
@owasp-a03-injection-scanner *audit-injection

# Taint analysis completo: traca user input ate sinks perigosos
# Cobre SQLi, XSS, CMDi, SSTI, path traversal
```

---

## Restricoes (NON-NEGOTIABLE)

Estas restricoes sao absolutas e aplicam-se a **todos** os 22 agentes do squad:

- **NUNCA** envia requests que modificam dados no alvo
- **NUNCA** tenta bypass de autenticacao
- **NUNCA** faz brute force, fuzzing ou injection
- **NUNCA** executa exploits ou gera payloads ofensivos
- **NUNCA** escaneia portas ou probes em redes internas
- **APENAS** analise passiva: configs, codigo, policies, headers, logs, schemas
- **SEMPRE** gera remediacao para cada finding encontrado
- **SEMPRE** classifica por CVSS 3.1, CWE e controles NIST 800-53

---

## Estrutura de Arquivos

```
webapp-defender/
|-- squad.yaml                           # Manifesto do squad
|-- README.md                            # Este arquivo
|-- agents/                              # 22 agentes
|   |-- shield.md                        # Tier 0: Orchestrador
|   |-- rls-guardian.md                  # Tier 1: RLS specialist
|   |-- config-sentinel.md              # Tier 1: Config auditor
|   |-- auth-inspector.md               # Tier 1: Auth reviewer
|   |-- compliance-advisor.md            # Tier 1: LGPD advisor
|   |-- header-analyzer.md              # Tier 2: Header analyzer
|   |-- schema-reviewer.md              # Tier 2: Schema reviewer
|   |-- policy-validator.md             # Tier 2: Policy validator
|   |-- fix-generator.md                # Tier 2: Fix generator
|   |-- sentinel.md                     # Tier 3: Threat hunter
|   |-- watchdog.md                     # Tier 3: Posture analyst
|   |-- code-guardian.md                # Tier 3: Code reviewer
|   |-- owasp-a01-access-warden.md      # Tier 4: Broken Access Control
|   |-- owasp-a02-crypto-auditor.md     # Tier 4: Cryptographic Failures
|   |-- owasp-a03-injection-scanner.md  # Tier 4: Injection
|   |-- owasp-a04-design-reviewer.md    # Tier 4: Insecure Design
|   |-- owasp-a05-misconfig-hunter.md   # Tier 4: Security Misconfiguration
|   |-- owasp-a06-dependency-tracker.md # Tier 4: Vulnerable Components
|   |-- owasp-a07-identity-auditor.md   # Tier 4: Auth Failures
|   |-- owasp-a08-integrity-checker.md  # Tier 4: Integrity Failures
|   |-- owasp-a09-log-auditor.md        # Tier 4: Logging Failures
|   |-- owasp-a10-ssrf-detective.md     # Tier 4: SSRF
|-- tasks/                               # 38 tasks
|-- workflows/                           # 4 workflows
|   |-- owasp-full-recon-workflow.yaml   # OWASP Top 10 full recon
|   |-- full-audit-workflow.yaml         # Full passive audit
|   |-- rls-audit-workflow.yaml          # Focused RLS audit
|   |-- quick-check-workflow.yaml        # Quick security check
|-- checklists/                          # 5 checklists
|-- templates/                           # 1 template de relatorio
|-- config/                              # Configuracoes do squad
|-- data/                                # Vulnerability patterns
|-- scripts/                             # Scripts auxiliares
|-- tools/                               # (reservado)
```

---

## Creditos

- **Squad:** Craft (Squad Creator) + Sidney Fernandes
- **Dados de auditoria:** SAIOS Cybersecurity Division
- **Framework:** [SAIOS](https://github.com/SynkraAI/aios-core) — Security AI Orchestrated System v4.0
- **Licenca:** MIT

---

*webapp-defender v2.1.0 — Encontrar -> Explicar -> Corrigir -> Defender*
