#!/bin/bash
# =============================================================================
# SpeechTherapy Squad Statistics
# Visao rapida das metricas estruturais do squad
# Uso: ./squad-stats.sh
# =============================================================================

SQUAD_DIR="$(cd "$(dirname "$0")/.." && pwd)"

BOLD='\033[1m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
RESET='\033[0m'

echo -e "\n${BOLD}${CYAN}=====================================${RESET}"
echo -e "${BOLD}${CYAN}  SpeechTherapy — Estatisticas${RESET}"
echo -e "${BOLD}${CYAN}  $(date '+%Y-%m-%d %H:%M')${RESET}"
echo -e "${BOLD}${CYAN}=====================================${RESET}\n"

# Funcao auxiliar: contar arquivos em diretorio (recursivo)
count_files() {
  local dir="$1"
  local ext="${2:-*}"
  if [[ -d "$dir" ]]; then
    find "$dir" -type f -name "$ext" 2>/dev/null | wc -l | tr -d ' '
  else
    echo 0
  fi
}

# Coleta de metricas
agents=$(count_files "$SQUAD_DIR/agents" "*.md")
tasks=$(count_files "$SQUAD_DIR/tasks" "*.md")
workflows_md=$(count_files "$SQUAD_DIR/workflows" "*.md")
workflows_yaml=$(count_files "$SQUAD_DIR/workflows" "*.yaml")
workflows=$((workflows_md + workflows_yaml))
templates_md=$(count_files "$SQUAD_DIR/templates" "*.md")
templates_yaml=$(count_files "$SQUAD_DIR/templates" "*.yaml")
templates_html=$(count_files "$SQUAD_DIR/templates" "*.html")
templates=$((templates_md + templates_yaml + templates_html))
checklists=$(count_files "$SQUAD_DIR/checklists" "*.md")
minds=$(find "$SQUAD_DIR/minds" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | grep -v "/artifacts$" | grep -v "/heuristics$" | wc -l | tr -d ' ')
heuristics=$(find "$SQUAD_DIR/minds" -path "*/heuristics/*.md" -type f 2>/dev/null | wc -l | tr -d ' ')
voice_dnas=$(find "$SQUAD_DIR/minds" -name "VOICE_DNA.md" -type f 2>/dev/null | wc -l | tr -d ' ')
scripts=$(count_files "$SQUAD_DIR/scripts" "*.sh")
data_files=$(count_files "$SQUAD_DIR/data")
docs_files=$(count_files "$SQUAD_DIR/docs")
governance=$(count_files "$SQUAD_DIR/config" "*.yaml")
benchmarks=$(count_files "$SQUAD_DIR/benchmarks")
skills=$(count_files "$SQUAD_DIR/skills")

# Contagem de linhas por tipo
total_files=$(find "$SQUAD_DIR" -type f 2>/dev/null | grep -v "node_modules" | wc -l | tr -d ' ')
md_lines=$(find "$SQUAD_DIR" -type f -name "*.md" 2>/dev/null | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
yaml_lines=$(find "$SQUAD_DIR" -type f -name "*.yaml" 2>/dev/null | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
json_lines=$(find "$SQUAD_DIR" -type f -name "*.json" 2>/dev/null | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
agent_lines=$(find "$SQUAD_DIR/agents" -type f -name "*.md" 2>/dev/null | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')

# Versao do squad
squad_version="unknown"
if [[ -f "$SQUAD_DIR/config.yaml" ]]; then
  squad_version=$(grep "^version:" "$SQUAD_DIR/config.yaml" | head -1 | awk '{print $2}' | tr -d '"')
fi

# Veto conditions count
veto_count=0
if [[ -f "$SQUAD_DIR/config/veto-conditions.yaml" ]]; then
  veto_count=$(grep -c "id:" "$SQUAD_DIR/config/veto-conditions.yaml" 2>/dev/null)
fi

# Quality gates count
gates_count=0
if [[ -f "$SQUAD_DIR/config/quality-gates.yaml" ]]; then
  gates_count=$(grep -c "ST-QG-" "$SQUAD_DIR/config/quality-gates.yaml" 2>/dev/null)
fi

# Exibir tabela
echo -e "  ${BOLD}Squad:${RESET} SpeechTherapy"
echo -e "  ${BOLD}Versao:${RESET} $squad_version"
echo -e "  ${BOLD}Diretorio:${RESET} $SQUAD_DIR"
echo ""
echo -e "  ${BOLD}--- Artefatos Principais ---${RESET}"
printf "  %-22s %s\n" "Agentes:"         "$agents"
printf "  %-22s %s\n" "Minds:"           "$minds"
printf "  %-22s %s\n" "  VOICE_DNAs:"    "$voice_dnas"
printf "  %-22s %s\n" "  Heuristics:"    "$heuristics"
printf "  %-22s %s\n" "Tasks:"           "$tasks"
printf "  %-22s %s\n" "Workflows:"       "$workflows"
printf "  %-22s %s\n" "Templates:"       "$templates"
printf "  %-22s %s\n" "Checklists:"      "$checklists"
echo ""
echo -e "  ${BOLD}--- Governance ---${RESET}"
printf "  %-22s %s\n" "Config files:"    "$governance"
printf "  %-22s %s\n" "Veto Conditions:" "$veto_count"
printf "  %-22s %s\n" "Quality Gates:"   "$gates_count"
echo ""
echo -e "  ${BOLD}--- Testes e Scripts ---${RESET}"
printf "  %-22s %s\n" "Benchmarks:"      "$benchmarks"
printf "  %-22s %s\n" "Skills:"          "$skills"
printf "  %-22s %s\n" "Scripts .sh:"     "$scripts"
echo ""
echo -e "  ${BOLD}--- Dados e Docs ---${RESET}"
printf "  %-22s %s\n" "Data:"            "$data_files"
printf "  %-22s %s\n" "Docs:"            "$docs_files"
echo ""
echo -e "  ${BOLD}--- Linhas por Tipo ---${RESET}"
printf "  %-22s %s\n" "Linhas .md:"      "${md_lines:-0}"
printf "  %-22s %s\n" "Linhas .yaml:"    "${yaml_lines:-0}"
printf "  %-22s %s\n" "Linhas .json:"    "${json_lines:-0}"
printf "  %-22s %s\n" "Linhas agents:"   "${agent_lines:-0}"
echo ""
echo -e "  ${BOLD}--- Totais ---${RESET}"
printf "  %-22s %s\n" "Total arquivos:"  "$total_files"
echo -e "\n${BOLD}${CYAN}=====================================${RESET}\n"
