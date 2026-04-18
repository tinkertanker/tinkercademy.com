#!/usr/bin/env python3
"""Download all framerusercontent.com images referenced in data files to public/images/."""

import os
import sys
import json
import re
import asyncio
import aiohttp
from pathlib import Path
from urllib.parse import urlparse

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "src" / "data"
OUTPUT_DIR = PROJECT_ROOT / "public" / "images"
MAX_CONCURRENT = 20
TIMEOUT = 30


def find_all_urls(directory: Path) -> set[str]:
    """Scan all JSON/YML files for framerusercontent.com image URLs."""
    urls = set()
    pattern = re.compile(r'https://framerusercontent\.com/images/[^"?\s]+')
    for root, _, files in os.walk(directory):
        for fname in files:
            if fname.endswith((".json", ".yml", ".yaml")):
                fpath = Path(root) / fname
                text = fpath.read_text(encoding="utf-8")
                urls.update(pattern.findall(text))
    return urls


def url_to_filename(url: str) -> str:
    """Extract filename from URL: the hash+extension part."""
    path = urlparse(url).path  # e.g. /images/RxSGzAwHnPNmiolhpN9izHUQdvs.webp
    return path.split("/")[-1]


async def download_one(
    session: aiohttp.ClientSession, url: str, dest: Path, sem: asyncio.Semaphore
) -> tuple[str, bool, str]:
    """Download a single image. Returns (url, success, message)."""
    async with sem:
        try:
            async with session.get(
                url, timeout=aiohttp.ClientTimeout(total=TIMEOUT)
            ) as resp:
                if resp.status == 200:
                    data = await resp.read()
                    dest.write_bytes(data)
                    return (url, True, f"{len(data)} bytes")
                else:
                    return (url, False, f"HTTP {resp.status}")
        except Exception as e:
            return (url, False, str(e))


async def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("Scanning data files for image URLs...")
    urls = find_all_urls(DATA_DIR)
    print(f"Found {len(urls)} unique image URLs")

    # Also scan astro source files for any direct references
    src_dir = PROJECT_ROOT / "src"
    src_pattern = re.compile(r'https://framerusercontent\.com/images/[^"?\s\)]+')
    for root, _, files in os.walk(src_dir):
        for fname in files:
            if fname.endswith((".astro", ".js", ".ts", ".jsx", ".tsx")):
                fpath = Path(root) / fname
                text = fpath.read_text(encoding="utf-8")
                urls.update(src_pattern.findall(text))

    print(f"Total unique URLs (including source files): {len(urls)}")

    # Filter out already-downloaded
    to_download = []
    already_exists = 0
    for url in sorted(urls):
        filename = url_to_filename(url)
        dest = OUTPUT_DIR / filename
        if dest.exists() and dest.stat().st_size > 0:
            already_exists += 1
        else:
            to_download.append((url, dest))

    print(f"Already downloaded: {already_exists}")
    print(f"To download: {len(to_download)}")

    if not to_download:
        print("Nothing to download!")
        return

    sem = asyncio.Semaphore(MAX_CONCURRENT)
    success_count = 0
    fail_count = 0

    async with aiohttp.ClientSession() as session:
        tasks = [download_one(session, url, dest, sem) for url, dest in to_download]
        for i, coro in enumerate(asyncio.as_completed(tasks), 1):
            url, ok, msg = await coro
            filename = url_to_filename(url)
            if ok:
                success_count += 1
                status = "OK"
            else:
                fail_count += 1
                status = f"FAIL: {msg}"
            print(f"[{i}/{len(to_download)}] {status} - {filename}")

    print(f"\nDone! Downloaded: {success_count}, Failed: {fail_count}")


if __name__ == "__main__":
    asyncio.run(main())
