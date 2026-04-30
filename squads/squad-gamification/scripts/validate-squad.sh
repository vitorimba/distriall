#!/usr/bin/env bash
##############################################################################
# validate-squad.sh — Structural Validator for Squad Gamification
# Verifies all required files, directories, and cross-references exist.
##############################################################################

set -euo pipefail

SQUAD_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ERRORS=0
WARNINGS=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

pass() { echo -e "${GREEN}  [PASS]${NC} $1"; }
fail() { echo -e "${RED}  [FAIL]${NC} $1"; ((ERRORS++)); }
warn() { echo -e "${YELLOW}  [WARN]${NC} $1"; ((WARNINGS++)); }

echo "=============================================="
echo " Squad Gamification — Structural Validation"
echo "=============================================="
echo ""

# -------------------------------------------------------------------------
# 1. Root files
# -------------------------------------------------------------------------
echo "--- Root Files ---"
for f in config.yaml README.md CHANGELOG.md package.json; do
  if [[ -f "$SQUAD_DIR/$f" ]]; then
    pass "$f exists"
  else
    fail "$f MISSING"
  fi
done
echo ""

# -------------------------------------------------------------------------
# 2. Required directories
# -------------------------------------------------------------------------
echo "--- Directories ---"
for d in tasks workflows templates checklists data playbooks config scripts benchmarks minds; do
  if [[ -d "$SQUAD_DIR/$d" ]]; then
    pass "$d/ exists"
  else
    fail "$d/ MISSING"
  fi
done
echo ""

# -------------------------------------------------------------------------
# 3. Tasks (12 required)
# -------------------------------------------------------------------------
echo "--- Tasks (12 expected) ---"
EXPECTED_TASKS=(
  "gamification-diagnostic.md"
  "player-persona-mapping.md"
  "motivation-audit.md"
  "progression-design.md"
  "engagement-loop-design.md"
  "leaderboard-design.md"
  "onboarding-gamification.md"
  "enterprise-gamification-plan.md"
  "learning-gamification.md"
  "emotion-mapping.md"
  "ab-test-gamification.md"
  "anti-pattern-audit.md"
)
TASK_COUNT=0
for t in "${EXPECTED_TASKS[@]}"; do
  if [[ -f "$SQUAD_DIR/tasks/$t" ]]; then
    pass "tasks/$t"
    ((TASK_COUNT++))
  else
    fail "tasks/$t MISSING"
  fi
done
echo "  Tasks found: $TASK_COUNT / ${#EXPECTED_TASKS[@]}"
echo ""

# -------------------------------------------------------------------------
# 4. Workflows (4 required)
# -------------------------------------------------------------------------
echo "--- Workflows (4 expected) ---"
EXPECTED_WF=(
  "wf-full-gamification.yaml"
  "wf-enterprise-gamification.yaml"
  "wf-app-gamification.yaml"
  "wf-learning-gamification.yaml"
)
WF_COUNT=0
for w in "${EXPECTED_WF[@]}"; do
  if [[ -f "$SQUAD_DIR/workflows/$w" ]]; then
    pass "workflows/$w"
    ((WF_COUNT++))
  else
    fail "workflows/$w MISSING"
  fi
done
echo "  Workflows found: $WF_COUNT / ${#EXPECTED_WF[@]}"
echo ""

# -------------------------------------------------------------------------
# 5. Templates (6 required)
# -------------------------------------------------------------------------
echo "--- Templates (6 expected) ---"
EXPECTED_TMPL=(
  "gamification-strategy-tmpl.md"
  "player-journey-tmpl.md"
  "mechanics-spec-tmpl.md"
  "progression-system-tmpl.md"
  "engagement-loop-tmpl.md"
  "roi-report-tmpl.md"
)
TMPL_COUNT=0
for t in "${EXPECTED_TMPL[@]}"; do
  if [[ -f "$SQUAD_DIR/templates/$t" ]]; then
    pass "templates/$t"
    ((TMPL_COUNT++))
  else
    fail "templates/$t MISSING"
  fi
done
echo "  Templates found: $TMPL_COUNT / ${#EXPECTED_TMPL[@]}"
echo ""

# -------------------------------------------------------------------------
# 6. Checklists (5 required)
# -------------------------------------------------------------------------
echo "--- Checklists (5 expected) ---"
EXPECTED_CL=(
  "gamification-quality-gate.md"
  "ethical-gamification.md"
  "ux-gamification.md"
  "enterprise-readiness.md"
  "player-experience.md"
)
CL_COUNT=0
for c in "${EXPECTED_CL[@]}"; do
  if [[ -f "$SQUAD_DIR/checklists/$c" ]]; then
    pass "checklists/$c"
    ((CL_COUNT++))
  else
    fail "checklists/$c MISSING"
  fi
done
echo "  Checklists found: $CL_COUNT / ${#EXPECTED_CL[@]}"
echo ""

# -------------------------------------------------------------------------
# 7. Data files (5 required)
# -------------------------------------------------------------------------
echo "--- Data (5 expected) ---"
EXPECTED_DATA=(
  "gamification-kb.md"
  "mechanics-catalog.yaml"
  "motivation-frameworks.yaml"
  "anti-patterns-catalog.yaml"
  "case-studies.yaml"
)
DATA_COUNT=0
for d in "${EXPECTED_DATA[@]}"; do
  if [[ -f "$SQUAD_DIR/data/$d" ]]; then
    pass "data/$d"
    ((DATA_COUNT++))
  else
    fail "data/$d MISSING"
  fi
done
echo "  Data files found: $DATA_COUNT / ${#EXPECTED_DATA[@]}"
echo ""

# -------------------------------------------------------------------------
# 8. Minds (9 agents × 2 files each)
# -------------------------------------------------------------------------
echo "--- Minds (9 × 2 = 18 files expected) ---"
MINDS=(
  "yu-kai-chou"
  "bj-fogg"
  "amy-jo-kim"
  "nir-eyal"
  "andrzej-marczewski"
  "kevin-werbach"
  "karl-kapp"
  "nicole-lazzaro"
  "jesse-schell"
)
MIND_COUNT=0
for m in "${MINDS[@]}"; do
  for f in "heuristics.md" "VOICE_DNA.md"; do
    if [[ -f "$SQUAD_DIR/minds/$m/$f" ]]; then
      pass "minds/$m/$f"
      ((MIND_COUNT++))
    else
      fail "minds/$m/$f MISSING"
    fi
  done
done
echo "  Mind files found: $MIND_COUNT / 18"
echo ""

# -------------------------------------------------------------------------
# 9. Config (3 required)
# -------------------------------------------------------------------------
echo "--- Config (3 expected) ---"
for c in "veto-conditions.yaml" "quality-gates.yaml" "heuristics.yaml"; do
  if [[ -f "$SQUAD_DIR/config/$c" ]]; then
    pass "config/$c"
  else
    fail "config/$c MISSING"
  fi
done
echo ""

# -------------------------------------------------------------------------
# 10. File size checks (non-empty)
# -------------------------------------------------------------------------
echo "--- Content Validation ---"
EMPTY_COUNT=0
find "$SQUAD_DIR" -name "*.md" -o -name "*.yaml" -o -name "*.json" | while read -r file; do
  if [[ ! -s "$file" ]]; then
    warn "Empty file: ${file#$SQUAD_DIR/}"
    ((EMPTY_COUNT++)) || true
  fi
done
echo ""

# -------------------------------------------------------------------------
# Summary
# -------------------------------------------------------------------------
echo "=============================================="
echo " VALIDATION SUMMARY"
echo "=============================================="
echo -e "  Errors:   ${RED}$ERRORS${NC}"
echo -e "  Warnings: ${YELLOW}$WARNINGS${NC}"
echo ""

if [[ $ERRORS -eq 0 ]]; then
  echo -e "${GREEN}  VALIDATION PASSED${NC}"
  exit 0
else
  echo -e "${RED}  VALIDATION FAILED ($ERRORS errors)${NC}"
  exit 1
fi
