#!/bin/bash
# =============================================================================
# FitCoach Squad Statistics
# Visão rápida das métricas estruturais do squad
# Uso: ./squad-stats.sh
# =============================================================================

SQUAD_DIR="$(cd "$(dirname "$0")/.." && pwd)"

BOLD='\033[1m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
RESET='\033[0m'

echo -e "\n${BOLD}${CYAN}=====================================${RESET}"
echo -e "${BOLD}${CYAN}  FitCoach Squad — Estatisticas${RESET}"
echo -e "${BOLD}${CYAN}  $(date '+%Y-%m-%d %H:%M')${RESET}"
echo -e "${BOLD}${CYAN}=====================================${RESET}\n"

# Função auxiliar: contar arquivos em diretório (recursivo)
count_files() {
  local dir="$1"
  local ext="${2:-*}"
  if [[ -d "$dir" ]]; then
    find "$dir" -type f -name "$ext" 2>/dev/null | wc -l | tr -d ' '
  else
    echo 0
  fi
}

# Função auxiliar: contar linhas total em diretório
count_lines() {
  local dir="$1"
  local ext="${2:-*.md}"
  if [[ -d "$dir" ]]; then
    find "$dir" -type f -name "$ext" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}'
  else
    echo 0
  fi
}

# Coleta de métricas
agents=$(count_files "$SQUAD_DIR/agents" "*.md")
tasks=$(count_files "$SQUAD_DIR/tasks" "*.md")
workflows=$(count_files "$SQUAD_DIR/workflows" "*.md")
templates=$(count_files "$SQUAD_DIR/templates" "*.md")
checklists=$(count_files "$SQUAD_DIR/checklists" "*.md")
minds=$(find "$SQUAD_DIR/minds" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')
test_cases=$(count_files "$SQUAD_DIR/test-cases" "*.md")
scripts=$(count_files "$SQUAD_DIR/scripts" "*.sh")
data_files=$(count_files "$SQUAD_DIR/data")
docs_files=$(count_files "$SQUAD_DIR/docs")

total_files=$(find "$SQUAD_DIR" -type f 2>/dev/null | grep -v "^$SQUAD_DIR/\." | wc -l | tr -d ' ')
total_lines=$(find "$SQUAD_DIR" -type f -name "*.md" 2>/dev/null | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')

# Nome do squad a partir do config
squad_name="fitcoach"
if [[ -f "$SQUAD_DIR/config.yaml" ]]; then
  squad_name=$(grep "^name:" "$SQUAD_DIR/config.yaml" | awk '{print $2}' | tr -d '"')
fi

# Exibir tabela de estatísticas
echo -e "  ${BOLD}Squad:${RESET} $squad_name"
echo -e "  ${BOLD}Diretório:${RESET} $SQUAD_DIR"
echo ""
echo -e "  ${BOLD}--- Artefatos Principais ---${RESET}"
printf "  %-20s %s\n" "Agentes:"    "$agents"
printf "  %-20s %s\n" "Minds:"      "$minds"
printf "  %-20s %s\n" "Tasks:"      "$tasks"
printf "  %-20s %s\n" "Workflows:"  "$workflows"
printf "  %-20s %s\n" "Templates:"  "$templates"
printf "  %-20s %s\n" "Checklists:" "$checklists"
echo ""
echo -e "  ${BOLD}--- Testes e Scripts ---${RESET}"
printf "  %-20s %s\n" "Test Cases:" "$test_cases"
printf "  %-20s %s\n" "Scripts .sh:" "$scripts"
echo ""
echo -e "  ${BOLD}--- Dados e Docs ---${RESET}"
printf "  %-20s %s\n" "Data:"       "$data_files"
printf "  %-20s %s\n" "Docs:"       "$docs_files"
echo ""
echo -e "  ${BOLD}--- Totais ---${RESET}"
printf "  %-20s %s\n" "Total arquivos:" "$total_files"
printf "  %-20s %s\n" "Total linhas (.md):" "${total_lines:-0}"
echo -e "\n${BOLD}${CYAN}=====================================${RESET}\n"
