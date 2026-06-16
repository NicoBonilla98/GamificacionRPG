Character-screen stat row — the spec demands attributes be "visualmente prominentes, no escondidos". One row per attribute, filled in its own hue.

```jsx
<AttributeMeter attr="STR" value={32} max={50} bonus={4} next={50} />
<AttributeMeter attr="FOC" value={104} max={104} next={null} />
```

Built-in label + hue per `attr` (STR red … FOC violet). `bonus` shows equipment contribution; `next` renders the "→ 50" threshold hint, or "máx" when null.
