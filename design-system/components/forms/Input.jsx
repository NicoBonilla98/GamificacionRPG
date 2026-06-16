import React from "react";

/**
 * Hero's Ledger — Input
 * The deep, recessed text field from the login vault. Label is a heavy
 * sans caption; the field is an ink-well that lights its border gold on
 * focus.
 */
export function Input({ label = null, hint = null, id = null, style = {}, ...rest }) {
  const fieldId = id || (label ? `fld-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

  return (
    <label htmlFor={fieldId} style={{ display: "block", textAlign: "left", ...style }}>
      {label ? (
        <span
          style={{
            display: "block",
            color: "var(--hl-muted)",
            fontFamily: "var(--font-body)",
            fontWeight: 800,
            letterSpacing: "0.02em",
            fontSize: "0.95rem",
          }}
        >
          {label}
        </span>
      ) : null}
      <input
        id={fieldId}
        style={{
          width: "100%",
          minHeight: "var(--control-md)",
          marginTop: label ? "12px" : 0,
          padding: "0 22px",
          border: "2px solid #2f2520",
          borderRadius: "9px",
          background: "var(--hl-ink-well)",
          color: "var(--hl-ink)",
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          outline: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--hl-gold)")}
        onBlur={(e) => (e.target.style.borderColor = "#2f2520")}
        {...rest}
      />
      {hint ? (
        <span style={{ display: "block", marginTop: "8px", color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 400 }}>
          {hint}
        </span>
      ) : null}
    </label>
  );
}
