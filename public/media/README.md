# Hero media

The hero (`components/kashmir/Hero.tsx`) plays a pinned, full-screen background
video from this folder:

```
public/media/hero.webm   (preferred — smaller)
public/media/hero.mp4    (fallback — broadest support)
```

Neither file is committed. Until you add them the hero renders its `POSTER`
still frame instead, which is visually identical in layout — the sticky curtain
reveal works either way.

## Recommended encode

- 1920×1080, 8–12 s, seamless loop, **no audio track**
- H.264 `.mp4` at ~2–4 Mbps, plus VP9 `.webm` at ~1–2 Mbps
- Target under ~4 MB total; it is a background texture, not the subject

```bash
ffmpeg -i source.mov -t 10 -an -vf scale=1920:-2 -c:v libx264 -crf 24 -preset slow -movflags +faststart hero.mp4
ffmpeg -i source.mov -t 10 -an -vf scale=1920:-2 -c:v libvpx-vp9 -crf 34 -b:v 0 hero.webm
```

Also update `POSTER` in `Hero.tsx` to a frame from your own footage so the
still and the video match.
