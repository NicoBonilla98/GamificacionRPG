import React from "react";

/**
 * Hero's Ledger — AttributeMeter
 * The character-screen stat row: label + ID on a colored left rail, a
 * thin meter filled in the attribute hue, and the current value with an
 * optional "→ next threshold" hint. One per STR/INT/VIT/DIS/FOC.
 */
const ATTR = {
  STR: { label: "Fuerza", color: "var(--hl-attr-str)" },
  INT: { label: "Inteligencia", color: "var(--hl-attr-int)" },
  VIT: { label: "Vitalidad", color: "var(--hl-attr-vit)" },
  DIS: { label: "Disciplina", color: "var(--hl-attr-dis)" },
  FOC: { label: "Foco", color: "var(--hl-attr-foc)" },
};

export function AttributeMeter({ attr = "STR", value = 0, max = 50, bonus = 0, next = null, style = {}, ...rest }) {
  const a = ATTR[attr] || ATTR.STR;
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));

  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "104px 1fr auto",
        alignItems: "center",
        gap: "12px",
        padding: "14px",
        border: "1px solid var(--border-panel)",
        borderLeft: `3px solid ${a.color}`,
        borderRadius: "var(--radius-sm)",
        background: "rgba(0, 0, 0, 0.2)",
        fontFamily: "var(--font-body)",
        ...style,
      }}
      {...rest}
    >
      <div>
        <strong style={{ color: "var(--hl-ink)", fontSize: "0.9rem" }}>{a.label}</strong>
        <small style={{ display: "block", marginTop: "3px", color: a.color, fontWeight: 900, fontSize: "0.72rem", textTransform: "uppercase" }}>
          {attr}
          {bonus > 0 ? ` · +${bonus} equipo` : ""}
        </small>
      </div>
      <div style={{ height: "var(--track-thin)", borderRadius: "var(--radius-pill)", background: "var(--hl-ink-well)", boxShadow: "var(--shadow-well)", overflow: "hidden" }}>
        <span style={{ display: "block", height: "100%", width: `${pct}%`, borderRadius: "inherit", background: a.color, transition: "var(--ease-bar)" }} />
      </div>
      <div style={{ textAlign: "right" }}>
        <strong style={{ color: "var(--hl-gold)", fontSize: "1rem" }}>{value}</strong>
        <em style={{ display: "block", color: "var(--hl-muted)", fontSize: "0.68rem", fontStyle: "normal" }}>{next ? `→ ${next}` : "máx"}</em>
      </div>
    </article>
  );
}
