#!/bin/bash
# OPES Marketing — Daily Content Pipeline (VPS Runner)
# Runs content generation + Telegram approval + publish
#
# Deploy to VPS: /home/opes/mmos-ops/run-daily-content.sh
#
# Exit codes from publish.py:
#   0 = published successfully
#   1 = error (missing content, credentials, etc)
#   2 = rejected via Telegram (reason saved in rejection.md)
#   3 = timeout (no response in 10min)

set -euo pipefail

REPO_DIR="/home/opes/mmos"
SCRIPTS_DIR="$REPO_DIR/squads/marketing-opes/scripts"
CONTENT_DIR="$REPO_DIR/outputs/hubs/marketing"
TODAY=$(date +%Y-%m-%d)
MAX_RETRIES=2

echo "=== OPES Daily Content Pipeline — $TODAY ==="
echo ""

# Step 1: Generate content (Claude Code)
echo "[1/2] Gerando conteudo..."
cd "$REPO_DIR"

# Run content generation (assumes claude is available in PATH)
claude -p "Execute a task daily-content para a data $TODAY. Gere o conteudo completo (LinkedIn + Instagram) e salve em outputs/hubs/marketing/$TODAY.md" \
  --max-turns 30 \
  --allowedTools "Edit,Write,Read,Glob,Grep,Bash,Skill" \
  2>&1 | tail -5

# Verify content was generated
if [ ! -f "$CONTENT_DIR/$TODAY.md" ]; then
    echo "ERRO: Conteudo nao foi gerado em $CONTENT_DIR/$TODAY.md"
    exit 1
fi

echo ""
echo "[2/2] Publicando com aprovacao Telegram..."

# Step 2: Publish with approval loop
attempt=0
while [ $attempt -lt $MAX_RETRIES ]; do
    attempt=$((attempt + 1))
    echo ""
    echo "--- Tentativa $attempt de $MAX_RETRIES ---"

    cd "$SCRIPTS_DIR"
    set +e
    python3 publish.py "$TODAY"
    exit_code=$?
    set -e

    case $exit_code in
        0)
            echo ""
            echo "=== Publicado com sucesso! ==="
            exit 0
            ;;
        2)
            # Rejected — read reason and retry with feedback
            rejection_file="$CONTENT_DIR/$TODAY-rejection.md"
            if [ -f "$rejection_file" ]; then
                reason=$(grep "Motivo:" "$rejection_file" | sed 's/\*\*Motivo:\*\* //')
                echo ""
                echo "Reprovado (motivo: $reason)"

                if [ $attempt -lt $MAX_RETRIES ]; then
                    echo "Regenerando conteudo com feedback..."
                    cd "$REPO_DIR"
                    claude -p "O conteudo de $TODAY foi REPROVADO. Motivo: '$reason'. Regenere o conteudo em outputs/hubs/marketing/$TODAY.md incorporando esse feedback. Mantenha o mesmo formato." \
                      --max-turns 20 \
                      --allowedTools "Edit,Write,Read,Glob,Grep,Bash,Skill" \
                      2>&1 | tail -5
                    # Remove rejection file for next attempt
                    rm -f "$rejection_file"
                else
                    echo "Max tentativas atingido. Conteudo nao publicado."
                    exit 2
                fi
            else
                echo "ERRO: Arquivo de rejeicao nao encontrado"
                exit 2
            fi
            ;;
        3)
            echo ""
            echo "Timeout — sem resposta no Telegram. Conteudo em espera."
            exit 3
            ;;
        *)
            echo ""
            echo "ERRO (exit code $exit_code). Abortando."
            exit $exit_code
            ;;
    esac
done

echo ""
echo "=== Pipeline finalizado ==="
