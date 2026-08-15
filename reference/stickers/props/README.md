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
| `handheld-console` | Retro handheld running a pixel platformer (MakeCode Arcade) |
| `cardboard-house` | Kid-made cardboard playhouse with fastener screws (Makedo / Cardboard Creation) |
| `ultrasonic-sensor` | HC-SR04-style ultrasonic distance sensor (Tinker Kit robotics) |
| `servo` | Mini hobby servo with cross horn and ribbon wires (Tinker Kit) |
| `led-strip` | Addressable LED strip segment, lit (Tinker Kit / smart kits) |
| `smart-plant` | Potted seedling with soil-moisture sensor (ElecFreaks Smart Agriculture) |
| `laptop-gamepad` | Laptop wired to a game controller — playtesting (game dev tracks) |
| `laptop-phone` | Laptop wired to a phone mirroring the app (mobile dev tracks) |
| `laptop-microbit` | Laptop flashing a micro:bit over USB (physical computing) |
| `server` | Mini server tower with indicator lights (web/backend tracks) |
| `spreadsheet-app` | Spreadsheet window with chart (Excel-style; data/business tracks) |
| `design-app` | Design canvas with prototype arrow + cursor (Figma-style) |
| `code-editor` | Dark editor with file tree (VS Code-style) |
| `agent-cli` | AI coding agent terminal with prompts + spinner (Codex/Claude-style) |
| `app-builder` | Chat + live phone preview split (Lovable-style) |
| `chat-app` | Chat assistant conversation window (ChatGPT/Copilot-style) |

Round-2 subjects were derived from the TT Curriculum drive (Bee-Bot, Tello
drones, Space Camp, 3D Pen Art, High Tech Maker, Makedo, MakeCode Arcade).
Round-5 added professional app-window stickers — deliberately unbranded (no fake logos/text) so scenes can pair them with real simple-icons logo badges. Round-4 added connected software setups (laptop+device composites, server). Round-3 subjects came from gethacking.com stock (ElecFreaks smart kits, Tinker Kit). Shortlist for the next round: battery-pack, robot arm (RPA),
KTANE-style defusal box (Digital Making), blockchain cubes, sensor modules.
Process a new batch with `python3 scripts/banner/process-mint.py <dir> <names>`.

**Flatness rule (from review):** props must match the pack's flat 2D language —
straight-on front view, no perspective, no foreshortening, no three-quarter
angles, no visible side faces. Put "STRICTLY FLAT ... straight-on front view,
no perspective, no vanishing points" in every mint prompt; "three-quarter
view" produces 3D-looking output that clashes with the stickers.
