import React from "react";

/**
 * Hero's Ledger — Card
 * The raised, gradient-faced container used for quests, battles, NPCs
 * and panels. `accent` paints the 3px left rail (almost always an
 * attribute hue); `tone` switches between the lit "card" face and the
 * flatter recessed "panel" surface.
 */
export function Card({
  accent = null,
  tone = "card",
  active = false,
  faded = false,
  as = "article",
  children,
  style = {},
  ...rest
}) {
  const Tag = as;
  const tones = {
    card: { background: "var(--grad-card)", border: "1px solid var(--border-hairline)" },
    panel: { background: "var(--surface-panel)", border: "1px solid var(--border-panel)" },
    well: { background: "rgba(0, 0, 0, 0.24)", border: "1px solid var(--border-hairline)" },
  };

  return (
    <Tag
      style={{
        padding: "var(--pad-card)",
        borderRadius: "var(--radius-md)",
        ...tones[tone],
        borderLeft: accent ? `3px solid ${accent}` : tones[tone].border,
        boxShadow: active ? `0 0 0 1px ${accent || "var(--hl-gold)"}` : "none",
        opacity: faded ? 0.55 : 1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
