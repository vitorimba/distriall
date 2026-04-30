---
name: download-quality
type: checklist
squad: vimeo
used_by:
  - wf-download-batch
  - wf-download-single
  - download-batch
  - download-single
---

# Download Quality Checklist

Quality gates applied before and after downloading Vimeo videos.

---

## Pre-Download Checks

- [ ] **URL accessible** — URL returns HTTP 200 (or 301/302 redirect that resolves)
- [ ] **URL format valid** — Matches known Vimeo patterns (`vimeo.com/{id}`, `/channels/`, `/showcase/`, `/album/`, etc.)
- [ ] **Auth configured if needed** — Private/password-protected videos have cookies, password, or referer set
- [ ] **Auth credentials valid** — Test auth with `yt-dlp --simulate` before full download
- [ ] **Disk space sufficient** — At least 2x estimated download size available in output directory
- [ ] **Output directory writable** — Permissions confirmed on target path
- [ ] **yt-dlp version current** — Running latest stable version (`yt-dlp --version`)
- [ ] **ffmpeg available** — `ffmpeg -version` returns valid output
- [ ] **No duplicate downloads** — Video ID not already present in local catalog
- [ ] **Quality format available** — Requested quality exists for this video (`yt-dlp -F` to list)

---

## Post-Download Checks

- [ ] **Video file exists** — File created at expected output path
- [ ] **Video file valid** — File size > 0 bytes and > minimum threshold (100 KB)
- [ ] **Video playable** — `ffprobe` can read file metadata without errors
- [ ] **Correct duration** — Downloaded file duration matches expected (within 5% tolerance)
- [ ] **Correct resolution** — Downloaded resolution matches requested quality
- [ ] **Metadata JSON saved** — `.json` sidecar file with video info exists alongside video
- [ ] **Metadata complete** — JSON contains: title, id, duration, uploader, upload_date, description
- [ ] **Transcript generated** — `.txt` transcript file exists (if transcription enabled)
- [ ] **Transcript non-empty** — Transcript file size > 0 bytes and contains text content
- [ ] **Subtitles generated** — `.srt` subtitle file exists (if subtitle generation enabled)
- [ ] **Files organized correctly** — Video, metadata, and transcript in proper directory structure
- [ ] **Catalog entry created** — Video registered in catalog with all required fields
- [ ] **Manifest updated** — Video status in manifest set to `completed` with file paths

---

## Error Recovery Checks

- [ ] **Partial downloads cleaned** — No `.part` or `.temp` files left in output directory
- [ ] **Failed entries logged** — All failures recorded in manifest with error type and message
- [ ] **Retry attempts exhausted** — Failed videos retried up to max (3) before marking as failed
- [ ] **Network errors distinguished** — Transient errors (timeout, 429) separated from permanent (404, 403)

---

## Notes

- Run pre-download checks before each batch, not just per-video
- Post-download checks run per-video immediately after each download completes
- If any critical post-download check fails, mark video as `failed` in manifest and continue with next
- Keep `ffprobe` validation fast: only read headers, do not decode full stream
