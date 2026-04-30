# Task: Detect URL Type

## Purpose

Determine the type of a Vimeo URL (single video, playlist, channel, or showcase) to route the pipeline correctly.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | YES | Vimeo URL to analyze |

## Steps

1. **Validate URL** — Confirm the URL belongs to a Vimeo domain (`vimeo.com`, `player.vimeo.com`).
2. **Probe with yt-dlp** — Run `yt-dlp --flat-playlist --print-json "{url}"` to extract metadata without downloading.
3. **Analyze response** — Count entries returned:
   - **1 entry, no playlist metadata** → `single`
   - **Multiple entries with playlist title** → `playlist`
   - **Multiple entries from `/channels/` path** → `channel`
   - **Multiple entries from `/showcase/` path** → `showcase`
4. **Handle errors** — If yt-dlp fails (private, 404, auth required), capture error type and return it.

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `url_type` | enum | `single` \| `playlist` \| `channel` \| `showcase` |
| `video_count` | number | Total videos detected (1 for single) |
| `source_url` | string | Original URL |
| `title` | string | Playlist/channel/showcase title (null for single) |
| `error` | string \| null | Error message if probe failed |

## Acceptance Criteria

- [ ] Correctly identifies single video URLs
- [ ] Correctly identifies playlist, channel, and showcase URLs
- [ ] Returns accurate video_count from flat-playlist probe
- [ ] Handles private/404/auth-required URLs gracefully with descriptive error
- [ ] Does not download any video content (flat-playlist only)
- [ ] Completes in under 30 seconds for any URL type
