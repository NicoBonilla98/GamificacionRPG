---
name: heros-ledger-design
description: Use this skill to generate well-branded interfaces and assets for Hero's Ledger, a Spanish-language habit-tracking app themed as a 16-bit fantasy RPG (dark gold-on-near-black "grimoire" aesthetic). Use it for production UI or throwaway prototypes, mocks, slides, and marketing. Contains design guidelines, color/type/spacing tokens, brand assets (logo + pixel sprites), and a full set of UI kit components.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `styles.css` — link this one file to inherit every token (colors, type, spacing, effects).
- `tokens/` — the raw CSS custom properties, one file per concern.
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand).
- `components/` — reusable React primitives (Button, Pill, ProgressBar, Card, RarityTag, AttributeMeter, Input, Toast) under `window.HeroSLedgerDesignSystem_858ec3`. Each has a `.prompt.md` with usage.
- `ui_kits/heros-ledger/` — a full click-through recreation of the app to copy patterns from.
- `assets/` — the Ledger mark, pixel sprites, and boss key art (SVG). Reuse these; never redraw them.

## Non-negotiables
- Write in **Spanish**, in the chronicle-of-an-adventure voice. Pair every narrative quest name with a plain habit description.
- Gold `#F2CC45` is the single accent. Thread the five **attribute hues** (STR red, INT blue, VIT green, DIS gold, FOC violet) through the UI.
- Serif (Georgia) display headings, gold + engraved; heavy uppercase sans labels/buttons; system fonts only.
- Iconography is **emoji + unicode glyphs**, not an icon library. Pixel sprites stay `image-rendering: pixelated`.
- Dark warm-brown surfaces, soft corners, pill tracks, 3px attribute left-rails on cards, gold glow on metal, gentle motion (combat is the one choppy `steps()` moment).
