# Task: Export Certified Zip

| Field | Value |
|-------|-------|
| **Task ID** | export-certified-zip |
| **Version** | 1.0.0 |
| **Executor** | Worker |
| **Execution Type** | Deterministic |
| **Estimated Time** | 2 min |
| **Phase** | F10 (Post-Handoff — Export) |

## Purpose

Gerar o zip certificado do squad e salvar na pasta central de squads portáteis.
Esta task é **OBRIGATÓRIA** — sem ela, o squad não é portátil e não pode ser instalado em outros projetos.

## Inputs

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `squad_name` | string | Yes | — | Nome do squad (ex: squad-banking-api) |
| `squad_path` | string | Yes | — | Path completo do squad em squads/ |
| `export_dir` | string | Yes | `from .aiox/sync-config.yaml → export_dir` | Pasta central de squads portáteis |

## Preconditions

- [ ] Squad passou por F5 validate (score >= 7.0)
- [ ] Squad passou por F7 lifecycle (score >= 8.0)
- [ ] F9 handoff completo (registry + slash commands + smoke test)
- [ ] `export_dir` existe e é gravável

## Steps

1. Verificar que o squad existe em `squads/{squad_name}/`
2. Verificar que `export_dir` existe
3. Gerar zip excluindo artefatos runtime:
   ```bash
   cd squads/ && zip -r {export_dir}/{squad_name}.zip {squad_name}/ \
     -x "{squad_name}/.pipeline-state.yaml" \
     -x "{squad_name}/.aiox/*"
   ```
4. Verificar integridade do zip (unzip -t)
5. Confirmar tamanho e conteúdo
6. Reportar path do zip gerado

## Output

```yaml
export_result:
  zip_path: "{export_dir}/{squad_name}.zip"
  size_kb: 0
  files_count: 0
  excluded: [".pipeline-state.yaml", ".aiox/*"]
  integrity: "PASS"
```

## Veto Conditions

- `export_dir` não existe → BLOCK (não criar automaticamente — pode ser path errado)
- Squad não passou por F5 validate → BLOCK (não exportar squad sem validação)
- Zip já existe no destino → WARN + perguntar se quer sobrescrever

## Acceptance Criteria

- [ ] Zip gerado em `{export_dir}/{squad_name}.zip`
- [ ] Zip validado com `unzip -t` (integridade OK)
- [ ] Artefatos runtime excluídos (.pipeline-state.yaml)
- [ ] Conteúdo do zip listado no output

## Checklist Obrigatório

- [ ] **NON-NEGOTIABLE:** Zip DEVE ser salvo em `export_dir` — sem isso o squad não é portátil
- [ ] **NON-NEGOTIABLE:** Zip NÃO deve conter credenciais, .env, certificados (.crt, .key, .pfx)
- [ ] Zip deve ser auto-contido (descompactar = squad funcional)
