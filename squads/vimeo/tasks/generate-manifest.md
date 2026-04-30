# Task: Generate Manifest

## Purpose

Create a `manifest.yaml` file from crawl results that serves as the central tracking document for the entire download and transcription pipeline.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `videos` | array | YES | Video list from crawl-playlist or crawl-channel |
| `source_url` | string | YES | Original URL that was crawled |
| `output_dir` | string | YES | Base directory for downloads |
| `source_name` | string | NO | Human-readable name for the source (auto-detected if omitted) |

## Steps

1. **Build metadata header** — Set `source_url`, `source_name`, `crawled_at` (ISO 8601), `total_count`.
2. **Build video entries** — For each video, create entry with:
   - `id`: Vimeo video ID
   - `url`: Full video URL
   - `title`: Original title
   - `duration`: Duration in seconds
   - `status`: `pending` (initial state)
   - `output_path`: `{output_dir}/{source_name}/{NN}-{sanitized_title}.{ext}`
3. **Sanitize titles** — Remove special characters, truncate to 80 chars, replace spaces with hyphens.
4. **Write manifest** — Save as `{output_dir}/manifest.yaml`.
5. **Validate** — Ensure all required fields are populated, no duplicate IDs.

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `manifest_path` | string | Absolute path to generated manifest.yaml |
| `total_count` | number | Number of video entries |

### Manifest Schema

```yaml
metadata:
  source_url: "https://vimeo.com/..."
  source_name: "channel-name"
  crawled_at: "2026-04-13T10:00:00Z"
  total_count: 25
videos:
  - id: "123456789"
    url: "https://vimeo.com/123456789"
    title: "Original Video Title"
    duration: 3600
    status: pending  # pending | downloading | done | error | transcribed
    output_path: "downloads/channel-name/01-original-video-title.mp4"
    error_msg: null
```

## Acceptance Criteria

- [ ] Generates valid YAML that can be parsed without errors
- [ ] All video entries have id, url, title, duration, status, output_path
- [ ] Status is initialized to `pending` for all entries
- [ ] Titles are sanitized (no special chars, max 80 chars)
- [ ] No duplicate video IDs in the manifest
- [ ] Metadata section includes source_url, crawled_at, total_count
