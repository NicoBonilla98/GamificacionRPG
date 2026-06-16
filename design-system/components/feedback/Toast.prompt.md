The "pop notification" that fires on every meaningful gain. Per spec, stat pops are colored by attribute (STR red, INT blue, VIT green, DIS gold, FOC violet).

```jsx
<Toast color="var(--hl-gold)" icon="⭐">¡Subiste a Nivel 7!</Toast>
<Toast color="var(--hl-attr-str)" icon="💪">Fuerza +6</Toast>
<Toast color="var(--hl-danger)" icon="🏆">¡Malakor derrotado!</Toast>
```

`show` toggles the fade-and-slide (true by default). Stack several bottom-center, above the tab bar.
