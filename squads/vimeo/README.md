# Vimeo Squad

Squad pipeline para download batch de videos do Vimeo com transcricao automatica.

Suporta playlists, channels, showcases, albums e videos individuais.

**Stack:** yt-dlp + ffmpeg + Whisper

---

## Quick Start

```bash
# Download de video unico
@vimeo-chief *download https://vimeo.com/123456789

# Download de playlist inteira
@vimeo-chief *download-batch https://vimeo.com/showcase/12345

# Download com opcoes
@vimeo-chief *download-batch https://vimeo.com/channels/staffpicks \
  --quality 1080p \
  --transcribe true \
  --output ./videos/
```

---

## Agents

| Agent | Role | Responsabilidade |
|-------|------|------------------|
| **vimeo-chief** | Orchestrator | Coordena o pipeline completo |
| **crawler** | Tier 1 | Detecta tipo de URL e extrai lista de videos |
| **downloader** | Tier 1 | Executa downloads via yt-dlp |
| **transcriber** | Tier 1 | Transcreve audio via Whisper |
| **librarian** | Tier 1 | Organiza arquivos e mantem catalogo |

---

## Commands

| Command | Description |
|---------|-------------|
| `*download {url}` | Download de video unico |
| `*download-batch {url}` | Download batch (playlist/channel/showcase) |
| `*transcribe {path}` | Transcrever video ja baixado |
| `*catalog` | Listar catalogo de videos baixados |
| `*status` | Status do download em andamento |
| `*help` | Mostrar comandos disponiveis |

---

## Pipeline Flow

```
URL Input
    |
    v
[1. DETECT] ---- Identifica tipo de URL (single/playlist/channel/showcase/album)
    |
    v
[2. CRAWL] ----- Extrai lista de videos e metadados
    |
    v
[3. MANIFEST] -- Gera manifesto YAML com todos os videos
    |
    v
[4. DOWNLOAD] -- Baixa videos via yt-dlp (retry automatico, 3 tentativas)
    |
    v
[5. TRANSCRIBE]  Transcreve audio via Whisper (opcional, non-blocking)
    |
    v
[6. ORGANIZE] -- Move arquivos para estrutura de pastas organizada
    |
    v
[7. REPORT] ---- Gera relatorio final com estatisticas
    |
    v
  DONE
```

### Output Structure

```
output_dir/
  {collection_name}/
    01-{video_title}/
      {video_title}.mp4          # video
      {video_title}.json         # metadata
      {video_title}.txt          # transcript
      {video_title}.srt          # subtitles
    02-{video_title}/
      ...
    manifest.yaml                # download manifest
    report.md                    # final report
    catalog.yaml                 # catalog entries
```

---

## Workflows

| Workflow | File | Description |
|----------|------|-------------|
| **Batch Download** | `workflows/wf-download-batch.yaml` | Pipeline completo com state machine (10 estados) |
| **Single Download** | `workflows/wf-download-single.yaml` | Atalho simplificado para 1 video (6 estados) |

---

## Requirements

### Required

| Tool | Version | Install | Purpose |
|------|---------|---------|---------|
| **yt-dlp** | latest | `pip install yt-dlp` ou `brew install yt-dlp` | Download engine |
| **ffmpeg** | 4.0+ | `brew install ffmpeg` ou `apt install ffmpeg` | Audio extraction, video muxing |

### Optional

| Tool | Version | Install | Purpose |
|------|---------|---------|---------|
| **whisper** | latest | `pip install openai-whisper` | Transcricao local |
| **whisper-api** | - | OpenAI API key | Transcricao via API (mais rapido) |

### Verify Installation

```bash
yt-dlp --version
ffmpeg -version
whisper --help    # se usando transcricao local
```

---

## Authentication

Para videos privados ou protegidos, configure autenticacao:

```yaml
# Cookies (recomendado)
auth:
  method: cookies
  cookies_file: ./cookies.txt

# Senha
auth:
  method: password
  password: "my_password"

# Referer (para embeds restritos)
auth:
  method: referer
  referer: "https://site-origem.com/pagina"
```

Consulte `data/vimeo-kb.md` para detalhes completos sobre autenticacao.

---

## Files

```
squads/vimeo/
  config.yaml                              # Squad configuration
  README.md                                # This file
  agents/                                  # Agent definitions
  tasks/                                   # Task definitions
  workflows/
    wf-download-batch.yaml                 # Batch download pipeline
    wf-download-single.yaml                # Single video download
  templates/
    manifest-tmpl.yaml                     # Download manifest template
    download-report-tmpl.md                # Post-download report template
    catalog-entry-tmpl.yaml                # Catalog entry template
  checklists/
    download-quality.md                    # Pre/post download quality checks
  data/
    vimeo-kb.md                            # Vimeo knowledge base
  config/                                  # Runtime configuration
```

---

*Synkra AIOX — Vimeo Squad v1.0.0*
