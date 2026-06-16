Inset, pill-rounded progress track used for XP, boss/hero HP, attribute meters and combat timers.

```jsx
<ProgressBar kind="xp" value={420} max={800} />
<ProgressBar kind="hp" value={820} max={1200} label="820 / 1200 PV" />
<ProgressBar kind="attr" value={32} max={50} color="var(--hl-attr-str)" />
```

`kind` selects the fill gradient (`xp` gold, `hp` red, `attr`/`timer` green→gold). Pass `color` to force a single attribute hue. HP tracks take an overlay `label`. The fill animates width over 260ms.
