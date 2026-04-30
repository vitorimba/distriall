#!/usr/bin/env bash
# ==============================================================================
# squad-stats.sh — Dashboard for Franchising Avend Squad
# Shows file counts, line counts, per-folder breakdown, agent lines, top 5 files.
# ==============================================================================

set -euo pipefail

SQUAD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "=========================================="
echo "  Squad Stats — Franchising Avend"
echo "  Squad Dir: $SQUAD_DIR"
echo "=========================================="

# ──────────────────────────────────────────────
# Total Files and Lines (.md + .yaml)
# ──────────────────────────────────────────────
echo ""
echo "--- Totals ---"

TOTAL_FILES=$(find "$SQUAD_DIR" -type f \( -name "*.md" -o -name "*.yaml" -o -name "*.yml" \) | wc -l | tr -d ' ')
TOTAL_LINES=$(find "$SQUAD_DIR" -type f \( -name "*.md" -o -name "*.yaml" -o -name "*.yml" \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')

echo "  Total files (.md + .yaml): $TOTAL_FILES"
echo "  Total lines:               $TOTAL_LINES"

# ──────────────────────────────────────────────
# Per-Folder Breakdown
# ──────────────────────────────────────────────
echo ""
echo "--- Per-Folder Breakdown ---"
printf "  %-25s %8s %8s\n" "FOLDER" "FILES" "LINES"
printf "  %-25s %8s %8s\n" "-------------------------" "--------" "--------"

for folder in agents tasks workflows templates checklists minds config data benchmarks scripts; do
  folder_path="$SQUAD_DIR/$folder"
  if [[ -d "$folder_path" ]]; then
    f_count=$(find "$folder_path" -type f \( -name "*.md" -o -name "*.yaml" -o -name "*.yml" \) | wc -l | tr -d ' ')
    f_lines=$(find "$folder_path" -type f \( -name "*.md" -o -name "*.yaml" -o -name "*.yml" \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')
    printf "  %-25s %8s %8s\n" "$folder/" "$f_count" "$f_lines"
  else
    printf "  %-25s %8s %8s\n" "$folder/" "-" "-"
  fi
done

# Root-level files
root_count=$(find "$SQUAD_DIR" -maxdepth 1 -type f \( -name "*.md" -o -name "*.yaml" -o -name "*.yml" \) | wc -l | tr -d ' ')
root_lines=$(find "$SQUAD_DIR" -maxdepth 1 -type f \( -name "*.md" -o -name "*.yaml" -o -name "*.yml" \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')
printf "  %-25s %8s %8s\n" "(root)" "$root_count" "$root_lines"

# ──────────────────────────────────────────────
# Agent Lines Breakdown
# ──────────────────────────────────────────────
echo ""
echo "--- Agent Lines Breakdown ---"
printf "  %-35s %8s\n" "AGENT" "LINES"
printf "  %-35s %8s\n" "-----------------------------------" "--------"

if [[ -d "$SQUAD_DIR/agents" ]]; then
  for agent_file in "$SQUAD_DIR/agents"/*.md; do
    agent_name=$(basename "$agent_file" .md)
    lines=$(wc -l < "$agent_file" | tr -d ' ')
    printf "  %-35s %8s\n" "$agent_name" "$lines"
  done
fi

# ──────────────────────────────────────────────
# Top 5 Largest Files
# ──────────────────────────────────────────────
echo ""
echo "--- Top 5 Largest Files ---"
printf "  %-55s %8s\n" "FILE" "LINES"
printf "  %-55s %8s\n" "-------------------------------------------------------" "--------"

find "$SQUAD_DIR" -type f \( -name "*.md" -o -name "*.yaml" -o -name "*.yml" \) -exec wc -l {} + 2>/dev/null \
  | grep -v "total$" \
  | sort -rn \
  | head -5 \
  | while read -r lines filepath; do
      relpath="${filepath#$SQUAD_DIR/}"
      printf "  %-55s %8s\n" "$relpath" "$lines"
    done

echo ""
echo "=========================================="
echo "  Stats generated at $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="
