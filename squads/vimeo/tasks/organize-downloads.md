# Task: Organize Downloads

## Purpose

Organize downloaded files into a clean folder structure with consistent naming. Group video, metadata, and transcript files together.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `manifest_path` | string | YES | Path to manifest.yaml |
| `output_dir` | string | YES | Base output directory |

## Steps

1. **Load manifest** — Parse manifest.yaml to get video list and source_name.
2. **Create output structure** — Create `{output_dir}/{source_name}/` directory.
3. **Rename and move files** — For each video with status `done` or `transcribed`:
   - **Sanitize title** — Lowercase, replace spaces with hyphens, remove special chars, truncate to 80 chars.
   - **Number prefix** — Zero-padded index: `{NN}` (01, 02, ...).
   - **Move video** — `{NN}-{sanitized-title}.mp4`
   - **Move metadata** — `{NN}-{sanitized-title}.info.json`
   - **Move thumbnail** — `{NN}-{sanitized-title}.jpg` (if exists)
   - **Move transcript** — `{NN}-{sanitized-title}.txt` and `.srt`
4. **Update manifest** — Update `output_path` for each moved file.
5. **Generate catalog** — Create `catalog.txt` in output dir listing all files with their original titles.
6. **Verify** — Confirm all expected files exist at new locations.

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `output_dir` | string | Path to organized output directory |
| `files_moved` | number | Total files moved |
| `catalog_path` | string | Path to catalog.txt |

### Output Structure

```
{output_dir}/{source_name}/
  01-introduction-to-the-course.mp4
  01-introduction-to-the-course.info.json
  01-introduction-to-the-course.txt
  01-introduction-to-the-course.srt
  02-getting-started.mp4
  02-getting-started.info.json
  02-getting-started.txt
  02-getting-started.srt
  catalog.txt
```

## Acceptance Criteria

- [ ] Creates clean folder structure under output_dir
- [ ] Renames files with zero-padded index and sanitized title
- [ ] Groups video + metadata + transcript files together by name
- [ ] Updates manifest with new output_path values
- [ ] Generates catalog.txt with file listing and original titles
- [ ] Handles missing files gracefully (e.g., no thumbnail, no transcript)
- [ ] Preserves file integrity (no corruption during move)
