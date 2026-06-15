/* =========================================================================
   HERO'S LEDGER — Implementación de las mecánicas del documento de diseño
   Stack: HTML + CSS + JavaScript vanilla. Persistencia en localStorage.
   ========================================================================= */

const STORAGE_KEY = "heros-ledger-v2";

/* ---------------------------------------------------------------------------
   1. ATRIBUTOS  (STR rojo, INT azul, VIT verde, DIS amarillo, FOC púrpura)
--------------------------------------------------------------------------- */
const ATTRIBUTES = [
  { id: "STR", label: "Fuerza", color: "#d43b4a" },
  { id: "INT", label: "Inteligencia", color: "#4cb1ff" },
  { id: "VIT", label: "Vitalidad", color: "#7ecb8e" },
  { id: "DIS", label: "Disciplina", color: "#f2cc45" },
  { id: "FOC", label: "Foco", color: "#b18bff" },
];
const ATTR_IDS = ATTRIBUTES.map((a) => a.id);
const baseAttributes = () => Object.fromEntries(ATTR_IDS.map((id) => [id, 0]));
const attrInfo = (id) => ATTRIBUTES.find((a) => a.id === id);

/* ---------------------------------------------------------------------------
   1.2 REPOSITORIO DE QUESTS — mínimo 6 por atributo para que el enfriamiento
   de 3 días funcione. XP define también el daño al boss.
--------------------------------------------------------------------------- */
const QUEST_REPO = [
  // STR
  { id: "str1", attr: "STR", name: "Forja del Cuerpo", habit: "30 min de entrenamiento de fuerza.", xp: 250, icon: "⚔" },
  { id: "str2", attr: "STR", name: "Marcha del Guerrero", habit: "Camina o corre 5 km.", xp: 200, icon: "🥾" },
  { id: "str3", attr: "STR", name: "Carga Pesada", habit: "Sesión de pesas o flexiones.", xp: 220, icon: "🏋" },
  { id: "str4", attr: "STR", name: "Aliento de Hierro", habit: "Haz 50 sentadillas.", xp: 150, icon: "🦵" },
  { id: "str5", attr: "STR", name: "Senda del Atleta", habit: "Practica un deporte 45 min.", xp: 230, icon: "⚽" },
  { id: "str6", attr: "STR", name: "Despertar Físico", habit: "15 min de estiramiento matutino.", xp: 120, icon: "🤸" },
  // INT
  { id: "int1", attr: "INT", name: "Estudio del Grimorio", habit: "Lee o estudia 25 min.", xp: 200, icon: "📖" },
  { id: "int2", attr: "INT", name: "Códice Arcano", habit: "Completa una lección de un curso.", xp: 220, icon: "🎓" },
  { id: "int3", attr: "INT", name: "Lengua Antigua", habit: "Practica un idioma 20 min.", xp: 180, icon: "🗣" },
  { id: "int4", attr: "INT", name: "Cálculo Rúnico", habit: "Resuelve ejercicios o problemas.", xp: 190, icon: "🔢" },
  { id: "int5", attr: "INT", name: "Crónica del Sabio", habit: "Escribe un resumen de lo aprendido.", xp: 170, icon: "✍" },
  { id: "int6", attr: "INT", name: "Mente Curiosa", habit: "Mira un documental o charla.", xp: 140, icon: "🔭" },
  // VIT
  { id: "vit1", attr: "VIT", name: "Banquete del Héroe", habit: "Cocina una comida saludable.", xp: 150, icon: "🍲" },
  { id: "vit2", attr: "VIT", name: "Pozo de Vida", habit: "Bebe 2 litros de agua.", xp: 120, icon: "💧" },
  { id: "vit3", attr: "VIT", name: "Descanso Sagrado", habit: "Duerme 7-8 horas.", xp: 200, icon: "🌙" },
  { id: "vit4", attr: "VIT", name: "Aire Puro", habit: "20 min al aire libre.", xp: 130, icon: "🌳" },
  { id: "vit5", attr: "VIT", name: "Ritual de Limpieza", habit: "Ordena tu espacio.", xp: 140, icon: "🧹" },
  { id: "vit6", attr: "VIT", name: "Cuerpo Templado", habit: "Un día sin azúcar procesada.", xp: 160, icon: "🥗" },
  // DIS
  { id: "dis1", attr: "DIS", name: "Voto del Alba", habit: "Levántate temprano.", xp: 180, icon: "🌅" },
  { id: "dis2", attr: "DIS", name: "Sin Distracciones", habit: "1 hora sin redes sociales.", xp: 190, icon: "🚫" },
  { id: "dis3", attr: "DIS", name: "Tarea Pendiente", habit: "Completa la tarea que evitas.", xp: 230, icon: "✅" },
  { id: "dis4", attr: "DIS", name: "Orden del Día", habit: "Planea tu día por la mañana.", xp: 140, icon: "🗓" },
  { id: "dis5", attr: "DIS", name: "Promesa Cumplida", habit: "Termina algo que empezaste.", xp: 210, icon: "🎯" },
  { id: "dis6", attr: "DIS", name: "Ayuno Digital", habit: "2 horas sin teléfono.", xp: 200, icon: "📵" },
  // FOC
  { id: "foc1", attr: "FOC", name: "Meditación Silenciosa", habit: "10 min de respiración sin pantalla.", xp: 150, icon: "🧘" },
  { id: "foc2", attr: "FOC", name: "Trabajo Profundo", habit: "50 min sin interrupciones.", xp: 250, icon: "🎯" },
  { id: "foc3", attr: "FOC", name: "Mente Presente", habit: "Come sin pantallas.", xp: 130, icon: "🍽" },
  { id: "foc4", attr: "FOC", name: "Sendero Zen", habit: "Caminata consciente 15 min.", xp: 140, icon: "🚶" },
  { id: "foc5", attr: "FOC", name: "Una Sola Cosa", habit: "Monotarea durante 30 min.", xp: 200, icon: "🎴" },
  { id: "foc6", attr: "FOC", name: "Diario de Claridad", habit: "Journaling durante 10 min.", xp: 160, icon: "📓" },
];
const questById = (id) => QUEST_REPO.find((q) => q.id === id);
const DAILY_SLOTS = 5;
const COOLDOWN_DAYS = 3;

/* ---------------------------------------------------------------------------
   3. EXPEDICIONES — arco con 4 capítulos encadenados por llaves.
--------------------------------------------------------------------------- */
const ARCS = [
  {
    id: "valdris",
    title: "El Bosque de Valdris",
    summary: "Un mal antiguo despierta bajo los árboles de Valdris.",
    npc: { name: "Mira", role: "Exploradora de Valdris", attr: "FOC" },
    relic: { name: "Espada de Valdris", lore: "Forjada por Mira, exploradora de Valdris, brilla cuando el bosque está en peligro." },
    chapters: [
      { id: "v1", title: "Capítulo 1 — El Claro", level: "Lv. 1-5", tone: "green", boss: "Lobo Acorazado", key: "Llave del Claro", beat: "El lobo llevaba una marca. Alguien lo envió...", missions: ["Llegar al bosque", "Encontrar rastros extraños", "Seguir el rastro al claro"] },
      { id: "v2", title: "Capítulo 2 — La Torre", level: "Lv. 6-12", tone: "amber", boss: "El Señor Corrupto", key: "Llave de la Torre", beat: "El símbolo pertenece a una orden antigua...", missions: ["Rastrear al señor del bosque", "Descubrir el campamento", "Sobrevivir la emboscada"] },
      { id: "v3", title: "Capítulo 3 — El Abismo", level: "Lv. 13-20", tone: "red", boss: "El Archimago", key: "Sello del Abismo", beat: "El ritual casi termina. Algo fue invocado...", missions: ["Infiltrar la torre oscura", "Liberar a los prisioneros", "Interrumpir la invocación"] },
      { id: "v4", title: "Capítulo 4 — Final del Arco", level: "Lv. 21+", tone: "violet", boss: "La Entidad del Abismo", key: "Reliquia de Valdris", beat: "El bosque quedó en silencio. Pero otras tierras esperan un nuevo héroe...", missions: ["La entidad despertó", "Reunir a los aliados", "Forjar el arma final", "La batalla final"], requiresKeys: 3 },
    ],
  },
  {
    id: "grath",
    title: "Las Cimas de Grath",
    summary: "Las montañas heladas guardan un secreto que congela el alma.",
    npc: { name: "Brundir", role: "Guía de las cimas", attr: "VIT" },
    relic: { name: "Pico de Grath", lore: "Tallado en hielo eterno, nunca se quiebra." },
    chapters: [
      { id: "g1", title: "Capítulo 1 — El Sendero", level: "Lv. 1-5", tone: "green", boss: "Yeti Menor", key: "Llave de Hielo", beat: "La nieve oculta huellas que no son humanas...", missions: ["Cruzar el paso", "Encender la hoguera", "Hallar el refugio"] },
      { id: "g2", title: "Capítulo 2 — La Tormenta", level: "Lv. 6-12", tone: "amber", boss: "Espíritu del Viento", key: "Llave de la Cumbre", beat: "El viento susurra un nombre olvidado...", missions: ["Resistir la ventisca", "Seguir las luces", "Encontrar el santuario"] },
      { id: "g3", title: "Capítulo 3 — La Cima", level: "Lv. 13-20", tone: "red", boss: "Guardián de Hielo", key: "Sello Glacial", beat: "Algo duerme bajo la cima más alta...", missions: ["Escalar el muro helado", "Resolver el acertijo", "Despertar al guardián"] },
      { id: "g4", title: "Capítulo 4 — Final del Arco", level: "Lv. 21+", tone: "violet", boss: "El Corazón Helado", key: "Reliquia de Grath", beat: "La montaña por fin respira en calma...", missions: ["El deshielo comienza", "Reunir el calor", "La última escalada", "La batalla final"], requiresKeys: 3 },
    ],
  },
  {
    id: "ceniza",
    title: "El Mar de Ceniza",
    summary: "Un océano de cenizas esconde una ciudad sumergida.",
    npc: { name: "Sael", role: "Navegante de ceniza", attr: "INT" },
    relic: { name: "Brújula de Sael", lore: "Apunta siempre hacia lo que el corazón ha perdido." },
    chapters: [
      { id: "c1", title: "Capítulo 1 — La Orilla", level: "Lv. 1-5", tone: "green", boss: "Cangrejo de Lava", key: "Llave de Brasa", beat: "La ceniza aún está caliente bajo tus pies...", missions: ["Llegar a la costa", "Construir la balsa", "Zarpar al amanecer"] },
      { id: "c2", title: "Capítulo 2 — La Niebla", level: "Lv. 6-12", tone: "amber", boss: "Sirena de Humo", key: "Llave del Faro", beat: "Un canto te llama desde la niebla...", missions: ["Navegar a ciegas", "Encender el faro", "Resistir el canto"] },
      { id: "c3", title: "Capítulo 3 — Las Profundidades", level: "Lv. 13-20", tone: "red", boss: "Leviatán de Ceniza", key: "Sello Abisal", beat: "La ciudad sumergida no estaba vacía...", missions: ["Sumergirse al fondo", "Encontrar la ciudad", "Despertar al leviatán"] },
      { id: "c4", title: "Capítulo 4 — Final del Arco", level: "Lv. 21+", tone: "violet", boss: "El Rey de Ceniza", key: "Reliquia de Ceniza", beat: "El mar por fin se asienta, gris y silencioso...", missions: ["El rey despierta", "Reunir la flota", "Forjar el ancla sagrada", "La batalla final"], requiresKeys: 3 },
    ],
  },
];
const arcById = (id) => ARCS.find((a) => a.id === id);

/* ---------------------------------------------------------------------------
   4-5. BOSSES y NPCs
--------------------------------------------------------------------------- */
const GENERIC_BOSS = {
  id: "malakor",
  name: "Malakor el Tocado por el Vacío",
  type: "Boss Genérico",
  maxHp: 1200,
  healPct: 0.2, // cura ~20% si no es derrotado
  art: "./assets/void-dragon.svg",
  weakness: "FOC",
  drop: "Medalla del Vacío",
};

// 5.1 NPCs básicos — uno por atributo
const BASIC_NPCS = [
  { attr: "STR", name: "Guerrero", icon: "⚔", effect: "Daño adicional por cada misión completada.", when: "Boss con mucha vida." },
  { attr: "INT", name: "Sabio", icon: "✦", effect: "+XP de todas las misiones del combate.", when: "Para maximizar XP del día." },
  { attr: "VIT", name: "Sanador", icon: "✚", effect: "Cura PV tras el contraataque del boss.", when: "Cuando tienes PV bajos." },
  { attr: "DIS", name: "Explorador", icon: "▣", effect: "Mejora la rareza de los drops.", when: "Cuando buscas equipo." },
  { attr: "FOC", name: "Mago", icon: "◆", effect: "Reduce el daño de los ataques del boss.", when: "Para sobrevivir sin llegar a 0 PV." },
];
const npcByAttr = (attr) => BASIC_NPCS.find((n) => n.attr === attr);

/* ---------------------------------------------------------------------------
   6. EQUIPO — ranuras fijas, rareza, escalado por umbral
--------------------------------------------------------------------------- */
const EQUIP_SLOTS = [
  { id: "weapon", label: "Arma", primary: "STR", secondary: "DIS" },
  { id: "armor", label: "Armadura", primary: "VIT", secondary: "STR" },
  { id: "accessory", label: "Accesorio", primary: "FOC", secondary: "INT" },
  { id: "helmet", label: "Casco", primary: "INT", secondary: "FOC" },
  { id: "boots", label: "Botas", primary: "DIS", secondary: "VIT" },
  { id: "relic", label: "Reliquia", primary: "ALL", secondary: null },
];
const RARITY = {
  common: { label: "Común", primaryBonus: 1, secondaryBonus: 0 },
  rare: { label: "Raro", primaryBonus: 2, secondaryBonus: 1 },
  epic: { label: "Épico", primaryBonus: 3, secondaryBonus: 2 },
};

/* ---------------------------------------------------------------------------
   7. HABILIDADES PASIVAS — umbrales 10 · 25 · 50 · 100
--------------------------------------------------------------------------- */
const PASSIVES = {
  STR: [
    { t: 10, name: "Golpe Firme", desc: "+5% de daño contra bosses genéricos." },
    { t: 25, name: "Fuerza Bruta", desc: "+10% de daño. El drop mejora 1 nivel de rareza." },
    { t: 50, name: "Ímpetu", desc: "+15% de daño. Chance de drop doble." },
    { t: 100, name: "Campeón", desc: "Inmunidad al primer golpe. Drop épico semanal." },
  ],
  INT: [
    { t: 10, name: "Mente Aguda", desc: "+5% de XP de todas las quests." },
    { t: 25, name: "Conocimiento", desc: "+10% de XP. Revela la rareza del drop." },
    { t: 50, name: "Sabiduría", desc: "+15% de XP. Bonus en misiones de INT." },
    { t: 100, name: "Archimago", desc: "+25% de XP global. Misiones de INT exclusivas." },
  ],
  VIT: [
    { t: 10, name: "Resistencia", desc: "Un reintento si el héroe es derrotado." },
    { t: 25, name: "Temple", desc: "2 reintentos. Mejores drops de consumibles." },
    { t: 50, name: "Fortaleza", desc: "3 reintentos. Consumibles duran más." },
    { t: 100, name: "Inmortal", desc: "Reintentos ilimitados en bosses genéricos." },
  ],
  DIS: [
    { t: 10, name: "Enfoque", desc: "La racha no decae si fallas 1 día/semana." },
    { t: 25, name: "Constancia", desc: "Tolera 2 fallos/semana. La racha sube más rápido." },
    { t: 50, name: "Disciplina", desc: "Tolera 3 fallos/semana. Enfriamiento a 2 días." },
    { t: 100, name: "Maestría", desc: "La racha nunca decae. Enfriamiento a 1 día." },
  ],
  FOC: [
    { t: 10, name: "Concentración", desc: "+1 misión de enfoque disponible por día." },
    { t: 25, name: "Claridad", desc: "Pendiente de definir (siguiente iteración)." },
    { t: 50, name: "Visión", desc: "Pendiente de definir (siguiente iteración)." },
    { t: 100, name: "Iluminado", desc: "+5% a todos los atributos. Misiones de FOC exclusivas." },
  ],
};

/* ---------------------------------------------------------------------------
   8. CONSUMIBLES — recuperación y bonus de combate
--------------------------------------------------------------------------- */
const CONSUMABLES = {
  herb: { name: "Poción de Hierba", cat: "heal", icon: "🧪", effect: "Recupera 25% PV", value: 0.25, maxStock: 10 },
  elixir: { name: "Elixir del Bosque", cat: "heal", icon: "⚗", effect: "Recupera 60% PV", value: 0.6, maxStock: 10 },
  essence: { name: "Esencia de Expedición", cat: "heal", icon: "✨", effect: "Recupera PV completos", value: 1, maxStock: 5 },
  tonic: { name: "Tónico de Batalla", cat: "buff", icon: "🔥", effect: "+20% daño al boss hoy", value: 0.2, maxStock: 5 },
  shield: { name: "Amuleto de Escudo", cat: "buff", icon: "🛡", effect: "Absorbe el ataque nocturno una vez", maxStock: 5 },
};

/* =========================================================================
   ESTADO
   ========================================================================= */
const today = () => new Date().toISOString().slice(0, 10);

function freshState() {
  return {
    name: "Héroe",
    startDate: today(),
    level: 1,
    currentXp: 0,
    totalXp: 0,
    attributes: baseAttributes(),
    // racha
    streakDays: 0,
    streakStep: 0,
    lastActiveDate: null,
    missedRun: 0,
    streakMax: 0,
    // quests diarias
    dailyQuests: [],
    completedToday: [],
    focusAttr: null,
    cooldowns: {}, // questId -> fecha de expiración
    lastReset: null,
    // boss
    bossDamage: {}, // bossId -> daño acumulado
    bossesDefeated: 0,
    bossesByType: { generic: 0, expedition: 0 },
    selectedNpc: null,
    equippedConsumables: [], // ids hoy
    heroHp: null,
    resting: false,
    battleDone: [], // misiones de combate completadas hoy
    // expediciones
    keys: {}, // arcId -> nº de llaves
    chapterProgress: {}, // chapterId -> nº misiones completadas
    arcWeek: 0,
    completedArcs: [],
    titles: [],
    relics: [],
    // equipo e inventario
    equipment: {}, // slotId -> {name, rarity, attr, threshold, awakened}
    inventory: {}, // consumableId -> cantidad
    // métricas
    questCompletions: {}, // questId -> count (tasa de completitud)
    totalQuestsDone: 0,
    activityLog: [],
  };
}

let state = load();

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return seedNew();
    return { ...freshState(), ...saved, attributes: { ...baseAttributes(), ...(saved.attributes || {}) } };
  } catch {
    return seedNew();
  }
}

function seedNew() {
  const s = freshState();
  // Inventario inicial para que el jugador pruebe combate
  s.inventory = { herb: 3, elixir: 1, tonic: 1 };
  return s;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* =========================================================================
   1.2 / 1.3  GENERACIÓN DE QUESTS DIARIAS (rotación, enfriamiento, enfoque)
   ========================================================================= */
function laggingAttr() {
  // atributo más rezagado del personaje (equilibrio silencioso)
  return [...ATTR_IDS].sort((a, b) => (state.attributes[a] ?? 0) - (state.attributes[b] ?? 0))[0];
}

function cooldownDays() {
  const dis = totalAttributes().DIS ?? 0;
  if (dis >= 100) return 1;
  if (dis >= 50) return 2;
  return COOLDOWN_DAYS;
}

function availableQuests(attr) {
  return QUEST_REPO.filter((q) => {
    if (attr && q.attr !== attr) return false;
    const cd = state.cooldowns[q.id];
    return !cd || cd <= today();
  });
}

function pickFrom(pool, exclude) {
  const options = pool.filter((q) => !exclude.has(q.id));
  if (!options.length) return null;
  return options[Math.floor(Math.random() * options.length)];
}

function generateDailyQuests() {
  const chosen = [];
  const used = new Set();
  const focus = state.focusAttr;

  for (let slot = 0; slot < DAILY_SLOTS; slot++) {
    let pick = null;
    // Slot 5 (último): siempre prioriza el atributo más rezagado (silencioso)
    if (slot === DAILY_SLOTS - 1) {
      const lag = laggingAttr();
      pick = pickFrom(availableQuests(lag), used) || pickFrom(availableQuests(null), used);
    } else if (focus && slot < 3) {
      // Techo suave: con enfoque, slots 1-3 son del atributo enfocado
      pick = pickFrom(availableQuests(focus), used) || pickFrom(availableQuests(null), used);
    } else {
      pick = pickFrom(availableQuests(null), used);
    }
    if (pick) {
      used.add(pick.id);
      chosen.push(pick.id);
    }
  }
  state.dailyQuests = chosen;
}

function ensureDailyReset() {
  const t = today();
  if (state.lastReset === t && state.dailyQuests.length) return;

  // Antes de regenerar, las misiones completadas ayer entran en enfriamiento.
  state.completedToday.forEach((id) => {
    const exp = new Date();
    exp.setDate(exp.getDate() + cooldownDays());
    state.cooldowns[id] = exp.toISOString().slice(0, 10);
  });

  // Evaluar racha si cambió el día
  if (state.lastReset && state.lastReset !== t) evaluateStreak();

  state.completedToday = [];
  state.battleDone = [];
  state.equippedConsumables = [];
  state.selectedNpc = null;
  state.lastReset = t;
  generateDailyQuests();
  save();
}

/* =========================================================================
   2.3  SISTEMA DE RACHAS (escalones con decaimiento gradual)
   ========================================================================= */
const STREAK_STEPS = [
  { day: 1, step: 1, char: 1.0, attr: 1.0 },
  { day: 5, step: 2, char: 1.2, attr: 1.1 },
  { day: 10, step: 3, char: 1.4, attr: 1.2 },
  { day: 20, step: 4, char: 1.8, attr: 1.4 },
  { day: 30, step: 5, char: 2.2, attr: 1.8 },
  { day: 50, step: 6, char: 2.5, attr: 2.0 },
];

function stepForDays(days) {
  let s = STREAK_STEPS[0];
  for (const entry of STREAK_STEPS) if (days >= entry.day) s = entry;
  return s;
}
function stepByNumber(n) {
  return STREAK_STEPS.find((s) => s.step === n) || STREAK_STEPS[0];
}
function currentStreak() {
  return stepByNumber(Math.max(1, state.streakStep || 1));
}

function evaluateStreak() {
  // Se llama al detectar un cambio de día sin que el anterior se completara.
  const tolerance = disStreakTolerance();
  if (!state.completedYesterday) {
    state.missedRun = (state.missedRun || 0) + 1;
    if (state.missedRun > tolerance) {
      // decaimiento gradual: baja un escalón por día roto
      state.streakStep = Math.max(1, (state.streakStep || 1) - 1);
      state.streakDays = stepByNumber(state.streakStep).day;
    }
  }
}

function disStreakTolerance() {
  const dis = totalAttributes().DIS ?? 0;
  if (dis >= 100) return 99; // nunca decae
  if (dis >= 50) return 3;
  if (dis >= 25) return 2;
  if (dis >= 10) return 1;
  return 0;
}

function registerStreakActivity() {
  const t = today();
  if (state.lastActiveDate === t) return; // ya contó hoy
  // día consecutivo o primer día
  state.streakDays = (state.streakDays || 0) + 1;
  state.missedRun = 0;
  state.streakStep = stepForDays(state.streakDays).step;
  state.streakMax = Math.max(state.streakMax || 0, state.streakDays);
  state.lastActiveDate = t;
  state.completedYesterday = true;
}

/* =========================================================================
   ATRIBUTOS, EQUIPO Y TOTALES
   ========================================================================= */
function totalAttributes() {
  const totals = { ...baseAttributes(), ...state.attributes };
  Object.values(state.equipment).forEach((item) => {
    if (!item) return;
    const slot = EQUIP_SLOTS.find((s) => s.id === item.slot);
    const r = RARITY[item.rarity];
    const awakened = isAwakened(item);
    if (item.slot === "relic") {
      ATTR_IDS.forEach((id) => (totals[id] += awakened ? 3 : 2));
      return;
    }
    if (slot?.primary && slot.primary !== "ALL") {
      totals[slot.primary] += r.primaryBonus + (awakened ? 1 : 0);
    }
    if (slot?.secondary && awakened) {
      totals[slot.secondary] += r.secondaryBonus;
    }
  });
  // FOC ≥ 100 — Iluminado: +5% a todos los atributos
  if ((state.attributes.FOC ?? 0) >= 100) {
    ATTR_IDS.forEach((id) => (totals[id] = Math.round(totals[id] * 1.05)));
  }
  return totals;
}

function isAwakened(item) {
  // 6.3 escalado por umbral: nivel del personaje o atributo
  if (item.thresholdType === "level") return state.level >= item.threshold;
  return (state.attributes[item.thresholdAttr] ?? 0) >= item.threshold;
}

/* Pasivas activas */
function activePassives() {
  const active = [];
  ATTR_IDS.forEach((attr) => {
    PASSIVES[attr].forEach((p) => {
      if ((state.attributes[attr] ?? 0) >= p.t) active.push({ attr, ...p });
    });
  });
  return active;
}
function hasPassive(attr, threshold) {
  return (state.attributes[attr] ?? 0) >= threshold;
}

function passiveDamageBonus() {
  const s = state.attributes.STR ?? 0;
  if (s >= 100) return 0.15;
  if (s >= 50) return 0.15;
  if (s >= 25) return 0.1;
  if (s >= 10) return 0.05;
  return 0;
}
function passiveXpBonus() {
  const i = state.attributes.INT ?? 0;
  if (i >= 100) return 0.25;
  if (i >= 50) return 0.15;
  if (i >= 25) return 0.1;
  if (i >= 10) return 0.05;
  return 0;
}

/* =========================================================================
   2.1 NIVEL DE PERSONAJE — curva exponencial
   ========================================================================= */
function xpForLevel(level) {
  return Math.round(800 * Math.pow(1.35, level - 1));
}

function gainXp(amount) {
  const streak = currentStreak();
  const total = Math.round(amount * streak.char * (1 + passiveXpBonus()));
  state.currentXp += total;
  state.totalXp += total;
  let leveled = false;
  while (state.currentXp >= xpForLevel(state.level)) {
    state.currentXp -= xpForLevel(state.level);
    state.level += 1;
    leveled = true;
  }
  if (leveled) toast(`¡Subiste a Nivel ${state.level}!`, "#f2cc45", "⭐");
  return total;
}

function gainAttr(attr, amount) {
  const streak = currentStreak();
  const before = state.attributes[attr] ?? 0;
  const gained = Math.max(1, Math.round(amount * streak.attr));
  state.attributes[attr] = before + gained;
  // pop notification al subir atributo + detectar nuevo umbral de pasiva
  const info = attrInfo(attr);
  const crossed = PASSIVES[attr].find((p) => before < p.t && state.attributes[attr] >= p.t);
  if (crossed) {
    toast(`${attr} +${gained} · Pasiva: ${crossed.name}`, info.color, "✦");
  } else {
    toast(`${info.label} +${gained}`, info.color, attrBadge(attr));
  }
}

function attrBadge(attr) {
  return { STR: "💪", INT: "📘", VIT: "💚", DIS: "🎯", FOC: "🧠" }[attr] || "✦";
}

/* =========================================================================
   COMPLETAR QUEST DIARIA
   ========================================================================= */
function completeQuest(id) {
  if (state.completedToday.includes(id)) return;
  const q = questById(id);
  if (!q) return;
  state.completedToday.push(id);
  state.totalQuestsDone += 1;
  state.questCompletions[id] = (state.questCompletions[id] || 0) + 1;

  registerStreakActivity();
  const xpGained = gainXp(q.xp);
  gainAttr(q.attr, Math.max(2, Math.round(q.xp / 50)));

  // El valor XP define el daño al boss activo si hay combate en curso
  state.activityLog.unshift({ t: today(), text: `${q.name} (+${xpGained} XP, ${q.attr})` });
  state.activityLog = state.activityLog.slice(0, 40);

  // chance de drop de consumible (Poción de Hierba — drop frecuente de quests)
  if (Math.random() < 0.35) addConsumable("herb", 1, true);

  save();
  render();
}

/* =========================================================================
   4. SISTEMA DE BOSSES
   ========================================================================= */
function activeBoss() {
  return GENERIC_BOSS;
}
function bossDamageDone() {
  return state.bossDamage[activeBoss().id] || 0;
}
function bossHp() {
  return Math.max(0, activeBoss().maxHp - bossDamageDone() - pendingBattleDamage());
}

// 4.2 Inteligencia del boss (hints por INT)
function bossIntel() {
  const int = totalAttributes().INT ?? 0;
  const boss = activeBoss();
  if (int >= 50) {
    return { tier: "INT ≥ 50", lines: [`Debilidad revelada: ${attrInfo(boss.weakness).label} (${boss.weakness}).`, `Drop garantizado (${boss.drop}) si usas al NPC ${npcByAttr(boss.weakness).name}.`] };
  }
  if (int >= 25) {
    return { tier: "INT ≥ 25", lines: ["Información táctica: este enemigo teme la concentración sostenida.", `Conviene un NPC de tipo ${npcByAttr(boss.weakness).name} o Guerrero.`] };
  }
  return { tier: "INT < 25", lines: ["Un enemigo poderoso acecha. Prepárate."] };
}

// daño de una misión de combate
function questBattleDamage(q) {
  const totals = totalAttributes();
  let dmg = q.xp; // el XP de la misión define el daño base
  // modificador de stats (el atributo de la misión amplifica)
  dmg *= 1 + (totals[q.attr] ?? 0) * 0.02;
  // bonus de pasivas STR
  dmg *= 1 + passiveDamageBonus();
  // bonus NPC Guerrero (+daño por misión)
  if (state.selectedNpc === "STR") dmg *= 1.2;
  // bonus debilidad si NPC coincide con debilidad
  if (state.selectedNpc === activeBoss().weakness) dmg *= 1.25;
  // tónico de batalla equipado
  if (state.equippedConsumables.includes("tonic")) dmg *= 1.2;
  return Math.round(dmg);
}

function todaysBattleQuests() {
  // las misiones del día disponibles para combate = quests diarias completadas
  return state.dailyQuests.map(questById).filter(Boolean);
}

function pendingBattleDamage() {
  return state.battleDone.reduce((sum, id) => {
    const q = questById(id);
    return q ? sum + questBattleDamage(q) : sum;
  }, 0);
}

function maxHeroHp() {
  return 100 + (totalAttributes().VIT ?? 0) * 8;
}
function ensureHeroHp() {
  const max = maxHeroHp();
  if (state.heroHp == null) state.heroHp = max;
  state.heroHp = Math.min(state.heroHp, max);
  if (state.heroHp > max * 0.5) state.resting = false;
}

function markBattleMission(id) {
  if (state.resting) return;
  if (!state.completedToday.includes(id)) {
    // debe completarse como quest real primero
    completeQuest(id);
  }
  if (state.battleDone.includes(id)) return;
  state.battleDone.push(id);
  save();
  render();
}

// 4.4 ataque: aplica daño acumulado y el boss contraataca
function attackBoss() {
  ensureHeroHp();
  if (state.resting) return;
  const dmg = pendingBattleDamage();
  if (dmg <= 0) return;
  const boss = activeBoss();
  state.bossDamage[boss.id] = Math.min((state.bossDamage[boss.id] || 0) + dmg, boss.maxHp);
  state.battleDone = [];

  if (state.bossDamage[boss.id] >= boss.maxHp) {
    defeatBoss();
  } else {
    bossCounterAttack();
  }
  save();
  render();
  playBattleAnimation();
}

function bossCounterAttack() {
  ensureHeroHp();
  const vit = totalAttributes().VIT ?? 0;
  let raw = 45;
  // NPC Mago (FOC) reduce daño del boss
  if (state.selectedNpc === "FOC") raw *= 0.6;
  const mitigated = Math.max(5, Math.round(raw - vit * 1.4));
  state.heroHp = Math.max(0, state.heroHp - mitigated);
  // NPC Sanador (VIT) cura tras el contraataque
  if (state.selectedNpc === "VIT") {
    state.heroHp = Math.min(maxHeroHp(), state.heroHp + Math.round(maxHeroHp() * 0.12));
  }
  if (state.heroHp <= 0) enterRest();
}

function defeatBoss() {
  const boss = activeBoss();
  state.bossesDefeated += 1;
  state.bossesByType.generic += 1;
  toast(`¡${boss.name} derrotado!`, "#d43b4a", "🏆");
  // drop de equipo (mejora rareza con NPC Explorador o pasiva STR≥25)
  let rarity = "common";
  if (state.selectedNpc === "DIS" || hasPassive("STR", 25)) rarity = "rare";
  dropEquipment(rarity);
  // drop de consumible
  addConsumable(Math.random() < 0.5 ? "elixir" : "tonic", 1, true);
  // resetear daño para que pueda reaparecer otro día
  state.bossDamage[boss.id] = 0;
}

// Ataque devastador nocturno (4.4) — botón "simular cierre de día"
function endOfDayAttack() {
  ensureHeroHp();
  const boss = activeBoss();
  if (bossDamageDone() >= boss.maxHp) {
    toast("El boss ya fue derrotado hoy.", "#7ecb8e", "✓");
    return;
  }
  // Amuleto de escudo absorbe el ataque nocturno
  if (state.equippedConsumables.includes("shield")) {
    state.equippedConsumables = state.equippedConsumables.filter((c) => c !== "shield");
    toast("El Amuleto de Escudo absorbió el ataque nocturno.", "#4cb1ff", "🛡");
  } else {
    const vit = totalAttributes().VIT ?? 0;
    if (vit >= 30) {
      // VIT alta absorbe parcialmente
      state.heroHp = Math.max(1, Math.round(maxHeroHp() * 0.2));
      toast("Tu VIT absorbió parte del ataque devastador.", "#7ecb8e", "💚");
    } else {
      state.heroHp = 0;
      enterRest();
    }
  }
  // El boss se cura entre días (manteniendo el progreso)
  const heal = Math.round(boss.maxHp * boss.healPct);
  state.bossDamage[boss.id] = Math.max(0, (state.bossDamage[boss.id] || 0) - heal);
  save();
  render();
}

// 4.5 Estado de descanso
function enterRest() {
  state.resting = true;
  toast("El héroe cayó. Estado de descanso activado.", "#d43b4a", "💤");
}

function selectNpc(attr) {
  state.selectedNpc = state.selectedNpc === attr ? null : attr;
  save();
  render();
}

function toggleConsumable(id) {
  if (state.equippedConsumables.includes(id)) {
    state.equippedConsumables = state.equippedConsumables.filter((c) => c !== id);
  } else {
    // máximo 1 por tipo por día; aquí 1 por id
    if ((state.inventory[id] || 0) <= 0) return;
    state.equippedConsumables.push(id);
    // los de curación se aplican de inmediato al equipar (antes del combate)
    const c = CONSUMABLES[id];
    if (c.cat === "heal") {
      ensureHeroHp();
      state.heroHp = Math.min(maxHeroHp(), state.heroHp + Math.round(maxHeroHp() * c.value));
      consumeOne(id);
      state.equippedConsumables = state.equippedConsumables.filter((x) => x !== id);
      toast(`${c.name}: PV restaurados.`, "#7ecb8e", c.icon);
    }
  }
  save();
  render();
}

/* =========================================================================
   CONSUMIBLES — stock
   ========================================================================= */
function addConsumable(id, qty, notify) {
  const c = CONSUMABLES[id];
  const cur = state.inventory[id] || 0;
  if (cur >= c.maxStock) {
    // excedente se convierte en XP
    gainXp(40 * qty);
    if (notify) toast(`Stock lleno: ${c.name} → +XP`, "#f2cc45", "💰");
    return;
  }
  state.inventory[id] = Math.min(c.maxStock, cur + qty);
  if (notify) toast(`Obtienes ${c.name}`, "#7ecb8e", c.icon);
}
function consumeOne(id) {
  state.inventory[id] = Math.max(0, (state.inventory[id] || 0) - 1);
}

/* =========================================================================
   EQUIPO — drops
   ========================================================================= */
const ITEM_NAMES = {
  weapon: ["Espada del Alba", "Hacha de Guerra", "Filo Rúnico"],
  armor: ["Coraza de Roble", "Cota de Mallas", "Peto del Guardián"],
  accessory: ["Anillo Arcano", "Talismán de Foco", "Amuleto del Sabio"],
  helmet: ["Yelmo del Erudito", "Capucha Mística", "Diadema Lúcida"],
  boots: ["Botas del Viajero", "Grebas de Hierro", "Sandalias Veloces"],
};

function dropEquipment(rarity) {
  const slots = EQUIP_SLOTS.filter((s) => s.id !== "relic");
  const slot = slots[Math.floor(Math.random() * slots.length)];
  const names = ITEM_NAMES[slot.id];
  const name = names[Math.floor(Math.random() * names.length)];
  const useLevel = Math.random() < 0.5;
  const item = {
    slot: slot.id,
    name,
    rarity,
    thresholdType: useLevel ? "level" : "attr",
    thresholdAttr: slot.primary,
    threshold: useLevel ? state.level + 3 : (state.attributes[slot.primary] ?? 0) + 10,
  };
  // Flujo de reemplazo simple: el nuevo siempre se equipa (el viejo se descarta)
  state.equipment[slot.id] = item;
  toast(`Equipas ${name} (${RARITY[rarity].label})`, "#f2cc45", "⚔");
}

function addRelic(arc) {
  if (state.relics.find((r) => r.arc === arc.id)) return;
  state.relics.push({ arc: arc.id, name: arc.relic.name, lore: arc.relic.lore, date: today() });
  state.equipment.relic = { slot: "relic", name: arc.relic.name, rarity: "epic", thresholdType: "level", threshold: 1 };
}

/* =========================================================================
   3. EXPEDICIONES — avanzar capítulos
   ========================================================================= */
function activeArc() {
  return ARCS[state.arcWeek % ARCS.length];
}
function chapterDone(chId) {
  const ch = ARCS.flatMap((a) => a.chapters).find((c) => c.id === chId);
  return (state.chapterProgress[chId] || 0) >= (ch?.missions.length || 99);
}
function arcKeys(arcId) {
  return state.keys[arcId] || 0;
}

function advanceChapter(arc, ch) {
  // requisito de llaves para el capítulo final
  if (ch.requiresKeys && arcKeys(arc.id) < ch.requiresKeys) {
    toast(`Necesitas ${ch.requiresKeys} llaves para abrir este capítulo.`, "#d43b4a", "🔒");
    return;
  }
  const prog = (state.chapterProgress[ch.id] || 0) + 1;
  state.chapterProgress[ch.id] = prog;
  if (prog >= ch.missions.length) {
    // capítulo completado → otorga llave (micro-ritual)
    state.keys[arc.id] = arcKeys(arc.id) + 1;
    toast(`Capítulo completado · ${ch.key} obtenida`, "#b18bff", "🗝");
    gainXp(300);
    // ¿arco completo?
    if (arc.chapters.every((c) => chapterDone(c.id))) completeArc(arc);
  } else {
    toast(ch.beat, "#7ecb8e", "📜");
    gainXp(80);
  }
  save();
  render();
}

function completeArc(arc) {
  if (state.completedArcs.includes(arc.id)) return;
  state.completedArcs.push(arc.id);
  state.bossesByType.expedition += 1;
  state.bossesDefeated += 1;
  // título dinámico
  const title = `Guardián de ${arc.title.replace(/^El |^Las |^La /, "")}`;
  if (!state.titles.includes(title)) state.titles.push(title);
  addRelic(arc);
  toast(`¡Arco completado! Título: ${title}`, "#f2cc45", "👑");
}

function rotateArc() {
  state.arcWeek = (state.arcWeek + 1) % ARCS.length;
  save();
  render();
}

/* =========================================================================
   TOAST / POP NOTIFICATIONS
   ========================================================================= */
function toast(text, color, icon) {
  const stack = $("#toast-stack");
  if (!stack) return;
  const el = document.createElement("div");
  el.className = "toast";
  el.style.setProperty("--toast-color", color || "#f2cc45");
  el.innerHTML = `<span class="toast-icon">${icon || "✦"}</span><span>${text}</span>`;
  stack.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 320);
  }, 2600);
}

function playBattleAnimation() {
  const stage = $("#battle-stage");
  if (!stage) return;
  stage.classList.remove("is-attacking");
  void stage.offsetWidth;
  stage.classList.add("is-attacking");
  setTimeout(() => stage.classList.remove("is-attacking"), 900);
}

/* =========================================================================
   RENDER
   ========================================================================= */
const fmt = (n) => new Intl.NumberFormat("es-ES").format(Math.round(n));

function rankForLevel(lvl) {
  if (lvl >= 21) return "Leyenda";
  if (lvl >= 13) return "Veterano";
  if (lvl >= 6) return "Aventurero";
  return "Aprendiz";
}

function renderQuests() {
  const streak = currentStreak();
  const nextXp = xpForLevel(state.level);
  $("#rank-title").textContent = rankForLevel(state.level);
  $("#xp-label").textContent = `${fmt(state.currentXp)} / ${fmt(nextXp)} XP`;
  $("#xp-bar").style.width = `${Math.min((state.currentXp / nextXp) * 100, 100)}%`;
  $("#streak-days").textContent = state.streakDays || 0;
  $("#streak-detail").textContent = `Día ${state.streakDays || 0} · Escalón ${streak.step}`;
  $("#streak-char-mult").textContent = `×${streak.char.toFixed(1)} XP`;
  $("#streak-attr-mult").textContent = `×${streak.attr.toFixed(1)} ATR`;

  // focus selector
  $("#focus-options").innerHTML =
    `<button class="focus-pill ${!state.focusAttr ? "active" : ""}" data-focus="none">Libre</button>` +
    ATTRIBUTES.map(
      (a) => `<button class="focus-pill ${state.focusAttr === a.id ? "active" : ""}" data-focus="${a.id}" style="--c:${a.color}">${a.id}</button>`,
    ).join("");

  const pending = state.dailyQuests.filter((id) => !state.completedToday.includes(id)).length;
  $("#pending-count").textContent = `${pending} pendientes`;

  $("#quest-list").innerHTML = state.dailyQuests
    .map((id, i) => {
      const q = questById(id);
      if (!q) return "";
      const done = state.completedToday.includes(id);
      const info = attrInfo(q.attr);
      const isLagSlot = i === DAILY_SLOTS - 1;
      return `
        <article class="quest-card ${done ? "completed" : ""}" style="--c:${info.color}">
          <div>
            <small style="color:${info.color}">${info.label} · ${q.attr}</small>
            <h4>${q.icon} ${q.name}</h4>
            <p>${q.habit}</p>
            <div class="reward-row">
              <span>+${q.xp} XP</span>
              <span style="border-color:${info.color};color:${info.color}">${q.attr}</span>
              ${isLagSlot ? "" : ""}
            </div>
          </div>
          <button class="complete-button" data-quest="${id}" type="button" ${done ? "disabled" : ""}>
            ${done ? "Completada ✓" : "Completar"}
          </button>
        </article>`;
    })
    .join("");

  $$("[data-quest]").forEach((b) => b.addEventListener("click", () => completeQuest(b.dataset.quest)));
  $$("[data-focus]").forEach((b) =>
    b.addEventListener("click", () => {
      const v = b.dataset.focus;
      state.focusAttr = v === "none" ? null : v;
      generateDailyQuests();
      save();
      render();
    }),
  );
}

function renderBoss() {
  ensureHeroHp();
  const boss = activeBoss();
  const hp = bossHp();
  $("#boss-art-img").src = boss.art;
  $("#boss-type").textContent = boss.type;
  $("#boss-name").textContent = boss.name;
  $("#boss-hp-label").textContent = `${fmt(hp)} / ${fmt(boss.maxHp)} PV`;
  $("#boss-hp-bar").style.width = `${(hp / boss.maxHp) * 100}%`;

  // intel
  const intel = bossIntel();
  $("#int-tier-pill").textContent = `INT ${totalAttributes().INT ?? 0}`;
  $("#boss-intel").innerHTML = `<article class="intel-card"><strong>${intel.tier}</strong>${intel.lines.map((l) => `<p>${l}</p>`).join("")}</article>`;

  // NPCs básicos
  $("#npc-list").innerHTML = BASIC_NPCS.map((n) => {
    const info = attrInfo(n.attr);
    const active = state.selectedNpc === n.attr;
    return `
      <article class="recruit-card ${active ? "active" : ""}" style="--c:${info.color}">
        <div class="quest-icon" style="color:${info.color}">${n.icon}</div>
        <div>
          <strong>${n.name}</strong>
          <p>${n.effect}</p>
          <small style="color:${info.color}">Atributo: ${n.attr} · ${n.when}</small>
        </div>
        <button class="mini-button" data-npc="${n.attr}" type="button">${active ? "Activo ✓" : "Elegir"}</button>
      </article>`;
  }).join("");
  $$("[data-npc]").forEach((b) => b.addEventListener("click", () => selectNpc(b.dataset.npc)));

  // consumibles de combate (solo buffs equipables; heal se aplica al instante)
  const buffs = Object.entries(CONSUMABLES).filter(([id, c]) => (state.inventory[id] || 0) > 0);
  $("#consumable-pill").textContent = `${state.equippedConsumables.length} equipados`;
  $("#combat-consumables").innerHTML =
    buffs.length === 0
      ? `<p class="empty-note">Sin consumibles. Completa quests y bosses para conseguirlos.</p>`
      : buffs
          .map(([id, c]) => {
            const eq = state.equippedConsumables.includes(id);
            return `
        <article class="consumable-card ${eq ? "equipped" : ""}">
          <span class="quest-icon">${c.icon}</span>
          <div><strong>${c.name}</strong><p>${c.effect}</p><small>Stock: ${state.inventory[id]}</small></div>
          <button class="mini-button" data-consumable="${id}" type="button">${eq ? "Activo" : c.cat === "heal" ? "Usar" : "Equipar"}</button>
        </article>`;
          })
          .join("");
  $$("[data-consumable]").forEach((b) => b.addEventListener("click", () => toggleConsumable(b.dataset.consumable)));

  // prep summary
  const sample = todaysBattleQuests()[0];
  $("#hero-hp-label").textContent = `${fmt(state.heroHp)} / ${fmt(maxHeroHp())}`;
  $("#dmg-estimate").textContent = sample ? `+${fmt(questBattleDamage(sample))}` : "+0";
  const bonuses = [];
  if (state.selectedNpc) bonuses.push(npcByAttr(state.selectedNpc).name);
  state.equippedConsumables.forEach((id) => bonuses.push(CONSUMABLES[id].name));
  $("#active-bonus").textContent = bonuses.length ? bonuses.join(", ") : "—";

  // battle missions
  $("#damage-potential").textContent = `+${fmt(pendingBattleDamage())} daño acumulado`;
  $("#battle-list").innerHTML = todaysBattleQuests()
    .map((q) => {
      const info = attrInfo(q.attr);
      const inBattle = state.battleDone.includes(q.id);
      return `
      <article class="battle-card ${inBattle ? "ready" : ""}" style="--c:${info.color}">
        <div class="battle-icon" style="color:${info.color}">${q.icon}</div>
        <div><h4>${q.name}</h4><p>${q.habit}</p></div>
        <strong>${fmt(questBattleDamage(q))}<br>DMG</strong>
        <button class="complete-button" data-battle="${q.id}" type="button" ${inBattle ? "disabled" : ""}>
          ${inBattle ? "En combate ✓" : "Atacar con esta"}
        </button>
      </article>`;
    })
    .join("");
  $$("[data-battle]").forEach((b) => b.addEventListener("click", () => markBattleMission(b.dataset.battle)));

  const canAttack = pendingBattleDamage() > 0 && hp > 0 && !state.resting;
  $("#attack-button").disabled = !canAttack;
  $("#attack-button").textContent = state.resting ? "Héroe en descanso 💤" : hp <= 0 ? "Boss derrotado 🏆" : "⚔ Desatar ataque";

  $("#rest-note").classList.toggle("hidden", !state.resting);
  if (state.resting) {
    $("#rest-note").textContent = `El héroe necesita recuperar fuerzas (más del 50% PV) antes de volver al combate. PV: ${fmt(state.heroHp)} / ${fmt(maxHeroHp())}. Usa consumibles para acelerar.`;
  }
}

function renderExpedition() {
  const arc = activeArc();
  $("#expedition-title").textContent = arc.title;
  $("#expedition-summary").textContent = arc.summary;
  const doneCh = arc.chapters.filter((c) => chapterDone(c.id)).length;
  $("#expedition-bar").style.width = `${(doneCh / arc.chapters.length) * 100}%`;
  $("#expedition-progress-label").textContent = `${doneCh} / ${arc.chapters.length} capítulos`;
  $("#keys-pill").textContent = `${arcKeys(arc.id)} llaves`;

  $("#arc-rotation").innerHTML = ARCS.map((a, i) => {
    const active = i === state.arcWeek % ARCS.length;
    return `
      <article class="arc-card ${active ? "active" : ""}">
        <strong>${active ? "▶ Arco Activo" : "⏸ En espera"}</strong>
        <h4>${a.title}</h4>
        <p>${a.summary}</p>
        <small>${arcKeys(a.id)} llaves · ${a.chapters.filter((c) => chapterDone(c.id)).length}/${a.chapters.length} caps</small>
      </article>`;
  }).join("");

  $("#chapter-map").innerHTML = arc.chapters
    .map((ch, idx) => {
      const prog = state.chapterProgress[ch.id] || 0;
      const total = ch.missions.length;
      const complete = prog >= total;
      const prevDone = idx === 0 || chapterDone(arc.chapters[idx - 1].id);
      const keyLock = ch.requiresKeys && arcKeys(arc.id) < ch.requiresKeys;
      const locked = !prevDone || keyLock;
      return `
      <article class="chapter-card ${ch.tone} ${complete ? "complete" : ""} ${locked ? "locked" : ""}">
        <header><strong>${ch.title}</strong><span>${ch.level}</span></header>
        <div class="chapter-progress"><span style="width:${(prog / total) * 100}%"></span></div>
        <small class="chapter-count">${prog} / ${total} misiones</small>
        <ul>${ch.missions.map((m, i) => `<li class="${i < prog ? "done" : ""}">${m}</li>`).join("")}</ul>
        <div class="chapter-boss">⚔ Boss: ${ch.boss}</div>
        <div class="chapter-key">🗝 ${ch.key}${ch.requiresKeys ? ` · requiere ${ch.requiresKeys} llaves` : ""}</div>
        <blockquote>"${ch.beat}"</blockquote>
        <button class="complete-button" data-chapter="${ch.id}" type="button" ${locked || complete ? "disabled" : ""}>
          ${complete ? "Completado ✓" : locked ? "Bloqueado 🔒" : "Avanzar misión"}
        </button>
      </article>`;
    })
    .join("");
  $$("[data-chapter]").forEach((b) =>
    b.addEventListener("click", () => {
      const ch = arc.chapters.find((c) => c.id === b.dataset.chapter);
      advanceChapter(arc, ch);
    }),
  );

  $("#expedition-reward").innerHTML = `
    <article class="rare-reward">
      <span>✦</span>
      <div>
        <strong>${arc.relic.name}</strong>
        <p>Reliquia épica del arco — ${arc.relic.lore}</p>
        <small>NPC narrativo: ${arc.npc.name}, ${arc.npc.role} (${arc.npc.attr})</small>
      </div>
    </article>
    <button class="ghost-button" id="rotate-arc" type="button">Rotar al siguiente arco (semana)</button>`;
  $("#rotate-arc").addEventListener("click", rotateArc);
}

function renderCharacter() {
  const totals = totalAttributes();
  $("#character-name").textContent = state.name;
  $("#topbar-name").textContent = state.name;
  $("#character-summary").textContent = `Nivel ${state.level} · ${rankForLevel(state.level)}`;
  $("#total-xp").textContent = fmt(state.totalXp);
  $("#completed-total").textContent = state.totalQuestsDone;
  $("#bosses-total").textContent = state.bossesDefeated;
  $("#build-archetype").textContent = topAttrLabel(totals);

  const maxVal = Math.max(10, ...ATTR_IDS.map((id) => totals[id]));
  $("#attribute-list").innerHTML = ATTRIBUTES.map((a) => {
    const base = state.attributes[a.id] ?? 0;
    const total = totals[a.id] ?? 0;
    const bonus = total - base;
    const nextT = [10, 25, 50, 100].find((t) => base < t);
    return `
      <article class="attribute-row" style="--c:${a.color}">
        <div><strong>${a.label}</strong><small style="color:${a.color}">${a.id}${bonus > 0 ? ` · +${bonus} equipo` : ""}</small></div>
        <div class="attribute-meter"><span style="width:${(total / maxVal) * 100}%;background:${a.color}"></span></div>
        <div class="attr-val"><strong>${total}</strong>${nextT ? `<em>→ ${nextT}</em>` : `<em>máx</em>`}</div>
      </article>`;
  }).join("");

  // equipo por ranura
  $("#equipment-list").innerHTML = EQUIP_SLOTS.map((slot) => {
    const item = state.equipment[slot.id];
    if (!item) {
      return `<article class="equipment-card empty"><span>▢</span><div><strong>${slot.label}</strong><p>Ranura vacía</p><small>${slot.primary === "ALL" ? "Solo reliquias épicas" : slot.primary}</small></div></article>`;
    }
    const awakened = isAwakened(item);
    const r = RARITY[item.rarity];
    const cond = item.thresholdType === "level" ? `Nivel ${item.threshold}` : `${item.thresholdAttr} ${item.threshold}`;
    return `
      <article class="equipment-card ${awakened ? "awakened" : ""}">
        <span>${item.slot === "relic" ? "👑" : "⚔"}</span>
        <div>
          <strong>${item.name} <em class="rarity ${item.rarity}">${r.label}</em></strong>
          <p>${slot.label}</p>
          <small>${awakened ? "✓ Despertado" : `Umbral: ${cond}`}</small>
        </div>
      </article>`;
  }).join("");

  // pasivas
  $("#passive-list").innerHTML = ATTRIBUTES.map((a) => {
    const rows = PASSIVES[a.id]
      .map((p) => {
        const on = (state.attributes[a.id] ?? 0) >= p.t;
        return `<li class="${on ? "on" : ""}"><span class="ptier">${p.t}</span><div><strong>${p.name}</strong><small>${p.desc}</small></div><span class="pcheck">${on ? "✓" : "◇"}</span></li>`;
      })
      .join("");
    return `<article class="passive-group" style="--c:${a.color}"><h4 style="color:${a.color}">${a.label} · ${state.attributes[a.id] ?? 0}</h4><ul>${rows}</ul></article>`;
  }).join("");

  // inventario
  const inv = Object.entries(state.inventory).filter(([, q]) => q > 0);
  $("#inventory-list").innerHTML = inv.length
    ? inv
        .map(([id, q]) => {
          const c = CONSUMABLES[id];
          return `<article class="inv-card"><span>${c.icon}</span><div><strong>${c.name}</strong><small>${c.effect}</small></div><strong class="inv-qty">×${q}</strong></article>`;
        })
        .join("")
    : `<p class="empty-note">Inventario vacío.</p>`;
}

function topAttrLabel(totals) {
  const top = ATTR_IDS.reduce((best, id) => (totals[id] > totals[best] ? id : best), ATTR_IDS[0]);
  const avg = ATTR_IDS.reduce((s, id) => s + totals[id], 0) / ATTR_IDS.length;
  if (totals[top] - avg < 4) return "Equilibrado";
  return { STR: "Guerrero", INT: "Erudito", VIT: "Centinela", DIS: "Asceta", FOC: "Místico" }[top];
}

function renderArchive() {
  $("#archive-name").textContent = state.name;
  $("#archive-title").textContent = state.titles.length ? state.titles[state.titles.length - 1] : "Sin título aún";
  $("#archive-level").textContent = state.level;
  $("#archive-start").textContent = state.startDate;
  $("#archive-streak-max").textContent = state.streakMax || 0;

  $("#arc-history").innerHTML = ARCS.map((a) => {
    const done = state.completedArcs.includes(a.id);
    const active = a.id === activeArc().id;
    const doneCh = a.chapters.filter((c) => chapterDone(c.id)).length;
    const status = done ? "Completado" : active ? "En curso" : doneCh > 0 ? "Pausado" : "Bloqueado";
    return `
      <article class="arc-history-card ${done ? "done" : ""} ${status === "Bloqueado" ? "locked" : ""}">
        <div><strong>${a.title}</strong><small>${status} · ${doneCh}/${a.chapters.length} caps · ${arcKeys(a.id)} llaves</small></div>
        <span>${done ? "👑" : active ? "▶" : doneCh ? "⏸" : "🔒"}</span>
      </article>`;
  }).join("");

  // reliquias (galería con siluetas para arcos no completados)
  $("#relic-gallery").innerHTML = ARCS.map((a) => {
    const r = state.relics.find((x) => x.arc === a.id);
    if (r) {
      return `<article class="relic-card"><span>👑</span><div><strong>${r.name}</strong><p>${r.lore}</p><small>${a.title} · ${r.date}</small></div></article>`;
    }
    return `<article class="relic-card silhouette"><span>❔</span><div><strong>Reliquia desconocida</strong><p>Completa "${a.title}" para revelarla.</p></div></article>`;
  }).join("");

  // estadísticas históricas
  const topAttr = ATTR_IDS.reduce((b, id) => ((state.attributes[id] ?? 0) > (state.attributes[b] ?? 0) ? id : b), "STR");
  $("#historic-stats").innerHTML = `
    <div class="hist-grid">
      <div><strong>${state.totalQuestsDone}</strong><span>Quests completadas</span></div>
      <div><strong>${state.streakMax || 0}</strong><span>Racha máxima</span></div>
      <div><strong>${state.bossesDefeated}</strong><span>Bosses derrotados</span></div>
      <div><strong>${state.bossesByType.generic}/${state.bossesByType.expedition}</strong><span>Genéricos / Exped.</span></div>
      <div><strong>${attrInfo(topAttr).label}</strong><span>Atributo más alto</span></div>
      <div><strong>${state.level}</strong><span>Nivel máximo</span></div>
    </div>`;
}

function render() {
  ensureDailyReset();
  $("#level-label").textContent = `Nivel ${state.level}`;
  renderQuests();
  renderBoss();
  renderExpedition();
  renderCharacter();
  renderArchive();
}

/* =========================================================================
   NAVEGACIÓN Y ARRANQUE
   ========================================================================= */
$("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  state.name = $("#user-name").value.trim() || "Héroe";
  if (!state.startDate) state.startDate = today();
  save();
  $("#login-screen").classList.remove("active");
  $("#app-screen").classList.add("active");
  render();
});

$("#attack-button").addEventListener("click", attackBoss);
$("#end-day-button").addEventListener("click", endOfDayAttack);

$$(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    $$(".tab").forEach((t) => t.classList.remove("active"));
    $$(".view").forEach((v) => v.classList.remove("active"));
    tab.classList.add("active");
    $(`#${tab.dataset.view}`).classList.add("active");
  });
});

$$(".char-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    $$(".char-tab").forEach((t) => t.classList.remove("active"));
    $$(".char-pane").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    $(`#${tab.dataset.pane}`).classList.add("active");
  });
});

// si ya hay partida, saltar login
if (localStorage.getItem(STORAGE_KEY)) {
  $("#login-screen").classList.remove("active");
  $("#app-screen").classList.add("active");
}

render();
