# Task: Transcribe Batch

## Purpose

Transcribe all downloaded videos in a directory or manifest, tracking progress and skipping already-transcribed files.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `manifest_path` | string | YES | Path to manifest.yaml |
| `language` | string | NO | Language hint for Whisper (default: auto-detect) |
| `whisper_model` | string | NO | Whisper model size (default: `base`) |
| `skip_existing` | boolean | NO | Skip videos that already have transcripts (default: true) |

## Steps

1. **Load manifest** — Parse manifest.yaml, select videos with status `done` (downloaded successfully).
2. **Check existing transcripts** — For each video, check if `.txt` and `.srt` already exist alongside the video file.
3. **Filter queue** — If `skip_existing` is true, exclude videos that already have both transcript files.
4. **Iterate videos** — For each video in queue:
   - Log `[N/total] Transcribing: {title}`
   - Call `transcribe-video` with video_path, language, whisper_model
   - On success: update manifest status → `transcribed`
   - On failure: log error, continue to next video
   - Save manifest after each video
5. **Summary** — Log totals: transcribed, skipped, failed.

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `manifest_path` | string | Updated manifest.yaml path |
| `transcribed` | number | Successfully transcribed count |
| `skipped` | number | Already-transcribed videos skipped |
| `failed` | number | Failed transcription count |
| `total` | number | Total eligible videos |

## Acceptance Criteria

- [ ] Only processes videos with status `done` in the manifest
- [ ] Skips already-transcribed videos when skip_existing is true
- [ ] Updates manifest status to `transcribed` after each success
- [ ] Saves manifest after each video for crash recovery
- [ ] Continues processing on individual video failure (no abort)
- [ ] Logs progress as [N/total] for each video
- [ ] Reports final summary with transcribed/skipped/failed counts
