# Changelog — squad-banking-api

## [1.0.0] — 2026-04-14

### Added
- 8 agents: banking-chief, auth-architect, inter/sicoob/stone/xp-specialist, data-normalizer, integration-debugger
- 7 tasks: setup-bank-auth, extract-financial-data, setup-pix-integration, setup-billing, debug-integration, normalize-bank-data, onboard-new-bank
- 2 workflows: wf-onboard-bank, wf-extract-all-banks
- 2 checklists: pre-production, security
- 2 data files: bank-endpoints-catalog, tool-discovery
- PRD completo em docs/projects/banking-api/prd.md
- README.md com quick start e exemplos de uso
- Slash commands em .claude/commands/squad-banking-api/

### Banks Covered
- Banco Inter (OAuth2 + mTLS)
- Sicoob (OAuth2 + ICP-Brasil, V3)
- Stone (OAuth2 / API Key, Online + Conciliação)
- XP Investimentos (OAuth2, parceiros/AAIs)

### Pipeline
- Created via PRO Pipeline (wf-squad-pro-pipeline)
- Mode: from-scratch
- Depth: standard
- Knowledge-based agents (no mind clones)
