import React from "react";

/**
 * Hero's Ledger — Pill
 * The small uppercase chip used for counts ("3 pendientes"), tiers
 * ("INT ≥ 50"), and status tags. Default is the neutral panel chip;
 * `tone` tints it for streak multipliers, keys, and rewards.
 */
export function Pill({ tone = "neutral", icon = null, children, style = {}, ...rest }) {
  const tones = {
    neutral: { background: "#403733", color: "var(--hl-muted)", border: "1px solid transparent" },
    gold: { background: "rgba(242, 204, 69, 0.08)", color: "var(--hl-gold)", border: "1px solid var(--border-gold)" },
    green: { background: "transparent", color: "var(--hl-green)", border: "1px solid rgba(126, 203, 142, 0.4)" },
    violet: { background: "rgba(177, 139, 255, 0.12)", color: "var(--hl-attr-foc)", border: "1px solid rgba(177, 139, 255, 0.4)" },
    danger: { background: "rgba(212, 59, 74, 0.1)", color: "var(--hl-rose)", border: "1px solid rgba(212, 59, 74, 0.4)" },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 14px",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-body)",
        fontSize: "0.85rem",
        fontWeight: 900,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </span>
  );
}
