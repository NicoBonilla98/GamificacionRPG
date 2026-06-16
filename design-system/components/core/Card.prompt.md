Raised, gradient-faced container for quests, battles, NPCs and panels. The 3px left rail (`accent`) is the brand's quiet way of color-coding a card to an attribute.

```jsx
<Card accent="var(--hl-attr-str)">
  <span className="hl-eyebrow" style={{ color: "var(--hl-attr-str)" }}>Fuerza · STR</span>
  <h4>⚔ Forja del Cuerpo</h4>
  <p>30 min de entrenamiento de fuerza.</p>
</Card>

<Card tone="panel">…rank panel…</Card>
<Card accent="var(--hl-green)" active>…selected NPC…</Card>
```

`tone`: `card` (lit gradient, default), `panel` (recessed translucent), `well` (flat black). `active` adds an accent ring; `faded` dims to 0.55 for completed items.
