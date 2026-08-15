# Imagegen-minted sticker props

Object stickers minted once with the `imagegen` skill (codex `image_gen`,
chroma-key workflow per tinkertanker/tkrobot-stickers `docs/prompts/`), then
locked here. Every PNG in this directory auto-registers as a banner prop named
after its filename — `props/microbit.png` intentionally supersedes the vector
`microbit` drawing. Never regenerate a locked sticker-prop; mint new ones as
new files.

| Prop | Subject |
| --- | --- |
| `microbit` | BBC micro:bit board, heart LED pattern, die-cut border |
| `robot-buggy` | Two-wheeled classroom robot buggy with board slot |
| `printer3d` | Open-frame desktop 3D printer mid-print |
| `vr-headset` | VR headset, teal faceplate |
| `marble-run` | Cardboard marble-run makerspace build |
| `bee-bot` | Striped floor robot with arrow buttons (Bee-Bot / early coding) |
| `drone` | Quadcopter camera drone (Drones with Tello) |
| `rocket` | Cartoon rocket (Space Camp, launch metaphors) |
| `pen3d` | 3D-printing art pen drawing a plastic squiggle (3D Pen Art) |
| `croc-clips` | Crocodile-clip test leads (micro:bit projects) |
| `soldering-iron` | Iron on stand with solder spool (High Tech Maker) |
| `cardboard-robot` | Kid-made cardboard box robot (Makedo / Cardboard Creation) |
| `handheld-console` | Retro handheld running a pixel platformer (MakeCode Arcade) |

Round-2 subjects were derived from the TT Curriculum drive (Bee-Bot, Tello
drones, Space Camp, 3D Pen Art, High Tech Maker, Makedo, MakeCode Arcade).
Shortlist for the next round: battery-pack, servo motor, robot arm (RPA),
KTANE-style defusal box (Digital Making), blockchain cubes, sensor modules.
Process a new batch with `python3 scripts/banner/process-mint.py <dir> <names>`.
