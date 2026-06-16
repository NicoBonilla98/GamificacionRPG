import React from "react";

/**
 * Hero's Ledger — Button
 * The brand's action primitive. Gold is reserved for the single most
 * important action on a screen ("primary"). Everything else is a quieter
 * outline ("complete" / "mini") or a dashed "ghost" for low-stakes actions.
 */
export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  icon = null,
  fullWidth = false,
  children,
  style = {},
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-body)",
    cursor: disabled ? "default" : "pointer",
    border: "0",
    borderRadius: "var(--radius-md)",
    width: fullWidth ? "100%" : "auto",
    transition: "filter var(--ease-ui), opacity var(--ease-ui)",
    opacity: disabled ? 0.5 : 1,
    textTransform: "uppercase",
  };

  const sizes = {
    sm: { minHeight: "var(--control-mini)", padding: "0 14px", fontSize: "0.72rem", letterSpacing: "0.04em" },
    md: { minHeight: "var(--hit-min)", padding: "0 22px", fontSize: "0.95rem", letterSpacing: "var(--track-button)" },
    lg: { minHeight: "var(--control-lg)", padding: "0 26px", fontSize: "1rem", letterSpacing: "var(--track-button)" },
  };

  const variants = {
    primary: {
      background: "var(--grad-gold-button)",
      color: "var(--text-on-gold)",
      fontWeight: 950,
      boxShadow: disabled ? "none" : "var(--glow-button)",
    },
    complete: {
      background: "rgba(242, 204, 69, 0.09)",
      color: "var(--hl-gold)",
      fontWeight: 900,
      border: "1px solid rgba(242, 204, 69, 0.5)",
    },
    mini: {
      background: "rgba(242, 204, 69, 0.08)",
      color: "var(--hl-gold)",
      fontWeight: 900,
      border: "1px solid var(--border-gold)",
    },
    ghost: {
      background: "transparent",
      color: "var(--hl-muted)",
      fontWeight: 800,
      border: "1px dashed rgba(255, 255, 255, 0.22)",
      textTransform: "none",
      letterSpacing: "normal",
    },
    danger: {
      background: "rgba(212, 59, 74, 0.12)",
      color: "var(--hl-rose)",
      fontWeight: 900,
      border: "1px solid rgba(212, 59, 74, 0.5)",
    },
  };

  return (
    <button
      type="button"
      disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      {...rest}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </button>
  );
}
