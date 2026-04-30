# Task: Download Batch

## Purpose

Orchestrate the download of N videos from a manifest, tracking progress and updating status for each video. Supports resume via download archive.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `manifest_path` | string | YES | Path to manifest.yaml |
| `quality` | string | NO | Quality preset passed to download-single (default: `best`) |
| `cookies_file` | string | NO | Path to cookies.txt |
| `concurrency` | number | NO | Parallel downloads (default: 1, max: 3) |
| `retry_failed` | boolean | NO | Re-attempt videos with status `error` (default: false) |

## Steps

1. **Load manifest** — Parse manifest.yaml, validate schema.
2. **Filter videos** — Select videos with status `pending` (or `error` if `retry_failed` is true).
3. **Initialize archive** — Create/load `download-archive.txt` in output dir for yt-dlp `--download-archive` resume support.
4. **Iterate videos** — For each video:
   - Update manifest status: `pending` → `downloading`
   - Call `download-single` with video URL and output_path
   - On success: update status → `done`, record file_size
   - On failure: update status → `error`, record error_msg
   - Save manifest after each video (crash recovery)
5. **Track progress** — Log `[N/total]` after each download. Calculate ETA from average download time.
6. **Summary** — After all videos processed, log totals: done, error, skipped.

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `manifest_path` | string | Updated manifest.yaml path |
| `total` | number | Total videos in manifest |
| `downloaded` | number | Successfully downloaded count |
| `failed` | number | Failed download count |
| `skipped` | number | Already-done videos skipped |

## Acceptance Criteria

- [ ] Reads manifest and processes only pending (or error with retry) videos
- [ ] Updates manifest status after each individual download
- [ ] Saves manifest after each video for crash recovery
- [ ] Uses --download-archive for native yt-dlp resume support
- [ ] Logs progress as [N/total] with running count
- [ ] Handles partial runs gracefully (resume from where it stopped)
- [ ] Skips already-done videos without re-downloading
- [ ] Reports final summary with done/error/skipped counts
