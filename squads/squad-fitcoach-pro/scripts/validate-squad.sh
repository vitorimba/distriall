#!/bin/bash
# =============================================================================
# FitCoach Squad Validator
# Verifica a completude estrutural do squad FitCoach
# Uso: ./validate-squad.sh [--verbose]
# =============================================================================

SQUAD_DIR="$(cd "$(dirname "$0")/.." && pwd)"
VERBOSE=false
ERRORS=0
WARNINGS=0

# Processar argumentos
if [[ "$1" == "--verbose" ]]; then
  VERBOSE=true
fi

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
RESET='\033[0m'

log_ok()   { echo -e "  ${GREEN}[OK]${RESET}  $1"; }
log_warn() { echo -e "  ${YELLOW}[WARN]${RESET} $1"; WARNINGS=$((WARNINGS + 1)); }
log_err()  { echo -e "  ${RED}[ERRO]${RESET} $1"; ERRORS=$((ERRORS + 1)); }
log_info() { echo -e "  ${BLUE}[INFO]${RESET} $1"; }

# =============================================================================
# SECAO 1: Verificar config.yaml
# =============================================================================
echo -e "\n${BOLD}=== [1/5] config.yaml ===${RESET}"

if [[ -f "$SQUAD_DIR/config.yaml" ]]; then
  log_ok "config.yaml encontrado"
  # Verificar campos obrigatórios
  for field in name version description entry_agent tier_structure; do
    if grep -q "^$field:" "$SQUAD_DIR/config.yaml" 2>/dev/null; then
      [[ "$VERBOSE" == true ]] && log_ok "  Campo '$field' presente"
    else
      log_err "Campo obrigatório '$field' ausente no config.yaml"
    fi
  done
else
  log_err "config.yaml NAO encontrado em $SQUAD_DIR"
fi

# =============================================================================
# SECAO 2: Contagem de arquivos por diretório
# =============================================================================
echo -e "\n${BOLD}=== [2/5] Contagem de arquivos ===${RESET}"

dirs=("agents" "minds" "tasks" "workflows" "templates" "checklists" "data" "docs")

for dir in "${dirs[@]}"; do
  dir_path="$SQUAD_DIR/$dir"
  if [[ -d "$dir_path" ]]; then
    count=$(find "$dir_path" -type f | wc -l | tr -d ' ')
    log_ok "$dir: $count arquivo(s)"
  else
    log_warn "Diretório '$dir' não encontrado"
  fi
done

# =============================================================================
# SECAO 3: Verificar seções obrigatórias em cada agente
# =============================================================================
echo -e "\n${BOLD}=== [3/5] Seções obrigatórias nos agentes ===${RESET}"

REQUIRED_SECTIONS=("## Scope" "## Veto Conditions" "## Handoff Table" "## Immune System" "## Voice DNA" "## Source References" "## Output")
AGENTS_DIR="$SQUAD_DIR/agents"
AGENT_PASS=0
AGENT_FAIL=0

if [[ -d "$AGENTS_DIR" ]]; then
  for agent_file in "$AGENTS_DIR"/*.md; do
    [[ -f "$agent_file" ]] || continue
    agent_name=$(basename "$agent_file" .md)
    missing_sections=()

    for section in "${REQUIRED_SECTIONS[@]}"; do
      if ! grep -q "$section" "$agent_file" 2>/dev/null; then
        missing_sections+=("$section")
      fi
    done

    if [[ ${#missing_sections[@]} -eq 0 ]]; then
      [[ "$VERBOSE" == true ]] && log_ok "Agente '$agent_name' — todas as seções presentes"
      AGENT_PASS=$((AGENT_PASS + 1))
    else
      log_warn "Agente '$agent_name' — seções ausentes: ${missing_sections[*]}"
      AGENT_FAIL=$((AGENT_FAIL + 1))
    fi
  done
  log_info "Agentes com seções completas: $AGENT_PASS | Com seções faltantes: $AGENT_FAIL"
else
  log_err "Diretório agents/ não encontrado"
fi

# =============================================================================
# SECAO 4: Verificar entry_agent existe como arquivo
# =============================================================================
echo -e "\n${BOLD}=== [4/5] Entry agent ===${RESET}"

if [[ -f "$SQUAD_DIR/config.yaml" ]]; then
  entry_agent=$(grep "^entry_agent:" "$SQUAD_DIR/config.yaml" | awk '{print $2}' | tr -d '"')
  if [[ -n "$entry_agent" ]]; then
    if [[ -f "$AGENTS_DIR/$entry_agent.md" ]]; then
      log_ok "entry_agent '$entry_agent' encontrado em agents/"
    else
      log_err "entry_agent '$entry_agent' declarado no config.yaml mas arquivo agents/$entry_agent.md NAO encontrado"
    fi
  else
    log_err "entry_agent não definido no config.yaml"
  fi
fi

# =============================================================================
# SECAO 5: Verificar test-cases e scripts
# =============================================================================
echo -e "\n${BOLD}=== [5/5] Artefatos de teste ===${RESET}"

TEST_CASES_DIR="$SQUAD_DIR/test-cases"
SCRIPTS_DIR="$SQUAD_DIR/scripts"

if [[ -d "$TEST_CASES_DIR" ]]; then
  tc_count=$(find "$TEST_CASES_DIR" -name "*.md" -type f | wc -l | tr -d ' ')
  log_ok "test-cases/: $tc_count test case(s) encontrado(s)"
  if [[ $tc_count -lt 3 ]]; then
    log_warn "Recomendado: pelo menos 3 test cases (encontrados: $tc_count)"
  fi
else
  log_warn "Diretório test-cases/ não encontrado"
fi

if [[ -d "$SCRIPTS_DIR" ]]; then
  sc_count=$(find "$SCRIPTS_DIR" -name "*.sh" -type f | wc -l | tr -d ' ')
  log_ok "scripts/: $sc_count script(s) .sh encontrado(s)"

  # Verificar permissao de execução
  for script in "$SCRIPTS_DIR"/*.sh; do
    [[ -f "$script" ]] || continue
    if [[ -x "$script" ]]; then
      [[ "$VERBOSE" == true ]] && log_ok "$(basename $script) — executável"
    else
      log_warn "$(basename $script) — NAO é executável (rode: chmod +x $script)"
    fi
  done
else
  log_warn "Diretório scripts/ não encontrado"
fi

# =============================================================================
# RELATORIO FINAL
# =============================================================================
echo -e "\n${BOLD}=============================================${RESET}"
echo -e "${BOLD}  RELATORIO DE VALIDACAO — FitCoach Squad${RESET}"
echo -e "${BOLD}=============================================${RESET}"
echo -e "  Squad dir : $SQUAD_DIR"
echo -e "  Erros     : ${RED}$ERRORS${RESET}"
echo -e "  Avisos    : ${YELLOW}$WARNINGS${RESET}"

if [[ $ERRORS -eq 0 && $WARNINGS -eq 0 ]]; then
  echo -e "\n  ${GREEN}${BOLD}RESULTADO: PASSOU — Squad estruturalmente completo${RESET}\n"
  exit 0
elif [[ $ERRORS -eq 0 ]]; then
  echo -e "\n  ${YELLOW}${BOLD}RESULTADO: PASSOU COM AVISOS — Verifique os warnings acima${RESET}\n"
  exit 0
else
  echo -e "\n  ${RED}${BOLD}RESULTADO: FALHOU — Corrija os erros acima antes de continuar${RESET}\n"
  exit 1
fi
