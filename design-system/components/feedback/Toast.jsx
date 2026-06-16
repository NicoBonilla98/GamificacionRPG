import React from "react";

/**
 * Hero's Ledger — Toast
 * The "pop notification" that celebrates every gain: level-ups, attribute
 * bumps, drops, defeats. A left-rail in the event color, a glyph, and a
 * short line. Color it with the attribute hue for stat pops (STR red,
 * INT blue, …) per the design spec.
 */
export function Toast({ color = "var(--hl-gold)", icon = "✦", show = true, children, style = {}, ...rest }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        borderRadius: "var(--radius-md)",
        border: `1px solid ${color}`,
        borderLeftWidth: "4px",
        background: "rgba(20, 15, 13, 0.96)",
        color: "var(--hl-ink)",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: "0.85rem",
        boxShadow: "var(--shadow-pop)",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(12px)",
        transition: "var(--ease-toast)",
        "--toast-color": color,
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>{icon}</span>
      <span>{children}</span>
    </div>
  );
}
