# SwinGallery website

A plain static site (HTML + CSS, no framework), built from the SwinGallery design system.

## Editing

- Page content lives in `src/*.html`. The shared head, header and footer live in `src/_partials/`.
- After editing, run `python3 build.py` to regenerate the pages at the top level.
- Styles are in `styles.css`; icons are in `icons.svg` (Lucide).

## Special events

`events.json` holds upcoming special events (band nights, theme nights, workshops). The home and Events pages show the next few automatically. An empty list (`[]`) shows a "See events on Facebook" link instead.

Each event:

```json
{ "title": "Live Band Night", "start": "2026-11-12T21:00:00-05:00", "end": "2026-11-12T23:30:00-05:00", "url": "https://www.facebook.com/events/..." }
```

The weekly schedule (7:30 classes, 8:30 beginner lesson, 9:00–11:30 dance) is written into the pages because it doesn't change.

## Hosting

Any static host works (Netlify, Cloudflare Pages, GitHub Pages). Publish this folder as-is; there is no build step on the server.
