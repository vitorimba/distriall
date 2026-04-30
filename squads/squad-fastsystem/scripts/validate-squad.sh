#!/usr/bin/env bash
# ============================================================================
# Squad FastSystem — Structural Validator
# ============================================================================
# Validates that all required squad files and directories exist
# Usage: ./scripts/validate-squad.sh
# ============================================================================

set -euo pipefail

SQUAD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SQUAD_NAME="squad-fastsystem"
ERRORS=0
WARNINGS=0
CHECKS=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "============================================"
echo " Squad FastSystem — Structural Validation"
echo "============================================"
echo ""
echo "Squad directory: ${SQUAD_DIR}"
echo ""

check_file() {
    local file="$1"
    local description="$2"
    local required="${3:-true}"
    CHECKS=$((CHECKS + 1))

    if [[ -f "${SQUAD_DIR}/${file}" ]]; then
        echo -e "  ${GREEN}[OK]${NC} ${file} — ${description}"
    elif [[ "${required}" == "true" ]]; then
        echo -e "  ${RED}[FAIL]${NC} ${file} — ${description} (REQUIRED)"
        ERRORS=$((ERRORS + 1))
    else
        echo -e "  ${YELLOW}[WARN]${NC} ${file} — ${description} (optional)"
        WARNINGS=$((WARNINGS + 1))
    fi
}

check_dir() {
    local dir="$1"
    local description="$2"
    CHECKS=$((CHECKS + 1))

    if [[ -d "${SQUAD_DIR}/${dir}" ]]; then
        echo -e "  ${GREEN}[OK]${NC} ${dir}/ — ${description}"
    else
        echo -e "  ${RED}[FAIL]${NC} ${dir}/ — ${description} (REQUIRED)"
        ERRORS=$((ERRORS + 1))
    fi
}

# --- Root files ---
echo "Root Files:"
check_file "config.yaml" "Squad configuration"
check_file "README.md" "Squad documentation"
check_file "CHANGELOG.md" "Version history"
check_file "package.json" "NPM package"
echo ""

# --- Directories ---
echo "Directories:"
check_dir "tasks" "Task definitions"
check_dir "workflows" "Workflow definitions"
check_dir "templates" "Document templates"
check_dir "checklists" "Validation checklists"
check_dir "data" "Knowledge base and reference data"
check_dir "playbooks" "Operational playbooks"
check_dir "config" "Governance configuration"
check_dir "scripts" "Utility scripts"
check_dir "benchmarks" "Performance benchmarks"
check_dir "minds" "Elite mind definitions"
echo ""

# --- Tasks ---
echo "Tasks (12 expected):"
check_file "tasks/system-diagnostic.md" "FS-T-001"
check_file "tasks/query-optimization.md" "FS-T-002"
check_file "tasks/frontend-audit.md" "FS-T-003"
check_file "tasks/caching-strategy.md" "FS-T-004"
check_file "tasks/load-testing.md" "FS-T-005"
check_file "tasks/bottleneck-analysis.md" "FS-T-006"
check_file "tasks/resilience-audit.md" "FS-T-007"
check_file "tasks/deployment-pipeline-optimization.md" "FS-T-008"
check_file "tasks/database-indexing.md" "FS-T-009"
check_file "tasks/api-latency-reduction.md" "FS-T-010"
check_file "tasks/capacity-planning.md" "FS-T-011"
check_file "tasks/performance-budget.md" "FS-T-012"
echo ""

# --- Workflows ---
echo "Workflows (4 expected):"
check_file "workflows/performance-triage.yaml" "Performance triage"
check_file "workflows/full-system-optimization.yaml" "Full optimization"
check_file "workflows/incident-response-performance.yaml" "Incident response"
check_file "workflows/scaling-readiness.yaml" "Scaling readiness"
echo ""

# --- Templates ---
echo "Templates (6 expected):"
check_file "templates/performance-audit-report-tmpl.md" "Audit report"
check_file "templates/bottleneck-analysis-tmpl.md" "Bottleneck analysis"
check_file "templates/caching-strategy-tmpl.md" "Caching strategy"
check_file "templates/capacity-planning-tmpl.md" "Capacity planning"
check_file "templates/optimization-roadmap-tmpl.md" "Optimization roadmap"
check_file "templates/dora-metrics-dashboard-tmpl.md" "DORA metrics"
echo ""

# --- Checklists ---
echo "Checklists (5 expected):"
check_file "checklists/pre-deployment-performance-checklist.md" "Pre-deployment"
check_file "checklists/database-performance-checklist.md" "Database"
check_file "checklists/frontend-performance-checklist.md" "Frontend"
check_file "checklists/resilience-checklist.md" "Resilience"
check_file "checklists/caching-checklist.md" "Caching"
echo ""

# --- Data ---
echo "Data (5 expected):"
check_file "data/fastsystem-kb.md" "Knowledge base"
check_file "data/performance-benchmarks.yaml" "Benchmarks"
check_file "data/optimization-patterns.yaml" "Patterns"
check_file "data/tool-reference.yaml" "Tool reference"
check_file "data/anti-patterns-catalog.yaml" "Anti-patterns"
echo ""

# --- Playbooks ---
echo "Playbooks (4 expected):"
check_file "playbooks/producao-lenta.md" "Production slow"
check_file "playbooks/migracao-sem-downtime.md" "Migration"
check_file "playbooks/escalar-10x.md" "Scale 10x"
check_file "playbooks/otimizar-custo-cloud.md" "Cloud cost"
echo ""

# --- Config ---
echo "Config (3 expected):"
check_file "config/veto-conditions.yaml" "Veto conditions"
check_file "config/quality-gates.yaml" "Quality gates"
check_file "config/heuristics.yaml" "Heuristics"
echo ""

# --- Benchmarks ---
echo "Benchmarks (2 expected):"
check_file "benchmarks/smoke-test-suite.md" "Smoke tests"
check_file "benchmarks/baseline-registry.yaml" "Baseline registry"
echo ""

# --- Minds ---
echo "Minds (10 expected):"
MINDS=("brendan_gregg" "charity_majors" "addy_osmani" "steve_souders" "markus_winand" "martin_kleppmann" "michael_nygard" "alex_xu" "chris_richardson" "nicole_forsgren")
for mind in "${MINDS[@]}"; do
    check_dir "minds/${mind}" "${mind}"
    check_file "minds/${mind}/artifacts/VOICE_DNA.md" "${mind} voice" "false"
done
echo ""

# --- Summary ---
echo "============================================"
echo " Summary"
echo "============================================"
PASSED=$((CHECKS - ERRORS - WARNINGS))
echo -e "  Total checks: ${CHECKS}"
echo -e "  ${GREEN}Passed: ${PASSED}${NC}"
echo -e "  ${RED}Failed: ${ERRORS}${NC}"
echo -e "  ${YELLOW}Warnings: ${WARNINGS}${NC}"
echo ""

if [[ ${ERRORS} -gt 0 ]]; then
    echo -e "${RED}VALIDATION FAILED — ${ERRORS} required files/dirs missing${NC}"
    exit 1
else
    echo -e "${GREEN}VALIDATION PASSED${NC}"
    exit 0
fi
