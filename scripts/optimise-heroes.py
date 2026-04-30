#!/usr/bin/env python3
"""
Optimise the active hero images by converting them from JPEG to WebP (q85)
in place, then rewriting `src/data/hero-image-decisions.json` to point at the
new .webp paths. Run `scripts/apply-hero-picks.py` afterwards to push the new
paths through to static-pages.json, content/programmes/*.md, and site-media.js.

Idempotent — skips paths that already end in `.webp` and exist on disk.
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

ROOT = Path("/Users/yingjie/Developer/tt-projects/tinkercademy.com")
DECISIONS = ROOT / "src" / "data" / "hero-image-decisions.json"
PUBLIC = ROOT / "public"
QUALITY = 85
COMPRESSION = 6


def collect_image_paths() -> list[str]:
    """Return all unique site-relative image paths referenced as picks/alternates."""
    decisions = json.loads(DECISIONS.read_text())
    paths: list[str] = []
    seen: set[str] = set()
    for d in decisions:
        candidates = []
        if "image" in d:
            candidates.append(d["image"])
        candidates.extend(d.get("alternates", []))
        for path in candidates:
            if path in seen:
                continue
            seen.add(path)
            paths.append(path)
    return paths


def convert_to_webp(jpg_path: Path) -> Path | None:
    """Convert a single JPEG to WebP at quality 85; return new path or None."""
    if not jpg_path.exists():
        print(f"  MISS  {jpg_path}")
        return None
    webp_path = jpg_path.with_suffix(".webp")
    if webp_path.exists() and webp_path.stat().st_size > 0:
        return webp_path
    result = subprocess.run(
        [
            "ffmpeg", "-y",
            "-i", str(jpg_path),
            "-c:v", "libwebp",
            "-quality", str(QUALITY),
            "-compression_level", str(COMPRESSION),
            str(webp_path),
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    if result.returncode != 0 or not webp_path.exists():
        print(f"  FAIL  {jpg_path}")
        return None
    return webp_path


def rewrite_decisions(replacements: dict[str, str]) -> int:
    """Update DECISIONS so any old .jpg paths point at their new .webp paths."""
    decisions = json.loads(DECISIONS.read_text())
    changed = 0
    for d in decisions:
        if "image" in d and d["image"] in replacements:
            d["image"] = replacements[d["image"]]
            changed += 1
        if "alternates" in d:
            for i, alt in enumerate(d["alternates"]):
                if alt in replacements:
                    d["alternates"][i] = replacements[alt]
                    changed += 1
    DECISIONS.write_text(json.dumps(decisions, indent=2, ensure_ascii=False) + "\n")
    return changed


def main() -> None:
    paths = collect_image_paths()
    print(f"[opt] {len(paths)} unique paths referenced in decisions")

    replacements: dict[str, str] = {}
    bytes_saved = 0
    converted = 0

    for site_path in paths:
        if site_path.endswith(".webp"):
            continue
        jpg_path = PUBLIC / site_path.lstrip("/")
        before = jpg_path.stat().st_size if jpg_path.exists() else 0
        webp_path = convert_to_webp(jpg_path)
        if webp_path is None:
            continue
        after = webp_path.stat().st_size
        delta = before - after
        bytes_saved += delta
        new_site_path = "/" + str(webp_path.relative_to(PUBLIC))
        replacements[site_path] = new_site_path
        # Delete the old JPEG only after confirming WebP is valid
        if jpg_path.exists():
            jpg_path.unlink()
        converted += 1
        print(f"  ok    {before/1024:6.0f} KB -> {after/1024:5.0f} KB  {site_path}")

    if not replacements:
        print("[opt] nothing to do")
        return

    changed = rewrite_decisions(replacements)
    print(f"[opt] converted {converted} files, saved {bytes_saved/1024/1024:.2f} MB")
    print(f"[opt] rewrote {changed} entries in {DECISIONS.name}")
    print("[opt] now run: python3 scripts/apply-hero-picks.py")


if __name__ == "__main__":
    main()
