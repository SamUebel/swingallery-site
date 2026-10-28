"""Builds the site's pages from src/ by wrapping each one in the shared
head, header and footer. Run `python3 build.py` after editing anything in src/.

Each src/*.html file starts with front matter lines:
    title: Page title
    description: One sentence for search results
    nav: home | events | visit | about | conduct | community
    ---
followed by the page's <main> content.
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"

NAV = [
    ("home", "index.html", "Home"),
    ("events", "events.html", "Events"),
    ("smorgasbord", "smorgasbord-2026.html", "Smorgasbord 2026"),
    ("visit", "visit.html", "Getting here"),
    ("about", "about.html", "About us"),
    ("conduct", "code-of-conduct.html", "Code of conduct"),
    ("community", "community.html", "Dance community"),
]


def render(name: str, text: str) -> str:
    meta_text, body = text.split("---\n", 1)
    meta = dict(line.split(": ", 1) for line in meta_text.strip().splitlines())
    current = ' aria-current="page"'
    nav_items = "\n".join(
        f'          <li><a class="nav__link" href="{href}"'
        f'{current if key == meta.get("nav") else ""}>{label}</a></li>'
        for key, href, label in NAV
    )
    partial = lambda p: (SRC / "_partials" / p).read_text()
    page = partial("layout.html")
    page = page.replace("{{title}}", meta["title"])
    page = page.replace("{{description}}", meta["description"])
    page = page.replace("{{nav}}", nav_items)
    page = page.replace("{{footer}}", partial("footer.html"))
    page = page.replace("{{main}}", body.strip())
    if name == "404.html":
        # Served at any missing path, so links must be root-absolute.
        page = re.sub(r'(href|src)="(?![/#]|https?:|mailto:)', r'\1="/', page)
    return page


if __name__ == "__main__":
    for src in sorted(SRC.glob("*.html")):
        out = ROOT / src.name
        out.write_text(render(src.name, src.read_text()))
        print(f"built {out.name}")
