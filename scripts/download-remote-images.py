#!/usr/bin/env python3
"""Download all framerusercontent.com images referenced in the repo to public/images/.

Scans JSON/YML plus markdown/HTML/source files. Keeps the Framer hash filename so
localiseFramerImage() can match. Handles both /images/ and /assets/ CDN paths.
"""

from __future__ import annotations

import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "public" / "images"
SCAN_ROOTS = (
    PROJECT_ROOT / "src",
    PROJECT_ROOT / ".claude",
)
SCAN_SUFFIXES = {
    ".json",
    ".yml",
    ".yaml",
    ".md",
    ".astro",
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".html",
    ".mjs",
    ".cjs",
}
SKIP_DIR_NAMES = {
    ".git",
    "node_modules",
    "dist",
    ".astro",
    ".wrangler",
    "scripts/_artifacts",
}
# Match /images/ and /assets/ Framer URLs, including those inside escaped HTML.
FRAMER_URL_RE = re.compile(
    r"https://framerusercontent\.com/(?:images|assets)/[A-Za-z0-9._-]+\.(?:png|jpg|jpeg|webp|gif|svg)"
)
TIMEOUT = 30
USER_AGENT = "tinkercademy-image-rehost/1.0"


def find_all_urls() -> set[str]:
    urls: set[str] = set()
    for scan_root in SCAN_ROOTS:
        if not scan_root.exists():
            continue
        for dirpath, dirnames, filenames in os.walk(scan_root):
            dirnames[:] = [name for name in dirnames if name not in SKIP_DIR_NAMES]
            for fname in filenames:
                if Path(fname).suffix.lower() not in SCAN_SUFFIXES:
                    continue
                fpath = Path(dirpath) / fname
                try:
                    text = fpath.read_text(encoding="utf-8")
                except OSError:
                    continue
                urls.update(FRAMER_URL_RE.findall(text))
    return urls


def url_to_filename(url: str) -> str:
    return urlparse(url).path.split("/")[-1]


def download_one(url: str, dest: Path) -> tuple[str, bool, str]:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT) as resp:
            if resp.status != 200:
                return (url, False, f"HTTP {resp.status}")
            data = resp.read()
            if not data:
                return (url, False, "empty body")
            dest.write_bytes(data)
            return (url, True, f"{len(data)} bytes")
    except urllib.error.HTTPError as exc:
        return (url, False, f"HTTP {exc.code}")
    except Exception as exc:  # noqa: BLE001 — report any download failure
        return (url, False, str(exc))


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("Scanning source and data files for Framer image URLs...")
    urls = find_all_urls()
    print(f"Found {len(urls)} unique Framer image URLs")

    to_download: list[tuple[str, Path]] = []
    already_exists = 0
    for url in sorted(urls):
        dest = OUTPUT_DIR / url_to_filename(url)
        if dest.exists() and dest.stat().st_size > 0:
            already_exists += 1
        else:
            to_download.append((url, dest))

    print(f"Already downloaded: {already_exists}")
    print(f"To download: {len(to_download)}")

    if not to_download:
        print("Nothing to download!")
        return 0

    success_count = 0
    fail_count = 0
    for i, (url, dest) in enumerate(to_download, 1):
        _, ok, msg = download_one(url, dest)
        filename = url_to_filename(url)
        if ok:
            success_count += 1
            status = "OK"
        else:
            fail_count += 1
            status = f"FAIL: {msg}"
        print(f"[{i}/{len(to_download)}] {status} - {filename}")

    print(f"\nDone! Downloaded: {success_count}, Failed: {fail_count}")
    return 1 if fail_count else 0


if __name__ == "__main__":
    sys.exit(main())
