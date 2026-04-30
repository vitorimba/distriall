# Task: Onboard New Bank

| Field | Value |
|-------|-------|
| **Task ID** | onboard-new-bank |
| **Executor** | Agent (banking-chief) |
| **Execution Type** | Orchestration |
| **Estimated Time** | 1-2h |

## Purpose

Orquestrar o onboarding completo de um banco. Delega para wf-onboard-bank.yaml.

## Inputs

- `bank`: string (required) — inter, sicoob, stone, xp

## Steps

Delega para workflow `wf-onboard-bank.yaml` que executa 4 fases:
1. Auth Setup → @auth-architect
2. Endpoint Discovery → @{banco}-specialist
3. Sandbox Test → @{banco}-specialist
4. Production Deploy → @{banco}-specialist

## Acceptance Criteria

- [ ] Auth configurado
- [ ] Endpoints mapeados
- [ ] 3 operações testadas no sandbox
- [ ] Produção funcional (se solicitado)
