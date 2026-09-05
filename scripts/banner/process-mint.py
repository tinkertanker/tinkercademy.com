#!/usr/bin/env python3
"""De-key, trim, downscale and vendor minted sticker PNGs.
Usage: python3 process-mint.py <src-dir> <name> [<name>...]
Writes reference/stickers/props/<name>.png and a review sheet to <src-dir>/review.jpg
"""
import sys, os
from PIL import Image, ImageDraw, ImageFont

SRC = sys.argv[1]
names = sys.argv[2:]

def dekey(src, dst):
    im = Image.open(src).convert('RGBA')
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if g > 110 and g > r * 1.5 and g > b * 1.5:
                px[x, y] = (r, g, b, 0)
            elif g > 90 and g > r * 1.2 and g > b * 1.2:
                m = max(r, b)
                px[x, y] = (r, m, b, 120)
    im = im.crop(im.getbbox())
    im.thumbnail((900, 900), Image.LANCZOS)
    im.save(dst, optimize=True)
    return im

tiles = []
for n in names:
    out = f'reference/stickers/props/{n}.png'
    im = dekey(f'{SRC}/{n}.png', out)
    print(n, im.size, os.path.getsize(out) // 1024, 'KB')
    tiles.append((n, out))

font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 20)
cell, pad, lh = 340, 10, 30
cols = min(4, len(tiles))
rows = -(-len(tiles) // cols)
c = Image.new('RGB', (cols * (cell + pad) + pad, rows * 2 * (cell + lh + pad) + pad), (24, 24, 28))
d = ImageDraw.Draw(c)
for row, bg in enumerate([(250, 243, 232), (25, 21, 18)]):
    for i, (n, p) in enumerate(tiles):
        r, co = divmod(i, cols)
        x = pad + co * (cell + pad)
        y = pad + (row * rows + r) * (cell + lh + pad)
        tile = Image.new('RGBA', (cell, cell), bg + (255,))
        im = Image.open(p)
        im.thumbnail((cell - 20, cell - 20))
        tile.paste(im, ((cell - im.width) // 2, (cell - im.height) // 2), im)
        c.paste(tile.convert('RGB'), (x, y + lh))
        if row == 0:
            d.text((x + 4, y + 4), n, fill=(255, 220, 120), font=font)
c.save(f'{SRC}/review.jpg', quality=90)
print('review sheet:', f'{SRC}/review.jpg')
