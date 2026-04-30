---
name: vimeo-kb
type: knowledge-base
squad: vimeo
version: 1.0.0
last_updated: 2026-04-13
---

# Vimeo Knowledge Base

Reference guide for downloading, authenticating, and troubleshooting Vimeo video downloads using yt-dlp.

---

## yt-dlp Vimeo-Specific Flags

### Essential Flags

```bash
# Download best quality (video + audio merged)
yt-dlp -f "bv*+ba/b" URL

# Download specific resolution
yt-dlp -f "bv[height<=1080]+ba/b[height<=1080]" URL

# List available formats
yt-dlp -F URL

# Simulate (no download, test URL)
yt-dlp --simulate URL

# Extract metadata as JSON
yt-dlp --dump-json URL

# Download with metadata sidecar
yt-dlp --write-info-json URL

# Download thumbnail
yt-dlp --write-thumbnail URL

# Embed subtitles in video
yt-dlp --embed-subs --sub-langs all URL
```

### Output Templates

```bash
# Structured output path
yt-dlp -o "%(uploader)s/%(title)s/%(title)s.%(ext)s" URL

# With playlist index
yt-dlp -o "%(playlist_title)s/%(playlist_index)03d-%(title)s.%(ext)s" URL

# Sanitize filenames
yt-dlp --restrict-filenames -o "%(title)s-%(id)s.%(ext)s" URL
```

### Batch & Playlist Flags

```bash
# Download entire playlist
yt-dlp --yes-playlist URL

# Download playlist range
yt-dlp --playlist-items 1-10 URL

# Download from file of URLs
yt-dlp -a urls.txt

# Skip already downloaded
yt-dlp --download-archive downloaded.txt URL

# Limit concurrent downloads (via xargs or parallel)
cat urls.txt | xargs -P 3 -I {} yt-dlp {}
```

### Rate & Network

```bash
# Rate limit
yt-dlp --limit-rate 5M URL

# Retry on failure
yt-dlp --retries 10 --fragment-retries 10 URL

# Sleep between downloads (avoid rate limiting)
yt-dlp --sleep-interval 5 --max-sleep-interval 30 URL

# Use specific network interface/proxy
yt-dlp --proxy socks5://127.0.0.1:1080 URL
```

---

## Authentication Methods

### 1. Cookies (Recommended for Private/Paid Content)

Export cookies from browser using a cookies extension, then:

```bash
# From file
yt-dlp --cookies cookies.txt URL

# From browser directly (requires browser to be closed)
yt-dlp --cookies-from-browser chrome URL
yt-dlp --cookies-from-browser firefox URL
yt-dlp --cookies-from-browser safari URL
```

**When to use:** Vimeo On Demand, subscription content, private videos shared via logged-in access.

### 2. Password-Protected Videos

```bash
# Video with password
yt-dlp --video-password "MY_PASSWORD" URL
```

**When to use:** Videos with Vimeo's native password protection (shared links with password).

### 3. Referer-Based Access

```bash
# Embedded videos that require specific referer
yt-dlp --referer "https://example.com/course-page" URL

# Sometimes also need custom headers
yt-dlp --add-header "Origin: https://example.com" --referer "https://example.com" URL
```

**When to use:** Vimeo videos embedded on third-party sites with domain restrictions.

### 4. Vimeo API Token

```bash
# Not used directly by yt-dlp but useful for pre-crawling
# Generate at: https://developer.vimeo.com/apps
# Use for API-based metadata extraction before download
curl -H "Authorization: bearer YOUR_TOKEN" \
  "https://api.vimeo.com/videos/123456789"
```

---

## Quality Selection Guide

| Goal | yt-dlp Format String | Notes |
|------|----------------------|-------|
| Best possible | `-f "bv*+ba/b"` | Merges best video + best audio |
| 1080p max | `-f "bv[height<=1080]+ba/b[height<=1080]"` | Cap at Full HD |
| 720p max | `-f "bv[height<=720]+ba/b[height<=720]"` | Good balance of size/quality |
| 480p max | `-f "bv[height<=480]+ba/b[height<=480]"` | Smaller files |
| Audio only | `-f "ba/b" -x --audio-format mp3` | Extract audio, convert to MP3 |
| Smallest file | `-f "wv*+wa/w"` | Worst quality (for testing) |
| Specific format | `-f "bestvideo[ext=mp4]+bestaudio[ext=m4a]"` | Force MP4 container |

### Format Preference Order

For Vimeo, prefer these codecs:
1. **h264 + AAC in MP4** — Maximum compatibility
2. **VP9 + Opus in WebM** — Better compression, less compatible
3. **AV1** — Rare on Vimeo but best compression

```bash
# Force MP4 output (re-mux if needed)
yt-dlp -f "bv[ext=mp4]+ba[ext=m4a]/b[ext=mp4]" --merge-output-format mp4 URL
```

---

## Common Errors and Fixes

### ERROR: Unable to extract video ID

**Cause:** Invalid or unsupported Vimeo URL format.
**Fix:** Ensure URL is `https://vimeo.com/{numeric_id}` or a known collection URL.

```bash
# Valid formats:
# https://vimeo.com/123456789
# https://vimeo.com/channels/staffpicks
# https://vimeo.com/showcase/12345
# https://vimeo.com/album/12345
# https://player.vimeo.com/video/123456789
```

### ERROR: 403 Forbidden

**Cause:** Video is private, domain-restricted, or requires authentication.
**Fix:**
1. Try `--cookies-from-browser chrome`
2. Try `--referer "https://original-site.com"`
3. Try `--video-password "password"` if password-protected
4. Check if video exists and is still available

### ERROR: 404 Not Found

**Cause:** Video deleted or URL incorrect.
**Fix:** Verify URL manually in browser. No recovery if content is removed.

### ERROR: HTTP Error 429 (Too Many Requests)

**Cause:** Rate limited by Vimeo.
**Fix:**
```bash
yt-dlp --sleep-interval 10 --max-sleep-interval 60 --retries 10 URL
```
For large batches, add longer delays between videos.

### ERROR: Requested format not available

**Cause:** Video does not have the requested quality.
**Fix:** List formats first with `-F`, then pick available one.
```bash
yt-dlp -F URL  # see available
yt-dlp -f "bv*+ba/b" URL  # fallback to best available
```

### ERROR: ffmpeg not found

**Cause:** ffmpeg not installed or not in PATH.
**Fix:**
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg

# Verify
ffmpeg -version
```

### ERROR: Unable to merge video + audio (incomplete download)

**Cause:** Partial download, network interruption.
**Fix:**
```bash
# Remove partial files and retry
rm -f *.part *.temp
yt-dlp --force-overwrites URL
```

### WARNING: Video is DRM protected

**Cause:** Vimeo OTT or enterprise DRM content.
**Fix:** DRM content cannot be downloaded with yt-dlp. No workaround available. Respect content protection.

---

## Vimeo URL Patterns

| Pattern | Type | Example |
|---------|------|---------|
| `vimeo.com/{id}` | Single video | `vimeo.com/123456789` |
| `vimeo.com/{user}/videos` | User videos | `vimeo.com/johndoe/videos` |
| `vimeo.com/channels/{name}` | Channel | `vimeo.com/channels/staffpicks` |
| `vimeo.com/showcase/{id}` | Showcase | `vimeo.com/showcase/12345` |
| `vimeo.com/album/{id}` | Album (legacy) | `vimeo.com/album/67890` |
| `vimeo.com/groups/{name}` | Group | `vimeo.com/groups/motion` |
| `player.vimeo.com/video/{id}` | Embed player | `player.vimeo.com/video/123456789` |
| `vimeo.com/ondemand/{title}` | On Demand | `vimeo.com/ondemand/mytitle` |

---

## Whisper Transcription Reference

### Model Selection

| Model | Size | Speed | Accuracy | Recommended For |
|-------|------|-------|----------|-----------------|
| `tiny` | 39 MB | Very fast | Low | Quick previews |
| `base` | 74 MB | Fast | Moderate | Draft transcripts |
| `small` | 244 MB | Medium | Good | General use |
| `medium` | 769 MB | Slow | Very good | Important content |
| `large-v3` | 1.5 GB | Very slow | Best | Critical/professional |

### Basic Usage

```bash
# Transcribe to text
whisper video.mp4 --model small --language auto --output_format txt

# Generate SRT subtitles
whisper video.mp4 --model small --output_format srt

# Multiple output formats
whisper video.mp4 --model small --output_format all

# Specify language (faster if known)
whisper video.mp4 --model small --language pt
```

### Batch Transcription

```bash
# Transcribe all MP4 files in directory
for f in *.mp4; do
  whisper "$f" --model small --output_dir ./transcripts/ --output_format txt
done
```

---

## Legal Notes

### Vimeo Terms of Service

- Downloading Vimeo content may violate Vimeo's Terms of Service unless explicitly permitted by the content creator.
- Always verify that you have the right to download content before proceeding.
- Respect content creators' distribution choices.

### Legitimate Use Cases

- **Your own content** — Downloading your own uploaded videos for backup.
- **Explicit permission** — Content creator has granted download permission.
- **Download-enabled videos** — Videos where the creator has enabled the download button.
- **Purchased content** — Vimeo On Demand purchases for offline viewing (check license terms).
- **Educational fair use** — May apply in limited circumstances (varies by jurisdiction).

### What NOT to Do

- Do not redistribute downloaded content without permission.
- Do not circumvent DRM protections.
- Do not download and re-upload content as your own.
- Do not use downloads for commercial purposes without a license.
- Do not scrape Vimeo at scale in ways that impact their service.

### Disclaimer

This tool is provided for legitimate use cases only. Users are responsible for ensuring their use complies with applicable laws and Vimeo's Terms of Service. The squad authors assume no liability for misuse.
