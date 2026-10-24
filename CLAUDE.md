# SwinGallery website

Static site for SwinGallery (swingallery.org), hosted on GitHub Pages from the `main` branch. Pushing to `main` publishes the live site within a minute or two.

## Making changes
- Edit page content in `src/*.html` and shared header/footer/head in `src/_partials/`, then run `python3 build.py`. Never hand-edit the built top-level `*.html` files.
- Styles: `styles.css` (tokens from the SwinGallery design system, https://claude.ai/artifact/QbsZPKe6BAJipoqsMrjheR). Icons: `icons.svg` (Lucide).
- Special events (band nights, theme nights, workshops) go in `events.json`; past events drop off automatically. The weekly Thursday schedule is written into the pages.
- Preview locally with `python3 -m http.server 8765` and check desktop and phone widths before pushing.
- Commit with a plain description of what changed, then `git push`.

## Content rules
- Facts (times, prices, address, team) must come from the owners or the old WordPress site; don't invent them.
- Follow the design system README: Montserrat, maroon leads / gold accents, no gold text on light backgrounds, no emoji.
- Team photos only for people currently on the team, as approved.
