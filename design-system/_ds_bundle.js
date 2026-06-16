/* @ds-bundle: {"format":3,"namespace":"HeroSLedgerDesignSystem_858ec3","components":[{"name":"AttributeMeter","sourcePath":"components/core/AttributeMeter.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Pill","sourcePath":"components/core/Pill.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"RarityTag","sourcePath":"components/core/RarityTag.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/core/AttributeMeter.jsx":"b421bec4391b","components/core/Button.jsx":"6965051f0596","components/core/Card.jsx":"9fecc694c4e4","components/core/Pill.jsx":"e57fa28de756","components/core/ProgressBar.jsx":"6356bdc4a424","components/core/RarityTag.jsx":"8e4afc6cccfb","components/feedback/Toast.jsx":"00e6cfcaf147","components/forms/Input.jsx":"e4d632ccd5c6","ui_kits/heros-ledger/chrome.jsx":"8487a46688bf","ui_kits/heros-ledger/data.js":"08bf48101137","ui_kits/heros-ledger/screens.jsx":"2e6d323cceea","ui_kits/heros-ledger/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HeroSLedgerDesignSystem_858ec3 = window.HeroSLedgerDesignSystem_858ec3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/AttributeMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hero's Ledger — AttributeMeter
 * The character-screen stat row: label + ID on a colored left rail, a
 * thin meter filled in the attribute hue, and the current value with an
 * optional "→ next threshold" hint. One per STR/INT/VIT/DIS/FOC.
 */
const ATTR = {
  STR: {
    label: "Fuerza",
    color: "var(--hl-attr-str)"
  },
  INT: {
    label: "Inteligencia",
    color: "var(--hl-attr-int)"
  },
  VIT: {
    label: "Vitalidad",
    color: "var(--hl-attr-vit)"
  },
  DIS: {
    label: "Disciplina",
    color: "var(--hl-attr-dis)"
  },
  FOC: {
    label: "Foco",
    color: "var(--hl-attr-foc)"
  }
};
function AttributeMeter({
  attr = "STR",
  value = 0,
  max = 50,
  bonus = 0,
  next = null,
  style = {},
  ...rest
}) {
  const a = ATTR[attr] || ATTR.STR;
  const pct = Math.max(0, Math.min(100, value / (max || 1) * 100));
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--hl-ink)",
      fontSize: "0.9rem"
    }
  }, a.label), /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      marginTop: "3px",
      color: a.color,
      fontWeight: 900,
      fontSize: "0.72rem",
      textTransform: "uppercase"
    }
  }, attr, bonus > 0 ? ` · +${bonus} equipo` : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "var(--track-thin)",
      borderRadius: "var(--radius-pill)",
      background: "var(--hl-ink-well)",
      boxShadow: "var(--shadow-well)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: "100%",
      width: `${pct}%`,
      borderRadius: "inherit",
      background: a.color,
      transition: "var(--ease-bar)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--hl-gold)",
      fontSize: "1rem"
    }
  }, value), /*#__PURE__*/React.createElement("em", {
    style: {
      display: "block",
      color: "var(--hl-muted)",
      fontSize: "0.68rem",
      fontStyle: "normal"
    }
  }, next ? `→ ${next}` : "máx")));
}
Object.assign(__ds_scope, { AttributeMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/AttributeMeter.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hero's Ledger — Button
 * The brand's action primitive. Gold is reserved for the single most
 * important action on a screen ("primary"). Everything else is a quieter
 * outline ("complete" / "mini") or a dashed "ghost" for low-stakes actions.
 */
function Button({
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
    textTransform: "uppercase"
  };
  const sizes = {
    sm: {
      minHeight: "var(--control-mini)",
      padding: "0 14px",
      fontSize: "0.72rem",
      letterSpacing: "0.04em"
    },
    md: {
      minHeight: "var(--hit-min)",
      padding: "0 22px",
      fontSize: "0.95rem",
      letterSpacing: "var(--track-button)"
    },
    lg: {
      minHeight: "var(--control-lg)",
      padding: "0 26px",
      fontSize: "1rem",
      letterSpacing: "var(--track-button)"
    }
  };
  const variants = {
    primary: {
      background: "var(--grad-gold-button)",
      color: "var(--text-on-gold)",
      fontWeight: 950,
      boxShadow: disabled ? "none" : "var(--glow-button)"
    },
    complete: {
      background: "rgba(242, 204, 69, 0.09)",
      color: "var(--hl-gold)",
      fontWeight: 900,
      border: "1px solid rgba(242, 204, 69, 0.5)"
    },
    mini: {
      background: "rgba(242, 204, 69, 0.08)",
      color: "var(--hl-gold)",
      fontWeight: 900,
      border: "1px solid var(--border-gold)"
    },
    ghost: {
      background: "transparent",
      color: "var(--hl-muted)",
      fontWeight: 800,
      border: "1px dashed rgba(255, 255, 255, 0.22)",
      textTransform: "none",
      letterSpacing: "normal"
    },
    danger: {
      background: "rgba(212, 59, 74, 0.12)",
      color: "var(--hl-rose)",
      fontWeight: 900,
      border: "1px solid rgba(212, 59, 74, 0.5)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hero's Ledger — Card
 * The raised, gradient-faced container used for quests, battles, NPCs
 * and panels. `accent` paints the 3px left rail (almost always an
 * attribute hue); `tone` switches between the lit "card" face and the
 * flatter recessed "panel" surface.
 */
function Card({
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
    card: {
      background: "var(--grad-card)",
      border: "1px solid var(--border-hairline)"
    },
    panel: {
      background: "var(--surface-panel)",
      border: "1px solid var(--border-panel)"
    },
    well: {
      background: "rgba(0, 0, 0, 0.24)",
      border: "1px solid var(--border-hairline)"
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      padding: "var(--pad-card)",
      borderRadius: "var(--radius-md)",
      ...tones[tone],
      borderLeft: accent ? `3px solid ${accent}` : tones[tone].border,
      boxShadow: active ? `0 0 0 1px ${accent || "var(--hl-gold)"}` : "none",
      opacity: faded ? 0.55 : 1,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hero's Ledger — Pill
 * The small uppercase chip used for counts ("3 pendientes"), tiers
 * ("INT ≥ 50"), and status tags. Default is the neutral panel chip;
 * `tone` tints it for streak multipliers, keys, and rewards.
 */
function Pill({
  tone = "neutral",
  icon = null,
  children,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      background: "#403733",
      color: "var(--hl-muted)",
      border: "1px solid transparent"
    },
    gold: {
      background: "rgba(242, 204, 69, 0.08)",
      color: "var(--hl-gold)",
      border: "1px solid var(--border-gold)"
    },
    green: {
      background: "transparent",
      color: "var(--hl-green)",
      border: "1px solid rgba(126, 203, 142, 0.4)"
    },
    violet: {
      background: "rgba(177, 139, 255, 0.12)",
      color: "var(--hl-attr-foc)",
      border: "1px solid rgba(177, 139, 255, 0.4)"
    },
    danger: {
      background: "rgba(212, 59, 74, 0.1)",
      color: "var(--hl-rose)",
      border: "1px solid rgba(212, 59, 74, 0.4)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pill.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hero's Ledger — ProgressBar
 * The inset, pill-rounded track used everywhere: XP, boss/hero HP,
 * attribute meters, and expedition progress. `kind` picks the fill
 * gradient; pass `color` to override (e.g. a single attribute hue).
 */
function ProgressBar({
  value = 0,
  max = 100,
  kind = "xp",
  color = null,
  height = null,
  label = null,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / (max || 1) * 100));
  const kinds = {
    xp: {
      fill: "var(--grad-gold-bar)",
      h: "var(--track-md)"
    },
    hp: {
      fill: "var(--grad-hp-bar)",
      h: "var(--track-hp)"
    },
    attr: {
      fill: "var(--grad-vit-bar)",
      h: "var(--track-thin)"
    },
    timer: {
      fill: "var(--grad-vit-bar)",
      h: "var(--track-thin)"
    }
  };
  const k = kinds[kind] || kinds.xp;
  const trackH = height || k.h;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      height: trackH,
      borderRadius: "var(--radius-pill)",
      background: "var(--hl-ink-well)",
      boxShadow: "var(--shadow-well)",
      border: kind === "hp" ? "1px solid #4c342f" : "none",
      overflow: "hidden",
      ...style
    },
    role: "progressbar",
    "aria-valuenow": Math.round(value),
    "aria-valuemax": max
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: "100%",
      width: `${pct}%`,
      borderRadius: "inherit",
      background: color || k.fill,
      transition: "var(--ease-bar)"
    }
  }), label ? /*#__PURE__*/React.createElement("strong", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
      fontFamily: "var(--font-body)",
      fontSize: "0.78rem",
      color: "var(--hl-ink)",
      textShadow: "0 1px 2px rgba(0,0,0,0.8)"
    }
  }, label) : null);
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/RarityTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hero's Ledger — RarityTag
 * The loot-tier label. Colors track the rarity system: common is muted,
 * rare borrows INT blue, epic borrows FOC violet.
 */
function RarityTag({
  rarity = "common",
  style = {},
  ...rest
}) {
  const tiers = {
    common: {
      label: "Común",
      color: "var(--hl-rarity-common)",
      bg: "rgba(255, 255, 255, 0.08)"
    },
    rare: {
      label: "Raro",
      color: "var(--hl-rarity-rare)",
      bg: "rgba(76, 177, 255, 0.14)"
    },
    epic: {
      label: "Épico",
      color: "var(--hl-rarity-epic)",
      bg: "rgba(177, 139, 255, 0.16)"
    }
  };
  const t = tiers[rarity] || tiers.common;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "var(--radius-xs)",
      fontFamily: "var(--font-body)",
      fontSize: "0.7rem",
      fontWeight: 900,
      color: t.color,
      background: t.bg,
      ...style
    }
  }, rest), t.label);
}
Object.assign(__ds_scope, { RarityTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/RarityTag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hero's Ledger — Toast
 * The "pop notification" that celebrates every gain: level-ups, attribute
 * bumps, drops, defeats. A left-rail in the event color, a glyph, and a
 * short line. Color it with the attribute hue for stat pops (STR red,
 * INT blue, …) per the design spec.
 */
function Toast({
  color = "var(--hl-gold)",
  icon = "✦",
  show = true,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: "1.2rem"
    }
  }, icon), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hero's Ledger — Input
 * The deep, recessed text field from the login vault. Label is a heavy
 * sans caption; the field is an ink-well that lights its border gold on
 * focus.
 */
function Input({
  label = null,
  hint = null,
  id = null,
  style = {},
  ...rest
}) {
  const fieldId = id || (label ? `fld-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: "block",
      textAlign: "left",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontWeight: 800,
      letterSpacing: "0.02em",
      fontSize: "0.95rem"
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    style: {
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
      outline: "none"
    },
    onFocus: e => e.target.style.borderColor = "var(--hl-gold)",
    onBlur: e => e.target.style.borderColor = "#2f2520"
  }, rest)), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: "8px",
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "0.8rem",
      fontWeight: 400
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/heros-ledger/chrome.jsx
try { (() => {
// Hero's Ledger UI kit — shared chrome: phone shell, top bar, tab bar, login.
// Composes design-system primitives from the global namespace.
const DS = window.HeroSLedgerDesignSystem_858ec3;
const {
  Button,
  Pill,
  ProgressBar,
  Input
} = DS;
const SHELL_W = 430;

/* ---- The 430px phone shell with ribbed board surface ---- */
function PhoneShell({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: `min(100%, ${SHELL_W}px)`,
      minHeight: "100%",
      margin: "0 auto",
      position: "relative",
      background: "var(--bg-shell)",
      boxShadow: "var(--shadow-shell)",
      overflow: "hidden"
    }
  }, children);
}

/* ---- Top bar: avatar, level + name, density toggle, streak chip ---- */
function TopBar({
  hero,
  density = "compact",
  onDensity
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: "var(--topbar-height)",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      background: "var(--grad-topbar)",
      borderBottom: "1px solid var(--hl-line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "52px",
      height: "52px",
      flex: "0 0 auto",
      border: "2px solid var(--hl-gold)",
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      background: "var(--hl-bg)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel-hero.svg",
    alt: "",
    style: {
      width: "68%",
      height: "68%",
      imageRendering: "pixelated"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hl-eyebrow"
  }, "Nivel ", hero.level), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-topbar)",
      color: "var(--hl-gold)",
      textShadow: "var(--text-engrave)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, hero.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flex: "0 0 auto"
    }
  }, onDensity ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onDensity(density === "compact" ? "comfortable" : "compact"),
    title: density === "compact" ? "Vista compacta — toca para más espacio" : "Vista cómoda — toca para compactar",
    "aria-label": "Cambiar densidad",
    style: {
      width: "40px",
      height: "40px",
      display: "grid",
      placeItems: "center",
      border: "1px solid var(--border-panel)",
      borderRadius: "var(--radius-sm)",
      background: "rgba(0,0,0,0.25)",
      color: "var(--hl-muted)",
      fontSize: "1.1rem",
      lineHeight: 1,
      cursor: "pointer"
    }
  }, density === "compact" ? "\u2630" : "\u2261") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 12px",
      border: "1px solid var(--border-gold)",
      borderRadius: "var(--radius-pill)",
      background: "rgba(242,204,69,0.08)"
    },
    title: "Racha de constancia"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1.2rem"
    }
  }, "\uD83D\uDD25"), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--hl-gold)",
      fontFamily: "var(--font-body)",
      fontSize: "1.1rem"
    }
  }, hero.streak))));
}

/* ---- Bottom tab bar ---- */
const TABS = [{
  id: "quests",
  glyph: "⚔",
  label: "Quests"
}, {
  id: "boss",
  glyph: "♜",
  label: "Boss"
}, {
  id: "expedition",
  glyph: "✦",
  label: "Expedición"
}, {
  id: "character",
  glyph: "✥",
  label: "Héroe"
}];
function TabBar({
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Navegaci\xF3n principal",
    style: {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "4px",
      padding: "12px 16px 16px",
      borderTop: "1px solid var(--border-panel)",
      borderRadius: "14px 14px 0 0",
      background: "rgba(20,14,12,0.97)",
      backdropFilter: "blur(6px)"
    }
  }, TABS.map(t => {
    const on = active === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      type: "button",
      onClick: () => onChange(t.id),
      style: {
        minHeight: "66px",
        border: 0,
        borderRadius: "var(--radius-lg)",
        background: on ? "rgba(242,204,69,0.18)" : "transparent",
        color: on ? "var(--hl-gold)" : "var(--hl-muted)",
        boxShadow: on ? "var(--glow-gold-sm)" : "none",
        display: "grid",
        placeItems: "center",
        gap: "2px",
        fontSize: "1.35rem",
        cursor: "pointer"
      }
    }, t.glyph, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "0.75rem",
        fontWeight: 900
      }
    }, t.label));
  }));
}

/* ---- A reusable section heading (title + optional pill) ---- */
function SectionHeading({
  title,
  children,
  margin = "34px 0 18px",
  size = "var(--type-title)",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "14px",
      margin,
      ...style
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: size,
      color: "var(--hl-gold)",
      textShadow: "var(--text-engrave)"
    }
  }, title), children);
}

/* ---- Login / vault screen ---- */
function LoginScreen({
  onEnter
}) {
  const [name, setName] = React.useState("Thorne de Valdris");
  return /*#__PURE__*/React.createElement("section", {
    style: {
      minHeight: "100%",
      padding: "9vh 24px 32px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "86px",
      height: "86px",
      margin: "0 auto 40px",
      border: "3px solid var(--hl-gold)",
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      background: "#1b1512",
      boxShadow: "var(--glow-gold)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/ledger-mark.svg",
    alt: "",
    style: {
      width: "68%",
      height: "68%"
    }
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-hero)",
      fontSize: "clamp(3rem,15vw,4.5rem)",
      color: "var(--hl-gold)",
      textTransform: "uppercase",
      textShadow: "var(--text-engrave-glow)",
      lineHeight: 0.92
    }
  }, "Hero's", /*#__PURE__*/React.createElement("br", null), "Ledger"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "24px",
      color: "var(--hl-muted)",
      font: "var(--type-body)",
      fontSize: "1.15rem"
    }
  }, "Convierte tus h\xE1bitos reales en la leyenda de tu h\xE9roe."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onEnter(name);
    },
    style: {
      marginTop: "48px",
      padding: "30px 18px",
      border: "1px solid rgba(242,204,69,0.18)",
      borderRadius: "4px",
      background: "linear-gradient(140deg, rgba(64,54,49,0.78), rgba(24,18,16,0.92))",
      boxShadow: "var(--shadow-panel-edge), var(--shadow-card)",
      display: "grid",
      gap: "24px"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nombre del h\xE9roe",
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Ej. Thorne de Valdris"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Llave de la b\xF3veda",
    type: "password",
    defaultValue: "secret123",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    type: "submit"
  }, "Comenzar la aventura")));
}
Object.assign(window, {
  PhoneShell,
  TopBar,
  TabBar,
  SectionHeading,
  LoginScreen,
  HL_TABS: TABS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/heros-ledger/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/heros-ledger/data.js
try { (() => {
// Hero's Ledger — content extracted verbatim from the source app (app.js).
// Quest repository, expedition arcs, bosses, NPCs, equipment and passives.
// This is product copy, not logic — kept as a plain module for the UI kit.

window.HL_DATA = {
  attributes: [{
    id: "STR",
    label: "Fuerza",
    color: "var(--hl-attr-str)"
  }, {
    id: "INT",
    label: "Inteligencia",
    color: "var(--hl-attr-int)"
  }, {
    id: "VIT",
    label: "Vitalidad",
    color: "var(--hl-attr-vit)"
  }, {
    id: "DIS",
    label: "Disciplina",
    color: "var(--hl-attr-dis)"
  }, {
    id: "FOC",
    label: "Foco",
    color: "var(--hl-attr-foc)"
  }],
  // The five quests shown on a typical day (one per attribute slot).
  dailyQuests: [{
    id: "str1",
    attr: "STR",
    name: "Forja del Cuerpo",
    habit: "30 min de entrenamiento de fuerza.",
    xp: 250,
    icon: "⚔"
  }, {
    id: "int1",
    attr: "INT",
    name: "Estudio del Grimorio",
    habit: "Lee o estudia 25 min.",
    xp: 200,
    icon: "📖"
  }, {
    id: "vit3",
    attr: "VIT",
    name: "Descanso Sagrado",
    habit: "Duerme 7-8 horas.",
    xp: 200,
    icon: "🌙"
  }, {
    id: "foc2",
    attr: "FOC",
    name: "Trabajo Profundo",
    habit: "50 min sin interrupciones.",
    xp: 250,
    icon: "🎯"
  }, {
    id: "dis3",
    attr: "DIS",
    name: "Tarea Pendiente",
    habit: "Completa la tarea que evitas.",
    xp: 230,
    icon: "✅"
  }],
  boss: {
    name: "Malakor el Tocado por el Vacío",
    type: "Boss Genérico",
    maxHp: 1200,
    hp: 820,
    art: "../../assets/void-dragon.svg",
    weakness: "FOC",
    drop: "Medalla del Vacío"
  },
  npcs: [{
    attr: "STR",
    name: "Guerrero",
    icon: "⚔",
    effect: "Daño adicional por cada misión completada.",
    when: "Boss con mucha vida."
  }, {
    attr: "INT",
    name: "Sabio",
    icon: "✦",
    effect: "+XP de todas las misiones del combate.",
    when: "Para maximizar XP del día."
  }, {
    attr: "VIT",
    name: "Sanador",
    icon: "✚",
    effect: "Cura PV tras el contraataque del boss.",
    when: "Cuando tienes PV bajos."
  }, {
    attr: "DIS",
    name: "Explorador",
    icon: "▣",
    effect: "Mejora la rareza de los drops.",
    when: "Cuando buscas equipo."
  }, {
    attr: "FOC",
    name: "Mago",
    icon: "◆",
    effect: "Reduce el daño de los ataques del boss.",
    when: "Para sobrevivir sin llegar a 0 PV."
  }],
  consumables: [{
    id: "tonic",
    name: "Tónico de Batalla",
    icon: "🔥",
    effect: "+20% daño al boss hoy",
    stock: 1
  }, {
    id: "elixir",
    name: "Elixir del Bosque",
    icon: "⚗",
    effect: "Recupera 60% PV",
    stock: 1
  }],
  arc: {
    title: "El Bosque de Valdris",
    summary: "Un mal antiguo despierta bajo los árboles de Valdris.",
    npc: {
      name: "Mira",
      role: "Exploradora de Valdris",
      attr: "FOC"
    },
    relic: {
      name: "Espada de Valdris",
      lore: "Forjada por Mira, exploradora de Valdris, brilla cuando el bosque está en peligro."
    },
    keys: 2,
    chapters: [{
      id: "v1",
      title: "Capítulo 1 — El Claro",
      level: "Lv. 1-5",
      tone: "green",
      boss: "Lobo Acorazado",
      key: "Llave del Claro",
      beat: "El lobo llevaba una marca. Alguien lo envió...",
      missions: ["Llegar al bosque", "Encontrar rastros extraños", "Seguir el rastro al claro"],
      progress: 3
    }, {
      id: "v2",
      title: "Capítulo 2 — La Torre",
      level: "Lv. 6-12",
      tone: "amber",
      boss: "El Señor Corrupto",
      key: "Llave de la Torre",
      beat: "El símbolo pertenece a una orden antigua...",
      missions: ["Rastrear al señor del bosque", "Descubrir el campamento", "Sobrevivir la emboscada"],
      progress: 1
    }, {
      id: "v3",
      title: "Capítulo 3 — El Abismo",
      level: "Lv. 13-20",
      tone: "red",
      boss: "El Archimago",
      key: "Sello del Abismo",
      beat: "El ritual casi termina. Algo fue invocado...",
      missions: ["Infiltrar la torre oscura", "Liberar a los prisioneros", "Interrumpir la invocación"],
      progress: 0
    }, {
      id: "v4",
      title: "Capítulo 4 — Final del Arco",
      level: "Lv. 21+",
      tone: "violet",
      boss: "La Entidad del Abismo",
      key: "Reliquia de Valdris",
      beat: "El bosque quedó en silencio. Pero otras tierras esperan...",
      missions: ["La entidad despertó", "Reunir a los aliados", "Forjar el arma final", "La batalla final"],
      progress: 0,
      requiresKeys: 3
    }]
  },
  arcs: [{
    title: "El Bosque de Valdris",
    summary: "Un mal antiguo despierta bajo los árboles de Valdris.",
    keys: 2,
    done: 1,
    total: 4,
    active: true
  }, {
    title: "Las Cimas de Grath",
    summary: "Las montañas heladas guardan un secreto que congela el alma.",
    keys: 0,
    done: 0,
    total: 4,
    active: false
  }, {
    title: "El Mar de Ceniza",
    summary: "Un océano de cenizas esconde una ciudad sumergida.",
    keys: 0,
    done: 0,
    total: 4,
    active: false
  }],
  // Character screen
  hero: {
    name: "Thorne de Valdris",
    level: 7,
    rank: "Aventurero",
    totalXp: 14820,
    currentXp: 420,
    nextXp: 800,
    quests: 63,
    bosses: 4,
    streak: 12,
    streakStep: 3
  },
  charAttributes: [{
    attr: "STR",
    value: 32,
    max: 50,
    bonus: 4,
    next: 50
  }, {
    attr: "INT",
    value: 41,
    max: 50,
    bonus: 2,
    next: 50
  }, {
    attr: "VIT",
    value: 18,
    max: 25,
    bonus: 0,
    next: 25
  }, {
    attr: "DIS",
    value: 27,
    max: 50,
    bonus: 3,
    next: 50
  }, {
    attr: "FOC",
    value: 24,
    max: 25,
    bonus: 0,
    next: 25
  }],
  equipment: [{
    slot: "Arma",
    name: "Filo Rúnico",
    rarity: "rare",
    awakened: true
  }, {
    slot: "Armadura",
    name: "Coraza de Roble",
    rarity: "common",
    awakened: false
  }, {
    slot: "Casco",
    name: "Yelmo del Erudito",
    rarity: "rare",
    awakened: false
  }, {
    slot: "Botas",
    name: "Botas del Viajero",
    rarity: "common",
    awakened: true
  }, {
    slot: "Reliquia",
    name: "Espada de Valdris",
    rarity: "epic",
    awakened: true
  }],
  passives: [{
    attr: "STR",
    name: "Golpe Firme",
    desc: "+5% de daño contra bosses genéricos.",
    on: true
  }, {
    attr: "INT",
    name: "Conocimiento",
    desc: "+10% de XP. Revela la rareza del drop.",
    on: true
  }, {
    attr: "DIS",
    name: "Enfoque",
    desc: "La racha no decae si fallas 1 día/semana.",
    on: true
  }, {
    attr: "FOC",
    name: "Concentración",
    desc: "+1 misión de enfoque disponible por día.",
    on: false
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/heros-ledger/data.js", error: String((e && e.message) || e) }); }

// ui_kits/heros-ledger/screens.jsx
try { (() => {
// Hero's Ledger UI kit — the four app views: Quests, Boss, Expedition, Character.
// Each screen takes a `compact` flag that tightens padding, shrinks art, and
// collapses cards into single rows so the screen reads as fewer, calmer elements.
const DS2 = window.HeroSLedgerDesignSystem_858ec3;
const {
  Button: B,
  Pill: P,
  ProgressBar: PB,
  Card: C,
  AttributeMeter: AM,
  RarityTag: RT
} = DS2;
const D = window.HL_DATA;
const attrColor = id => D.attributes.find(a => a.id === id).color;
const attrLabel = id => D.attributes.find(a => a.id === id).label;
const fmt = n => new Intl.NumberFormat("es-ES").format(Math.round(n));

// Density presets — the single knob that drives "compact" vs "comfortable".
function dims(compact) {
  return compact ? {
    view: "18px 16px",
    pad: "13px",
    gap: "10px",
    sec: "22px 0 12px",
    secSize: "1.5rem",
    icon: 44,
    art: 188,
    panelPad: "16px"
  } : {
    view: "28px 20px",
    pad: "20px",
    gap: "16px",
    sec: "32px 0 18px",
    secSize: "var(--type-title)",
    icon: 52,
    art: 280,
    panelPad: "22px"
  };
}

/* ---- A round complete/check button (replaces the full-width bar) ---- */
function CheckButton({
  done,
  onClick,
  label = "Completar"
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    disabled: done,
    "aria-label": done ? "Completada" : label,
    title: done ? "Completada" : label,
    style: {
      width: "46px",
      height: "46px",
      flex: "0 0 auto",
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      cursor: done ? "default" : "pointer",
      border: `2px solid ${done ? "var(--hl-gold)" : "var(--border-gold)"}`,
      background: done ? "var(--grad-gold-button)" : "rgba(242,204,69,0.06)",
      color: done ? "var(--text-on-gold)" : "var(--hl-gold)",
      fontSize: "1.25rem",
      lineHeight: 1,
      boxShadow: done ? "var(--glow-button)" : "none",
      transition: "background var(--ease-ui)"
    }
  }, done ? "✓" : "›");
}

/* ---- Compact icon tile ---- */
function IconTile({
  glyph,
  color,
  size
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${size}px`,
      height: `${size}px`,
      flex: "0 0 auto",
      borderRadius: "9px",
      display: "grid",
      placeItems: "center",
      background: "var(--hl-ink-well)",
      color: color || "var(--hl-gold)",
      fontSize: `${size * 0.42}px`,
      boxShadow: "var(--shadow-icon-well)"
    }
  }, glyph);
}

/* ============================ QUESTS ============================ */
function QuestsScreen({
  hero,
  done,
  onComplete,
  focus,
  onFocus,
  compact
}) {
  const U = dims(compact);
  const pending = D.dailyQuests.filter(q => !done.includes(q.id)).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: U.view
    }
  }, /*#__PURE__*/React.createElement(C, {
    tone: "panel",
    style: {
      padding: U.panelPad
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--font-heading)",
      fontSize: "1.5rem",
      color: "var(--hl-gold)",
      textShadow: "var(--text-engrave)"
    }
  }, hero.rank), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--hl-gold)",
      fontFamily: "var(--font-body)",
      fontSize: "0.85rem"
    }
  }, fmt(hero.currentXp), " / ", fmt(hero.nextXp), " XP")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "12px"
    }
  }, /*#__PURE__*/React.createElement(PB, {
    kind: "xp",
    value: hero.currentXp,
    max: hero.nextXp
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      marginTop: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "var(--hl-ink)",
      fontFamily: "var(--font-body)",
      fontSize: "0.82rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1rem"
    }
  }, "\uD83D\uDD25"), "D\xEDa ", hero.streak, " \xB7 Escal\xF3n ", hero.streakStep), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement(P, {
    tone: "green",
    style: {
      padding: "4px 9px",
      fontSize: "0.72rem"
    }
  }, "\xD71.4 XP"), /*#__PURE__*/React.createElement(P, {
    tone: "green",
    style: {
      padding: "4px 9px",
      fontSize: "0.72rem"
    }
  }, "\xD71.2 ATR")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "16px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hl-eyebrow",
    style: {
      flex: "0 0 auto",
      fontSize: "0.68rem"
    }
  }, "Enfoque"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "6px",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(FocusPill, {
    label: "Libre",
    active: !focus,
    onClick: () => onFocus(null)
  }), D.attributes.map(a => /*#__PURE__*/React.createElement(FocusPill, {
    key: a.id,
    label: a.id,
    color: a.color,
    active: focus === a.id,
    onClick: () => onFocus(a.id)
  })))), /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Misiones Diarias",
    margin: U.sec,
    size: U.secSize
  }, /*#__PURE__*/React.createElement(P, {
    style: {
      padding: "5px 11px",
      fontSize: "0.78rem"
    }
  }, pending, " pendientes")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: U.gap
    }
  }, D.dailyQuests.map(q => {
    const isDone = done.includes(q.id);
    const col = attrColor(q.attr);
    return /*#__PURE__*/React.createElement(C, {
      key: q.id,
      accent: col,
      faded: isDone,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: U.pad
      }
    }, /*#__PURE__*/React.createElement(IconTile, {
      glyph: q.icon,
      color: col,
      size: U.icon
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("small", {
      style: {
        color: col,
        fontFamily: "var(--font-body)",
        fontWeight: 900,
        textTransform: "uppercase",
        fontSize: "0.66rem",
        letterSpacing: "0.04em"
      }
    }, attrLabel(q.attr), " \xB7 +", q.xp, " XP"), /*#__PURE__*/React.createElement("h4", {
      style: {
        margin: "1px 0 2px",
        font: "var(--font-heading)",
        fontSize: "1.12rem",
        color: "var(--hl-ink)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, q.name), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--hl-muted)",
        fontFamily: "var(--font-body)",
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, q.habit)), /*#__PURE__*/React.createElement(CheckButton, {
      done: isDone,
      onClick: () => onComplete(q.id)
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      margin: "24px 0 4px",
      color: "var(--hl-faint)",
      fontFamily: "var(--font-body)",
      fontWeight: 900,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      fontSize: "0.68rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1.1rem"
    }
  }, "\u231B"), "Nuevas misiones a medianoche \xB7 sin penalizaci\xF3n"));
}
function FocusPill({
  label,
  color,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      flex: 1,
      minWidth: 0,
      height: "40px",
      border: `1px solid ${active ? color || "var(--hl-gold)" : "rgba(255,255,255,0.16)"}`,
      borderRadius: "var(--radius-sm)",
      background: active ? `color-mix(in srgb, ${color || "var(--hl-gold)"} 22%, transparent)` : "rgba(0,0,0,0.25)",
      color: active ? "var(--hl-ink)" : "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "0.74rem",
      fontWeight: 900,
      cursor: "pointer"
    }
  }, label);
}

/* ============================ BOSS ============================ */
function BossScreen({
  selectedNpc,
  onSelectNpc,
  hero,
  compact,
  bossStyle = "pixel",
  bossHp,
  maxHp,
  onAttack
}) {
  const U = dims(compact);
  const boss = D.boss;
  const hp = bossHp != null ? bossHp : boss.hp;
  const max = maxHp != null ? maxHp : boss.maxHp;
  const dead = hp <= 0;
  const [showRoster, setShowRoster] = React.useState(false);
  const npcObj = selectedNpc ? D.npcs.find(n => n.attr === selectedNpc) : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: U.view
    }
  }, bossStyle === "pixel" ?
  /*#__PURE__*/
  /* reduced pixel boss — a compact CRT stage + name + HP below */
  React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: `${Math.round(U.art * 0.78)}px`,
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid rgba(242,204,69,0.22)",
      background: "var(--bg-stage)",
      boxShadow: "var(--shadow-well-deep)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "10px",
      left: "12px",
      font: "900 0.64rem/1 var(--font-mono)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--hl-faint)"
    }
  }, "Boss \xB7 Pixel"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel-monster.svg",
    alt: "",
    style: {
      width: "128px",
      height: "128px",
      imageRendering: "pixelated",
      filter: dead ? "grayscale(1) brightness(0.5)" : "drop-shadow(0 12px 0 rgba(0,0,0,0.28))",
      transition: "filter 400ms"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "22px",
      right: "22px",
      bottom: "18px",
      height: "10px",
      borderRadius: "50%",
      background: "rgba(0,0,0,0.48)",
      filter: "blur(5px)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontWeight: 900,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      fontSize: "0.64rem"
    }
  }, boss.type), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--font-heading)",
      fontSize: "1.3rem",
      color: "var(--hl-gold)",
      textShadow: "var(--text-engrave)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, boss.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement(PB, {
    kind: "hp",
    value: hp,
    max: max,
    label: `${fmt(hp)} / ${fmt(max)} PV`
  }))) :
  /*#__PURE__*/
  /* full key-art boss */
  React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid #4c2f1c"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${U.art}px`,
      background: "#0c0b10",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: boss.art,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: dead ? "grayscale(0.7) brightness(0.6)" : "none",
      transition: "filter 400ms"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      padding: "26px 16px 14px",
      background: "linear-gradient(180deg, transparent, rgba(8,7,10,0.94))"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontWeight: 900,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      fontSize: "0.68rem"
    }
  }, boss.type), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "4px 0 10px",
      font: "var(--font-heading)",
      fontSize: "1.5rem",
      color: "var(--hl-gold)",
      textShadow: "0 2px 10px #000"
    }
  }, boss.name), /*#__PURE__*/React.createElement(PB, {
    kind: "hp",
    value: hp,
    max: max,
    label: `${fmt(hp)} / ${fmt(max)} PV`
  }))), /*#__PURE__*/React.createElement("article", {
    style: {
      marginTop: "16px",
      padding: "13px 14px",
      border: "1px solid rgba(76,177,255,0.35)",
      borderRadius: "10px",
      background: "rgba(12,24,40,0.5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "4px"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--hl-attr-int)",
      fontFamily: "var(--font-body)",
      fontSize: "0.85rem"
    }
  }, "Intel \xB7 INT \u2265 25")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "0.82rem",
      lineHeight: 1.4
    }
  }, "Teme la concentraci\xF3n sostenida. Conviene un NPC ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--hl-attr-foc)"
    }
  }, attrLabel(boss.weakness)), " o Guerrero.")), /*#__PURE__*/React.createElement(SectionHeading, {
    title: "NPC de Apoyo",
    margin: U.sec,
    size: U.secSize
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowRoster(s => !s),
    style: {
      background: "none",
      border: "none",
      color: "var(--hl-gold)",
      fontFamily: "var(--font-body)",
      fontWeight: 900,
      fontSize: "0.75rem",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, showRoster ? "Ocultar" : "Cambiar")), !showRoster && npcObj ? /*#__PURE__*/React.createElement(C, {
    accent: attrColor(npcObj.attr),
    active: true,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: U.pad
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    glyph: npcObj.icon,
    color: attrColor(npcObj.attr),
    size: U.icon
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--hl-ink)",
      fontFamily: "var(--font-body)"
    }
  }, npcObj.name), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "0.8rem",
      marginTop: "2px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, npcObj.effect)), /*#__PURE__*/React.createElement(P, {
    tone: "green",
    style: {
      padding: "5px 10px",
      fontSize: "0.7rem"
    }
  }, "Activo \u2713")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: U.gap
    }
  }, D.npcs.map(n => {
    const col = attrColor(n.attr);
    const on = selectedNpc === n.attr;
    return /*#__PURE__*/React.createElement(C, {
      key: n.attr,
      accent: col,
      active: on,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: U.pad
      }
    }, /*#__PURE__*/React.createElement(IconTile, {
      glyph: n.icon,
      color: col,
      size: U.icon
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--hl-ink)",
        fontFamily: "var(--font-body)"
      }
    }, n.name), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--hl-muted)",
        fontFamily: "var(--font-body)",
        fontSize: "0.8rem",
        marginTop: "2px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, n.effect)), /*#__PURE__*/React.createElement(B, {
      variant: "mini",
      onClick: () => {
        onSelectNpc(n.attr);
        setShowRoster(false);
      }
    }, on ? "✓" : "Elegir"));
  })), /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Misiones de Combate",
    margin: U.sec,
    size: U.secSize
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: U.gap
    }
  }, D.dailyQuests.slice(0, 3).map(q => {
    const col = attrColor(q.attr);
    return /*#__PURE__*/React.createElement(C, {
      key: q.id,
      accent: col,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: U.pad
      }
    }, /*#__PURE__*/React.createElement(IconTile, {
      glyph: q.icon,
      color: col,
      size: U.icon
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        font: "var(--font-heading)",
        fontSize: "1.05rem",
        color: "var(--hl-ink)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, q.name), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--hl-muted)",
        fontFamily: "var(--font-body)",
        fontSize: "0.78rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, q.habit)), /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--hl-gold)",
        fontFamily: "var(--font-body)",
        textAlign: "center",
        lineHeight: 1,
        flex: "0 0 auto"
      }
    }, fmt(q.xp * 1.4), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.62rem",
        color: "var(--hl-muted)"
      }
    }, "DMG")));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "20px",
      display: "grid",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement(B, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    disabled: dead,
    onClick: onAttack
  }, dead ? "🏆 Boss derrotado" : "⚔ Desatar ataque"), /*#__PURE__*/React.createElement(B, {
    variant: "ghost",
    fullWidth: true
  }, "Cierre del d\xEDa (ataque nocturno)")));
}

/* ============================ EXPEDITION ============================ */
function ExpeditionScreen({
  compact
}) {
  const U = dims(compact);
  const arc = D.arc;
  const doneCh = arc.chapters.filter(c => c.progress >= c.missions.length).length;
  const toneColor = {
    green: "var(--hl-green)",
    amber: "var(--hl-gold)",
    red: "var(--hl-danger)",
    violet: "var(--hl-attr-foc)"
  };
  const [openCh, setOpenCh] = React.useState("v2"); // expand the in-progress chapter only
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: U.view
    }
  }, /*#__PURE__*/React.createElement(C, {
    tone: "panel",
    style: {
      display: "grid",
      gap: "10px",
      padding: U.panelPad
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hl-eyebrow",
    style: {
      fontSize: "0.68rem"
    }
  }, "Arco activo \xB7 rotaci\xF3n semanal"), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--font-heading)",
      fontSize: "1.5rem",
      color: "var(--hl-gold)",
      textShadow: "var(--text-engrave)"
    }
  }, arc.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "0.85rem"
    }
  }, arc.summary), /*#__PURE__*/React.createElement(PB, {
    kind: "xp",
    value: doneCh,
    max: arc.chapters.length
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--hl-gold)",
      fontFamily: "var(--font-body)",
      fontSize: "0.85rem"
    }
  }, doneCh, " / ", arc.chapters.length, " cap\xEDtulos"), /*#__PURE__*/React.createElement(P, {
    tone: "gold",
    icon: "\uD83D\uDDDD",
    style: {
      padding: "4px 10px",
      fontSize: "0.72rem"
    }
  }, arc.keys, " llaves"))), /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Arcos en rotaci\xF3n",
    margin: U.sec,
    size: U.secSize
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "8px"
    }
  }, D.arcs.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.title,
    style: {
      padding: "12px 10px",
      border: `1px solid ${a.active ? "rgba(126,203,142,0.6)" : "var(--border-hairline)"}`,
      borderRadius: "10px",
      background: a.active ? "rgba(16,83,65,0.55)" : "rgba(0,0,0,0.24)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: a.active ? "var(--hl-green)" : "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontWeight: 900,
      fontSize: "0.64rem",
      textTransform: "uppercase"
    }
  }, a.active ? "▶ Activo" : "⏸ Espera"), /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      margin: "5px 0 4px",
      color: "var(--hl-ink)",
      fontFamily: "var(--font-heading)",
      fontSize: "0.9rem",
      lineHeight: 1.15
    }
  }, a.title), /*#__PURE__*/React.createElement("small", {
    style: {
      color: "var(--hl-gold)",
      fontFamily: "var(--font-body)",
      fontSize: "0.68rem",
      fontWeight: 900
    }
  }, a.keys, "\uD83D\uDDDD \xB7 ", a.done, "/", a.total)))), /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Cap\xEDtulos",
    margin: U.sec,
    size: U.secSize
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: U.gap
    }
  }, arc.chapters.map((ch, idx) => {
    const total = ch.missions.length;
    const complete = ch.progress >= total;
    const prevDone = idx === 0 || arc.chapters[idx - 1].progress >= arc.chapters[idx - 1].missions.length;
    const keyLock = ch.requiresKeys && arc.keys < ch.requiresKeys;
    const locked = !prevDone || keyLock;
    const tc = toneColor[ch.tone];
    const open = openCh === ch.id;
    return /*#__PURE__*/React.createElement("article", {
      key: ch.id,
      style: {
        border: `1px solid ${tc}`,
        borderRadius: "10px",
        background: "rgba(0,0,0,0.24)",
        opacity: locked ? 0.6 : 1,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => !locked && setOpenCh(open ? null : ch.id),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "13px 14px",
        background: "none",
        border: "none",
        textAlign: "left",
        cursor: locked ? "default" : "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        display: "block",
        color: "var(--hl-ink)",
        fontFamily: "var(--font-heading)",
        fontSize: "1rem"
      }
    }, ch.title), /*#__PURE__*/React.createElement("small", {
      style: {
        color: "var(--hl-muted)",
        fontFamily: "var(--font-body)",
        fontSize: "0.72rem"
      }
    }, ch.level, " \xB7 ", ch.progress, "/", total, " misiones")), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "0 0 auto",
        color: tc,
        fontFamily: "var(--font-body)",
        fontSize: "0.78rem",
        fontWeight: 900
      }
    }, complete ? "✓" : locked ? "🔒" : open ? "▾" : "▸")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: "5px",
        background: "var(--hl-ink-well)",
        margin: "0 14px",
        borderRadius: "var(--radius-pill)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        height: "100%",
        width: `${ch.progress / total * 100}%`,
        background: "var(--grad-vit-bar)"
      }
    })), open && !locked ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 14px 14px",
        display: "grid",
        gap: "10px"
      }
    }, /*#__PURE__*/React.createElement("ul", {
      style: {
        margin: 0,
        paddingLeft: "18px",
        display: "grid",
        gap: "3px"
      }
    }, ch.missions.map((m, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        color: i < ch.progress ? "var(--hl-green)" : "var(--hl-muted)",
        textDecoration: i < ch.progress ? "line-through" : "none",
        fontFamily: "var(--font-body)",
        fontSize: "0.82rem"
      }
    }, m))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        fontFamily: "var(--font-body)",
        fontSize: "0.76rem",
        fontWeight: 900
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--hl-gold)"
      }
    }, "\u2694 ", ch.boss), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--hl-gold)"
      }
    }, "\uD83D\uDDDD ", ch.key)), /*#__PURE__*/React.createElement("blockquote", {
      style: {
        margin: 0,
        padding: "10px 12px",
        border: "1px solid var(--border-hairline)",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.04)",
        color: "var(--hl-muted)",
        fontFamily: "var(--font-body)",
        fontStyle: "italic",
        fontSize: "0.8rem"
      }
    }, "\"", ch.beat, "\""), /*#__PURE__*/React.createElement(B, {
      variant: "complete",
      disabled: complete
    }, complete ? "Completado ✓" : "Avanzar misión")) : null);
  })), /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Recompensa del arco",
    margin: U.sec,
    size: U.secSize
  }), /*#__PURE__*/React.createElement("article", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: U.pad,
      border: "1px solid rgba(242,204,69,0.5)",
      borderRadius: "10px",
      background: "linear-gradient(145deg, rgba(79,62,22,0.5), rgba(27,20,18,0.94))"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--hl-gold)",
      fontSize: "1.6rem",
      flex: "0 0 auto"
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--hl-ink)",
      fontFamily: "var(--font-body)"
    }
  }, arc.relic.name), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "0.8rem",
      marginTop: "3px"
    }
  }, "Reliquia \xE9pica \u2014 ", arc.npc.name, ", ", arc.npc.role, " (", arc.npc.attr, ")"))));
}

/* ============================ CHARACTER ============================ */
function CharacterScreen({
  hero,
  compact
}) {
  const U = dims(compact);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: U.view
    }
  }, /*#__PURE__*/React.createElement(C, {
    tone: "panel",
    style: {
      display: "grid",
      gap: "14px",
      padding: U.panelPad
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "48px",
      height: "48px",
      flex: "0 0 auto",
      border: "2px solid var(--hl-gold)",
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      background: "var(--hl-bg)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel-hero.svg",
    alt: "",
    style: {
      width: "70%",
      height: "70%",
      imageRendering: "pixelated"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--font-heading)",
      fontSize: "1.4rem",
      color: "var(--hl-gold)",
      textShadow: "var(--text-engrave)"
    }
  }, hero.name), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "0.82rem"
    }
  }, "Nivel ", hero.level, " \xB7 ", hero.rank))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "8px"
    }
  }, [[fmt(hero.totalXp), "XP total"], [hero.quests, "quests"], [hero.bosses, "bosses"]].map(([v, l]) => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      padding: "10px",
      borderRadius: "8px",
      background: "rgba(0,0,0,0.24)",
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "0.72rem",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      color: "var(--hl-gold)",
      fontSize: "1.1rem"
    }
  }, v), l)))), /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Atributos",
    margin: U.sec,
    size: U.secSize
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "10px"
    }
  }, D.charAttributes.map(a => /*#__PURE__*/React.createElement(AM, {
    key: a.attr,
    attr: a.attr,
    value: a.value,
    max: a.max,
    bonus: a.bonus,
    next: a.next
  }))), /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Equipo",
    margin: U.sec,
    size: U.secSize
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "8px"
    }
  }, D.equipment.map(it => /*#__PURE__*/React.createElement("article", {
    key: it.slot,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "11px 13px",
      border: `1px solid ${it.awakened ? "rgba(242,204,69,0.45)" : "var(--border-panel)"}`,
      borderRadius: "8px",
      background: "rgba(0,0,0,0.2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      textAlign: "center",
      color: "var(--hl-gold)",
      fontSize: "1.1rem",
      flex: "0 0 auto"
    }
  }, slotGlyph(it.slot)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--hl-ink)",
      fontFamily: "var(--font-body)",
      fontSize: "0.88rem"
    }
  }, it.name), /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      color: "var(--hl-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "0.68rem",
      textTransform: "uppercase",
      fontWeight: 900
    }
  }, it.slot, it.awakened ? " · despierto" : "")), /*#__PURE__*/React.createElement(RT, {
    rarity: it.rarity
  })))), /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Habilidades Pasivas",
    margin: U.sec,
    size: U.secSize
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "8px"
    }
  }, D.passives.map(p => {
    const col = attrColor(p.attr);
    return /*#__PURE__*/React.createElement("article", {
      key: p.name,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "11px 13px",
        border: "1px solid var(--border-hairline)",
        borderLeft: `3px solid ${col}`,
        borderRadius: "8px",
        background: "rgba(0,0,0,0.22)",
        opacity: p.on ? 1 : 0.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: "28px",
        height: "28px",
        flex: "0 0 auto",
        display: "grid",
        placeItems: "center",
        borderRadius: "6px",
        background: "rgba(255,255,255,0.08)",
        color: col,
        fontFamily: "var(--font-body)",
        fontSize: "0.66rem",
        fontWeight: 900
      }
    }, p.attr), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--hl-ink)",
        fontFamily: "var(--font-body)",
        fontSize: "0.85rem"
      }
    }, p.name), /*#__PURE__*/React.createElement("small", {
      style: {
        display: "block",
        color: "var(--hl-muted)",
        fontFamily: "var(--font-body)",
        fontSize: "0.7rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, p.desc)), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "0 0 auto",
        color: p.on ? "var(--hl-green)" : "var(--hl-faint)"
      }
    }, p.on ? "✓" : "—"));
  })));
}
function slotGlyph(slot) {
  return {
    "Arma": "⚔",
    "Armadura": "🛡",
    "Casco": "⛑",
    "Botas": "🥾",
    "Reliquia": "✦",
    "Accesorio": "◈"
  }[slot] || "◆";
}
Object.assign(window, {
  QuestsScreen,
  BossScreen,
  ExpeditionScreen,
  CharacterScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/heros-ledger/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/heros-ledger/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/heros-ledger/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AttributeMeter = __ds_scope.AttributeMeter;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.RarityTag = __ds_scope.RarityTag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Input = __ds_scope.Input;

})();
