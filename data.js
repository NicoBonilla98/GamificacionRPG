// Hero's Ledger — content extracted verbatim from the source app (app.js).
// Quest repository, expedition arcs, bosses, NPCs, equipment and passives.
// This is product copy, not logic — kept as a plain module for the UI kit.

window.HL_DATA = {
  attributes: [
    { id: "STR", label: "Fuerza", color: "var(--hl-attr-str)" },
    { id: "INT", label: "Inteligencia", color: "var(--hl-attr-int)" },
    { id: "VIT", label: "Vitalidad", color: "var(--hl-attr-vit)" },
    { id: "DIS", label: "Disciplina", color: "var(--hl-attr-dis)" },
    { id: "FOC", label: "Foco", color: "var(--hl-attr-foc)" },
  ],

  // The five quests shown on a typical day (one per attribute slot).
  dailyQuests: [
    { id: "str1", attr: "STR", name: "Forja del Cuerpo", habit: "30 min de entrenamiento de fuerza.", xp: 250, icon: "⚔" },
    { id: "int1", attr: "INT", name: "Estudio del Grimorio", habit: "Lee o estudia 25 min.", xp: 200, icon: "📖" },
    { id: "vit3", attr: "VIT", name: "Descanso Sagrado", habit: "Duerme 7-8 horas.", xp: 200, icon: "🌙" },
    { id: "foc2", attr: "FOC", name: "Trabajo Profundo", habit: "50 min sin interrupciones.", xp: 250, icon: "🎯" },
    { id: "dis3", attr: "DIS", name: "Tarea Pendiente", habit: "Completa la tarea que evitas.", xp: 230, icon: "✅" },
  ],

  boss: {
    name: "Malakor el Tocado por el Vacío",
    type: "Boss Genérico",
    maxHp: 1200,
    hp: 820,
    art: "../../assets/void-dragon.svg",
    weakness: "FOC",
    drop: "Medalla del Vacío",
  },

  npcs: [
    { attr: "STR", name: "Guerrero", icon: "⚔", effect: "Daño adicional por cada misión completada.", when: "Boss con mucha vida." },
    { attr: "INT", name: "Sabio", icon: "✦", effect: "+XP de todas las misiones del combate.", when: "Para maximizar XP del día." },
    { attr: "VIT", name: "Sanador", icon: "✚", effect: "Cura PV tras el contraataque del boss.", when: "Cuando tienes PV bajos." },
    { attr: "DIS", name: "Explorador", icon: "▣", effect: "Mejora la rareza de los drops.", when: "Cuando buscas equipo." },
    { attr: "FOC", name: "Mago", icon: "◆", effect: "Reduce el daño de los ataques del boss.", when: "Para sobrevivir sin llegar a 0 PV." },
  ],

  consumables: [
    { id: "tonic", name: "Tónico de Batalla", icon: "🔥", effect: "+20% daño al boss hoy", stock: 1 },
    { id: "elixir", name: "Elixir del Bosque", icon: "⚗", effect: "Recupera 60% PV", stock: 1 },
  ],

  arc: {
    title: "El Bosque de Valdris",
    summary: "Un mal antiguo despierta bajo los árboles de Valdris.",
    npc: { name: "Mira", role: "Exploradora de Valdris", attr: "FOC" },
    relic: { name: "Espada de Valdris", lore: "Forjada por Mira, exploradora de Valdris, brilla cuando el bosque está en peligro." },
    keys: 2,
    chapters: [
      { id: "v1", title: "Capítulo 1 — El Claro", level: "Lv. 1-5", tone: "green", boss: "Lobo Acorazado", key: "Llave del Claro", beat: "El lobo llevaba una marca. Alguien lo envió...", missions: ["Llegar al bosque", "Encontrar rastros extraños", "Seguir el rastro al claro"], progress: 3 },
      { id: "v2", title: "Capítulo 2 — La Torre", level: "Lv. 6-12", tone: "amber", boss: "El Señor Corrupto", key: "Llave de la Torre", beat: "El símbolo pertenece a una orden antigua...", missions: ["Rastrear al señor del bosque", "Descubrir el campamento", "Sobrevivir la emboscada"], progress: 1 },
      { id: "v3", title: "Capítulo 3 — El Abismo", level: "Lv. 13-20", tone: "red", boss: "El Archimago", key: "Sello del Abismo", beat: "El ritual casi termina. Algo fue invocado...", missions: ["Infiltrar la torre oscura", "Liberar a los prisioneros", "Interrumpir la invocación"], progress: 0 },
      { id: "v4", title: "Capítulo 4 — Final del Arco", level: "Lv. 21+", tone: "violet", boss: "La Entidad del Abismo", key: "Reliquia de Valdris", beat: "El bosque quedó en silencio. Pero otras tierras esperan...", missions: ["La entidad despertó", "Reunir a los aliados", "Forjar el arma final", "La batalla final"], progress: 0, requiresKeys: 3 },
    ],
  },

  arcs: [
    { title: "El Bosque de Valdris", summary: "Un mal antiguo despierta bajo los árboles de Valdris.", keys: 2, done: 1, total: 4, active: true },
    { title: "Las Cimas de Grath", summary: "Las montañas heladas guardan un secreto que congela el alma.", keys: 0, done: 0, total: 4, active: false },
    { title: "El Mar de Ceniza", summary: "Un océano de cenizas esconde una ciudad sumergida.", keys: 0, done: 0, total: 4, active: false },
  ],

  // Character screen
  hero: { name: "Thorne de Valdris", level: 7, rank: "Aventurero", totalXp: 14820, currentXp: 420, nextXp: 800, quests: 63, bosses: 4, streak: 12, streakStep: 3 },
  charAttributes: [
    { attr: "STR", value: 32, max: 50, bonus: 4, next: 50 },
    { attr: "INT", value: 41, max: 50, bonus: 2, next: 50 },
    { attr: "VIT", value: 18, max: 25, bonus: 0, next: 25 },
    { attr: "DIS", value: 27, max: 50, bonus: 3, next: 50 },
    { attr: "FOC", value: 24, max: 25, bonus: 0, next: 25 },
  ],
  equipment: [
    { slot: "Arma", name: "Filo Rúnico", rarity: "rare", awakened: true },
    { slot: "Armadura", name: "Coraza de Roble", rarity: "common", awakened: false },
    { slot: "Casco", name: "Yelmo del Erudito", rarity: "rare", awakened: false },
    { slot: "Botas", name: "Botas del Viajero", rarity: "common", awakened: true },
    { slot: "Reliquia", name: "Espada de Valdris", rarity: "epic", awakened: true },
  ],
  passives: [
    { attr: "STR", name: "Golpe Firme", desc: "+5% de daño contra bosses genéricos.", on: true },
    { attr: "INT", name: "Conocimiento", desc: "+10% de XP. Revela la rareza del drop.", on: true },
    { attr: "DIS", name: "Enfoque", desc: "La racha no decae si fallas 1 día/semana.", on: true },
    { attr: "FOC", name: "Concentración", desc: "+1 misión de enfoque disponible por día.", on: false },
  ],
};
