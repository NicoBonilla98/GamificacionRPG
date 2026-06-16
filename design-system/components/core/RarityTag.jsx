import React from "react";

/**
 * Hero's Ledger — RarityTag
 * The loot-tier label. Colors track the rarity system: common is muted,
 * rare borrows INT blue, epic borrows FOC violet.
 */
export function RarityTag({ rarity = "common", style = {}, ...rest }) {
  const tiers = {
    common: { label: "Común", color: "var(--hl-rarity-common)", bg: "rgba(255, 255, 255, 0.08)" },
    rare: { label: "Raro", color: "var(--hl-rarity-rare)", bg: "rgba(76, 177, 255, 0.14)" },
    epic: { label: "Épico", color: "var(--hl-rarity-epic)", bg: "rgba(177, 139, 255, 0.16)" },
  };
  const t = tiers[rarity] || tiers.common;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "var(--radius-xs)",
        fontFamily: "var(--font-body)",
        fontSize: "0.7rem",
        fontWeight: 900,
        color: t.color,
        background: t.bg,
        ...style,
      }}
      {...rest}
    >
      {t.label}
    </span>
  );
}
