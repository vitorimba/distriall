#!/usr/bin/env bash
##############################################################################
# squad-stats.sh — Statistics Dashboard for Squad Gamification
##############################################################################

set -euo pipefail

SQUAD_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "=============================================="
echo " Squad Gamification — Statistics Dashboard"
echo " $(date '+%Y-%m-%d %H:%M:%S')"
echo "=============================================="
echo ""

# File counts
echo "--- File Counts ---"
echo "  Tasks:       $(find "$SQUAD_DIR/tasks" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Workflows:   $(find "$SQUAD_DIR/workflows" -name "*.yaml" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Templates:   $(find "$SQUAD_DIR/templates" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Checklists:  $(find "$SQUAD_DIR/checklists" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Data:        $(find "$SQUAD_DIR/data" -maxdepth 1 -type f 2>/dev/null | wc -l | tr -d ' ')"
echo "  Playbooks:   $(find "$SQUAD_DIR/playbooks" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Config:      $(find "$SQUAD_DIR/config" -name "*.yaml" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Scripts:     $(find "$SQUAD_DIR/scripts" -name "*.sh" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Benchmarks:  $(find "$SQUAD_DIR/benchmarks" -type f 2>/dev/null | wc -l | tr -d ' ')"
echo "  Minds:       $(find "$SQUAD_DIR/minds" -type d -mindepth 1 -maxdepth 1 2>/dev/null | wc -l | tr -d ' ') agents"
echo "  Mind files:  $(find "$SQUAD_DIR/minds" -type f 2>/dev/null | wc -l | tr -d ' ')"
echo ""

# Total files and lines
TOTAL_FILES=$(find "$SQUAD_DIR" -type f \( -name "*.md" -o -name "*.yaml" -o -name "*.json" -o -name "*.sh" \) | wc -l | tr -d ' ')
TOTAL_LINES=$(find "$SQUAD_DIR" -type f \( -name "*.md" -o -name "*.yaml" -o -name "*.json" -o -name "*.sh" \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')

echo "--- Totals ---"
echo "  Total files: $TOTAL_FILES"
echo "  Total lines: $TOTAL_LINES"
echo ""

# Lines per category
echo "--- Lines per Category ---"
for dir in tasks workflows templates checklists data playbooks config minds benchmarks; do
  if [[ -d "$SQUAD_DIR/$dir" ]]; then
    LINES=$(find "$SQUAD_DIR/$dir" -type f -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')
    printf "  %-12s %s lines\n" "$dir:" "$LINES"
  fi
done
echo ""

# Largest files
echo "--- Largest Files (Top 10) ---"
find "$SQUAD_DIR" -type f \( -name "*.md" -o -name "*.yaml" -o -name "*.json" \) -exec wc -l {} + 2>/dev/null | sort -rn | head -11 | tail -10 | while read -r lines file; do
  printf "  %5s lines  %s\n" "$lines" "${file#$SQUAD_DIR/}"
done
echo ""

# Agent minds check
echo "--- Agent Minds ---"
for mind_dir in "$SQUAD_DIR/minds"/*/; do
  if [[ -d "$mind_dir" ]]; then
    AGENT=$(basename "$mind_dir")
    HEUR="missing"
    VOICE="missing"
    [[ -f "$mind_dir/heuristics.md" ]] && HEUR="present"
    [[ -f "$mind_dir/VOICE_DNA.md" ]] && VOICE="present"
    printf "  %-22s heuristics: %-8s VOICE_DNA: %s\n" "$AGENT" "$HEUR" "$VOICE"
  fi
done
echo ""

echo "=============================================="
echo " Dashboard complete."
echo "=============================================="
