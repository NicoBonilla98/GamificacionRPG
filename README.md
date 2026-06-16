# Hero's Ledger — App UI Kit

A high-fidelity, click-through recreation of the Hero's Ledger mobile app, composed from the design system's component primitives.

## Run it
Open `index.html`. It loads the design-system bundle (`../../_ds_bundle.js`), the brand stylesheet, and three local scripts:

- `data.js` — the product's real content (quest repository sample, the Valdris arc with all four chapters, the generic boss Malakor, the five basic NPCs, equipment, passives) lifted from the source `app.js`. Plain `window.HL_DATA`.
- `chrome.jsx` — shared shell: `PhoneShell` (430px ribbed board), `TopBar`, `TabBar`, `SectionHeading`, `LoginScreen`.
- `screens.jsx` — the four app views: `QuestsScreen`, `BossScreen`, `ExpeditionScreen`, `CharacterScreen`.

## What's interactive
- **Login → app.** Enter a hero name to cross from the vault into the app; a welcome toast fires.
- **Quests.** Complete daily quests → the card dims, XP advances, and an attribute pop-toast fires in that stat's hue. Toggle the day's **focus** attribute.
- **Boss.** Pick a support **NPC** (the chosen card rings green); read INT-gated boss intel; see per-mission damage.
- **Expedition.** The Valdris arc: rotation list, four chapters with progress/keys/locks/narrative beats, and the relic reward.
- **Character.** Status, the five attribute meters, equipment with rarity, and unlocked passives.

## Screens covered
Login · Quests (rank panel, streak, focus, daily missions) · Boss (prep: key art, intel, NPC roster, combat missions, attack CTAs) · Expedition (active arc, rotation, chapter map, relic) · Character (status, attributes, equipment, passives).

## Fidelity notes
This is a cosmetic recreation, not the real engine — combat math, streak decay, cooldowns and persistence are simplified or static. Values come straight from `data.js`. The kit reuses the published `Button`, `Pill`, `ProgressBar`, `Card`, `AttributeMeter`, `RarityTag`, `Input` and `Toast` components rather than re-implementing them; product-specific composites (top bar, boss stage, chapter card) live in the JSX files here.
