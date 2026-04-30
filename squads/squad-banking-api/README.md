# Squad Banking API

Squad especializado em integracao com APIs bancarias brasileiras.

## Bancos Cobertos

| Banco | Agent | Auth | Principais APIs |
|-------|-------|------|-----------------|
| Banco Inter | `@inter-specialist` | OAuth2 + mTLS | Banking, Cobranca, Pix, Webhooks |
| Sicoob | `@sicoob-specialist` | OAuth2 + ICP-Brasil | Conta Corrente, Cobranca V3, Pix |
| Stone | `@stone-specialist` | OAuth2 / API Key | Stone Online, Conciliacao, POS SDK |
| XP Investimentos | `@xp-specialist` | OAuth2 | Posicao, Movimentacao, Revenue |

## Agents

| Tier | Agent | Funcao |
|------|-------|--------|
| Orchestrator | `banking-chief` (Bankson) | Roteia por banco e tipo de operacao |
| Tier 0 | `auth-architect` (Autha) | OAuth2, mTLS, certificados, FAPI |
| Tier 1 | `inter-specialist` (Ivan) | API Banco Inter |
| Tier 1 | `sicoob-specialist` (Sergio) | API Sicoob |
| Tier 1 | `stone-specialist` (Stacy) | API Stone |
| Tier 1 | `xp-specialist` (Xavier) | API XP Investimentos |
| Tier 2 | `data-normalizer` (Dana) | Schema unificado multi-banco |
| Tier 2 | `integration-debugger` (Diego) | Troubleshooting cross-bank |

## Quick Start

```bash
# Ativar o orchestrator (roteia automaticamente)
/banking:banking-chief

# Ou ativar um especialista direto
/banking:inter-specialist
/banking:auth-architect
```

## Exemplos de Uso

```
# Puxar extrato do Inter
"Quero o extrato do Banco Inter dos ultimos 30 dias"

# Configurar auth
"Como configuro OAuth2 + mTLS no Banco Inter?"

# Debug
"Erro 401 na API do Sicoob, o que pode ser?"

# Multi-banco
"Quero dados de todos os bancos em um formato so"

# Pix
"Como configuro recebimento Pix via webhook no Inter?"
```

## Conceitos Importantes

### Valores Monetarios
- **Banco Inter, Sicoob, XP:** valores em REAIS (float) — converter para centavos
- **Stone Online:** valores em CENTAVOS (integer) — NAO converter
- **Schema unificado:** SEMPRE centavos (integer)

### Autenticacao
- **Inter:** OAuth2 + certificado mTLS (obrigatorio em TODAS as requests)
- **Sicoob:** OAuth2 + certificado ICP-Brasil (e-CNPJ)
- **Stone Online:** OAuth2 padrao
- **Stone Conciliacao:** API Key (Bearer)
- **XP:** OAuth2 (requer ser parceiro/AAI)

### Open Finance Brasil
- Padrao FAPI (Financial-grade API)
- OAuth2 + PKCE + mTLS
- Certificado ICP-Brasil obrigatorio em producao
- Consentimento do usuario necessario

## Estrutura

```
squad-banking-api/
├── agents/                         # 8 agents
│   ├── banking-chief.md            # Orchestrator
│   ├── auth-architect.md           # Auth specialist (Tier 0)
│   ├── inter-specialist.md         # Banco Inter (Tier 1)
│   ├── sicoob-specialist.md        # Sicoob (Tier 1)
│   ├── stone-specialist.md         # Stone (Tier 1)
│   ├── xp-specialist.md            # XP Investimentos (Tier 1)
│   ├── data-normalizer.md          # Schema unificado (Tier 2)
│   └── integration-debugger.md     # Troubleshooting (Tier 2)
├── tasks/                          # 7 tasks
│   ├── setup-bank-auth.md          # Configurar auth por banco
│   ├── extract-financial-data.md   # Extrair dados financeiros
│   ├── setup-pix-integration.md    # Integrar Pix
│   ├── setup-billing.md            # Configurar cobranca
│   ├── debug-integration.md        # Diagnosticar erros
│   ├── normalize-bank-data.md      # Normalizar dados multi-banco
│   └── onboard-new-bank.md         # Onboarding completo
├── workflows/                      # 2 workflows
│   ├── wf-onboard-bank.yaml        # Auth → Endpoints → Sandbox → Prod
│   └── wf-extract-all-banks.yaml   # Extract all → Normalize → Merge
├── checklists/                     # 2 checklists
│   ├── pre-production-checklist.md
│   └── security-checklist.md
├── data/                           # 2 data files
│   ├── bank-endpoints-catalog.yaml
│   └── tool-discovery.yaml
├── docs/                           # Reports
├── config.yaml
├── CHANGELOG.md
└── README.md
```

## Checklists

- **Pre-Production:** Validacoes obrigatorias antes de ir para producao
- **Security:** Seguranca especifica para integracao bancaria (LGPD, mTLS, vault)

## Extensibilidade

Para adicionar um novo banco:
1. Criar `agents/{banco}-specialist.md` seguindo o padrao dos existentes
2. Adicionar entry em `data/bank-endpoints-catalog.yaml`
3. Adicionar entry em `config.yaml`
4. Atualizar `data-normalizer.md` com mapping rules do novo banco

---

_Squad Banking API v1.0.0 — Created 2026-04-14_
