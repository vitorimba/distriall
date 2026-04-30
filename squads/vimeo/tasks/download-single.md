# Task: Download Single Video

## Purpose

Download one Vimeo video using yt-dlp with quality selection, authentication support, and integrity verification.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | YES | Vimeo video URL |
| `output_path` | string | YES | Destination file path |
| `quality` | string | NO | Quality preset: `best`, `1080p`, `720p`, `480p` (default: `best`) |
| `cookies_file` | string | NO | Path to cookies.txt for authenticated/private videos |
| `password` | string | NO | Video password if password-protected |

## Steps

1. **Select quality** — Map quality preset to yt-dlp format string:
   - `best` → `-f "bestvideo+bestaudio/best"`
   - `1080p` → `-f "bestvideo[height<=1080]+bestaudio/best[height<=1080]"`
   - `720p` / `480p` → same pattern with respective height
2. **Build command** — Assemble yt-dlp command:
   ```
   yt-dlp {quality_flag} --merge-output-format mp4 \
     --write-info-json --write-thumbnail \
     --output "{output_path}" \
     {--cookies cookies_file} {--video-password password} \
     "{url}"
   ```
3. **Execute download** — Run with progress output. Capture stdout/stderr.
4. **Verify integrity** — Check file exists, size > 0, run `ffprobe` to validate container.
5. **Extract metadata** — Confirm `.info.json` sidecar was written with video metadata.
6. **Handle errors** — Detect and report specific failures:
   - **Private video** → return `error: private_video`
   - **DRM protected** → return `error: drm_protected`
   - **Rate limited** → return `error: rate_limited` with retry hint
   - **404 / removed** → return `error: not_found`
   - **Network failure** → return `error: network_error`

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `file_path` | string | Path to downloaded video file |
| `file_size` | number | File size in bytes |
| `metadata_path` | string | Path to .info.json sidecar |
| `duration` | number | Actual duration in seconds (from ffprobe) |
| `success` | boolean | Whether download completed successfully |
| `error` | string \| null | Error type if failed |

## Acceptance Criteria

- [ ] Downloads video in requested quality with audio+video merged to mp4
- [ ] Writes .info.json metadata sidecar alongside video
- [ ] Verifies file integrity with ffprobe after download
- [ ] Handles private videos with cookies or password
- [ ] Returns specific error types for each failure mode
- [ ] Does not crash on DRM-protected or removed videos
- [ ] Supports resume if partially downloaded (yt-dlp native)
