# Hero's Ledger — Design System

> Convierte tus hábitos reales en la leyenda de tu héroe.
> *(Turn your real habits into your hero's legend.)*

**Hero's Ledger** is a mobile habit-tracking app dressed as a 16-bit fantasy RPG. Every real-world habit the user completes maps to an in-game quest that deals XP, levels up a character, raises five attributes, damages bosses, and advances narrative expeditions. The design goal stated in the spec: *each completed habit has a visible, immediate impact on the game, creating a sustainable long-term motivation loop.*

The product language is **Spanish**. The aesthetic is a **dark-fantasy "ledger / grimoire"**: gold leaf on warm near-black browns, engraved serif display type, sturdy sans UI, and crisp pixel-art actors for the diegetic battle screen.

This design system packages that look as reusable tokens, components, foundation cards, and a full click-through recreation of the app.

---

## Sources

This system was reverse-engineered from a working vanilla-JS implementation and its design spec:

- **GitHub repo:** [`NicoBonilla98/GamificacionRPG`](https://github.com/NicoBonilla98/GamificacionRPG) — `index.html`, `styles.css`, `app.js`, the SVG assets, and `heros_ledger_especificaciones_extraido.txt` (the mechanics spec, "Versión 1.0").

Explore that repository to design more faithfully against the product — the spec document is the source of truth for mechanics (quests, streaks, expeditions, bosses, NPCs, equipment, passives, consumables, the Hero's Archive), and `app.js` holds the canonical content (quest names, arc lore, NPC roster, item names) used throughout this kit.

> ⚠️ The reader may not have access to the repo; all values needed to design are captured here and in `ui_kits/heros-ledger/data.js`.

---

## CONTENT FUNDAMENTALS — how Hero's Ledger writes

The voice is **the chronicle of an adventure** — warm, mythic, second-person, never clinical. Every utilitarian concept wears a fantasy costume, and the real habit is always stated plainly underneath it.

- **Language:** Spanish (es-ES). Numbers formatted `es-ES` (`14.820`).
- **The double-naming pattern (core to the brand):** every quest has a *narrative name* **and** a *functional description*. "Forja del Cuerpo" → "30 min de entrenamiento de fuerza." "Estudio del Grimorio" → "Lee o estudia 25 min." The poetry motivates; the plain line tells you what to actually do. **Always pair them.**
- **Person & address:** speaks to the user as **tú** ("Convierte **tus** hábitos", "Prepárate", "Necesitas 3 llaves"). The hero is *your* hero.
- **Tone:** heroic but encouraging — **rewards consistency without punishing absence**. Streaks "decay gradually, they don't collapse." Missed quests "rotate out — they don't accumulate or penalize." Copy never scolds. Defeat is framed as rest: *"El héroe necesita recuperar fuerzas antes de volver al combate."*
- **Casing:** UI section titles use Title Case in serif ("Misiones Diarias", "Inteligencia del Boss"). Eyebrow labels and buttons are **UPPERCASE** sans. Body is sentence case.
- **Narrative beats:** chapter completions surface 1–2 line chronicle fragments in quotes and italics: *"El lobo llevaba una marca. Alguien lo envió..."* Often trailing into an ellipsis — the story continues.
- **Lore tags:** relics and NPCs carry a short lore line: *"Espada de Valdris — forjada por Mira, exploradora de Valdris."*
- **Emoji & unicode:** used freely as **iconography** (see below), not as punctuation. ⚔ 🗝 🔥 ⌛ ✦. Toasts lead with an event glyph (⭐ level, 🏆 boss, 💤 rest).
- **Attribute shorthand:** the five stats are always referred to by their three-letter caps — **STR · INT · VIT · DIS · FOC** — alongside their Spanish names (Fuerza, Inteligencia, Vitalidad, Disciplina, Foco).

---

## VISUAL FOUNDATIONS

**Mood.** A single warm gold light from directly overhead, falling on aged-board darkness. Think a treasure ledger open by candlelight. Nothing is pure black (`#0F0B09` is the floor) and nothing is pure white (`#FFF6ED` warm ivory is the brightest ink).

**Color.** One hero accent — **gold `#F2CC45`** — carries headings, CTAs, progress, glow, and highlights. Surfaces are warm near-black browns (`#15100D` → `#352D29`). Five **attribute hues** thread through the entire app and are the system's main source of color: STR red `#D43B4A`, INT blue `#4CB1FF`, VIT green `#7ECB8E`, DIS gold `#F2CC45`, FOC violet `#B18BFF`. Loot rarity reuses those hues (rare = INT blue, epic = FOC violet). Status: danger red, rose (rest/warning), green (success/heal). Use 1–2 surface browns per screen, max; let the attribute hues and gold do the talking.

**Type.** Two voices. **Display = Georgia serif**, gold, frequently UPPERCASE, with an *engraved* text-shadow (`0 2px 0 #4C3511`, plus a gold glow on the wordmark) — used for the wordmark, boss names, rank/section titles. **UI = system-ui sans**, used heavy: labels and pills run weight **900 UPPERCASE tracked-out**, buttons run **950**. Body is sans, 1.45 leading, `--hl-muted`. A monospace ("Courier New") appears only on the diegetic "Pixel Battle" stage label. *The product ships with system fonts by design — there is no webfont dependency.*

**Spacing & shape.** Touch-first (430px phone shell). Generous 22px card padding, 16px list rhythm, 34px above section headings. Corners are soft (8–14px); progress tracks and chips are fully pill-rounded (999px). Hit targets are chunky — 44px minimum, 66–70px for inputs and primary CTAs. Cards carry a **3px colored left rail** to bind them to an attribute.

**Backgrounds & texture.** Three signature surfaces: the **page** (radial gold sun at top + a faint 34px engraved grid over `#0F0B09`); the **phone shell** (subtly ribbed leather/board via repeating 42px stripes); and the **battle stage** (cool blue CRT scanlines, deep inner shadow — a screen-within-the-screen). No photographic imagery, no illustration washes — texture comes from gradients and repeating lines.

**Shadows & light.** Cards lift on a soft outer drop (`0 18px 45px /.3`). Wells (inputs, progress tracks, icon tiles) sink with inset shadow (`inset 0 1px 4px /.8`). Gold elements **glow** (`0 0 30px gold/.16`); the primary button adds an inner top sheen (`inset 0 2px 0 white/.45`) so it reads like stamped metal. The battle stage uses a heavy `inset 0 0 36px` vignette.

**Borders.** Hairlines are translucent white (`rgba(255,255,255,.08–.1)`). Gold borders are `gold/.18–.5` depending on emphasis. The brand mark and avatars take a solid **3px / 2px gold ring**. Cards are bordered, not borderless — the system is built from framed panels.

**Corner radii / card anatomy.** A typical card: `var(--grad-card)` (a 145° brown gradient), 1px hairline border, 10px radius, 3px attribute left-rail, 22px padding, soft outer shadow. Selected cards add a 1px ring in the accent hue. Completed/locked cards drop to `opacity: .55–.62` — never removed, just dimmed.

**Motion.** Restrained and functional. Progress bars glide their width over **260ms ease**. Toasts fade-and-slide up (280ms). Hovers/toggles are 200ms. The one expressive moment is **combat**: the hero sprite lunges and the monster recoils on a **`steps(4, end)`** pixel cadence (~760ms) with a slash arc and impact burst — deliberately choppy, like a 16-bit game, never smooth. No infinite ambient loops on content.

**Hover / press.** Buttons lighten slightly (filter/opacity) on hover; disabled drops to `opacity .5`. Tabs and focus pills fill with a translucent wash of their accent color when active. There is no aggressive scale-bounce — feedback comes from color fills, the accent ring, and the celebratory toast.

**Transparency & blur.** Panels are translucent over the textured shell (`rgba(20,15,13,.52)`); the tab bar uses a subtle backdrop blur. Use transparency to let the board texture read through, not for glassmorphism.

---

## ICONOGRAPHY

Hero's Ledger has **no icon font and no SVG icon set** — its iconography is **emoji and unicode glyphs**, used deliberately as part of the fantasy voice.

- **Quest icons** are emoji chosen per habit: ⚔ 🥾 🏋 📖 🎓 🌙 💧 🧘 🎯 ✅ 🌅. They sit in a dark inset 58px tile (`--shadow-icon-well`).
- **Tab bar & structural icons** are **unicode symbols**, not emoji, for a cleaner engraved feel: ⚔ (Quests), ♜ (Boss), ✦ (Expedición), ✥ (Héroe). NPC role glyphs likewise: ⚔ ✦ ✚ ▣ ◆.
- **Event glyphs** lead every toast: ⭐ level-up, ✦ passive unlock, 🏆 boss defeated, 🗝 key earned, 💤 rest, 💰 overflow-to-XP, 🔒 locked.
- **Recurring motif glyphs:** 🔥 streak flame, 🗝 expedition keys, ⌛ midnight reset, ⚔ damage/combat.

**Real assets** (in `assets/`, copied from the source repo — all hand-made SVG):

| File | What it is |
|---|---|
| `ledger-mark.svg` | The brand emblem — a gold open grimoire on a dark disc. |
| `pixel-hero.svg` | The hero sprite (crisp pixel art, `image-rendering: pixelated`). |
| `pixel-monster.svg` | Generic monster battle sprite. |
| `void-dragon.svg` | The generic boss "Malakor" key art. |
| `avatar.svg` | Small avatar mark. |

> If you need an icon the product doesn't ship, prefer a unicode glyph or a tasteful emoji that matches the list above. **Do not introduce a line-icon library** — it would read as a different product. Never hand-draw replacement SVGs for the sprites; reuse the files in `assets/`.

---

## INDEX — what's in this system

**Root**
- `styles.css` — the entry point. Link this one file. `@import`s every token file.
- `README.md` — this guide.
- `SKILL.md` — Agent-Skills front-matter so this folder works as a Claude skill.

**`tokens/`** — CSS custom properties (`@import`ed by `styles.css`)
- `colors.css` · `typography.css` · `spacing.css` · `effects.css` · `base.css`

**`guidelines/`** — foundation specimen cards (Design System tab)
- Colors: surfaces, gold, attributes, status & rarity
- Type: display serif, interface sans
- Spacing: scale, radii & tracks, shadows & glows
- Brand: the ledger mark, pixel sprites, atmosphere & textures

**`components/`** — reusable React primitives (`window.HeroSLedgerDesignSystem_858ec3`)
- `core/` — **Button**, **Pill**, **ProgressBar**, **Card**, **RarityTag**, **AttributeMeter**
- `forms/` — **Input**
- `feedback/` — **Toast**

**`ui_kits/heros-ledger/`** — the full app, recreated
- `index.html` — interactive: login → quests → boss → expedition → hero, with live toasts
- `chrome.jsx` (shell, top bar, tab bar, login) · `screens.jsx` (the four views) · `data.js` (verbatim product content)

**`assets/`** — `ledger-mark.svg`, `pixel-hero.svg`, `pixel-monster.svg`, `void-dragon.svg`, `avatar.svg`
