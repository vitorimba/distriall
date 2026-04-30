#!/usr/bin/env python3
"""
OPES Marketing Arm — Telegram Approval Bot (Human in the Loop)
Sends content preview to Telegram, waits for CEO approval before publishing.

Zero external dependencies — uses urllib.request (stdlib only).

Usage:
  # Import in publish.py:
  from telegram_approval import request_approval, notify_published

  # Standalone test:
  python3 telegram_approval.py --test              # Test bot connection
  python3 telegram_approval.py --chat-id           # Auto-detect chat_id
  python3 telegram_approval.py --preview 2026-03-15  # Send preview only
"""
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error

BOT_TOKEN = "8789075178:AAFmoS5i75TP2i2fxZ3aWjHREeXtos6WFJE"
API_BASE = f"https://api.telegram.org/bot{BOT_TOKEN}"

CHAT_ID_FILE = os.path.expanduser("~/.config/aios/telegram-chat-id.txt")

POLL_INTERVAL = 5    # seconds between polls
POLL_TIMEOUT = 600   # max seconds to wait (10 min)

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
CONTENT_DIR = os.path.join(REPO_ROOT, "outputs", "hubs", "marketing")


# ---- TELEGRAM API ----

def _tg_request(method, payload=None):
    """Make a request to the Telegram Bot API."""
    url = f"{API_BASE}/{method}"
    # Long-polling requests need longer socket timeout than the poll timeout
    tg_timeout = 30
    if payload and payload.get("timeout"):
        tg_timeout = payload["timeout"] + 10
    if payload:
        data = json.dumps(payload).encode()
        req = urllib.request.Request(url, data=data, method='POST')
        req.add_header('Content-Type', 'application/json')
    else:
        req = urllib.request.Request(url)
    try:
        resp = urllib.request.urlopen(req, timeout=tg_timeout)
        return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        print(f"  Telegram API error ({e.code}): {body}", flush=True)
        return None
    except Exception as e:
        print(f"  Telegram request failed: {e}", flush=True)
        return None


def get_chat_id():
    """Get chat_id from cached file, or auto-detect from recent messages."""
    # Try cached file first
    if os.path.exists(CHAT_ID_FILE):
        with open(CHAT_ID_FILE) as f:
            cached = f.read().strip()
        if cached:
            return int(cached)

    # Auto-detect from getUpdates
    print("  Auto-detecting chat_id...")
    result = _tg_request("getUpdates", {"limit": 10, "timeout": 0})
    if not result or not result.get("ok"):
        print("  ERRO: Nao foi possivel obter updates. Envie /start para o bot primeiro.")
        return None

    updates = result.get("result", [])
    if not updates:
        print("  ERRO: Nenhuma mensagem encontrada. Abra o Telegram e envie /start para o bot.")
        return None

    # Get the most recent chat_id
    chat_id = None
    for update in reversed(updates):
        msg = update.get("message") or update.get("callback_query", {}).get("message")
        if msg and msg.get("chat", {}).get("id"):
            chat_id = msg["chat"]["id"]
            break

    if not chat_id:
        print("  ERRO: Nenhum chat_id encontrado nos updates.")
        return None

    # Cache for future use
    os.makedirs(os.path.dirname(CHAT_ID_FILE), exist_ok=True)
    with open(CHAT_ID_FILE, 'w') as f:
        f.write(str(chat_id))
    print(f"  Chat ID detectado e salvo: {chat_id}")
    return chat_id


def send_message(chat_id, text, reply_markup=None):
    """Send a text message to a chat."""
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown",
    }
    if reply_markup:
        payload["reply_markup"] = reply_markup
    return _tg_request("sendMessage", payload)


def send_photo(chat_id, photo_url, caption=None):
    """Send a photo by URL to a chat."""
    payload = {
        "chat_id": chat_id,
        "photo": photo_url,
    }
    if caption:
        payload["caption"] = caption[:1024]
        payload["parse_mode"] = "Markdown"
    return _tg_request("sendPhoto", payload)


def answer_callback_query(callback_query_id, text=None):
    """Acknowledge a callback query (inline button press)."""
    payload = {"callback_query_id": str(callback_query_id)}
    if text:
        payload["text"] = text
    try:
        return _tg_request("answerCallbackQuery", payload)
    except Exception:
        pass  # Non-critical — button press already received


def edit_message_text(chat_id, message_id, text):
    """Edit an existing message (used to replace buttons with result)."""
    return _tg_request("editMessageText", {
        "chat_id": chat_id,
        "message_id": message_id,
        "text": text,
        "parse_mode": "Markdown",
    })


# ---- CONTENT LOADING ----

def load_preview(target_date):
    """Load content preview from the daily markdown file."""
    content_file = os.path.join(CONTENT_DIR, f"{target_date}.md")
    if not os.path.exists(content_file):
        return None, None, None

    with open(content_file) as f:
        md = f.read()

    # Extract IG caption (main preview text)
    caption = None
    m = re.search(r'###\s*Caption\s*\n(.*?)(?:\n###|\n---)', md, re.DOTALL)
    if m:
        caption = m.group(1).strip()

    # Extract LinkedIn post
    li_post = None
    m = re.search(r'###\s*Post\s*\n(.*?)(?:\n###|\n---)', md, re.DOTALL)
    if m:
        li_post = m.group(1).strip()

    # Check for cover image
    cover_url = None
    for ext in ('png', 'jpg'):
        cover_path = os.path.join(CONTENT_DIR, f"{target_date}-cover.{ext}")
        if os.path.exists(cover_path):
            cover_url = cover_path
            break

    # Check for carousel
    carousel_dir = os.path.join(CONTENT_DIR, f"{target_date}-carousel")
    if os.path.isdir(carousel_dir):
        slides = sorted([f for f in os.listdir(carousel_dir) if f.endswith(('.png', '.jpg'))])
        if slides:
            cover_url = os.path.join(carousel_dir, slides[0])

    return caption, li_post, cover_url


# ---- APPROVAL FLOW ----

def request_approval(target_date):
    """
    Send content preview to Telegram with Approve/Reject buttons.
    Polls for response. Returns dict with:
      - approved: True/False
      - reason: str (rejection reason, empty if approved)
      - timeout: True if no response within POLL_TIMEOUT
    """
    chat_id = get_chat_id()
    if not chat_id:
        return {"approved": False, "reason": "chat_id nao configurado", "timeout": False}

    caption, li_post, cover_path = load_preview(target_date)

    # Build preview message
    preview_parts = [f"*OPES Marketing — {target_date}*\n"]
    preview_parts.append("Conteudo pronto para publicacao.\n")

    if caption:
        # Truncate for Telegram (max ~4096 chars)
        preview_text = caption[:500]
        if len(caption) > 500:
            preview_text += "..."
        preview_parts.append(f"*Instagram:*\n{preview_text}\n")

    if li_post:
        li_preview = li_post[:300]
        if len(li_post) > 300:
            li_preview += "..."
        preview_parts.append(f"*LinkedIn:*\n{li_preview}")

    # Check carousel
    carousel_dir = os.path.join(CONTENT_DIR, f"{target_date}-carousel")
    if os.path.isdir(carousel_dir):
        slides = [f for f in os.listdir(carousel_dir) if f.endswith(('.png', '.jpg'))]
        preview_parts.append(f"\nTipo: CARROSSEL ({len(slides)} slides)")

    preview_msg = "\n".join(preview_parts)

    # Send preview text
    print(f"  Enviando preview para Telegram...", flush=True)
    send_message(chat_id, preview_msg)

    # Send cover image if available (upload local file)
    if cover_path and os.path.exists(cover_path):
        _send_photo_file(chat_id, cover_path)

    # Send approval buttons
    approval_markup = {
        "inline_keyboard": [
            [
                {"text": "Aprovar", "callback_data": "approve"},
                {"text": "Reprovar", "callback_data": "reject"},
            ]
        ]
    }
    btn_result = send_message(chat_id, "Publicar este conteudo?", reply_markup=approval_markup)
    btn_msg_id = btn_result["result"]["message_id"] if btn_result and btn_result.get("ok") else None

    # Flush old updates before polling
    last_update_id = _get_last_update_id()
    if last_update_id > 0:
        _tg_request("getUpdates", {"offset": last_update_id + 1, "timeout": 0})

    # Poll for response using short-polling (check every 2s)
    print(f"  Aguardando resposta (timeout: {POLL_TIMEOUT // 60}min)...", flush=True)
    start_time = time.time()

    while time.time() - start_time < POLL_TIMEOUT:
        result = _tg_request("getUpdates", {
            "offset": last_update_id + 1,
            "timeout": 0,
        })

        if result and result.get("ok"):
            for update in result.get("result", []):
                last_update_id = update["update_id"]

                # Check for callback query (inline button)
                cb = update.get("callback_query")
                if cb and cb.get("message", {}).get("chat", {}).get("id") == chat_id:
                    action = cb.get("data")
                    answer_callback_query(cb["id"], "Recebido!")

                    if action == "approve":
                        if btn_msg_id:
                            edit_message_text(chat_id, btn_msg_id, "APROVADO. Publicando agora...")
                        else:
                            send_message(chat_id, "Aprovado! Publicando agora...")
                        print(f"  APROVADO via Telegram", flush=True)
                        return {"approved": True, "reason": "", "timeout": False}

                    elif action == "reject":
                        if btn_msg_id:
                            edit_message_text(chat_id, btn_msg_id, "REPROVADO. Digite o motivo:")
                        else:
                            send_message(chat_id, "Reprovado. Digite o motivo da reprovacao:")
                        reason = _wait_for_text(chat_id, last_update_id)
                        print(f"  REPROVADO: {reason}", flush=True)
                        return {"approved": False, "reason": reason, "timeout": False}

                # Check for text message (in case buttons don't work)
                msg = update.get("message")
                if msg and msg.get("chat", {}).get("id") == chat_id:
                    text = (msg.get("text") or "").strip().lower()
                    if text in ("aprovar", "sim", "ok", "go", "s"):
                        send_message(chat_id, "Aprovado! Publicando agora...")
                        print(f"  APROVADO via texto", flush=True)
                        return {"approved": True, "reason": "", "timeout": False}
                    elif text in ("reprovar", "nao", "n", "rejeitar"):
                        send_message(chat_id, "Reprovado. Digite o motivo:")
                        reason = _wait_for_text(chat_id, last_update_id)
                        print(f"  REPROVADO via texto: {reason}", flush=True)
                        return {"approved": False, "reason": reason, "timeout": False}

        time.sleep(2)

    # Timeout
    send_message(chat_id, f"Timeout ({POLL_TIMEOUT // 60}min). Conteudo NAO foi publicado. Rode novamente quando quiser.")
    print(f"  TIMEOUT — sem resposta em {POLL_TIMEOUT // 60}min")
    return {"approved": False, "reason": "timeout", "timeout": True}


def _send_photo_file(chat_id, file_path):
    """Upload a local photo file to Telegram."""
    import subprocess
    result = subprocess.run(
        ['curl', '-s', '-X', 'POST',
         f'{API_BASE}/sendPhoto',
         '-F', f'chat_id={chat_id}',
         '-F', f'photo=@{file_path}'],
        capture_output=True, text=True, timeout=30
    )
    return result.returncode == 0


def _get_last_update_id():
    """Get the last update_id to avoid processing old messages."""
    result = _tg_request("getUpdates", {"limit": 100, "timeout": 0})
    if result and result.get("ok") and result.get("result"):
        return result["result"][-1]["update_id"]
    return 0


def _wait_for_text(chat_id, last_update_id, timeout=120):
    """Wait for a text message from the user (for rejection reason)."""
    start = time.time()
    while time.time() - start < timeout:
        result = _tg_request("getUpdates", {
            "offset": last_update_id + 1,
            "timeout": 5,
        })
        if result and result.get("ok"):
            for update in result.get("result", []):
                last_update_id = update["update_id"]
                msg = update.get("message")
                if msg and msg.get("chat", {}).get("id") == chat_id and msg.get("text"):
                    return msg["text"].strip()
        time.sleep(1)
    return "(sem motivo — timeout)"


def notify_published(chat_id, target_date, ig_id=None, li_id=None):
    """Notify that content was published successfully."""
    if not chat_id:
        chat_id = get_chat_id()
    if not chat_id:
        return

    parts = [f"*Publicado!* — {target_date}\n"]
    if li_id:
        parts.append(f"LinkedIn: `{li_id}`")
    if ig_id:
        parts.append(f"Instagram: `{ig_id}`")
    parts.append("\n_OPES Marketing Arm_")

    send_message(chat_id, "\n".join(parts))


# ---- CLI ----

def main():
    args = sys.argv[1:]

    if '--chat-id' in args:
        cid = get_chat_id()
        if cid:
            print(f"Chat ID: {cid}")
        else:
            print("Chat ID nao encontrado. Envie /start para o bot no Telegram.")
            sys.exit(1)
        return

    if '--test' in args:
        print("=== Telegram Bot Test ===")
        chat_id = get_chat_id()
        if not chat_id:
            print("FALHOU: Chat ID nao encontrado. Envie /start para o bot.")
            sys.exit(1)
        result = send_message(chat_id, "Teste do OPES Marketing Bot. Se voce esta lendo isso, o bot funciona!")
        if result and result.get("ok"):
            print(f"OK — Mensagem enviada para chat {chat_id}")
        else:
            print(f"FALHOU — Resposta: {result}")
            sys.exit(1)
        return

    if '--preview' in args:
        from datetime import date as dt
        idx = args.index('--preview')
        target = args[idx + 1] if idx + 1 < len(args) else dt.today().isoformat()
        print(f"=== Preview: {target} ===")
        result = request_approval(target)
        print(f"Resultado: {json.dumps(result, ensure_ascii=False)}")
        return

    # Default: show help
    print(__doc__)


if __name__ == '__main__':
    main()
