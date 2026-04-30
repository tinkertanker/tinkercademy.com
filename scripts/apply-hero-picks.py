#!/usr/bin/env python3
"""
Apply the hero-image manifest decisions to the live site.

Reads `src/data/hero-image-decisions.json` (the manifest of picks) and rewrites:
- src/data/pages/static-pages.json   — top-level page hero_image fields
- src/content/programmes/<slug>.md   — programme heroImage frontmatter
- src/lib/site-media.js              — flagship card paths (HOME_FLAGSHIP_IMAGES)

Each decision is `{ "id": "<placement-id>", "image": "/images/...jpg" }` or
`{ "id": "<placement-id>", "keep": true }`.

Idempotent — rerun after editing the decisions file.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DECISIONS = ROOT / "src" / "data" / "hero-image-decisions.json"
STATIC_PAGES = ROOT / "src" / "data" / "pages" / "static-pages.json"
PROGRAMMES_DIR = ROOT / "src" / "content" / "programmes"
SITE_MEDIA = ROOT / "src" / "lib" / "site-media.js"

# Placements that live in static-pages.json — keyed by placement id, value = page slug.
STATIC_IDS: dict[str, str] = {
    "home": "home",
    "about-us": "about-us",
    "showcase": "showcase",
    "contact-us": "contact-us",
    "professionals": "professionals",
    "individuals": "individuals",
    "schools": "schools",
    "infocomm-club": "infocomm-club",
    "courses-professionals": "courses-professionals",
    "courses-schools": "courses-schools",
    "courses-all": "courses-all",
    "tinker-x": "tinker-x",
}

# Flagship card placements — keyed by placement id, value = HOME_FLAGSHIP_IMAGES key.
FLAGSHIP_IDS: dict[str, str] = {
    "code-for-fun-flagship": "Code For Fun",
    "imda-learn-flagship": "IMDA LEARN Roadmap",
    "swift-accelerator-flagship": "Swift Accelerator",
}

# Programme placements where the manifest id != programme slug.
PROGRAMME_SLUG_OVERRIDES: dict[str, str] = {
    "certificate-iot-creative-digital-making":
        "certificate-in-technology-foundations-harnessing-the-power-of-internet-of-things-and-creative-digital-making",
    "certificate-blockchain-technology":
        "certificate-in-technology-foundations-unleash-the-potential-of-blockchain-technology",
}


def load_decisions() -> list[dict]:
    return json.loads(DECISIONS.read_text())


def write_json(path: Path, data, trailing_newline: bool) -> None:
    payload = json.dumps(data, indent=2, ensure_ascii=False)
    if trailing_newline:
        payload += "\n"
    path.write_text(payload)


def apply_static_pages(decisions: dict[str, str | None]) -> int:
    data = json.loads(STATIC_PAGES.read_text())
    changed = 0
    for entry in data:
        slug = entry.get("slug")
        for pick_id, page_slug in STATIC_IDS.items():
            if page_slug != slug:
                continue
            new_image = decisions.get(pick_id)
            if new_image is None:
                continue
            if entry.get("hero_image") != new_image:
                entry["hero_image"] = new_image
                changed += 1
    write_json(STATIC_PAGES, data, trailing_newline=False)
    return changed


def apply_programmes(decisions: dict[str, str | None]) -> int:
    """Update `heroImage:` frontmatter in src/content/programmes/<slug>.md files."""
    changed = 0
    handled_ids = set(STATIC_IDS) | set(FLAGSHIP_IDS)
    pattern = re.compile(r'^(heroImage:\s*")([^"]+)(")', re.MULTILINE)
    for pick_id, new_image in decisions.items():
        if pick_id in handled_ids or new_image is None:
            continue
        slug = PROGRAMME_SLUG_OVERRIDES.get(pick_id, pick_id)
        md_path = PROGRAMMES_DIR / f"{slug}.md"
        if not md_path.exists():
            print(f"  WARN no programme markdown for id={pick_id!r} slug={slug!r}")
            continue
        text = md_path.read_text()
        match = pattern.search(text)
        if not match:
            print(f"  WARN no heroImage frontmatter line in {md_path.name}")
            continue
        if match.group(2) == new_image:
            continue
        new_text = pattern.sub(lambda m: m.group(1) + new_image + m.group(3), text, count=1)
        md_path.write_text(new_text)
        changed += 1
    return changed


def apply_flagships(decisions: dict[str, str | None]) -> int:
    text = SITE_MEDIA.read_text()
    changed = 0
    for pick_id, key in FLAGSHIP_IDS.items():
        new_image = decisions.get(pick_id)
        if new_image is None:
            continue
        # Match: 'Key': 'old/path',   →   'Key': 'new/path',
        pattern = re.compile(
            r"(['\"]" + re.escape(key) + r"['\"]\s*:\s*['\"])([^'\"]+)(['\"])"
        )
        match = pattern.search(text)
        if not match:
            print(f"  WARN no flagship entry for {key!r}")
            continue
        if match.group(2) != new_image:
            text = pattern.sub(lambda m: m.group(1) + new_image + m.group(3), text)
            changed += 1
    SITE_MEDIA.write_text(text)
    return changed


def main() -> None:
    raw = load_decisions()
    decisions: dict[str, str | None] = {}
    for d in raw:
        pick_id = d["id"]
        if d.get("keep"):
            decisions[pick_id] = None
        else:
            decisions[pick_id] = d["image"]

    print(f"loaded {len(decisions)} decisions ({sum(1 for v in decisions.values() if v)} changes, "
          f"{sum(1 for v in decisions.values() if v is None)} keep)")

    static_changed = apply_static_pages(decisions)
    programmes_changed = apply_programmes(decisions)
    flagships_changed = apply_flagships(decisions)

    print(f"static-pages.json: {static_changed} hero_image fields updated")
    print(f"content/programmes/*.md: {programmes_changed} heroImage fields updated")
    print(f"site-media.js: {flagships_changed} flagship paths updated")


if __name__ == "__main__":
    main()
