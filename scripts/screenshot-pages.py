#!/usr/bin/env python3
"""
Screenshot every placement route in src/data/hero-image-review.json against the
local Astro dev server (default http://localhost:4321), saving 1280x720 PNGs to
public/images/generated/hero-page-screenshots/<id>.png.

Runs CONCURRENCY chrome processes in parallel via concurrent.futures.
Idempotent — skips ids whose PNG already exists.
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/Users/yingjie/Developer/tt-projects/tinkercademy.com")
DEV_URL = os.environ.get("DEV_URL", "http://localhost:4321")
OUT_DIR = ROOT / "public" / "images" / "generated" / "hero-page-screenshots"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CONCURRENCY = int(os.environ.get("CONCURRENCY", "3"))
# Astro dev server can be slow on data-heavy pages (/schools, /courses-*),
# so the per-screenshot deadline is generous.
TIMEOUT = int(os.environ.get("TIMEOUT", "120"))

OUT_DIR.mkdir(parents=True, exist_ok=True)


def shot_one(placement_id: str, route: str) -> tuple[str, str]:
    out_webp = OUT_DIR / f"{placement_id}.webp"
    if out_webp.exists() and out_webp.stat().st_size > 0:
        return placement_id, "skip"

    out_png = OUT_DIR / f"{placement_id}.png"
    url = f"{DEV_URL}{route.rstrip('/')}/" if route != "/" else f"{DEV_URL}/"
    profile = tempfile.mkdtemp(prefix=f"chrome-shot-{placement_id}-")
    try:
        result = subprocess.run(
            [
                CHROME,
                "--headless=new",
                "--disable-gpu",
                "--hide-scrollbars",
                "--window-size=1280,720",
                f"--user-data-dir={profile}",
                "--virtual-time-budget=4000",
                f"--screenshot={out_png}",
                url,
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=TIMEOUT,
        )
    except subprocess.TimeoutExpired:
        if out_png.exists():
            out_png.unlink()
        return placement_id, "timeout"
    finally:
        shutil.rmtree(profile, ignore_errors=True)

    if not out_png.exists() or out_png.stat().st_size == 0:
        return placement_id, f"fail (rc={result.returncode})"

    # Convert PNG → WebP q85 to keep the screenshot collection small.
    convert = subprocess.run(
        [
            "ffmpeg", "-y",
            "-i", str(out_png),
            "-c:v", "libwebp",
            "-quality", "85",
            "-compression_level", "6",
            str(out_webp),
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    out_png.unlink()
    if convert.returncode != 0 or not out_webp.exists():
        return placement_id, "webp-fail"
    return placement_id, "ok"


def main() -> int:
    placements = json.loads((ROOT / "src" / "data" / "hero-image-review.json").read_text())
    print(f"[shot.py] {len(placements)} placements, concurrency={CONCURRENCY}", flush=True)

    ok = skip = fail = 0
    with ThreadPoolExecutor(max_workers=CONCURRENCY) as pool:
        futures = {pool.submit(shot_one, p["id"], p["route"]): p["id"] for p in placements}
        for future in as_completed(futures):
            placement_id, status = future.result()
            print(f"[shot.py] {status:14s} {placement_id}", flush=True)
            if status == "ok":
                ok += 1
            elif status == "skip":
                skip += 1
            else:
                fail += 1

    print(f"[shot.py] done: ok={ok} skip={skip} fail={fail}", flush=True)
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
