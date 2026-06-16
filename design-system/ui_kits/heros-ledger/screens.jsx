// Hero's Ledger UI kit — the four app views: Quests, Boss, Expedition, Character.
// Each screen takes a `compact` flag that tightens padding, shrinks art, and
// collapses cards into single rows so the screen reads as fewer, calmer elements.
const DS2 = window.HeroSLedgerDesignSystem_858ec3;
const { Button: B, Pill: P, ProgressBar: PB, Card: C, AttributeMeter: AM, RarityTag: RT } = DS2;
const D = window.HL_DATA;
const attrColor = (id) => D.attributes.find((a) => a.id === id).color;
const attrLabel = (id) => D.attributes.find((a) => a.id === id).label;
const fmt = (n) => new Intl.NumberFormat("es-ES").format(Math.round(n));

// Density presets — the single knob that drives "compact" vs "comfortable".
function dims(compact) {
  return compact
    ? { view: "18px 16px", pad: "13px", gap: "10px", sec: "22px 0 12px", secSize: "1.5rem", icon: 44, art: 188, panelPad: "16px" }
    : { view: "28px 20px", pad: "20px", gap: "16px", sec: "32px 0 18px", secSize: "var(--type-title)", icon: 52, art: 280, panelPad: "22px" };
}

/* ---- A round complete/check button (replaces the full-width bar) ---- */
function CheckButton({ done, onClick, label = "Completar" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={done}
      aria-label={done ? "Completada" : label}
      title={done ? "Completada" : label}
      style={{
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
        transition: "background var(--ease-ui)",
      }}
    >
      {done ? "✓" : "›"}
    </button>
  );
}

/* ---- Compact icon tile ---- */
function IconTile({ glyph, color, size }) {
  return (
    <div style={{ width: `${size}px`, height: `${size}px`, flex: "0 0 auto", borderRadius: "9px", display: "grid", placeItems: "center", background: "var(--hl-ink-well)", color: color || "var(--hl-gold)", fontSize: `${size * 0.42}px`, boxShadow: "var(--shadow-icon-well)" }}>
      {glyph}
    </div>
  );
}

/* ============================ QUESTS ============================ */
function QuestsScreen({ hero, done, onComplete, focus, onFocus, compact }) {
  const U = dims(compact);
  const pending = D.dailyQuests.filter((q) => !done.includes(q.id)).length;
  return (
    <div style={{ padding: U.view }}>
      {/* rank + streak — one tight panel */}
      <C tone="panel" style={{ padding: U.panelPad }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <h3 style={{ font: "var(--font-heading)", fontSize: "1.5rem", color: "var(--hl-gold)", textShadow: "var(--text-engrave)" }}>{hero.rank}</h3>
          <strong style={{ color: "var(--hl-gold)", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>{fmt(hero.currentXp)} / {fmt(hero.nextXp)} XP</strong>
        </div>
        <div style={{ marginTop: "12px" }}><PB kind="xp" value={hero.currentXp} max={hero.nextXp} /></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginTop: "12px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--hl-ink)", fontFamily: "var(--font-body)", fontSize: "0.82rem" }}>
            <span style={{ fontSize: "1rem" }}>🔥</span>Día {hero.streak} · Escalón {hero.streakStep}
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <P tone="green" style={{ padding: "4px 9px", fontSize: "0.72rem" }}>×1.4 XP</P>
            <P tone="green" style={{ padding: "4px 9px", fontSize: "0.72rem" }}>×1.2 ATR</P>
          </div>
        </div>
      </C>

      {/* focus selector — one tidy row */}
      <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
        <span className="hl-eyebrow" style={{ flex: "0 0 auto", fontSize: "0.68rem" }}>Enfoque</span>
        <div style={{ display: "flex", gap: "6px", flex: 1 }}>
          <FocusPill label="Libre" active={!focus} onClick={() => onFocus(null)} />
          {D.attributes.map((a) => (
            <FocusPill key={a.id} label={a.id} color={a.color} active={focus === a.id} onClick={() => onFocus(a.id)} />
          ))}
        </div>
      </div>

      <SectionHeading title="Misiones Diarias" margin={U.sec} size={U.secSize}>
        <P style={{ padding: "5px 11px", fontSize: "0.78rem" }}>{pending} pendientes</P>
      </SectionHeading>

      <div style={{ display: "grid", gap: U.gap }}>
        {D.dailyQuests.map((q) => {
          const isDone = done.includes(q.id);
          const col = attrColor(q.attr);
          return (
            <C key={q.id} accent={col} faded={isDone} style={{ display: "flex", alignItems: "center", gap: "12px", padding: U.pad }}>
              <IconTile glyph={q.icon} color={col} size={U.icon} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <small style={{ color: col, fontFamily: "var(--font-body)", fontWeight: 900, textTransform: "uppercase", fontSize: "0.66rem", letterSpacing: "0.04em" }}>{attrLabel(q.attr)} · +{q.xp} XP</small>
                <h4 style={{ margin: "1px 0 2px", font: "var(--font-heading)", fontSize: "1.12rem", color: "var(--hl-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{q.name}</h4>
                <p style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.8rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{q.habit}</p>
              </div>
              <CheckButton done={isDone} onClick={() => onComplete(q.id)} />
            </C>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", margin: "24px 0 4px", color: "var(--hl-faint)", fontFamily: "var(--font-body)", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.68rem" }}>
        <span style={{ fontSize: "1.1rem" }}>⌛</span>Nuevas misiones a medianoche · sin penalización
      </div>
    </div>
  );
}

function FocusPill({ label, color, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
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
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

/* ============================ BOSS ============================ */
function BossScreen({ selectedNpc, onSelectNpc, hero, compact, bossStyle = "pixel", bossHp, maxHp, onAttack }) {
  const U = dims(compact);
  const boss = D.boss;
  const hp = bossHp != null ? bossHp : boss.hp;
  const max = maxHp != null ? maxHp : boss.maxHp;
  const dead = hp <= 0;
  const [showRoster, setShowRoster] = React.useState(false);
  const npcObj = selectedNpc ? D.npcs.find((n) => n.attr === selectedNpc) : null;
  return (
    <div style={{ padding: U.view }}>
      {bossStyle === "pixel" ? (
        /* reduced pixel boss — a compact CRT stage + name + HP below */
        <div>
          <div style={{ position: "relative", height: `${Math.round(U.art * 0.78)}px`, borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(242,204,69,0.22)", background: "var(--bg-stage)", boxShadow: "var(--shadow-well-deep)", display: "grid", placeItems: "center" }}>
            <span style={{ position: "absolute", top: "10px", left: "12px", font: "900 0.64rem/1 var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--hl-faint)" }}>Boss · Pixel</span>
            <img src="../../assets/pixel-monster.svg" alt="" style={{ width: "128px", height: "128px", imageRendering: "pixelated", filter: dead ? "grayscale(1) brightness(0.5)" : "drop-shadow(0 12px 0 rgba(0,0,0,0.28))", transition: "filter 400ms" }} />
            <div style={{ position: "absolute", left: "22px", right: "22px", bottom: "18px", height: "10px", borderRadius: "50%", background: "rgba(0,0,0,0.48)", filter: "blur(5px)" }} />
          </div>
          <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
            <div style={{ minWidth: 0 }}>
              <span style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "0.64rem" }}>{boss.type}</span>
              <h3 style={{ font: "var(--font-heading)", fontSize: "1.3rem", color: "var(--hl-gold)", textShadow: "var(--text-engrave)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{boss.name}</h3>
            </div>
          </div>
          <div style={{ marginTop: "8px" }}><PB kind="hp" value={hp} max={max} label={`${fmt(hp)} / ${fmt(max)} PV`} /></div>
        </div>
      ) : (
        /* full key-art boss */
        <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", border: "1px solid #4c2f1c" }}>
          <div style={{ height: `${U.art}px`, background: "#0c0b10", display: "grid", placeItems: "center" }}>
            <img src={boss.art} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: dead ? "grayscale(0.7) brightness(0.6)" : "none", transition: "filter 400ms" }} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "26px 16px 14px", background: "linear-gradient(180deg, transparent, rgba(8,7,10,0.94))" }}>
            <span style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", fontSize: "0.68rem" }}>{boss.type}</span>
            <h3 style={{ margin: "4px 0 10px", font: "var(--font-heading)", fontSize: "1.5rem", color: "var(--hl-gold)", textShadow: "0 2px 10px #000" }}>{boss.name}</h3>
            <PB kind="hp" value={hp} max={max} label={`${fmt(hp)} / ${fmt(max)} PV`} />
          </div>
        </div>
      )}

      {/* INT intel — compact single card */}
      <article style={{ marginTop: "16px", padding: "13px 14px", border: "1px solid rgba(76,177,255,0.35)", borderRadius: "10px", background: "rgba(12,24,40,0.5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <strong style={{ color: "var(--hl-attr-int)", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>Intel · INT ≥ 25</strong>
        </div>
        <p style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.4 }}>Teme la concentración sostenida. Conviene un NPC <b style={{ color: "var(--hl-attr-foc)" }}>{attrLabel(boss.weakness)}</b> o Guerrero.</p>
      </article>

      {/* NPC support — collapsed to the current pick + expandable roster */}
      <SectionHeading title="NPC de Apoyo" margin={U.sec} size={U.secSize}>
        <button type="button" onClick={() => setShowRoster((s) => !s)} style={{ background: "none", border: "none", color: "var(--hl-gold)", fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "0.75rem", textTransform: "uppercase", cursor: "pointer" }}>
          {showRoster ? "Ocultar" : "Cambiar"}
        </button>
      </SectionHeading>

      {!showRoster && npcObj ? (
        <C accent={attrColor(npcObj.attr)} active style={{ display: "flex", alignItems: "center", gap: "12px", padding: U.pad }}>
          <IconTile glyph={npcObj.icon} color={attrColor(npcObj.attr)} size={U.icon} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <strong style={{ color: "var(--hl-ink)", fontFamily: "var(--font-body)" }}>{npcObj.name}</strong>
            <p style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.8rem", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{npcObj.effect}</p>
          </div>
          <P tone="green" style={{ padding: "5px 10px", fontSize: "0.7rem" }}>Activo ✓</P>
        </C>
      ) : (
        <div style={{ display: "grid", gap: U.gap }}>
          {D.npcs.map((n) => {
            const col = attrColor(n.attr);
            const on = selectedNpc === n.attr;
            return (
              <C key={n.attr} accent={col} active={on} style={{ display: "flex", alignItems: "center", gap: "12px", padding: U.pad }}>
                <IconTile glyph={n.icon} color={col} size={U.icon} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ color: "var(--hl-ink)", fontFamily: "var(--font-body)" }}>{n.name}</strong>
                  <p style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.8rem", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.effect}</p>
                </div>
                <B variant="mini" onClick={() => { onSelectNpc(n.attr); setShowRoster(false); }}>{on ? "✓" : "Elegir"}</B>
              </C>
            );
          })}
        </div>
      )}

      {/* combat missions — compact rows with damage on the right */}
      <SectionHeading title="Misiones de Combate" margin={U.sec} size={U.secSize} />
      <div style={{ display: "grid", gap: U.gap }}>
        {D.dailyQuests.slice(0, 3).map((q) => {
          const col = attrColor(q.attr);
          return (
            <C key={q.id} accent={col} style={{ display: "flex", alignItems: "center", gap: "12px", padding: U.pad }}>
              <IconTile glyph={q.icon} color={col} size={U.icon} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ font: "var(--font-heading)", fontSize: "1.05rem", color: "var(--hl-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{q.name}</h4>
                <p style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.78rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{q.habit}</p>
              </div>
              <strong style={{ color: "var(--hl-gold)", fontFamily: "var(--font-body)", textAlign: "center", lineHeight: 1, flex: "0 0 auto" }}>{fmt(q.xp * 1.4)}<br /><span style={{ fontSize: "0.62rem", color: "var(--hl-muted)" }}>DMG</span></strong>
            </C>
          );
        })}
      </div>

      <div style={{ marginTop: "20px", display: "grid", gap: "8px" }}>
        <B variant="primary" size="lg" fullWidth disabled={dead} onClick={onAttack}>{dead ? "🏆 Boss derrotado" : "⚔ Desatar ataque"}</B>
        <B variant="ghost" fullWidth>Cierre del día (ataque nocturno)</B>
      </div>
    </div>
  );
}

/* ============================ EXPEDITION ============================ */
function ExpeditionScreen({ compact }) {
  const U = dims(compact);
  const arc = D.arc;
  const doneCh = arc.chapters.filter((c) => c.progress >= c.missions.length).length;
  const toneColor = { green: "var(--hl-green)", amber: "var(--hl-gold)", red: "var(--hl-danger)", violet: "var(--hl-attr-foc)" };
  const [openCh, setOpenCh] = React.useState("v2"); // expand the in-progress chapter only
  return (
    <div style={{ padding: U.view }}>
      <C tone="panel" style={{ display: "grid", gap: "10px", padding: U.panelPad }}>
        <span className="hl-eyebrow" style={{ fontSize: "0.68rem" }}>Arco activo · rotación semanal</span>
        <h3 style={{ font: "var(--font-heading)", fontSize: "1.5rem", color: "var(--hl-gold)", textShadow: "var(--text-engrave)" }}>{arc.title}</h3>
        <p style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>{arc.summary}</p>
        <PB kind="xp" value={doneCh} max={arc.chapters.length} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ color: "var(--hl-gold)", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>{doneCh} / {arc.chapters.length} capítulos</strong>
          <P tone="gold" icon="🗝" style={{ padding: "4px 10px", fontSize: "0.72rem" }}>{arc.keys} llaves</P>
        </div>
      </C>

      {/* rotation — slim row of three */}
      <SectionHeading title="Arcos en rotación" margin={U.sec} size={U.secSize} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        {D.arcs.map((a) => (
          <div key={a.title} style={{ padding: "12px 10px", border: `1px solid ${a.active ? "rgba(126,203,142,0.6)" : "var(--border-hairline)"}`, borderRadius: "10px", background: a.active ? "rgba(16,83,65,0.55)" : "rgba(0,0,0,0.24)" }}>
            <span style={{ display: "block", color: a.active ? "var(--hl-green)" : "var(--hl-muted)", fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "0.64rem", textTransform: "uppercase" }}>{a.active ? "▶ Activo" : "⏸ Espera"}</span>
            <strong style={{ display: "block", margin: "5px 0 4px", color: "var(--hl-ink)", fontFamily: "var(--font-heading)", fontSize: "0.9rem", lineHeight: 1.15 }}>{a.title}</strong>
            <small style={{ color: "var(--hl-gold)", fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 900 }}>{a.keys}🗝 · {a.done}/{a.total}</small>
          </div>
        ))}
      </div>

      {/* chapters — collapsed to a row each; tap to expand missions + beat */}
      <SectionHeading title="Capítulos" margin={U.sec} size={U.secSize} />
      <div style={{ display: "grid", gap: U.gap }}>
        {arc.chapters.map((ch, idx) => {
          const total = ch.missions.length;
          const complete = ch.progress >= total;
          const prevDone = idx === 0 || arc.chapters[idx - 1].progress >= arc.chapters[idx - 1].missions.length;
          const keyLock = ch.requiresKeys && arc.keys < ch.requiresKeys;
          const locked = !prevDone || keyLock;
          const tc = toneColor[ch.tone];
          const open = openCh === ch.id;
          return (
            <article key={ch.id} style={{ border: `1px solid ${tc}`, borderRadius: "10px", background: "rgba(0,0,0,0.24)", opacity: locked ? 0.6 : 1, overflow: "hidden" }}>
              <button type="button" onClick={() => !locked && setOpenCh(open ? null : ch.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "13px 14px", background: "none", border: "none", textAlign: "left", cursor: locked ? "default" : "pointer" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: "block", color: "var(--hl-ink)", fontFamily: "var(--font-heading)", fontSize: "1rem" }}>{ch.title}</strong>
                  <small style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.72rem" }}>{ch.level} · {ch.progress}/{total} misiones</small>
                </div>
                <span style={{ flex: "0 0 auto", color: tc, fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 900 }}>{complete ? "✓" : locked ? "🔒" : open ? "▾" : "▸"}</span>
              </button>
              <div style={{ height: "5px", background: "var(--hl-ink-well)", margin: "0 14px", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
                <span style={{ display: "block", height: "100%", width: `${(ch.progress / total) * 100}%`, background: "var(--grad-vit-bar)" }} />
              </div>
              {open && !locked ? (
                <div style={{ padding: "12px 14px 14px", display: "grid", gap: "10px" }}>
                  <ul style={{ margin: 0, paddingLeft: "18px", display: "grid", gap: "3px" }}>
                    {ch.missions.map((m, i) => (
                      <li key={i} style={{ color: i < ch.progress ? "var(--hl-green)" : "var(--hl-muted)", textDecoration: i < ch.progress ? "line-through" : "none", fontFamily: "var(--font-body)", fontSize: "0.82rem" }}>{m}</li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontFamily: "var(--font-body)", fontSize: "0.76rem", fontWeight: 900 }}>
                    <span style={{ color: "var(--hl-gold)" }}>⚔ {ch.boss}</span>
                    <span style={{ color: "var(--hl-gold)" }}>🗝 {ch.key}</span>
                  </div>
                  <blockquote style={{ margin: 0, padding: "10px 12px", border: "1px solid var(--border-hairline)", borderRadius: "8px", background: "rgba(255,255,255,0.04)", color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.8rem" }}>"{ch.beat}"</blockquote>
                  <B variant="complete" disabled={complete}>{complete ? "Completado ✓" : "Avanzar misión"}</B>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <SectionHeading title="Recompensa del arco" margin={U.sec} size={U.secSize} />
      <article style={{ display: "flex", alignItems: "center", gap: "14px", padding: U.pad, border: "1px solid rgba(242,204,69,0.5)", borderRadius: "10px", background: "linear-gradient(145deg, rgba(79,62,22,0.5), rgba(27,20,18,0.94))" }}>
        <span style={{ color: "var(--hl-gold)", fontSize: "1.6rem", flex: "0 0 auto" }}>✦</span>
        <div style={{ minWidth: 0 }}>
          <strong style={{ color: "var(--hl-ink)", fontFamily: "var(--font-body)" }}>{arc.relic.name}</strong>
          <p style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.8rem", marginTop: "3px" }}>Reliquia épica — {arc.npc.name}, {arc.npc.role} ({arc.npc.attr})</p>
        </div>
      </article>
    </div>
  );
}

/* ============================ CHARACTER ============================ */
function CharacterScreen({ hero, compact }) {
  const U = dims(compact);
  return (
    <div style={{ padding: U.view }}>
      <C tone="panel" style={{ display: "grid", gap: "14px", padding: U.panelPad }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "48px", height: "48px", flex: "0 0 auto", border: "2px solid var(--hl-gold)", borderRadius: "50%", display: "grid", placeItems: "center", background: "var(--hl-bg)" }}>
            <img src="../../assets/pixel-hero.svg" alt="" style={{ width: "70%", height: "70%", imageRendering: "pixelated" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ font: "var(--font-heading)", fontSize: "1.4rem", color: "var(--hl-gold)", textShadow: "var(--text-engrave)" }}>{hero.name}</h3>
            <p style={{ color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.82rem" }}>Nivel {hero.level} · {hero.rank}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
          {[[fmt(hero.totalXp), "XP total"], [hero.quests, "quests"], [hero.bosses, "bosses"]].map(([v, l]) => (
            <span key={l} style={{ padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.24)", color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.72rem", textAlign: "center" }}>
              <strong style={{ display: "block", color: "var(--hl-gold)", fontSize: "1.1rem" }}>{v}</strong>{l}
            </span>
          ))}
        </div>
      </C>

      <SectionHeading title="Atributos" margin={U.sec} size={U.secSize} />
      <div style={{ display: "grid", gap: "10px" }}>
        {D.charAttributes.map((a) => (
          <AM key={a.attr} attr={a.attr} value={a.value} max={a.max} bonus={a.bonus} next={a.next} />
        ))}
      </div>

      <SectionHeading title="Equipo" margin={U.sec} size={U.secSize} />
      <div style={{ display: "grid", gap: "8px" }}>
        {D.equipment.map((it) => (
          <article key={it.slot} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 13px", border: `1px solid ${it.awakened ? "rgba(242,204,69,0.45)" : "var(--border-panel)"}`, borderRadius: "8px", background: "rgba(0,0,0,0.2)" }}>
            <span style={{ width: "26px", textAlign: "center", color: "var(--hl-gold)", fontSize: "1.1rem", flex: "0 0 auto" }}>{slotGlyph(it.slot)}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ color: "var(--hl-ink)", fontFamily: "var(--font-body)", fontSize: "0.88rem" }}>{it.name}</strong>
              <small style={{ display: "block", color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.68rem", textTransform: "uppercase", fontWeight: 900 }}>{it.slot}{it.awakened ? " · despierto" : ""}</small>
            </div>
            <RT rarity={it.rarity} />
          </article>
        ))}
      </div>

      <SectionHeading title="Habilidades Pasivas" margin={U.sec} size={U.secSize} />
      <div style={{ display: "grid", gap: "8px" }}>
        {D.passives.map((p) => {
          const col = attrColor(p.attr);
          return (
            <article key={p.name} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 13px", border: "1px solid var(--border-hairline)", borderLeft: `3px solid ${col}`, borderRadius: "8px", background: "rgba(0,0,0,0.22)", opacity: p.on ? 1 : 0.5 }}>
              <span style={{ width: "28px", height: "28px", flex: "0 0 auto", display: "grid", placeItems: "center", borderRadius: "6px", background: "rgba(255,255,255,0.08)", color: col, fontFamily: "var(--font-body)", fontSize: "0.66rem", fontWeight: 900 }}>{p.attr}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ color: "var(--hl-ink)", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>{p.name}</strong>
                <small style={{ display: "block", color: "var(--hl-muted)", fontFamily: "var(--font-body)", fontSize: "0.7rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.desc}</small>
              </div>
              <span style={{ flex: "0 0 auto", color: p.on ? "var(--hl-green)" : "var(--hl-faint)" }}>{p.on ? "✓" : "—"}</span>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function slotGlyph(slot) {
  return { "Arma": "⚔", "Armadura": "🛡", "Casco": "⛑", "Botas": "🥾", "Reliquia": "✦", "Accesorio": "◈" }[slot] || "◆";
}

Object.assign(window, { QuestsScreen, BossScreen, ExpeditionScreen, CharacterScreen });
