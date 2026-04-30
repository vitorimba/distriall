# Task: Deploy Squad to Projects

| Field | Value |
|-------|-------|
| **Task ID** | deploy-to-projects |
| **Version** | 2.0.0 |
| **Executor** | Agent |
| **Execution Type** | Interactive (elicit: true) |
| **Estimated Time** | 5-15 min |
| **Phase** | F11 (Post-Handoff — Deploy) |

## Purpose

Perguntar ao usuário se quer instalar o squad COMPLETO em projetos ativos e executar a instalação.
Projetos vivem em `from .aiox/sync-config.yaml → projects_base`.
Cada projeto recebe o squad inteiro (agents, tasks, workflows, checklists, data) + slash commands.

## Inputs

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `squad_name` | string | Yes | — | Nome do squad |
| `zip_path` | string | Yes | — | Path do zip certificado (output de export-certified-zip) |
| `projects_base` | string | Yes | `from .aiox/sync-config.yaml → projects_base` | Pasta base dos projetos |

## Preconditions

- [ ] Zip certificado existe em `zip_path` (F10 export completo)
- [ ] `projects_base` existe e contém projetos

## Steps

### Step 1: Scan Projects

Listar todos os projetos disponíveis em `projects_base`:
```bash
ls -d {projects_base}*/
```

Classificar cada projeto:
```bash
for p in {projects_base}*/; do
  name=$(basename "$p")
  has_claude=$(test -d "$p/.claude" && echo "YES" || echo "NO")
  has_squad=$(test -d "$p/squads/{squad_name}" && echo "INSTALLED" || echo "NOT_INSTALLED")
  echo "$name | claude=$has_claude | squad=$has_squad"
done
```

### Step 2: Elicit — Perguntar ao Usuário

```yaml
elicit: true
format: numbered_list
question: |
  Squad **{squad_name}** está pronto para deploy.

  Projetos encontrados:
  {lista_projetos com status claude + squad}

  Opções:
  1. Instalar em TODOS os projetos
  2. Escolher projetos específicos (listar números)
  3. Não instalar em nenhum projeto agora

  Qual opção?
```

### Step 3: Deploy Per Project (COPIA COMPLETA)

Para cada projeto selecionado:

1. **Criar diretório squads/ se não existir:**
   ```bash
   mkdir -p {project}/squads/
   ```

2. **Descompactar zip completo do squad:**
   ```bash
   unzip -o {zip_path} -d {project}/squads/
   ```
   Isso cria `{project}/squads/{squad_name}/` com TUDO:
   - agents/
   - tasks/
   - workflows/
   - checklists/
   - data/
   - config.yaml
   - README.md
   - CHANGELOG.md

3. **Instalar slash commands:**
   ```bash
   mkdir -p {project}/.claude/commands/{squad_name}/
   cp {project}/squads/{squad_name}/agents/*.md {project}/.claude/commands/{squad_name}/
   ```

4. **Verificar instalação:**
   ```bash
   echo "Squad files:" && ls {project}/squads/{squad_name}/ | head -5
   echo "Slash commands:" && ls {project}/.claude/commands/{squad_name}/
   ```

5. **Registrar no log de deploy:**
   ```yaml
   deployed_to:
     - project: "{project_name}"
       squad_path: "{project}/squads/{squad_name}/"
       commands_path: "{project}/.claude/commands/{squad_name}/"
       agents: N
       tasks: N
       workflows: N
       timestamp: "YYYY-MM-DDTHH:mm:ssZ"
   ```

### Step 4: Report

Mostrar resumo de instalação:
```
Squad {squad_name} deployed (FULL COPY):

  ✅ avend
     squads/{squad_name}/ — 8 agents, 7 tasks, 2 workflows
     .claude/commands/{squad_name}/ — 8 slash commands

  ✅ galox
     squads/{squad_name}/ — 8 agents, 7 tasks, 2 workflows
     .claude/commands/{squad_name}/ — 8 slash commands

  ⏭️ draft — skipped (user choice)
  ⚠️ church — squad already installed (same version, skipped)
```

## Output

```yaml
deploy_result:
  squad_name: "{squad_name}"
  deploy_mode: "full_copy"
  total_projects_scanned: 0
  projects_deployed: 0
  projects_skipped: 0
  deployments:
    - project: ""
      squad_path: ""
      commands_path: ""
      components: {agents: 0, tasks: 0, workflows: 0, checklists: 0, data: 0}
      status: "deployed|skipped|already_installed|no_claude"
```

## Veto Conditions

- Zip não existe → BLOCK (precisa do F10 export primeiro)
- Squad já instalado no projeto (mesma versão) → WARN (perguntar se quer sobrescrever)
- Projeto não tem `.claude/` → WARN (oferecer criar ou skip)

## Obrigações (NON-NEGOTIABLE)

- [ ] **SEMPRE perguntar antes de instalar** — zero deploys automáticos
- [ ] **Copiar squad COMPLETO** (agents + tasks + workflows + checklists + data + config + README)
- [ ] **Instalar slash commands** (agents/*.md → .claude/commands/{squad_name}/)
- [ ] **NÃO sobrescrever sem confirmação** se squad já existe no projeto
- [ ] **Confirmar lista** se usuário escolher "todos" antes de executar
- [ ] **Reportar resultado** por projeto ao final

## Acceptance Criteria

- [ ] Projetos escaneados e classificados
- [ ] Usuário perguntado sobre onde instalar
- [ ] Squad COMPLETO copiado para squads/ de cada projeto selecionado
- [ ] Slash commands instalados em .claude/commands/ de cada projeto
- [ ] Relatório de deploy gerado com detalhes por projeto
- [ ] Nenhum projeto modificado sem consentimento explícito
