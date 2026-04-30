# Task: Crawl Channel

## Purpose

Extract the complete list of videos from a Vimeo channel or user page, handling pagination for large channels.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | YES | Vimeo channel or user page URL |
| `cookies_file` | string | NO | Path to cookies.txt for authenticated access |
| `max_videos` | number | NO | Limit number of videos to crawl (default: all) |

## Steps

1. **Validate URL** — Confirm URL matches channel (`/channels/{name}`) or user (`/{username}/videos`) pattern.
2. **Run yt-dlp crawl** — Execute `yt-dlp --flat-playlist --print-json "{url}"`. yt-dlp handles Vimeo's page-based pagination internally.
3. **Parse JSON lines** — For each line, extract: `id`, `url`, `title`, `duration` (seconds), `upload_date` (YYYYMMDD).
4. **Apply max_videos limit** — If `max_videos` is set, stop after reaching the limit.
5. **Deduplicate** — Remove duplicate entries by video ID (channels may list videos in multiple sections).
6. **Sort by upload_date** — Newest first by default.

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `videos` | array | List of `{id, url, title, duration, upload_date}` |
| `channel_name` | string | Name of the channel/user |
| `total_count` | number | Total videos found |
| `truncated` | boolean | True if max_videos limit was applied |

## Acceptance Criteria

- [ ] Crawls all videos from channels with 500+ videos
- [ ] Handles pagination transparently
- [ ] Deduplicates videos by ID
- [ ] Respects max_videos limit when set
- [ ] Handles authenticated channels with cookies_file
- [ ] Returns structured metadata for every video found
- [ ] Does not download any video content
