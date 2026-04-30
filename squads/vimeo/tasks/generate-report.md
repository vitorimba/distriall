# Task: Generate Report

## Purpose

Generate a markdown report summarizing the entire batch operation: downloads, failures, transcriptions, and overall statistics.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `manifest_path` | string | YES | Path to manifest.yaml |
| `output_dir` | string | YES | Base output directory (report saved here) |

## Steps

1. **Load manifest** — Parse manifest.yaml with all video entries and metadata.
2. **Compute statistics:**
   - Total videos in manifest
   - Downloaded successfully (status `done` or `transcribed`)
   - Failed downloads (status `error`) with error types
   - Transcribed count
   - Total file size (sum of all downloaded files)
   - Total duration (sum of all video durations)
3. **Build per-video table** — For each video: index, title (truncated), duration, status, file size, transcript status.
4. **Build error section** — List failed videos with error type and URL.
5. **Write report** — Save as `{output_dir}/report.md`.

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `report_path` | string | Path to generated report.md |

### Report Template

```markdown
# Vimeo Batch Report

**Source:** {source_url}
**Date:** {generated_at}
**Total Videos:** {total_count}

## Summary

| Metric | Value |
|--------|-------|
| Downloaded | {done_count}/{total_count} |
| Failed | {error_count} |
| Transcribed | {transcribed_count} |
| Total Size | {total_size_human} |
| Total Duration | {total_duration_human} |

## Videos

| # | Title | Duration | Size | Status | Transcript |
|---|-------|----------|------|--------|------------|
| 01 | Introduction to... | 12:34 | 245 MB | done | yes |
| 02 | Getting Started... | 08:21 | 180 MB | done | yes |
| 03 | Advanced Topics... | -- | -- | error | -- |

## Errors

| # | Title | Error | URL |
|---|-------|-------|-----|
| 03 | Advanced Topics | private_video | https://vimeo.com/... |
```

## Acceptance Criteria

- [ ] Report includes source URL, date, and total count in header
- [ ] Summary table shows downloaded/failed/transcribed counts and sizes
- [ ] Per-video table lists every video with status and transcript info
- [ ] Error section lists all failed videos with specific error types
- [ ] File sizes displayed in human-readable format (MB/GB)
- [ ] Durations displayed as HH:MM:SS or MM:SS
- [ ] Report is valid markdown that renders correctly
- [ ] Saved to output_dir as report.md
