import React from "react";

/**
 * Hero's Ledger — ProgressBar
 * The inset, pill-rounded track used everywhere: XP, boss/hero HP,
 * attribute meters, and expedition progress. `kind` picks the fill
 * gradient; pass `color` to override (e.g. a single attribute hue).
 */
export function ProgressBar({
  value = 0,
  max = 100,
  kind = "xp",
  color = null,
  height = null,
  label = null,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));

  const kinds = {
    xp: { fill: "var(--grad-gold-bar)", h: "var(--track-md)" },
    hp: { fill: "var(--grad-hp-bar)", h: "var(--track-hp)" },
    attr: { fill: "var(--grad-vit-bar)", h: "var(--track-thin)" },
    timer: { fill: "var(--grad-vit-bar)", h: "var(--track-thin)" },
  };
  const k = kinds[kind] || kinds.xp;
  const trackH = height || k.h;

  return (
    <div
      style={{
        position: "relative",
        height: trackH,
        borderRadius: "var(--radius-pill)",
        background: "var(--hl-ink-well)",
        boxShadow: "var(--shadow-well)",
        border: kind === "hp" ? "1px solid #4c342f" : "none",
        overflow: "hidden",
        ...style,
      }}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemax={max}
      {...rest}
    >
      <span
        style={{
          display: "block",
          height: "100%",
          width: `${pct}%`,
          borderRadius: "inherit",
          background: color || k.fill,
          transition: "var(--ease-bar)",
        }}
      />
      {label ? (
        <strong
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "var(--hl-ink)",
            textShadow: "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          {label}
        </strong>
      ) : null}
    </div>
  );
}
