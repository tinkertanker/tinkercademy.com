#!/usr/bin/env bash
# Helper for screenshot-pages.sh — screenshot ONE URL into ONE PNG.
# Usage: _shot_one.sh <id> <route>
set -uo pipefail

id="$1"
route="$2"

ROOT="/Users/yingjie/Developer/tt-projects/tinkercademy.com"
DEV_URL="${DEV_URL:-http://localhost:4321}"
OUT_DIR="${ROOT}/public/images/generated/hero-page-screenshots"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

out="${OUT_DIR}/${id}.png"
[[ -s "$out" ]] && { echo "skip $id"; exit 0; }

url="${DEV_URL}${route%/}/"
[[ "$route" == "/" ]] && url="${DEV_URL}/"
profile=$(mktemp -d -t chrome-shot-XXXXXX)
trap 'rm -rf "$profile"' EXIT

"$CHROME" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1280,720 \
  --user-data-dir="$profile" \
  --virtual-time-budget=4000 \
  --screenshot="$out" \
  "$url" >/dev/null 2>&1 || true

if [[ -s "$out" ]]; then
  echo "ok $id"
else
  echo "FAIL $id"
fi
