# Task: Transcribe Video

## Purpose

Transcribe a single downloaded video. Prioritizes existing subtitles from yt-dlp; falls back to audio extraction + Whisper when no subtitles are available.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `video_path` | string | YES | Path to downloaded video file |
| `language` | string | NO | Language hint for Whisper (default: auto-detect) |
| `whisper_model` | string | NO | Whisper model size: `tiny`, `base`, `small`, `medium`, `large` (default: `base`) |

## Steps

1. **Check for existing subtitles** — Look for `.vtt`, `.srt`, or `.sub` files alongside the video (yt-dlp may have downloaded these).
2. **If subtitles exist:**
   - Parse subtitle file to extract plain text (strip timestamps/formatting).
   - Convert to `.txt` (plain) and `.srt` (timed) formats if not already present.
   - Skip Whisper entirely.
3. **If no subtitles:**
   - **Extract audio** — Run `ffmpeg -i "{video_path}" -vn -acodec pcm_s16le -ar 16000 -ac 1 "{audio_path}"` to create WAV.
   - **Run Whisper** — Execute `whisper "{audio_path}" --model {whisper_model} --language {language} --output_format all`.
   - **Collect outputs** — Whisper generates `.txt`, `.srt`, `.vtt`, `.json` files.
4. **Validate output** — Ensure `.txt` is non-empty and `.srt` has valid timestamp format.
5. **Cleanup** — Remove intermediate WAV file to save disk space.
6. **Save transcripts** — Place `.txt` and `.srt` alongside the video file.

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `txt_path` | string | Path to plain text transcript |
| `srt_path` | string | Path to timed SRT transcript |
| `source` | enum | `subtitle` \| `whisper` — which method was used |
| `language` | string | Detected or specified language |
| `success` | boolean | Whether transcription completed |
| `error` | string \| null | Error message if failed |

## Acceptance Criteria

- [ ] Uses existing subtitles when available (no Whisper needed)
- [ ] Falls back to Whisper when no subtitles exist
- [ ] Produces both .txt (plain) and .srt (timed) outputs
- [ ] Audio extraction uses 16kHz mono WAV for Whisper compatibility
- [ ] Cleans up intermediate audio files after transcription
- [ ] Reports which method was used (subtitle vs whisper)
- [ ] Handles Whisper failures gracefully with descriptive error
