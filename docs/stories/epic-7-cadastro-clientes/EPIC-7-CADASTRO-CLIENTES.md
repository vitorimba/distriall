# Epic 7: Cadastro de Clientes — Modulo Completo (estilo BM-PRO)

## Objetivo

Evoluir o modulo de clientes de um cadastro basico (nome, telefone, endereco texto livre) para um cadastro profissional com suporte a PF/PJ, auto-preenchimento via CNPJ e CEP, multiplos enderecos com papeis (fiscal/entrega), e snapshot historico de enderecos nos pedidos.

## Problema

Hoje o cadastro de clientes e minimalista:
- Sem campo CPF/CNPJ — impossivel emitir NF-e
- Sem consulta automatica de CNPJ — vendedor digita tudo manualmente
- Endereco e um campo texto livre sem CEP — sem padronizacao
- Apenas 1 endereco por cliente — clientes PJ com filiais nao sao atendidos
- Pedidos nao registram qual endereco foi usado — sem rastreabilidade

## Solucao

- Form unico PF/PJ com labels dinamicos ("CPF"/"CNPJ", "Nome"/"Razao Social")
- Auto-fill CNPJ via API publica (CNPJ.ws + fallback BrasilAPI)
- Auto-fill CEP via ViaCEP
- Tabela `client_addresses` (1:N) com rotulo livre e flags `is_fiscal`/`is_default_delivery`
- Indices parciais no banco garantindo unicidade (max 1 fiscal, max 1 delivery padrao)
- Seletor inteligente de endereco de entrega no fluxo de pedido
- Snapshot de endereco congelado no pedido (JSONB)

## Stories

| # | Story | Pontos | Status |
|---|-------|--------|--------|
| 7.1 | Migration: campos PF/PJ no clients + tabela client_addresses | 5 | Done |
| 7.2 | Migracao de dados: enderecos existentes para client_addresses | 3 | Done |
| 7.3 | Hooks e utils: useCnpjLookup, useCepLookup, validacao CPF/CNPJ | 5 | Done |
| 7.4 | Client form: tipo PF/PJ dinamico, documento, IE, email, auto-fill CNPJ | 8 | Done |
| 7.5 | CRUD de enderecos 1:N: inline no form, rotulo livre, flags, soft delete | 8 | Done |
| 7.6 | Seletor de endereco no pedido + snapshot historico | 8 | Done |
| 7.7 | Atualizar create_order/update_order: capturar snapshot de endereco | 5 | Done |

**Total: 42 pontos — 7 stories**

## Principios Nao-Negociaveis

1. **Unicidade no banco** — indices parciais `UNIQUE WHERE is_fiscal=true AND is_active=true`, nao na aplicacao
2. **Multi-tenant via RLS** — cada usuario so ve clientes do seu tenant (padrao existente)
3. **Auto-fill respeita o usuario** — sempre checar se campo esta vazio antes de preencher
4. **Endereco fiscal efetivo** — fiscal explicito OU endereco de cadastro como fallback (`getEffectiveFiscalAddress`)
5. **Mascaras visuais** — CPF/CNPJ/CEP/telefone mascarados na UI; banco armazena so digitos (unmask)
6. **Snapshot historico** — endereco congelado no pedido via JSONB; editar endereco depois nao altera pedidos antigos

## Design System Compliance (NON-NEGOTIABLE)

- **Componentes UI:** Reutilizar EXCLUSIVAMENTE componentes de `components/ui/` (Card, Button, Badge, Input, Select, Dialog, Skeleton, EmptyState, Alert, Toast, etc.)
- **Tokens CSS:** NUNCA hardcodar cores. Usar variaveis CSS do DS (`var(--surface-card)`, `var(--text-primary)`, `var(--accent)`, etc.)
- **Dark/Light theme:** Tokens garantem compatibilidade automatica
- **Touch targets:** Minimo 44px em elementos interativos
- **Tipografia:** Archivo para UI, `.num` para valores
- **3 estados:** Loading (Skeleton), Vazio (EmptyState), Erro (Alert) em todo componente de dados
- **Referencia:** `DESIGN.md` (raiz) + `apps/web/src/app/globals.css`

## Modelo de Dados

```
clients (ALTER)
├── type: TEXT CHECK ('pf','pj') DEFAULT 'pf'
├── document: TEXT (CPF/CNPJ, so digitos)
├── state_registration: TEXT (IE, so PJ)
├── email: TEXT

client_addresses (CREATE)
├── id: UUID PK
├── client_id: UUID FK → clients
├── account_id: UUID FK → accounts (RLS)
├── label: TEXT ('Matriz', 'Filial Centro', etc.)
├── cep: TEXT (8 digitos)
├── street: TEXT
├── number: TEXT
├── complement: TEXT
├── neighborhood: TEXT
├── city: TEXT
├── state: TEXT (UF, 2 chars)
├── is_fiscal: BOOLEAN DEFAULT false
├── is_default_delivery: BOOLEAN DEFAULT false
├── is_active: BOOLEAN DEFAULT true
├── created_at, updated_at
│
├── UNIQUE PARTIAL: (client_id) WHERE is_fiscal AND is_active
└── UNIQUE PARTIAL: (client_id) WHERE is_default_delivery AND is_active

orders (ALTER)
├── delivery_address_id: UUID FK → client_addresses (opcional)
├── delivery_address_snapshot: JSONB
└── fiscal_address_snapshot: JSONB
```

## APIs Externas

| API | Uso | Rate Limit | Fallback |
|-----|-----|------------|----------|
| ViaCEP | Auto-fill endereco por CEP | Sem limite | BrasilAPI |
| CNPJ.ws | Auto-fill dados PJ por CNPJ | 3 req/min (free) | BrasilAPI |
| BrasilAPI | Fallback para CNPJ e CEP | Sem chave | Manual |

## Dependencias

- Epic 1-4 (base do sistema) — Done
- Story 1.5 (clientes basico) — Done
- Tabela `clients` existente com RLS
- `mask-utils.ts` com `maskCEP()`, `maskCpfCnpj()`, `maskPhone()` — existentes

## Metricas de Sucesso

- Vendedor cadastra cliente PJ em < 30s (com auto-fill CNPJ)
- 100% dos clientes PJ tem CPF/CNPJ armazenado
- Enderecos de entrega rastreavies em todos os pedidos novos
- Zero regressao no fluxo de pedidos existente
- Zero desvio do design system

## Change Log

| Data | Agente | Mudanca |
|------|--------|---------|
| 2026-06-30 | @analyst | Analise de viabilidade completa |
| 2026-06-30 | @sm | Epic criado com 7 stories |
