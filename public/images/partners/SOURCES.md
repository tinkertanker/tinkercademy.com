# Transparent logo replacements

Downloaded 2026-09-09. Original artwork, not generated or recoloured.

- `apple-technical-partner.png`: user-supplied transparent 714×264 badge. Replaces Apple Consultants Network artwork in live logo rows; the About Us dark certification row displays it white using CSS. Apple's [Singapore partner programme](https://technicalpartners.apple.com/sg/join) describes its badge and partner-only marketing materials; no public official badge download was found.
- `raffles-girls-school-crest.png`: user-supplied transparent 596×596 PNG.
- `tinkermind-symbol.png`: [official website icon](https://static.wixstatic.com/media/875ffc_5dfb805d5c1e4acba7152af789cdbf52~mv2.png), linked by https://www.tinkermind.sg/. Uses the symbol because the current transparent wordmark is white.
- `ngee-ann-secondary.png`: [Ngee Ann Kongsi school crest](https://thengeeannkongsi.com.sg/wp-content/uploads/2017/03/small-school-Logo-No-background-2.png). Crest-only variant.
- `crescent-girls-school.png`: [official school logo](https://www.crescent.edu.sg/images/sch%20logo.png).
- `dunman-secondary.png`: [official school header logo](https://www.dunmansec.moe.edu.sg/images/Home%20Page/home_logo.png), cropped to its leftmost 64×70 pixels for the crest alone. Crest pixels and transparency are unchanged.
- `methodist-girls-school.png`: [official Isomer repository crest](https://raw.githubusercontent.com/isomerpages/moe-methodistgirlssch/master/images/Common/logo-mgs.png).
- `phillipcapital.png`: [official blue wordmark](https://images.squarespace-cdn.com/content/v1/685acf578fb63a56e59da257/b2b9a9df-a51a-41d5-912f-fba00738bcfe/phillip-logo-yaleblue.png), linked by https://www.phillipcapital.com/. No separate P symbol or tagline.

## Client-list additions — 2026-09-10

- `central-singapore-cdc.png`: [official header artwork](https://centralsingapore.cdc.gov.sg/images/Original.png), linked by the [My Digital Bootcamp programme page](https://centralsingapore.cdc.gov.sg/programmes/lifelong-learning/mydigitalbootcamp/). Central Singapore CDC is the programme-facing identity rather than a generic People's Association mark. The original 14044×5951 PNG was proportionally resized to 800×339, retaining transparency and colours.
- School assets and their official source pages are documented in [school-logo-sources.md](school-logo-sources.md).
- Crescent Girls’ School uses the existing transparent official crest above on both pages, preserving the September logo-panel update rather than restoring its legacy JPEG.
- `mindef-transparent.png`: [official MINDEF header PNG](https://isomer-user-content.by.gov.sg/138/d1123e05-23e5-4d11-9876-aca4275b4551/logo_mindef.png), linked by https://mindef.gov.sg/. Original dimensions 210×76 retained. Cleared 11,119 exterior near-white background pixels by edge-connected flood fill (Pillow threshold 24); all other pixels retained. This is a processed official asset, not an originally transparent download.
- `canva.svg`: original gradient wordmark from [Canva's official logo guidelines](https://canvacreative.team/brand-logo), linked by the [Canva newsroom](https://www.canva.com/newsroom/). Guidelines link to the [official logo download folder](https://drive.google.com/drive/folders/1NKoY2Wbti9QLbpVBhHDtsSvoTqdTaS7W); used RGB → SVG → [WORDMARK LOGO - GRADIENT - RGB.svg](https://drive.google.com/file/d/1YntbB-NTPnQ52i1WyMziVv0TAp8ge5Vv/view) ([download](https://drive.google.com/uc?export=download&id=1YntbB-NTPnQ52i1WyMziVv0TAp8ge5Vv)). Original SVG, 2000×642, unchanged.
- `lovable.svg`: [official documentation header logo](https://mintcdn.com/lovable-f9060f1e/lZT1ihBcprll2Agr/assets/logo/logoblack.svg), linked by https://docs.lovable.dev/introduction. Original SVG, 911×155, unchanged.
- `dbs-alternative.png`: [user-selected Wikimedia Commons DBS alternative logo](https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/DBS_Bank_Logo_%28alternative%29.svg/3840px-DBS_Bank_Logo_%28alternative%29.svg.png). Proportionally reduced from 3840×1144 and given transparent outer padding so the edge-to-edge source artwork is not clipped in the carousel.
- `agentic-builders-collective-logo.png`: user-supplied transparent PNG for [Agentic Builders’ Collective](https://www.agenticbuilders.sg/), trimmed to its artwork bounds with 8px transparent padding; artwork unchanged.

## Transparent versions of imported logos — 2026-09-14

The files under `transparent/` preserve the existing imported artwork and remove only edge-connected near-white background pixels. Enclosed white areas and all coloured artwork remain unchanged. This deterministic cleanup was used instead of generative background removal so organisation marks are not redrawn or altered.

Processed entries: CHIJ Secondary, Canossa Catholic Primary School, Classroom HK, Commonwealth Secondary School, DBS, Dunman High School, Dunman Secondary School, Methodist Girls’ School, My First Skool, Nan Hua High School, National Institute of Education, Ngee Ann Polytechnic, Ngee Ann Secondary School, NUS High School of Math & Science, PhillipCapital, Presbyterian High School, Raffles Girls’ School, Regent Secondary School, Rosyth School, Temasek Polytechnic, Tinkermind, and Yusof Ishak Secondary School. Their original asset paths remain recorded in Git history and the pre-cleanup imported data.

Where an official asset combined a distinct crest with a separate name treatment, the carousel uses a crest-only crop: Cedar Primary, Clementi Town Secondary, Dunman High, Nanyang Girls’ High, North Spring Primary, NUS High, Regent Secondary, Temasek Polytechnic, and Yusof Ishak Secondary. Ngee Ann Secondary and Raffles Girls’ School use their existing official crest-only files.
