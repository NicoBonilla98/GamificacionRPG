// Hero's Ledger UI kit — shared chrome: phone shell, top bar, tab bar, login.
// Composes design-system primitives from the global namespace.
const DS = window.HeroSLedgerDesignSystem_858ec3;
const { Button, Pill, ProgressBar, Input } = DS;

const SHELL_W = 430;

/* ---- The 430px phone shell with ribbed board surface ---- */
function PhoneShell({ children }) {
  return (
    <div
      style={{
        width: `min(100%, ${SHELL_W}px)`,
        minHeight: "100%",
        margin: "0 auto",
        position: "relative",
        background: "var(--bg-shell)",
        boxShadow: "var(--shadow-shell)",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

/* ---- Top bar: avatar, level + name, density toggle, streak chip ---- */
function TopBar({ hero, density = "compact", onDensity }) {
  return (
    <header
      style={{
        height: "var(--topbar-height)",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        background: "var(--grad-topbar)",
        borderBottom: "1px solid var(--hl-line)",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          flex: "0 0 auto",
          border: "2px solid var(--hl-gold)",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: "var(--hl-bg)",
        }}
      >
        <img src="../../assets/pixel-hero.svg" alt="" style={{ width: "68%", height: "68%", imageRendering: "pixelated" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span className="hl-eyebrow">Nivel {hero.level}</span>
        <h2 style={{ font: "var(--type-topbar)", color: "var(--hl-gold)", textShadow: "var(--text-engrave)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {hero.name}
        </h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "0 0 auto" }}>
        {onDensity ? (
          <button
            type="button"
            onClick={() => onDensity(density === "compact" ? "comfortable" : "compact")}
            title={density === "compact" ? "Vista compacta — toca para más espacio" : "Vista cómoda — toca para compactar"}
            aria-label="Cambiar densidad"
            style={{
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
              cursor: "pointer",
            }}
          >
            {density === "compact" ? "\u2630" : "\u2261"}
          </button>
        ) : null}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            border: "1px solid var(--border-gold)",
            borderRadius: "var(--radius-pill)",
            background: "rgba(242,204,69,0.08)",
          }}
          title="Racha de constancia"
        >
          <span style={{ fontSize: "1.2rem" }}>🔥</span>
          <strong style={{ color: "var(--hl-gold)", fontFamily: "var(--font-body)", fontSize: "1.1rem" }}>{hero.streak}</strong>
        </div>
      </div>
    </header>
  );
}

/* ---- Bottom tab bar ---- */
const TABS = [
  { id: "quests", glyph: "⚔", label: "Quests" },
  { id: "boss", glyph: "♜", label: "Boss" },
  { id: "expedition", glyph: "✦", label: "Expedición" },
  { id: "character", glyph: "✥", label: "Héroe" },
];

function TabBar({ active, onChange }) {
  return (
    <nav
      aria-label="Navegación principal"
      style={{
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
        backdropFilter: "blur(6px)",
      }}
    >
      {TABS.map((t) => {
        const on = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            style={{
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
              cursor: "pointer",
            }}
          >
            {t.glyph}
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 900 }}>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* ---- A reusable section heading (title + optional pill) ---- */
function SectionHeading({ title, children, margin = "34px 0 18px", size = "var(--type-title)", style = {} }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px", margin, ...style }}>
      <h3 style={{ font: size, color: "var(--hl-gold)", textShadow: "var(--text-engrave)" }}>{title}</h3>
      {children}
    </div>
  );
}

/* ---- Login / vault screen ---- */
function LoginScreen({ onEnter }) {
  const [name, setName] = React.useState("Thorne de Valdris");
  return (
    <section style={{ minHeight: "100%", padding: "9vh 24px 32px", textAlign: "center" }}>
      <div
        style={{
          width: "86px",
          height: "86px",
          margin: "0 auto 40px",
          border: "3px solid var(--hl-gold)",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: "#1b1512",
          boxShadow: "var(--glow-gold)",
        }}
      >
        <img src="../../assets/ledger-mark.svg" alt="" style={{ width: "68%", height: "68%" }} />
      </div>
      <h1 style={{ font: "var(--type-hero)", fontSize: "clamp(3rem,15vw,4.5rem)", color: "var(--hl-gold)", textTransform: "uppercase", textShadow: "var(--text-engrave-glow)", lineHeight: 0.92 }}>
        Hero's<br />Ledger
      </h1>
      <p style={{ marginTop: "24px", color: "var(--hl-muted)", font: "var(--type-body)", fontSize: "1.15rem" }}>
        Convierte tus hábitos reales en la leyenda de tu héroe.
      </p>
      <form
        onSubmit={(e) => { e.preventDefault(); onEnter(name); }}
        style={{
          marginTop: "48px",
          padding: "30px 18px",
          border: "1px solid rgba(242,204,69,0.18)",
          borderRadius: "4px",
          background: "linear-gradient(140deg, rgba(64,54,49,0.78), rgba(24,18,16,0.92))",
          boxShadow: "var(--shadow-panel-edge), var(--shadow-card)",
          display: "grid",
          gap: "24px",
        }}
      >
        <Input label="Nombre del héroe" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Thorne de Valdris" />
        <Input label="Llave de la bóveda" type="password" defaultValue="secret123" placeholder="••••••••" />
        <Button variant="primary" size="lg" fullWidth type="submit">Comenzar la aventura</Button>
      </form>
    </section>
  );
}

Object.assign(window, { PhoneShell, TopBar, TabBar, SectionHeading, LoginScreen, HL_TABS: TABS });
