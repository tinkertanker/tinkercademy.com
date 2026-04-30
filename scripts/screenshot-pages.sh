#!/usr/bin/env bash
# Screenshot every placement route from src/data/hero-image-review.json
# against the local Astro dev server, in parallel (4 concurrent chromes).
# Saves 1280x720 PNGs to public/images/generated/hero-page-screenshots/<id>.png.
# Resumable — _shot_one.sh skips ids whose PNG already exists.
set -uo pipefail

ROOT="/Users/yingjie/Developer/tt-projects/tinkercademy.com"
DEV_URL="${DEV_URL:-http://localhost:4321}"
OUT_DIR="${ROOT}/public/images/generated/hero-page-screenshots"
CONCURRENCY="${CONCURRENCY:-4}"

mkdir -p "$OUT_DIR"

if ! curl -s -o /dev/null --max-time 3 "$DEV_URL/"; then
  echo "ERROR: dev server not reachable at $DEV_URL" >&2
  exit 1
fi

count=$(python3 -c "
import json
print(len(json.load(open('$ROOT/src/data/hero-image-review.json'))))
")
echo "[shot] processing $count placements with concurrency=$CONCURRENCY"

# Emit "id|route" pairs (no whitespace in either field — id is alphanumeric
# with dashes, route starts with /), then xargs splits on the pipe.
python3 -c "
import json
with open('$ROOT/src/data/hero-image-review.json') as f:
    for item in json.load(f):
        print(item['id'] + '|' + item['route'])
" | xargs -P "$CONCURRENCY" -L 1 -I '{}' bash -c '
  pair="{}"
  id="${pair%%|*}"
  route="${pair#*|}"
  "'"$ROOT"'/scripts/_shot_one.sh" "$id" "$route"
'

n=$(find "$OUT_DIR" -maxdepth 1 -name '*.png' | wc -l | tr -d ' ')
echo "[shot] done: $n screenshots in $OUT_DIR"
