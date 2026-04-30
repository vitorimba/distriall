# Task: Crawl Playlist

## Purpose

Extract the complete list of videos from a Vimeo playlist or showcase, producing structured metadata for each video.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | YES | Vimeo playlist or showcase URL |
| `cookies_file` | string | NO | Path to cookies.txt for authenticated access |

## Steps

1. **Run yt-dlp crawl** — Execute `yt-dlp --flat-playlist --print-json "{url}"` to get one JSON object per line per video.
2. **Parse JSON lines** — For each line, extract: `id`, `url`, `title`, `duration` (seconds), `upload_date` (YYYYMMDD).
3. **Handle pagination** — yt-dlp handles Vimeo pagination automatically. Verify all entries are captured by comparing count with playlist metadata.
4. **Build video list** — Assemble array of video objects sorted by playlist order.
5. **Save to manifest** — Write results to `manifest.yaml` via `generate-manifest` task or return raw list.

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `videos` | array | List of `{id, url, title, duration, upload_date}` |
| `playlist_title` | string | Name of the playlist/showcase |
| `total_count` | number | Total videos found |

## Acceptance Criteria

- [ ] Extracts all videos from the playlist (no missing entries)
- [ ] Each video has id, url, title, duration, and upload_date populated
- [ ] Handles playlists with 100+ videos (pagination)
- [ ] Handles private playlists when cookies_file is provided
- [ ] Returns empty list with warning for empty playlists
- [ ] Does not download any video content
